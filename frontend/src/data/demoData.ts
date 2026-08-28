import type {
  HospitalProfile,
  DoctorRosterItem,
  DailySchedule,
  SpecialOfferItem,
  MedicalDepartment,
  ClinicLocation,
  SocialLink,
  SiteSettings,
  AppointmentBooking,
  ContactMessage
} from '../app/core/models';

export const initialHospitalProfile: HospitalProfile = {
  name: {
    en: 'Dar El Yosser Specialized Hospital & Clinics',
    ar: 'مستشفى وعيادات دار اليسر التخصصية'
  },
  slogan: {
    en: 'Your Health Deserves the Best Care & Confidence',
    ar: 'ابتسامتك وصحتك تستاهل الأفضل... ثقة أكبر ورعاية أشمل'
  },
  subTitle: {
    en: 'Comprehensive 24/7 Outpatient & Emergency Healthcare Center in El Obour City',
    ar: 'مركز طبي متكامل بمدينة العبور يوفر طوارئ 24 ساعة وعيادات تخصصية متقدمة'
  },
  aboutText: {
    en: 'Dar El Yosser Hospital & Clinics is a leading medical facility in El Obour City offering over 20 medical specialties, 24/7 emergency care, specialized dental care under general anesthesia, advanced EEG & EMG diagnostic unit, ultrasound center, and top consultant doctors in Cairo & El Obour.',
    ar: 'مستشفى وعيادات دار اليسر التخصصية هي صرح طبي متميز بمدينة العبور، تضمن رعاية صحية متكاملة عبر أكثر من 20 تخصصاً طبيًا، وتوفر طوارئ واستشاريين على مدار 24 ساعة (نساء، عظام، باطنة، جراحة، أطفال)، بالإضافة لمركز اليسر المتخصص لطب الأسنان والتخدير الكلي، وأحدث وحدات رسم المخ ورسم العصب والسونار.'
  },
  city: { en: 'El Obour City, Cairo', ar: 'مدينة العبور، القاهرة' },
  address: {
    en: 'El Obour City, 1st District, 200m after 5th Roundabout on the service road, opposite Unimall',
    ar: 'مدينة العبور، الحي الأول، بعد صينية الخامس بـ 200 - 300 متر على الطريق الرئيسي (الطريق البطئ) أمام يوني مول'
  },
  district: { en: '1st District', ar: 'الحي الأول' },
  landmark: { en: 'Opposite Unimall, 200m after 5th Roundabout', ar: 'أمام يوني مول، بعد صينية الخامس بـ 200 متر' },
  phoneNumbers: ['01030252002', '01030252005'],
  dentalPhone: '01092893808',
  whatsappNumber: '01030252002',
  facebookUrl: 'https://web.facebook.com/darel.Yosser2014',
  workingHours: {
    en: '24/7 Emergency & Outpatient Clinics Daily',
    ar: 'الطوارئ والعيادات التخصصية على مدار 24 ساعة طوال الأسبوع'
  },
  emergencyCare: {
    en: '24/7 Specialists in OB-GYN, Orthopedics, Internal Medicine, General Surgery & Pediatrics',
    ar: 'يوجد أخصائيون (نساء – عظام – باطنة – جراحة – أطفال) على مدار الأسبوع خلال الـ 24 ساعة'
  },
  bookingPolicyNotice: {
    en: 'Phone reservation is NOT available. Please visit the medical center directly for on-site registration & tickets. Priority is by arrival or clinic system queue.',
    ar: '🔴 غير متاح الحجز بالتليفون. للحجز يرجى التوجه للمركز مباشرة. الحجز بأسبقية الحضور أو على السيستم بالمبنى.'
  },
  followersCount: '35,000+',
  followingCount: '53'
};

export const initialSpecialOffers: SpecialOfferItem[] = [
  {
    id: 'offer-dental-20',
    title: {
      en: '20% Discount on All Dental Services',
      ar: '🎉 خصم 20% على جميع خدمات الأسنان'
    },
    tagline: {
      en: 'El Yosr Dental Clinic – At Dar El Yosser',
      ar: '🤍 اليسر كلينك – في دار اليسر 🤍'
    },
    discountPercentage: 20,
    clinicName: { en: 'El Yosr Dental Clinic', ar: 'اليسر كلينك للأسنان' },
    description: {
      en: 'Your smile deserves the best! Enjoy a 20% discount on all dental treatments including cosmetics, pediatric dentistry, orthodontics, and restorative procedures.',
      ar: 'لأن ابتسامتك تهمنا... خلي دايمًا ليها اهتمام خاص! استفيد بالعرض واحجز دلوقتي بخصم 20% على كشوفات وعلاجات الأسنان.'
    },
    features: [
      { en: '20% off all dental procedures', ar: 'خصم 20% على كافة التركيبات والعلاجات والتقويم' },
      { en: 'Specialized cosmetic & pediatric dentists', ar: 'أطباء أسنان متخصصون للأطفال والكبار' },
      { en: 'Option for General Anesthesia for anxious patients', ar: 'إمكانية العلاج تحت التخدير الكلي للأطفال والحالات الخاصة' }
    ],
    contactPhone: '01092893808',
    validity: { en: 'Limited Time Offer', ar: 'عرض لفترة محدودة - احجز الآن' },
    badgeText: { en: '20% OFF', ar: 'خصم 20%' }
  },
  {
    id: 'offer-anesthesia-dental',
    title: {
      en: 'Dental Treatment Under General Anesthesia',
      ar: '🦷✨ علاج أسنان بدون خوف أو قلق تحت التخدير الكلي'
    },
    tagline: {
      en: 'Safe & Painless Multiple Procedures in One Session',
      ar: 'أعلى درجات الأمان والراحة لك ولطفلك'
    },
    clinicName: { en: 'Dar El Yosser Specialized Dental Unit', ar: 'مركز دار اليسر للأسنان والتخدير' },
    description: {
      en: 'Afraid of the dentist? Uncooperative child? Need multiple procedures in one session? Now available under full general anesthesia with a specialized medical team.',
      ar: 'بتخافي من دكتور الأسنان؟ طفلك مش بيتعاون أثناء العلاج؟ دلوقتي ممكن علاج الأسنان تحت التخدير الكلي مع فريق طبي متخصص وتجهيزات مناسبة لضمان أعلى درجات الأمان والراحة.'
    },
    features: [
      { en: 'Suitable for extreme anxiety & non-cooperative children', ar: 'مناسب لحالات الخوف الشديد وعدم التعاون للأطفال والكبار' },
      { en: 'Perform multiple treatments in a single painless session', ar: 'إمكانية إجراء أكثر من علاج وإصلاح شامل في جلسة واحدة' },
      { en: 'Full medical supervision by Anesthesia Consultants', ar: 'تقييم وإشراف طبي كامل من طبيب الأسنان وطبيب التخدير' }
    ],
    contactPhone: '01092893808',
    badgeText: { en: 'Painless Dental Care', ar: 'تخدير كلي آمن' }
  },
  {
    id: 'offer-kids-school',
    title: {
      en: 'Back-to-School Pediatric Dental Screening',
      ar: '🎒🦷 قبل ما المدارس تبدأ... اطمني على أسنان طفلك!'
    },
    tagline: {
      en: 'Early Screening = Simpler Treatment & Confident Smiles',
      ar: 'الكشف المبكر = علاج أسهل وابتسامة أجمل'
    },
    clinicName: { en: 'Pediatric Dentistry Center', ar: 'عيادة أسنان الأطفال - دار اليسر' },
    description: {
      en: 'Before the school rush, take a simple step and get a comprehensive pediatric dental checkup to catch early cavities and start the academic year with confidence.',
      ar: 'قبل الزحمة والدراسة والواجبات، خدي خطوة بسيطة واعملي لطفلك كشف أسنان شامل عشان نكتشف أي تسوس أو مشكلة بدري ونبدأ السنة بابتسامة واثقة.'
    },
    features: [
      { en: 'Early cavity detection & fluoride protection', ar: 'فحص شامل للتسوس وتطبيق المكونات الواقية' },
      { en: 'Gentle child-friendly environment', ar: 'بيئة مرحة ومريحة مخصصة للأطفال' }
    ],
    contactPhone: '01092893808',
    badgeText: { en: 'Kids Checkup', ar: 'كشف الأطفال' }
  }
];

