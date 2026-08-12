# Project: ai-resume-builder（三语简历生成器）

零构建静态站点。三语（zh/en/de）简历生成工具，**没有 AI API、没有后端**——"AI 感"完全来自
`phrasebank.js` 里的模板/短语库，不是真实调用大模型。这个设计取舍已经明确告知过用户，不要重新提议接入 AI API。

## 文件结构
- `index.html` — 页面结构，表单 + 预览
- `script.js` — 主逻辑：状态管理、生成 (`buildResumeForLang`/`renderResumeHTML`/`renderResumeText`)、5 种视觉模板渲染
- `phrasebank.js`（`window.RESUME_PHRASEBANK`）— 三语预设短语库：动作动词、职位、学位、技能、语言等级、3 套 summary 模板
- `style.css`
- `ads.txt` — 真实 AdSense publisher 行；`index.html` 里的 `ca-pub-XXXXXXXXXXXXXXX` 可能仍是占位符，两者不要搞混

## 数据模型（改 script.js / phrasebank.js / index.html 前必读）
详细规则见 `.claude/rules/resume-data-model.md`（路径作用域，只在改这三个文件时加载）。

## 打印 / PDF 导出（改 @media print 或打印逻辑前必读）
详细规则见 `.claude/rules/print-pdf-export.md`（路径作用域，改 style.css/index.html/script.js 时加载）。
核心结论：`visibility:hidden` 会让隐藏元素继续占版面空间，打印相关的"隐藏非目标内容"一律用
`display:none`；且**屏幕模式下注入 `<style>` 模拟 `@media print` 测不出真正的打印引擎坑**，
改完打印样式要用 headless Chrome + puppeteer-core 实际渲染 PDF 再用 pymupdf 量化核验，
不能只凭肉眼看截图或屏幕模拟的结果就下结论。

## Commands
- 无构建/测试命令，零构建静态站
- 本地预览：共享配置在 `C:\Users\junpi\.claude\.claude\launch.json`，不是本仓库自己的 `.claude/launch.json`

## 部署流程
1. 改完直接 commit + push 到 `main`
2. GitHub Pages 自动重新发布，无需手动触发（新仓库要用户手动去 Settings → Pages 开一次）
3. **每次改动 `script.js` 或 `phrasebank.js` 后，必须把 `index.html` 里对应 `<script src="...">` 的 `?v=N` 版本号加一**——
   浏览器会顽固缓存这两个文件，不加版本号用户看不到更新（连本地预览工具的 `navigate` 也会踩这个坑，要用 `force: true` 或换个带版本号的 URL 才能看到最新效果）
4. Commit 作者身份用 `Junping Koch <junping.koch@gmail.com>`，仓库单独设置，不是全局 git config

## 明确禁止的事
- 不要引入真实 AI API 调用——这是刻意的产品定位（零后端、零密钥），已经跟用户明确过，不要重新提议
- 不要把预设字段（职位/学位/技能/语言等级）和自由文本字段（个人总结/经历描述）的三语行为混为一谈：
  预设字段选一次自动填满三语；自由文本字段每种语言要分别手打，靠"复制到其他语言"按钮起草，不是自动翻译
- 不要让"界面语言切换 (`state.uiLang`)"影响到已生成的简历内容——这两者故意是分离的

## Claude 工作方式
- 改动前先看一遍 `ai-resume-builder-project` 记忆，避免重新踩缓存版本号、模板渲染结构这些已知坑
- 加新视觉模板（现有 Classic/Modern/Minimal/Sidebar/Banner 5 种）时用 `/add-resume-template`

## 持续维护
每次你需要重复纠正 Claude 同一件事三次以上，就把结论补进这个文件对应章节。
