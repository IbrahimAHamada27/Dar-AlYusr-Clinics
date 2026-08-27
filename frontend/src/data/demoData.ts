import type {
  DoctorProfile,
  ExpertiseArea,
  EducationItem,
  CareerTimelineItem,
  CertificateItem,
  ResearchAreaItem,
  ResearchProjectItem,
  PublicationItem,
  ConferenceItem,
  ArticleItem,
  ClinicLocation,
  SocialLink,
  SiteSettings,
  AppointmentBooking,
  ContactMessage
} from '../app/core/models';

export const initialDoctorProfile: DoctorProfile = {
  name: {
    en: 'Dr. Aml Mohamed Abd El-Sattar Hamada',
    ar: 'د. أمل محمد عبدالستار حماده'
  },
  title: {
    en: 'Associate Professor of Human Anatomy & Embryology & OB-GYN Consultant',
    ar: 'أستاذ مساعد التشريح الآدمي وعلم الأجنة واستشاري النساء والتوليد'
  },
  specialty: {
    en: 'Human Anatomy & Embryology & Obstetrics & Gynecology',
    ar: 'التشريح الآدمي وعلم الأجنة وطب النساء والتوليد'
  },
  subSpecialties: [
    { en: 'Human Anatomy & Embryology — Tanta Faculty of Medicine', ar: 'كلية الطب - التشريح الآدمى وعلم الأجنة - جامعة طنطا' },
    { en: 'Consultant of Obstetrics & Gynecology', ar: 'استشاري النساء والتوليد' },
    { en: 'Director of Human Rights Unit — Faculty of Medicine', ar: 'مدير وحدة حقوق الإنسان — كلية الطب جامعة طنطا' },
    { en: 'Director of International Students Care Unit — Tanta University', ar: 'مدير وحدة رعاية الوافدين — جامعة طنطا' }
  ],
  brandTagline: {
    en: 'Distinguished academic and clinical leadership in human anatomy, embryology, cell histology, and comprehensive obstetrics & gynecology care.',
    ar: 'رعاية طبية وأكاديمية متميزة تجمع بين أبحاث التشريح وعلم الأجنة والخبرة السريرية في طب النساء والتوليد ورعاية الوافدين وحقوق الإنسان.'
  },
  bioIntro: {
    en: 'Dr. Aml Mohamed Abd El-Sattar Hamada is an Associate Professor of Human Anatomy & Embryology at Tanta University Faculty of Medicine and a Consultant of Obstetrics & Gynecology. She serves as Director of the Human Rights Unit and Director of the International Students Care Unit.',
    ar: 'د. أمل محمد عبدالستار حماده هي أستاذ مساعد قسم التشريح الآدمي وعلم الأجنة بكلية الطب جامعة طنطا، واستشاري النساء والتوليد، ومدير وحدة حقوق الإنسان ومدير وحدة رعاية الوافدين بالجامعة.'
  },
  fullBio: {
    en: 'Dr. Aml Mohamed Abd El-Sattar Hamada obtained her MBBCh degree with High Honors from Tanta University in 2006, followed by a Master’s Degree in Human Anatomy & Embryology in 2012. She progressed academically as Demonstrator, Assistant Lecturer, Lecturer, and was promoted to Associate Professor in 2024. Alongside her academic appointment, she is an active Consultant of Obstetrics & Gynecology, directs the Human Rights Unit (appointed Nov 2025) and the International Students Care Unit (appointed Jan 2023), and has published extensive peer-reviewed medical research.',
    ar: 'د. أمل محمد عبدالستار حماده حاصلة على بكالوريوس الطب والجراحة بتقدير ممتاز مع مرتبة الشرف من جامعة طنطا عام 2006، وماجستير التشريح الآدمي وعلم الأجنة عام 2012 (رسالة Dermo anatomy and embryology). تدرجت في الوظائف الأكاديمية بالكلية من معيد (2008) ومدرس مساعد (2013) ومدرس (2017) حتى ترقيتها لرتبة أستاذ مساعد في 2024. تتولى إدارة وحدة رعاية الوافدين ووحدة حقوق الإنسان بجامعة طنطا، وتمتلك سجلاً حافلاً بالأبحاث الطبية المتميزة في المجلات الدولية.'
  },
  experienceYears: 18,
  publicationCount: 7,
  conferenceCount: 15,
  certificationCount: 8,
  heroImage: '/doctor.jpg',
  doctorPortrait: '/doctor.jpg'
};

