if ($response.body) {
  let body = $response.body;

  body = body.replace(
    /<script[^>]*>[^<]*ChmaorrCfozdgenziMrattShzzy[^<]*<\/script>/gi,
    ''
  );

  body = body.replace(
    /<script[^>]+src=["'][^"']*lulu-row1\.com[^"']*["'][^>]*><\/script>/gi,
    ''
  );

  body = body.replace(
    /<script[^>]*>[^<]*function\s+showADBOverlay\(\)[\s\S]*?<\/script>/gi,
    ''
  );

  $done({ body });
} else {
  $done({});
}
