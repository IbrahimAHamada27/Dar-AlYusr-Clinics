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
      about: isArabic ? 'عن المستشفى' : 'About Us',
      schedules: isArabic ? 'جدول المواعيد' : 'Doctor Schedule',
      dentalClinic: isArabic ? 'مركز الأسنان (اليسر كلينك)' : 'Dental Clinic',
      departments: isArabic ? 'الأقسام والعيادات' : 'Departments',
      eegSonar: isArabic ? 'رسم المخ والسونار' : 'EEG & Sonar',
      bookingGuide: isArabic ? 'تعليمات الحجز' : 'Booking Guide',
      contact: isArabic ? 'اتصل بنا والموقع' : 'Contact Us',
      bookAppointment: isArabic ? 'استفسار وتوجه للمركز' : 'On-Site Ticket Registration',
      confirmBooking: isArabic ? 'تأكيد طلب الاستفسار' : 'Confirm Inquiry',
      getDirections: isArabic ? 'الاتجاهات على الخريطة' : 'Get Directions',
      clinicLocations: isArabic ? 'عنوان مستشفى دار اليسر' : 'Hospital Address',
      sendMessage: isArabic ? 'إرسال الاستفسار' : 'Send Inquiry',
      areasOfExpertise: isArabic ? 'الأقسام والخدمات التخصصية' : 'Medical Departments & Services',
      viewDetails: isArabic ? 'التفاصيل' : 'View Details',
      allRightsReserved: isArabic ? 'جميع الحقوق محفوظة © مستشفى وعيادات دار اليسر التخصصية' : 'All Rights Reserved © Dar El Yosser Hospital',
      privacyPolicy: isArabic ? 'سياسة الخصوصية' : 'Privacy Policy',
      termsOfUse: isArabic ? 'الشروط والأحكام' : 'Terms of Service',
      medicalDisclaimer: isArabic ? 'تنبيه طبي' : 'Medical Disclaimer',
      close: isArabic ? 'إغلاق' : 'Close',
      emergencyHotline: isArabic ? 'طوارئ 24/7:' : '24/7 Emergency:',
      dentalHotline: isArabic ? 'حجز الأسنان:' : 'Dental Direct:',
      workingHours: isArabic ? 'مواعيد العمل:' : 'Working Hours:',
      address: isArabic ? 'العنوان:' : 'Address:',
      bookingNoticeTitle: isArabic ? 'غير متاح الحجز بالتليفون' : 'On-Site Registration Required',
      bookingNoticeText: isArabic ? 'للحجز يرجى التوجه للمركز مباشرة. الحجز بأسبقية الحضور أو بالسيستم.' : 'Telephone reservation is not available. Please visit the medical center in person for queue ticket registration.'
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
