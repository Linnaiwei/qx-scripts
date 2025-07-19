const scriptName = "Luluvdoo Cleaner";

if ($response.bodyBytes) {
    try {
        // 使用 TextDecoder 将原始二进制数据 (bodyBytes) 解码为 UTF-8 字符串
        const decoder = new TextDecoder('utf-8');
        let bodyString = decoder.decode($response.bodyBytes);

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
            bodyString = bodyString.replace(pattern, "");
        });

        // 使用 TextEncoder 将修改后的字符串重新编码为二进制数据
        const encoder = new TextEncoder();
        const newBodyBytes = encoder.encode(bodyString);

        // 返回修改后的二进制数据
        $done({ bodyBytes: newBodyBytes });

    } catch (e) {
        console.log(`[${scriptName}] Error: ${e.message}`);
        $done({}); // 发生异常时，不做任何修改
    }
} else {
    // 如果没有 bodyBytes，则不做任何操作
    $done({});
}
