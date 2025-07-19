if ($response.bodyBytes) {
    // 将要添加的注释字符串编码成二进制数据
    const commentString = '<!-- LULUVDOO REWRITE SUCCESS (BINARY MODE) -->\n';
    const encoder = new TextEncoder();
    const commentBytes = encoder.encode(commentString);

    // 获取原始的响应体二进制数据
    const originalBodyBytes = $response.bodyBytes;

    // 创建一个新的 Uint8Array，其大小为注释和原始响应体之和
    const newBodyBytes = new Uint8Array(commentBytes.length + originalBodyBytes.length);

    // 将注释的二进制数据复制到新数组的开头
    newBodyBytes.set(commentBytes, 0);

    // 将原始响应体的二进制数据复制到新数组中，紧跟在注释后面
    newBodyBytes.set(originalBodyBytes, commentBytes.length);

    // 返回拼接后的、全新的二进制数据
    $done({ bodyBytes: newBodyBytes });

} else {
    // 如果没有 bodyBytes，则不做任何操作
    $done({});
}