export const initialDepartments: MedicalDepartment[] = [
  {
    id: 'dept-dental',
    name: { en: 'Dental Clinic (El Yosr Clinic)', ar: 'مركز الأسنان (اليسر كلينك)' },
    iconName: 'Smile',
    description: {
      en: 'Comprehensive dental care, pediatric dentistry, orthodontics, dental implants, and dental surgery under general anesthesia.',
      ar: 'كشف وعلاج تخصصي كامل لجميع خدمات الأسنان، تجميل، تقويم، تركيبات، أسنان أطفال، وتخدير كلي.'
    },
    services: [
      { en: 'General & Cosmetic Dentistry', ar: 'تجميل وحشو الأسنان المتقدم' },
      { en: 'Dental Care Under General Anesthesia', ar: 'علاج الأسنان تحت التخدير الكلي' },
      { en: 'Pediatric Dental Screening & Prevention', ar: 'أسنان الأطفال والوقاية المبكرة' },
      { en: 'Orthodontics & Implants', ar: 'تقويم وزراعة الأسنان' }
    ]
  },
  {
    id: 'dept-obgyn',
    name: { en: 'Obstetrics & Gynecology', ar: 'النساء والتوليد' },
    iconName: 'Heart',
    description: {
      en: '24/7 Antenatal care, high-risk pregnancy monitoring, natural & C-section deliveries, gynecological surgeries.',
      ar: 'متابعة الحمل والولادة على مدار 24 ساعة، حالات الحمل الخرج والولادات القيصرية والطبيعية.'
    },
    services: [
      { en: '24/7 Pregnancy Emergency', ar: 'طوارئ نسا وولادة 24 ساعة' },
      { en: 'Fetal Ultrasound & Monitoring', ar: 'متابعة الجنين والسونار' },
      { en: 'PCOS & Fertility Treatments', ar: 'علاج تكيس المبايض والصحة الإنجابية' }
    ],
    isEmergencyAvailable: true
  },
  {
    id: 'dept-pediatrics',
    name: { en: 'Pediatrics & Neonatology', ar: 'طب الأطفال وحديثي الولادة' },
    iconName: 'Baby',
    description: {
      en: '24/7 Pediatric care, growth monitoring, vaccinations, pediatric emergency, and acute illnesses.',
      ar: 'رعاية أطفال متكاملة 24/7، متابعة النمو والتطعيمات وطوارئ الأطفال.'
    },
    services: [
      { en: '24/7 Pediatric Emergency', ar: 'طوارئ أطفال 24 ساعة' },
      { en: 'Pediatric Consultations', ar: 'عيادات متابعة نمو الأطفال' }
    ],
    isEmergencyAvailable: true
  },
  {
    id: 'dept-orthopedics',
    name: { en: 'Orthopedic Surgery & Traumatology', ar: 'جراحة العظام والإصابات' },
    iconName: 'Activity',
    description: {
      en: '24/7 Emergency trauma care, joint treatments, bone fractures, spine consultations, and orthopedic surgeries.',
      ar: 'طوارئ جراحة العظام والكسور والمفاصل والعمود الفقري على مدار الساعة.'
    },
    services: [
      { en: '24/7 Fracture Emergency', ar: 'طوارئ الكسور والإصابات' },
      { en: 'Joint & Spine Clinics', ar: 'عيادات المفاصل والعمود الفقري' }
    ],
    isEmergencyAvailable: true
  },
  {
    id: 'dept-internal',
    name: { en: 'Internal Medicine & Diabetes', ar: 'الباطنة العامة والسكر' },
    iconName: 'Stethoscope',
    description: {
      en: '24/7 Internal medicine, hypertension, diabetes management, kidney diseases, and digestive health.',
      ar: 'متابعة السكر والضغط وأمراض الكلى والجهاز الهضمي والعيادات التخصصية.'
    },
    services: [
      { en: 'Diabetes & Hypertension Clinic', ar: 'عيادة الباطنة والسكر والضغط' },
      { en: 'Gastroenterology & Kidney Care', ar: 'عيادات الكلى والجهاز الهضمي' }
    ],
    isEmergencyAvailable: true
  },
  {
    id: 'dept-eeg-emg',
    name: { en: 'EEG & EMG Diagnostics Center', ar: 'مركز رسم المخ ورسم العصب' },
    iconName: 'Brain',
    description: {
      en: 'State-of-the-art Electroencephalogram (EEG) and Electromyography (EMG) diagnostic procedures by specialized neurophysiologists.',
      ar: 'وحدة متخصصة لإجراء رسم المخ الكهربائي ورسم العصب والعضلات بأحدث الأجهزة الفحص الدقيق.'
    },
    services: [
      { en: 'Electroencephalogram (EEG)', ar: 'رسم المخ الكهربائي' },
      { en: 'Electromyography (EMG) & Nerve Conduction', ar: 'رسم العصب وسرعة التوصيل العصبية' }
    ]
  },
  {
    id: 'dept-sonar',
    name: { en: 'Ultrasound Center (Sonar)', ar: 'مركز السونار والأشعة التلفزيونية' },
    iconName: 'Radio',
    description: {
      en: 'Advanced abdominal, pelvic, Doppler, and pregnancy ultrasound scans.',
      ar: 'فحوصات الأشعة التلفزيونية والسونار والدوبلر المتقدم على البطن والحوض والجنين.'
    },
    services: [
      { en: 'Abdominal & Pelvic Ultrasound', ar: 'سونار البطن والحوض' },
      { en: 'Pregnancy Doppler & 4D Scan', ar: 'سونار الحوامل والدوبلر' }
    ]
  },
  {
    id: 'dept-cardiology',
    name: { en: 'Cardiology & Heart Care', ar: 'أمراض القلب والأوعية الدموية' },
    iconName: 'HeartPulse',
    description: {
      en: 'Comprehensive cardiac evaluations, hypertension monitoring, and ECG diagnostics.',
      ar: 'فحص أمراض القلب، رسم القلب، متابعة ضغط الدم، والوقاية من أزمات القلب.'
    },
    services: [
      { en: 'Cardiology Consultations', ar: 'كشف عيادة القلب' }
    ]
  },
  {
    id: 'dept-ent',
    name: { en: 'Ear, Nose & Throat (ENT) & Audiology', ar: 'أنف وأذن وحنجرة وسمعيات' },
    iconName: 'Ear',
    description: {
      en: 'Diagnosis and treatment of sinus, hearing, voice, and ENT conditions.',
      ar: 'علاج أمراض الجيوب الأنفية والسمع والأذن والأوتار الصوتية والسمعيات.'
    },
    services: [
      { en: 'ENT & Audiology Clinics', ar: 'عيادات الأنف والأذن واختبارات السمع' }
    ]
  },
  {
    id: 'dept-ophthalmology',
    name: { en: 'Ophthalmology (Eye Clinic)', ar: 'الرمد وجراحة العيون' },
    iconName: 'Eye',
    description: {
      en: 'Eye exams, vision test, glaucoma, pediatric vision, and eye procedures.',
      ar: 'فحص قاع العين، قياس النظر، علاج أمراض المياه البيضاء والزرقاء ورمد الأطفال.'
    },
    services: [
      { en: 'Eye Examination & Vision Check', ar: 'فحص العيون وقياس النظر' }
    ]
  },
  {
    id: 'dept-dermatology',
    name: { en: 'Dermatology & Cosmetology', ar: 'الجلدية والتجميل' },
    iconName: 'Sparkles',
    description: {
      en: 'Skin care, acne treatments, allergy, hair loss, and cosmetic dermatology.',
      ar: 'علاج الأمراض الجلدية، حب الشباب، تساقط الشعر، والتجميل الطبي.'
    },
    services: [
      { en: 'Dermatology & Skin Care', ar: 'كشف واستشارات الجلدية' }
    ]
  },
  {
    id: 'dept-urology',
    name: { en: 'Urology & Andrology', ar: 'المسالك البولية والتناسلية' },
    iconName: 'Shield',
    description: {
      en: 'Kidney stones, urinary tract infections, prostate care, and urological health.',
      ar: 'علاج حصوات الكلى والمجاري البولية والبروستاتا والمسالك.'
    },
    services: [
      { en: 'Urology Consultations', ar: 'كشف المسالك البولية' }
    ]
  }
];