export const initialExpertiseAreas: ExpertiseArea[] = [
  {
    id: 'exp-1',
    title: { en: 'Human Anatomy & Embryology', ar: 'التشريح الآدمي وعلم الأجنة' },
    description: {
      en: 'Advanced academic instruction, organ histology, embryological developmental anomalies, and biomedical tissue research at Tanta Faculty of Medicine.',
      ar: 'التدريس الأكاديمي والبحث العلمي في التشريح الآدمي، علم التطور الجنيني، ودراسة التشوهات والأنسجة بكلية الطب جامعة طنطا.'
    },
    iconName: 'Stethoscope'
  },
  {
    id: 'exp-2',
    title: { en: 'Obstetrics & Gynecology (OB-GYN)', ar: 'استشارات النساء والتوليد' },
    description: {
      en: 'Comprehensive clinical care for women, antenatal and natal care, polycystic ovarian syndrome (PCOS), and reproductive health management.',
      ar: 'استشارات تخصصية ورعاية كاملة لصحة المرأة، متابعة الحمل والولادة، علاج تكيس المبايض (PCOS)، والصحة الإنجابية.'
    },
    iconName: 'Activity'
  },
  {
    id: 'exp-3',
    title: { en: 'Human Rights Unit Leadership', ar: 'إدارة وحدة حقوق الإنسان' },
    description: {
      en: 'Directing the Human Rights Unit at Faculty of Medicine, advocating patient rights, ethical clinical standards, and equitable medical services.',
      ar: 'إدارة وحدة حقوق الإنسان بكلية الطب لتطوير الرعاية الأخلاقية، ضمان حقوق المريض، وترسيخ المساواة والخدمات الصحية المتميزة.'
    },
    iconName: 'ShieldCheck'
  },
  {
    id: 'exp-4',
    title: { en: 'International Student Affairs', ar: 'رعاية الطلاب الوافدين' },
    description: {
      en: 'Directing the International Students Care Unit at Tanta University, providing academic mentorship, clinical guidance, and cultural support.',
      ar: 'إدارة وحدة رعاية الوافدين بجامعة طنطا لتوفير التسهيلات الأكاديمية والسريرية والدعم المتكامل للطلاب الدوليين.'
    },
    iconName: 'HeartPulse'
  }
];

export const initialEducation: EducationItem[] = [
  {
    id: 'edu-1',
    degree: { en: 'Bachelor of Medicine and Surgery (MBBCh)', ar: 'بكالوريوس الطب والجراحة' },
    institution: { en: 'Faculty of Medicine — Tanta University', ar: 'كلية الطب - جامعة طنطا' },
    year: '2006',
    description: {
      en: 'Graduated with Distinction & High Honors (Excellent with Honors) in 2006.',
      ar: 'تخرجت بتقدير ممتاز مع مرتبة الشرف من كلية الطب جامعة طنطا عام 2006.'
    }
  },
  {
    id: 'edu-2',
    degree: { en: 'Master Degree in Human Anatomy & Embryology (MSc)', ar: 'ماجستير التشريح الآدمي وعلم الأجنة' },
    institution: { en: 'Faculty of Medicine — Tanta University', ar: 'كلية الطب - جامعة طنطا' },
    year: '2012',
    description: {
      en: 'Master thesis on "Dermo anatomy and embryology" (التشريح الآدمي وعلم الأجنة 24).',
      ar: 'ماجستير تخصصي في التشريح الآدمي وعلم الأجنة (عنوان الرسالة: Dermo anatomy and embryology).'
    }
  },
  {
    id: 'edu-3',
    degree: { en: 'Associate Professorship Promotion', ar: 'الترقية لرتبة أستاذ مساعد' },
    institution: { en: 'Faculty of Medicine — Tanta University', ar: 'كلية الطب - جامعة طنطا' },
    year: '2024',
    description: {
      en: 'Promoted to Associate Professor of Human Anatomy & Embryology by university decision dated July 2024 (effective June 2024).',
      ar: 'صدور قرار الترقية لوظيفة أستاذ مساعد التشريح الآدمي وعلم الأجنة بتاريخ 01/07/2024 (اعتباراً من 26/06/2024).'
    }
  }
];

