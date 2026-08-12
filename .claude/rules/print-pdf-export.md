---
paths:
  - "style.css"
  - "index.html"
  - "script.js"
---

# 打印 / PDF 导出调试笔记

这部分踩过好几次坑，改动 `@media print` 或打印相关逻辑前先看这里。

## 已知坑 + 对应修法

1. **`visibility: hidden` 不会让元素让出版面空间** —— 之前用 `body * { visibility:hidden }` 只让简历
   以外的内容隐藏，但表单/广告位/FAQ/页脚这些元素的盒子还占着位置，导致打印时按"整个隐形巨大表单"
   的高度分页，内容明明只有半页却打出 5+ 页空白纸。**正确做法：`display:none` 而不是
   `visibility:hidden`**——挨个枚举非简历区块设为 `display:none !important`，简历本身正常走文档流
   （不需要再用 `position:absolute` 那套旧技巧）。

2. **背景色打印默认被去掉** —— 浏览器为省墨默认丢弃背景色，Sidebar/Banner 模板的深色块打印会变白。
   必须显式声明 `-webkit-print-color-adjust: exact; print-color-adjust: exact; color-adjust: exact;`。

3. **`@page { margin: 0; }` 能去掉浏览器自带的打印页眉页脚**（日期、网址、页码）——这是 Chrome 的
   标准技巧，页边距为 0 时浏览器没地方画那些文字。副作用：普通模板（没有色块背景的 Classic/Modern/
   Minimal）会跟着失去内间距，要单独给 `.resume-preview:not(.tpl-sidebar):not(.tpl-banner)` 补
   `padding: 16mm 14mm`；Sidebar/Banner 因为设计上就是色块顶到页面边缘（full-bleed），不需要补。

4. **短内容会贴顶打印，下面留一大截空白** —— 光是"页数正确了"不代表版面就对了。让
   `body { display:flex; flex-direction:column; justify-content:center; min-height:100vh; }`
   （仅在 `@media print` 内）：内容比一页短时会自动上下居中；内容超过一页时 flex 没有多余空间可分配，
   自动退化成正常从页面顶部开始逐页排版，不会把多页内容挤坏——已用 15 段超长经历测过 3 页的情况，
   第 2 页依然从顶部开始，没有出现居中导致的奇怪断层。

## 验证方法论（最重要的一条）

**屏幕模式下用 `<style>` 注入 `@media print` 同款规则来"模拟"打印，测不出真正的打印引擎坑。**
这个仓库里至少有一次真实教训：用注入样式在屏幕模式下量 `document.body.scrollHeight`，结果显示一切
正常，但用户截图里的真实打印预览却是错的（内容贴顶、下方一大截空白）——因为居中这类问题只有真正的
打印分页引擎才会暴露，光靠 CSS 在屏幕上生效与否判断不了。

**必须走真实 headless Chrome 打印流水线拿到 ground truth**，步骤：

```bash
cd <scratchpad>
npm install puppeteer-core --no-save   # 不下载内置 Chromium，用本机已装的 Chrome
```

```js
const puppeteer = require('puppeteer-core');
const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new'
});
const page = await browser.newPage();
await page.goto('http://localhost:5507/index.html?qa=x', { waitUntil: 'load' }); // 见下方"坑"
await new Promise(r => setTimeout(r, 500)); // 见下方"坑"
await page.evaluate(() => { /* 填表单 + 点生成 + 选模板，跟真实用户操作一致 */ });
await page.pdf({ path: 'out.pdf', format: 'A4', printBackground: true, preferCSSPageSize: true });
```

拿到 PDF 后用 Python 的 `pymupdf`（`import fitz`，这台机器上已装）量化检查，不要只靠肉眼看截图：

```python
import fitz
doc = fitz.open('out.pdf')
print('page_count:', doc.page_count)
page = doc[0]
d = page.get_text('dict')
blocks = [b for b in d['blocks'] if b.get('lines')]
top = min(b['bbox'][1] for b in blocks)
bottom = max(b['bbox'][3] for b in blocks)
print('blank_above:', top, 'blank_below:', page.rect.height - bottom)
page.get_pixmap(dpi=150).save('out.png')  # 再读图做肉眼复核
```

### 用这条流水线时会踩的两个新坑

- **`waitUntil: 'networkidle0'` 会因为广告/统计的长轮询请求而 `net::ERR_CONNECTION_RESET`
  超时**（AdSense、GA4 的 beacon 永远不彻底 idle）。用 `waitUntil: 'load'`，然后自己
  `await new Promise(r => setTimeout(r, 500))` 等页面脚本跑完，别用 `networkidle0`。
- 页面默认界面语言是德语（见下），`.card .section-title` 的文字默认是 "Berufserfahrung" 而不是
  "工作经历"——用 DOM 结构/属性选择器（`data-field`、`data-preset`、`data-field-lang`）定位表单
  字段，不要硬编码中文标题文字去查找卡片。

## 测完记得清理

用这条流水线或浏览器自动化测试时，填的是真实姓名/邮箱等测试数据，会自动存进
`localStorage['aiResumeBuilder.draft']`——测完在同一个 origin 里 `localStorage.clear()`
（或至少删掉 `aiResumeBuilder.*` 前缀的 key），线上环境更要注意，不要把测试数据留在
`https://junpingkoch-web.github.io/ai-resume-builder/` 的浏览器存储里。
