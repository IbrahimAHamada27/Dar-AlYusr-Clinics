import { Injectable, signal, computed } from '@angular/core';
import { Language, MultilingualText } from '../models';

export interface UiTranslations {
  home: string;
  about: string;
  education: string;
  certificates: string;
  research: string;
  publications: string;
  conferences: string;
  articles: string;
  clinics: string;
  appointments: string;
  socialMedia: string;
  contact: string;
  bookAppointment: string;
  academic: string;
  academicLinks: string;
  quickLinks: string;
  researchAreas: string;
  ongoingProjects: string;
  demoContentNotice: string;
  demoNoticeDesc: string;
  medicalDisclaimer: string;
  allRightsReserved: string;
  privacyPolicy: string;
  termsOfUse: string;
  yearsExperience: string;
  publishedResearch: string;
  speakingConferences: string;
  verifiedCertificates: string;
  readMore: string;
  viewAll: string;
  bookNow: string;
}

const EN_UI: UiTranslations = {
  home: 'Home',
  about: 'About Doctor',
  education: 'Education',
  certificates: 'Certificates',
  research: 'Research',
  publications: 'Publications',
  conferences: 'Conferences',
  articles: 'Medical Articles',
  clinics: 'Clinics & Hours',
  appointments: 'Book Appointment',
  socialMedia: 'Profiles & Social',
  contact: 'Contact Us',
  bookAppointment: 'Book Appointment',
  academic: 'Academic & Qualifications',
  academicLinks: 'Academic Profiles',
  quickLinks: 'Quick Links',
  researchAreas: 'Research Focus',
  ongoingProjects: 'Research Projects',
  demoContentNotice: 'DEMO CONTENT NOTICE',
  demoNoticeDesc: 'All academic credentials, certificates, clinic addresses, and schedules shown are editable demo content.',
  medicalDisclaimer: 'Medical Disclaimer',
  allRightsReserved: 'All rights reserved.',
  privacyPolicy: 'Privacy Policy',
  termsOfUse: 'Terms of Use',
  yearsExperience: 'Years Clinical Experience',
  publishedResearch: 'Published Research Papers',
  speakingConferences: 'Conference Presentations',
  verifiedCertificates: 'Board Certifications',
  readMore: 'Read Full Article',
  viewAll: 'View All',
  bookNow: 'Book Now'
};

const AR_UI: UiTranslations = {
  home: 'الرئيسية',
  about: 'عن الطبيب',
  education: 'التعليم والمؤهلات',
  certificates: 'الشهادات والاعتمادات',
  research: 'البحث العلمي',
  publications: 'الأبحاث والمنشورات',
  conferences: 'المؤتمرات العلمية',
  articles: 'المقالات الطبية',
  clinics: 'العيادات والمواعيد',
  appointments: 'حجز موعد',
  socialMedia: 'الملفات والتواصل',
  contact: 'تواصل معنا',
  bookAppointment: 'حجز موعد بالعيادة',
  academic: 'المؤهلات والأكاديميا',
  academicLinks: 'المنصات والأكاديميا',
  quickLinks: 'روابط السريعة',
  researchAreas: 'مجالات البحث',
  ongoingProjects: 'المشاريع البحثية',
  demoContentNotice: 'محتوى تجريبي للتوضيح',
  demoNoticeDesc: 'جميع الشهادات والأبحاث ومواعيد العيادات المعروضة هي بيانات تجريبية يمكن تعديلها بالكامل من لوحة التحكم.',
  medicalDisclaimer: 'إخلاء مسؤولية طبي',
  allRightsReserved: 'جميع الحقوق محفوظة.',
  privacyPolicy: 'سياسة الخصوصية',
  termsOfUse: 'شروط الاستخدام',
  yearsExperience: 'سنوات من الخبرة السريرية',
  publishedResearch: 'أبحاث علمية منشورة',
  speakingConferences: 'مشاركة في مؤتمرات دولية',
  verifiedCertificates: 'شهادات واعتمادات موثقة',
  readMore: 'قراءة المقال كاملاً',
  viewAll: 'عرض الكل',
  bookNow: 'احجز الآن'
};

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  // Language signal defaults to 'ar'
  readonly language = signal<Language>('ar');

  readonly isRtl = computed(() => this.language() === 'ar');

  readonly ui = computed<UiTranslations>(() =>
    this.language() === 'ar' ? AR_UI : EN_UI
  );

  constructor() {
    this.applyDirection();
  }

  toggleLanguage(): void {
    const nextLang: Language = this.language() === 'en' ? 'ar' : 'en';
    this.language.set(nextLang);
    this.applyDirection();
  }

  setLanguage(lang: Language): void {
    this.language.set(lang);
    this.applyDirection();
  }

  getText(textObj: MultilingualText | undefined | null): string {
    if (!textObj) return '';
    return textObj[this.language()] || textObj.ar || textObj.en || '';
  }

  private applyDirection(): void {
    const isArabic = this.language() === 'ar';
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
    document.documentElement.lang = isArabic ? 'ar' : 'en';
  }
}