export const dentalWeeklySchedule: DoctorRosterItem[] = [
  // Saturday
  { id: 'd-sat-1', name: 'د/ معتصم أسامة', specialtyId: 'dept-dental', specialtyName: { en: 'Dentistry', ar: 'أسنان' }, timeSlot: 'الفترة الصباحية', status: 'AVAILABLE', dayOfWeek: 'SATURDAY', shiftType: 'MORNING' },
  { id: 'd-sat-2', name: 'د/ دينا السيد', specialtyId: 'dept-dental', specialtyName: { en: 'Dentistry', ar: 'أسنان' }, timeSlot: 'الفترة المسائية', status: 'AVAILABLE', dayOfWeek: 'SATURDAY', shiftType: 'EVENING' },
  { id: 'd-sat-3', name: 'د/ ياسر جودة', specialtyId: 'dept-dental', specialtyName: { en: 'Dentistry', ar: 'أسنان' }, timeSlot: 'الفترة المسائية', status: 'AVAILABLE', dayOfWeek: 'SATURDAY', shiftType: 'EVENING' },
  { id: 'd-sat-4', name: 'د/ محمد لطفي', specialtyId: 'dept-dental', specialtyName: { en: 'Dentistry', ar: 'أسنان' }, timeSlot: 'الفترة المسائية', status: 'AVAILABLE', dayOfWeek: 'SATURDAY', shiftType: 'EVENING' },

  // Sunday
  { id: 'd-sun-1', name: 'د/ دينا السيد', specialtyId: 'dept-dental', specialtyName: { en: 'Dentistry', ar: 'أسنان' }, timeSlot: 'الفترة الصباحية', status: 'AVAILABLE', dayOfWeek: 'SUNDAY', shiftType: 'MORNING' },
  { id: 'd-sun-2', name: 'د/ معتصم أسامة', specialtyId: 'dept-dental', specialtyName: { en: 'Dentistry', ar: 'أسنان' }, timeSlot: 'الفترة الصباحية', status: 'AVAILABLE', dayOfWeek: 'SUNDAY', shiftType: 'MORNING' },
  { id: 'd-sun-3', name: 'د/ آلاء طارق', specialtyId: 'dept-dental', specialtyName: { en: 'Dentistry', ar: 'أسنان' }, timeSlot: 'الفترة المسائية', status: 'AVAILABLE', dayOfWeek: 'SUNDAY', shiftType: 'EVENING' },
  { id: 'd-sun-4', name: 'د/ أيمن رمضان', specialtyId: 'dept-dental', specialtyName: { en: 'Dentistry', ar: 'أسنان' }, timeSlot: 'الفترة المسائية', status: 'AVAILABLE', dayOfWeek: 'SUNDAY', shiftType: 'EVENING' },
  { id: 'd-sun-5', name: 'د/ محمد عبد العظيم', specialtyId: 'dept-dental', specialtyName: { en: 'Dentistry', ar: 'أسنان' }, timeSlot: 'الفترة المسائية', status: 'AVAILABLE', dayOfWeek: 'SUNDAY', shiftType: 'EVENING' },

  // Monday
  { id: 'd-mon-1', name: 'د/ ياسر جودة', specialtyId: 'dept-dental', specialtyName: { en: 'Dentistry', ar: 'أسنان' }, timeSlot: 'الفترة الصباحية', status: 'AVAILABLE', dayOfWeek: 'MONDAY', shiftType: 'MORNING' },
  { id: 'd-mon-2', name: 'د/ دينا السيد', specialtyId: 'dept-dental', specialtyName: { en: 'Dentistry', ar: 'أسنان' }, timeSlot: 'الفترة المسائية', status: 'AVAILABLE', dayOfWeek: 'MONDAY', shiftType: 'EVENING' },
  { id: 'd-mon-3', name: 'د/ ياسر جودة', specialtyId: 'dept-dental', specialtyName: { en: 'Dentistry', ar: 'أسنان' }, timeSlot: 'الفترة المسائية', status: 'AVAILABLE', dayOfWeek: 'MONDAY', shiftType: 'EVENING' },
  { id: 'd-mon-4', name: 'د/ محمد لطفي', specialtyId: 'dept-dental', specialtyName: { en: 'Dentistry', ar: 'أسنان' }, timeSlot: 'الفترة المسائية', status: 'AVAILABLE', dayOfWeek: 'MONDAY', shiftType: 'EVENING' },

  // Tuesday
  { id: 'd-tue-1', name: 'د/ دينا السيد', specialtyId: 'dept-dental', specialtyName: { en: 'Dentistry', ar: 'أسنان' }, timeSlot: 'الفترة الصباحية', status: 'AVAILABLE', dayOfWeek: 'TUESDAY', shiftType: 'MORNING' },
  { id: 'd-tue-2', name: 'د/ يسر مهران', specialtyId: 'dept-dental', specialtyName: { en: 'Dentistry', ar: 'أسنان' }, timeSlot: 'الفترة المسائية', status: 'AVAILABLE', dayOfWeek: 'TUESDAY', shiftType: 'EVENING' },
  { id: 'd-tue-3', name: 'د/ أيمن رمضان', specialtyId: 'dept-dental', specialtyName: { en: 'Dentistry', ar: 'أسنان' }, timeSlot: 'الفترة المسائية', status: 'AVAILABLE', dayOfWeek: 'TUESDAY', shiftType: 'EVENING' },

  // Wednesday
  { id: 'd-wed-1', name: 'د/ أحمد جمال', specialtyId: 'dept-dental', specialtyName: { en: 'Dentistry', ar: 'أسنان' }, timeSlot: 'الفترة الصباحية', status: 'AVAILABLE', dayOfWeek: 'WEDNESDAY', shiftType: 'MORNING' },
  { id: 'd-wed-2', name: 'د/ آلاء لطفي', specialtyId: 'dept-dental', specialtyName: { en: 'Dentistry', ar: 'أسنان' }, timeSlot: 'الفترة الصباحية', status: 'AVAILABLE', dayOfWeek: 'WEDNESDAY', shiftType: 'MORNING' },
  { id: 'd-wed-3', name: 'د/ معتصم أسامة', specialtyId: 'dept-dental', specialtyName: { en: 'Dentistry', ar: 'أسنان' }, timeSlot: 'الفترة المسائية', status: 'AVAILABLE', dayOfWeek: 'WEDNESDAY', shiftType: 'EVENING' },
  { id: 'd-wed-4', name: 'د/ محمد لطفي', specialtyId: 'dept-dental', specialtyName: { en: 'Dentistry', ar: 'أسنان' }, timeSlot: 'الفترة المسائية', status: 'AVAILABLE', dayOfWeek: 'WEDNESDAY', shiftType: 'EVENING' },

  // Thursday
  { id: 'd-thu-1', name: 'د/ دينا السيد', specialtyId: 'dept-dental', specialtyName: { en: 'Dentistry', ar: 'أسنان' }, timeSlot: 'الفترة الصباحية', status: 'AVAILABLE', dayOfWeek: 'THURSDAY', shiftType: 'MORNING' },
  { id: 'd-thu-2', name: 'د/ محمد لطفي', specialtyId: 'dept-dental', specialtyName: { en: 'Dentistry', ar: 'أسنان' }, timeSlot: 'الفترة المسائية', status: 'AVAILABLE', dayOfWeek: 'THURSDAY', shiftType: 'EVENING' },
  { id: 'd-thu-3', name: 'د/ هنا حازم', specialtyId: 'dept-dental', specialtyName: { en: 'Dentistry', ar: 'أسنان' }, timeSlot: 'الفترة المسائية', status: 'AVAILABLE', dayOfWeek: 'THURSDAY', shiftType: 'EVENING' },

  // Friday
  { id: 'd-fri-1', name: 'د/ ياسر جودة', specialtyId: 'dept-dental', specialtyName: { en: 'Dentistry', ar: 'أسنان' }, timeSlot: 'الفترة المسائية', status: 'AVAILABLE', dayOfWeek: 'FRIDAY', shiftType: 'EVENING' }
];