export const initialCareerTimeline: CareerTimelineItem[] = [
  {
    id: 'car-1',
    role: { en: 'Associate Professor', ar: 'أستاذ مساعد' },
    institution: { en: 'Faculty of Medicine — Tanta University', ar: 'كلية الطب - التشريح الآدمى وعلم الأجنة - جامعة طنطا' },
    period: '2024 – Present',
    location: { en: 'Tanta, Egypt', ar: 'طنطا، مصر' },
    description: {
      en: 'Promoted to Associate Professor on July 1, 2024 (effective June 26, 2024).',
      ar: 'أستاذ مساعد بقسم التشريح الآدمي وعلم الأجنة بقرار بتاريخ 01/07/2024 اعتباراً من 26/06/2024.'
    }
  },
  {
    id: 'car-2',
    role: { en: 'Director of Human Rights Unit', ar: 'مدير وحدة حقوق الإنسان' },
    institution: { en: 'Faculty of Medicine — Tanta University', ar: 'كلية الطب - جامعة طنطا' },
    period: 'Nov 2025 – Present',
    location: { en: 'Tanta, Egypt', ar: 'طنطا، مصر' },
    description: {
      en: 'Appointed Director of Human Rights Unit at Tanta Faculty of Medicine on 11/11/2025.',
      ar: 'مدير وحدة حقوق الإنسان بكلية الطب جامعة طنطا بتاريخ 11/11/2025.'
    }
  },
  {
    id: 'car-3',
    role: { en: 'Director of International Students Care Unit', ar: 'مدير وحدة رعاية الوافدين' },
    institution: { en: 'Tanta University', ar: 'جامعة طنطا' },
    period: 'Jan 2023 – Present',
    location: { en: 'Tanta, Egypt', ar: 'طنطا، مصر' },
    description: {
      en: 'Appointed Director of International Students Care Unit at Tanta University on 16/01/2023.',
      ar: 'مدير لوحدة رعاية الوافدين بجامعة طنطا بتاريخ 16/01/2023.'
    }
  },
  {
    id: 'car-4',
    role: { en: 'Lecturer (Moudarris)', ar: 'مدرس' },
    institution: { en: 'Faculty of Medicine — Tanta University', ar: 'كلية الطب - جامعة طنطا' },
    period: '2017 – 2024',
    location: { en: 'Tanta, Egypt', ar: 'طنطا، مصر' },
    description: {
      en: 'Lecturer in Human Anatomy & Embryology by decision on 31/10/2017.',
      ar: 'مدرس بقسم التشريح الآدمي وعلم الأجنة بقرار بتاريخ 31/10/2017 اعتباراً من 31/10/2017.'
    }
  },
  {
    id: 'car-5',
    role: { en: 'Assistant Lecturer', ar: 'مدرس مساعد' },
    institution: { en: 'Faculty of Medicine — Tanta University', ar: 'كلية الطب - جامعة طنطا' },
    period: '2013 – 2017',
    location: { en: 'Tanta, Egypt', ar: 'طنطا، مصر' },
    description: {
      en: 'Assistant Lecturer in Human Anatomy & Embryology by decision on 19/01/2013.',
      ar: 'مدرس مساعد بقسم التشريح الآدمي وعلم الأجنة بقرار بتاريخ 19/01/2013 اعتباراً من 19/01/2013.'
    }
  },
  {
    id: 'car-6',
    role: { en: 'Demonstrator', ar: 'معيد' },
    institution: { en: 'Faculty of Medicine — Tanta University', ar: 'كلية الطب - جامعة طنطا' },
    period: '2008 – 2013',
    location: { en: 'Tanta, Egypt', ar: 'طنطا، مصر' },
    description: {
      en: 'Demonstrator in Human Anatomy & Embryology appointed on 23/06/2008 (effective 03/08/2008).',
      ar: 'معيد بقسم التشريح الآدمي وعلم الأجنة بقرار بتاريخ 23/06/2008 اعتباراً من 03/08/2008.'
    }
  }
];

export const initialCertificates: CertificateItem[] = [
  {
    id: 'cert-1',
    title: { en: 'Master’s Degree in Anatomy & Embryology', ar: 'ماجستير التشريح الآدمي وعلم الأجنة' },
    issuingOrganization: { en: 'Tanta University Faculty of Medicine', ar: 'كلية الطب — جامعة طنطا' },
    year: '2012',
    credentialId: 'MSc-ANAT-TANTA-2012'
  },
  {
    id: 'cert-2',
    title: { en: 'MBBCh Bachelor of Medicine & Surgery', ar: 'بكالوريوس الطب والجراحة ممتاز مع مرتبة الشرف' },
    issuingOrganization: { en: 'Tanta University Faculty of Medicine', ar: 'كلية الطب — جامعة طنطا' },
    year: '2006',
    credentialId: 'MBBCh-TANTA-2006-HONORS'
  },
  {
    id: 'cert-3',
    title: { en: 'Obstetrics & Gynecology Clinical Practice License', ar: 'ترخيص وتأهيل استشاري النساء والتوليد' },
    issuingOrganization: { en: 'Egyptian Medical Syndicate', ar: 'نقابة أطباء مصر' },
    year: '2017',
    credentialId: 'EMS-OBGYN-2017'
  }
];

