if ($response.body) {
  let body = $response.body;
  body = body.replace(
    /<script[^>]*>[^<]*ChmaorrCfozdgenziMrattShzzy[^<]*<\/script>/gi,
    ''
  );

  $done({ body });
} else {
  $done({});
}
