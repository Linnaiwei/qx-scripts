if ($response.bodyBytes) {
    try {
        // 使用 TextDecoder 将原始二进制数据 (bodyBytes) 解码为 UTF-8 字符串
        const decoder = new TextDecoder('utf-8');
        let bodyString = decoder.decode($response.bodyBytes);

        // 定义要查找和替换的内容
        const originalTitleRegex = /<title>[\s\S]*?<\/title>/i;
        const newTitle = '<title>REWRITE SUCCESS</title>';

        // 检查原始标题是否存在
        if (originalTitleRegex.test(bodyString)) {
            // 替换标题
            bodyString = bodyString.replace(originalTitleRegex, newTitle);

            // 使用 TextEncoder 将修改后的字符串重新编码为二进制数据
            const encoder = new TextEncoder();
            const newBodyBytes = encoder.encode(bodyString);

            // 返回修改后的二进制数据
            $done({ bodyBytes: newBodyBytes });
        } else {
            // 如果连 <title> 标签都找不到，说明响应体有问题
            $notify("Luluvdoo 终极调试 - 警告", "在响应体中未找到 <title> 标签。", "响应可能不是标准的 HTML 页面。");
            $done({});
        }
    } catch (e) {
        $notify("Luluvdoo 终极调试 - 异常", "脚本在处理响应时发生错误。", e.message);
        $done({});
    }
} else {
    $done({});
}
