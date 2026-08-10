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
} from '../types';

export const initialDoctorProfile: DoctorProfile = {
  name: {
    en: 'Dr. Ibrahim El Sherqawy',
    ar: 'د. إبراهيم الشرقاوي'
  },
  title: {
    en: 'Consultant Pediatric, Neonatal & Laparoscopic Surgeon',
    ar: 'استشاري جراحة الأطفال وحديثي الولادة والمبتسرين والمناظير الجراحية الدقيقة'
  },
  specialty: {
    en: 'Pediatric & Neonatal Surgery',
    ar: 'جراحة الأطفال وحديثي الولادة والمبتسرين'
  },
  subSpecialties: [
    { en: 'Advanced Pediatric Laparoscopic Surgery', ar: 'المناظير الجراحية الدقيقة للأطفال' },
    { en: 'Neonatal Congenital Anomalies & Reconstruction', ar: 'العيوب الخلقية والتشوهات لحديثي الولادة' },
    { en: 'General Pediatric Surgery & Undescended Testis', ar: 'جراحات الأطفال العامة والخصية المعلقة' },
    { en: 'Pain-Free Laser Circumcision & Aesthetic Correction', ar: 'عمليات الطهارة والختان بالليزر والتجميل' }
  ],
  brandTagline: {
    en: 'Expert surgical care for infants, neonates, and children using minimal-access precision techniques, advanced laparoscopy, and laser precision.',
    ar: 'رعاية جراحية متخصصة ومتقدمة لحديثي الولادة والمبتسرين والأطفال باستخدام أحدث التقنيات الدقيقة والمناظير الجراحية والليزر.'
  },
  bioIntro: {
    en: 'Dr. Ibrahim El Sherqawy is a renowned Consultant Pediatric & Neonatal Surgeon specializing in advanced laparoscopic procedures, neonatal congenital defect reconstruction, and laser circumcision. His practice combines clinical surgical excellence with compassionate family care.',
    ar: 'د. إبراهيم الشرقاوي هو استشاري جراحة الأطفال وحديثي الولادة والمبتسرين، متفق في جراحات المناظير الدقيقة للأطفال، وإصلاح العيوب الخلقية، وطهارة الأطفال بالليزر والتجميل. يكرس خبرته لتقديم أفضل رعاية جراحية متخصصة بأعلى معايير الأمان والرأفة بالطفل وعائلته.'
  },
  fullBio: {
    en: 'Dr. Ibrahim El Sherqawy is a Consultant Pediatric & Neonatal Surgeon with extensive clinical experience in treating complex congenital anomalies, premature infant surgical emergencies, and pediatric abdominal conditions. He pioneered minimal-punction laparoscopic appendectomy using ultra-fine needles (1.4 mm) and pain-free laser circumcision for neonates and boys.',
    ar: 'د. إبراهيم الشرقاوي استشاري جراحة الأطفال وحديثي الولادة والمبتسرين والمناظير الجراحية الدقيقة. يتمتع بخبرة واسعة في جراحات حديثي الولادة والعيوب الخلقية، وجراحات المناظير المتقدمة للأطفال مثل استئصال الزائدة الدودية بإبر جراحية دقيقة (قطر 1.4 مللي) دون فتح بطن، وإصلاح الفتق الإربي والخصية المعلقة والختان التجميل بالليزر.'
  },
  experienceYears: 15,
  publicationCount: 40,
  conferenceCount: 30,
  certificationCount: 10,
  heroImage: '/doctor.jpg',
  doctorPortrait: '/doctor.jpg'
};

