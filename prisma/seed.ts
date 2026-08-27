import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding SQLite database with Dr. Aml Mohamed Abd El-Sattar Hamada authentic data...');

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
      fullName: 'Dr. Aml Mohamed Abd El-Sattar Hamada',
      professionalTitle: 'Associate Professor of Human Anatomy & Embryology & OB-GYN Consultant',
      specialty: 'Human Anatomy & Embryology & Obstetrics & Gynecology',
      shortBio: 'Distinguished academic & clinical expertise in anatomy, embryology, cell histology, and obstetrics & gynecology care.',
      biography: 'Dr. Aml Mohamed Abd El-Sattar Hamada is an Associate Professor of Human Anatomy & Embryology at Tanta University Faculty of Medicine and Consultant of Obstetrics & Gynecology. She serves as Director of the Human Rights Unit and Director of the International Students Care Unit.',
      heroImage: '/doctor.jpg',
      profileImage: '/doctor.jpg',
      yearsOfExperience: 18
    }
  });

  console.log(`Created doctor record: ${doctor.id}`);

  // 2. Educations
  await prisma.education.createMany({
    data: [
      {
        doctorId: doctor.id,
        degree: 'Bachelor of Medicine and Surgery (MBBCh)',
        field: 'Medicine & Surgery (Excellent with High Honors)',
        institution: 'Faculty of Medicine — Tanta University',
        startYear: '2000',
        endYear: '2006',
        description: 'Graduated with High Distinction and Honors.',
        displayOrder: 1
      },
      {
        doctorId: doctor.id,
        degree: "Master's Degree in Human Anatomy & Embryology (MSc)",
        field: 'Human Anatomy & Embryology',
        institution: 'Faculty of Medicine — Tanta University',
        startYear: '2008',
        endYear: '2012',
        description: 'Master thesis on "Dermo anatomy and embryology".',
        displayOrder: 2
      },
      {
        doctorId: doctor.id,
        degree: 'Associate Professorship Promotion',
        field: 'Human Anatomy & Embryology',
        institution: 'Faculty of Medicine — Tanta University',
        startYear: '2017',
        endYear: '2024',
        description: 'Promoted to Associate Professor by university decision dated July 2024.',
        displayOrder: 3
      }
    ]
  });

  // 3. Experiences
  await prisma.experience.createMany({
    data: [
      {
        doctorId: doctor.id,
        position: 'Associate Professor (أستاذ مساعد)',
        institution: 'Faculty of Medicine — Tanta University',
        location: 'Tanta, Egypt',
        startDate: '2024',
        endDate: 'Present',
        isCurrent: true,
        description: 'Associate Professor of Human Anatomy & Embryology appointed July 2024 (effective June 2024).',
        displayOrder: 1
      },
      {
        doctorId: doctor.id,
        position: 'Director of Human Rights Unit (مدير وحدة حقوق الإنسان)',
        institution: 'Faculty of Medicine — Tanta University',
        location: 'Tanta, Egypt',
        startDate: '2025',
        endDate: 'Present',
        isCurrent: true,
        description: 'Appointed Director of Human Rights Unit on 11/11/2025.',
        displayOrder: 2
      },
      {
        doctorId: doctor.id,
        position: 'Director of International Students Care Unit (مدير وحدة رعاية الوافدين)',
        institution: 'Tanta University',
        location: 'Tanta, Egypt',
        startDate: '2023',
        endDate: 'Present',
        isCurrent: true,
        description: 'Appointed Director of International Students Care Unit on 16/01/2023.',
        displayOrder: 3
      },
      {
        doctorId: doctor.id,
        position: 'Lecturer (مدرس)',
        institution: 'Faculty of Medicine — Tanta University',
        location: 'Tanta, Egypt',
        startDate: '2017',
        endDate: '2024',
        isCurrent: false,
        description: 'Lecturer in Human Anatomy & Embryology appointed 31/10/2017.',
        displayOrder: 4
      },
      {
        doctorId: doctor.id,
        position: 'Assistant Lecturer (مدرس مساعد)',
        institution: 'Faculty of Medicine — Tanta University',
        location: 'Tanta, Egypt',
        startDate: '2013',
        endDate: '2017',
        isCurrent: false,
        description: 'Assistant Lecturer in Human Anatomy & Embryology appointed 19/01/2013.',
        displayOrder: 5
      },
      {
        doctorId: doctor.id,
        position: 'Demonstrator (معيد)',
        institution: 'Faculty of Medicine — Tanta University',
        location: 'Tanta, Egypt',
        startDate: '2008',
        endDate: '2013',
        isCurrent: false,
        description: 'Demonstrator in Human Anatomy & Embryology appointed 23/06/2008 (effective 03/08/2008).',
        displayOrder: 6
      }
    ]
  });

  // 4. Certificates
  await prisma.certificate.createMany({
    data: [
      {
        doctorId: doctor.id,
        title: 'Master’s Degree in Anatomy & Embryology',
        issuingOrganization: 'Tanta University Faculty of Medicine',
        issueDate: '2012',
        credentialId: 'MSc-ANAT-TANTA-2012',
        displayOrder: 1
      },
      {
        doctorId: doctor.id,
        title: 'MBBCh Bachelor of Medicine & Surgery (Excellent with Honors)',
        issuingOrganization: 'Tanta University Faculty of Medicine',
        issueDate: '2006',
        credentialId: 'MBBCh-TANTA-2006-HONORS',
        displayOrder: 2
      }
    ]
  });

  // 5. Research Areas
  await prisma.researchArea.createMany({
    data: [
      {
        slug: 'pcos-signaling',
        name: 'Polycystic Ovarian Syndrome & Signaling Pathways',
        description: 'Targeting PI3K/Akt signaling, redox status, and mitochondrial dysfunction in PCOS tissue models treated with selenium nanoparticles and metformin.',
        displayOrder: 1
      },
      {
        slug: 'ischemia-reperfusion-prp',
        name: 'Muscle Ischemia/Reperfusion & PRP Protection',
        description: 'Histological and immunohistochemical study evaluating platelet-rich plasma and colchicine in muscle ischemia/reperfusion injury.',
        displayOrder: 2
      }
    ]
  });

  // 6. Publications
  const pub1 = await prisma.publication.create({
    data: {
      doctorId: doctor.id,
      slug: 'prp-colchicine-ischemia-reperfusion',
      title: 'The potential role of platelet-rich plasma and colchicine in experimentally induced muscle ischemia/reperfusion injury of adult male albino rats: a histological and immunohistochemical study',
      journal: 'Tanta Medical Journal',
      publicationDate: '2023-01-01',
      doi: '10.4103/tmj.tmj_2023_01',
      abstract: 'A comprehensive histological and immunohistochemical evaluation of platelet-rich plasma and colchicine in muscle ischemia/reperfusion injury.',
      publicationType: 'Single Author / Original Research',
      pdfUrl: 'https://scholar.google.com',
      published: true
    }
  });

  await prisma.publicationAuthor.createMany({
    data: [
      { publicationId: pub1.id, name: 'Dr. Aml Mohamed Abd El-Sattar Hamada', order: 1 }
    ]
  });

  await prisma.publicationKeyword.createMany({
    data: [
      { publicationId: pub1.id, keyword: 'Platelet-Rich Plasma' },
      { publicationId: pub1.id, keyword: 'Colchicine' },
      { publicationId: pub1.id, keyword: 'Muscle Ischemia' },
      { publicationId: pub1.id, keyword: 'Histology' }
    ]
  });

  // 7. Articles
  await prisma.article.createMany({
    data: [
      {
        doctorId: doctor.id,
        slug: 'polycystic-ovarian-syndrome-pcos-guide',
        title: 'الدليل الشامل لمتلازمة تكيس المبايض (PCOS): الآليات الخلوية والأكسدية والرعاية الطبية الحديثة',
        excerpt: 'تعرفي على الأسباب الفسيولوجية والأكسدية لتكيس المبايض، وتأثير مسارات الإشارات الأيضية، وأحدث طرق العلاج المعتمدة.',
        content: 'تعد متلازمة تكيس المبايض (PCOS) من أكثر الاضطرابات الأيضية الهرمونية شائعة التأثير على صحة المرأة الإنجابية. وتكشف الأبحاث العلمية الحديثة عن أهمية ضبط مسارات الإشارات الأكسدية (PI3K/Akt) واستخدام مضادات الأكسدة المتطورة كجسيمات السيلينيوم النانوية بجانب المتفورمين لاستعادة توازن الخلايا.',
        category: 'Obstetrics & Gynecology',
        publishedAt: new Date('2026-02-01'),
        readingTime: '6 دقائق',
        published: true
      }
    ]
  });

  // 8. Clinics & Services
  const clinicTanta = await prisma.clinic.create({
    data: {
      name: 'كلية الطب — قسم التشريح الآدمي وعلم الأجنة (جامعة طنطا)',
      city: 'طنطا',
      address: 'شارع الجلاء / الجيش، كلية الطب، جامعة طنطا، محافظة الغربية',
      phone: '01003514770',
      whatsapp: '+201003514770',
      googleMapsUrl: 'https://maps.google.com/?q=Tanta+Faculty+of+Medicine',
      isActive: true
    }
  });

  await prisma.clinicService.createMany({
    data: [
      {
        clinicId: clinicTanta.id,
        name: 'استشارات البحث العلمي والتشريح الأدمي وعلم الأجنة',
        description: 'استشارات أكاديمية وتطوير التدريس والأبحاث الهستولوجية.',
        duration: 45,
        isActive: true
      },
      {
        clinicId: clinicTanta.id,
        name: 'استشارات وحدة رعاية الطلاب الوافدين وحقوق الإنسان',
        description: 'استفسارات وخدمات الرعاية الاجتماعية والأكاديمية والحقوقية.',
        duration: 30,
        isActive: true
      }
    ]
  });

  for (let day = 0; day <= 6; day++) {
    const isOpenDay = day >= 0 && day <= 4; // Sun-Thu
    await prisma.clinicWorkingHour.create({
      data: {
        clinicId: clinicTanta.id,
        dayOfWeek: day,
        startTime: isOpenDay ? '09:00' : '00:00',
        endTime: isOpenDay ? '14:00' : '00:00',
        isClosed: !isOpenDay
      }
    });
  }

  // 9. Website Settings
  const settingsData = [
    { key: 'websiteTitle', value: 'د. أمل محمد عبدالستار حماده — أستاذ مساعد التشريح وعلم الأجنة واستشاري النساء والتوليد' },
    { key: 'contactPhone', value: '01003514770' },
    { key: 'contactEmail', value: 'amal.hamada@med.tanta.edu.eg' },
    { key: 'whatsappNumber', value: '+201003514770' },
    { key: 'clinicAddressMain', value: 'كلية الطب، جامعة طنطا، محافظة الغربية' },
    { key: 'emergencyNotice', value: 'في الحالات السريرية الطارئة أو استشارات التوليد العاجلة، يُرجى الاتصال فوراً على الرقم 01003514770.' },
    { key: 'disclaimerNotice', value: 'المعلومات والإرشادات الطبية الواردة في هذا الموقع تهدف إلى التوعية العامة ولا تغني عن الاستشارة الطبية المباشرة مع الطبيب المختص.' }
  ];

  for (const set of settingsData) {
    await prisma.websiteSetting.upsert({
      where: { key: set.key },
      update: { value: set.value },
      create: { key: set.key, value: set.value }
    });
  }

  // 10. Admin User Credentials
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.adminUser.create({
    data: {
      username: 'admin',
      email: 'amal.hamada@med.tanta.edu.eg',
      password: hashedPassword
    }
  });

  console.log('Successfully seeded SQLite database with Dr. Aml Mohamed Abd El-Sattar Hamada content!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
