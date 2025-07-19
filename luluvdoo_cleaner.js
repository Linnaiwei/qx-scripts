if ($response && $response.body) {
    let body = $response.body;

    // 在 HTML 最顶端添加一行清晰的注释
    const successComment = '<!-- LULUVDOO REWRITE SUCCESS -->\n';
    body = successComment + body;

    $done({ body });
} else {
    // 如果脚本被触发但没有响应体，依然使用 $notify 提醒，
    // 因为这是配置错误的明确信号，且无法通过修改页面来提示。
    $notify("Luluvdoo 终极调试 - 错误", "脚本已触发，但未能获取到响应体。", "请检查是否为 luluvdoo.com 域名开启了 MitM 功能。");
    $done({});
}
