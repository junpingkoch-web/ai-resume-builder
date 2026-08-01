/* Trilingual phrase bank (zh / en / de) that powers the template-based
   "smart" resume generation — no AI API involved. Picking a preset here
   fills all three languages at once; free-text fields still need the
   user's own words per language (the UI offers a "copy to other
   languages" shortcut for that). */
window.RESUME_PHRASEBANK = {
  actionVerbs: [
    { key: "led", zh: "领导", en: "Led", de: "Leitete" },
    { key: "managed", zh: "管理", en: "Managed", de: "Verwaltete" },
    { key: "developed", zh: "开发", en: "Developed", de: "Entwickelte" },
    { key: "designed", zh: "设计", en: "Designed", de: "Entwarf" },
    { key: "implemented", zh: "实施", en: "Implemented", de: "Implementierte" },
    { key: "built", zh: "构建", en: "Built", de: "Baute auf" },
    { key: "launched", zh: "推出", en: "Launched", de: "Lancierte" },
    { key: "optimized", zh: "优化", en: "Optimized", de: "Optimierte" },
    { key: "increased", zh: "提升", en: "Increased", de: "Steigerte" },
    { key: "reduced", zh: "降低", en: "Reduced", de: "Reduzierte" },
    { key: "improved", zh: "改进", en: "Improved", de: "Verbesserte" },
    { key: "coordinated", zh: "协调", en: "Coordinated", de: "Koordinierte" },
    { key: "analyzed", zh: "分析", en: "Analyzed", de: "Analysierte" },
    { key: "negotiated", zh: "谈判", en: "Negotiated", de: "Verhandelte" },
    { key: "trained", zh: "培训", en: "Trained", de: "Schulte" },
    { key: "mentored", zh: "指导", en: "Mentored", de: "Betreute" },
    { key: "delivered", zh: "交付", en: "Delivered", de: "Lieferte" },
    { key: "streamlined", zh: "精简", en: "Streamlined", de: "Straffte" },
    { key: "collaborated", zh: "协作", en: "Collaborated on", de: "Arbeitete mit an" },
    { key: "presented", zh: "展示", en: "Presented", de: "Präsentierte" },
    { key: "researched", zh: "研究", en: "Researched", de: "Erforschte" },
    { key: "maintained", zh: "维护", en: "Maintained", de: "Pflegte" },
    { key: "created", zh: "创建", en: "Created", de: "Erstellte" },
    { key: "supervised", zh: "监督", en: "Supervised", de: "Beaufsichtigte" },
    { key: "resolved", zh: "解决", en: "Resolved", de: "Löste" },
    { key: "planned", zh: "规划", en: "Planned", de: "Plante" },
    { key: "executed", zh: "执行", en: "Executed", de: "Führte aus" },
    { key: "automated", zh: "自动化", en: "Automated", de: "Automatisierte" },
    { key: "expanded", zh: "拓展", en: "Expanded", de: "Erweiterte" },
    { key: "achieved", zh: "实现", en: "Achieved", de: "Erzielte" }
  ],

  jobTitles: [
    { key: "software_engineer", zh: "软件工程师", en: "Software Engineer", de: "Softwareingenieur/in" },
    { key: "product_manager", zh: "产品经理", en: "Product Manager", de: "Produktmanager/in" },
    { key: "data_analyst", zh: "数据分析师", en: "Data Analyst", de: "Datenanalyst/in" },
    { key: "marketing_manager", zh: "市场营销经理", en: "Marketing Manager", de: "Marketingmanager/in" },
    { key: "sales_manager", zh: "销售经理", en: "Sales Manager", de: "Vertriebsleiter/in" },
    { key: "project_manager", zh: "项目经理", en: "Project Manager", de: "Projektmanager/in" },
    { key: "financial_analyst", zh: "财务分析师", en: "Financial Analyst", de: "Finanzanalyst/in" },
    { key: "hr_manager", zh: "人力资源经理", en: "HR Manager", de: "Personalleiter/in" },
    { key: "graphic_designer", zh: "平面设计师", en: "Graphic Designer", de: "Grafikdesigner/in" },
    { key: "customer_service", zh: "客户服务专员", en: "Customer Service Representative", de: "Kundendienstmitarbeiter/in" },
    { key: "operations_manager", zh: "运营经理", en: "Operations Manager", de: "Betriebsleiter/in" },
    { key: "business_analyst", zh: "业务分析师", en: "Business Analyst", de: "Business Analyst" },
    { key: "accountant", zh: "会计", en: "Accountant", de: "Buchhalter/in" },
    { key: "admin_assistant", zh: "行政助理", en: "Administrative Assistant", de: "Verwaltungsassistent/in" },
    { key: "content_writer", zh: "内容撰稿人", en: "Content Writer", de: "Content-Autor/in" },
    { key: "ux_ui_designer", zh: "UX/UI 设计师", en: "UX/UI Designer", de: "UX/UI-Designer/in" },
    { key: "consultant", zh: "顾问", en: "Consultant", de: "Berater/in" },
    { key: "teacher", zh: "教师", en: "Teacher", de: "Lehrer/in" },
    { key: "retail_sales", zh: "零售销售员", en: "Retail Sales Associate", de: "Verkäufer/in im Einzelhandel" },
    { key: "store_manager", zh: "店长", en: "Store Manager", de: "Filialleiter/in" }
  ],

  degrees: [
    { key: "high_school", zh: "高中文凭", en: "High School Diploma", de: "Abitur" },
    { key: "vocational", zh: "职业资格证书", en: "Vocational Diploma", de: "Berufsausbildung" },
    { key: "bachelor", zh: "学士学位", en: "Bachelor's Degree", de: "Bachelor-Abschluss" },
    { key: "master", zh: "硕士学位", en: "Master's Degree", de: "Master-Abschluss" },
    { key: "mba", zh: "工商管理硕士 (MBA)", en: "MBA", de: "MBA" },
    { key: "phd", zh: "博士学位", en: "PhD / Doctorate", de: "Doktortitel" }
  ],

  languageLevels: [
    { key: "native", zh: "母语", en: "Native", de: "Muttersprache" },
    { key: "fluent", zh: "流利 (C1/C2)", en: "Fluent (C1/C2)", de: "Fließend (C1/C2)" },
    { key: "professional", zh: "专业工作水平 (B2)", en: "Professional working proficiency (B2)", de: "Verhandlungssicher (B2)" },
    { key: "intermediate", zh: "中级 (B1)", en: "Intermediate (B1)", de: "Mittelstufe (B1)" },
    { key: "basic", zh: "基础 (A1/A2)", en: "Basic (A1/A2)", de: "Grundkenntnisse (A1/A2)" }
  ],

  languageNames: [
    { key: "zh", zh: "中文（普通话）", en: "Chinese (Mandarin)", de: "Chinesisch (Mandarin)" },
    { key: "en", zh: "英语", en: "English", de: "Englisch" },
    { key: "de", zh: "德语", en: "German", de: "Deutsch" },
    { key: "fr", zh: "法语", en: "French", de: "Französisch" },
    { key: "es", zh: "西班牙语", en: "Spanish", de: "Spanisch" },
    { key: "it", zh: "意大利语", en: "Italian", de: "Italienisch" },
    { key: "ja", zh: "日语", en: "Japanese", de: "Japanisch" },
    { key: "ko", zh: "韩语", en: "Korean", de: "Koreanisch" }
  ],

  skills: {
    technical: [
      { key: "excel", zh: "Microsoft Excel", en: "Microsoft Excel", de: "Microsoft Excel" },
      { key: "powerpoint", zh: "Microsoft PowerPoint", en: "Microsoft PowerPoint", de: "Microsoft PowerPoint" },
      { key: "python", zh: "Python", en: "Python", de: "Python" },
      { key: "sql", zh: "SQL", en: "SQL", de: "SQL" },
      { key: "javascript", zh: "JavaScript", en: "JavaScript", de: "JavaScript" },
      { key: "photoshop", zh: "Adobe Photoshop", en: "Adobe Photoshop", de: "Adobe Photoshop" },
      { key: "analytics", zh: "Google Analytics", en: "Google Analytics", de: "Google Analytics" },
      { key: "salesforce", zh: "Salesforce", en: "Salesforce", de: "Salesforce" },
      { key: "project_mgmt", zh: "项目管理", en: "Project Management", de: "Projektmanagement" },
      { key: "data_analysis", zh: "数据分析", en: "Data Analysis", de: "Datenanalyse" },
      { key: "seo", zh: "搜索引擎优化 (SEO)", en: "SEO", de: "SEO (Suchmaschinenoptimierung)" },
      { key: "social_media", zh: "社交媒体营销", en: "Social Media Marketing", de: "Social-Media-Marketing" },
      { key: "financial_modeling", zh: "财务建模", en: "Financial Modeling", de: "Finanzmodellierung" },
      { key: "bookkeeping", zh: "记账", en: "Bookkeeping", de: "Buchhaltung" }
    ],
    soft: [
      { key: "communication", zh: "沟通能力", en: "Communication", de: "Kommunikationsfähigkeit" },
      { key: "leadership", zh: "领导力", en: "Leadership", de: "Führungskompetenz" },
      { key: "teamwork", zh: "团队合作", en: "Teamwork", de: "Teamfähigkeit" },
      { key: "problem_solving", zh: "解决问题能力", en: "Problem Solving", de: "Problemlösungskompetenz" },
      { key: "time_management", zh: "时间管理", en: "Time Management", de: "Zeitmanagement" },
      { key: "negotiation", zh: "谈判能力", en: "Negotiation", de: "Verhandlungsgeschick" },
      { key: "public_speaking", zh: "公开演讲", en: "Public Speaking", de: "Präsentationsfähigkeit" },
      { key: "adaptability", zh: "适应能力", en: "Adaptability", de: "Anpassungsfähigkeit" },
      { key: "critical_thinking", zh: "批判性思维", en: "Critical Thinking", de: "Kritisches Denken" },
      { key: "customer_service", zh: "客户服务", en: "Customer Service", de: "Kundenservice" }
    ]
  },

  summaryTemplates: [
    {
      key: "experienced",
      zh: "{years}年{title}经验，擅长{skill1}与{skill2}，致力于为团队和客户创造实际价值。",
      en: "{title} with {years} years of experience in {skill1} and {skill2}, focused on delivering real value for teams and clients.",
      de: "{title} mit {years} Jahren Erfahrung in {skill1} und {skill2}, mit Fokus auf messbarem Mehrwert für Team und Kunden."
    },
    {
      key: "entry_level",
      zh: "积极进取的{title}，专注{skill1}与{skill2}，渴望在实际项目中持续成长。",
      en: "Motivated {title} with a focus on {skill1} and {skill2}, eager to grow through hands-on project experience.",
      de: "Motivierte/r {title} mit Schwerpunkt auf {skill1} und {skill2}, bereit für praxisnahes Wachstum in realen Projekten."
    },
    {
      key: "career_change",
      zh: "拥有{years}年跨领域经验的{title}，正将{skill1}与{skill2}的能力迁移到新方向，适应力强、学习速度快。",
      en: "{title} bringing {years} years of cross-industry experience, transferring skills in {skill1} and {skill2} into a new direction — adaptable and a fast learner.",
      de: "{title} mit {years} Jahren branchenübergreifender Erfahrung, überträgt Kompetenzen in {skill1} und {skill2} auf eine neue Richtung — anpassungsfähig und lernbereit."
    }
  ]
};
