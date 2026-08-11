(function () {
  "use strict";

  const LANG_KEY = "aiResumeBuilder.uiLang";
  const STORAGE_KEY = "aiResumeBuilder.draft";
  const TEMPLATE_KEY = "aiResumeBuilder.template";
  const PB = window.RESUME_PHRASEBANK;
  const LANGS = ["zh", "en", "de"];
  const TEMPLATES = ["classic", "modern", "minimal", "sidebar", "banner"];

  // ---------- UI dictionary (interface chrome + generated-resume labels) ----------
  const I18N = {
    zh: {
      appTitle: "AI 简历生成器",
      tagline: "模板驱动的三语简历生成 — 不调用任何 AI API，数据只留在你的浏览器里。",
      adLabel: "广告",
      sectionPersonal: "个人信息",
      fieldName: "姓名", fieldNamePh: "张三 / Jane Doe",
      fieldEmail: "邮箱", fieldPhone: "电话",
      fieldLocation: "所在地", fieldLocationPh: "Zürich, Schweiz",
      fieldWebsite: "网站 / LinkedIn", addWebsiteBtn: "+ 添加", websiteExtraPh: "其他网站链接",
      fieldTitle: "职位头衔 / Headline", presetPlaceholderTitle: "— 选择预设自动填三语，或直接在下方输入 —",
      fieldSummary: "个人简介", fieldYearsPh: "年限",
      summaryHint: "套用模板会用你已填写的头衔与前两项技能自动生成三语简介草稿，之后可自行修改。",
      applyTemplateBtn: "套用模板", presetPlaceholderSummary: "— 选择简介模板 —",
      summaryTplExperienced: "有经验", summaryTplEntryLevel: "初入职场", summaryTplCareerChange: "转行",
      sectionExperience: "工作经历", addExperienceBtn: "添加经历", experienceItemLabel: "经历",
      fieldCompany: "公司", startDate: "开始时间", endDate: "结束时间", currentRole: "目前在职",
      fieldRole: "职位", presetPlaceholderRole: "— 选择职位预设，或在下方输入 —",
      fieldBullets: "工作描述（要点）", addBulletBtn: "添加要点", presetPlaceholderVerb: "— 选择动词 —",
      sectionEducation: "教育背景", addEducationBtn: "添加学历", educationItemLabel: "学历",
      fieldSchool: "学校", fieldDegree: "学位 / 证书", presetPlaceholderDegree: "— 选择学位预设，或在下方输入 —",
      fieldFieldOfStudy: "专业",
      sectionSkills: "技能", skillsTechnical: "专业技能", skillsSoft: "软技能", addBtn: "添加",
      customSkillPh: "或输入自定义技能（三语显示相同文字）",
      presetPlaceholderSkillTech: "— 选择专业技能 —", presetPlaceholderSkillSoft: "— 选择软技能 —",
      sectionLanguages: "语言能力", addLanguageBtn: "添加语言", languageItemLabel: "语言",
      fieldLangName: "语言", presetPlaceholderLangName: "— 选择语言，或在下方输入 —",
      fieldLangLevel: "水平", presetPlaceholderLangLevel: "— 选择水平 —",
      resumeLangLabel: "简历语言", templateLabel: "简历模板",
      tplClassic: "经典", tplModern: "现代", tplMinimal: "简约", tplSidebar: "侧边栏", tplBanner: "横幅",
      generateBtn: "生成三语简历", printBtn: "🖨️ 打印 / 导出 PDF", downloadWordBtn: "📝 下载 Word (.doc)", copyTextBtn: "📋 复制文本",
      downloadTextBtn: "⬇️ 下载 .txt", previewEmpty: "填写左侧信息并点击“生成三语简历”，预览会显示在这里。",
      copiedMsg: "✅ 已复制",
      disclaimer: "本工具完全在你的浏览器本地运行，不上传、不存储你的任何数据，也不调用任何 AI API — 三语内容由模板与短语库拼接生成，生成后请务必自行校对。",
      coffeeTooltip: "喜欢这个工具？请我喝杯咖啡", coffeeBtn: "请我喝杯咖啡",
      clearFormTooltip: "清空表单（删除本机保存的所有信息）", clearFormConfirm: "确定要清空表单吗？这会删除本机浏览器保存的所有已填写信息，且无法撤销。",
      helpTitle: "使用说明",
      helpTip1: "姓名、邮箱、电话等联系方式在三语版本中保持不变。",
      helpTip2: "职位头衔、学位、动词、语言等可从下拉菜单中选择 — 选中后会自动生成中/英/德三种说法。",
      helpTip3: "自由填写的内容（如简介、工作描述）需要你分别为每种语言填写一次；可用每个语言框上的“复制”按钮先复制过去再修改。",
      helpTip4: "点击“生成三语简历”后，用预览区上方的语言切换按钮查看中/英/德三个版本，并可打印导出 PDF 或下载文本。",
      helpTip5: "预览区上方还可以切换“简历模板”（经典 / 现代 / 简约 / 侧边栏 / 横幅，参考 Canva、Word 里常见的排版风格），随时更换风格，内容不受影响。",
      helpTip6: "⚠️ 打印小贴士：导出 PDF 时页眉页脚（日期、网址）已自动隐藏；如果你用的是 Firefox 或旧版 Edge 打印时仍然看到这些文字，请在打印对话框里手动取消勾选“更多设置 → 页眉和页脚”。",
      removeBtn: "删除", copyToOthers: "复制到其它语言 →",
      resumeSummary: "个人简介", resumeExperience: "工作经历", resumeEducation: "教育背景",
      resumeSkillsTechnical: "专业技能", resumeSkillsSoft: "软技能", resumeLanguages: "语言能力",
      presentWord: "至今",
      explainTitle: "这里的「AI」到底是什么意思？",
      explainP1: "老实说，这个工具完全不调用任何大语言模型（比如 ChatGPT、Claude）的 API——所谓「智能」，其实是一个我手工整理的中/英/德三语短语库在起作用。职位头衔、学位、动词、技能名称、语言水平这些「预设」字段，选一次下拉菜单，就能同时填出三种语言的标准说法，因为这些词条本来就是我提前按三语一一对应写好的。",
      explainP2: "但个人简介和工作经历描述这类自由填写的内容，工具没办法帮你自动生成或翻译——你需要为每种语言各写一遍。为了减轻负担，每个语言输入框旁边都有一个「复制到其他语言」按钮，可以先把已经写好的一种语言复制过去，再手动调整成地道的表达，而不是逐字硬翻。",
      explainP3: "选择这种做法而不是接入真实AI模型，是刻意的取舍：不需要 API Key、不产生任何算力费用、不需要注册账号，你填写的所有信息只保存在你自己浏览器的本地存储里，从不上传到任何服务器——代价是没法像真正的AI那样帮你润色文笔或凭空生成个性化的段落，生成后请务必自己通读检查一遍。",
      beforeAfterTitle: "举个例子：一条工作经历要点是怎么变强的",
      beforeLabel: "常见的写法（弱）",
      beforeText: "负责客户方面的一些工作，效果还不错。",
      afterLabel: "改进后的写法",
      afterText: "优化了跨部门客户对接流程，将平均响应时间从48小时压缩到12小时。",
      beforeAfterNote: "从「职位描述」下拉菜单选一个动词（比如「优化」），会同时填出中/英/德三种说法——但真正让这条经历变强的，是后面这句话里的两个具体数字（48小时→12小时）。工具能帮你快速选出一个有力的开头动词，剩下的细节还是要你自己填，这也是为什么每次生成后都建议你通读检查一遍。",
      faqTitle: "常见问题",
      faq: [
        { q: "这个工具真的接入了 ChatGPT、Claude 这类AI大模型吗？", a: "没有。这是一个纯前端的模板/短语库工具，不调用任何AI API，也没有后端服务器。所谓「AI」体验，来自提前整理好的中/英/德三语对照词库。" },
        { q: "个人简介和工作描述是自动帮我写好的吗？", a: "不是。这些自由文本内容需要你自己为每种语言分别填写一次；工具只提供「复制到其他语言」按钮帮你把已写好的内容复制过去做起点，具体措辞仍需你自己调整。" },
        { q: "为什么有些字段（比如职位、学位、技能）选一次就能同时出现三种语言？", a: "因为这些是「预设」字段，背后是我提前手工整理好的三语词库——选中一个选项，就是直接调用词库里对应的中/英/德三个版本，不是实时翻译或生成。" },
        { q: "我填写的简历信息会被保存到服务器或被别人看到吗？", a: "不会。所有数据只保存在你自己浏览器的本地存储（localStorage）中，永远不会上传到任何服务器，也没有账号系统。" },
        { q: "生成的简历内容需要我自己检查吗？", a: "需要，而且很重要。虽然预设字段的三语对照是提前校对好的，但自由填写的内容完全出自你自己的输入，生成后请务必通读一遍，确认语法、格式和内容都准确无误。" },
        { q: "没有网络连接可以用这个工具吗？", a: "首次加载页面后，由于工具不依赖任何后端接口或AI API，大部分核心功能（填写、生成、预览、打印）在离线状态下也能正常使用。" }
      ]
    },
    en: {
      appTitle: "AI Resume Builder",
      tagline: "Template-driven trilingual resume generation — no AI API involved, your data never leaves your browser.",
      adLabel: "Advertisement",
      sectionPersonal: "Personal Info",
      fieldName: "Name", fieldNamePh: "张三 / Jane Doe",
      fieldEmail: "Email", fieldPhone: "Phone",
      fieldLocation: "Location", fieldLocationPh: "Zürich, Schweiz",
      fieldWebsite: "Website / LinkedIn", addWebsiteBtn: "+ Add", websiteExtraPh: "Another website link",
      fieldTitle: "Job Title / Headline", presetPlaceholderTitle: "— Pick a preset to fill all 3 languages, or type below —",
      fieldSummary: "Profile Summary", fieldYearsPh: "Years",
      summaryHint: "Applying a template drafts a trilingual summary from your headline and first two skills — edit freely afterwards.",
      applyTemplateBtn: "Apply Template", presetPlaceholderSummary: "— Choose a summary template —",
      summaryTplExperienced: "Experienced", summaryTplEntryLevel: "Entry-level", summaryTplCareerChange: "Career change",
      sectionExperience: "Work Experience", addExperienceBtn: "Add Experience", experienceItemLabel: "Experience",
      fieldCompany: "Company", startDate: "Start Date", endDate: "End Date", currentRole: "I currently work here",
      fieldRole: "Role", presetPlaceholderRole: "— Pick a role preset, or type below —",
      fieldBullets: "Description (bullets)", addBulletBtn: "Add Bullet", presetPlaceholderVerb: "— Pick a verb —",
      sectionEducation: "Education", addEducationBtn: "Add Education", educationItemLabel: "Education",
      fieldSchool: "School", fieldDegree: "Degree / Certificate", presetPlaceholderDegree: "— Pick a degree preset, or type below —",
      fieldFieldOfStudy: "Field of Study",
      sectionSkills: "Skills", skillsTechnical: "Technical Skills", skillsSoft: "Soft Skills", addBtn: "Add",
      customSkillPh: "or type a custom skill (shown the same in all 3 languages)",
      presetPlaceholderSkillTech: "— Pick a technical skill —", presetPlaceholderSkillSoft: "— Pick a soft skill —",
      sectionLanguages: "Languages", addLanguageBtn: "Add Language", languageItemLabel: "Language",
      fieldLangName: "Language", presetPlaceholderLangName: "— Pick a language, or type below —",
      fieldLangLevel: "Level", presetPlaceholderLangLevel: "— Pick a level —",
      resumeLangLabel: "Resume language", templateLabel: "Template",
      tplClassic: "Classic", tplModern: "Modern", tplMinimal: "Minimal", tplSidebar: "Sidebar", tplBanner: "Banner",
      generateBtn: "Generate Trilingual Resume", printBtn: "🖨️ Print / Export PDF", downloadWordBtn: "📝 Download Word (.doc)", copyTextBtn: "📋 Copy Text",
      downloadTextBtn: "⬇️ Download .txt", previewEmpty: "Fill in the form on the left and click “Generate Trilingual Resume” — the preview will appear here.",
      copiedMsg: "✅ Copied",
      disclaimer: "This tool runs entirely in your browser — nothing is uploaded or stored, and no AI API is called. The trilingual content is assembled from templates and a phrase bank, so please proofread it after generating.",
      coffeeTooltip: "Enjoyed this tool? Buy me a coffee", coffeeBtn: "Buy me a coffee",
      clearFormTooltip: "Clear form (deletes everything saved on this device)", clearFormConfirm: "Clear the form? This deletes everything saved in this browser and cannot be undone.",
      helpTitle: "How to use",
      helpTip1: "Contact details (name, email, phone…) stay the same across all three languages.",
      helpTip2: "Job titles, degrees, verbs and languages can be picked from dropdowns — selecting one instantly fills the Chinese/English/German wording.",
      helpTip3: "Free-text content (summary, job descriptions) needs to be written once per language — use the “copy” button on any language box to duplicate it first, then adjust.",
      helpTip4: "After clicking “Generate Trilingual Resume”, use the language switch above the preview to check all three versions, then print to PDF or download as text.",
      helpTip5: "The toolbar above the preview also has a “Template” switch (Classic / Modern / Minimal / Sidebar / Banner, inspired by common Canva and Word resume layouts) — change the style anytime without affecting the content.",
      helpTip6: "⚠️ Print tip: the page header/footer (date, URL) are hidden automatically when exporting to PDF. If you're printing from Firefox or an older Edge build and still see them, uncheck “More settings → Headers and footers” in the print dialog.",
      removeBtn: "Remove", copyToOthers: "Copy to other languages →",
      resumeSummary: "Profile Summary", resumeExperience: "Work Experience", resumeEducation: "Education",
      resumeSkillsTechnical: "Technical Skills", resumeSkillsSoft: "Soft Skills", resumeLanguages: "Languages",
      presentWord: "Present",
      explainTitle: "What does \"AI\" actually mean in this tool's name?",
      explainP1: "Honestly, this tool doesn't call any large language model API (ChatGPT, Claude, or otherwise) at all — the \"smart\" behavior comes from a phrase bank built by hand, covering Chinese, English, and German. Preset fields like job title, degree, action verbs, skill names, and language levels fill all three languages the instant you pick one from a dropdown, simply because those entries were already written in matched triples ahead of time.",
      explainP2: "Free-text fields like your profile summary and job descriptions can't be auto-generated or translated, though — you have to write each one once per language yourself. To ease that, every language box has a \"copy to other languages\" button, so you can copy over what you already wrote and adjust it into natural phrasing, rather than doing a word-for-word translation.",
      explainP3: "Choosing this approach over a real AI model was a deliberate trade-off: no API key, no compute costs, no account needed — everything you type stays in your own browser's local storage and is never uploaded to any server. The cost is that it can't polish your writing or generate a fully personalized paragraph out of thin air the way a real AI could, so always read through the result carefully after generating it.",
      beforeAfterTitle: "An example: how one bullet point gets stronger",
      beforeLabel: "A common (weak) version",
      beforeText: "Handled some client-facing work, results were pretty good.",
      afterLabel: "An improved version",
      afterText: "Optimized cross-team client handoff process, cutting average response time from 48 hours to 12.",
      beforeAfterNote: "Picking a verb like \"Optimized\" from the role dropdown fills in the Chinese/English/German wording instantly — but what actually makes this bullet stronger are the two specific numbers in the rest of the sentence (48 hours → 12). The tool can hand you a strong opening verb quickly; the rest of the detail is still on you to fill in, which is exactly why it's worth reading through what you generate each time.",
      faqTitle: "Frequently Asked Questions",
      faq: [
        { q: "Does this tool actually connect to ChatGPT, Claude, or another AI model?", a: "No. This is a purely front-end template/phrase-bank tool with no AI API calls and no backend server. The \"AI-like\" experience comes from a pre-built trilingual phrase bank." },
        { q: "Does it write my profile summary and job descriptions for me automatically?", a: "No. Those free-text fields need to be filled in once per language by you; the tool only offers a \"copy to other languages\" button to give you a starting point — the actual wording is still up to you." },
        { q: "Why do some fields fill in all three languages when I pick just one?", a: "Because those are preset fields backed by a phrase bank built by hand — picking an option pulls the matching Chinese/English/German entries straight from that bank, not a live translation or generation." },
        { q: "Is the resume info I enter saved to a server or visible to anyone else?", a: "No. Everything is stored only in your own browser's local storage; it's never uploaded to a server, and there's no account system." },
        { q: "Do I need to double-check the generated resume myself?", a: "Yes, and it matters. While the preset fields' trilingual pairs were proofread ahead of time, all free-text content comes entirely from your own input — always read through the result carefully." },
        { q: "Can I use this tool without an internet connection?", a: "After the page loads once, most core features (filling in the form, generating, previewing, printing) work fine offline, since the tool doesn't depend on any backend or AI API." }
      ]
    },
    de: {
      appTitle: "KI-Lebenslauf-Generator",
      tagline: "Vorlagenbasierte dreisprachige Lebenslauf-Erstellung — ohne KI-API, deine Daten bleiben im Browser.",
      adLabel: "Anzeige",
      sectionPersonal: "Persönliche Angaben",
      fieldName: "Name", fieldNamePh: "张三 / Jane Doe",
      fieldEmail: "E-Mail", fieldPhone: "Telefon",
      fieldLocation: "Wohnort", fieldLocationPh: "Zürich, Schweiz",
      fieldWebsite: "Website / LinkedIn", addWebsiteBtn: "+ Hinzufügen", websiteExtraPh: "Weiterer Website-Link",
      fieldTitle: "Berufsbezeichnung / Headline", presetPlaceholderTitle: "— Vorlage wählen (füllt alle 3 Sprachen), oder unten eintippen —",
      fieldSummary: "Profil", fieldYearsPh: "Jahre",
      summaryHint: "Die Vorlage erstellt einen dreisprachigen Profil-Entwurf aus deiner Berufsbezeichnung und den ersten beiden Kenntnissen — danach frei bearbeitbar.",
      applyTemplateBtn: "Vorlage anwenden", presetPlaceholderSummary: "— Profil-Vorlage wählen —",
      summaryTplExperienced: "Erfahren", summaryTplEntryLevel: "Berufseinstieg", summaryTplCareerChange: "Quereinstieg",
      sectionExperience: "Berufserfahrung", addExperienceBtn: "Station hinzufügen", experienceItemLabel: "Station",
      fieldCompany: "Unternehmen", startDate: "Beginn", endDate: "Ende", currentRole: "Aktuelle Position",
      fieldRole: "Position", presetPlaceholderRole: "— Positions-Vorlage wählen, oder unten eintippen —",
      fieldBullets: "Beschreibung (Stichpunkte)", addBulletBtn: "Stichpunkt hinzufügen", presetPlaceholderVerb: "— Verb wählen —",
      sectionEducation: "Ausbildung", addEducationBtn: "Ausbildung hinzufügen", educationItemLabel: "Ausbildung",
      fieldSchool: "Schule / Hochschule", fieldDegree: "Abschluss / Zertifikat", presetPlaceholderDegree: "— Abschluss-Vorlage wählen, oder unten eintippen —",
      fieldFieldOfStudy: "Studienfach",
      sectionSkills: "Kenntnisse", skillsTechnical: "Fachliche Kenntnisse", skillsSoft: "Soft Skills", addBtn: "Hinzufügen",
      customSkillPh: "oder eigene Kenntnis eintragen (in allen 3 Sprachen gleich angezeigt)",
      presetPlaceholderSkillTech: "— Fachliche Kenntnis wählen —", presetPlaceholderSkillSoft: "— Soft Skill wählen —",
      sectionLanguages: "Sprachkenntnisse", addLanguageBtn: "Sprache hinzufügen", languageItemLabel: "Sprache",
      fieldLangName: "Sprache", presetPlaceholderLangName: "— Sprache wählen, oder unten eintippen —",
      fieldLangLevel: "Niveau", presetPlaceholderLangLevel: "— Niveau wählen —",
      resumeLangLabel: "Sprache des Lebenslaufs", templateLabel: "Vorlage",
      tplClassic: "Klassisch", tplModern: "Modern", tplMinimal: "Minimalistisch", tplSidebar: "Seitenleiste", tplBanner: "Banner",
      generateBtn: "Dreisprachigen Lebenslauf erstellen", printBtn: "🖨️ Drucken / Als PDF exportieren", downloadWordBtn: "📝 Als Word (.doc) herunterladen", copyTextBtn: "📋 Text kopieren",
      downloadTextBtn: "⬇️ Als .txt herunterladen", previewEmpty: "Fülle links das Formular aus und klicke auf “Dreisprachigen Lebenslauf erstellen” — die Vorschau erscheint hier.",
      copiedMsg: "✅ Kopiert",
      disclaimer: "Dieses Tool läuft vollständig lokal in deinem Browser — nichts wird hochgeladen oder gespeichert, und es wird keine KI-API aufgerufen. Die dreisprachigen Inhalte werden aus Vorlagen und einer Phrasensammlung zusammengesetzt — bitte nach dem Erstellen unbedingt Korrektur lesen.",
      coffeeTooltip: "Hat dir das Tool geholfen? Spendier einen Kaffee", coffeeBtn: "Spendier einen Kaffee",
      clearFormTooltip: "Formular leeren (löscht alle auf diesem Gerät gespeicherten Angaben)", clearFormConfirm: "Formular wirklich leeren? Dadurch werden alle in diesem Browser gespeicherten Angaben gelöscht — das kann nicht rückgängig gemacht werden.",
      helpTitle: "Bedienung",
      helpTip1: "Kontaktdaten (Name, E-Mail, Telefon …) bleiben in allen drei Sprachversionen gleich.",
      helpTip2: "Berufsbezeichnung, Abschluss, Verben und Sprachen lassen sich aus Dropdowns wählen — die Auswahl füllt sofort die chinesische/englische/deutsche Formulierung.",
      helpTip3: "Freitext (Profil, Tätigkeitsbeschreibungen) muss einmal pro Sprache geschrieben werden — mit dem “Kopieren”-Button in jedem Sprachfeld zuerst duplizieren und dann anpassen.",
      helpTip4: "Nach Klick auf “Dreisprachigen Lebenslauf erstellen” oben in der Vorschau zwischen den drei Sprachen wechseln, dann als PDF drucken oder als Text herunterladen.",
      helpTip5: "Oben in der Vorschau lässt sich außerdem die “Vorlage” wechseln (Klassisch / Modern / Minimalistisch / Seitenleiste / Banner, angelehnt an gängige Canva- und Word-Layouts) — jederzeit ein anderes Layout wählen, ohne den Inhalt zu verändern.",
      helpTip6: "⚠️ Drucktipp: Kopf- und Fußzeilen (Datum, URL) werden beim PDF-Export automatisch ausgeblendet. Falls sie in Firefox oder einem älteren Edge trotzdem erscheinen, im Druckdialog unter „Weitere Einstellungen → Kopf- und Fußzeilen“ die Option deaktivieren.",
      removeBtn: "Entfernen", copyToOthers: "In andere Sprachen kopieren →",
      resumeSummary: "Profil", resumeExperience: "Berufserfahrung", resumeEducation: "Ausbildung",
      resumeSkillsTechnical: "Fachliche Kenntnisse", resumeSkillsSoft: "Soft Skills", resumeLanguages: "Sprachkenntnisse",
      presentWord: "Heute",
      explainTitle: "Was bedeutet „KI\" in diesem Tool eigentlich?",
      explainP1: "Ehrlich gesagt ruft dieses Tool überhaupt keine API eines großen Sprachmodells auf (weder ChatGPT noch Claude oder ein anderes) — das „intelligente\" Verhalten kommt von einer Phrasensammlung, die von Hand für Chinesisch, Englisch und Deutsch erstellt wurde. Voreingestellte Felder wie Berufsbezeichnung, Abschluss, Verben, Kenntnisse und Sprachniveaus füllen sich in allen drei Sprachen, sobald du eine Option aus einem Dropdown wählst — einfach weil diese Einträge vorab als abgestimmte Dreiergruppen geschrieben wurden.",
      explainP2: "Freitextfelder wie dein Profil und deine Tätigkeitsbeschreibungen lassen sich dagegen nicht automatisch erstellen oder übersetzen — die musst du für jede Sprache einmal selbst schreiben. Um das zu erleichtern, hat jedes Sprachfeld einen „Kopieren\"-Button, mit dem du das bereits Geschriebene übernimmst und dann in natürliche Formulierungen anpasst, statt Wort für Wort zu übersetzen.",
      explainP3: "Diese Herangehensweise statt eines echten KI-Modells war eine bewusste Entscheidung: kein API-Key, keine Rechenkosten, kein Konto nötig — alles, was du eingibst, bleibt im lokalen Speicher deines eigenen Browsers und wird nie auf einen Server hochgeladen. Der Preis dafür: Das Tool kann deinen Text nicht stilistisch aufpolieren oder aus dem Nichts einen individuellen Absatz generieren, wie es eine echte KI könnte — lies das Ergebnis nach dem Erstellen deshalb immer sorgfältig durch.",
      beforeAfterTitle: "Ein Beispiel: wie ein Stichpunkt stärker wird",
      beforeLabel: "Eine übliche (schwache) Version",
      beforeText: "War für einige kundenbezogene Aufgaben zuständig, Ergebnisse waren ganz gut.",
      afterLabel: "Eine verbesserte Version",
      afterText: "Optimierte den abteilungsübergreifenden Kundenübergabeprozess und verkürzte die durchschnittliche Reaktionszeit von 48 auf 12 Stunden.",
      beforeAfterNote: "Ein Verb wie „Optimierte\" aus dem Positions-Dropdown auszuwählen, füllt sofort die chinesische/englische/deutsche Formulierung — was diesen Stichpunkt aber wirklich stärker macht, sind die zwei konkreten Zahlen im Rest des Satzes (48 Stunden → 12 Stunden). Das Tool liefert dir schnell ein starkes Anfangsverb; den Rest der Details musst du weiterhin selbst ausfüllen — genau deshalb lohnt es sich, das Ergebnis nach jeder Erstellung durchzulesen.",
      faqTitle: "Häufig gestellte Fragen",
      faq: [
        { q: "Verbindet sich dieses Tool tatsächlich mit ChatGPT, Claude oder einem anderen KI-Modell?", a: "Nein. Es ist ein rein clientseitiges Vorlagen-/Phrasensammlung-Tool ohne KI-API-Aufrufe und ohne Backend-Server. Das „KI-artige\" Erlebnis kommt aus einer vorab erstellten dreisprachigen Phrasensammlung." },
        { q: "Schreibt es mein Profil und meine Tätigkeitsbeschreibungen automatisch für mich?", a: "Nein. Diese Freitextfelder musst du einmal pro Sprache selbst ausfüllen; das Tool bietet nur einen „Kopieren\"-Button als Ausgangspunkt — die tatsächliche Formulierung liegt bei dir." },
        { q: "Warum füllen sich manche Felder in allen drei Sprachen, wenn ich nur eine wähle?", a: "Weil das voreingestellte Felder sind, die auf einer handgefertigten Phrasensammlung basieren — eine Auswahl ruft direkt die passenden chinesischen/englischen/deutschen Einträge aus dieser Sammlung ab, keine Live-Übersetzung." },
        { q: "Werden meine Lebenslaufdaten auf einem Server gespeichert oder für andere sichtbar?", a: "Nein. Alles wird ausschließlich im lokalen Speicher deines eigenen Browsers abgelegt, nie auf einen Server hochgeladen, und es gibt kein Konto-System." },
        { q: "Muss ich den erstellten Lebenslauf selbst noch einmal prüfen?", a: "Ja, und das ist wichtig. Die dreisprachigen Paare der voreingestellten Felder wurden vorab Korrektur gelesen, aber alle Freitextinhalte stammen komplett aus deiner eigenen Eingabe." },
        { q: "Kann ich dieses Tool ohne Internetverbindung nutzen?", a: "Nach dem ersten Laden der Seite funktionieren die meisten Kernfunktionen auch offline, da das Tool keine Backend- oder KI-API benötigt." }
      ]
    }
  };

  // ---------- State ----------
  let uid_counter = 0;
  function uid() { uid_counter += 1; return "id" + Date.now().toString(36) + uid_counter; }

  function emptyLangObj() { return { zh: "", en: "", de: "" }; }
  function newBullet() { return { id: uid(), verb: emptyLangObj(), text: emptyLangObj() }; }
  function newExperience() {
    return { id: uid(), company: "", location: "", start: "", end: "", current: false, role: emptyLangObj(), bullets: [newBullet()] };
  }
  function newEducation() {
    return { id: uid(), school: "", field: "", location: "", start: "", end: "", degree: emptyLangObj() };
  }
  function newLanguageEntry() {
    return { id: uid(), name: emptyLangObj(), level: emptyLangObj() };
  }
  function defaultData() {
    return {
      personal: {
        name: "", email: "", phone: "", location: "", website: "", websitesExtra: [],
        title: emptyLangObj(), summary: emptyLangObj()
      },
      experience: [newExperience()],
      education: [newEducation()],
      skills: { technical: [], soft: [] },
      languages: []
    };
  }

  function loadDraft() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || !parsed.personal) return null;
      if (!Array.isArray(parsed.personal.websitesExtra)) parsed.personal.websitesExtra = [];
      return parsed;
    } catch (e) { return null; }
  }

  const state = {
    uiLang: localStorage.getItem(LANG_KEY) || "de",
    resumeLang: "zh",
    template: TEMPLATES.includes(localStorage.getItem(TEMPLATE_KEY)) ? localStorage.getItem(TEMPLATE_KEY) : "classic",
    data: loadDraft() || defaultData(),
    generated: null
  };

  function saveDraft() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data)); } catch (e) { /* storage unavailable */ }
  }

  function t(key, lang) {
    const l = lang || state.uiLang;
    return (I18N[l] && I18N[l][key]) || I18N.en[key] || key;
  }

  function escapeHtml(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function findByKey(bank, key) { return bank.find((x) => x.key === key); }

  // ---------- Generic preset + trilingual-field helpers ----------
  function buildPresetOptions(selectEl, bank, placeholderText) {
    selectEl.innerHTML = '<option value="">' + escapeHtml(placeholderText) + "</option>" +
      bank.map((item) => '<option value="' + item.key + '">' + escapeHtml(item[state.uiLang] || item.en) + "</option>").join("");
    selectEl.value = "";
  }

  function renderLangTabsField(container, obj, opts) {
    const multiline = !!(opts && opts.multiline);
    const l = state.uiLang;
    container.innerHTML = (
      '<div class="lang-tab-item">' +
        '<div class="lang-tab-head">' +
          '<span class="lang-tab-badge">' + l.toUpperCase() + '</span>' +
          '<button type="button" class="copy-lang-btn" data-copy-lang="' + l + '">' + escapeHtml(t("copyToOthers")) + '</button>' +
        '</div>' +
        (multiline
          ? '<textarea data-field-lang="' + l + '" rows="2">' + escapeHtml(obj[l]) + '</textarea>'
          : '<input type="text" data-field-lang="' + l + '" value="' + escapeHtml(obj[l]) + '">') +
      '</div>'
    );

    container.querySelectorAll("[data-field-lang]").forEach((el) => {
      el.addEventListener("input", () => {
        obj[el.dataset.fieldLang] = el.value;
        saveDraft();
      });
    });
    container.querySelectorAll("[data-copy-lang]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const srcLang = btn.dataset.copyLang;
        const val = obj[srcLang] || "";
        LANGS.forEach((otherLang) => { if (otherLang !== srcLang) obj[otherLang] = val; });
        renderLangTabsField(container, obj, opts);
        saveDraft();
      });
    });
  }

  function wirePresetInsert(selectEl, bank, obj, refreshFn) {
    selectEl.addEventListener("change", () => {
      const item = findByKey(bank, selectEl.value);
      if (item) {
        obj.zh = item.zh; obj.en = item.en; obj.de = item.de;
        refreshFn();
        saveDraft();
      }
      selectEl.value = "";
    });
  }

  // ---------- Date formatting ----------
  function formatMonthYear(value, lang) {
    if (!value) return "";
    const parts = value.split("-").map(Number);
    const y = parts[0], m = parts[1];
    if (!y || !m) return value;
    if (lang === "de") return String(m).padStart(2, "0") + "." + y;
    if (lang === "zh") return y + "年" + m + "月";
    const d = new Date(y, m - 1, 1);
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
  }

  function dateRange(entry, lang) {
    const start = formatMonthYear(entry.start, lang);
    const end = entry.current ? t("presentWord", lang) : formatMonthYear(entry.end, lang);
    if (!start && !end) return "";
    return start + " – " + end;
  }

  function joinList(arr, lang) {
    return arr.join(lang === "zh" ? "、" : ", ");
  }

  // ---------- Personal section ----------
  const fName = document.getElementById("fName");
  const fEmail = document.getElementById("fEmail");
  const fPhone = document.getElementById("fPhone");
  const fLocation = document.getElementById("fLocation");
  const fWebsite = document.getElementById("fWebsite");
  const addWebsiteBtn = document.getElementById("addWebsiteBtn");
  const websiteExtraListEl = document.getElementById("websiteExtraList");
  const titlePreset = document.getElementById("titlePreset");
  const titleLangField = document.getElementById("titleLangField");
  const summaryTemplatePreset = document.getElementById("summaryTemplatePreset");
  const summaryYears = document.getElementById("summaryYears");
  const applySummaryTemplateBtn = document.getElementById("applySummaryTemplate");
  const summaryLangField = document.getElementById("summaryLangField");

  function bindPlainFieldOnce(el, path) {
    el.addEventListener("input", () => {
      state.data.personal[path] = el.value;
      saveDraft();
    });
  }

  function renderWebsiteExtraList() {
    const list = state.data.personal.websitesExtra;
    websiteExtraListEl.innerHTML = list.map((url, idx) => (
      '<div class="website-extra-row" data-idx="' + idx + '">' +
        '<input type="text" data-idx="' + idx + '" value="' + escapeHtml(url) + '" placeholder="' + escapeHtml(t("websiteExtraPh")) + '">' +
        '<button type="button" class="remove-btn" data-action="remove-website">' + escapeHtml(t("removeBtn")) + '</button>' +
      '</div>'
    )).join("");

    websiteExtraListEl.querySelectorAll("input[data-idx]").forEach((el) => {
      el.addEventListener("input", () => {
        list[Number(el.dataset.idx)] = el.value;
        saveDraft();
      });
    });
    websiteExtraListEl.querySelectorAll('[data-action="remove-website"]').forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.closest(".website-extra-row").dataset.idx);
        list.splice(idx, 1);
        renderWebsiteExtraList();
        saveDraft();
      });
    });
  }

  function initPersonalSectionOnce() {
    bindPlainFieldOnce(fName, "name");
    bindPlainFieldOnce(fEmail, "email");
    bindPlainFieldOnce(fPhone, "phone");
    bindPlainFieldOnce(fLocation, "location");
    bindPlainFieldOnce(fWebsite, "website");
    addWebsiteBtn.addEventListener("click", () => {
      state.data.personal.websitesExtra.push("");
      renderWebsiteExtraList();
      saveDraft();
    });
    wirePresetInsert(titlePreset, PB.jobTitles, state.data.personal.title, () => renderLangTabsField(titleLangField, state.data.personal.title));
  }

  function renderPersonalSection() {
    fName.value = state.data.personal.name || "";
    fEmail.value = state.data.personal.email || "";
    fPhone.value = state.data.personal.phone || "";
    fLocation.value = state.data.personal.location || "";
    fWebsite.value = state.data.personal.website || "";
    renderWebsiteExtraList();

    buildPresetOptions(titlePreset, PB.jobTitles, t("presetPlaceholderTitle"));
    renderLangTabsField(titleLangField, state.data.personal.title);

    summaryTemplatePreset.innerHTML = '<option value="">' + escapeHtml(t("presetPlaceholderSummary")) + "</option>" +
      PB.summaryTemplates.map((tpl) => '<option value="' + tpl.key + '">' + escapeHtml(t("summaryTpl" + tpl.key.replace(/(^|_)([a-z])/g, (m, p1, p2) => p2.toUpperCase()))) + "</option>").join("");
    renderLangTabsField(summaryLangField, state.data.personal.summary, { multiline: true });
  }

  applySummaryTemplateBtn.addEventListener("click", () => {
    const key = summaryTemplatePreset.value;
    if (!key) return;
    const tpl = findByKey(PB.summaryTemplates, key);
    if (!tpl) return;
    const years = summaryYears.value || "3";
    const allSkills = state.data.skills.technical.concat(state.data.skills.soft);
    const fallbackSkill1 = { zh: "专业技能", en: "core skills", de: "Fachkenntnissen" };
    const fallbackSkill2 = { zh: "团队合作", en: "teamwork", de: "Teamarbeit" };
    const skill1 = allSkills[0] || fallbackSkill1;
    const skill2 = allSkills[1] || fallbackSkill2;
    const fallbackTitle = { zh: "专业人士", en: "professional", de: "Fachkraft" };
    LANGS.forEach((lang) => {
      let str = tpl[lang];
      str = str.split("{years}").join(years)
        .split("{title}").join(state.data.personal.title[lang] || fallbackTitle[lang])
        .split("{skill1}").join(skill1[lang] || skill1.en || "")
        .split("{skill2}").join(skill2[lang] || skill2.en || "");
      state.data.personal.summary[lang] = str;
    });
    renderLangTabsField(summaryLangField, state.data.personal.summary, { multiline: true });
    saveDraft();
  });

  // ---------- Experience ----------
  const experienceListEl = document.getElementById("experienceList");

  function renderExperienceList() {
    experienceListEl.innerHTML = state.data.experience.map((exp, idx) => (
      '<div class="repeat-item" data-id="' + exp.id + '">' +
        '<div class="repeat-item-head">' +
          '<span class="repeat-item-title">' + escapeHtml(t("experienceItemLabel")) + " #" + (idx + 1) + '</span>' +
          '<button type="button" class="remove-btn" data-action="remove-experience">' + escapeHtml(t("removeBtn")) + '</button>' +
        '</div>' +
        '<div class="field-grid">' +
          '<div class="field"><label>' + escapeHtml(t("fieldCompany")) + '</label><input type="text" data-field="company" value="' + escapeHtml(exp.company) + '"></div>' +
          '<div class="field"><label>' + escapeHtml(t("fieldLocation")) + '</label><input type="text" data-field="location" value="' + escapeHtml(exp.location) + '"></div>' +
        '</div>' +
        '<div class="date-row">' +
          '<div class="field"><label>' + escapeHtml(t("startDate")) + '</label><input type="month" data-field="start" value="' + escapeHtml(exp.start) + '"></div>' +
          '<div class="field"><label>' + escapeHtml(t("endDate")) + '</label><input type="month" data-field="end" value="' + escapeHtml(exp.end) + '" ' + (exp.current ? "disabled" : "") + '></div>' +
        '</div>' +
        '<label class="checkbox-row"><input type="checkbox" data-field="current" ' + (exp.current ? "checked" : "") + '> ' + escapeHtml(t("currentRole")) + '</label>' +
        '<div class="field" style="margin-top:12px;">' +
          '<label>' + escapeHtml(t("fieldRole")) + '</label>' +
          '<div class="preset-row"><select class="preset-select" data-preset="role"></select></div>' +
          '<div class="lang-tabs-field" data-role-langtabs></div>' +
        '</div>' +
        '<div class="field" style="margin-top:12px;">' +
          '<label>' + escapeHtml(t("fieldBullets")) + '</label>' +
          '<div class="bullet-list" data-bullet-list></div>' +
          '<button type="button" class="btn btn-secondary btn-small" data-action="add-bullet" style="margin-top:8px;">+ ' + escapeHtml(t("addBulletBtn")) + '</button>' +
        '</div>' +
      '</div>'
    )).join("");

    state.data.experience.forEach((exp) => {
      const itemEl = experienceListEl.querySelector('.repeat-item[data-id="' + exp.id + '"]');

      itemEl.querySelectorAll("[data-field]").forEach((el) => {
        const evt = el.type === "checkbox" ? "change" : "input";
        el.addEventListener(evt, () => {
          const f = el.dataset.field;
          if (f === "current") {
            exp.current = el.checked;
            const endInput = itemEl.querySelector('[data-field="end"]');
            endInput.disabled = exp.current;
            if (exp.current) { exp.end = ""; endInput.value = ""; }
          } else {
            exp[f] = el.value;
          }
          saveDraft();
        });
      });

      const roleSelect = itemEl.querySelector('[data-preset="role"]');
      buildPresetOptions(roleSelect, PB.jobTitles, t("presetPlaceholderRole"));
      const roleTabsEl = itemEl.querySelector("[data-role-langtabs]");
      renderLangTabsField(roleTabsEl, exp.role);
      wirePresetInsert(roleSelect, PB.jobTitles, exp.role, () => renderLangTabsField(roleTabsEl, exp.role));

      const bulletListEl = itemEl.querySelector("[data-bullet-list]");
      renderBulletList(bulletListEl, exp);

      itemEl.querySelector('[data-action="remove-experience"]').addEventListener("click", () => {
        state.data.experience = state.data.experience.filter((x) => x.id !== exp.id);
        renderExperienceList();
        saveDraft();
      });
      itemEl.querySelector('[data-action="add-bullet"]').addEventListener("click", () => {
        exp.bullets.push(newBullet());
        renderBulletList(bulletListEl, exp);
        saveDraft();
      });
    });
  }

  function renderBulletList(container, exp) {
    container.innerHTML = exp.bullets.map((b) => (
      '<div class="bullet-row" data-id="' + b.id + '">' +
        '<div class="preset-row">' +
          '<select class="preset-select" data-preset="verb"></select>' +
          '<button type="button" class="remove-btn" data-action="remove-bullet">' + escapeHtml(t("removeBtn")) + '</button>' +
        '</div>' +
        '<div class="lang-tabs-field" data-verb-langtabs style="margin-bottom:8px;"></div>' +
        '<div class="lang-tabs-field" data-text-langtabs></div>' +
      '</div>'
    )).join("");

    exp.bullets.forEach((b) => {
      const rowEl = container.querySelector('.bullet-row[data-id="' + b.id + '"]');
      const verbSelect = rowEl.querySelector('[data-preset="verb"]');
      buildPresetOptions(verbSelect, PB.actionVerbs, t("presetPlaceholderVerb"));
      const verbTabsEl = rowEl.querySelector("[data-verb-langtabs]");
      renderLangTabsField(verbTabsEl, b.verb);
      wirePresetInsert(verbSelect, PB.actionVerbs, b.verb, () => renderLangTabsField(verbTabsEl, b.verb));

      const textTabsEl = rowEl.querySelector("[data-text-langtabs]");
      renderLangTabsField(textTabsEl, b.text, { multiline: true });

      rowEl.querySelector('[data-action="remove-bullet"]').addEventListener("click", () => {
        exp.bullets = exp.bullets.filter((x) => x.id !== b.id);
        renderBulletList(container, exp);
        saveDraft();
      });
    });
  }

  document.getElementById("addExperience").addEventListener("click", () => {
    state.data.experience.push(newExperience());
    renderExperienceList();
    saveDraft();
  });

  // ---------- Education ----------
  const educationListEl = document.getElementById("educationList");

  function renderEducationList() {
    educationListEl.innerHTML = state.data.education.map((edu, idx) => (
      '<div class="repeat-item" data-id="' + edu.id + '">' +
        '<div class="repeat-item-head">' +
          '<span class="repeat-item-title">' + escapeHtml(t("educationItemLabel")) + " #" + (idx + 1) + '</span>' +
          '<button type="button" class="remove-btn" data-action="remove-education">' + escapeHtml(t("removeBtn")) + '</button>' +
        '</div>' +
        '<div class="field-grid">' +
          '<div class="field"><label>' + escapeHtml(t("fieldSchool")) + '</label><input type="text" data-field="school" value="' + escapeHtml(edu.school) + '"></div>' +
          '<div class="field"><label>' + escapeHtml(t("fieldFieldOfStudy")) + '</label><input type="text" data-field="field" value="' + escapeHtml(edu.field) + '"></div>' +
          '<div class="field"><label>' + escapeHtml(t("fieldLocation")) + '</label><input type="text" data-field="location" value="' + escapeHtml(edu.location) + '"></div>' +
        '</div>' +
        '<div class="date-row">' +
          '<div class="field"><label>' + escapeHtml(t("startDate")) + '</label><input type="month" data-field="start" value="' + escapeHtml(edu.start) + '"></div>' +
          '<div class="field"><label>' + escapeHtml(t("endDate")) + '</label><input type="month" data-field="end" value="' + escapeHtml(edu.end) + '"></div>' +
        '</div>' +
        '<div class="field" style="margin-top:12px;">' +
          '<label>' + escapeHtml(t("fieldDegree")) + '</label>' +
          '<div class="preset-row"><select class="preset-select" data-preset="degree"></select></div>' +
          '<div class="lang-tabs-field" data-degree-langtabs></div>' +
        '</div>' +
      '</div>'
    )).join("");

    state.data.education.forEach((edu) => {
      const itemEl = educationListEl.querySelector('.repeat-item[data-id="' + edu.id + '"]');
      itemEl.querySelectorAll("[data-field]").forEach((el) => {
        el.addEventListener("input", () => {
          edu[el.dataset.field] = el.value;
          saveDraft();
        });
      });
      const degreeSelect = itemEl.querySelector('[data-preset="degree"]');
      buildPresetOptions(degreeSelect, PB.degrees, t("presetPlaceholderDegree"));
      const degreeTabsEl = itemEl.querySelector("[data-degree-langtabs]");
      renderLangTabsField(degreeTabsEl, edu.degree);
      wirePresetInsert(degreeSelect, PB.degrees, edu.degree, () => renderLangTabsField(degreeTabsEl, edu.degree));

      itemEl.querySelector('[data-action="remove-education"]').addEventListener("click", () => {
        state.data.education = state.data.education.filter((x) => x.id !== edu.id);
        renderEducationList();
        saveDraft();
      });
    });
  }

  document.getElementById("addEducation").addEventListener("click", () => {
    state.data.education.push(newEducation());
    renderEducationList();
    saveDraft();
  });

  // ---------- Skills ----------
  const techSkillPreset = document.getElementById("techSkillPreset");
  const softSkillPreset = document.getElementById("softSkillPreset");
  const techSkillCustom = document.getElementById("techSkillCustom");
  const softSkillCustom = document.getElementById("softSkillCustom");
  const techSkillChips = document.getElementById("techSkillChips");
  const softSkillChips = document.getElementById("softSkillChips");

  function renderSkillChips(container, list, category) {
    container.innerHTML = list.map((skill, idx) => (
      '<span class="chip" data-idx="' + idx + '">' + escapeHtml(skill[state.uiLang] || skill.en) +
      '<span class="chip-remove" data-action="remove-skill" data-category="' + category + '" data-idx="' + idx + '">&times;</span></span>'
    )).join("");
    container.querySelectorAll('[data-action="remove-skill"]').forEach((el) => {
      el.addEventListener("click", () => {
        const idx = Number(el.dataset.idx);
        state.data.skills[category].splice(idx, 1);
        renderSkillChips(container, state.data.skills[category], category);
        saveDraft();
      });
    });
  }

  function renderSkillsSection() {
    buildPresetOptions(techSkillPreset, PB.skills.technical, t("presetPlaceholderSkillTech"));
    buildPresetOptions(softSkillPreset, PB.skills.soft, t("presetPlaceholderSkillSoft"));
    renderSkillChips(techSkillChips, state.data.skills.technical, "technical");
    renderSkillChips(softSkillChips, state.data.skills.soft, "soft");
  }

  document.getElementById("addTechSkill").addEventListener("click", () => {
    const item = findByKey(PB.skills.technical, techSkillPreset.value);
    if (!item) return;
    state.data.skills.technical.push({ zh: item.zh, en: item.en, de: item.de });
    techSkillPreset.value = "";
    renderSkillChips(techSkillChips, state.data.skills.technical, "technical");
    saveDraft();
  });
  document.getElementById("addSoftSkill").addEventListener("click", () => {
    const item = findByKey(PB.skills.soft, softSkillPreset.value);
    if (!item) return;
    state.data.skills.soft.push({ zh: item.zh, en: item.en, de: item.de });
    softSkillPreset.value = "";
    renderSkillChips(softSkillChips, state.data.skills.soft, "soft");
    saveDraft();
  });
  document.getElementById("addTechSkillCustom").addEventListener("click", () => {
    const v = techSkillCustom.value.trim();
    if (!v) return;
    state.data.skills.technical.push({ zh: v, en: v, de: v });
    techSkillCustom.value = "";
    renderSkillChips(techSkillChips, state.data.skills.technical, "technical");
    saveDraft();
  });
  document.getElementById("addSoftSkillCustom").addEventListener("click", () => {
    const v = softSkillCustom.value.trim();
    if (!v) return;
    state.data.skills.soft.push({ zh: v, en: v, de: v });
    softSkillCustom.value = "";
    renderSkillChips(softSkillChips, state.data.skills.soft, "soft");
    saveDraft();
  });

  // ---------- Languages ----------
  const languageListEl = document.getElementById("languageList");

  function renderLanguageList() {
    languageListEl.innerHTML = state.data.languages.map((lang, idx) => (
      '<div class="repeat-item" data-id="' + lang.id + '">' +
        '<div class="repeat-item-head">' +
          '<span class="repeat-item-title">' + escapeHtml(t("languageItemLabel")) + " #" + (idx + 1) + '</span>' +
          '<button type="button" class="remove-btn" data-action="remove-language">' + escapeHtml(t("removeBtn")) + '</button>' +
        '</div>' +
        '<div class="field">' +
          '<label>' + escapeHtml(t("fieldLangName")) + '</label>' +
          '<div class="preset-row"><select class="preset-select" data-preset="langname"></select></div>' +
          '<div class="lang-tabs-field" data-name-langtabs></div>' +
        '</div>' +
        '<div class="field" style="margin-top:12px;">' +
          '<label>' + escapeHtml(t("fieldLangLevel")) + '</label>' +
          '<div class="preset-row"><select class="preset-select" data-preset="langlevel"></select></div>' +
          '<div class="lang-tabs-field" data-level-langtabs></div>' +
        '</div>' +
      '</div>'
    )).join("");

    state.data.languages.forEach((lang) => {
      const itemEl = languageListEl.querySelector('.repeat-item[data-id="' + lang.id + '"]');
      const nameSelect = itemEl.querySelector('[data-preset="langname"]');
      buildPresetOptions(nameSelect, PB.languageNames, t("presetPlaceholderLangName"));
      const nameTabsEl = itemEl.querySelector("[data-name-langtabs]");
      renderLangTabsField(nameTabsEl, lang.name);
      wirePresetInsert(nameSelect, PB.languageNames, lang.name, () => renderLangTabsField(nameTabsEl, lang.name));

      const levelSelect = itemEl.querySelector('[data-preset="langlevel"]');
      buildPresetOptions(levelSelect, PB.languageLevels, t("presetPlaceholderLangLevel"));
      const levelTabsEl = itemEl.querySelector("[data-level-langtabs]");
      renderLangTabsField(levelTabsEl, lang.level);
      wirePresetInsert(levelSelect, PB.languageLevels, lang.level, () => renderLangTabsField(levelTabsEl, lang.level));

      itemEl.querySelector('[data-action="remove-language"]').addEventListener("click", () => {
        state.data.languages = state.data.languages.filter((x) => x.id !== lang.id);
        renderLanguageList();
        saveDraft();
      });
    });
  }

  document.getElementById("addLanguage").addEventListener("click", () => {
    state.data.languages.push(newLanguageEntry());
    renderLanguageList();
    saveDraft();
  });

  // ---------- Generation ----------
  function buildResumeForLang(lang) {
    const p = state.data.personal;
    const contact = [p.email, p.phone, p.location].filter(Boolean);
    const links = [p.website].concat(p.websitesExtra || []).filter(Boolean);
    const experience = state.data.experience
      .filter((e) => e.company || e.role[lang] || e.bullets.some((b) => b.text[lang]))
      .map((e) => ({
        company: e.company, location: e.location,
        role: e.role[lang], dates: dateRange(e, lang),
        bullets: e.bullets.filter((b) => b.text[lang]).map((b) => ((b.verb[lang] ? b.verb[lang] + " " : "") + b.text[lang]))
      }));
    const education = state.data.education
      .filter((e) => e.school || e.degree[lang])
      .map((e) => ({
        school: e.school, field: e.field, location: e.location,
        degree: e.degree[lang], dates: dateRange(e, lang)
      }));
    const skillsTechnical = state.data.skills.technical.map((s) => s[lang]).filter(Boolean);
    const skillsSoft = state.data.skills.soft.map((s) => s[lang]).filter(Boolean);
    const languages = state.data.languages
      .filter((l) => l.name[lang])
      .map((l) => l.name[lang] + (l.level[lang] ? " — " + l.level[lang] : ""));

    return {
      name: p.name, headline: p.title[lang], contact, links, summary: p.summary[lang],
      experience, education, skillsTechnical, skillsSoft, languages
    };
  }

  function buildResumeBlocks(r, lang) {
    const b = {};

    b.header = '<div class="r-header"><h2 class="r-name">' + escapeHtml(r.name || "") + "</h2>" +
      (r.headline ? '<p class="r-headline">' + escapeHtml(r.headline) + "</p>" : "") + "</div>";

    b.contact = (r.contact.length || r.links.length)
      ? '<div class="r-block r-contact">' +
        (r.contact.length ? '<div class="r-contact-row">' + r.contact.map((c) => '<span class="r-contact-item">' + escapeHtml(c) + "</span>").join("") + "</div>" : "") +
        (r.links.length ? '<div class="r-contact-row r-contact-links">' + r.links.map((c) => '<span class="r-contact-item r-contact-link">' + escapeHtml(c) + "</span>").join("") + "</div>" : "") +
        "</div>"
      : "";

    b.summary = r.summary
      ? '<div class="r-block r-summary"><h3 class="r-section">' + escapeHtml(t("resumeSummary", lang)) + "</h3><p>" + escapeHtml(r.summary) + "</p></div>"
      : "";

    b.experience = r.experience.length
      ? '<div class="r-block r-experience"><h3 class="r-section">' + escapeHtml(t("resumeExperience", lang)) + "</h3>" +
        r.experience.map((e) => (
          '<div class="r-entry">' +
          '<div class="r-entry-head"><span>' + escapeHtml([e.role, e.company].filter(Boolean).join(" · ")) + "</span><span>" + escapeHtml(e.dates) + "</span></div>" +
          (e.location ? '<div class="r-entry-sub"><span>' + escapeHtml(e.location) + "</span><span></span></div>" : "") +
          (e.bullets.length ? '<ul class="r-bullets">' + e.bullets.map((bullet) => "<li>" + escapeHtml(bullet) + "</li>").join("") + "</ul>" : "") +
          "</div>"
        )).join("") + "</div>"
      : "";

    b.education = r.education.length
      ? '<div class="r-block r-education"><h3 class="r-section">' + escapeHtml(t("resumeEducation", lang)) + "</h3>" +
        r.education.map((e) => {
          const subParts = [e.field, e.location].filter(Boolean);
          return '<div class="r-entry">' +
            '<div class="r-entry-head"><span>' + escapeHtml([e.degree, e.school].filter(Boolean).join(" · ")) + "</span><span>" + escapeHtml(e.dates) + "</span></div>" +
            (subParts.length ? '<div class="r-entry-sub"><span>' + escapeHtml(subParts.join(" · ")) + "</span><span></span></div>" : "") +
            "</div>";
        }).join("") + "</div>"
      : "";

    b.skillsTechnical = r.skillsTechnical.length
      ? '<div class="r-block r-skills-technical"><h3 class="r-section">' + escapeHtml(t("resumeSkillsTechnical", lang)) + '</h3><p class="r-skill-line">' + escapeHtml(joinList(r.skillsTechnical, lang)) + "</p></div>"
      : "";

    b.skillsSoft = r.skillsSoft.length
      ? '<div class="r-block r-skills-soft"><h3 class="r-section">' + escapeHtml(t("resumeSkillsSoft", lang)) + '</h3><p class="r-skill-line">' + escapeHtml(joinList(r.skillsSoft, lang)) + "</p></div>"
      : "";

    b.languages = r.languages.length
      ? '<div class="r-block r-languages"><h3 class="r-section">' + escapeHtml(t("resumeLanguages", lang)) + '</h3><p class="r-skill-line">' + escapeHtml(joinList(r.languages, lang)) + "</p></div>"
      : "";

    return b;
  }

  function renderResumeHTML(r, lang, template) {
    const b = buildResumeBlocks(r, lang);
    if (template === "sidebar") {
      const mainHtml = b.header + b.summary + b.experience + b.education;
      const sideHtml = b.contact + b.skillsTechnical + b.skillsSoft + b.languages;
      return '<div class="r-main">' + mainHtml + '</div><div class="r-sidebar">' + sideHtml + "</div>";
    }
    return b.header + b.contact + b.summary + b.experience + b.education + b.skillsTechnical + b.skillsSoft + b.languages;
  }

  function renderResumeText(r, lang) {
    const lines = [];
    lines.push(r.name || "");
    if (r.headline) lines.push(r.headline);
    if (r.contact.length) lines.push(r.contact.join(" | "));
    if (r.links.length) lines.push(r.links.join(" | "));
    lines.push("");
    if (r.summary) { lines.push(t("resumeSummary", lang).toUpperCase()); lines.push(r.summary); lines.push(""); }
    if (r.experience.length) {
      lines.push(t("resumeExperience", lang).toUpperCase());
      r.experience.forEach((e) => {
        lines.push([e.role, e.company].filter(Boolean).join(" · ") + (e.dates ? "  (" + e.dates + ")" : ""));
        if (e.location) lines.push(e.location);
        e.bullets.forEach((b) => lines.push("- " + b));
        lines.push("");
      });
    }
    if (r.education.length) {
      lines.push(t("resumeEducation", lang).toUpperCase());
      r.education.forEach((e) => {
        lines.push([e.degree, e.school].filter(Boolean).join(" · ") + (e.dates ? "  (" + e.dates + ")" : ""));
        const subParts = [e.field, e.location].filter(Boolean);
        if (subParts.length) lines.push(subParts.join(" · "));
        lines.push("");
      });
    }
    if (r.skillsTechnical.length) { lines.push(t("resumeSkillsTechnical", lang).toUpperCase()); lines.push(joinList(r.skillsTechnical, lang)); lines.push(""); }
    if (r.skillsSoft.length) { lines.push(t("resumeSkillsSoft", lang).toUpperCase()); lines.push(joinList(r.skillsSoft, lang)); lines.push(""); }
    if (r.languages.length) { lines.push(t("resumeLanguages", lang).toUpperCase()); lines.push(joinList(r.languages, lang)); }
    return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
  }

  const resumePreviewEl = document.getElementById("resumePreview");
  const previewEmptyStateEl = document.getElementById("previewEmptyState");
  const printBtn = document.getElementById("printBtn");
  const downloadWordBtn = document.getElementById("downloadWordBtn");
  const copyTextBtn = document.getElementById("copyTextBtn");
  const downloadTextBtn = document.getElementById("downloadTextBtn");
  const switchBtns = () => document.querySelectorAll(".resume-lang-switch .lang-btn, .template-switch .lang-btn");

  function slugify(str) {
    return (str || "resume").toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "resume";
  }

  function renderPreview() {
    if (!state.generated) return;
    resumePreviewEl.className = "resume-preview tpl-" + state.template;
    resumePreviewEl.innerHTML = renderResumeHTML(state.generated[state.resumeLang].r, state.resumeLang, state.template);
  }

  function showResumeLang(lang) {
    state.resumeLang = lang;
    document.querySelectorAll(".resume-lang-switch .lang-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.resumeLang === lang);
    });
    renderPreview();
  }

  function setTemplate(tpl) {
    if (!TEMPLATES.includes(tpl)) return;
    state.template = tpl;
    localStorage.setItem(TEMPLATE_KEY, tpl);
    document.querySelectorAll(".template-switch .lang-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.template === tpl);
    });
    renderPreview();
  }

  document.querySelectorAll(".template-switch .lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => setTemplate(btn.dataset.template));
  });

  document.getElementById("generateBtn").addEventListener("click", () => {
    state.generated = {};
    LANGS.forEach((lang) => {
      const r = buildResumeForLang(lang);
      state.generated[lang] = { r, text: renderResumeText(r, lang) };
    });
    previewEmptyStateEl.hidden = true;
    resumePreviewEl.hidden = false;
    [printBtn, downloadWordBtn, copyTextBtn, downloadTextBtn].forEach((b) => { b.disabled = false; });
    switchBtns().forEach((b) => { b.disabled = false; });
    showResumeLang(state.resumeLang);
  });

  document.querySelectorAll(".resume-lang-switch .lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => showResumeLang(btn.dataset.resumeLang));
  });

  printBtn.addEventListener("click", () => { if (state.generated) window.print(); });

  copyTextBtn.addEventListener("click", () => {
    if (!state.generated) return;
    const text = state.generated[state.resumeLang].text;
    const done = () => {
      const original = copyTextBtn.textContent;
      copyTextBtn.textContent = t("copiedMsg");
      setTimeout(() => { copyTextBtn.textContent = original; }, 1500);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(done);
    } else {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch (e) { /* ignore */ }
      document.body.removeChild(ta);
      done();
    }
  });

  downloadTextBtn.addEventListener("click", () => {
    if (!state.generated) return;
    const text = state.generated[state.resumeLang].text;
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = slugify(state.data.personal.name) + "-resume-" + state.resumeLang + ".txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  function collectResumeCss() {
    const rules = [];
    for (const sheet of document.styleSheets) {
      let cssRules;
      try { cssRules = sheet.cssRules; } catch (e) { continue; }
      for (const rule of cssRules) {
        if (rule.selectorText && rule.selectorText.indexOf("resume-preview") !== -1) {
          rules.push(rule.cssText);
        }
      }
    }
    return rules.join("\n");
  }

  downloadWordBtn.addEventListener("click", () => {
    if (!state.generated) return;
    const css = collectResumeCss();
    const html = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>" +
      "<head><meta charset='utf-8'><title>" + escapeHtml(state.data.personal.name || "Resume") + "</title>" +
      "<style>body{font-family:Arial,Helvetica,sans-serif;} " + css + "</style></head>" +
      "<body>" + resumePreviewEl.outerHTML + "</body></html>";
    const blob = new Blob(["﻿", html], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = slugify(state.data.personal.name) + "-resume-" + state.resumeLang + ".doc";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  // ---------- UI language switch + help modal ----------
  const faqListEl = document.getElementById("faqList");
  function renderFAQ() {
    if (!faqListEl) return;
    const faq = (I18N[state.uiLang] && I18N[state.uiLang].faq) || [];
    faqListEl.innerHTML = "";
    faq.forEach((item) => {
      const details = document.createElement("details");
      details.className = "faq-item";
      const summary = document.createElement("summary");
      summary.innerHTML = '<span class="chev">▶</span> <span>' + item.q + "</span>";
      const body = document.createElement("div");
      body.className = "faq-a";
      body.textContent = item.a;
      details.appendChild(summary);
      details.appendChild(body);
      faqListEl.appendChild(details);
    });
  }

  function applyStaticI18n() {
    document.documentElement.lang = state.uiLang;
    document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.getAttribute("data-i18n")); });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => { el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder"))); });
    document.querySelectorAll("[data-i18n-title]").forEach((el) => { el.setAttribute("title", t(el.getAttribute("data-i18n-title"))); });
    document.querySelectorAll(".app-header .lang-switch .lang-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === state.uiLang);
    });
    renderFAQ();
  }

  function rerenderAll() {
    applyStaticI18n();
    renderPersonalSection();
    renderExperienceList();
    renderEducationList();
    renderSkillsSection();
    renderLanguageList();
  }

  document.querySelectorAll(".app-header .lang-switch .lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.uiLang = btn.dataset.lang;
      localStorage.setItem(LANG_KEY, state.uiLang);
      rerenderAll();
    });
  });

  const clearFormBtn = document.getElementById("clearFormBtn");
  clearFormBtn.addEventListener("click", () => {
    if (!window.confirm(t("clearFormConfirm"))) return;
    state.data = defaultData();
    state.generated = null;
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* storage unavailable */ }
    previewEmptyStateEl.hidden = false;
    resumePreviewEl.hidden = true;
    resumePreviewEl.innerHTML = "";
    [printBtn, downloadWordBtn, copyTextBtn, downloadTextBtn].forEach((b) => { b.disabled = true; });
    switchBtns().forEach((b) => { b.disabled = true; });
    rerenderAll();
  });

  const helpToggle = document.getElementById("helpToggle");
  const helpModal = document.getElementById("helpModal");
  const helpClose = document.getElementById("helpClose");
  helpToggle.addEventListener("click", () => { helpModal.hidden = false; });
  helpClose.addEventListener("click", () => { helpModal.hidden = true; });
  helpModal.addEventListener("click", (e) => { if (e.target === helpModal) helpModal.hidden = true; });

  // ---------- Init ----------
  [printBtn, downloadWordBtn, copyTextBtn, downloadTextBtn].forEach((b) => { b.disabled = true; });
  switchBtns().forEach((b) => { b.disabled = true; });
  initPersonalSectionOnce();
  rerenderAll();
})();
