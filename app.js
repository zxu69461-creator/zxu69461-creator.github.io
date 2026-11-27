/* ==========================================================================
   Zhida Xu — Academic Homepage Client Script
   Loads verified public works from ./data/public_works.json
   Handles EN/中文 i18n, theme persistence, filtering, search, Lightbox & BibTeX.
   ========================================================================== */

(function () {
  'use strict';

  var I18N = {
    en: {
      'page.title': 'Zhida Xu — Computational Genomics & Clinical Trial Evidence',
      'skip': 'Skip to main content',
      'brand.aria': 'Zhida Xu home',
      'brand.name': 'Zhida Xu',
      'nav.aria': 'Primary navigation',
      'nav.research': 'Research',
      'nav.resources': 'Software',
      'nav.figures': 'Figures',
      'nav.works': 'Preprints & Code',
      'nav.methods': 'Methods',
      'nav.contact': 'Contact',
      'theme.dark': 'Dark',
      'theme.light': 'Light',
      'theme.to_dark': 'Switch to dark mode',
      'theme.to_light': 'Switch to light mode',
      'lang.switch_aria': 'Switch language to Chinese',
      'hero.kicker': 'Computational Genomics · Evidence Calibration · Trial Safety',
      'hero.title': 'Zhida Xu',
      'hero.role': 'M.Sc. / M.Med. Candidate in Biomedical Engineering · School of Biomedical Engineering, Hubei University of Medicine',
      'hero.lead': 'I develop open-source computational pipelines, interactive atlases, and statistical benchmarks to test biomedical claims directly against genome-wide genetic, functional-screen, and randomized clinical trial evidence—from raw mouse RNA-seq reads to biobank GWAS and ClinicalTrials.gov safety registries.',
      'hero.btn.atlas': 'Variant–Trait Claim Atlas ↗',
      'meta.email': 'Email',
      'aside.aria': 'Verified public research footprint',
      'motif.title': 'GENOME-WIDE & TRIAL EVIDENCE CALIBRATION',
      'motif.xaxis': 'PUBLISHED CLAIMS',
      'motif.yaxis': 'CALIBRATED SUPPORT',
      'motif.primary': 'GWAS / CRISPR',
      'motif.secondary': 'TRIAL EXCESS',
      'aside.heading': 'Verified Public Footprint',
      'aside.audit': 'Public-Only Audit',
      'stat.repos': 'Public MIT Repositories',
      'stat.preprints': 'Live medRxiv Preprints',
      'stat.claims': 'Calibrated Variant Claims',
      'stat.labels': 'FDA Label Reactions Modelled',
      'research.kicker': 'Research Agenda',
      'research.title': 'Three Pillars of Open Computational Work',
      'research.intro': 'Every project listed here uses publicly accessible inputs, versioned code, and reproducible analytical archives built for independent verification.',
      'pillar1.title': 'Genomics & Functional Evidence Calibration',
      'pillar1.desc': 'Auditing how well published candidate-variant associations and cancer gene-dependency claims hold up against genome-wide GWAS Catalog, ClinVar, and DepMap CRISPR/RNAi perturbation screens, alongside detecting flanking 129-strain donor DNA directly from knockout mouse RNA-seq reads.',
      'pillar2.title': 'Biobank Genetic Architecture & Cell-State Mapping',
      'pillar2.desc': 'Applying genomic structural equation modelling, Mendelian randomisation, LD score regression, single-cell genetic-load mapping (scDRS/MAGMA), and chromatin heritability partitioning across FinnGen, UK Biobank, and synovial/tendon single-cell atlases.',
      'pillar3.title': 'Clinical Pharmacology & Randomized Trial Safety',
      'pillar3.desc': 'Building temporally validated hierarchical trial-arm models linking ClinicalTrials.gov adverse event tables to US FDA prescription labels (openFDA, SIDER, ChEMBL) and testing drug-repositioning hypotheses across hundreds of placebo-controlled trials.',
      'pillar3.tag3': '881-RCT meta-analysis',
      'resources.kicker': 'Open Resources & Software',
      'resources.title': 'Reusable Tools & Interactive Atlases',
      'resources.intro': 'Standalone browser applications, command-line workflows, and Python/R libraries released under MIT and CC BY 4.0 licences.',
      'tool1.pill': 'Live Web Atlas',
      'tool1.title': 'Variant–Trait Claim Atlas',
      'tool1.desc': 'Zero-tracking browser tool and Zenodo archive calibrating 201,720 published variant–trait claims from 71,577 PubMed abstracts against NHGRI-EBI GWAS Catalog evidence and 239 ClinVar risk variants, with Python and R clients.',
      'tool1.link.web': 'Open Web Tool ↗',
      'tool2.pill': 'RNA-seq CLI',
      'tool2.desc': 'Calls residual 129-strain donor DNA flanking a targeted gene directly from a knockout mouse study\'s own RNA-seq reads using 4.46M shared SNP sites (plus CBA/J, DBA/2J, BALB/cJ, C3H/HeJ, and private panels) to flag flanking confounding.',
      'tool3.pill': 'Python Package',
      'tool3.desc': 'Installable Python CLI and library plus CC BY 4.0 atlas scoring 13,610 published cancer gene-dependency claims (17,920 statements across 18,530 genes) against DepMap 26Q1 CRISPR (Chronos) and DEMETER2 RNAi screens.',
      'link.github_repo': 'GitHub Repository ↗',
      'btn.copy': 'Copy',
      'btn.copied': 'Copied',
      'figures.kicker': 'Visual Evidence · Live medRxiv Preprints',
      'figures.title': 'Selected Figures from Public Preprints',
      'figures.intro': 'Key analytical figures drawn directly from live October 2026 medRxiv preprints. Click any figure to inspect full-resolution panel labels and statistics.',
      'figures.zoom': 'Zoom ⤢',
      'figures.fullres': 'Full Resolution ⤢',
      'figures.doi': 'Preprint DOI ↗',
      'fig1.pill': 'medRxiv · Fig. 1',
      'fig1.scale': '>900k GWAS · 210 RCTs',
      'fig1.title': 'Multi-layer musculoskeletal fibrosis study design',
      'fig1.desc': 'Anatomical disorder sites, cross-biobank GWAS scale, palmar-fascia single-cell UMAP, and randomized incretin-trial safety integration.',
      'fig2.pill': 'medRxiv · Fig. 2',
      'fig2.scale': 'Genomic SEM · 103 Loci',
      'fig2.title': 'Two heritable axes & mirrored genome-wide architecture',
      'fig2.desc': 'Disease-level genetic correlations (r<sub>g</sub>), common-factor Genomic SEM loadings, and mirrored Manhattan peaks separating tenosynovial and fibro-capsular risk.',
      'fig3.pill': 'medRxiv · Fig. 3',
      'fig3.scale': '881 RCTs · ~1.75M Patients',
      'fig3.title': 'Positive-control calibration in 881 randomized trials',
      'fig3.desc': 'Empirical control calibration, molecule-level GLP-1RA forest estimates, and trial follow-up bubble meta-regression testing drug-repositioning claims.',
      'fig4.pill': 'medRxiv · Fig. 2',
      'fig4.scale': '8,994 Predictions · 919 Labels',
      'fig4.title': 'Out-of-time Bayesian validation of FDA label reactions',
      'fig4.desc': 'Log predictive score gains across 9 comparators, 90% interval coverage, and agreement with external statin individual-participant estimates.',
      'works.kicker': 'Verified Public Catalog',
      'works.title': 'Public Preprints & Repositories',
      'works.intro': 'Filter all 9 verified public works (8 GitHub repositories and 3 live medRxiv preprints, two linked directly to their companion repositories).',
      'works.tablist_aria': 'Filter public works by research area',
      'filter.all': 'All',
      'filter.software': 'Software & Open Atlases',
      'filter.genomics': 'Genomics & Disease Genetics',
      'filter.pharmacology': 'Clinical Pharmacology & Safety',
      'works.search_label': 'Search public works',
      'works.search_placeholder': 'Filter by keyword, DOI, dataset…',
      'works.empty': 'No verified public works match the current filter.',
      'works.load_error': 'Unable to load ./data/public_works.json. Serve this directory over HTTP (e.g., python3 -m http.server) or visit https://github.com/zxu69461-creator directly.',
      'work.link.web_tool': 'Live Web Tool ↗',
      'work.link.preprint': 'medRxiv Preprint (DOI) ↗',
      'work.link.repo': 'GitHub Repository ↗',
      'work.link.zenodo': 'Zenodo Archive ↗',
      'work.btn.figure': 'View Figure ⤢',
      'work.btn.bibtex': 'BibTeX',
      'work.btn.hide_bibtex': 'Hide BibTeX',
      'methods.kicker': 'Technical Profile',
      'methods.title': 'Methods & Reproducibility Stack',
      'methods.intro': 'Core computational methods and open-science engineering practices evidenced directly in the public repositories above.',
      'm1.title': 'Statistical Genetics',
      'm1.i1': 'Genomic SEM & Common-Factor GWAS',
      'm1.i2': 'Univariable & Multivariable MR',
      'm1.i3': 'LDSC & Stratified S-LDSC Heritability',
      'm1.i4': 'HLA Fine-Scale & Diagnostic-Code Mapping',
      'm1.i5': 'FinnGen R13, UK Biobank & GWAS Catalog',
      'm2.title': 'Functional & Single-Cell',
      'm2.i1': 'Raw RNA-seq Allele Calling (HISAT2 / samtools)',
      'm2.i2': 'DepMap CRISPR (Chronos) & DEMETER2 RNAi',
      'm2.i3': 'scDRS, MAGMA & Xenium Spatial Niches',
      'm2.i4': 'kallisto | bustools & limma-voom',
      'm2.i5': 'PubMed / PubTator3 / ClinVar Calibration',
      'm3.title': 'Trial & Safety Modelling',
      'm3.i1': 'Hierarchical Trial-Arm Attributable Fractions',
      'm3.i2': 'Temporal Out-of-Time Prediction Benchmarks',
      'm3.i3': 'ClinicalTrials.gov API v2 Ingestion',
      'm3.i4': 'openFDA, SIDER 4.1 & ChEMBL Linkage',
      'm3.i5': 'Positive/Negative Control Calibration',
      'm4.title': 'Open Engineering',
      'm4.i1': 'Python 3, R, SQL (DuckDB), Bash',
      'm4.i2': 'SHA-256 Checksum & Provenance Manifests',
      'm4.i3': 'Preregistered Decision Tables & pytest',
      'm4.i4': 'GitHub Actions CI & GitHub Pages',
      'm4.i5': 'Zenodo Archival DOIs & MIT / CC BY 4.0',
      'contact.kicker': 'Correspondence & Collaboration',
      'contact.title': 'Contact & Academic Identifiers',
      'contact.intro': 'Open to scientific dialogue on variant-claim calibration, knockout RNA-seq confounding, biobank genetics, clinical trial safety modelling, and prospective international doctoral research.',
      'contact.github_note': 'Public repositories, issue trackers, and open-source tools',
      'contact.orcid_note': 'Persistent researcher identifier (Zhi-da Xu)',
      'contact.email_label': 'Academic Email',
      'contact.email_note': 'School of Biomedical Engineering, Hubei University of Medicine',
      'lightbox.close_aria': 'Close figure preview',
      'lightbox.open_doi': 'Open medRxiv Preprint ↗',
      'lightbox.default_label': 'Published medRxiv Figure',
      'footer.copy': '© 2026 Zhida Xu · Verified public works only · Zero cookies or analytics.',
      'footer.atlas': 'Variant–Trait Claim Atlas'
    },
    zh: {
      'page.title': '徐志达（Zhida Xu）— 计算基因组学与临床试验循证研究',
      'skip': '跳至正文内容',
      'brand.aria': '徐志达学术主页顶部',
      'brand.name': '徐志达',
      'nav.aria': '主导航栏',
      'nav.research': '研究方向',
      'nav.resources': '开源工具',
      'nav.figures': '代表性图表',
      'nav.works': '预印本与代码',
      'nav.methods': '方法栈',
      'nav.contact': '联系方式',
      'theme.dark': '深色',
      'theme.light': '浅色',
      'theme.to_dark': '切换至深色模式',
      'theme.to_light': '切换至浅色模式',
      'lang.switch_aria': 'Switch language to English',
      'hero.kicker': '计算基因组学 · 功能证据校准 · 临床试验安全性',
      'hero.title': '徐志达',
      'hero.role': '生物医学工程硕士研究生 · 湖北医药学院生物医学工程学院',
      'hero.lead': '我专注于开发开源计算流程、交互式证据图谱与统计学基准模型，借助全基因组遗传关联、大规模功能扰动筛选及随机对照临床试验注册数据，对生物医学文献结论开展系统性实证校准——研究横跨敲除小鼠原始 RNA-seq 读段分析、大型生物样本库 GWAS 与 ClinicalTrials.gov 临床试验安全性数据库。',
      'hero.btn.atlas': '变异–性状证据图谱 ↗',
      'meta.email': '学术邮箱',
      'aside.aria': '已核验公开研究成果概览',
      'motif.title': '全基因组与临床试验证据校准',
      'motif.xaxis': '已发表文献主张',
      'motif.yaxis': '经校准的实证支持度',
      'motif.primary': 'GWAS / CRISPR 基准',
      'motif.secondary': '临床试验超额风险',
      'aside.heading': '已核验公开研究成果',
      'aside.audit': '仅公开内容审计',
      'stat.repos': '公开 MIT 开源代码库',
      'stat.preprints': '已上线 medRxiv 预印本',
      'stat.claims': '已校准变异–性状主张',
      'stat.labels': '已建模 FDA 药品不良反应',
      'research.kicker': '研究布局',
      'research.title': '三大开源计算研究方向',
      'research.intro': '本页收录的全部项目均基于公开可获取数据、版本化代码及可复现分析归档构建，支持独立第三方核验。',
      'pillar1.title': '基因组学与功能证据校准',
      'pillar1.desc': '系统核查已发表的候选遗传变异关联与肿瘤基因依赖性主张在全基因组 GWAS Catalog、ClinVar 及 DepMap CRISPR/RNAi 扰动筛选中的可重复性；同时开发直接从敲除小鼠 RNA-seq 原始读段检出侧翼 129 品系供体 DNA 混杂的命令行工具。',
      'pillar2.title': '生物样本库遗传结构与细胞状态映射',
      'pillar2.desc': '整合 FinnGen、UK Biobank 与滑膜/肌腱单细胞图谱，综合运用基因组结构方程模型（Genomic SEM）、孟德尔随机化（MR）、连锁不平衡评分回归（LDSC）、单细胞遗传负荷映射（scDRS/MAGMA）与染色质遗传力分配解析复杂疾病遗传机制。',
      'pillar3.title': '临床药理学与随机对照试验安全性',
      'pillar3.desc': '构建经时间外推验证的分层临床试验臂模型，将 ClinicalTrials.gov 不良事件注册表与美国 FDA 处方药说明书（openFDA、SIDER、ChEMBL）系统对接，并在数百项安慰剂对照随机试验中检验药物重定位假设。',
      'pillar3.tag3': '881 项 RCT Meta 分析',
      'resources.kicker': '开源资源与软件',
      'resources.title': '可复用计算工具与交互式图谱',
      'resources.intro': '所有独立浏览器应用、命令行分析流程及 Python/R 工具包均以 MIT 或 CC BY 4.0 开源协议公开发布。',
      'tool1.pill': '在线交互图谱',
      'tool1.title': 'Variant–Trait Claim Atlas<span class="zh-sub">（变异–性状证据图谱）</span>',
      'tool1.desc': '零追踪浏览器交互图谱与 Zenodo 归档库，将 71,577 篇 PubMed 摘要中的 201,720 条已发表变异–性状主张与 NHGRI-EBI GWAS Catalog 全基因组证据及 239 个 ClinVar 风险变异进行校准，并提供 Python 与 R 客户端。',
      'tool1.link.web': '打开在线工具 ↗',
      'tool2.pill': 'RNA-seq 命令行',
      'tool2.desc': '基于 446 万个共享 SNP 位点（同时内置 CBA/J、DBA/2J、BALB/cJ、C3H/HeJ 及品系特有位点面板），直接利用敲除小鼠研究自身的 RNA-seq 读段检测靶基因侧翼残留的 129 品系供体 DNA，识别邻近差异表达混杂。',
      'tool3.pill': 'Python 工具包',
      'tool3.desc': '可安装的 Python 命令行工具与程序接口（附 CC BY 4.0 开放图谱），依据 DepMap 26Q1 CRISPR（Chronos）与 DEMETER2 RNAi 全基因组筛选数据，对 13,610 条已发表肿瘤细胞基因依赖性主张（17,920 条陈述，覆盖 18,530 个基因）进行定量评分。',
      'link.github_repo': 'GitHub 仓库 ↗',
      'btn.copy': '复制',
      'btn.copied': '已复制',
      'figures.kicker': '可视化证据 · 已上线 medRxiv 预印本',
      'figures.title': '公开预印本代表性图表',
      'figures.intro': '以下核心分析图表直接取自 2026 年 10 月已上线的 medRxiv 公开预印本。点击任意图表可查看大图细节与统计注释。',
      'figures.zoom': '放大查看 ⤢',
      'figures.fullres': '查看高清大图 ⤢',
      'figures.doi': '预印本 DOI ↗',
      'fig1.pill': 'medRxiv · 图 1',
      'fig1.scale': '>90 万 GWAS · 210 项 RCT',
      'fig1.title': '手部与肩部软组织纤维化疾病的多层次研究设计',
      'fig1.desc': '解剖病变部位示意图、跨生物样本库 GWAS 规模、掌腱膜单细胞 UMAP 聚类与肠促胰素受体激动剂随机临床试验安全性整合框架。',
      'fig2.pill': 'medRxiv · 图 2',
      'fig2.scale': 'Genomic SEM · 103 个位点',
      'fig2.title': '两条可遗传轴与镜像全基因组遗传结构',
      'fig2.desc': '七种疾病间的遗传相关性（r<sub>g</sub>）、共同因子 Genomic SEM 载荷结构，以及区分腱鞘轴与纤维囊轴风险的镜像曼哈顿图峰值。',
      'fig3.pill': 'medRxiv · 图 3',
      'fig3.scale': '881 项 RCT · 约 175 万受试者',
      'fig3.title': '881 项随机对照试验中的阳性对照校准分析',
      'fig3.desc': '基于已知阳性对照的实证校准、GLP-1RA 分子亚组森林图估计，以及随访时长气泡 Meta 回归对药物重定位主张的检验。',
      'fig4.pill': 'medRxiv · 图 2',
      'fig4.scale': '8,994 次外推预测 · 919 份说明书',
      'fig4.title': 'FDA 处方药说明书不良反应模型的时间外推贝叶斯验证',
      'fig4.desc': '分层模型相对 9 种基线方法的对数预测得分增益、90% 预测区间覆盖率校准，以及与外部他汀类个体受试者数据（IPD）基准的一致性检验。',
      'works.kicker': '已核验公开目录',
      'works.title': '公开预印本与开源代码库',
      'works.intro': '支持按研究方向与关键词检索全部 9 项已核验公开成果（涵盖 8 个 GitHub 仓库与 3 篇已上线 medRxiv 预印本，其中 2 篇直接关联配套开源仓库）。',
      'works.tablist_aria': '按研究领域筛选公开成果',
      'filter.all': '全部',
      'filter.software': '软件与开放图谱',
      'filter.genomics': '基因组学与疾病遗传',
      'filter.pharmacology': '临床药理与用药安全',
      'works.search_label': '搜索公开成果',
      'works.search_placeholder': '按关键词、DOI 或数据集筛选…',
      'works.empty': '当前筛选条件下无匹配的已核验公开成果。',
      'works.load_error': '无法加载 ./data/public_works.json。请通过 HTTP 服务访问本目录（如 python3 -m http.server），或直接访问 https://github.com/zxu69461-creator。',
      'work.link.web_tool': '在线工具 ↗',
      'work.link.preprint': 'medRxiv 预印本 (DOI) ↗',
      'work.link.repo': 'GitHub 仓库 ↗',
      'work.link.zenodo': 'Zenodo 归档 ↗',
      'work.btn.figure': '查看图表 ⤢',
      'work.btn.bibtex': 'BibTeX 引用',
      'work.btn.hide_bibtex': '收起 BibTeX',
      'methods.kicker': '技术栈与方法学',
      'methods.title': '计算方法与可复现工程体系',
      'methods.intro': '以下核心计算方法与开放科学工程实践均可在上述公开代码库中直接溯源验证。',
      'm1.title': '统计遗传学',
      'm1.i1': 'Genomic SEM 与共同因子 GWAS',
      'm1.i2': '单变量与多变量孟德尔随机化（MR）',
      'm1.i3': 'LDSC 与分层 S-LDSC 遗传力分配',
      'm1.i4': 'HLA 精细定位与诊断编码遗传解析',
      'm1.i5': 'FinnGen R13、UK Biobank 与 GWAS Catalog',
      'm2.title': '功能基因组与单细胞',
      'm2.i1': '原始 RNA-seq 等位基因分型（HISAT2 / samtools）',
      'm2.i2': 'DepMap CRISPR（Chronos）与 DEMETER2 RNAi',
      'm2.i3': 'scDRS、MAGMA 与 Xenium 空间微环境分析',
      'm2.i4': 'kallisto | bustools 与 limma-voom 差异分析',
      'm2.i5': 'PubMed / PubTator3 / ClinVar 证据校准',
      'm3.title': '临床试验与安全性建模',
      'm3.i1': '分层临床试验臂归因分数建模',
      'm3.i2': '时间外推（Out-of-Time）预测基准验证',
      'm3.i3': 'ClinicalTrials.gov API v2 数据流解析',
      'm3.i4': 'openFDA、SIDER 4.1 与 ChEMBL 多源关联',
      'm3.i5': '阳性/阴性实证对照校准',
      'm4.title': '开放科学与工程规范',
      'm4.i1': 'Python 3、R、SQL（DuckDB）与 Bash',
      'm4.i2': 'SHA-256 校验和与数据血缘清单',
      'm4.i3': '预注册分析决策表与 pytest 自动化测试',
      'm4.i4': 'GitHub Actions CI 与 GitHub Pages',
      'm4.i5': 'Zenodo 永久归档 DOI 与 MIT / CC BY 4.0',
      'contact.kicker': '学术交流与合作',
      'contact.title': '联系方式与学术标识符',
      'contact.intro': '欢迎就遗传变异证据校准、敲除小鼠 RNA-seq 混杂控制、生物样本库遗传学、临床试验安全性建模及海外博士研究机会开展学术交流。',
      'contact.github_note': '公开代码仓库、问题追踪与开源计算工具',
      'contact.orcid_note': '永久学术研究者标识符（Zhi-da Xu）',
      'contact.email_label': '学术邮箱',
      'contact.email_note': '湖北医药学院生物医学工程学院',
      'lightbox.close_aria': '关闭图表预览',
      'lightbox.open_doi': '打开 medRxiv 预印本 ↗',
      'lightbox.default_label': '已发表 medRxiv 图表',
      'footer.copy': '© 2026 徐志达（Zhida Xu）· 仅收录已核验公开成果 · 零 Cookie 与零访客追踪。',
      'footer.atlas': '变异–性状证据图谱'
    }
  };

  var state = {
    lang: 'en',
    works: [],
    activeFilter: 'all',
    query: '',
    activeLightboxFig: null
  };

  function t(key) {
    var dict = I18N[state.lang] || I18N.en;
    if (Object.prototype.hasOwnProperty.call(dict, key)) {
      return dict[key];
    }
    return I18N.en[key] || key;
  }

  function pickWorkField(obj, field) {
    if (!obj) return '';
    if (state.lang === 'zh' && obj[field + '_zh']) {
      return obj[field + '_zh'];
    }
    return obj[field] || '';
  }

  /* ---------------- Language Switcher ---------------- */
  function getInitialLang() {
    var attr = document.documentElement.getAttribute('data-lang');
    if (attr === 'zh' || attr === 'en') return attr;
    try {
      var saved = localStorage.getItem('zx-lang');
      if (saved === 'zh' || saved === 'en') return saved;
    } catch (e) {}
    return 'en';
  }

  function applyLanguage(lang, persist) {
    state.lang = lang === 'zh' ? 'zh' : 'en';
    document.documentElement.lang = state.lang === 'zh' ? 'zh-CN' : 'en';
    document.documentElement.setAttribute('data-lang', state.lang);
    document.title = t('page.title');

    if (persist) {
      try {
        localStorage.setItem('zx-lang', state.lang);
      } catch (e) {}
    }

    var textNodes = document.querySelectorAll('[data-i18n]');
    textNodes.forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (key) el.textContent = t(key);
    });

    var htmlNodes = document.querySelectorAll('[data-i18n-html]');
    htmlNodes.forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      if (key) el.innerHTML = t(key);
    });

    var placeholderNodes = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderNodes.forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (key) el.setAttribute('placeholder', t(key));
    });

    var ariaNodes = document.querySelectorAll('[data-i18n-aria]');
    ariaNodes.forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria');
      if (key) el.setAttribute('aria-label', t(key));
    });

    var langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
      langBtn.setAttribute('aria-label', t('lang.switch_aria'));
      langBtn.querySelectorAll('[data-lang-opt]').forEach(function (opt) {
        var isCurrent = opt.getAttribute('data-lang-opt') === state.lang;
        opt.classList.toggle('is-active', isCurrent);
      });
    }

    // Keep theme toggle text synced with active language
    applyTheme(getCurrentTheme(), false);

    // Re-render dynamic work cards & open lightbox (if visible)
    if (state.works.length > 0) {
      renderWorks();
    }
    var modal = document.getElementById('figure-lightbox');
    if (modal && !modal.hidden && state.activeLightboxFig) {
      populateLightbox(state.activeLightboxFig);
    }
  }

  function initLanguage() {
    applyLanguage(getInitialLang(), false);
    var langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
      langBtn.addEventListener('click', function () {
        applyLanguage(state.lang === 'zh' ? 'en' : 'zh', true);
      });
    }
  }

  /* ---------------- Theme Toggle ---------------- */
  function getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function applyTheme(theme, persist) {
    document.documentElement.setAttribute('data-theme', theme);
    if (persist) {
      try {
        localStorage.setItem('zx-theme', theme);
      } catch (e) {}
    }

    var toggle = document.getElementById('theme-toggle');
    var label = document.getElementById('theme-label');
    var sun = document.getElementById('theme-icon-sun');
    var moon = document.getElementById('theme-icon-moon');

    if (toggle && label && sun && moon) {
      var isDark = theme === 'dark';
      toggle.setAttribute('aria-pressed', String(isDark));
      toggle.setAttribute('aria-label', isDark ? t('theme.to_light') : t('theme.to_dark'));
      label.textContent = isDark ? t('theme.light') : t('theme.dark');
      sun.hidden = !isDark;
      moon.hidden = isDark;
    }
  }

  function initTheme() {
    applyTheme(getCurrentTheme(), false);
    var toggle = document.getElementById('theme-toggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        applyTheme(getCurrentTheme() === 'dark' ? 'light' : 'dark', true);
      });
    }
  }

  /* ---------------- Clipboard Helpers ---------------- */
  function copyText(text, button) {
    function showCopied() {
      button.textContent = t('btn.copied');
      window.setTimeout(function () {
        button.textContent = t('btn.copy');
      }, 1400);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(showCopied).catch(function () {
        fallbackCopy(text);
        showCopied();
      });
    } else {
      fallbackCopy(text);
      showCopied();
    }
  }

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
    } catch (e) {}
    document.body.removeChild(ta);
  }

  function initStaticCopyButtons() {
    var buttons = document.querySelectorAll('.copy-btn[data-copy]');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var payload = btn.getAttribute('data-copy') || '';
        copyText(payload, btn);
      });
    });
  }

  /* ---------------- DOM Builder for Work Cards ---------------- */
  function createEl(tag, className, text) {
    var el = document.createElement(tag);
    if (className) el.className = className;
    if (typeof text === 'string') el.textContent = text;
    return el;
  }

  function createExternalLink(href, text, className) {
    var a = createEl('a', className || '', text);
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    return a;
  }

  function badgeClass(enLabel) {
    if (enLabel === 'Live Web Tool' || enLabel === 'medRxiv Preprint') {
      return 'pill pill-live';
    }
    if (enLabel === 'Zenodo DOI' || enLabel === 'Python CLI' || enLabel === 'Python Package' || enLabel === 'CI Verified') {
      return 'pill pill-accent';
    }
    return 'pill pill-neutral';
  }

  function buildWorkCard(work) {
    var card = createEl('article', 'work-card');
    card.setAttribute('data-category', work.category);

    var header = createEl('div', 'work-header');
    var badges = createEl('div', 'work-badges');
    badges.appendChild(createEl('span', 'pill pill-neutral', pickWorkField(work, 'kind')));

    var enBadges = work.badges || [];
    var zhBadges = work.badges_zh || [];
    enBadges.forEach(function (b, idx) {
      var displayBadge = state.lang === 'zh' && zhBadges[idx] ? zhBadges[idx] : b;
      badges.appendChild(createEl('span', badgeClass(b), displayBadge));
    });
    header.appendChild(badges);
    header.appendChild(createEl('span', 'work-date', pickWorkField(work, 'date_display') || work.date));
    card.appendChild(header);

    var titleEl = createEl('h3', 'work-title');
    var titleText = pickWorkField(work, 'title');
    var parenIdx = titleText.indexOf('（');
    if (state.lang === 'zh' && parenIdx > 0) {
      titleEl.appendChild(document.createTextNode(titleText.slice(0, parenIdx)));
      titleEl.appendChild(createEl('span', 'zh-sub', titleText.slice(parenIdx)));
    } else {
      titleEl.textContent = titleText;
    }
    card.appendChild(titleEl);
    card.appendChild(createEl('p', 'work-authors', work.authors));
    card.appendChild(createEl('p', 'work-summary', pickWorkField(work, 'summary')));

    var metricsList = state.lang === 'zh' && Array.isArray(work.metrics_zh) && work.metrics_zh.length > 0
      ? work.metrics_zh
      : (work.metrics || []);
    if (metricsList.length > 0) {
      var metricsRow = createEl('div', 'work-metrics');
      metricsList.forEach(function (m) {
        metricsRow.appendChild(createEl('span', 'metric-chip', m));
      });
      card.appendChild(metricsRow);
    }

    var footer = createEl('div', 'work-footer');
    var links = createEl('div', 'work-links');
    var lnk = work.links || {};

    if (lnk.web_tool) {
      links.appendChild(createExternalLink(lnk.web_tool, t('work.link.web_tool'), 'work-link-primary'));
    }
    if (lnk.preprint) {
      links.appendChild(createExternalLink(lnk.preprint, t('work.link.preprint'), 'work-link-primary'));
    }
    if (lnk.repo) {
      links.appendChild(createExternalLink(lnk.repo, t('work.link.repo')));
    }
    if (lnk.zenodo) {
      links.appendChild(createExternalLink(lnk.zenodo, t('work.link.zenodo')));
    }
    if (work.figure && work.figure.src) {
      var figBtn = createEl('button', 'figure-action-btn', t('work.btn.figure'));
      figBtn.type = 'button';
      figBtn.addEventListener('click', function () {
        openLightbox(work.figure, figBtn);
      });
      links.appendChild(figBtn);
    }
    footer.appendChild(links);

    var bibBox = null;
    if (work.bibtex) {
      var citeBtn = createEl('button', 'cite-toggle', t('work.btn.bibtex'));
      citeBtn.type = 'button';
      citeBtn.setAttribute('aria-expanded', 'false');

      bibBox = createEl('div', 'bibtex-box');
      bibBox.hidden = true;

      var copyBibBtn = createEl('button', 'copy-btn', t('btn.copy'));
      copyBibBtn.type = 'button';
      copyBibBtn.addEventListener('click', function () {
        copyText(work.bibtex, copyBibBtn);
      });

      var pre = createEl('pre', 'bibtex-pre');
      pre.textContent = work.bibtex;

      bibBox.appendChild(copyBibBtn);
      bibBox.appendChild(pre);

      citeBtn.addEventListener('click', function () {
        var expanded = !bibBox.hidden;
        bibBox.hidden = expanded;
        citeBtn.setAttribute('aria-expanded', String(!expanded));
        citeBtn.textContent = expanded ? t('work.btn.bibtex') : t('work.btn.hide_bibtex');
      });

      footer.appendChild(citeBtn);
    }

    card.appendChild(footer);
    if (bibBox) {
      card.appendChild(bibBox);
    }

    return card;
  }

  /* ---------------- Filtering & Rendering ---------------- */
  function updateFilterCounts() {
    var counts = { all: state.works.length, software: 0, genomics: 0, pharmacology: 0 };
    state.works.forEach(function (w) {
      if (Object.prototype.hasOwnProperty.call(counts, w.category)) {
        counts[w.category] += 1;
      }
    });

    Object.keys(counts).forEach(function (key) {
      var el = document.querySelector('[data-count="' + key + '"]');
      if (el) el.textContent = String(counts[key]);
    });
  }

  function matchesQuery(work, q) {
    if (!q) return true;
    var haystack = [
      work.title,
      work.title_zh,
      work.subtitle,
      work.subtitle_zh,
      work.authors,
      work.summary,
      work.summary_zh,
      work.kind,
      work.kind_zh,
      work.category_label,
      work.category_label_zh,
      (work.metrics || []).join(' '),
      (work.metrics_zh || []).join(' '),
      (work.badges || []).join(' '),
      (work.badges_zh || []).join(' '),
      work.links ? Object.values(work.links).join(' ') : ''
    ].join(' ').toLowerCase();
    return haystack.indexOf(q) !== -1;
  }

  function renderWorks() {
    var container = document.getElementById('works-list');
    if (!container) return;

    var q = state.query.trim().toLowerCase();
    var filtered = state.works.filter(function (w) {
      var catOk = state.activeFilter === 'all' || w.category === state.activeFilter;
      return catOk && matchesQuery(w, q);
    });

    container.textContent = '';

    if (filtered.length === 0) {
      var empty = createEl('div', 'empty-state');
      empty.textContent = t('works.empty');
      container.appendChild(empty);
      return;
    }

    var frag = document.createDocumentFragment();
    filtered.forEach(function (w) {
      frag.appendChild(buildWorkCard(w));
    });
    container.appendChild(frag);
  }

  function initControls() {
    var filterButtons = document.querySelectorAll('.filter-btn[data-filter]');
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.activeFilter = btn.getAttribute('data-filter') || 'all';
        filterButtons.forEach(function (other) {
          var active = other === btn;
          other.classList.toggle('is-active', active);
          other.setAttribute('aria-selected', String(active));
        });
        renderWorks();
      });
    });

    var searchInput = document.getElementById('works-search');
    if (searchInput) {
      searchInput.addEventListener('input', function () {
        state.query = searchInput.value || '';
        renderWorks();
      });
    }
  }

  function loadWorks() {
    var container = document.getElementById('works-list');
    if (!container) return;

    fetch('./data/public_works.json')
      .then(function (resp) {
        if (!resp.ok) {
          throw new Error('HTTP ' + resp.status);
        }
        return resp.json();
      })
      .then(function (payload) {
        state.works = Array.isArray(payload.works) ? payload.works : [];
        updateFilterCounts();
        renderWorks();
      })
      .catch(function () {
        container.textContent = '';
        var fallback = createEl('div', 'empty-state');
        fallback.textContent = t('works.load_error');
        container.appendChild(fallback);
      });
  }

  /* ---------------- Figure Lightbox ---------------- */
  var lastFocusedTrigger = null;

  function populateLightbox(fig) {
    var img = document.getElementById('lightbox-img');
    var label = document.getElementById('lightbox-label');
    var title = document.getElementById('lightbox-title');
    var caption = document.getElementById('lightbox-caption');
    var doi = document.getElementById('lightbox-doi');

    var displayTitle = pickWorkField(fig, 'title');
    var displayLabel = pickWorkField(fig, 'label') || t('lightbox.default_label');
    var displayCaption = pickWorkField(fig, 'caption');

    if (img) {
      img.src = fig.src;
      img.alt = displayTitle || t('lightbox.default_label');
    }
    if (label) label.textContent = displayLabel;
    if (title) title.textContent = displayTitle;
    if (caption) caption.textContent = displayCaption;
    if (doi) {
      if (fig.doi_url) {
        doi.href = fig.doi_url;
        doi.hidden = false;
      } else {
        doi.hidden = true;
      }
    }
  }

  function openLightbox(fig, triggerEl) {
    var modal = document.getElementById('figure-lightbox');
    if (!modal || !fig || !fig.src) return;

    lastFocusedTrigger = triggerEl || document.activeElement;
    state.activeLightboxFig = fig;
    populateLightbox(fig);

    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    var closeBtn = document.getElementById('lightbox-close-btn');
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    var modal = document.getElementById('figure-lightbox');
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    state.activeLightboxFig = null;
    document.body.style.overflow = '';
    if (lastFocusedTrigger && typeof lastFocusedTrigger.focus === 'function') {
      lastFocusedTrigger.focus();
    }
    lastFocusedTrigger = null;
  }

  function initFigureLightbox() {
    var triggers = document.querySelectorAll('.figure-trigger');
    triggers.forEach(function (btn) {
      btn.addEventListener('click', function () {
        openLightbox(
          {
            src: btn.getAttribute('data-fig-src') || '',
            label: btn.getAttribute('data-fig-label') || '',
            label_zh: btn.getAttribute('data-fig-label-zh') || '',
            title: btn.getAttribute('data-fig-title') || '',
            title_zh: btn.getAttribute('data-fig-title-zh') || '',
            caption: btn.getAttribute('data-fig-caption') || '',
            caption_zh: btn.getAttribute('data-fig-caption-zh') || '',
            doi_url: btn.getAttribute('data-fig-doi') || ''
          },
          btn
        );
      });
    });

    var closers = document.querySelectorAll('[data-lightbox-close]');
    closers.forEach(function (el) {
      el.addEventListener('click', closeLightbox);
    });

    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape') {
        closeLightbox();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initLanguage();
    initStaticCopyButtons();
    initFigureLightbox();
    initControls();
    loadWorks();
  });
})();
