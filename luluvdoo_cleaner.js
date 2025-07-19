if ($response.bodyBytes) {
    // 使用 TextDecoder 将原始二进制数据 (bodyBytes) 解码为 UTF-8 字符串
    const decoder = new TextDecoder('utf-8');
    let bodyString = decoder.decode($response.bodyBytes);

    // 在 HTML 最顶端添加一行清晰的注释
    const successComment = '<!-- LULUVDOO REWRITE SUCCESS (ENCODING FIXED) -->\n';
    bodyString = successComment + bodyString;

    // 使用 TextEncoder 将修改后的字符串重新编码为二进制数据
    const encoder = new TextEncoder();
    const newBodyBytes = encoder.encode(bodyString);

    // 返回修改后的二进制数据
    $done({ bodyBytes: newBodyBytes });

} else {
    // 如果没有 bodyBytes，则不做任何操作
    $done({});
}
