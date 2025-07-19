const scriptName = "Luluvdoo Cleaner 调试";
const requestUrl = $request.url;

// 如果没有 $response.body，则无法注入 alert，只能用 $notify
if (!$response || !$response.body) {
    $notify(scriptName, "❌ 错误", "未能获取到响应体 (Response Body)。\n请确认已为 *.luluvdoo.com 开启 MitM 功能并信任证书！");
    $done({});
} else {
    try {
        let body = $response.body;
        // 使用一个数组来收集所有调试信息
        const debugMessages = [];

        debugMessages.push("脚本已触发\\nURL: " + requestUrl);
        debugMessages.push("✅ 步骤 1/4: 成功获取到响应体。");

        const patterns = [
            { name: "恶意变量 'K' 脚本", regex: /<script[^>]*>[\s\S]*?ChmaorrCfozdgenziMrattShzzy[\s\S]*?<\/script>/gi, found: false },
            { name: "lulu-row1 广告脚本", regex: /<script[^>]*?src="[^"]*?storage\.lulu-row1\.com[^"]*?"[^>]*?>\s*<\/script>/gi, found: false },
            { name: "Adblock 提示脚本", regex: /<script[^>]*>[\s\S]*?function showADBOverlay\(\)[\s\S]*?<\/script>/gi, found: false }
        ];

        let finalBody = body;
        let totalMatches = 0;

        // 依次替换，更稳定
        patterns.forEach(p => {
            finalBody = finalBody.replace(p.regex, (match) => {
                p.found = true;
                totalMatches++;
                return ""; // 返回空字符串以删除
            });
        });

        debugMessages.push("✅ 步骤 2/4: 正则替换流程已执行。");

        let report = "";
        patterns.forEach(p => {
            report += `${p.name}: ${p.found ? '✔️ 已找到并移除' : '❌ 未找到'}\\n`;
        });

        if (totalMatches > 0) {
            debugMessages.push(`✅ 步骤 3/4: 清理完成 (共 ${totalMatches} 个)\\n${report.trim()}`);
        } else {
            debugMessages.push(`⚠️ 步骤 3/4: 未发现目标\\n${report.trim()}`);
        }

        // 创建要注入的 alert 脚本
        let alertScriptPayload = '<script>\n';
        debugMessages.forEach(msg => {
            // 对消息进行转义，以防破坏 JS 字符串
            const sanitizedMsg = msg.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\n/g, '\\n');
            alertScriptPayload += `alert('${sanitizedMsg}');\n`;
        });
        alertScriptPayload += '</script>';

        // 将 alert 脚本注入到 </body> 标签之前
        finalBody = finalBody.replace('</body>', alertScriptPayload + '</body>');
        
        $notify(scriptName, "✅ 步骤 4/4 - 操作完成", "已向页面注入调试用的 alert() 弹窗。");
        $done({ body: finalBody });

    } catch (e) {
        $notify(scriptName, "❌ 脚本执行异常", `错误信息: ${e.message}`);
        $done({});
    }
}