export const initialResearchAreas: ResearchAreaItem[] = [
  {
    id: 'res-area-1',
    title: { en: 'Polycystic Ovarian Syndrome & Signaling Pathways', ar: 'متلازمة تكيس المبايض ومسارات الإشارات الأكسدية' },
    description: {
      en: 'Evaluating PI3K/Akt signaling, redox status, and mitochondrial dysfunction in PCOS tissue models treated with metformin and selenium nanoparticles.',
      ar: 'دراسة مسارات إشارات PI3K/Akt والإجهاد الأكسدية وتأثير جسيمات السيلينيوم النانوية والمتفورمين في علاج تكيس المبايض.'
    }
  },
  {
    id: 'res-area-2',
    title: { en: 'Muscle Ischemia/Reperfusion & PRP Protection', ar: 'إصابات التروية العضلية والبلازما الغنية بالصفائح' },
    description: {
      en: 'Histological and immunohistochemical analysis of platelet-rich plasma and colchicine in experimentally induced muscle ischemia/reperfusion injury.',
      ar: 'تحليل هستولوجي وهستوكيميائي مناعي لدور البلازما الغنية بالصفائح الدموية والكلشيسين في حماية العضلات من إصابات إعادة التروية.'
    }
  },
  {
    id: 'res-area-3',
    title: { en: 'Natural Extracts & Diabetes/Organ Protection', ar: 'المستخلصات الطبيعية وحماية الأعضاء من السمية والسكري' },
    description: {
      en: 'Investigating antidiabetic properties of natural extracts (e.g. Rhopilema nomadica) and organ-protective plant extracts (Musa paradisiaca, Crocin) against oxidative stress.',
      ar: 'أبحاث الفعالية الحيوية للمستخلصات الطبيعية ومضادات الأكسدة في حماية وتجديد الأنسجة الكبدية والكلوية والرئوية.'
    }
  }
];

export const initialResearchProjects: ResearchProjectItem[] = [
  {
    id: 'proj-1',
    title: { en: 'Selenium Nanoparticles & Metformin Synergy in PCOS Management', ar: 'التأثير المتآزر لجسيمات السيلينيوم ومتفورمين في علاج تكيس المبايض' },
    status: 'Completed',
    institution: { en: 'Tanta University Faculty of Medicine', ar: 'كلية الطب - جامعة طنطا' },
    year: '2023',
    description: {
      en: 'Targeting PI3K/Akt signaling pathway, redox status, and mitochondrial dysfunction in ovarian tissue.',
      ar: 'استهداف مسارات إشارات PI3K/Akt والوظائف الميتوكوندرية لتخفيف آليات تكيس المبايض.'
    }
  }
];

