(() => {
  const STORAGE_KEY = "runwen-site-language";
  const ZH = "zh";
  const EN = "en";

  const translations = new Map([
    ["Home - Runwen Yao", "首页 - 姚润文"],
    ["Research - Runwen Yao", "研究 - 姚润文"],
    ["Mesoscale Function - Runwen Yao", "介观尺度功能 - 姚润文"],
    ["RNA Organization - Runwen Yao", "物理原理 - 姚润文"],
    ["Quantitative Imaging - Runwen Yao", "定量成像 - 姚润文"],
    ["Publications - Runwen Yao", "发表论文 - 姚润文"],
    ["CV - Runwen Yao", "简历 - 姚润文"],
    ["Gallery - Runwen Yao", "图像集 - 姚润文"],
    ["Scientific Imaging - Runwen Yao", "科学成像 - 姚润文"],
    ["Through My Lens - Runwen Yao", "镜头所见 - 姚润文"],
    ["Protocol - Runwen Yao", "实验方案 - 姚润文"],
    ["Surface Passivation Protocol - Runwen Yao", "表面钝化方案 - 姚润文"],
    ["Protocol Template - Runwen Yao", "实验方案模板 - 姚润文"],
    ["Research Subpage Template - Runwen Yao", "研究子页面模板 - 姚润文"],

    ["Runwen Yao", "姚润文"],
    ["Runwen Yao HHMI / UT Southwestern Medical Center", `姚润文 <span class="footer-affiliation">霍华德·休斯医学研究所 / 得克萨斯州大学西南医学中心</span>`],
    ["Biomolecular condensates · mesoscale organization · cellular function", "生物分子凝聚体 · 介观组织 · 细胞功能"],
    ["Home", "首页"],
    ["Research", "研究"],
    ["Research Overview", "研究概览"],
    ["Theme I: Mesoscale regulation", "主题 I：介观尺度调控"],
    ["Theme II: Physical principles", "主题 II：物理原理"],
    ["Theme III: Quantitative tools", "主题 III：定量工具"],
    ["Publications", "发表论文"],
    ["PublicationsPubs", `<span class="nav-label-full">发表论文</span><span class="nav-label-short">论文</span>`],
    ["Pubs", "论文"],
    ["CV", "简历"],
    ["Gallery", "图集"],
    ["Images are central to how I think about science and the world. This gallery brings together scientific visualizations from my research and selected photographs from life outside the lab.", "图像是我理解科学与世界的重要方式。本图集汇集了来自研究工作的科学可视化图像，也收录了实验室之外的部分摄影观察。"],
    ["Research visuals", "研究图像"],
    ["Scientific Imaging", "科学成像"],
    ["Microscopy, condensates, and cellular organization", "显微成像、凝聚体与细胞组织"],
    ["This section contains scientific images, including cellular organization, condensates, super-resolution imaging, and related research visuals.", "这里收录我自己的一些科学摄影，包括细胞核组织、凝聚体、超分辨成像及相关研究，分析我看到的研究的世界。"],
    ["Outside the lab", "实验室之外"],
    ["Through My Lens", "镜头所见"],
    ["Travel, light, and everyday observations", "旅行、光线与日常观察"],
    ["This section contains selected mobile photographs from travel and daily life, extending the same visual attention into quieter observations beyond the lab.", "这里收录一些我在旅行与日常生活中的手机摄影，分享我看到的另一个世界。"],
    ["Enter gallery →", "进入图集 →"],
    ["← Back to Gallery", "← 返回图集"],
    ["Microscopy, condensates, and cellular organization viewed through the experimental systems that shape my research.", "一些我在科研中得到的有趣的科研成像"],
    ["Travel, light, and everyday observations gathered with a quiet attention to space, texture, and atmosphere.", "实验室之外，我在日常生活中的所见所闻。"],
    ["Light and distance", "光与距离"],
    ["Quiet street", "安静的街道"],
    ["Open sky", "开阔天空"],
    ["After rain", "雨后"],
    ["Passing through", "途经"],
    ["Desert light", "沙漠之光"],
    ["City texture", "城市纹理"],
    ["A small window", "一扇小窗"],
    ["Morning line", "清晨线条"],
    ["Still horizon", "静止的地平线"],
    ["Soft geometry", "柔和几何"],
    ["Warm surface", "温暖表面"],
    ["Roadside color", "路边色彩"],
    ["Late afternoon", "午后晚些时候"],
    ["Between places", "两地之间"],
    ["Field note", "途中札记"],
    ["Open shade", "开阔阴影"],
    ["Night reflection", "夜色倒影"],
    ["Islands in the Sky", "云端岛屿"],
    ["Yosemite National Park, California · Viewed from 35,000 Feet", "加利福尼亚州优胜美地国家公园 · 万米俯瞰"],
    ["Where the Ocean Ends the Day", "海洋结束白昼之处"],
    ["Olympic National Park, Washington · December 2025", "华盛顿州奥林匹克国家公园 · 2025 年 12 月"],
    ["Sentinels", "守望者"],
    ["Into the Mist", "驶入迷雾"],
    ["Mount Hood, Oregon · December 2025", "俄勒冈州胡德山 · 2025 年 12 月"],
    ["Spring by the Sea", "海边的春天"],
    ["La Jolla, California · April 2025", "加利福尼亚州拉霍亚 · 2025 年 4 月"],
    ["The Thinker", "思想者"],
    ["Madison, Wisconsin · July 2024", "威斯康星州麦迪逊 · 2024 年 7 月"],
    ["Manhattan at Dusk", "暮色曼哈顿"],
    ["New York, New York, Viewed from Above · August 2023", "纽约州纽约市航拍 · 2023 年 8 月"],
    ["Opening to the Sky", "向天空敞开"],
    ["Atlanta, Georgia · July 2023", "佐治亚州亚特兰大 · 2023 年 7 月"],
    ["Folds of the Earth", "大地的皮肤"],
    ["Southern California · Viewed from Above · July 2023", "南加州航拍 · 2023 年 7 月"],
    ["Learning to Be Happy", "阳光与信任"],
    ["Pipi's first happy day at home.For many rescue animals, the moment that truly changes their fate is not the day they are adopted, but the day they finally let their guard down. Dallas, Texas · June 2023", "小皮皮第一次在家里开心。很多领养动物真正改变命运的时刻，不是被领养那天，而是第一次放松下来的那一天。得克萨斯州达拉斯 · 2023 年 6 月"],
    ["The Vanishing City", "云中的城市"],
    ["Dallas, Texas · June 2023", "得克萨斯州达拉斯 · 2023 年 6 月"],
    ["The Lab from Above", "实验室之上"],
    ["UT Southwestern Medical Center, Dallas, Texas · June 2023", "西南医学中心航拍 · 2023 年 6 月"],
    ["After Winter", "冬后"],
    ["Galveston, Texas · With Dandan · May 2023", "和蛋蛋在得克萨斯州加尔维斯顿 · 2023 年 5 月"],
    ["The Good Boy", "好狗"],
    ["My big dog Dandan. Fort Worth, Texas · January 2023", "我的黑鬃灵犬：蛋蛋。得克萨斯州沃思堡 · 2023 年 1 月"],
    ["Sunday Afternoon", "周日下午"],
    ["Dallas, Texas · January 2023", "得克萨斯州达拉斯 · 2023 年 1 月"],
    ["Toward the Light", "向光而行"],
    ["Oklahoma City, Oklahoma · July 2022", "俄克拉荷马州俄克拉荷马城 · 2022 年 7 月"],
    ["Written in Stone", "不可磨灭"],
    ["Saguaro National Park, Arizona · April 2026", "亚利桑那州仙人掌国家公园 · 2026 年 4 月"],
    ["Under the Same Bridge", "各自成双"],
    ["San Francisco, California · May 2026", "加利福尼亚州旧金山 · 2026 年 5 月"],
    ["Email", "邮箱"],
    ["Google Scholar", "谷歌学术主页"],
    ["Google Scholar profile", "谷歌学术主页"],
    ["Contact me", "联系我"],

    ["Runwen Yao, Ph.D.", "探究介观尺度下的生物分子凝聚体"],
    ["CV page title", "简历"],
    ["Biomolecular condensates at the mesoscale", "Biomolecular condensates at the mesoscale"],
    ["Research vision", "研究愿景"],
    ["How condensate organization gives rise to cellular function.", "生物分子凝聚体的结构排布如何决定其生物学功能"],
    ["Cells organize biochemical reactions not only through membrane-bound organelles, but also through biomolecular condensates that structure cellular space. These condensates exhibit mesoscale organization, where internal structure encodes biochemical function.", "细胞除借助膜包裹的细胞器来组织生化反应外，还可依靠生物分子凝聚体构建胞内空间。这些凝聚体具备介观尺度结构排布，这些结构排布可编码并调控各类生化功能。"],
    ["I study how their mesoscale organization emerges and governs cellular processes by integrating cell biology, biochemistry, and quantitative biophysics with advanced imaging.", "我综合运用细胞生物学、生物化学、定量生物物理学及前沿成像技术，探究生物分子凝聚体的介观结构，剖析其形成机制与细胞过程调控规律。"],
    ["About me", "关于我"],
    ["Scientific trajectory", "我的科研轨迹"],
    ["My work began with dissecting how nucleolar mesoscale organization controls pre-rRNA biogenesis, and revealed that condensate architecture is actively regulated, for example by long noncoding RNAs.", "我的早期研究聚焦于核仁这一典型生物分子凝聚体，探究其介观结构对前体核糖体 RNA 生成过程的调控机制，并证实该结构处于主动调控状态，例如长非编码 RNA 可参与塑造核仁的介观组织结构。"],
    ["I now focus on how condensate size and internal organization regulate biochemical behavior, particularly how size-dependent constraints and molecular organization shape reaction efficiency and accessibility.", "现阶段，我重点研究生物分子凝聚体的物理尺寸与内部排布方式对其生化特性的调控规律，着重分析尺寸依赖性约束与分子组织模式如何影响生化反应效率及分子可及性。"],
    ["In parallel, I develop and apply quantitative imaging, in vitro reconstitution, and single-molecule approaches to directly probe condensate organization and dynamics.", "同时，我开发并结合定量成像、体外重构与单分子成像技术，对生物分子凝聚体的组织结构与动态行为开展原位、定量探测。"],

    ["How spatial organization of biomolecular condensates gives rise to function", "生物分子凝聚体的组织结构与其生物学功能的构效关系"],
    ["Theme I", "主题 I"],
    ["Theme II", "主题 II"],
    ["Theme III", "主题 III"],
    ["Mesoscale regulation of cellular condensates", "凝聚体的介观尺度调控"],
    ["Mesoscale architecture of condensates organizes RNA metabolism and cellular activity.", "探究生物分子凝聚体的介观结构对 RNA 代谢与细胞活动的调控机制。"],
    ["Mesoscale function", "介观尺度功能"],
    ["I investigate how mesoscale architectures within biomolecular condensates regulate cellular function. From lncRNA-dependent nuclear bodies to nucleolar substructures, my work shows how spatial organization shapes condensate architecture and coordinates RNA transcription, processing, and flux in living cells.", "我研究生物分子凝聚体的介观内部结构对细胞功能的调控机制。以长非编码 RNA 依赖的细胞核体与核仁亚结构为研究对象，我的工作表明，生物分子凝聚体的空间组织模式能够塑造其细胞学功能，参与调控活细胞内 RNA 的转录、加工与转运过程。"],
    ["Physical principles of condensate function", "凝聚体功能的物理原理"],
    ["Size, connectivity, and material state define how condensates encode biochemical function.", "尺寸、连接性与材料性质共同决定了生物分子凝聚体对生化功能的编码方式。"],
    ["Physical principles", "生物物理原理"],
    ["I study how condensate function is shaped by mesoscale physical properties, including size, internal organization, and material state. My work focuses on how these properties influence molecular dynamics and biochemical activity in condensates.", "我致力于研究介观尺度物理性质对生物分子凝聚体功能的调控作用，包括其物理尺寸、内部组织模式与材料特性。我的研究重点在于揭示上述物理性质如何调控凝聚体内部的分子动态特征与生化活性。"],
    ["Quantitative tools for condensate biology", "凝聚体的研究工具"],
    ["Quantitative imaging and reconstitution tools to measure and control condensates across scales.", "开发跨尺度测量与调控生物分子凝聚体的定量成像方法及体外实验体系。"],
    ["Tool development", "工具开发"],
    ["I develop quantitative imaging and reconstitution approaches to measure and control biomolecular condensates across scales. My work includes dedicated methods for preserving condensate architecture and enabling high-sensitivity condensate assays, as well as a range of integrated tools—such as perturbation strategies, super-resolution imaging, and single-molecule approaches—to probe molecular organization and dynamics within condensates.", "我围绕生物分子凝聚体开发定量成像技术与体外实验体系，实现对凝聚体的跨尺度测量与精准调控。我的研究建立了可稳定凝聚体结构、实现高灵敏度检测的钝化方法，并整合超分辨成像与单分子表征等技术手段，用以解析凝聚体内部的分子组织特征与动态变化规律。"],
    ["Enter detailed page →", "进入详情页 →"],
    ["When molecules assemble into higher-order structures, new properties emerge that cannot be understood from individual components alone. Biomolecular condensates provide a striking example of this principle, where dynamic assemblies of proteins and RNAs give rise to new modes of cellular organization and regulation.", "分子组装形成高阶结构后，会涌现出单一组分不具备的全新性质。生物分子凝聚体正是该组装原理的典型体现：由蛋白质与 RNA 动态组装形成的凝聚体，能够赋予细胞全新的组织结构与调控模式。"],
    ["Understanding these systems requires examining their spatiotemporal organization at the mesoscale (10s to 100s nm) where molecular interactions are integrated into structured yet dynamic architectures. At this scale, organization is not merely structural but functional: spatial and temporal arrangements define condensate architecture, which shapes physical properties such as molecular mobility and material state, ultimately governing biochemical activity. This regime has long remained difficult to access, lying between the resolution limits of conventional light microscopy and the static snapshots of structural approaches.", "理解这类生物系统，需要从介观尺度（数十至数百纳米）解析其内部时空组织特征。在该尺度下，零散的分子相互作用整合为结构化且动态可变的分子架构。这种时空组织兼具结构属性与功能属性：凝聚体内部的时空排布模式构筑了其整体架构，进一步调控分子动态行为与材料物理特性，最终决定凝聚体的生化活性与生物学功能。然而，该介观尺度恰好处于传统光学显微镜分辨率极限与结构生物学静态观测尺度的间隙，长期以来难以被直接观测与解析。"],
    ["My research seeks to uncover how cellular function emerges from this mesoscale organization. I investigate how condensates organize molecular processes in cells, identify the physical principles that govern their behavior, and develop quantitative approaches to measure and control these systems. Together, these efforts aim to establish a unified framework linking spatial organization, physical properties, and biological function of biomolecular condensates.", "我的研究旨在揭示细胞功能如何从介观尺度组织中涌现。我系统探究生物分子凝聚体对胞内分子过程的组织机制，解析调控其动态行为的生物物理基本原理，并开发可定量测量与精准调控该类体系的技术方法。本研究致力于建立生物分子凝聚体空间组织 — 物理性质 — 生物学功能之间的内在关联。"],

    ["Biomolecular condensates have emerged as a fundamental mechanism by which cells organize biochemical reactions. Yet these structures are not homogeneous: they exhibit internal organization at the mesoscale (tens to hundreds of nanometers), where molecular interactions give rise to structured, dynamic architectures.", "生物分子凝聚体已成为阐释细胞生化反应组织方式的核心机制。该类结构并非均质体系，而是在介观尺度（数十至数百纳米）呈现精细的内部组织，通过多层次分子相互作用，形成兼具结构性与动态性的胞内亚结构。"],
    ["Increasing evidence suggests that these mesoscale features directly encode biochemical function. However, this regime remains difficult to access due to its small size, dense packing, and dynamic nature.", "越来越多的研究证据表明，这类介观尺度特征可直接编码生化功能。但因其尺度微小、分子堆积致密且动态性极强，该尺度的精准观测与机制研究仍存在诸多难点。"],
    ["A major part of my research seeks to uncover how mesoscale organization is established and how it gives rise to function in living cells. In particular, I focus on how RNA molecules regulate condensate architecture through multivalent interactions and molecular scaffolding.", "我的核心研究方向之一，是揭示生物分子凝聚体介观组织结构的形成机制及其在活细胞中的功能输出。其中，我重点探究 RNA 如何通过多价相互作用协同蛋白质，共同调控凝聚体的整体架构。"],
    ["RNA as an architect of condensate organization", "RNA：塑造生物分子凝聚体架构的关键因子"],
    ["My early work asked a simple question: can RNA actively shape nuclear architecture? To answer this, I combined super-resolution microscopy with molecular and cell biology approaches to directly visualize how RNA organizes nuclear architecture.", "我早期的研究围绕一个核心科学问题展开：RNA 是否能够主动塑造细胞核结构？为解答这一问题，我整合显微成像、分子生物学与细胞生物学手段，原位解析 RNA 调控细胞核内空间结构的组织机制。"],
    ["I began by investigating SPA RNAs, a class of lncRNAs derived from the Prader Willi syndrome (PWS) locus. Using Structured Illumination Microscopy (SIM), I showed that these RNAs assemble into distinct nuclear condensates, PWS bodies, that act as “protein traps,” concentrating multiple RNA-binding proteins. This sequestration rewires protein availability and leads to widespread changes in alternative splicing programs (Molecular Cell, 2016). These findings demonstrated that RNA can directly organize functional compartments by controlling protein localization.", `我首先聚焦一类与小胖威利综合征（Prader-Willi syndrome, PWS）相关的长非编码 RNA 开展研究。借助结构照明显微技术（SIM），我发现这类 RNA 可在细胞核内组装形成 PWS 小体凝聚结构。PWS 小体能够富集多种 RNA 结合蛋白，重塑局部蛋白浓度，进而广泛调控 RNA 的可变剪接过程（<a class="inline-citation" href="https://doi.org/10.1016/j.molcel.2016.10.007" target="_blank" rel="noopener noreferrer">Molecular Cell, 2016</a>）。上述研究证实，RNA 可通过主动构建功能性凝聚体区室，重塑胞内分子组织并调控生物学功能。`],
    ["I then studied SLERT, a human nucleolar lncRNA that regulates ribosomal RNA transcription. Using super-resolution microscopy, I discovered that DDX21 forms ring-shaped assemblies surrounding Pol I complexes in the nucleolus, where they function as a structural brake on pre-rRNA transcription. SLERT binds DDX21 and loosens these ring assemblies, relieving their suppressive effect on Pol I and enhancing rRNA synthesis (Cell, 2017). This work revealed a mechanism by which RNA controls gene expression through remodeling higher-order protein architecture within a condensate.", `后续研究聚焦于人源核仁长非编码 RNA <em>SLERT</em>，该分子可特异性调控核糖体 RNA 的转录过程。借助超分辨显微成像技术，我发现 DDX21 蛋白可在核仁内形成约 200 纳米的环状介观结构，环绕于 RNA 聚合酶 I 复合物外围。该环状结构可作为结构性制动器，抑制前体核糖体 RNA 的转录过程。<em>SLERT</em> 通过结合 DDX21，松弛其环状组装结构，解除对 RNA 聚合酶 I 复合物的抑制作用，进而促进核糖体 RNA 的合成（<a class="inline-citation" href="https://doi.org/10.1016/j.cell.2017.04.011" target="_blank" rel="noopener noreferrer">Cell, 2017</a>）。该工作揭示了长非编码 RNA 通过重塑生物分子凝聚体的介观架构、精准调控基因表达的新型分子机制。`],
    ["Together, these studies establish a broader principle: RNA is not merely a passive component of condensates, but an active architectural regulator that shapes their internal organization, molecular composition, and functional output.", "上述系列研究揭示了一条普适性规律：RNA 并非生物分子凝聚体中的被动组分，而是可主动塑造其介观组织结构、分子组成与功能输出的核心调控因子。"],
    ["DDX21 forms ring-like structures surrounding RNA Pol I complexes in the human nucleolus, acting as a structural constraint on pre-rRNA transcription. SLERT binds DDX21 and modulates the size and organization of these rings, relieving their inhibitory effect and promoting rRNA synthesis. Loss of SLERT results in enlarged DDX21 rings and reduced pre-rRNA production (Cell, 2017).", `DDX21 在人类核仁中可组装形成环状结构，环绕 RNA 聚合酶 I 复合物，对前体核糖体 RNA 的转录过程产生结构性约束。<em>SLERT</em> 通过结合 DDX21，调控该环状结构的尺寸与组织形态，解除其转录抑制效应，进而促进核糖体 RNA 合成。 <em>SLERT</em> 的缺失会导致 DDX21 环状结构异常扩张，最终造成核糖体 RNA 合成水平下降（<a class="inline-citation" href="https://doi.org/10.1016/j.cell.2017.04.011" target="_blank" rel="noopener noreferrer">Cell, 2017</a>）。`],
    ["The nucleolus as a model of mesoscale function", "核仁：介观尺度生物分子凝聚体的功能研究模型"],
    ["To understand how spatial organization gives rise to function, I turned to the nucleolus—the largest biomolecular condensate in the cell (Molecular Cell, 2019).", `为阐释生物分子凝聚体的时空组织如何介导功能输出，我进一步聚焦核仁展开研究，其作为细胞内规模最大的生物分子凝聚体，是解析凝聚体介观功能的理想模型（<a class="inline-citation" href="https://doi.org/10.1016/j.molcel.2019.08.014" target="_blank" rel="noopener noreferrer">Molecular Cell, 2019</a>）。`],
    ["Using multiple super-resolution microscopies including SIM, STED and STORM, I revealed that the nucleolus is a highly organized system composed of distinct mesoscale substructures. Individual nucleoli contain multiple active nucleolar organizer regions (NORs), each harboring a small number (typically 2–3) of transcriptionally active rDNA copies embedded within mixed chromatin states. These sites generate nascent pre-rRNA at the FC–DFC interface.", "结合结构照明显微技术（SIM）、受激辐射损耗显微技术（STED）与随机光学重建显微技术（STORM）等多种超分辨成像手段，我系统解析了人类核仁精细的介观亚结构。研究发现，单个核仁包含多个活性核仁组织区（NORs），且每个核仁纤维中心内均存在少量（通常 2–3 个）处于活跃转录状态的核糖体 DNA 拷贝。这些核糖体 DNA 可在纤维中心与致密纤维组分的交界区域，完成前体核糖体 RNA 的新生转录过程。"],
    ["A central finding of this work is that nascent pre-rRNA undergoes directional sorting rather than passive diffusion. Newly transcribed RNA is actively routed from transcription sites into the DFC, where processing occurs. Within the DFC, processing factors such as FBL assemble into multiple discrete nanoscale clusters (“beads”) that define spatially organized processing hubs. We found that this sorting process is not merely guided by pre-existing structure, but is mechanistically coupled to condensate organization. Through perturbation and screening, we identified FBL as a key regulator: its intrinsically disordered GAR domain drives self-association into clusters, which capture and process incoming pre-rRNA. In turn, the continuous influx and sorting of RNA promotes the assembly and maintenance of these clusters.", "更为关键的是，我发现新生前体核糖体 RNA 并非通过被动扩散，而是依靠定向分选转运完成胞内运输。新生前体核糖体 RNA 从转录位点主动转运至核仁致密纤维组分中完成后续加工。在致密纤维组分内部，FBL 等 RNA 加工蛋白可自组装形成多个离散的百纳米级簇状结构（“珠状单元”），构成空间有序的 RNA 加工功能模块。研究证实，该 RNA 分选转运过程并非单纯由固有结构被动引导，而是与凝聚体内部介观结构形成动态耦合调控机制。通过分子筛选，我们明确 FBL 为核心调控因子：其富含甘氨酸与精氨酸的内在无序结构域可通过相分离自组装形成纳米簇结构，特异性捕获并加工转运进入的前体核糖体 RNA。与此同时，RNA 的持续输入与分选转运，又进一步反向促进并维持 FBL 簇状结构的组装与稳定。"],
    ["Super-resolution imaging reveals the spatial organization of nucleolar subcompartments, with FBL enriched in discrete clusters within the dense fibrillar component (DFC). Nascent pre-rRNA transcripts emerging from rDNA at the FC–DFC interface are directionally sorted into the DFC, where they associate with FBL. This RNA-driven process promotes the assembly of phase-separated FBL clusters and coordinates pre-rRNA processing (Molecular Cell, 2019).", `超分辨成像结果清晰揭示了核仁亚区室的空间组织特征：FBL 蛋白在致密纤维组分中富集，形成离散的纳米簇结构。于纤维中心与致密纤维组分交界处转录生成的新生前体核糖体 RNA，可通过定向转运进入致密纤维组分并与 FBL 蛋白特异性结合。这一 RNA 驱动的动态过程，既促进 FBL 相分离簇状结构的组装与稳态维持，又精准协同前体核糖体 RNA 的加工成熟过程（<a class="inline-citation" href="https://doi.org/10.1016/j.molcel.2019.08.014" target="_blank" rel="noopener noreferrer">Molecular Cell, 2019</a>）。`],
    ["Building on this framework, we identified a previously unrecognized nucleolar substructure, the PDFC, revealing a layered mesoscale organization within the nucleolus. This work further showed that distinct sub-regions within a condensate can coordinate specialized biochemical steps in space (Nature, 2023).", `基于上述研究框架，我们进一步鉴定出前人未发现的核仁精细亚结构，证实核仁内部存在高度复杂的介观尺度层级组织。该研究进一步阐明，生物分子凝聚体可通过内部空间分区，实现不同生化过程的精准时空分工与有序协同（<a class="inline-citation" href="https://doi.org/10.1038/s41586-023-05767-5" target="_blank" rel="noopener noreferrer">Nature, 2023</a>）。`],
    ["These findings suggest a principle: condensates are structured systems that actively direct molecular flow, rather than passive containers.", "这些发现凝练出核心研究准则：生物分子凝聚体并非容纳生化反应的被动容器，而是可主动引导分子流动、精准调控生化进程的结构化动态系统。"],
    ["Extending mesoscale organization beyond the nucleus", "介观尺度研究：从细胞核拓展至胞内全域"],
    ["These principles are not restricted to nuclear condensates, but extend to other cellular contexts. In collaborative work, I explored how condensate-like organization appears in diverse systems.", "上述介观调控规律并不局限于细胞核内凝聚体体系，同样适用于其他胞内微环境。依托合作研究，我进一步探索了生物分子凝聚体在不同细胞环境中的功能调控机制，验证了相关原理的普适性。"],
    ["For example, imaging of purinosomes revealed their dynamic assembly and disassembly in cells, suggesting a regulated organization of metabolic enzymes (Science, 2025). Similarly, studies of nuclear bodies such as paraspeckles have linked their internal organization to cellular stress responses (Nature Cell Biology, 2018).", `例如，对嘌呤小体（purinosomes）的成像分析揭示其在胞内呈现高度动态的组装与解组装过程，表明其组织结构受到精密调控（<a class="inline-citation" href="https://doi.org/10.1126/science.adx9717" target="_blank" rel="noopener noreferrer">Science, 2025</a>）。与此同时，针对旁斑（paraspeckles）等核内凝聚体的研究，进一步建立了凝聚体介观组织与细胞压力应激响应的内在关联（<a class="inline-citation" href="https://doi.org/10.1038/s41556-018-0204-2" target="_blank" rel="noopener noreferrer">Nature Cell Biology, 2018</a>）。`],
    ["Together, these observations suggest that mesoscale organization may represent a broader strategy by which cells spatially coordinate biochemical processes across different compartments.", "系列观测结果共同表明，生物分子凝聚体的介观尺度组织，是细胞用于有序调控复杂生化过程的一种通用性策略。"],

    ["Biomolecular condensates are not only structured in space, but also defined by their physical properties. I study how condensate function is shaped by mesoscale physical parameters—including size, internal organization, and material state—and how these properties regulate molecular dynamics and biochemical activity. A central goal of this work is to understand how physical features of condensates encode function beyond molecular composition alone.", "生物分子凝聚体具备丰富且多样的物理特性。我探究凝聚体功能如何受介观尺度物理参数（包括尺寸大小、内部架构与材料属性）的塑造，并解析上述物理特征对分子动态行为与生化活性的调控规律。该研究的核心目标，是阐明物理特征独立于分子组成之外而编码凝聚体生物学功能的核心机制。"],
    ["Quantitative control and measurement of biomolecular condensates", "凝聚体的定量测量与介观尺度调控"],
    ["To address this, I develop quantitative approaches to control and measure condensates across scales, combining biochemical reconstitution with high-resolution imaging. These strategies enable precise manipulation of condensate properties and allow direct measurement of molecular behavior within condensates at high sensitivity, including at the single-molecule level. They also make it possible to observe dynamic processes within condensates over time.", "为系统解析上述科学问题，我结合体外生化重构体系与高分辨显微成像技术，建立了一套可跨尺度操控与定量表征生物分子凝聚体的实验方法体系。该方法能够精准调控凝聚体的物理与结构性质，高灵敏度量化凝聚体内部的分子动态特征，实现单分子层级的行为解析，并支持对凝聚体内部动态过程的长时程动态观测。"],
    ["Single-molecule tracking reveals that molecules are not uniformly distributed within condensates, but instead experience spatially heterogeneous environments. Distinct mobility patterns and positional distributions indicate that different regions within condensates provide different interaction landscapes. These observations suggest that condensates contain non-uniform distributions of available binding sites and are internally structured systems rather than homogeneous phases. (PNAS, 2024).", `单分子追踪结果表明，蛋白分子在生物分子凝聚体内部并非均匀分布，而是呈现显著的空间异质性。凝聚体不同区域的蛋白分子展现出差异化的动力学特征与运动模式。该发现揭示，生物分子凝聚体内部的蛋白结合位点呈非均一性空间分布。（<a class="inline-citation" href="https://doi.org/10.1073/pnas.2403013121" target="_blank" rel="noopener noreferrer">PNAS, 2024</a>）。`],
    ["Size as a fundamental physical variable", "尺寸作为调控生物分子凝聚体功能的核心物理变量"],
    ["Among different parameters, condensate size provides a particularly tractable and fundamental variable. Biomolecular condensates span a wide range of length scales, from nanometer-scale assemblies to micron-sized compartments, and their size can change dynamically in living cells. However, whether condensates of different sizes operate under distinct physical and functional regimes remains largely unclear.", "在各类物理特征中，尺寸是调控生物分子凝聚体功能的基础且普适的核心变量。生物分子凝聚体的尺度跨度极大，涵盖从纳米级分子组装体到微米级胞内区室，且其尺寸可在活细胞内发生动态重塑。然而，凝聚体尺寸差异是否对应截然不同的物理状态与功能输出，此前仍尚不明确。"],
    ["My work explores how changes in size alter spatial organization, thereby tuning molecular recruitment and biochemical activity. More broadly, this connects to a general framework in which molecular-scale interactions give rise to network architectures that define condensate states which in turn regulate function.", "我目前的研究聚焦于探究凝聚体尺寸动态变化如何重塑其内部空间介观组织，进而调控蛋白招募效率与生化反应活性。本研究旨在阐明：分子尺度的相互作用网络如何定义凝聚体的物理与功能状态，最终实现对胞内生化功能的精准调控。"],
    ["In parallel, I am interested in how physical features of biomolecular assemblies encode biochemical outputs more generally. For example, in collaborative work, I investigate how the length of nucleic acid polymers can regulate enzymatic activity, providing a complementary perspective on how physical dimensions influence biological function.", "与此同时，我进一步探究生物分子凝聚体的物理特征编码生化功能输出的普适性机制。依托合作研究，我正在解析核酸多聚物长度对蛋白酶活性的调控规律。相关研究从全新的物理维度，为阐释生物分子凝聚体调控生物学功能的机制提供了互补性视角。"],
    ["Together, these works seek to establish a quantitative framework linking physical properties of condensates to their biological functions, bridging molecular interactions, mesoscale organization, and cellular activity.", "这一系列研究旨在构建一套完整的定量研究框架，建立生物分子凝聚体物理特性与生物学功能之间的关联体系，系统阐释分子相互作用、介观组织结构与细胞生理活性之间的层级调控机制。"],

    ["Quantitative imaging and reconstitution", "定量成像与体外重构技术体系"],
    ["Biomolecular condensates are difficult to study because the methods used to observe them often perturb the very properties one hopes to measure. A major part of my work is therefore to build quantitative tools that preserve condensate architecture while enabling sensitive analysis of molecular organization and dynamics. I combine super-resolution imaging, biochemical reconstitution, and single-molecule approaches to create experimental systems that make condensates measurable across scales.", "生物分子凝聚体的研究长期受制于技术瓶颈：传统观测手段往往会扰动其本征结构与动态特性，难以实现无干扰定量表征。为此，我的研究重点聚焦于开发低扰动定量研究工具，在保全凝聚体原生结构的前提下，实现对分子组织模式与动态行为的高灵敏度解析。我融合超分辨显微成像、体外生化重构与单分子追踪技术，搭建了一套可跨尺度表征与探究生物分子凝聚体的实验方法体系。"],
    ["Preserving condensate architecture in cells", "保持细胞内生物分子凝聚体超微结构的固定方法"],
    ["A central challenge in imaging nuclear condensates is that conventional fixation methods often force a trade-off between RNA detection, protein labeling, and structural preservation. To overcome this, I developed an optimized fixation strategy that combines glyoxal with paraformaldehyde (RNA, 2021). This method markedly improves RNA FISH signal by increasing nuclear permeability and probe accessibility, while maintaining low background and avoiding additional autofluorescence. At the same time, it preserves protein epitopes and fluorescent protein signals during immunostaining and RNA FISH, enabling more accurate protein labeling and simultaneous multicolor visualization of RNAs and proteins in the same nuclear condensate. Importantly, this improvement in signal does not come at the cost of structure: the method better preserves cell morphology and condensate ultrastructure, allowing covisualization of nucleoli, paraspeckles, nuclear speckles, Cajal bodies, and other nuclear bodies with minimal distortion even under super-resolution microscopy.", `成像细胞核内凝聚体存在一大核心难题，传统固定方式往往无法兼顾 RNA 成像、蛋白检测与超微结构完整度。针对该问题，我研发了乙二醛联合多聚甲醛的改良固定方案（<a class="inline-citation" href="https://doi.org/10.1261/rna.078671.120" target="_blank" rel="noopener noreferrer">RNA, 2021</a>）。该方案可提升细胞核通透性与探针结合效率，有效增强 RNA 荧光原位杂交信号，背景干扰低且不会产生额外自发荧光。同时能够完好留存蛋白抗原表位与荧光蛋白信号，实现单个核内凝聚体中 RNA 与蛋白的精准标记及多色共定位观测。同时，信号强度提升并未损耗样本结构质量，该固定方式可稳定维持细胞形貌与凝聚体超微构造，即便借助超分辨成像技术，也能低失真观测核仁、旁斑、核斑、卡哈尔小体等多种核体结构。`],
    ["SIM imaging shows that GO/PFA fixation maintains the ultrastructural organization of condensates more faithfully than conventional PFA fixation, yielding images that more closely match live-cell morphology (RNA, 2021).", `结构照明显微成像结果证实，相较于单纯多聚甲醛固定，乙二醛 - 多聚甲醛复合固定方式能更真实地留存凝聚体超微结构，成像形貌也更贴合活细胞原生状态（<a class="inline-citation" href="https://doi.org/10.1261/rna.078671.120" target="_blank" rel="noopener noreferrer">RNA, 2021</a>）。`],
    ["High-sensitivity assays for reconstituted condensates", "体外重构凝聚体的高灵敏检测技术"],
    ["In biochemical reconstitution, a parallel problem is undesired interaction between condensates and glass surfaces, which can distort droplet morphology, alter material properties, and generate background that limits sensitive measurements. To address this, I developed a simple surface passivation strategy based on self-assembly of Pluronic F127 on hydrophobic glass (PNAS, 2024). PF127 forms a dense hydrated brush layer that strongly suppresses nonspecific binding of both condensates and dilute-phase molecules, outperforming traditional BSA- and mPEG-based methods across diverse condensate systems. The method is straightforward and robust: it requires less than 1 hour of active handling, can be completed within 3 hours, and reduces cost by 99% relative to standard mPEG/BSA passivation, making high-quality condensate assays much more accessible and reproducible.", `体外重构体系中，需规避凝聚体与玻璃界面的非特异性相互作用。此类作用易造成液滴形态畸变、材料特性改变，还会升高背景信号，阻碍高灵敏检测。对此，我研发了简易的表面钝化方案，利用泊洛沙姆 F127 在疏水玻璃表面自组装完成界面修饰。该物质可形成致密水合层，有效抑制凝聚体与游离蛋白的非特异吸附（<a class="inline-citation" href="https://doi.org/10.1073/pnas.2403013121" target="_blank" rel="noopener noreferrer">PNAS, 2024</a>）。实验证实，该钝化效果优于 BSA、mPEG 等常规手段。方案操作简便稳定性强，实操时长不足一小时，全程三小时内即可完成，相较传统方法成本降幅达 99%，有效提升实验数据质量与重复性。`],
    ["Representative cross-sectional images of Dhh1, Nck/N-WASP, and polySUMO/polySIM condensates on bare glass or surfaces passivated with BSA, mPEG, mPEG/BSA, or PF127. PF127 most effectively suppresses condensate spreading across all three systems, preserving rounded morphology and high contact angle, consistent with reduced nonspecific surface interactions without perturbing condensate physical properties (PNAS, 2024).", `选取 Dhh1、Nck/N-WASP 及 polySUMO/polySIM 三类凝聚体，分别观测其在裸玻璃与 BSA、mPEG、mPEG/BSA、PF127 钝化基底上的截面形貌。结果显示，PF127 可最大程度抑制凝聚体润湿行为，维持规整形态与较高接触角，证实该修饰方式能有效削弱非特异性结合，且不会干扰凝聚体固有物理特性（<a class="inline-citation" href="https://doi.org/10.1073/pnas.2403013121" target="_blank" rel="noopener noreferrer">PNAS, 2024</a>）。`],
    ["Crucially, this gain in performance does not come at the expense of condensate integrity. PF127 passivation remains stable across extensive washing, broad pH and salt ranges, and large imaging areas, while preserving condensate phase behavior and material properties. By combining PF127 with Biotin–NeutrAvidin anchor points, I further enabled controlled immobilization of condensates without inducing appreciable wetting or altering intrinsic physical behavior. This platform supports movement-sensitive measurements such as FRAP, droplet fusion assays, 3D imaging, and especially high-precision single-molecule analyses by minimizing background fluorescence and stabilizing droplets during acquisition. Using this strategy, I was able to resolve single-molecule dynamics within reconstituted condensates and begin probing their internal molecular heterogeneity.", "至关重要的是，该性能优势并未以损害凝聚体结构完整性为代价。PF127 钝化基底在充分洗涤、宽 pH 区间与宽泛盐浓度条件下均具备优异稳定性，能够完整保留凝聚体的相分离特征与材料属性。我进一步将 PF127 钝化体系与生物素 - 亲和素锚定系统相结合，实现了凝聚体的可控固定，且不会引发明显的界面润湿效应、不改变凝聚体固有物理特性。该实验平台能够有效降低背景荧光信号，并在成像采集过程中稳定液滴结构，可兼容荧光漂白恢复（FRAP）、液滴融合实验、三维成像及对动态变化高度敏感的高精度单分子追踪（SMT）等多种定量检测手段。依托这一优化策略，我成功解析了体外重构的 polySUMO/polySIM 生物分子凝聚体内部的蛋白单分子动态特征，揭示了其内部的蛋白空间异质性。"],
    ["A self-assembled PF127 layer is combined with sparse biotin–NeutrAvidin anchor points to tether condensates to the surface while minimizing nonspecific interactions. This strategy allows stable imaging of condensates for movement-sensitive assays without substantial wetting or distortion of condensate properties (PNAS, 2024).", `整合自组装泊洛沙姆 PF127 涂层与生物素 - 亲和素锚定体系，可实现凝聚体的可控表面固定，并最大程度抑制非特异性相互作用。该策略能够在低扰动、高灵敏度的精细实验条件下稳定成像凝聚体，避免界面浸润造成的结构畸变与物理性质改变（<a class="inline-citation" href="https://doi.org/10.1073/pnas.2403013121" target="_blank" rel="noopener noreferrer">PNAS, 2024</a>）。`],
    ["Integrated imaging and perturbation tools for condensate dynamics", "面向凝聚体动态研究的整合成像与靶向扰动工具"],
    ["Beyond dedicated methods papers, I have also contributed to complementary tools for interrogating condensate-associated RNA behavior, including a CRISPR–Cas13-based live-cell RNA imaging system (Molecular Cell, 2019a) and a CRISPR-based interference strategy for selectively blocking RNA–protein interactions (Molecular Cell, 2019b). Together with my extensive use of super-resolution microscopy, these efforts define a broader research direction: building quantitative experimental systems that connect condensate architecture to molecular dynamics and biological function.", `除自主建立的系列定量实验方法外，我还参与开发了多项凝聚体 RNA 研究工具，包括基于 CRISPR–Cas13 的活细胞 RNA 成像体系（<a class="inline-citation" href="https://doi.org/10.1016/j.molcel.2019.10.024" target="_blank" rel="noopener noreferrer">Molecular Cell, 2019a</a>），以及依托 CRISPR 系统、可选择性阻断 RNA–蛋白相互作用的靶向扰动工具（<a class="inline-citation" href="https://doi.org/10.1016/j.molcel.2019.08.014" target="_blank" rel="noopener noreferrer">Molecular Cell, 2019b</a>）。结合超分辨显微成像技术的深度应用，上述工具体系为串联凝聚体结构架构、分子动态特征与生物学功能，提供了重要的技术支撑。`],

    ["Postdoctoral researcher with interdisciplinary training spanning cell biology, RNA biology, biochemistry, biophysics, and advanced imaging.", "本人为博士后研究员，具备跨学科研究背景，系统深耕细胞生物学、RNA 生物学、生物化学与生物物理领域，熟练掌握各类先进成像技术，形成了多维度、交叉融合的科研能力体系。"],
    ["Ph.D. training with Dr. Ling-Ling Chen at the Chinese Academy of Sciences, focused on nucleolar organization and RNA-mediated regulation of nuclear condensates.", `博士阶段师从中国科学院 <a href="https://scholar.google.com/citations?hl=en&user=0UNkhq4AAAAJ" target="_blank" rel="noopener noreferrer">陈玲玲研究员</a>，主要研究核仁组装机制及 RNA 介导的细胞核凝聚体调控规律。`],
    ["Currently a postdoctoral scientist in the laboratory of Dr. Michael K. Rosen at HHMI/UT Southwestern, investigating how mesoscale physical properties of biomolecular condensates encode biochemical function.", `目前于霍华德·休斯医学研究所 / 得克萨斯州大学西南医学中心 <a href="https://scholar.google.com/citations?user=62soGRgAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">Michael K. Rosen 院士</a>课题组担任博士后研究员，聚焦探究生物分子凝聚体的介观物理性质编码生化功能的核心机制。`],
    ["Appointments", "任职经历"],
    ["2021 - Present", "2021 - 至今"],
    ["Postdoctoral scientist", "博士后研究员"],
    ["Howard Hughes Medical Institute / Department of Biophysics, UT Southwestern Medical Center, Dallas, Texas, USA", "Howard Hughes Medical Institute / UT Southwestern Medical Center 生物物理系，美国得克萨斯州达拉斯"],
    ["Mentor: Dr. Michael K. Rosen", "导师：Michael K. Rosen 博士"],
    ["Education", "教育经历"],
    ["Ph.D., Biochemistry and Molecular Biology", "理学博士，生物化学与分子生物学专业"],
    ["Center for Excellence in Molecular Cell Science, Chinese Academy of Sciences, Shanghai, China", "中国科学院分子细胞科学卓越创新中心，中国上海"],
    ["Thesis title: The nucleolar ultrastructure and pre-rRNA biogenesis", "学位论文：核仁超微结构与核糖体 RNA 生成"],
    ["Thesis advisor: Dr. Ling-Ling Chen", "导师：陈玲玲博士"],
    ["B.S., Biotechnology, with Honors (Top 1%)", "理学学士，生物技术专业，荣誉毕业生（前 1%）"],
    ["School of Life Sciences, Sun Yat-sen University, Guangzhou, China", "中山大学生命科学学院，中国广州"],
    ["Thesis title: Functional analysis of sno-lncRNAs in the Prader–Willi syndrome deletion region", "学位论文：小胖威力综合征缺失区域中 sno-lncRNAs 的功能分析"],
    ["Thesis advisor: Dr. Ling-Ling Chen and Dr. Limin Zheng", "导师：陈玲玲博士、郑利民博士"],
    ["Selected Honors and Awards", "主要荣誉与奖励"],
    ["Ray Wu Prize", "吴瑞奖学金"],
    ["Forbes China 30 Under 30", "福布斯中国 30 Under 30"],
    ["CAS Pollyanna Chu Outstanding Doctoral Student Scholarship", "中国科学院朱李月华优秀博士生奖学金"],
    ["National Scholarship for Graduate Students (Top 0.2% in China)", "研究生国家奖学金"],
    ["Selected Participant, 68th Lindau Nobel Laureate Meeting", "第 68 届中德科学中心林岛项目入选代表"],
    ["Outstanding Student Award, Chinese Academy of Sciences (Top 1%)", "中国科学院优秀学生奖"],
    ["Outstanding Graduate, Sun Yat-sen University", "中山大学优秀毕业生"],
    ["Dr. Lau Wing Sang Outstanding Undergraduate Student Fellowship", "刘永生优秀本科生奖学金"],
    ["International Genetically Engineered Machine (iGEM) Competition — Gold Medal, with awards for Best New BioBrick Part, Best Model, and Best Wiki; Finalist and 2nd Runner-up", "国际基因工程机器大赛（iGEM）金奖，并获 Best New BioBrick Part、Best Model、Best Wiki；Finalist 与 2nd Runner-up"],
    ["National Scholarship for Undergraduate Students (Top 0.2% in China)", "本科生国家奖学金"],
    ["Selected Talks", "部分受邀与入选报告"],
    //["Short Talk (selected): Size-Dependent Functional Transitions in Actin Signaling Protein Condensates", "口头报告（入选）：Size-Dependent Functional Transitions in Actin Signaling Protein Condensates"],
    //["Keystone Symposia, Breckenridge, USA", "Keystone Symposia，美国 Breckenridge"],
    //["Poster Presentation (selected): A Simple, Efficient, and Low-Cost Surface Passivation Method for Phase Separation Studies via Self-Assembled Monolayer", "海报展示（入选）：用于相分离研究的的简单、高效、低成本 self-assembled monolayer 表面钝化方法"],
    //["Department of Biophysics Retreat, UT Southwestern Medical Center, Sherman, USA", "UT Southwestern Medical Center 生物物理系 Retreat，美国 Sherman"],
    //["Oral Presentation: Understanding How the Function of Biomolecular Condensates Scales with Size", "口头报告：理解生物分子凝聚体功能如何随尺寸变化"],
    //["Condensate Club, UT Southwestern Medical Center, Dallas, USA", "Condensate Club，UT //Southwestern Medical Center，美国 Dallas"],
    //["Oral Presentation (invited): Nucleolar Ultrastructure and Pre-rRNA Biogenesis", "口头报告（受邀）：核仁超微结构与 pre-rRNA biogenesis"],
    //["133rd Chinese Academy of Sciences First Author Forum, Shanghai, China", "第 133 期中国科学院第一作者论坛，中国上海"],
    //["Cytiva Cell Image Analysis Webinar, Shanghai, China", "Cytiva 细胞图像分析网络研讨会，中国上海"],
    //["Oral Presentation (selected; Excellent Report Award): Nucleolar Ultrastructure and Pre-rRNA Biogenesis", "口头报告（入选；优秀报告奖）：核仁超微结构与 pre-rRNA biogenesis"],
    //["13th Symposium on Gene Function and Epigenetic Regulation, Shenzhen, China", "第 13 届基因功能与表观遗传调控研讨会，中国深圳"],
    //["Oral Presentation (invited): Ultrastructure of Nucleolar Organization and Nascent Pre-rRNA Sorting in the Nucleolus", "口头报告（受邀）：核仁组织超微结构与核仁中新生 pre-rRNA sorting"],
    //["16th SIBCB Young Scholars Forum, Shanghai, China", "第 16 届 SIBCB 青年学者论坛，中国上海"],
    //["Poster Presentation (selected; Excellent Poster Award): Nascent Pre-rRNA Sorting via Phase Separation Drives the Assembly of Dense Fibrillar Components in the Human Nucleolus", "海报展示（入选；优秀海报奖）：phase separation 介导的新生 pre-rRNA sorting 驱动人类核仁 dense fibrillar components 的组装"],
    //["20th Takeda Science Foundation Symposium on Bioscience, Osaka, Japan", "第 20 届 Takeda Science Foundation Symposium on Bioscience，日本大阪"],
    //["Oral Presentation (invited): Shedding Light on Nucleolar Structure by Super-Resolution Microscopy", "口头报告（受邀）：用超分辨显微成像解析核仁结构"],
    //["1st Advanced Optical Microscopy Training Course of SIBET, CAS, Suzhou, China", "中国科//学院苏州生物医学工程技术研究所第一届先进光学显微成像培训班，中国苏州"],
    //["Poster Presentation (selected): The lncRNA SLERT Disrupts the DDX21 Ring Associated with Pol I Transcription", "海报展示（入选）：lncRNA SLERT 破坏与 Pol I transcription 相关的 DDX21 环状结构"],
    //["43rd Naito Conference, Sapporo, Japan", "第 43 届 Naito Conference，日本札幌"],

    ["Vibrio parahaemolyticus", "副溶血性弧菌"],
    ["PKMO FX (magenta), protein of interest (green), and DAPI (blue)", "PKMO FX（洋红），目标蛋白（绿色），DAPI（蓝色）"],
    //["light-sheet microscopy", "光片显微镜"],
    ["72 hpf zebrafish", "72 hpf 斑马鱼"],
    ["RNA (magenta), Nucleoli (green), Pol II (red), Nuclei (blue)", "RNA（洋红），Nucleoli（绿色），Pol II（红色），细胞核（蓝色）"],
    ["Actin and Nck", "Actin 与 Nck"],
    ["LifeAct-labeled actin (magenta)， Nck (green)", "LifeAct 标记的 actin（洋红），Nck（绿色）"],
    ["Nucleolar organization", "核仁组织"],
    ["FBL (green), RPA194 (red), Nuclei (blue)", "FBL（绿色），RPA194（红色），细胞核（蓝色）"],
    ["FC/DFC in the nucleolus", "核仁中的 FC/DFC"],
    ["FBL (green), RPA194 (magenta)", "FBL（绿色），RPA194（洋红）"],
    ["Actin cytoskeleton architecture", "Actin 细胞骨架"],
    ["Phalloidin-labeled actin (blue)", "Phalloidin 标记的 actin（蓝色）"],
    ["Paraspeckle spatial organization", "旁斑的空间组织"],
    ["NEAT1_5′/3′ (green), NEAT1_mid (magenta)", "NEAT1_5′/3′（绿色），NEAT1_mid（洋红）"],
    ["MALAT1 (white), DAPI (blue)", "MALAT1（白色），DAPI（蓝色）"],
    ["NEAT1 (white), DAPI (blue)", "NEAT1（白色），DAPI（蓝色）"],
    ["Actin cytoskeleton in U2OS", "U2OS 中的 actin "],
    ["LifeAct-labeled actin (yellow)", "LifeAct 标记的 actin（黄色）"],
    ["DDX21 ring structures", "DDX21 环状结构"],
    ["DDX21 (green), FLAG-tagged protein (red)", "DDX21（绿色），FLAG-tagged protein（红色）"],
    ["Nascent pre-rRNA", "新生 pre-rRNA"],
    ["Color encodes depth", "颜色编码深度"],

    ["Protocol library", "实验方案库"],
    ["Surface passivation for condensate imaging", "凝聚体成像的表面钝化"],
    ["A worked example protocol page", "一个完整示例实验方案页"],
    ["Imaging", "成像"],
    ["Surface chemistry", "表面化学"],
    ["Condensates", "凝聚体"],
    ["This entry demonstrates the detailed protocol layout: overview, workflow, troubleshooting, and a paper link at the end. It can serve as the first real method page on the site.", "这一条目展示详细实验方案的页面布局：概览、workflow、troubleshooting，以及末尾的论文链接。它可以作为网站上的第一个正式方法页。"],
    ["View protocol", "查看方案"],
    ["Related paper", "相关论文"],
    ["Nuclear body imaging and fixation", "Nuclear body 成像与 fixation"],
    ["Template-ready entry for future expansion", "便于未来扩展的模板条目"],
    ["Fixation", "Fixation"],
    ["Microscopy", "显微成像"],
    ["Nuclear bodies", "Nuclear bodies"],
    ["This row points to a reusable protocol detail template. You can duplicate that page and replace the placeholders with your own imaging notes, acquisition settings, and sample preparation details.", "这一行指向一个可复用的实验方案详情模板。之后可以复制该页面，并用你的成像记录、采集设置和样品制备细节替换占位内容。"],
    ["Open template", "打开模板"],
    ["Image analysis snippets and scripts", "图像分析片段与脚本"],
    ["A slot for macros, scripts, and analysis notes", "用于 macros、scripts 和分析记录的位置"],
    ["Quantification", "定量分析"],
    ["This can evolve into a protocol-plus-toolbox page for small utilities, practical analysis workflows, and reference settings that support your experiments.", "这一页可逐步扩展为 protocol-plus-toolbox，用于收纳支持实验的小工具、实用分析流程和参考设置。"],
    ["· Surface passivation for condensate imaging", "· 凝聚体成像的表面钝化"],
    ["Example protocol", "示例实验方案"],
    ["This example page shows how a full protocol entry can live on the site without a hero section. It emphasizes quick overview, readable steps, and a clean reference link at the end.", "这个示例页面展示了一个完整实验方案条目如何在没有 hero section 的情况下呈现。它强调快速概览、清晰步骤，以及末尾简洁的参考文献链接。"],
    ["Use case", "适用场景"],
    ["Prepare low-background surfaces for sensitive in vitro condensate imaging.", "为高灵敏度 in vitro condensate imaging 制备低背景表面。"],
    ["Format", "页面结构"],
    ["Overview, materials, workflow, troubleshooting, and linked reference paper.", "概览、材料、workflow、troubleshooting，以及链接到的参考论文。"],
    ["Overview", "概览"],
    ["The goal is to reduce nonspecific adsorption while preserving imaging quality and experimental reproducibility. This page is intentionally concise and can later be expanded with reagent concentrations, timing, and comparison notes.", "目标是在保持成像质量和实验可重复性的同时，降低 nonspecific adsorption。这个页面有意保持简洁，之后可以加入试剂浓度、时间安排和比较记录。"],
    ["Materials", "材料"],
    ["Cleaned imaging surface or chamber", "清洁后的成像表面或 chamber"],
    ["Passivation reagent system of choice", "所选 passivation reagent system"],
    ["Buffer appropriate for condensate assembly and imaging", "适用于 condensate assembly 和 imaging 的 buffer"],
    ["Control sample for background evaluation", "用于背景评估的对照样品"],
    ["Workflow", "Workflow"],
    ["Prepare and clean the imaging surface under the same conditions used for final data collection.", "按照最终数据采集所用条件准备并清洁成像表面。"],
    ["Apply passivation treatment and allow sufficient incubation for surface coverage.", "进行 passivation 处理，并给予足够孵育时间以形成表面覆盖。"],
    ["Wash gently with imaging buffer to remove unbound material without disturbing the coating.", "用 imaging buffer 轻柔清洗，去除未结合材料，同时避免扰动 coating。"],
    ["Test background adsorption with a simple control before moving to full condensate experiments.", "在开展完整凝聚体实验前，先用简单对照测试背景吸附。"],
    ["Record the exact surface preparation condition alongside each imaging dataset.", "为每组 imaging dataset 同步记录准确的表面制备条件。"],
    ["Troubleshooting notes", "Troubleshooting 记录"],
    ["If background remains high, compare preparation timing, reagent freshness, and wash stringency before changing the biological sample. It is often useful to document the surface condition photographically so that subtle preparation differences become easier to trace.", "如果背景仍然偏高，在更换生物样品之前，先比较制备时间、试剂新鲜度和清洗强度。用图像记录表面状态通常很有帮助，可以更容易追踪细微的制备差异。"],
    ["Reference article", "参考文献"],
    ["Yao RW, Rosen MK. Advanced surface passivation for high-sensitivity studies of biomolecular condensates.", "Yao RW, Rosen MK. Advanced surface passivation for high-sensitivity studies of biomolecular condensates."],
    ["Open article", "打开论文"],
    ["· Protocol detail template", "· 实验方案详情模板"],
    ["Reusable template", "可复用模板"],
    ["[Protocol title]", "[实验方案标题]"],
    ["[One short paragraph explaining what this protocol is for, when you use it, and why it matters for your experiments.]", "[用一小段话说明这个实验方案的用途、使用场景，以及它为什么对你的实验重要。]"],
    ["[What experiment or situation this protocol supports]", "[这个实验方案支持的实验或使用情境]"],
    ["[Overview / materials / workflow / troubleshooting / reference]", "[概览 / 材料 / workflow / troubleshooting / 参考文献]"],
    ["[Brief conceptual summary of the protocol and what outcome it should produce.]", "[简要概括该实验方案的原理，以及它应该产生什么结果。]"],
    ["[Material / reagent / instrument]", "[材料 / 试剂 / 仪器]"],
    ["[Step one]", "[步骤一]"],
    ["[Step two]", "[步骤二]"],
    ["[Step three]", "[步骤三]"],
    ["[Step four]", "[步骤四]"],
    ["[Short notes on common failure points, controls, and optimization logic.]", "[简短记录常见失败点、对照设置和优化逻辑。]"],
    ["[Full paper citation or DOI link associated with this protocol]", "[与该实验方案相关的完整论文引用或 DOI 链接]"],
    ["Insert article link here", "在此插入论文链接"],
    ["Subpage Title Here", "子页面标题"],
    ["One-sentence summary of this page. Keep this brief and aligned with the style used on the main Research page.", "用一句话概括本页内容。保持简洁，并与研究主页的风格一致。"],
    ["Background and motivation", "背景与动机"],
    ["Use this section to explain the biological question and context. This is a normal body paragraph style matching the rest of the site. You can insert inline citations like (Cell, 2019) and (Science, 2025).", `用这一节说明生物学问题和背景。这里采用与网站其他部分一致的正文段落样式。你可以插入行内引用，例如 <a class="inline-citation" href="https://doi.org/10.1016/j.cell.2019.08.014" target="_blank" rel="noopener noreferrer">(Cell, 2019)</a> 和 <a class="inline-citation" href="https://pubmed.ncbi.nlm.nih.gov/41343645/" target="_blank" rel="noopener noreferrer">(Science, 2025)</a>。`],
    ["Working model", "工作模型"],
    ["Describe your hypothesis, key assumptions, and what measurable outcomes would support or refute the model.", "描述你的假设、关键前提，以及哪些可测量结果能够支持或反驳该模型。"],
    ["Figure placeholder. Replace with your own image and caption text.", "图片占位。请替换为你自己的图片和图注。"],
    ["Approach and ongoing work", "研究方法与进行中的工作"],
    ["Summarize your experimental strategy, analysis workflow, and current progress. You can add multiple paragraphs as needed, and keep references inline as clickable citations, for example (Selected Publications).", `概述你的实验策略、analysis workflow 和当前进展。可按需要添加多个段落，并保留行内可点击引用，例如 <a class="inline-citation" href="publications.html">(Selected Publications)</a>。`],
  ]);

  const attributeTranslations = new Map([
    ["Runwen Yao home", "姚润文首页"],
    ["Research themes", "研究主题"],
    ["Open mesoscale function research page", "打开介观尺度功能研究页面"],
    ["Open RNA organization research page", "打开凝聚体物理原理研究页面"],
    ["Open imaging and reconstitution research page", "打开成像与 reconstitution 研究页面"],
    ["Open surface passivation protocol", "打开表面钝化实验方案"],
    ["Open protocol template page", "打开实验方案模板页"],
    ["Portrait of Runwen Yao", "姚润文肖像"],
    ["Placeholder figure for mesoscale condensate organization", "介观尺度凝聚体组织示意图"],
    ["Figure thinking placeholder gallery image", "图像集图片"],
    ["Notebook placeholder gallery image", "图像集图片"],
    ["Internal organization placeholder gallery image", "内部组织图像"],
    ["Wide placeholder gallery image", "宽幅图像"],
    ["Soft placeholder gallery image", "图像集图片"],
    ["Gallery sections", "图集分区"],
    ["Selected mobile photographs", "精选手机摄影"],
    ["Mobile photograph titled Light and distance", "题为“光与距离”的手机摄影"],
    ["Mobile photograph titled Quiet street", "题为“安静的街道”的手机摄影"],
    ["Mobile photograph titled Open sky", "题为“开阔天空”的手机摄影"],
    ["Mobile photograph titled After rain", "题为“雨后”的手机摄影"],
    ["Mobile photograph titled Passing through", "题为“途经”的手机摄影"],
    ["Mobile photograph titled Desert light", "题为“沙漠之光”的手机摄影"],
    ["Mobile photograph titled City texture", "题为“城市纹理”的手机摄影"],
    ["Mobile photograph titled A small window", "题为“一扇小窗”的手机摄影"],
    ["Mobile photograph titled Morning line", "题为“清晨线条”的手机摄影"],
    ["Mobile photograph titled Still horizon", "题为“静止的地平线”的手机摄影"],
    ["Mobile photograph titled Soft geometry", "题为“柔和几何”的手机摄影"],
    ["Mobile photograph titled Warm surface", "题为“温暖表面”的手机摄影"],
    ["Mobile photograph titled Roadside color", "题为“路边色彩”的手机摄影"],
    ["Mobile photograph titled Late afternoon", "题为“午后晚些时候”的手机摄影"],
    ["Mobile photograph titled Between places", "题为“两地之间”的手机摄影"],
    ["Mobile photograph titled Field note", "题为“途中札记”的手机摄影"],
    ["Mobile photograph titled Open shade", "题为“开阔阴影”的手机摄影"],
    ["Mobile photograph titled Night reflection", "题为“夜色倒影”的手机摄影"],
    ["Mobile photograph titled Islands in the Sky", "题为“云端岛屿”的手机摄影"],
    ["Mobile photograph titled Quiet Shore", "题为“静岸”的手机摄影"],
    ["Mobile photograph titled Open Water", "题为“开阔水面”的手机摄影"],
    ["Mobile photograph titled Mountain Light", "题为“山间光线”的手机摄影"],
    ["Mobile photograph titled La Jolla Blue", "题为“拉霍亚蓝”的手机摄影"],
    ["Mobile photograph titled Summer Interior", "题为“夏日室内”的手机摄影"],
    ["Mobile photograph titled Evening in Harlem", "题为“哈莱姆傍晚”的手机摄影"],
    ["Mobile photograph titled City Geometry", "题为“城市几何”的手机摄影"],
    ["Mobile photograph titled Morning Line", "题为“清晨线条”的手机摄影"],
    ["Mobile photograph titled Still Horizon", "题为“静止的地平线”的手机摄影"],
    ["Mobile photograph titled Soft Geometry", "题为“柔和几何”的手机摄影"],
    ["Mobile photograph titled Warm Surface", "题为“温暖表面”的手机摄影"],
    ["Mobile photograph titled Roadside Color", "题为“路边色彩”的手机摄影"],
    ["Mobile photograph titled Late Afternoon", "题为“午后晚些时候”的手机摄影"],
    ["Mobile photograph titled Between Places", "题为“两地之间”的手机摄影"],
    ["Mobile photograph titled Field Note", "题为“途中札记”的手机摄影"],
    ["Mobile photograph titled Desert Frame", "题为“沙漠边框”的手机摄影"],
    ["Mobile photograph titled Night Reflection", "题为“夜色倒影”的手机摄影"],
    ["Figure description for this section", "本节图片说明"],
  ]);

  const candidateSelector = [
    ".brand-title",
    ".brand-sub",
    ".nav a",
    ".nav span",
    ".footer-identity",
    ".footer a",
    ".hero-name-line",
    ".hero-tagline-line",
    ".eyebrow",
    ".section-title",
    ".top-page-title",
    ".section-copy p",
    ".page-lead",
    ".vision-copy p",
    ".about-copy p",
    ".btn",
    ".cv-role",
    ".cv-section h2",
    ".cv-period",
    ".cv-item-title",
    ".cv-item-sub",
    ".research-card-label",
    ".research-front h3",
    ".research-front p",
    ".research-back h3",
    ".research-back p",
    ".research-link",
    ".research-work-copy p",
    ".detail-title",
    ".detail-card h2",
    ".detail-card p",
    ".detail-section h2",
    ".detail-section p",
    ".detail-section li",
    ".reference-card h3",
    ".reference-card p",
    ".protocol-visual-title",
    ".protocol-content h3",
    ".protocol-content p",
    ".tag",
    ".gallery-back-link",
    ".gallery-choice-label",
    ".gallery-choice-title",
    ".gallery-choice-subtitle",
    ".gallery-choice-copy",
    ".gallery-choice-action",
    ".gallery-piece h3",
    ".gallery-piece p",
    ".photo-card-title",
    ".photo-card-meta",
    ".subpage-figure figcaption",
    ".breadcrumbs",
    "[data-translation-key]",
  ].join(",");

  const originalHtml = new WeakMap();
  const originalAttributes = new WeakMap();
  const originalTitle = document.title;
  let currentLanguage = EN;

  const normalize = (value) => String(value || "").replace(/\s+/g, " ").trim();

  const htmlToText = (html) => {
    const template = document.createElement("template");
    template.innerHTML = html;
    return normalize(template.content.textContent);
  };

  const getStoredLanguage = () => {
    try {
      return localStorage.getItem(STORAGE_KEY) === ZH ? ZH : EN;
    } catch (error) {
      return EN;
    }
  };

  const storeLanguage = (language) => {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch (error) {
      // Storage can be unavailable in some privacy modes; the UI still works.
    }
  };

  const ensureLanguageToggle = () => {
    document.querySelectorAll(".site-header .nav").forEach((nav) => {
      if (nav.querySelector("[data-language-toggle]")) {
        return;
      }

      const toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "language-toggle";
      toggle.setAttribute("data-language-toggle", "");
      nav.appendChild(toggle);
    });
  };

  const applyElementTranslations = (language) => {
    document.querySelectorAll(candidateSelector).forEach((element) => {
      if (element.matches("[data-language-toggle]")) {
        return;
      }

      if (!originalHtml.has(element)) {
        originalHtml.set(element, element.innerHTML);
      }

      const sourceHtml = originalHtml.get(element);
      const key = element.getAttribute("data-translation-key") || htmlToText(sourceHtml);

      if (language === ZH && translations.has(key)) {
        element.innerHTML = translations.get(key);
      } else {
        element.innerHTML = sourceHtml;
      }
    });
  };

  const getOriginalAttribute = (element, attribute) => {
    let stored = originalAttributes.get(element);
    if (!stored) {
      stored = {};
      originalAttributes.set(element, stored);
    }

    if (!(attribute in stored)) {
      stored[attribute] = element.getAttribute(attribute);
    }

    return stored[attribute];
  };

  const applyAttributeTranslations = (language) => {
    document.querySelectorAll("[aria-label], [alt], [title]").forEach((element) => {
      if (element.matches("[data-language-toggle]")) {
        return;
      }

      ["aria-label", "alt", "title"].forEach((attribute) => {
        if (!element.hasAttribute(attribute)) {
          return;
        }

        const original = getOriginalAttribute(element, attribute);
        const key = normalize(original);

        if (language === ZH && attributeTranslations.has(key)) {
          element.setAttribute(attribute, attributeTranslations.get(key));
        } else if (original === null) {
          element.removeAttribute(attribute);
        } else {
          element.setAttribute(attribute, original);
        }
      });
    });
  };

  const formatBrandSubtitles = () => {
    document.querySelectorAll(".brand-sub").forEach((element) => {
      const parts = htmlToText(element.innerHTML)
        .split("·")
        .map((part) => part.trim())
        .filter(Boolean);

      if (parts.length !== 3) {
        return;
      }

      element.innerHTML = parts.map((part, index) => {
        const separator = index < parts.length - 1
          ? '<span class="brand-sub-separator"> · </span>'
          : "";
        return `<span class="brand-sub-keyword">${part}</span>${separator}`;
      }).join("");
    });
  };

  const updateToggleState = (language) => {
    document.querySelectorAll("[data-language-toggle]").forEach((toggle) => {
      const isChinese = language === ZH;
      toggle.textContent = isChinese ? "EN" : "中文";
      toggle.setAttribute("aria-pressed", isChinese ? "true" : "false");
      toggle.setAttribute("aria-label", isChinese ? "Switch to English" : "切换到中文");
      toggle.setAttribute("title", isChinese ? "Switch to English" : "切换到中文");
    });
  };

  const applyLanguage = (language, shouldPersist = false) => {
    currentLanguage = language === ZH ? ZH : EN;
    document.documentElement.lang = currentLanguage === ZH ? "zh-CN" : "en";
    document.title = currentLanguage === ZH && translations.has(originalTitle)
      ? translations.get(originalTitle)
      : originalTitle;

    applyElementTranslations(currentLanguage);
    applyAttributeTranslations(currentLanguage);
    formatBrandSubtitles();
    updateToggleState(currentLanguage);

    if (shouldPersist) {
      storeLanguage(currentLanguage);
    }
  };

  ensureLanguageToggle();
  applyLanguage(getStoredLanguage());

  document.addEventListener("click", (event) => {
    const toggle = event.target.closest("[data-language-toggle]");
    if (!toggle) {
      return;
    }

    applyLanguage(currentLanguage === ZH ? EN : ZH, true);
  });
})();