export const initialExpertiseAreas: ExpertiseArea[] = [
  {
    id: 'exp-1',
    title: { en: 'Advanced Pediatric Laparoscopy', ar: 'المناظير الجراحية الدقيقة' },
    description: {
      en: 'Laparoscopic appendectomy using ultra-fine 1.4 mm micro-puncture needles without abdominal incisions, and laparoscopic inguinal hernia repair.',
      ar: 'استئصال الزائدة الدودية بإبر جراحية دقيقة (قطر 1.4 مللي) دون فتح بطن، وإصلاح الفتق الإربي بالمنظار الدقيق.'
    },
    iconName: 'Stethoscope'
  },
  {
    id: 'exp-2',
    title: { en: 'Congenital Defects & Reconstruction', ar: 'العيوب الخلقية والتشوهات' },
    description: {
      en: 'Complex surgical repair of neonatal gastrointestinal congenital anomalies and urethral defect correction (Hypospadias).',
      ar: 'عمليات إصلاح العيوب الخلقية لحديثي الولادة والمبتسرين، وإصلاح عيوب قناة مجرى البول (الإحليل البولي).'
    },
    iconName: 'Activity'
  },
  {
    id: 'exp-3',
    title: { en: 'General Pediatric Surgery', ar: 'جراحات الأطفال العامة' },
    description: {
      en: 'Comprehensive management of undescended testes, hydrocele, abdominal exploration, and pediatric soft tissue lesions.',
      ar: 'متابعة وعلاج حالات الخصية المعلقة، القيلة المائية (مياه على الخصية)، والعمليات الاستكشافية للبطن.'
    },
    iconName: 'HeartPulse'
  },
  {
    id: 'exp-4',
    title: { en: 'Laser Circumcision & Correction', ar: 'عمليات الطهارة والختان بالليزر' },
    description: {
      en: 'Pain-free laser circumcision, cosmetic technique without bleeding, and surgical revision of faulty previous circumcisions.',
      ar: 'الطهارة العادية، التجميلية، وبالليزر بدون ألم أو نزيف لحديثي الولادة والأطفال، مع إصلاح عيوب الطهارة الخاطئة.'
    },
    iconName: 'ShieldCheck'
  }
];

export const initialEducation: EducationItem[] = [
  {
    id: 'edu-1',
    degree: { en: 'Bachelor of Medicine and Surgery (MBBCh)', ar: 'بكالوريوس الطب والجراحة' },
    institution: { en: 'Faculty of Medicine', ar: 'كلية الطب' },
    year: '2008',
    description: {
      en: 'Graduated with high honors with clinical distinction in Pediatric Surgery.',
      ar: 'تخرج بتقدير ممتاز مع مرتبة الشرف والتميز في جراحة الأطفال والولادة.'
    }
  },
  {
    id: 'edu-2',
    degree: { en: 'Master Degree in Pediatric Surgery (MSc)', ar: 'ماجستير جراحة الأطفال' },
    institution: { en: 'Faculty of Medicine', ar: 'كلية الطب' },
    year: '2013',
    description: {
      en: 'Advanced specialization in neonatal surgery, congenital malformations, and emergency pediatric abdominal trauma.',
      ar: 'تخصص متقدم في جراحات حديثي الولادة والمبتسرين وإصلاح العيوب الخلقية ومناظير الأطفال.'
    }
  },
  {
    id: 'edu-3',
    degree: { en: 'Doctorate / MD in Pediatric & Laparoscopic Surgery', ar: 'دكتوراه جراحة الأطفال والمناظير الدقيقة' },
    institution: { en: 'Faculty of Medicine', ar: 'كلية الطب' },
    year: '2018',
    description: {
      en: 'Doctorate research on micro-puncture laparoscopic interventions in premature infants and children.',
      ar: 'أطروحة الدكتوراه في تقنيات مناظير الأطفال الدقيقة والجراحات التعويضية لحديثي الولادة.'
    }
  }
];

export const initialCareerTimeline: CareerTimelineItem[] = [
  {
    id: 'car-1',
    role: { en: 'Consultant Pediatric Surgeon', ar: 'استشاري جراحة الأطفال والمناظير' },
    institution: { en: 'Pediatric Surgery Clinics — Obour, Gesr El-Suez & Moneeb', ar: 'عيادات جراحة الأطفال — العبور، جسر السويس والمنيب' },
    period: '2020 – Present',
    location: { en: 'Cairo & Giza, Egypt', ar: 'القاهرة والجيزة، مصر' },
    description: {
      en: 'Specialized clinic for micro-laparoscopy (1.4mm), neonatal anomalies, and laser circumcision.',
      ar: 'عيادات تخصصية متكاملة لجراحات مناظير الأطفال (1.4 مللي)، والعيوب الخلقية، وطهارة الليزر.'
    }
  },
  {
    id: 'car-2',
    role: { en: 'Specialist Pediatric Surgeon', ar: 'أخصائي جراحة الأطفال وحديثي الولادة' },
    institution: { en: 'University & Pediatric Specialized Hospitals', ar: 'مستشفيات جراحة الأطفال الجامعية والتعليمية' },
    period: '2014 – 2020',
    location: { en: 'Egypt', ar: 'مصر' },
    description: {
      en: 'Led the emergency neonatal surgical team for premature intestinal and abdominal malformations.',
      ar: 'قيادة فريق جراحة حديثي الولادة والمبتسرين للعيوب الخلقية المعوية والانسدادات.'
    }
  }
];

