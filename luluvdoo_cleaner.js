const scriptName = "Luluvdoo Cleaner";

if ($response && $response.body) {
    try {
        let body = $response.body;

        // 将 patterns 定义为对象数组，以便跟踪匹配状态
        const patterns = [
            { name: "恶意变量 'K' 脚本", regex: /<script[^>]*>[\s\S]*?ChmaorrCfozdgenziMrattShzzy[\s\S]*?<\/script>/gi, found: false },
            { name: "lulu-row1 广告脚本", regex: /<script[^>]*?src="[^"]*?storage\.lulu-row1\.com[^"]*?"[^>]*?>\s*<\/script>/gi, found: false },
            { name: "Adblock 提示脚本", regex: /<script[^>]*>[\s\S]*?function showADBOverlay\(\)[\s\S]*?<\/script>/gi, found: false }
        ];

        let totalMatches = 0;

        // 遍历所有规则，检查匹配并替换
        patterns.forEach(p => {
            // 使用正则表达式的 test 方法来检查是否存在匹配项
            if (p.regex.test(body)) {
                p.found = true;
                totalMatches++;
                // 重置正则表达式的 lastIndex 以确保 replace 能正常工作
                p.regex.lastIndex = 0;
                body = body.replace(p.regex, "");
            }
        });

        // --- 创建并注入 console.log 日志 ---
        let logPayload = `
            console.groupCollapsed('%c[${scriptName}] - 清理报告', 'color: #1E90FF; font-weight: bold;');
            console.log('总共移除了 ${totalMatches} 个脚本。');
        `;

        patterns.forEach(p => {
            const status = p.found ? '✔️ 已找到并移除' : '❌ 未找到';
            logPayload += `console.log('${p.name}: %c${status}', 'color: ${p.found ? 'green' : 'red'};');\n`;
        });

        logPayload += `console.groupEnd();`;

        // 将日志脚本注入到 </body> 标签之前
        const injectionScript = `<script>${logPayload}</script>`;
        body = body.replace('</body>', injectionScript + '</body>');

        // 返回修改后的响应体
        $done({ body });

    } catch (e) {
        console.log(`[${scriptName}] Error: ${e.message}`);
        $done({}); // 发生异常时，不做任何修改
    }
} else {
    $done({}); // 如果没有响应体，则不做任何操作
}
