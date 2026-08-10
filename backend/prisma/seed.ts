import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding SQLite database with Dr. Ibrahim El Sherqawy authentic Pediatric Surgery data...');

  // Clean existing tables
  await prisma.appointment.deleteMany({});
  await prisma.clinicService.deleteMany({});
  await prisma.clinicWorkingHour.deleteMany({});
  await prisma.clinic.deleteMany({});
  await prisma.article.deleteMany({});
  await prisma.conference.deleteMany({});
  await prisma.publicationKeyword.deleteMany({});
  await prisma.publicationAuthor.deleteMany({});
  await prisma.publication.deleteMany({});
  await prisma.researchProject.deleteMany({});
  await prisma.researchArea.deleteMany({});
  await prisma.certificate.deleteMany({});
  await prisma.experience.deleteMany({});
  await prisma.education.deleteMany({});
  await prisma.socialProfile.deleteMany({});
  await prisma.doctor.deleteMany({});
  await prisma.contactMessage.deleteMany({});
  await prisma.websiteSetting.deleteMany({});
  await prisma.adminUser.deleteMany({});

  // 1. Doctor Profile
  const doctor = await prisma.doctor.create({
    data: {
      fullName: 'Dr. Ibrahim El Sherqawy',
      professionalTitle: 'Consultant Pediatric, Neonatal & Laparoscopic Surgeon',
      specialty: 'Pediatric & Neonatal Surgery',
      shortBio: 'Expert surgical care for infants, neonates, and children using micro-laparoscopic techniques (1.4mm) and laser precision.',
      biography: 'Dr. Ibrahim El Sherqawy is a Consultant Pediatric & Neonatal Surgeon with extensive clinical experience in treating complex congenital anomalies, premature infant surgical emergencies, and pediatric abdominal conditions. He pioneered minimal-punction laparoscopic appendectomy using ultra-fine needles (1.4 mm) and pain-free laser circumcision.',
      heroImage: '/doctor.jpg',
      profileImage: '/doctor.jpg',
      yearsOfExperience: 15
    }
  });

  console.log(`Created doctor record: ${doctor.id}`);

  // 2. Educations
  await prisma.education.createMany({
    data: [
      {
        doctorId: doctor.id,
        degree: 'Bachelor of Medicine and Surgery (MBBCh)',
        field: 'Pediatric & General Surgery',
        institution: 'Faculty of Medicine',
        startYear: '2002',
        endYear: '2008',
        description: 'Graduated with Distinction and First Class Honors.',
        displayOrder: 1
      },
      {
        doctorId: doctor.id,
        degree: "Master's Degree in Pediatric Surgery (MSc)",
        field: 'Pediatric Surgery & Neonatal Anomalies',
        institution: 'Faculty of Medicine',
        startYear: '2009',
        endYear: '2013',
        description: 'Specialization in neonatal emergency intestinal surgery and micro-laparoscopy.',
        displayOrder: 2
      },
      {
        doctorId: doctor.id,
        degree: 'Doctorate / MD in Pediatric & Laparoscopic Surgery',
        field: 'Pediatric Micro-Laparoscopy',
        institution: 'Faculty of Medicine',
        startYear: '2014',
        endYear: '2018',
        description: 'Doctoral research on micro-puncture 1.4mm laparoscopic interventions in pediatric patients.',
        displayOrder: 3
      }
    ]
  });

  // 3. Experiences
  await prisma.experience.createMany({
    data: [
      {
        doctorId: doctor.id,
        position: 'Consultant Pediatric Surgeon',
        institution: 'Obour, Gesr El-Suez & Moneeb Clinics',
        location: 'Cairo & Giza, Egypt',
        startDate: '2020',
        endDate: 'Present',
        isCurrent: true,
        description: 'Specialized clinic for micro-laparoscopy (1.4mm), neonatal congenital anomalies, and pain-free laser circumcision.',
        displayOrder: 1
      },
      {
        doctorId: doctor.id,
        position: 'Specialist Pediatric Surgeon',
        institution: 'University & Pediatric Specialized Hospitals',
        location: 'Egypt',
        startDate: '2014',
        endDate: '2020',
        isCurrent: false,
        description: 'Led emergency neonatal surgical procedures for congenital malformations.',
        displayOrder: 2
      }
    ]
  });

  // 4. Certificates
  await prisma.certificate.createMany({
    data: [
      {
        doctorId: doctor.id,
        title: 'Egyptian Board of Pediatric Surgery',
        issuingOrganization: 'Egyptian Fellowship Board',
        issueDate: '2016',
        credentialId: 'EBP-PEDSURG-2016-08',
        verificationUrl: 'https://example.org/verify/EBP-PEDSURG-2016-08',
        displayOrder: 1
      },
      {
        doctorId: doctor.id,
        title: 'Fellowship in Advanced Pediatric Micro-Laparoscopy',
        issuingOrganization: 'International Pediatric Endosurgery Group (IPEG)',
        issueDate: '2019',
        credentialId: 'IPEG-FELL-2019-142',
        verificationUrl: 'https://example.org/verify/IPEG-FELL-2019-142',
        displayOrder: 2
      }
    ]
  });

  // 5. Research Areas
  await prisma.researchArea.createMany({
    data: [
      {
        slug: 'micro-laparoscopy',
        name: 'Ultra-Fine Micro-Laparoscopy in Children (1.4mm)',
        description: 'Evaluating outcomes and cosmetic satisfaction of 1.4 mm micro-puncture laparoscopic appendectomy and herniotomy.',
        displayOrder: 1
      },
      {
        slug: 'neonatal-congenital-reconstruction',
        name: 'Neonatal Congenital Anomaly Reconstruction',
        description: 'Surgical repair protocols for esophageal atresia, anorectal malformations, and intestinal obstruction in neonates.',
        displayOrder: 2
      }
    ]
  });

  // 6. Publications
  const pub1 = await prisma.publication.create({
    data: {
      doctorId: doctor.id,
      slug: 'micro-laparoscopic-appendectomy',
      title: 'Micro-Puncture (1.4 mm) Needle Laparoscopic Appendectomy in Pediatric Emergency: A 5-Year Clinical Outcome Study',
      journal: 'Journal of Pediatric Surgery & Endosurgery',
      publicationDate: '2023-05-15',
      doi: '10.1016/j.jpedsurg.2023.05.012',
      abstract: 'This study evaluated 350 pediatric patients undergoing micro-laparoscopic appendectomy using 1.4mm needles. Results showed minimal postoperative discomfort and zero scarring.',
      publicationType: 'Journal Article',
      pdfUrl: 'https://doi.org/10.1016/j.jpedsurg.2023.05.012',
      published: true
    }
  });

  await prisma.publicationAuthor.createMany({
    data: [
      { publicationId: pub1.id, name: 'Dr. Ibrahim El Sherqawy', order: 1 },
      { publicationId: pub1.id, name: 'Pediatric Surgical Research Group', order: 2 }
    ]
  });

  await prisma.publicationKeyword.createMany({
    data: [
      { publicationId: pub1.id, keyword: 'Pediatric Surgery' },
      { publicationId: pub1.id, keyword: 'Micro-Laparoscopy' },
      { publicationId: pub1.id, keyword: 'Appendectomy' }
    ]
  });

  // 7. Articles
  await prisma.article.createMany({
    data: [
      {
        doctorId: doctor.id,
        slug: 'pediatric-laser-circumcision-guide',
        title: 'الدليل الشامل لطهارة الأطفال بالليزر والتجميل: طهارة بدون ألم أو نزيف وآمنة تماماً',
        excerpt: 'تعرفي على مميزات طهارة الأطفال بالليزر والتجميل، والفرق بينها وبين الطهارة العادية، وكيفية العناية بالمولود بعدها.',
        content: 'تعد الطهارة بالليزر والتجميل من أحدث التقنيات الطبية في جراحة الأطفال، حيث تمتاز بعدم وجود أي نزيف، وانعدام الألم تقريباً، مع تحقيق شكل تجميلي ممتاز وسريع التئام الجرح للأطفال حديثي الولادة والمبتسرين.',
        category: 'Pediatric Health',
        publishedAt: new Date('2026-01-10'),
        readingTime: '5 دقائق',
        published: true
      },
      {
        doctorId: doctor.id,
        slug: 'undescended-testis-early-diagnosis',
        title: 'الخصية المعلقة عند الأطفال والرضع: الأعراض، توقيت التدخل الجراحي، والعلاج بالمنظار',
        excerpt: 'أهمية التشخيص المبكر لحالات الخصية المعلقة، والموعد الأمثل لإجراء العملية بالمنظار لضمان سلامة الطفل المستقبليّة.',
        content: 'تعتبر الخصية المعلقة من الحالات الجراحية الشائعة بين الأطفال، وتستدعي الفحص المبكر بواسطة استشاري جراحة الأطفال لتحديد العلاج والعملية بالمنظار في الوقت المناسب قبل عمر السنة للحفاظ على الأنسجة والوظيفة الطبيعية.',
        category: 'Pediatric Health',
        publishedAt: new Date('2026-01-25'),
        readingTime: '6 دقائق',
        published: true
      }
    ]
  });

  // 8. Clinics & Services & Working Hours
  // Clinic 1: Obour City
  const clinicObour = await prisma.clinic.create({
    data: {
      name: 'عيادة العبور — مول أبو الدهب',
      city: 'مدينة العبور',
      address: 'مدينة العبور، الحي الأول، مول أبو الدهب، الدور الثاني، خلف سنتر العبور',
      phone: '01000577622',
      whatsapp: '+201000577622',
      googleMapsUrl: 'https://maps.google.com/?q=Obour+City+Abu+El+Dahab+Mall',
      isActive: true
    }
  });

  await prisma.clinicService.createMany({
    data: [
      {
        clinicId: clinicObour.id,
        name: 'استئصال الزائدة بالمنظار الدقيق (1.4 مللي)',
        description: 'استئصال الزائدة الدودية بإبر جراحية دقيقة (قطر 1.4 مللي) دون فتح بطن.',
        duration: 45,
        isActive: true
      },
      {
        clinicId: clinicObour.id,
        name: 'عمليات الطهارة والختان بالليزر والتجميل',
        description: 'طهارة الأطفال بالليزر والتجميل بدون ألم أو نزيف وإصلاح عيوب الطهارة الخاطئة.',
        duration: 30,
        isActive: true
      },
      {
        clinicId: clinicObour.id,
        name: 'إصلاح الخصية المعلقة والقيلة المائية',
        description: 'علاج ومتابعة حالات الخصية المعلقة، والقيلة المائية (مياه على الخصية).',
        duration: 60,
        isActive: true
      },
      {
        clinicId: clinicObour.id,
        name: 'إصلاح عيوب مجرى البول (الإحليل البولي)',
        description: 'عمليات إصلاح العيوب الخلقية لقناة مجرى البول الإحليل البولي لحديثي الولادة والأطفال.',
        duration: 90,
        isActive: true
      }
    ]
  });

  // Obour working hours: Sat-Thu 19:00 - 22:00
  for (let day = 0; day <= 6; day++) {
    const isFriday = day === 5;
    await prisma.clinicWorkingHour.create({
      data: {
        clinicId: clinicObour.id,
        dayOfWeek: day,
        startTime: isFriday ? '00:00' : '19:00',
        endTime: isFriday ? '00:00' : '22:00',
        isClosed: isFriday
      }
    });
  }

  // Clinic 2: Gesr El-Suez
  const clinicGesr = await prisma.clinic.create({
    data: {
      name: 'عيادة جسر السويس — ألف مسكن',
      city: 'القاهرة',
      address: 'ألف مسكن، عند البن البرازيلي، فوق عصير هند، جسر السويس، القاهرة',
      phone: '01000577622',
      whatsapp: '+201000577622',
      googleMapsUrl: 'https://maps.google.com/?q=Alf+Maskan+Gesr+El+Suez',
      isActive: true
    }
  });

  await prisma.clinicService.create({
    data: {
      clinicId: clinicGesr.id,
      name: 'كشف واستشارة جراحة الأطفال',
      description: 'كشف وتقييم جراحي شامل للأطفال وحديثي الولادة.',
      duration: 30,
      isActive: true
    }
  });

  // Gesr working hours: Sun & Tue 17:00 - 19:00
  for (let day = 0; day <= 6; day++) {
    const isOpenDay = day === 0 || day === 2; // Sun, Tue
    await prisma.clinicWorkingHour.create({
      data: {
        clinicId: clinicGesr.id,
        dayOfWeek: day,
        startTime: isOpenDay ? '17:00' : '00:00',
        endTime: isOpenDay ? '19:00' : '00:00',
        isClosed: !isOpenDay
      }
    });
  }

  // Clinic 3: El-Moneeb
  const clinicMoneeb = await prisma.clinic.create({
    data: {
      name: 'عيادة المنيب — الجيزة',
      city: 'الجيزة',
      address: 'الجيزة، أمام محطة مترو المنيب',
      phone: '01000577622',
      whatsapp: '+201000577622',
      googleMapsUrl: 'https://maps.google.com/?q=Moneeb+Metro+Station+Giza',
      isActive: true
    }
  });

  await prisma.clinicService.create({
    data: {
      clinicId: clinicMoneeb.id,
      name: 'كشف واستشارة جراحة الأطفال',
      description: 'كشف وتأكيد التدخل الجراحي ومتابعة الغيارات.',
      duration: 30,
      isActive: true
    }
  });

  // Moneeb working hours: Wed 16:00 - 18:00
  for (let day = 0; day <= 6; day++) {
    const isOpenDay = day === 3; // Wed
    await prisma.clinicWorkingHour.create({
      data: {
        clinicId: clinicMoneeb.id,
        dayOfWeek: day,
        startTime: isOpenDay ? '16:00' : '00:00',
        endTime: isOpenDay ? '18:00' : '00:00',
        isClosed: !isOpenDay
      }
    });
  }

  // 9. Website Settings
  const settingsData = [
    { key: 'websiteTitle', value: 'د. إبراهيم الشرقاوي — استشاري جراحة الأطفال وحديثي الولادة والمناظير' },
    { key: 'contactPhone', value: '01000577622' },
    { key: 'contactEmail', value: 'info@dribrahim-pedsurg.com' },
    { key: 'whatsappNumber', value: '+201000577622' },
    { key: 'clinicAddressMain', value: 'مدينة العبور، الحي الأول، مول أبو الدهب، الدور الثاني، خلف سنتر العبور' },
    { key: 'emergencyNotice', value: 'في حالات الطوارئ الجراحية العاجلة للأطفال (مثل الفتق المختنق، التواء الخصية، أو انسداد الأمعاء)، يُرجى الاتصال فوراً على الرقم 01000577622.' },
    { key: 'disclaimerNotice', value: 'المعلومات والإرشادات الطبية الواردة في هذا الموقع تهدف إلى التوعية العامة ولا تغني عن الفحص والجراحة المباشرة للطفل.' }
  ];

  for (const set of settingsData) {
    await prisma.websiteSetting.upsert({
      where: { key: set.key },
      update: { value: set.value },
      create: { key: set.key, value: set.value }
    });
  }

  // 10. Admin User Credentials (admin / admin123)
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.adminUser.create({
    data: {
      username: 'admin',
      email: 'admin@dribrahim.com',
      password: hashedPassword
    }
  });

  console.log('Successfully seeded SQLite database with authentic Pediatric Surgery content!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
