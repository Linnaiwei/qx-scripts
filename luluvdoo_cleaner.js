if ($response.body) {
  let body = $response.body;

  // 移除含有恶意指纹的内联脚本
  body = body.replace(
    /<script[^>]*>[^<]*ChmaorrCfozdgenziMrattShzzy[^<]*<\/script>/gi,
    ''
  );

  // 移除引用了 lulu-row1.com 的 script 标签
  body = body.replace(
    /<script[^>]+src=["'][^"']*lulu-row1\.com[^"']*["'][^>]*><\/script>/gi,
    ''
  );

  // 移除包含广告拦截提示函数的脚本
  body = body.replace(
    /<script[^>]*>[^<]*function\s+showADBOverlay\(\)[\s\S]*?<\/script>/gi,
    ''
  );

  $done({ body });
} else {
  $done({});
}
