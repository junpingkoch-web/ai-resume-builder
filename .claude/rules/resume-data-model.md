---
paths:
  - "script.js"
  - "phrasebank.js"
  - "index.html"
---

# 简历数据模型约定

## 三语字段结构
每个"智能"可编辑字段都是 `{zh: "", en: "", de: ""}`，没有单独存储的 `key`/预设选中状态——
选一个下拉预设选项，就是一次性把三个语言字段都覆盖写入（insert-and-reset-to-placeholder），
之后用户可以自由手动改，不会被下拉框重新覆盖打架。

## 生成内容 vs 界面语言，两者严格分离
生成逻辑（`buildResumeForLang` + `renderResumeHTML`/`renderResumeText`）跟界面语言 `state.uiLang`
完全独立：切换界面语言只改表单的 label/placeholder/选项文字，绝不触碰已生成的内容或底层数据。
不要写出让切换界面语言意外重新生成或修改简历内容的逻辑。

## 字段展示（2026-08-01 起的行为）
`renderLangTabsField` 现在只显示 `state.uiLang` 对应的那一个语言框（不是三个语言框同时堆叠），
切换界面语言会重新渲染每个字段去显示对应语言的框——但底层 `{zh,en,de}` 对象本身没变，
"复制到其他语言"功能仍然基于完整的三语对象工作。

## 视觉模板
`state.generated` 存的是结构化数据（`r`），不是预渲染好的 HTML——这是为了切换模板时能重新渲染
而不用重跑整个生成流程。Sidebar 模板走的是 `buildResumeBlocks` 命名区块字符串 + 双栏
（`.r-main`/`.r-sidebar`）拼装；Classic/Modern/Minimal/Banner 走的是扁平拼接。加新模板参考这个模式。

## localStorage 持久化
- `aiResumeBuilder.draft` —— 每次输入都自动存草稿
- `aiResumeBuilder.template` —— 模板选择
- **生成的预览本身不持久化**——重新生成是用户手动点一次，不是刷新页面自动触发，别把这个"修"成自动生成

## 日期格式（按简历语言，不是界面语言）
zh 用"2021年1月"，en 用"Jan 2021"，de 用"01.2021"（德语简历惯例是 `MM.YYYY`）。

## 缓存版本号（最容易忘的一步）
改完 `script.js` 或 `phrasebank.js`，一定要把 `index.html` 里对应 `<script src="...?v=N">` 的
版本号 `N` 加一。浏览器缓存这两个文件非常顽固，不加版本号用户刷新也看不到更新。
