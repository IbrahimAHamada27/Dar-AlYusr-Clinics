import { Injectable, signal } from '@angular/core';
import {
  HospitalProfile,
  SpecialOfferItem,
  MedicalDepartment,
  DoctorRosterItem,
  DailySchedule,
  ClinicLocation,
  SocialLink,
  SiteSettings,
  AppointmentBooking,
  ContactMessage
} from '../models';

import {
  initialHospitalProfile,
  initialSpecialOffers,
  initialDepartments,
  dentalWeeklySchedule,
  generalWeeklySchedule,
  initialClinicsList,
  initialSocialLinksList,
  initialSiteSettingsList,
  initialAppointmentsList,
  initialContactMessagesList
} from '../../../data/demoData';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  readonly hospital = signal<HospitalProfile>(initialHospitalProfile);
  readonly offers = signal<SpecialOfferItem[]>(initialSpecialOffers);
  readonly departments = signal<MedicalDepartment[]>(initialDepartments);
  readonly dentalRoster = signal<DoctorRosterItem[]>(dentalWeeklySchedule);
  readonly generalSchedules = signal<DailySchedule[]>(generalWeeklySchedule);
  readonly clinics = signal<ClinicLocation[]>(initialClinicsList);
  readonly socialLinks = signal<SocialLink[]>(initialSocialLinksList);
  readonly settings = signal<SiteSettings>(initialSiteSettingsList);
  readonly appointments = signal<AppointmentBooking[]>(initialAppointmentsList);
  readonly messages = signal<ContactMessage[]>(initialContactMessagesList);

  // Legacy fallback signals
  readonly certificates = signal<any[]>([]);
  readonly conferences = signal<any[]>([]);
  readonly education = signal<any[]>([]);
  readonly researchAreas = signal<any[]>([]);
  readonly researchProjects = signal<any[]>([]);
  readonly timeline = signal<any[]>([]);

  getHospital(): HospitalProfile {
    return this.hospital();
  }

  getProfile(): any {
    return this.hospital();
  }

  getOffers(): SpecialOfferItem[] {
    return this.offers();
  }

  getDepartments(): MedicalDepartment[] {
    return this.departments();
  }

  getDentalRoster(): DoctorRosterItem[] {
    return this.dentalRoster();
  }

  getGeneralSchedules(): DailySchedule[] {
    return this.generalSchedules();
  }

  getDoctorsByDay(dayKey: string): DoctorRosterItem[] {
    const daySchedule = this.generalSchedules().find(s => s.dayKey === dayKey);
    return daySchedule ? daySchedule.doctors : [];
  }

  getClinics(): ClinicLocation[] {
    return this.clinics();
  }

  getArticles(): any[] {
    return [];
  }

  getPublications(): any[] {
    return [];
  }

  addAppointmentInquiry(booking: Partial<AppointmentBooking>): AppointmentBooking {
    const newBooking: AppointmentBooking = {
      id: 'appt-' + Date.now(),
      bookingRef: 'YOSSER-' + Math.floor(1000 + Math.random() * 9000),
      clinicId: booking.clinicId || 'clinic-darel-yosser-main',
      clinicName: booking.clinicName || { en: 'Dar El Yosser Main', ar: 'مستشفى دار اليسر التخصصية' },
      serviceId: booking.serviceId || 'general',
      serviceName: booking.serviceName || { en: 'General Inquiry', ar: 'استفسار وتوجه للمركز' },
      patientName: booking.patientName || '',
      patientPhone: booking.patientPhone || '',
      patientEmail: booking.patientEmail || '',
      appointmentType: booking.appointmentType || 'On-site Ticket Registration',
      date: booking.date || new Date().toISOString().split('T')[0],
      timeSlot: booking.timeSlot || 'الفترة المسائية',
      status: 'Pending',
      notes: booking.notes || '',
      createdAt: new Date().toISOString()
    };

    this.appointments.update(list => [newBooking, ...list]);
    return newBooking;
  }

  addContactMessage(msg: Partial<ContactMessage>): ContactMessage {
    const newMsg: ContactMessage = {
      id: 'msg-' + Date.now(),
      fullName: msg.fullName || '',
      email: msg.email || '',
      phone: msg.phone || '',
      subject: msg.subject || 'استفسار من الموقع',
      message: msg.message || '',
      isRead: false,
      createdAt: new Date().toISOString()
    };

    this.messages.update(list => [newMsg, ...list]);
    return newMsg;
  }

  updateAppointmentStatus(id: string, status: string): void {
    this.appointments.update(list =>
      list.map(a => a.id === id ? { ...a, status: status as any } : a)
    );
  }

  deleteAppointment(id: string): void {
    this.appointments.update(list => list.filter(a => a.id !== id));
  }

  markMessageRead(id: string): void {
    this.messages.update(list =>
      list.map(m => m.id === id ? { ...m, isRead: true } : m)
    );
  }

  deleteMessage(id: string): void {
    this.messages.update(list => list.filter(m => m.id !== id));
  }
}