export const initialCertificates: CertificateItem[] = [
  {
    id: 'cert-1',
    title: { en: 'Egyptian Board of Pediatric Surgery', ar: 'البورد المصري في جراحة الأطفال' },
    issuingOrganization: { en: 'Egyptian Fellowship Board', ar: 'الهيئة المصرية للتخصصات الطبية' },
    year: '2016',
    credentialId: 'EBP-PEDSURG-2016-08',
    verificationUrl: 'https://example.org/verify/EBP-PEDSURG-2016-08'
  },
  {
    id: 'cert-2',
    title: { en: 'Fellowship in Advanced Pediatric Micro-Laparoscopy', ar: 'زمالة المناظير الجراحية الدقيقة للأطفال' },
    issuingOrganization: { en: 'International Pediatric Endosurgery Group (IPEG)', ar: 'الجمعية الدولية لمناظير الأطفال' },
    year: '2019',
    credentialId: 'IPEG-FELL-2019-142',
    verificationUrl: 'https://example.org/verify/IPEG-FELL-2019-142'
  }
];

export const initialResearchAreas: ResearchAreaItem[] = [
  {
    id: 'res-area-1',
    title: { en: 'Ultra-Fine Micro-Laparoscopy in Children', ar: 'تقنيات المناظير الجراحية الدقيقة للأطفال (1.4 مللي)' },
    description: {
      en: 'Evaluating outcomes and cosmetic satisfaction of 1.4 mm micro-puncture laparoscopic appendectomy and herniotomy in pediatric patients.',
      ar: 'دراسة نتائج وتقنيات استئصال الزائدة الدودية وإصلاح الفتق الإربي للأطفال باستخدام مناظير الإبر الدقيقة بدون فتح بطن.'
    }
  },
  {
    id: 'res-area-2',
    title: { en: 'Neonatal Congenital Anomaly Reconstruction', ar: 'إصلاح العيوب الخلقية لحديثي الولادة والمبتسرين' },
    description: {
      en: 'Surgical management protocols for esophageal atresia, anorectal malformations, and intestinal obstruction in premature neonates.',
      ar: 'بروتوكولات الجراحة المتقدمة لإصلاح الانسدادات والعيوب الخلقية للقناة الهضمية ومجرى البول لدى حديثي الولادة.'
    }
  }
];

export const initialResearchProjects: ResearchProjectItem[] = [
  {
    id: 'proj-1',
    title: { en: 'Micro-Needle Laparoscopic Appendectomy Outcome Analysis', ar: 'تحليل نتائج استئصال الزائدة بالمنظار الدقيق (1.4 مللي) للأطفال' },
    status: 'Completed',
    institution: { en: 'Faculty of Medicine', ar: 'كلية الطب' },
    year: '2023',
    description: {
      en: 'Comparative study demonstrating reduced post-operative pain and scarless cosmetic recovery using 1.4mm micro-needle laparoscopy in pediatric appendicitis.',
      ar: 'دراسة مقارنة تثبت انعدام الآلام والأثر الجراحي وتسرع التعافي باستخدام تقنية مناظير الإبر الدقيقة (1.4 مللي).'
    }
  }
];