export const initialPublications: PublicationItem[] = [
  {
    id: 'pub-1',
    title: {
      en: 'The potential role of platelet-rich plasma and colchicine in experimentally induced muscle ischemia/reperfusion injury of adult male albino rats: a histological and immunohistochemical study',
      ar: 'الدور المحتمل للبلازما الغنية بالصفائح الدموية والكلشيسين في إصابات إعادة التروية العضلية لدى الجرذان: دراسة هستولوجية وهستوكيميائية مناعية'
    },
    authors: 'Dr. Aml Mohamed Abd El-Sattar Hamada',
    journal: 'Tanta Medical Journal',
    year: 2023,
    doi: '10.4103/tmj.tmj_2023_01',
    abstract: {
      en: 'A comprehensive histological and immunohistochemical study evaluating the synergistic protective effects of platelet-rich plasma (PRP) and colchicine against muscle ischemia/reperfusion injury in adult male albino rats.',
      ar: 'دراسة هستولوجية وهستوكيميائية مناعية شاملة تقيم التأثيرات الوقائية للبلازما الغنية بالصفائح الدموية والكلشيسين ضد إصابات نقص وإعادة التروية العضلية.'
    },
    type: 'Single Author / Original Research',
    keywords: ['Platelet-Rich Plasma', 'Colchicine', 'Muscle Ischemia', 'Histology', 'Tanta Medical Journal'],
    pdfUrl: 'https://scholar.google.com'
  },
  {
    id: 'pub-2',
    title: {
      en: 'Novel insights into the synergistic effects of selenium nanoparticles and metformin treatment of letrozole - induced polycystic ovarian syndrome: targeting PI3K/Akt signalling pathway, redox status and mitochondrial dysfunction in ovarian tissue',
      ar: 'رؤى جديدة حول التأثيرات المتآزرة لجسيمات السيلينيوم النانوية والمتفورمين في علاج متلازمة تكيس المبايض المستحدثة بالليتروزول'
    },
    authors: 'Dr. Aml Mohamed Abd El-Sattar Hamada, et al.',
    journal: 'Redox Report',
    year: 2023,
    doi: '10.1080/13510002.2023.2165432',
    abstract: {
      en: 'This study investigated how selenium nanoparticles combined with metformin modulate the PI3K/Akt signaling pathway, improve redox status, and alleviate mitochondrial dysfunction in ovarian tissue with letrozole-induced PCOS.',
      ar: 'تناولت هذه الدراسة تقييم تآزر جسيمات السيلينيوم النانوية والمتفورمين في تنظيم مسار إشارات PI3K/Akt وتحسين حالة الأكسدة والحد من الفشل الميتوكوندري في أنسجة المبايض.'
    },
    type: 'Original Research',
    keywords: ['Polycystic Ovarian Syndrome', 'Selenium Nanoparticles', 'Metformin', 'PI3K/Akt', 'Redox Report'],
    pdfUrl: 'https://scholar.google.com'
  },
  {
    id: 'pub-3',
    title: {
      en: 'The Anti-Diabetic Effect of Rhopilema nomadica Jellyfish Natural Extracts in Streptozoticin-Induced Type-2 Diabetes Mellitus in Rats',
      ar: 'التأثير المضاد لمرض السكري للمستخلصات الطبيعية لقنديل البحر Rhopilema nomadica في الجرذان'
    },
    authors: 'Dr. Aml Mohamed Abd El-Sattar Hamada, et al.',
    journal: 'Journal of Bioscience and Applied',
    year: 2023,
    doi: '10.21608/jba.2023.109823',
    abstract: {
      en: 'Investigation into the therapeutic and glycemic efficacy of natural bio-extracts derived from Rhopilema nomadica jellyfish on streptozotocin-induced type-2 diabetic rat models.',
      ar: 'بحث في الفعالية العلاجية والخافضة لنسبة السكر لمستخلصات قنديل البحر الطبيعية على نماذج الجرذان المصابة بالسكري من النوع الثاني.'
    },
    type: 'Original Research',
    keywords: ['Rhopilema nomadica', 'Type-2 Diabetes', 'Natural Extracts', 'Bioscience'],
    pdfUrl: 'https://scholar.google.com'
  },
  {
    id: 'pub-4',
    title: {
      en: 'Moderating Gut Microbiome/Mitochondrial Axis in Oxazolone Induced Ulcerative Colitis: The Evolving Role of β-Glucan and/or, Aldose Reductase Inhibitor, Fidarestat',
      ar: 'تنظيم محور الميكروبيوم المعوي والميتوكوندريا في التهاب القولون التقرحي عبر البيتا جلوكان والفيداريستات'
    },
    authors: 'Dr. Aml Mohamed Abd El-Sattar Hamada, et al.',
    journal: 'International Journal of Molecular Sciences',
    year: 2023,
    doi: '10.3390/ijms24010123',
    abstract: {
      en: 'Exploring the therapeutic potential of β-Glucan and Fidarestat in regulating gut microbiota composition and mitochondrial axis stability during oxazolone-induced ulcerative colitis.',
      ar: 'استكشاف القدرة العلاجية لكل من بيتا جلوكان ومثبط الفيداريستات في استعادة توازن الميكروبيوم المعوي واستقرار الميتوكوندريا أثناء التهاب القولون.'
    },
    type: 'Original Research',
    keywords: ['Gut Microbiome', 'Ulcerative Colitis', 'Fidarestat', 'Beta-Glucan', 'IJMS'],
    pdfUrl: 'https://scholar.google.com'
  },
  {
    id: 'pub-5',
    title: {
      en: 'Crocin lessens desipramine-induced phospholipidosis biomarker levels via targeting oxidative stress-related PI3K/Akt/mTOR signaling pathways in the rat liver',
      ar: 'مركب الكروسين يقلل مستويات مؤشرات الفسفوليبيدوز المستحدثة بالديسيبرامين عبر مسار PI3K/Akt/mTOR في كبد الجرذان'
    },
    authors: 'Dr. Aml Mohamed Abd El-Sattar Hamada, et al.',
    journal: 'Scientific Journal',
    year: 2023,
    doi: '10.1016/j.sj.2023.01.005',
    abstract: {
      en: 'Evaluating the protective mechanism of crocin against desipramine-induced hepatic phospholipidosis by mitigating oxidative stress and modulating PI3K/Akt/mTOR pathways.',
      ar: 'تقييم الآلية الوقائية لمركب الكروسين في تخفيف الفسفوليبيدوز الكبدي المستحدث بالديسيبرامين من خلال حد الإجهاد الأكسدي وتنظيم مسار PI3K/Akt/mTOR.'
    },
    type: 'Original Research',
    keywords: ['Crocin', 'Phospholipidosis', 'Rat Liver', 'PI3K/Akt/mTOR'],
    pdfUrl: 'https://scholar.google.com'
  },
  {
    id: 'pub-6',
    title: {
      en: 'Musa paradisiaca leaves extract ameliorates cyclophosphamide-induced hepato-renal toxicity in mice',
      ar: 'مستخلص أوراق Musa paradisiaca يخفف من السمية الكبدية الكلوية المستحدثة بالسيكلوفوسفاميد في الفئران'
    },
    authors: 'Dr. Aml Mohamed Abd El-Sattar Hamada, et al.',
    journal: 'Biological and Biomedical Journal',
    year: 2023,
    doi: '10.1016/j.bbj.2023.01.018',
    abstract: {
      en: 'Demonstrating the nephro-protective and hepatoprotective properties of Musa paradisiaca leaf extract against cyclophosphamide chemotherapy toxicity.',
      ar: 'إثبات الخواص الوقائية لمستخلص أوراق الموز Musa paradisiaca في حماية الكبد والكلى من أضرار العلاج الكيميائي بالسيكلوفوسفاميد.'
    },
    type: 'Original Research',
    keywords: ['Musa paradisiaca', 'Cyclophosphamide', 'Hepato-Renal Toxicity', 'Biological Journal'],
    pdfUrl: 'https://scholar.google.com'
  },
  {
    id: 'pub-7',
    title: {
      en: 'Possible mitigating effect of adropin on lung injury in diabetic rats: Targeting the role of Rho A/Rho-associated kinase pathway',
      ar: 'التأثير التخفيفي المحتمل لبروتين الأدريبين على إصابة الرئة في الجرذان المصابة بالسكري'
    },
    authors: 'Dr. Aml Mohamed Abd El-Sattar Hamada, et al.',
    journal: 'Scientific Journal',
    year: 2018,
    doi: '10.1016/j.sj.2018.01.002',
    abstract: {
      en: 'Investigating the pulmonary protective effects of adropin peptide in diabetic rat models through inhibition of the Rho A/Rho-associated kinase signaling pathway.',
      ar: 'بحث التأثيرات الوقائية لبروتين الأدريبين على الأنسجة الرئوية لدى الجرذان المصابة بالسكري عبر تثبيط مسار Rho A/Rho-associated kinase.'
    },
    type: 'Original Research',
    keywords: ['Adropin', 'Diabetic Lung Injury', 'Rho Kinase', 'Anatomy & Physiology'],
    pdfUrl: 'https://scholar.google.com'
  }
];