export const generalWeeklySchedule: DailySchedule[] = [
  {
    dayKey: 'MONDAY',
    dayName: { en: 'Monday', ar: 'الإثنين' },
    doctors: [
      { id: 'mon-1', name: 'د/ أحمد غريب', specialtyId: 'dept-cardiology', specialtyName: { en: 'Cardiology', ar: 'القلب' }, timeSlot: '2:30 و عيادته 9:30', status: 'AVAILABLE', dayOfWeek: 'MONDAY' },
      { id: 'mon-2', name: 'د/ محمود بهنسي', specialtyId: 'dept-ophthalmology', specialtyName: { en: 'Ophthalmology', ar: 'الرمد' }, timeSlot: '8:30 مساءً', status: 'AVAILABLE', statusNote: '35 حالة فقط', dayOfWeek: 'MONDAY' },
      { id: 'mon-3', name: 'د/ جنة مصطفى', specialtyId: 'dept-pediatrics', specialtyName: { en: 'Pediatrics', ar: 'الأطفال' }, timeSlot: '1:30 ظهراً', status: 'AVAILABLE', dayOfWeek: 'MONDAY' },
      { id: 'mon-4', name: 'د/ عمرو أبو العزم', specialtyId: 'dept-pediatrics', specialtyName: { en: 'Pediatrics', ar: 'الأطفال' }, timeSlot: '4:30 مساءً', status: 'AVAILABLE', dayOfWeek: 'MONDAY' },
      { id: 'mon-5', name: 'د/ أحمد عبد الموجود', specialtyId: 'dept-pediatrics', specialtyName: { en: 'Pediatrics', ar: 'الأطفال' }, timeSlot: '6:00 مساءً', status: 'AVAILABLE', dayOfWeek: 'MONDAY' },
      { id: 'mon-6', name: 'د/ محمود طاحون', specialtyId: 'dept-pediatrics', specialtyName: { en: 'Pediatrics', ar: 'الأطفال' }, timeSlot: '10:00 مساءً', status: 'AVAILABLE', dayOfWeek: 'MONDAY' },
      { id: 'mon-7', name: 'د/ تامر النشار', specialtyId: 'dept-general-surgery', specialtyName: { en: 'General Surgery', ar: 'الجراحة العامة' }, timeSlot: '6:00 مساءً', status: 'AVAILABLE', dayOfWeek: 'MONDAY' },
      { id: 'mon-8', name: 'د/ علي حسين', specialtyId: 'dept-general-surgery', specialtyName: { en: 'General Surgery', ar: 'الجراحة العامة' }, timeSlot: '9:00 مساءً', status: 'AVAILABLE', dayOfWeek: 'MONDAY' },
      { id: 'mon-9', name: 'د/ أحمد عبد الغني', specialtyId: 'dept-orthopedics', specialtyName: { en: 'Orthopedics', ar: 'العظام' }, timeSlot: '8:00 مساءً', status: 'AVAILABLE', dayOfWeek: 'MONDAY' },
      { id: 'mon-10', name: 'د/ أحمد درغام', specialtyId: 'dept-orthopedics', specialtyName: { en: 'Orthopedics', ar: 'العظام' }, timeSlot: '9:30 مساءً', status: 'FULL', statusNote: 'اكتمل العدد', dayOfWeek: 'MONDAY' },
      { id: 'mon-11', name: 'د/ أيمن محمد', specialtyId: 'dept-internal', specialtyName: { en: 'Internal Medicine', ar: 'الباطنة العامة' }, timeSlot: '3:00 ظهراً', status: 'AVAILABLE', dayOfWeek: 'MONDAY' },
      { id: 'mon-12', name: 'د/ محمد عمر', specialtyId: 'dept-internal', specialtyName: { en: 'Internal Medicine', ar: 'الباطنة العامة' }, timeSlot: 'معتذر', status: 'APOLOGIZED', dayOfWeek: 'MONDAY' },
      { id: 'mon-13', name: 'د/ محمد يوسف', specialtyId: 'dept-internal', specialtyName: { en: 'Internal Medicine', ar: 'الباطنة والسكر' }, timeSlot: '6:30 مساءً', status: 'AVAILABLE', statusNote: 'باطنة وسكر', dayOfWeek: 'MONDAY' },
      { id: 'mon-14', name: 'د/ محمد سعيد', specialtyId: 'dept-internal', specialtyName: { en: 'Nephrology & Internal', ar: 'باطنة وكلى' }, timeSlot: 'حجز مسبق', status: 'PRIOR_RESERVATION', statusNote: 'خارج التأمين', dayOfWeek: 'MONDAY' },
      { id: 'mon-15', name: 'د/ أحمد أبو زيد', specialtyId: 'dept-dermatology', specialtyName: { en: 'Dermatology', ar: 'الجلدية' }, timeSlot: 'معتذر', status: 'APOLOGIZED', dayOfWeek: 'MONDAY' },
      { id: 'mon-16', name: 'د/ آية جاد', specialtyId: 'dept-dermatology', specialtyName: { en: 'Dermatology', ar: 'الجلدية' }, timeSlot: 'معتذرة', status: 'APOLOGIZED', dayOfWeek: 'MONDAY' },
      { id: 'mon-17', name: 'د/ محمد فؤاد', specialtyId: 'dept-dermatology', specialtyName: { en: 'Dermatology', ar: 'الجلدية' }, timeSlot: '8:00 مساءً', status: 'AVAILABLE', dayOfWeek: 'MONDAY' },
      { id: 'mon-18', name: 'د/ هيثم الخليلي', specialtyId: 'dept-ent', specialtyName: { en: 'ENT', ar: 'أنف وأذن وحنجرة' }, timeSlot: '3:30 مساءً', status: 'AVAILABLE', dayOfWeek: 'MONDAY' },
      { id: 'mon-19', name: 'د/ مصطفى حسام', specialtyId: 'dept-ent', specialtyName: { en: 'ENT', ar: 'أنف وأذن وحنجرة' }, timeSlot: '9:30 مساءً', status: 'AVAILABLE', dayOfWeek: 'MONDAY' },
      { id: 'mon-20', name: 'د/ معاذ مهران', specialtyId: 'dept-obgyn', specialtyName: { en: 'OB-GYN', ar: 'نساء وتوليد' }, timeSlot: '5:30 مساءً', status: 'AVAILABLE', dayOfWeek: 'MONDAY' },
      { id: 'mon-21', name: 'د/ إيمان خفاجي', specialtyId: 'dept-obgyn', specialtyName: { en: 'OB-GYN', ar: 'نساء وتوليد' }, timeSlot: '7:00 مساءً', status: 'AVAILABLE', dayOfWeek: 'MONDAY' },
      { id: 'mon-22', name: 'د/ خالد مهران', specialtyId: 'dept-obgyn', specialtyName: { en: 'OB-GYN', ar: 'نساء وتوليد' }, timeSlot: '10:00 مساءً', status: 'AVAILABLE', dayOfWeek: 'MONDAY' },
      { id: 'mon-23', name: 'د/ نشأت سلامه', specialtyId: 'dept-urology', specialtyName: { en: 'Urology', ar: 'المسالك البولية' }, timeSlot: '2:30 ظهراً', status: 'AVAILABLE', dayOfWeek: 'MONDAY' },
      { id: 'mon-24', name: 'د/ محمد سمير', specialtyId: 'dept-urology', specialtyName: { en: 'Urology', ar: 'المسالك البولية' }, timeSlot: '6:30 مساءً', status: 'AVAILABLE', dayOfWeek: 'MONDAY' },
      { id: 'mon-25', name: 'د/ منه غريب', specialtyId: 'dept-physio', specialtyName: { en: 'Physical Therapy', ar: 'العلاج الطبيعي' }, timeSlot: '1:00 ظهراً', status: 'AVAILABLE', statusNote: 'خارج التأمين', dayOfWeek: 'MONDAY' },
      { id: 'mon-26', name: 'د/ سامي الخياط', specialtyId: 'dept-physio', specialtyName: { en: 'Physical Therapy', ar: 'العلاج الطبيعي' }, timeSlot: '8:00 مساءً', status: 'AVAILABLE', dayOfWeek: 'MONDAY' },
      { id: 'mon-27', name: 'د/ دينا سعد', specialtyId: 'dept-chest', specialtyName: { en: 'Pulmonology', ar: 'أمراض صدرية' }, timeSlot: '8:30 مساءً', status: 'AVAILABLE', dayOfWeek: 'MONDAY' },
      { id: 'mon-28', name: 'د/ محمد عيد', specialtyId: 'dept-neurology', specialtyName: { en: 'Neurology', ar: 'مخ وأعصاب' }, timeSlot: '10:00 مساءً', status: 'AVAILABLE', dayOfWeek: 'MONDAY' },
      { id: 'mon-29', name: 'د/ بهاء الرفاعي', specialtyId: 'dept-sonar', specialtyName: { en: 'Ultrasound', ar: 'السونار' }, timeSlot: '9:00 مساءً', status: 'AVAILABLE', statusNote: 'خارج التأمين', dayOfWeek: 'MONDAY' },
      { id: 'mon-30', name: 'د/ إيهاب سراج الدين', specialtyId: 'dept-oncology', specialtyName: { en: 'Oncology', ar: 'أورام' }, timeSlot: 'حجز مسبق', status: 'PRIOR_RESERVATION', dayOfWeek: 'MONDAY' },
      { id: 'mon-31', name: 'د/ أمل محمود', specialtyId: 'dept-speech', specialtyName: { en: 'Speech Therapy', ar: 'التخاطب' }, timeSlot: 'حجز مسبق', status: 'PRIOR_RESERVATION', statusNote: 'خارج التأمين', dayOfWeek: 'MONDAY' },
      { id: 'mon-32', name: 'د/ شيماء حسن', specialtyId: 'dept-psychiatry', specialtyName: { en: 'Psychiatry', ar: 'نفسية' }, timeSlot: 'حجز مسبق', status: 'PRIOR_RESERVATION', statusNote: 'خارج التأمين', dayOfWeek: 'MONDAY' }
    ]
  },
  {
    dayKey: 'TUESDAY',
    dayName: { en: 'Tuesday', ar: 'الثلاثاء' },
    doctors: [
      { id: 'tue-1', name: 'د/ إاسلام عبيد', specialtyId: 'dept-cardiology', specialtyName: { en: 'Cardiology', ar: 'القلب' }, timeSlot: 'معتذر', status: 'APOLOGIZED', dayOfWeek: 'TUESDAY' },
      { id: 'tue-2', name: 'د/ أحمد غريب', specialtyId: 'dept-cardiology', specialtyName: { en: 'Cardiology', ar: 'القلب' }, timeSlot: '9:30 مساءً', status: 'AVAILABLE', dayOfWeek: 'TUESDAY' },
      { id: 'tue-3', name: 'د/ أيمن جاب الله', specialtyId: 'dept-general-surgery', specialtyName: { en: 'General Surgery', ar: 'الجراحة العامة' }, timeSlot: '6:00 مساءً', status: 'AVAILABLE', dayOfWeek: 'TUESDAY' },
      { id: 'tue-4', name: 'د/ عادل إمام', specialtyId: 'dept-general-surgery', specialtyName: { en: 'General Surgery', ar: 'الجراحة العامة' }, timeSlot: 'معتذر', status: 'APOLOGIZED', dayOfWeek: 'TUESDAY' },
      { id: 'tue-5', name: 'د/ ياسر الباز', specialtyId: 'dept-general-surgery', specialtyName: { en: 'General Surgery', ar: 'الجراحة العامة' }, timeSlot: 'معتذر', status: 'APOLOGIZED', dayOfWeek: 'TUESDAY' },
      { id: 'tue-6', name: 'د/ عمرو أبو العزم', specialtyId: 'dept-pediatrics', specialtyName: { en: 'Pediatrics', ar: 'الأطفال' }, timeSlot: '4:30 مساءً', status: 'AVAILABLE', dayOfWeek: 'TUESDAY' },
      { id: 'tue-7', name: 'د/ أحمد عبد الموجود', specialtyId: 'dept-pediatrics', specialtyName: { en: 'Pediatrics', ar: 'الأطفال' }, timeSlot: '6:00 مساءً', status: 'AVAILABLE', dayOfWeek: 'TUESDAY' },
      { id: 'tue-8', name: 'د/ محمود طاحون', specialtyId: 'dept-pediatrics', specialtyName: { en: 'Pediatrics', ar: 'الأطفال' }, timeSlot: '10:00 مساءً', status: 'AVAILABLE', dayOfWeek: 'TUESDAY' },
      { id: 'tue-9', name: 'د/ محمود يسري', specialtyId: 'dept-pediatrics', specialtyName: { en: 'Pediatrics', ar: 'الأطفال' }, timeSlot: '10:30 مساءً', status: 'AVAILABLE', dayOfWeek: 'TUESDAY' },
      { id: 'tue-10', name: 'د/ محمود بهنسي', specialtyId: 'dept-ophthalmology', specialtyName: { en: 'Ophthalmology', ar: 'الرمد' }, timeSlot: '5:30 مساءً', status: 'AVAILABLE', statusNote: '20 حالة فقط', dayOfWeek: 'TUESDAY' },
      { id: 'tue-11', name: 'د/ عمر إبراهيم', specialtyId: 'dept-ophthalmology', specialtyName: { en: 'Ophthalmology', ar: 'الرمد' }, timeSlot: 'معتذر', status: 'APOLOGIZED', dayOfWeek: 'TUESDAY' },
      { id: 'tue-12', name: 'د/ محمد نبيل', specialtyId: 'dept-orthopedics', specialtyName: { en: 'Orthopedics', ar: 'العظام' }, timeSlot: '9:30 مساءً', status: 'AVAILABLE', dayOfWeek: 'TUESDAY' },
      { id: 'tue-13', name: 'د/ أيمن محمد', specialtyId: 'dept-internal', specialtyName: { en: 'Internal Medicine', ar: 'الباطنة العامة' }, timeSlot: '3:00 ظهراً', status: 'AVAILABLE', dayOfWeek: 'TUESDAY' },
      { id: 'tue-14', name: 'د/ محمد عمر', specialtyId: 'dept-internal', specialtyName: { en: 'Internal Medicine', ar: 'الباطنة العامة' }, timeSlot: 'معتذر', status: 'APOLOGIZED', dayOfWeek: 'TUESDAY' },
      { id: 'tue-15', name: 'د/ محمد يوسف', specialtyId: 'dept-internal', specialtyName: { en: 'Internal Medicine', ar: 'الباطنة والسكر' }, timeSlot: '6:30 مساءً', status: 'AVAILABLE', dayOfWeek: 'TUESDAY' },
      { id: 'tue-16', name: 'د/ محمد سعيد', specialtyId: 'dept-internal', specialtyName: { en: 'Nephrology & Internal', ar: 'باطنة وكلى' }, timeSlot: 'حجز مسبق', status: 'PRIOR_RESERVATION', dayOfWeek: 'TUESDAY' },
      { id: 'tue-17', name: 'د/ أحمد حامد', specialtyId: 'dept-dermatology', specialtyName: { en: 'Dermatology', ar: 'الجلدية' }, timeSlot: '9:00 مساءً', status: 'AVAILABLE', dayOfWeek: 'TUESDAY' },
      { id: 'tue-18', name: 'د/ هيثم الخليلي', specialtyId: 'dept-ent', specialtyName: { en: 'ENT & Audiology', ar: 'أنف وأذن وحنجرة وسمعيات' }, timeSlot: '3:30 و عيادته 9:30', status: 'AVAILABLE', dayOfWeek: 'TUESDAY' },
      { id: 'tue-19', name: 'د/ محمد عبد اللطيف', specialtyId: 'dept-ent', specialtyName: { en: 'ENT', ar: 'أنف وأذن وحنجرة' }, timeSlot: 'معتذر', status: 'APOLOGIZED', dayOfWeek: 'TUESDAY' },
      { id: 'tue-20', name: 'د/ معاذ مهران', specialtyId: 'dept-obgyn', specialtyName: { en: 'OB-GYN', ar: 'نساء وتوليد' }, timeSlot: '4:00 مساءً', status: 'AVAILABLE', dayOfWeek: 'TUESDAY' },
      { id: 'tue-21', name: 'د/ منال السيد', specialtyId: 'dept-obgyn', specialtyName: { en: 'OB-GYN', ar: 'نساء وتوليد' }, timeSlot: '6:00 مساءً', status: 'AVAILABLE', dayOfWeek: 'TUESDAY' },
      { id: 'tue-22', name: 'د/ خالد مهران', specialtyId: 'dept-obgyn', specialtyName: { en: 'OB-GYN', ar: 'نساء وتوليد' }, timeSlot: '10:00 مساءً', status: 'AVAILABLE', dayOfWeek: 'TUESDAY' },
      { id: 'tue-23', name: 'د/ طارق يحيى', specialtyId: 'dept-urology', specialtyName: { en: 'Urology', ar: 'المسالك البولية' }, timeSlot: 'معتذر', status: 'APOLOGIZED', dayOfWeek: 'TUESDAY' },
      { id: 'tue-24', name: 'د/ مريم أيمن', specialtyId: 'dept-physio', specialtyName: { en: 'Physical Therapy', ar: 'العلاج الطبيعي' }, timeSlot: '2:00 ظهراً', status: 'AVAILABLE', dayOfWeek: 'TUESDAY' },
      { id: 'tue-25', name: 'د/ منه غريب', specialtyId: 'dept-physio', specialtyName: { en: 'Physical Therapy', ar: 'العلاج الطبيعي' }, timeSlot: '8:30 مساءً', status: 'AVAILABLE', dayOfWeek: 'TUESDAY' },
      { id: 'tue-26', name: 'د/ بهاء الرفاعي', specialtyId: 'dept-sonar', specialtyName: { en: 'Ultrasound', ar: 'السونار' }, timeSlot: 'معتذر', status: 'APOLOGIZED', dayOfWeek: 'TUESDAY' },
      { id: 'tue-27', name: 'د/ محمد عبد السلام', specialtyId: 'dept-nutrition', specialtyName: { en: 'Obesity & Clinical Nutrition', ar: 'السمنة والنحافة' }, timeSlot: '6:30 مساءً', status: 'AVAILABLE', statusNote: 'خارج التأمين', dayOfWeek: 'TUESDAY' },
      { id: 'tue-28', name: 'د/ مها عبد الجليل', specialtyId: 'dept-nutrition', specialtyName: { en: 'Obesity & Clinical Nutrition', ar: 'السمنة والنحافة' }, timeSlot: '9:00 مساءً', status: 'AVAILABLE', statusNote: 'خارج التأمين', dayOfWeek: 'TUESDAY' },
      { id: 'tue-29', name: 'د/ أمير صبحي', specialtyId: 'dept-chest', specialtyName: { en: 'Pulmonology', ar: 'أمراض صدرية' }, timeSlot: '7:00 مساءً', status: 'AVAILABLE', dayOfWeek: 'TUESDAY' },
      { id: 'tue-30', name: 'د/ إيهاب سراج الدين', specialtyId: 'dept-oncology', specialtyName: { en: 'Oncology', ar: 'أورام' }, timeSlot: 'حجز مسبق', status: 'PRIOR_RESERVATION', dayOfWeek: 'TUESDAY' },
      { id: 'tue-31', name: 'د/ أسامة أبو الحسن', specialtyId: 'dept-hematology', specialtyName: { en: 'Hematology', ar: 'أمراض دم' }, timeSlot: 'حجز مسبق', status: 'PRIOR_RESERVATION', statusNote: 'خارج التأمين', dayOfWeek: 'TUESDAY' },
      { id: 'tue-32', name: 'د/ مصطفى الرزاز', specialtyId: 'dept-hematology', specialtyName: { en: 'Hematology', ar: 'أمراض دم' }, timeSlot: 'حجز مسبق', status: 'PRIOR_RESERVATION', statusNote: 'خارج التأمين', dayOfWeek: 'TUESDAY' },
      { id: 'tue-33', name: 'د/ شيماء حسن', specialtyId: 'dept-psychiatry', specialtyName: { en: 'Psychiatry', ar: 'نفسية' }, timeSlot: 'حجز مسبق', status: 'PRIOR_RESERVATION', statusNote: 'خارج التأمين', dayOfWeek: 'TUESDAY' },
      { id: 'tue-34', name: 'د/ عزة عبد السلام', specialtyId: 'dept-rheumatology', specialtyName: { en: 'Rheumatology & Neuro', ar: 'أمراض روماتيزم ومخ وعصب' }, timeSlot: 'حجز مسبق', status: 'PRIOR_RESERVATION', dayOfWeek: 'TUESDAY' }
    ]
  },
  {
    dayKey: 'WEDNESDAY',
    dayName: { en: 'Wednesday', ar: 'الأربعاء' },
    doctors: [
      { id: 'wed-1', name: 'د/ أحمد غريب', specialtyId: 'dept-cardiology', specialtyName: { en: 'Cardiology', ar: 'القلب' }, timeSlot: '2:30 و عيادته 9:30', status: 'AVAILABLE', dayOfWeek: 'WEDNESDAY' },
      { id: 'wed-2', name: 'د/ محمود بهنسي', specialtyId: 'dept-ophthalmology', specialtyName: { en: 'Ophthalmology', ar: 'الرمد' }, timeSlot: '5:30 مساءً', status: 'AVAILABLE', statusNote: '20 حالة فقط', dayOfWeek: 'WEDNESDAY' },
      { id: 'wed-3', name: 'د/ عمر إبراهيم', specialtyId: 'dept-ophthalmology', specialtyName: { en: 'Ophthalmology', ar: 'الرمد' }, timeSlot: '9:00 مساءً', status: 'AVAILABLE', dayOfWeek: 'WEDNESDAY' },
      { id: 'wed-4', name: 'د/ جنة مصطفى', specialtyId: 'dept-pediatrics', specialtyName: { en: 'Pediatrics', ar: 'الأطفال' }, timeSlot: 'معتذرة', status: 'APOLOGIZED', dayOfWeek: 'WEDNESDAY' },
      { id: 'wed-5', name: 'د/ عمرو أبو العزم', specialtyId: 'dept-pediatrics', specialtyName: { en: 'Pediatrics', ar: 'الأطفال' }, timeSlot: '4:30 مساءً', status: 'AVAILABLE', dayOfWeek: 'WEDNESDAY' },
      { id: 'wed-6', name: 'د/ أحمد عبد الموجود', specialtyId: 'dept-pediatrics', specialtyName: { en: 'Pediatrics', ar: 'الأطفال' }, timeSlot: '6:00 مساءً', status: 'AVAILABLE', dayOfWeek: 'WEDNESDAY' },
      { id: 'wed-7', name: 'د/ محمود طاحون', specialtyId: 'dept-pediatrics', specialtyName: { en: 'Pediatrics', ar: 'الأطفال' }, timeSlot: '9:00 مساءً', status: 'AVAILABLE', dayOfWeek: 'WEDNESDAY' },
      { id: 'wed-8', name: 'د/ تامر النشار', specialtyId: 'dept-general-surgery', specialtyName: { en: 'General Surgery', ar: 'الجراحة العامة' }, timeSlot: '7:00 مساءً', status: 'AVAILABLE', dayOfWeek: 'WEDNESDAY' },
      { id: 'wed-9', name: 'د/ عمرو الدرس', specialtyId: 'dept-orthopedics', specialtyName: { en: 'Orthopedics', ar: 'العظام' }, timeSlot: '8:30 مساءً', status: 'AVAILABLE', dayOfWeek: 'WEDNESDAY' },
      { id: 'wed-10', name: 'د/ أيمن محمد', specialtyId: 'dept-internal', specialtyName: { en: 'Internal Medicine', ar: 'الباطنة العامة' }, timeSlot: '3:00 ظهراً', status: 'AVAILABLE', dayOfWeek: 'WEDNESDAY' },
      { id: 'wed-11', name: 'د/ محمد يوسف', specialtyId: 'dept-internal', specialtyName: { en: 'Internal Medicine', ar: 'الباطنة والسكر' }, timeSlot: '6:30 مساءً', status: 'AVAILABLE', statusNote: 'باطنة وسكر', dayOfWeek: 'WEDNESDAY' },
      { id: 'wed-12', name: 'د/ نرمين', specialtyId: 'dept-internal', specialtyName: { en: 'Internal Medicine', ar: 'الباطنة العامة' }, timeSlot: '6:00 مساءً', status: 'AVAILABLE', dayOfWeek: 'WEDNESDAY' },
      { id: 'wed-13', name: 'د/ محمد سعيد', specialtyId: 'dept-internal', specialtyName: { en: 'Nephrology & Internal', ar: 'باطنة وكلى' }, timeSlot: 'حجز مسبق', status: 'PRIOR_RESERVATION', statusNote: 'خارج التأمين', dayOfWeek: 'WEDNESDAY' },
      { id: 'wed-14', name: 'د/ أحمد أبو زيد', specialtyId: 'dept-dermatology', specialtyName: { en: 'Dermatology', ar: 'الجلدية' }, timeSlot: '1:00 ظهراً', status: 'AVAILABLE', dayOfWeek: 'WEDNESDAY' },
      { id: 'wed-15', name: 'د/ كريم رضا', specialtyId: 'dept-dermatology', specialtyName: { en: 'Dermatology', ar: 'الجلدية' }, timeSlot: '6:00 مساءً', status: 'AVAILABLE', dayOfWeek: 'WEDNESDAY' },
      { id: 'wed-16', name: 'د/ آية جاد', specialtyId: 'dept-dermatology', specialtyName: { en: 'Dermatology', ar: 'الجلدية' }, timeSlot: 'معتذرة', status: 'APOLOGIZED', dayOfWeek: 'WEDNESDAY' },
      { id: 'wed-17', name: 'د/ هيثم الخليلي', specialtyId: 'dept-ent', specialtyName: { en: 'ENT', ar: 'أنف وأذن وحنجرة' }, timeSlot: '3:30 مساءً', status: 'AVAILABLE', dayOfWeek: 'WEDNESDAY' },
      { id: 'wed-18', name: 'د/ محمود عبد الرحمن', specialtyId: 'dept-ent', specialtyName: { en: 'ENT', ar: 'أنف وأذن وحنجرة' }, timeSlot: '8:00 مساءً', status: 'AVAILABLE', dayOfWeek: 'WEDNESDAY' },
      { id: 'wed-19', name: 'د/ رشا سمير', specialtyId: 'dept-obgyn', specialtyName: { en: 'OB-GYN', ar: 'نساء وتوليد' }, timeSlot: '4:00 مساءً', status: 'AVAILABLE', dayOfWeek: 'WEDNESDAY' },
      { id: 'wed-20', name: 'د/ معاذ مهران', specialtyId: 'dept-obgyn', specialtyName: { en: 'OB-GYN', ar: 'نساء وتوليد' }, timeSlot: '6:00 مساءً', status: 'AVAILABLE', dayOfWeek: 'WEDNESDAY' },
      { id: 'wed-21', name: 'د/ خالد مهران', specialtyId: 'dept-obgyn', specialtyName: { en: 'OB-GYN', ar: 'نساء وتوليد' }, timeSlot: '10:00 مساءً', status: 'AVAILABLE', dayOfWeek: 'WEDNESDAY' },
      { id: 'wed-22', name: 'د/ طارق يحيى', specialtyId: 'dept-urology', specialtyName: { en: 'Urology', ar: 'المسالك البولية' }, timeSlot: '10:00 مساءً', status: 'AVAILABLE', dayOfWeek: 'WEDNESDAY' },
      { id: 'wed-23', name: 'د/ محمد عيد', specialtyId: 'dept-neurology', specialtyName: { en: 'Neurology', ar: 'مخ وأعصاب' }, timeSlot: '10:00 مساءً', status: 'AVAILABLE', dayOfWeek: 'WEDNESDAY' },
      { id: 'wed-24', name: 'د/ بهاء الرفاعي', specialtyId: 'dept-sonar', specialtyName: { en: 'Ultrasound', ar: 'السونار' }, timeSlot: 'معتذر', status: 'APOLOGIZED', dayOfWeek: 'WEDNESDAY' },
      { id: 'wed-25', name: 'د/ منه غريب', specialtyId: 'dept-physio', specialtyName: { en: 'Physical Therapy', ar: 'العلاج الطبيعي' }, timeSlot: '1:00 ظهراً', status: 'AVAILABLE', dayOfWeek: 'WEDNESDAY' },
      { id: 'wed-26', name: 'د/ سامي الخياط', specialtyId: 'dept-physio', specialtyName: { en: 'Physical Therapy', ar: 'العلاج الطبيعي' }, timeSlot: '8:30 مساءً', status: 'AVAILABLE', dayOfWeek: 'WEDNESDAY' },
      { id: 'wed-27', name: 'د/ محمد عبد السلام', specialtyId: 'dept-chest', specialtyName: { en: 'Pulmonology', ar: 'أمراض صدرية' }, timeSlot: '6:30 مساءً', status: 'AVAILABLE', dayOfWeek: 'WEDNESDAY' },
      { id: 'wed-28', name: 'د/ مها عبد الجليل', specialtyId: 'dept-chest', specialtyName: { en: 'Pulmonology', ar: 'أمراض صدرية' }, timeSlot: '9:00 مساءً', status: 'AVAILABLE', dayOfWeek: 'WEDNESDAY' },
      { id: 'wed-29', name: 'د/ طاهر', specialtyId: 'dept-immunology', specialtyName: { en: 'Immunology', ar: 'مناعة' }, timeSlot: '8:00 مساءً', status: 'AVAILABLE', statusNote: 'خارج التأمين', dayOfWeek: 'WEDNESDAY' },
      { id: 'wed-30', name: 'د/ عمر المختار', specialtyId: 'dept-vascular', specialtyName: { en: 'Vascular Surgery', ar: 'أوعية دموية' }, timeSlot: '10:00 مساءً', status: 'AVAILABLE', statusNote: 'خارج التأمين', dayOfWeek: 'WEDNESDAY' },
      { id: 'wed-31', name: 'د/ إيهاب سراج الدين', specialtyId: 'dept-oncology', specialtyName: { en: 'Oncology', ar: 'أورام' }, timeSlot: 'حجز مسبق', status: 'PRIOR_RESERVATION', dayOfWeek: 'WEDNESDAY' },
      { id: 'wed-32', name: 'د/ شيماء حسن', specialtyId: 'dept-psychiatry', specialtyName: { en: 'Psychiatry', ar: 'نفسية' }, timeSlot: 'حجز مسبق', status: 'PRIOR_RESERVATION', dayOfWeek: 'WEDNESDAY' },
      { id: 'wed-33', name: 'د/ عزة عبد السلام', specialtyId: 'dept-rheumatology', specialtyName: { en: 'Rheumatology', ar: 'أمراض روماتيزم' }, timeSlot: 'حجز مسبق', status: 'PRIOR_RESERVATION', dayOfWeek: 'WEDNESDAY' },
      { id: 'wed-34', name: 'د/ أحمد نعيم', specialtyId: 'dept-eeg-emg', specialtyName: { en: 'EEG & EMG', ar: 'رسم مخ ورسم عصب' }, timeSlot: 'حجز مسبق', status: 'PRIOR_RESERVATION', dayOfWeek: 'WEDNESDAY' }
    ]
  },
  {
    dayKey: 'THURSDAY',
    dayName: { en: 'Thursday', ar: 'الخميس' },
    doctors: [
      { id: 'thu-1', name: 'د/ أحمد غريب', specialtyId: 'dept-cardiology', specialtyName: { en: 'Cardiology', ar: 'القلب' }, timeSlot: '2:30 و عيادته 9:30', status: 'AVAILABLE', dayOfWeek: 'THURSDAY' },
      { id: 'thu-2', name: 'د/ أيمن جاب الله', specialtyId: 'dept-general-surgery', specialtyName: { en: 'General Surgery', ar: 'الجراحة العامة' }, timeSlot: 'معتذر', status: 'APOLOGIZED', dayOfWeek: 'THURSDAY' },
      { id: 'thu-3', name: 'د/ تامر النشار', specialtyId: 'dept-general-surgery', specialtyName: { en: 'General Surgery', ar: 'الجراحة العامة' }, timeSlot: '6:00 مساءً', status: 'AVAILABLE', dayOfWeek: 'THURSDAY' },
      { id: 'thu-4', name: 'د/ عادل إمام', specialtyId: 'dept-general-surgery', specialtyName: { en: 'General Surgery', ar: 'الجراحة العامة' }, timeSlot: 'معتذر', status: 'APOLOGIZED', dayOfWeek: 'THURSDAY' },
      { id: 'thu-5', name: 'د/ عمرو أبو العزم', specialtyId: 'dept-pediatrics', specialtyName: { en: 'Pediatrics', ar: 'الأطفال' }, timeSlot: '4:30 مساءً', status: 'AVAILABLE', dayOfWeek: 'THURSDAY' },
      { id: 'thu-6', name: 'د/ أحمد عبد الموجود', specialtyId: 'dept-pediatrics', specialtyName: { en: 'Pediatrics', ar: 'الأطفال' }, timeSlot: '6:00 مساءً', status: 'AVAILABLE', dayOfWeek: 'THURSDAY' },
      { id: 'thu-7', name: 'د/ محمود طاحون', specialtyId: 'dept-pediatrics', specialtyName: { en: 'Pediatrics', ar: 'الأطفال' }, timeSlot: '9:00 مساءً', status: 'AVAILABLE', dayOfWeek: 'THURSDAY' },
      { id: 'thu-8', name: 'د/ محمود يسري', specialtyId: 'dept-pediatrics', specialtyName: { en: 'Pediatrics', ar: 'الأطفال' }, timeSlot: '10:30 مساءً', status: 'AVAILABLE', dayOfWeek: 'THURSDAY' },
      { id: 'thu-9', name: 'د/ محمود بهنسي', specialtyId: 'dept-ophthalmology', specialtyName: { en: 'Ophthalmology', ar: 'الرمد' }, timeSlot: '8:30 مساءً', status: 'AVAILABLE', statusNote: '35 حالة فقط', dayOfWeek: 'THURSDAY' },
      { id: 'thu-10', name: 'د/ محمد نبيل', specialtyId: 'dept-orthopedics', specialtyName: { en: 'Orthopedics', ar: 'العظام' }, timeSlot: 'معتذر', status: 'APOLOGIZED', dayOfWeek: 'THURSDAY' },
      { id: 'thu-11', name: 'د/ أحمد عبد الغني', specialtyId: 'dept-orthopedics', specialtyName: { en: 'Orthopedics', ar: 'العظام' }, timeSlot: '8:00 مساءً', status: 'AVAILABLE', dayOfWeek: 'THURSDAY' },
      { id: 'thu-12', name: 'د/ أيمن محمد', specialtyId: 'dept-internal', specialtyName: { en: 'Internal Medicine', ar: 'الباطنة العامة' }, timeSlot: 'معتذر', status: 'APOLOGIZED', dayOfWeek: 'THURSDAY' },
      { id: 'thu-13', name: 'د/ محمد يوسف', specialtyId: 'dept-internal', specialtyName: { en: 'Internal Medicine', ar: 'الباطنة والسكر' }, timeSlot: '6:30 مساءً', status: 'AVAILABLE', statusNote: 'باطنة وسكر', dayOfWeek: 'THURSDAY' },
      { id: 'thu-14', name: 'د/ نرمين', specialtyId: 'dept-internal', specialtyName: { en: 'Internal Medicine', ar: 'الباطنة العامة' }, timeSlot: '6:00 مساءً', status: 'AVAILABLE', dayOfWeek: 'THURSDAY' },
      { id: 'thu-15', name: 'د/ محمد سعيد', specialtyId: 'dept-internal', specialtyName: { en: 'Nephrology & Internal', ar: 'باطنة وكلى' }, timeSlot: 'حجز مسبق', status: 'PRIOR_RESERVATION', statusNote: 'خارج التأمين', dayOfWeek: 'THURSDAY' },
      { id: 'thu-16', name: 'د/ إيمان عبد الغفار', specialtyId: 'dept-dermatology', specialtyName: { en: 'Dermatology', ar: 'الجلدية' }, timeSlot: 'معتذرة', status: 'APOLOGIZED', dayOfWeek: 'THURSDAY' },
      { id: 'thu-17', name: 'د/ محمد عبد المولي', specialtyId: 'dept-dermatology', specialtyName: { en: 'Dermatology', ar: 'الجلدية' }, timeSlot: 'معتذر', status: 'APOLOGIZED', dayOfWeek: 'THURSDAY' },
      { id: 'thu-18', name: 'د/ هيثم الخليلي', specialtyId: 'dept-ent', specialtyName: { en: 'ENT', ar: 'أنف وأذن وحنجرة' }, timeSlot: '3:30 و عيادته 9:30', status: 'AVAILABLE', dayOfWeek: 'THURSDAY' },
      { id: 'thu-19', name: 'د/ معاذ مهران', specialtyId: 'dept-obgyn', specialtyName: { en: 'OB-GYN', ar: 'نساء وتوليد' }, timeSlot: '5:30 مساءً', status: 'AVAILABLE', dayOfWeek: 'THURSDAY' },
      { id: 'thu-20', name: 'د/ محمد سمير', specialtyId: 'dept-urology', specialtyName: { en: 'Urology', ar: 'المسالك البولية' }, timeSlot: '10:00 مساءً', status: 'AVAILABLE', dayOfWeek: 'THURSDAY' },
      { id: 'thu-21', name: 'د/ مريم أيمن', specialtyId: 'dept-physio', specialtyName: { en: 'Physical Therapy', ar: 'العلاج الطبيعي' }, timeSlot: '2:00 ظهراً', status: 'AVAILABLE', dayOfWeek: 'THURSDAY' },
      { id: 'thu-22', name: 'د/ منه غريب', specialtyId: 'dept-physio', specialtyName: { en: 'Physical Therapy', ar: 'العلاج الطبيعي' }, timeSlot: '8:30 مساءً', status: 'AVAILABLE', dayOfWeek: 'THURSDAY' },
      { id: 'thu-23', name: 'د/ بهاء الرفاعي', specialtyId: 'dept-sonar', specialtyName: { en: 'Ultrasound', ar: 'السونار' }, timeSlot: '9:30 مساءً', status: 'AVAILABLE', statusNote: 'خارج التأمين', dayOfWeek: 'THURSDAY' },
      { id: 'thu-24', name: 'د/ مصطفى الرزاز', specialtyId: 'dept-hematology', specialtyName: { en: 'Hematology', ar: 'أمراض دم' }, timeSlot: 'حجز مسبق', status: 'PRIOR_RESERVATION', statusNote: 'خارج التأمين', dayOfWeek: 'THURSDAY' },
      { id: 'thu-25', name: 'د/ دينا سعد الدين', specialtyId: 'dept-chest', specialtyName: { en: 'Pulmonology', ar: 'أمراض صدرية' }, timeSlot: '8:30 مساءً', status: 'AVAILABLE', dayOfWeek: 'THURSDAY' },
      { id: 'thu-26', name: 'د/ محمد مصطفى', specialtyId: 'dept-nutrition', specialtyName: { en: 'Obesity & Nutrition', ar: 'سمنة ونحافة' }, timeSlot: '4:00 مساءً', status: 'AVAILABLE', dayOfWeek: 'THURSDAY' },
      { id: 'thu-27', name: 'د/ عزة عبد السلام', specialtyId: 'dept-rheumatology', specialtyName: { en: 'Rheumatology', ar: 'أمراض روماتيزم' }, timeSlot: 'حجز مسبق', status: 'PRIOR_RESERVATION', dayOfWeek: 'THURSDAY' },
      { id: 'thu-28', name: 'د/ شيماء حسن', specialtyId: 'dept-psychiatry', specialtyName: { en: 'Psychiatry', ar: 'نفسية' }, timeSlot: 'حجز مسبق', status: 'PRIOR_RESERVATION', dayOfWeek: 'THURSDAY' },
      { id: 'thu-29', name: 'د/ عبد الرحمن فهمي', specialtyId: 'dept-neurology', specialtyName: { en: 'Neurology', ar: 'مخ وأعصاب' }, timeSlot: 'معتذر', status: 'APOLOGIZED', dayOfWeek: 'THURSDAY' },
      { id: 'thu-30', name: 'د/ إيهاب سراج الدين', specialtyId: 'dept-oncology', specialtyName: { en: 'Oncology', ar: 'أورام' }, timeSlot: 'حجز مسبق', status: 'PRIOR_RESERVATION', dayOfWeek: 'THURSDAY' }
    ]
  }
];

export const initialClinicsList: any[] = [];
export const initialSocialLinksList: any[] = [];
export const initialSiteSettingsList: any = {
  websiteTitle: { en: 'Dar El Yosser Hospital', ar: 'مستشفى وعيادات دار اليسر التخصصية' },
  contactPhone: '01030252002',
  contactEmail: 'info@darel-yosser.com',
  whatsappNumber: '+201030252002',
  clinicAddressMain: { en: 'El Obour City', ar: 'مدينة العبور - الحي الأول' },
  emergencyNotice: { en: 'Emergency 24/7', ar: 'طوارئ 24 ساعة' },
  disclaimerNotice: { en: 'Medical disclaimer', ar: 'المعلومات الطبية للتوعية العامة' }
};
export const initialAppointmentsList: any[] = [];
export const initialContactMessagesList: any[] = [];

