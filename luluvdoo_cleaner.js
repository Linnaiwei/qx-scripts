if ($response.body) {
  let body = $response.body;

  // 先只保留一条看看效果
  body = body.replace(
    /<script[^>]*>[^<]*ChmaorrCfozdgenziMrattShzzy[^<]*<\/script>/gi,
    ''
  );

  $done({ body });
} else {
  $done({});
}
