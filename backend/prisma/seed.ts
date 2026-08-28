import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding SQLite database with Dar El Yosser Specialized Hospital data...');

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

  // 1. Hospital Profile
  const doctor = await prisma.doctor.create({
    data: {
      fullName: 'مستشفى وعيادات دار اليسر التخصصية',
      professionalTitle: 'مركز طبي متكامل بمدينة العبور — عيادات تخصصية وطوارئ 24 ساعة',
      specialty: 'الطب والجراحة وطوارئ 24/7 ومركز الأسنان والتخدير الكلي ورسم المخ',
      shortBio: 'مستشفى وعيادات دار اليسر التخصصية بالعبور، توفر أكثر من 20 عيادة تخصصية وطوارئ نساء وعظام وباطنة وجراحة وأطفال 24 ساعة.',
      biography: 'مستشفى وعيادات دار اليسر التخصصية بمدينة العبور تضم نخبة من كبار الأطباء والاستشاريين وتوفر طوارئ 24/7، عيادة أسنان متكاملة، ورسم مخ ورسم عصب وسونار.',
      heroImage: '/hospital.jpg',
      profileImage: '/hospital.jpg',
      yearsOfExperience: 12
    }
  });

  // 2. Clinics & Services
  const clinicYosser = await prisma.clinic.create({
    data: {
      name: 'مستشفى وعيادات دار اليسر التخصصية',
      city: 'مدينة العبور',
      address: 'مدينة العبور، الحي الأول، بعد صينية الخامس بـ 200 متر من الطريق البطئ، أمام يوني مول',
      phone: '01030252002',
      whatsapp: '+201030252002',
      googleMapsUrl: 'https://maps.google.com/?q=El+Obour+City+1st+District',
      isActive: true
    }
  });

  await prisma.clinicService.createMany({
    data: [
      {
        clinicId: clinicYosser.id,
        name: 'اليسر كلينك - مركز الأسنان (خصم 20%)',
        description: 'حشو تجميلي، تركيبات، تقويم، أسنان أطفال، وتخدير كلي بدون ألم.',
        duration: 30,
        isActive: true
      },
      {
        clinicId: clinicYosser.id,
        name: 'طوارئ 24 ساعة (نساء، عظام، باطنة، جراحة، أطفال)',
        description: 'أخصائيون مقيمون طوال الـ 24 ساعة.',
        duration: 30,
        isActive: true
      },
      {
        clinicId: clinicYosser.id,
        name: 'مركز رسم المخ ورسم العصب',
        description: 'فحوصات فسيولوجيا الأعصاب ورسم العضلات بحجز مسبق.',
        duration: 45,
        isActive: true
      }
    ]
  });

  // 3. Website Settings
  const settingsData = [
    { key: 'websiteTitle', value: 'مستشفى وعيادات دار اليسر التخصصية — العبور' },
    { key: 'contactPhone', value: '01030252002' },
    { key: 'dentalPhone', value: '01092893808' },
    { key: 'whatsappNumber', value: '+201030252002' },
    { key: 'clinicAddressMain', value: 'مدينة العبور، الحي الأول، بعد صينية الخامس بـ 200 متر' }
  ];

  for (const set of settingsData) {
    await prisma.websiteSetting.upsert({
      where: { key: set.key },
      update: { value: set.value },
      create: { key: set.key, value: set.value }
    });
  }

  // 4. Admin User Credentials
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.adminUser.create({
    data: {
      username: 'admin',
      email: 'info@darel-yosser.com',
      password: hashedPassword
    }
  });

  console.log('Successfully seeded database with Dar El Yosser Specialized Hospital content!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
