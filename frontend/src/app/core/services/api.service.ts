import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { DoctorProfile, AppointmentBooking } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = 'http://localhost:5000/api/v1';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('dr_ibrahim_jwt_token');
    return token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
  }

  async checkHealth(): Promise<boolean> {
    try {
      const res: any = await firstValueFrom(this.http.get('http://localhost:5000/api/health'));
      return res?.success === true;
    } catch {
      return false;
    }
  }

  async login(username: string, password: string): Promise<{ token: string; user: any }> {
    const res: any = await firstValueFrom(
      this.http.post(`${this.baseUrl}/auth/login`, { username, password })
    );
    if (!res?.success) throw new Error(res?.message || 'Login failed');
    localStorage.setItem('dr_ibrahim_jwt_token', res.data.token);
    return res.data;
  }

  async getDoctorProfile(): Promise<DoctorProfile> {
    const res: any = await firstValueFrom(this.http.get(`${this.baseUrl}/doctor`));
    if (!res?.success) throw new Error('Failed to fetch doctor profile');
    const raw = res.data;
    return {
      name: { en: raw.fullName, ar: 'د. إبراهيم الشرقاوي' },
      title: { en: raw.professionalTitle, ar: 'استشاري جراحة الأطفال وحديثي الولادة والمبتسرين والمناظير الجراحية الدقيقة' },
      specialty: { en: raw.specialty, ar: 'جراحة الأطفال وحديثي الولادة والمبتسرين' },
      subSpecialties: [
        { en: 'Advanced Pediatric Laparoscopic Surgery', ar: 'المناظير الجراحية الدقيقة للأطفال' },
        { en: 'Neonatal Congenital Anomalies & Reconstruction', ar: 'العيوب الخلقية والتشوهات لحديثي الولادة' },
        { en: 'General Pediatric Surgery & Undescended Testis', ar: 'جراحات الأطفال العامة والخصية المعلقة' },
        { en: 'Pain-Free Laser Circumcision & Aesthetic Correction', ar: 'عمليات الطهارة والختان بالليزر والتجميل' }
      ],
      brandTagline: { en: raw.shortBio, ar: raw.shortBio },
      bioIntro: { en: raw.shortBio, ar: raw.shortBio },
      fullBio: { en: raw.biography, ar: raw.biography },
      experienceYears: raw.yearsOfExperience || 15,
      publicationCount: 40,
      conferenceCount: 30,
      certificationCount: 10,
      heroImage: raw.heroImage || '/doctor.jpg',
      doctorPortrait: raw.profileImage || '/doctor.jpg'
    };
  }

  async createAppointment(bookingData: {
    clinicId: string;
    serviceId: string;
    patientName: string;
    patientPhone: string;
    patientEmail: string;
    appointmentDate: string;
    startTime: string;
    notes?: string;
  }): Promise<AppointmentBooking> {
    try {
      const res: any = await firstValueFrom(
        this.http.post(`${this.baseUrl}/appointments`, bookingData)
      );

      if (!res?.success) {
        throw new Error(res?.message || 'This appointment slot is no longer available.');
      }

      const appt = res.data;
      return {
        id: appt.id,
        bookingRef: appt.bookingReference,
        clinicId: appt.clinicId,
        clinicName: { en: appt.clinic.name, ar: appt.clinic.name },
        serviceId: appt.serviceId,
        serviceName: { en: 'Medical Service', ar: 'خدمة طبية' },
        date: appt.appointmentDate,
        timeSlot: appt.startTime,
        patientName: appt.patientName,
        patientPhone: appt.patientPhone,
        patientEmail: appt.patientEmail,
        appointmentType: 'New Consultation',
        notes: appt.notes,
        status: appt.status as any,
        createdAt: appt.createdAt
      };
    } catch (err: any) {
      const errMsg = err?.error?.message || err?.message || 'This appointment slot is no longer available.';
      throw new Error(errMsg);
    }
  }

  async submitContactMsg(msg: {
    fullName: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }): Promise<void> {
    const res: any = await firstValueFrom(this.http.post(`${this.baseUrl}/contact`, msg));
    if (!res?.success) throw new Error(res?.message || 'Failed to send message');
  }
}