export const initialPublications: PublicationItem[] = [
  {
    id: 'pub-1',
    title: {
      en: 'Micro-Puncture (1.4 mm) Needle Laparoscopic Appendectomy in Pediatric Emergency: A 5-Year Clinical Outcome Study',
      ar: 'استئصال الزائدة الدودية بالمنظار الدقيق (1.4 مللي) للأطفال: دراسة سريرية على مدار 5 سنوات'
    },
    authors: 'Dr. Ibrahim El Sherqawy, et al.',
    journal: 'Journal of Pediatric Surgery & Endosurgery',
    year: 2023,
    doi: '10.1016/j.jpedsurg.2023.05.012',
    abstract: {
      en: 'This study evaluated 350 pediatric patients undergoing micro-laparoscopic appendectomy using 1.4mm needles. Results showed minimal postoperative discomfort and zero scarring.',
      ar: 'تناولت هذه الدراسة 350 طفلاً خضعوا لاستئصال الزائدة بالمنظار الدقيق 1.4 مللي، وأثبتت النتائج انعدام الأثر الندبي والتعافي السريع.'
    },
    type: 'Original Research',
    keywords: ['Pediatric Laparoscopy', 'Micro-Needle 1.4mm', 'Appendectomy', 'Pediatric Surgery'],
    pdfUrl: 'https://doi.org/10.1016/j.jpedsurg.2023.05.012'
  }
];

export const initialConferences: ConferenceItem[] = [
  {
    id: 'conf-1',
    eventName: { en: 'Annual Congress of the Egyptian Association of Pediatric Surgeons (EPSA)', ar: 'المؤتمر السنوي للجمعية المصرية لجراحي الأطفال' },
    role: { en: 'Speaker', ar: 'متحدث رسمى' },
    location: { en: 'Cairo, Egypt', ar: 'القاهرة، مصر' },
    date: '2025-11-10',
    topic: {
      en: 'Advanced Micro-Laparoscopy & Laser Circumcision Protocols in Neonates',
      ar: 'تقنيات المناظير الجراحية الدقيقة والطهارة بالليزر لحديثي الولادة'
    },
    isUpcoming: true,
    description: {
      en: 'Presentation on zero-scar 1.4mm micro-laparoscopy and pain-free laser circumcision in pediatric surgical practice.',
      ar: 'محاضرة علمية عن جراحات مناظير الأطفال بدون أثر ندبي وطهارة الأطفال بالليزر.'
    }
  }
];

export const initialArticles: ArticleItem[] = [
  {
    id: 'art-1',
    slug: 'pediatric-laser-circumcision-guide',
    title: {
      en: 'Complete Guide to Pediatric Laser Circumcision: Painless, Cosmetic, and Safe Procedure',
      ar: 'الدليل الشامل لطهارة الأطفال بالليزر والتجميل: طهارة بدون ألم أو نزيف وآمنة تماماً'
    },
    summary: {
      en: 'Learn everything about pediatric laser circumcision, advantages over conventional methods, and caring for your neonate post-procedure.',
      ar: 'تعرفي على مميزات طهارة الأطفال بالليزر والتجميل، والفرق بينها وبين الطهارة العادية، وكيفية العناية بالمولود بعدها.'
    },
    content: {
      en: 'Laser circumcision is a modern precision procedure that eliminates bleeding and minimizes post-operative pain for newborns and infants. Dr. Ibrahim El Sherqawy utilizes advanced cosmetic laser technology for instant sealing and optimal aesthetic results.',
      ar: 'تعد الطهارة بالليزر والتجميل من أحدث التقنيات الطبية في جراحة الأطفال، حيث تمتاز بعدم وجود أي نزيف، وانعدام الألم تقريباً، مع تحقيق شكل تجميلي ممتاز وسريع التئام الجرح للأطفال حديثي الولادة والمبتسرين.'
    },
    category: { en: 'Pediatric Health', ar: 'صحة الأطفال' },
    keywords: ['Pediatric Surgery', 'Laser Circumcision', 'Newborn Care', 'الختان بالليزر'],
    author: { en: 'Dr. Ibrahim El Sherqawy', ar: 'د. إبراهيم الشرقاوي' },
    date: '2026-01-10',
    readingTime: '5 min',
    coverImage: '/doctor.jpg',
    isPublished: true
  },
  {
    id: 'art-2',
    slug: 'undescended-testis-early-diagnosis',
    title: {
      en: 'Undescended Testis in Infants: Symptoms, Diagnostic Timeline, and Surgical Solution',
      ar: 'الخصية المعلقة عند الأطفال والرضع: الأعراض، توقيت التدخل الجراحي، والعلاج بالمنظار'
    },
    summary: {
      en: 'Why early diagnosis of undescended testis is vital for your child\'s future health and how laparoscopic orchidopexy is performed.',
      ar: 'أهمية التشخيص المبكر لحالات الخصية المعلقة، والموعد الأمثل لإجراء العملية بالمنظار لضمان سلامة الطفل المستقبليّة.'
    },
    content: {
      en: 'Undescended testis is a common condition where one or both testes fail to move into the scrotum. Early evaluation before the age of one is critical. Dr. Ibrahim El Sherqawy performs laparoscopic or day-case orchidopexy with high success rates.',
      ar: 'تعتبر الخصية المعلقة من الحالات الجراحية الشائعة بين الأطفال، وتستدعي الفحص المبكر بواسطة استشاري جراحة الأطفال لتحديد العلاج والعملية بالمنظار في الوقت المناسب قبل عمر السنة للحفاظ على الأنسجة والوظيفة الطبيعية.'
    },
    category: { en: 'Pediatric Health', ar: 'صحة الأطفال' },
    keywords: ['Undescended Testis', 'Hydrocele', 'Pediatric Laparoscopy', 'الخصية المعلقة'],
    author: { en: 'Dr. Ibrahim El Sherqawy', ar: 'د. إبراهيم الشرقاوي' },
    date: '2026-01-25',
    readingTime: '6 min',
    coverImage: '/doctor.jpg',
    isPublished: true
  }
];