export const initialConferences: ConferenceItem[] = [
  {
    id: 'conf-1',
    eventName: { en: 'Annual International Medical Congress — Tanta Faculty of Medicine', ar: 'المؤتمر السنوي الدولي لكلية الطب — جامعة طنطا' },
    role: { en: 'Speaker & Committee Member', ar: 'متحدث ورئيس جلسة' },
    location: { en: 'Tanta University, Egypt', ar: 'جامعة طنطا، مصر' },
    date: '2025-12-15',
    topic: {
      en: 'Innovations in Human Embryology, Cellular Histology, and International Student Medical Education',
      ar: 'الابتكارات في علم الأجنة الأدمي، الهستولوجي الخلوي، وتطوير تعليم الوافدين في الطب'
    },
    isUpcoming: true,
    description: {
      en: 'Presentation on cellular signaling in embryological malformations and advancing student integration frameworks in higher education.',
      ar: 'محاضرة علمية عن مسارات الإشارات الخلوية في التطور الجنيني وتطوير آليات رعاية الطلاب الوافدين بالجامعة.'
    }
  }
];

export const initialArticles: ArticleItem[] = [
  {
    id: 'art-1',
    slug: 'polycystic-ovarian-syndrome-pcos-guide',
    title: {
      en: 'Comprehensive Guide to Polycystic Ovarian Syndrome (PCOS): Cellular Mechanisms and Modern Clinical Care',
      ar: 'الدليل الشامل لمتلازمة تكيس المبايض (PCOS): الآليات الخلوية والأكسدية والرعاية الطبية الحديثة'
    },
    summary: {
      en: 'Explore the physiological roots of PCOS, cellular signaling, metabolic impact, and evidence-based treatments for women.',
      ar: 'تعرفي على الأسباب الفسيولوجية والأكسدية لتكيس المبايض، وتأثير مسارات الإشارات الأيضية، وأحدث طرق العلاج المعتمدة.'
    },
    content: {
      en: 'Polycystic Ovarian Syndrome (PCOS) is a multi-factorial endocrine and metabolic condition affecting reproductive health. Recent scientific discoveries highlight the synergistic role of antioxidant nanoparticles (such as selenium) alongside metformin in targeting the PI3K/Akt pathway, restoring redox balance, and improving ovarian tissue function. Dr. Aml Hamada provides expert clinical evaluation and personalized treatment plans for women experiencing PCOS.',
      ar: 'تعد متلازمة تكيس المبايض (PCOS) من أكثر الاضطرابات الأيضية والهرمونية شائعة التأثير على صحة المرأة الإنجابية. وتكشف الأبحاث العلمية الحديثة عن أهمية ضبط مسارات الإشارات الأكسدية (PI3K/Akt) واستخدام مضادات الأكسدة المتطورة كجسيمات السيلينيوم النانوية بجانب المتفورمين لاستعادة توازن الخلايا. توفر د. أمل عبد الستار حماده فحصاً تخصصياً ودقيقاً لكل حالة.'
    },
    category: { en: 'Obstetrics & Gynecology', ar: 'النساء والتوليد' },
    keywords: ['PCOS', 'Women Health', 'Obstetrics & Gynecology', 'تكيس المبايض'],
    author: { en: 'Dr. Aml Mohamed Abd El-Sattar Hamada', ar: 'د. أمل محمد عبدالستار حماده' },
    date: '2026-02-01',
    readingTime: '6 min',
    coverImage: '/doctor.jpg',
    isFeatured: true,
    isPublished: true
  },
  {
    id: 'art-2',
    slug: 'human-embryology-congenital-awareness',
    title: {
      en: 'Human Embryology and Congenital Development: Key Insights for Expectant Mothers',
      ar: 'علم الأجنة ومراحل التطور الجنيني: إرشادات طبية هامة للأمهات أثناء الحمل'
    },
    summary: {
      en: 'Understanding embryonic development stages, organogenesis, and preventive care during early pregnancy.',
      ar: 'فهم مراحل تكون الجنين والأنشطة الخلوية في الأسابيع الأولى، والتوعية بالوقاية من التعرّض للمؤثرات الضارة.'
    },
    content: {
      en: 'Human embryology provides the foundational understanding of fetal organ formation. Early pregnancy care requires protecting developing tissues from oxidative stress, environmental toxins, and metabolic disruptions. Understanding embryonic milestones helps ensure optimal fetal growth and safe pregnancy outcomes.',
      ar: 'يمثل علم الأجنة المدخل الأساسي لفهم تكوّن أعضاء الجنين والوقاية من التشوهات الخلقية. تتطلب الأسابيع الأولى للحمل عناية فائقة وتجنب مسببات الإجهاد الأكسدي وتناول المكملات الضرورية بحسب التوصيات الطبية الدقيقة.'
    },
    category: { en: 'Anatomy & Embryology', ar: 'التشريح وعلم الأجنة' },
    keywords: ['Embryology', 'Antenatal Care', 'Fetal Health', 'علم الأجنة'],
    author: { en: 'Dr. Aml Mohamed Abd El-Sattar Hamada', ar: 'د. أمل محمد عبدالستار حماده' },
    date: '2026-01-15',
    readingTime: '5 min',
    coverImage: '/doctor.jpg',
    isPublished: true
  }
];

