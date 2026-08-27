import { Injectable, signal, computed } from '@angular/core';
import { Language, LocalizedString, UiTranslations } from '../models';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  readonly language = signal<Language>('ar');

  readonly isRtl = computed(() => this.language() === 'ar');

  readonly ui = computed<UiTranslations>(() => {
    const isArabic = this.isRtl();
    return {
      home: isArabic ? 'الرئيسية' : 'Home',
      about: isArabic ? 'عن الطبيب' : 'About',
      academic: isArabic ? 'الأكاديميا' : 'Academic',
      education: isArabic ? 'التعليم والشهادات' : 'Education',
      certificates: isArabic ? 'الاعتمادات الدولية' : 'Certificates',
      research: isArabic ? 'البحث العلمي' : 'Research',
      researchAreas: isArabic ? 'المجالات البحثية' : 'Research Areas',
      publications: isArabic ? 'الأبحاث والمنشورات' : 'Publications',
      conferences: isArabic ? 'المؤتمرات والندوات' : 'Conferences',
      articles: isArabic ? 'المقالات والتوعية' : 'Articles',
      clinics: isArabic ? 'العيادات والفروع' : 'Clinics',
      socialMedia: isArabic ? 'التواصل الاجتماعي' : 'Social Media',
      contact: isArabic ? 'تواصل معنا' : 'Contact',
      bookAppointment: isArabic ? 'احجز موعد كشف' : 'Book Appointment',
      confirmBooking: isArabic ? 'تأكيد الحجز النهائي' : 'Confirm Booking',
      getDirections: isArabic ? 'الاتجاهات على الخريطة' : 'Get Directions',
      clinicLocations: isArabic ? 'عناوين ومواقع العيادات' : 'Clinic Locations',
      sendMessage: isArabic ? 'إرسال الرسالة' : 'Send Message',
      exploreProfile: isArabic ? 'استكشف السيرة الذاتية' : 'Explore Profile',
      commitmentTitle: isArabic ? 'الالتزام والخبرة الجراحية' : 'Surgical Excellence & Care',
      readFullProfile: isArabic ? 'قراءة الملف الكامل' : 'Read Full Profile',
      areasOfExpertise: isArabic ? 'التخصصات والخدمات المتقدمة' : 'Areas of Expertise',
      viewDetails: isArabic ? 'التفاصيل' : 'View Details',
      latestPublications: isArabic ? 'أحدث المنشورات والأبحاث' : 'Latest Publications',
      viewPublication: isArabic ? 'عرض البحث' : 'View Publication',
      featuredArticle: isArabic ? 'مقالة مميزة' : 'Featured Article',
      readArticle: isArabic ? 'قراءة المقال' : 'Read Article',
      finalCtaTitle: isArabic ? 'احجز موعد كشف واستشارة تخصصية' : 'Schedule Your Medical Consultation',
      finalCtaText: isArabic ? 'اختر الفرع المناسب والموعد المفضل لطلب استشارة أو متابعة حالة صحية.' : 'Select your preferred location and time slot for specialized consultation.',
      contactClinic: isArabic ? 'تواصل مع العيادة' : 'Contact Clinic',
      yearsExperience: isArabic ? 'خبرة أكاديمية وسريرية' : 'Years Clinical Experience',
      publishedResearch: isArabic ? 'بحث علمي منشور' : 'Published Research Papers',
      speakingConferences: isArabic ? 'مؤتمر دولي ومحلي' : 'Conferences & Symposia',
      verifiedCertificates: isArabic ? 'شهادة واعتماد تخصصي' : 'Verified Certifications',
      scientificPublications: isArabic ? 'بحث علمي منشور' : 'Scientific Publications',
      scientificConferences: isArabic ? 'مؤتمر دولي ومحلي' : 'Scientific Conferences',
      certifications: isArabic ? 'شهادة واعتماد تخصصي' : 'Certifications',
      demoContentNotice: isArabic ? 'الموقع الرسمي للدكتورة أمل محمد عبدالستار حماده' : 'Official Website of Dr. Aml Mohamed Abd El-Sattar Hamada',
      demoNoticeDesc: isArabic ? 'أستاذ مساعد التشريح الآدمي وعلم الأجنة واستشاري النساء والتوليد' : 'Associate Professor of Anatomy & Embryology and OB-GYN Consultant',
      quickLinks: isArabic ? 'روابط سريعة' : 'Quick Links',
      academicLinks: isArabic ? 'الشبكات الأكاديمية' : 'Academic Hub',
      allRightsReserved: isArabic ? 'جميع الحقوق محفوظة' : 'All Rights Reserved',
      privacyPolicy: isArabic ? 'سياسة الخصوصية' : 'Privacy Policy',
      termsOfUse: isArabic ? 'شروط الاستخدام' : 'Terms of Use',
      medicalDisclaimer: isArabic ? 'إخلاء مسؤولية طبية' : 'Medical Disclaimer',
      close: isArabic ? 'إغلاق' : 'Close',
      filterByYear: isArabic ? 'جميع السنوات' : 'All Years',
      allTypes: isArabic ? 'جميع الأنواع' : 'All Types',
      clearFilters: isArabic ? 'مسح الفلاتر' : 'Clear Filters'
    };
  });

  setLanguage(lang: Language): void {
    this.language.set(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }

  toggleLanguage(): void {
    const nextLang: Language = this.language() === 'ar' ? 'en' : 'ar';
    this.setLanguage(nextLang);
  }

  getText(field: LocalizedString | undefined): string {
    if (!field) return '';
    return this.isRtl() ? field.ar : field.en;
  }
}
