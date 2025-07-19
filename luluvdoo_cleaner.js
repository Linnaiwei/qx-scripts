$notify("Luluvdoo Cleaner 调试", "脚本开始执行", `URL: ${$request.url}`);

// 检查 $response 是否存在且有 body
if ($response && $response.body) {
    let body = $response.body;
    $notify("Luluvdoo Cleaner 调试", "步骤 1/3", "成功获取到响应体 (Response Body)，准备进行匹配。");

    // 定义要移除脚本的“指纹” (正则表达式)
    const patterns = [
        // 规则 1: 匹配包含恶意变量 'K' 的内联脚本
        { name: "恶意变量 'K' 脚本", regex: /<script[^>]*>[\s\S]*?ChmaorrCfozdgenziMrattShzzy[\s\S]*?<\/script>/gi },

        // 规则 2: 匹配来自 storage.lulu-row1.com 的广告脚本
        { name: "lulu-row1 广告脚本", regex: /<script[^>]*?src="[^"]*?storage\.lulu-row1\.com[^"]*?"[^>]*?>\s*<\/script>/gi },

        // 规则 3: 匹配定义了 adblock 提示函数的内联脚本
        { name: "Adblock 提示脚本", regex: /<script[^>]*>[\s\S]*?function showADBOverlay\(\)[\s\S]*?<\/script>/gi }
    ];

    let matchCount = 0;

    // 遍历所有规则，替换匹配到的内容为空字符串
    patterns.forEach((patternObj) => {
        if (patternObj.regex.test(body)) {
            body = body.replace(patternObj.regex, () => {
                matchCount++;
                // 弹窗通知具体匹配到了哪条规则
                $notify("Luluvdoo Cleaner 调试", "步骤 2/3 - 匹配成功", `已找到并准备移除: ${patternObj.name}`);
                return ""; // 返回空字符串以删除匹配项
            });
        }
    });

    if (matchCount > 0) {
        $notify("Luluvdoo Cleaner 调试", "步骤 3/3 - 清理完成", `共移除了 ${matchCount} 个脚本。`);
    } else {
        $notify("Luluvdoo Cleaner 调试", "步骤 3/3 - 未发现目标", "脚本正常运行，但在页面中未找到任何需要移除的脚本。");
    }

    // 返回修改后的响应体
    $done({ body });
} else {
    // 如果没有响应体，则弹窗报错
    $notify("Luluvdoo Cleaner 调试 - 错误", "未能获取到响应体 (Response Body)", "请检查是否为 luluvdoo.com 域名开启了 MitM 功能。");
    $done({});
}
