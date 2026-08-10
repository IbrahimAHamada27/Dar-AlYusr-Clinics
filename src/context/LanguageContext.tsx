import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Language, MultilingualText } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  getText: (text?: MultilingualText | string) => string;
  isRtl: boolean;
  ui: Record<string, string>;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    academic: 'Academic',
    research: 'Research',
    publications: 'Publications',
    conferences: 'Conferences',
    articles: 'Articles',
    clinics: 'Clinics',
    appointments: 'Appointments',
    contact: 'Contact',
    socialMedia: 'Social & Academic',
    adminDashboard: 'Admin CMS',
    bookAppointment: 'Book an Appointment',

    // Dropdowns
    education: 'Education',
    certificates: 'Certificates',
    academicExperience: 'Academic Experience',
    researchAreas: 'Research Areas',
    researchProjects: 'Research Projects',

    // Common Buttons & Labels
    exploreProfile: 'Explore Professional Profile',
    readFullProfile: 'Read Full Profile',
    viewPublication: 'View Publication',
    readArticle: 'Read Article',
    contactClinic: 'Contact Clinic',
    getDirections: 'Get Directions',
    sendMessage: 'Send Message',
    confirmBooking: 'Confirm Booking',
    search: 'Search...',
    filterByYear: 'Filter by Year',
    allCategories: 'All Categories',
    allJournals: 'All Journals',
    allTypes: 'All Types',
    clearFilters: 'Clear Filters',
    viewDetails: 'View Details',
    close: 'Close',
    backToHome: 'Back to Home',
    demoContentNotice: 'DEMO CONTENT ONLY',
    demoNoticeDesc: 'All academic credentials, certificates, clinic addresses, and schedules shown are editable demo content.',

    // Stats
    yearsExperience: 'Years of Professional Experience',
    scientificPublications: 'Scientific Publications',
    scientificConferences: 'Scientific Conferences',
    certifications: 'Professional Certifications',

    // Section Titles
    commitmentTitle: 'A Commitment to Better Healthcare',
    areasOfExpertise: 'Areas of Expertise',
    clinicLocations: 'Clinic Locations',
    latestPublications: 'Latest Publications',
    featuredArticle: 'Featured Article',
    upcomingEvents: 'Upcoming Events & Conferences',
    previousEvents: 'Previous Conferences & Symposia',
    finalCtaTitle: 'Your Health Deserves Thoughtful Care',
    finalCtaText: 'Whether you are looking for a medical consultation, a follow-up visit, or professional guidance, choose the clinic location that works best for you.',

    // Footer
    quickLinks: 'Quick Links',
    academicLinks: 'Academic Links',
    legal: 'Legal',
    privacyPolicy: 'Privacy Policy',
    termsOfUse: 'Terms of Use',
    medicalDisclaimer: 'Medical Disclaimer',
    allRightsReserved: 'All rights reserved.'
  },
  ar: {
    // Navigation
    home: 'الرئيسية',
    about: 'عن الطبيب',
    academic: 'المسار الأكاديمي',
    research: 'البحث العلمي',
    publications: 'الأبحاث والمنشورات',
    conferences: 'المؤتمرات',
    articles: 'المقالات الطبية',
    clinics: 'العيادات',
    appointments: 'حجز موعد',
    contact: 'تواصل معنا',
    socialMedia: 'التواصل والأكاديميا',
    adminDashboard: 'لوحة التحكم CMS',
    bookAppointment: 'حجز موعد عيادة',

    // Dropdowns
    education: ' المؤهلات والتعليم',
    certificates: 'الشهادات والاعتمادات',
    academicExperience: 'الخبرة الأكاديمية والسريرية',
    researchAreas: 'مجالات البحث العلمي',
    researchProjects: 'المشاريع Research',

    // Common Buttons & Labels
    exploreProfile: 'استكشف الملف المهني',
    readFullProfile: 'قراءة السيرة الكاملة',
    viewPublication: 'عرض البحث العلمي',
    readArticle: 'قراءة المقال الطبي',
    contactClinic: 'التواصل مع العيادة',
    getDirections: 'موقع العيادة بالخريطة',
    sendMessage: 'إرسال الرسالة',
    confirmBooking: 'تأكيد حجز الموعد',
    search: 'بحث...',
    filterByYear: 'التصفية حسب السنة',
    allCategories: 'جميع التصنيفات',
    allJournals: 'جميع الدوريات العلمية',
    allTypes: 'جميع أنواع الأبحاث',
    clearFilters: 'إلغاء التصفيات',
    viewDetails: 'عرض التفاصيل',
    close: 'إغلاق',
    backToHome: 'العودة للرئيسية',
    demoContentNotice: 'محتوى تجريبي للتوضيح',
    demoNoticeDesc: 'جميع الشهادات والأبحاث ومواعيد العيادات المعروضة هي بيانات تجريبية يمكن تعديلها بالكامل من لوحة التحكم.',

    // Stats
    yearsExperience: 'عاماً من الخبرة الطبية والسريرية',
    scientificPublications: 'بحثاً علمياً ومنشوراً أكاديمياً',
    scientificConferences: 'مؤتمراً وندوة طبية دولية',
    certifications: 'شهادة واعتماد تخصصي',

    // Section Titles
    commitmentTitle: 'التزام راسخ برعاية صحية متميزة',
    areasOfExpertise: 'التخصصات ومجالات الخبرة',
    clinicLocations: 'عناوين ومواعيد العيادات',
    latestPublications: 'أحدث المنشورات والأبحاث الطبية',
    featuredArticle: 'مقال طبي متميز',
    upcomingEvents: 'المؤتمرات والندوات القادمة',
    previousEvents: 'المؤتمرات والمشاركات السابقة',
    finalCtaTitle: 'صحتك تستحق رعاية دقيقة وموثوقة',
    finalCtaText: 'سواء كنت تبحث عن استشارة طبية تخصصية، أو متابعة دورية، اختر العيادة الأنسب لك وقم بحجز موعدك بكل سهولة.',

    // Footer
    quickLinks: 'روابط سريعة',
    academicLinks: 'المجالس والأكاديميا',
    legal: 'الشروط والأحكام',
    privacyPolicy: 'سياسة الخصوصية',
    termsOfUse: 'شروط الاستخدام',
    medicalDisclaimer: 'إخلاء المسؤولية الطبي',
    allRightsReserved: 'جميع الحقوق محفوظة.'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('dr_ibrahim_lang');
    return (saved === 'ar' || saved === 'en') ? saved : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('dr_ibrahim_lang', lang);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const isRtl = language === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRtl]);

  const getText = (text?: MultilingualText | string): string => {
    if (!text) return '';
    if (typeof text === 'string') return text;
    return text[language] || text.en || '';
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        getText,
        isRtl,
        ui: translations[language]
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