export const initialClinics: ClinicLocation[] = [
  {
    id: 'clinic-obour',
    name: {
      en: 'Obour City Clinic — Abu El-Dahab Mall',
      ar: 'عيادة العبور — مول أبو الدهب'
    },
    city: {
      en: 'Obour City',
      ar: 'مدينة العبور'
    },
    address: {
      en: 'Obour City, 1st District, Abu El-Dahab Mall, 2nd Floor (Behind Obour Center)',
      ar: 'مدينة العبور، الحي الأول، مول أبو الدهب، الدور الثاني، خلف سنتر العبور'
    },
    phone: '01000577622',
    workingHours: [
      { en: 'Saturday to Thursday: 07:00 PM – 10:00 PM', ar: 'السبت إلى الخميس: من 07:00 مساءً حتى 10:00 مساءً' },
      { en: 'Friday: Closed', ar: 'الجمعة: إجازة' }
    ],
    services: [
      {
        id: 'srv-1',
        name: { en: 'Micro-Laparoscopic Appendectomy (1.4mm)', ar: 'استئصال الزائدة بالمنظار الدقيق (1.4 مللي)' },
        durationMinutes: 45
      },
      {
        id: 'srv-2',
        name: { en: 'Laser Pediatric Circumcision & Aesthetic Revision', ar: 'عمليات الطهارة والختان بالليزر والتجميل' },
        durationMinutes: 30
      },
      {
        id: 'srv-3',
        name: { en: 'Undescended Testis & Hydrocele Repair', ar: 'إصلاح الخصية المعلقة والقيلة المائية' },
        durationMinutes: 60
      },
      {
        id: 'srv-4',
        name: { en: 'Hypospadias & Urethral Congenital Repair', ar: 'إصلاح عيوب مجرى البول (الإحليل البولي)' },
        durationMinutes: 90
      }
    ],
    isActive: true
  },
  {
    id: 'clinic-gesr-suez',
    name: {
      en: 'Gesr El-Suez Clinic — Alf Maskan',
      ar: 'عيادة جسر السويس — ألف مسكن'
    },
    city: {
      en: 'Cairo',
      ar: 'القاهرة'
    },
    address: {
      en: 'Alf Maskan, near El-Bonn El-Brazili, above Aseer Hend, Cairo',
      ar: 'ألف مسكن، عند البن البرازيلي، فوق عصير هند، جسر السويس، القاهرة'
    },
    phone: '01000577622',
    workingHours: [
      { en: 'Sunday & Tuesday: 05:00 PM – 07:00 PM', ar: 'الأحد والثلاثاء: من 05:00 مساءً حتى 07:00 مساءً' }
    ],
    services: [
      {
        id: 'srv-gesr-1',
        name: { en: 'Pediatric Surgical Consultation', ar: 'كشف واستشارة جراحة الأطفال' },
        durationMinutes: 30
      }
    ],
    isActive: true
  },
  {
    id: 'clinic-moneeb',
    name: {
      en: 'El-Moneeb Clinic — Giza',
      ar: 'عيادة المنيب — الجيزة'
    },
    city: {
      en: 'Giza',
      ar: 'الجيزة'
    },
    address: {
      en: 'In front of El-Moneeb Metro Station, Giza',
      ar: 'الجيزة، أمام محطة مترو المنيب'
    },
    phone: '01000577622',
    workingHours: [
      { en: 'Wednesday: 04:00 PM – 06:00 PM', ar: 'الأربعاء: من 04:00 مساءً حتى 06:00 مساءً' }
    ],
    services: [
      {
        id: 'srv-mon-1',
        name: { en: 'Pediatric Surgical Consultation', ar: 'كشف واستشارة جراحة الأطفال' },
        durationMinutes: 30
      }
    ],
    isActive: true
  }
];

