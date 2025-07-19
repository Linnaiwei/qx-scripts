const scriptName = "Luluvdoo Cleaner";

// 因为请求头已被修改，现在 $response.body 就是未压缩的纯文本
if ($response.body) {
    try {
        let body = $response.body;

        // 定义要移除脚本的正则表达式
        const patterns = [
            // 规则1: 匹配包含恶意变量 'K' 的内联脚本
            /<script[^>]*?>\s*\(\s*\(\)\s*=>\s*{[\s\S]*?ChmaorrCfozdgenziMrattShzzy[\s\S]*?}\)\(\);?\s*<\/script>/gi,

            // 规则2: 匹配来自 storage.lulu-row1.com 的广告脚本
            /<script[^>]*?src="[^"]*?storage\.lulu-row1\.com[^"]*?"[^>]*?>\s*<\/script>/gi,

            // 规则3: 匹配定义了 adblock 提示函数的内联脚本
            /<script[^>]*>\s*function showADBOverlay\(\)\s*{[\s\S]*?}\s*<\/script>/gi
        ];

        // 遍历所有规则，替换匹配到的内容为空字符串
        patterns.forEach(pattern => {
            body = body.replace(pattern, "");
        });

        // 返回修改后的字符串响应体
        $done({ body });

    } catch (e) {
        // 如果发生异常，在 QX 日志中打印错误，并返回原始响应体
        console.log(`[${scriptName}] Error: ${e.message}`);
        $done({});
    }
} else {
    // 如果没有响应体，则不做任何操作
    $done({});
}