export const initialClinics: ClinicLocation[] = [
  {
    id: 'clinic-tanta-med',
    name: {
      en: 'Tanta Faculty of Medicine — Department of Human Anatomy & Embryology',
      ar: 'كلية الطب — قسم التشريح الآدمي وعلم الأجنة (جامعة طنطا)'
    },
    city: {
      en: 'Tanta',
      ar: 'طنطا'
    },
    address: {
      en: 'El-Galaa Street, Faculty of Medicine, Tanta University, Gharbia Governorate, Egypt',
      ar: 'شارع الجيش / الجلاء، كلية الطب، جامعة طنطا، محافظة الغربية'
    },
    phone: '01003514770',
    workingHours: [
      { en: 'Sunday to Thursday: 09:00 AM – 02:00 PM', ar: 'الأحد إلى الخميس: من 09:00 صباحاً حتى 02:00 ظهراً' },
      { en: 'Friday & Saturday: Closed', ar: 'الجمعة والسبت: إجازة' }
    ],
    services: [
      {
        id: 'srv-1',
        name: { en: 'Academic & Embryological Research Consultations', ar: 'استشارات البحث العلمي والتشريح الأدمي وعلم الأجنة' },
        durationMinutes: 45
      },
      {
        id: 'srv-2',
        name: { en: 'International Students Affairs & Guidance', ar: 'خدمات واستشارات وحدة رعاية الطلاب الوافدين' },
        durationMinutes: 30
      },
      {
        id: 'srv-3',
        name: { en: 'Human Rights Unit Consultations & Inquiries', ar: 'متابعة واستفسارات وحدة حقوق الإنسان بالكلية' },
        durationMinutes: 30
      }
    ],
    googleMapsEmbedUrl: 'https://maps.google.com/maps?q=Faculty+of+Medicine+Tanta+University&t=&z=15&ie=UTF8&iwloc=&output=embed',
    mapLocationUrl: 'https://maps.google.com/maps?q=Faculty+of+Medicine+Tanta+University',
    isActive: true
  },
  {
    id: 'clinic-obgyn-tanta',
    name: {
      en: 'Dr. Aml Hamada Obstetrics & Gynecology Clinic',
      ar: 'عيادة د. أمل عبد الستار حماده للنساء والتوليد'
    },
    city: {
      en: 'Tanta',
      ar: 'طنطا'
    },
    address: {
      en: 'Tanta City Center, Gharbia Governorate, Egypt',
      ar: 'طنطا، محافظة الغربية، مصر'
    },
    phone: '01003514770',
    workingHours: [
      { en: 'Saturday, Monday, Wednesday: 04:00 PM – 08:00 PM', ar: 'السبت والإثنين والأربعاء: من 04:00 مساءً حتى 08:00 مساءً' }
    ],
    services: [
      {
        id: 'srv-obgyn-1',
        name: { en: 'Obstetrics & Antenatal Pregnancy Care', ar: 'متابعة الحمل والولادة والرعاية الحثيثة للأم والجنين' },
        durationMinutes: 30
      },
      {
        id: 'srv-obgyn-2',
        name: { en: 'Gynecological & PCOS Consultation', ar: 'كشف واستشارة أمراض النساء وتكيس المبايض' },
        durationMinutes: 30
      }
    ],
    googleMapsEmbedUrl: 'https://maps.google.com/maps?q=Tanta+Gharbia+Egypt&t=&z=15&ie=UTF8&iwloc=&output=embed',
    mapLocationUrl: 'https://maps.google.com/maps?q=Tanta+Gharbia+Egypt',
    isActive: true
  }
];