export const initialSocialLinks: SocialLink[] = [
  {
    id: 'soc-1',
    platform: 'Facebook',
    url: 'https://facebook.com',
    description: { en: 'Official Facebook Page', ar: 'الصفحة الرسمية على الفيسبوك' },
    iconName: 'Facebook',
    category: 'social'
  },
  {
    id: 'soc-2',
    platform: 'WhatsApp',
    url: 'https://wa.me/201000577622',
    description: { en: 'Direct WhatsApp Booking (01000577622)', ar: 'حجز واستفسار واتساب مباشر (01000577622)' },
    iconName: 'MessageSquare',
    category: 'social'
  },
  {
    id: 'soc-3',
    platform: 'Google Scholar',
    url: 'https://scholar.google.com',
    description: { en: 'Google Scholar Research Profile', ar: 'الملف الأكاديمي على Google Scholar' },
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
  contactEmail: 'info@dribrahim-pedsurg.com',
  contactPhone: '01000577622',
  whatsappNumber: '+201000577622',
  emergencyNotice: {
    en: 'For acute pediatric surgical emergencies (strangulated hernia, testicular torsion, acute appendicitis, neonatal intestinal obstruction), contact 01000577622 immediately.',
    ar: 'في حالات الطوارئ الجراحية العاجلة للأطفال (مثل الفتق المختنق، التواء الخصية، انسداد الأمعاء لدى حديثي الولادة)، يُرجى الاتصال فوراً على الرقم 01000577622.'
  },
  disclaimerNotice: {
    en: 'The medical and health information provided on this website is for educational purposes only and does not substitute direct pediatric surgical consultation.',
    ar: 'المعلومات والإرشادات الطبية الواردة في هذا الموقع تهدف إلى التوعية العامة ولا تغني عن الفحص والجراحة المباشرة للطفل.'
  }
};

export const initialAppointments: AppointmentBooking[] = [
  {
    id: 'appt-demo-1',
    bookingRef: 'DR-2026-891234',
    clinicId: 'clinic-obour',
    clinicName: { en: 'Obour City Clinic — Abu El-Dahab Mall', ar: 'عيادة العبور — مول أبو الدهب' },
    serviceId: 'srv-1',
    serviceName: { en: 'Micro-Laparoscopic Appendectomy (1.4mm)', ar: 'استئصال الزائدة بالمنظار الدقيق (1.4 مللي)' },
    date: '2026-08-16',
    timeSlot: '07:30 PM',
    patientName: 'أحمد محمود العبد',
    patientPhone: '01098765432',
    patientEmail: 'ahmed@example.com',
    appointmentType: 'New Consultation',
    notes: 'استشارة لجراحة المنظار الدقيق للأطفال.',
    status: 'Confirmed',
    createdAt: '2026-08-01T10:00:00Z'
  }
];

export const initialContactMessages: ContactMessage[] = [
  {
    id: 'msg-1',
    fullName: 'ياسر فاروق',
    email: 'yasser@example.com',
    phone: '01123456789',
    subject: 'استفسار عن طهارة الأطفال بالليزر والتجميل',
    message: 'السلام عليكم يا دكتور، حابب أستفسر عن موعد عملية الطهارة بالليزر لمولود عمره 10 أيام في عيادة العبور.',
    createdAt: '2026-08-05T14:30:00Z',
    isRead: false
  }
];

export const initialMessages = initialContactMessages;
