
// 检查 $response 是否存在且有 body
if ($response && $response.body) {
    let body = $response.body;

    // 定义要移除脚本的“指纹” (正则表达式)
    const patterns = [
        // 规则 1: 匹配包含恶意变量 'K' 的内联脚本
        // 使用了特征字符串 'ChmaorrCfozdgenziMrattShzzy'
        /<script[^>]*>[\s\S]*?ChmaorrCfozdgenziMrattShzzy[\s\S]*?<\/script>/gi,

        // 规则 2: 匹配来自 storage.lulu-row1.com 的广告脚本
        /<script[^>]*?src="[^"]*?storage\.lulu-row1\.com[^"]*?"[^>]*?>\s*<\/script>/gi,

        // 规则 3: 匹配定义了 adblock 提示函数的内联脚本
        /<script[^>]*>[\s\S]*?function showADBOverlay\(\)[\s\S]*?<\/script>/gi
    ];

    let matchCount = 0;

    // 遍历所有规则，替换匹配到的内容为空字符串
    patterns.forEach((pattern, index) => {
        if (pattern.test(body)) {
            body = body.replace(pattern, () => {
                matchCount++;
                console.log(`[Luluvdoo Cleaner] 移除了匹配规则 #${index + 1} 的脚本。`);
                return ""; // 返回空字符串以删除匹配项
            });
        }
    });

    if (matchCount > 0) {
        console.log(`[Luluvdoo Cleaner] 清理完成，共移除了 ${matchCount} 个脚本。`);
    }

    // 返回修改后的响应体
    $done({ body });
} else {
    // 如果没有响应体，则不做任何操作
    $done({});
}