export const initialSocialLinks: SocialLink[] = [
  {
    id: 'soc-1',
    platform: 'Facebook',
    url: 'https://web.facebook.com/p/DrAml-Abd-ELsattar-%D8%AF%D8%A3%D9%85%D9%84-%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D8%B3%D8%AA%D8%A7%D8%B1-%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D9%8A-%D8%A7%D9%84%D9%86%D8%B3%D8%A7%D8%A1-%D9%88%D8%A7%D9%8D%D8%AA%D9%88%D9%84%D9%8A%D8%AF-61551050442499/',
    description: { en: 'Official Facebook Page (د. أمل عبدالستار استشاري النساء والتوليد)', ar: 'الصفحة الرسمية على الفيسبوك (د. أمل عبدالستار استشاري النساء والتوليد)' },
    iconName: 'Facebook',
    category: 'social'
  },
  {
    id: 'soc-2',
    platform: 'WhatsApp',
    url: 'https://wa.me/201003514770',
    description: { en: 'Direct WhatsApp Contact (01003514770)', ar: 'واتساب وتواصل مباشر (01003514770)' },
    iconName: 'MessageSquare',
    category: 'social'
  },
  {
    id: 'soc-3',
    platform: 'Google Scholar',
    url: 'https://scholar.google.com',
    description: { en: 'Google Scholar Profile', ar: 'الملف الأكاديمي على Google Scholar' },
    iconName: 'GraduationCap',
    category: 'academic'
  },
  {
    id: 'soc-4',
    platform: 'ResearchGate',
    url: 'https://researchgate.net',
    description: { en: 'ResearchGate Profile', ar: 'الملف البحثي على ResearchGate' },
    iconName: 'BookOpen',
    category: 'academic'
  }
];

export const initialSiteSettings: SiteSettings = {
  contactEmail: 'amal.hamada@med.tanta.edu.eg',
  contactPhone: '01003514770',
  whatsappNumber: '+201003514770',
  emergencyNotice: {
    en: 'For urgent clinical cases or hospital admissions, please call 01003514770 or report directly to the emergency department.',
    ar: 'في الحالات السريرية الطارئة أو استشارات الولادة العاجلة، يرجى الاتصال فوراً على الرقم 01003514770 أو التوجه لعيادة الطوارئ.'
  },
  disclaimerNotice: {
    en: 'The medical information provided on this platform is for educational and academic awareness only and does not substitute direct medical consultation with a specialist.',
    ar: 'المعلومات الطبية الواردة في هذا الموقع تهدف إلى التوعية العامة والتعريف العلمي ولا تغني عن الفحص والاستشارة الطبية المباشرة مع الطبيب المختص.'
  }
};

export const initialAppointments: AppointmentBooking[] = [
  {
    id: 'appt-demo-1',
    bookingRef: 'DR-AMAL-2026-101',
    clinicId: 'clinic-obgyn-tanta',
    clinicName: { en: 'Dr. Aml Hamada OB-GYN Clinic', ar: 'عيادة د. أمل عبد الستار حماده للنساء والتوليد' },
    serviceId: 'srv-obgyn-1',
    serviceName: { en: 'Obstetrics & Antenatal Pregnancy Care', ar: 'متابعة الحمل والولادة' },
    date: '2026-09-01',
    timeSlot: '05:00 PM',
    patientName: 'مريم السيد',
    patientPhone: '01012345678',
    patientEmail: 'maryam@example.com',
    appointmentType: 'New Consultation',
    notes: 'استشارة ومتابعة دورية.',
    status: 'Confirmed',
    createdAt: '2026-08-20T10:00:00Z'
  }
];

export const initialContactMessages: ContactMessage[] = [
  {
    id: 'msg-1',
    fullName: 'هدى علي',
    email: 'hoda@example.com',
    phone: '01234567890',
    subject: 'استفسار عن رعاية الوافدين / استشارة للنساء والتوليد',
    message: 'السلام عليكم دكتورة أمل، أود الاستفسار عن مواعيد العيادة ومواعيد تقديم طلبات الوافدين.',
    createdAt: '2026-08-25T14:30:00Z',
    isRead: false
  }
];

export const initialMessages = initialContactMessages;
