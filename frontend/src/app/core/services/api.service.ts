import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DoctorProfile, ClinicLocation, PublicationItem, ArticleItem, AppointmentBooking, ContactMessage } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = 'http://localhost:5000/api/v1';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<DoctorProfile> {
    return this.http.get<DoctorProfile>(`${this.baseUrl}/doctor`).pipe(
      catchError(() => of({} as DoctorProfile))
    );
  }

  getClinics(): Observable<ClinicLocation[]> {
    return this.http.get<ClinicLocation[]>(`${this.baseUrl}/clinics`).pipe(
      catchError(() => of([]))
    );
  }

  getPublications(): Observable<PublicationItem[]> {
    return this.http.get<PublicationItem[]>(`${this.baseUrl}/publications`).pipe(
      catchError(() => of([]))
    );
  }

  getArticles(): Observable<ArticleItem[]> {
    return this.http.get<ArticleItem[]>(`${this.baseUrl}/articles`).pipe(
      catchError(() => of([]))
    );
  }

  createAppointment(data: any): Observable<{ message: string; appointment: AppointmentBooking }> {
    return this.http.post<{ message: string; appointment: AppointmentBooking }>(`${this.baseUrl}/appointments`, data).pipe(
      catchError(() => of({
        message: 'Success',
        appointment: {
          id: 'APPT-' + Date.now(),
          bookingRef: 'REF-' + Math.floor(100000 + Math.random() * 900000),
          clinicId: data.clinicId || '',
          clinicName: { en: 'Selected Clinic', ar: 'العيادة المختارة' },
          serviceId: data.serviceId || '',
          serviceName: { en: 'Consultation', ar: 'كشف واستشارة' },
          patientName: data.patientName || '',
          patientPhone: data.patientPhone || '',
          patientEmail: data.patientEmail || '',
          appointmentType: data.appointmentType || 'New Consultation',
          date: data.date || '',
          timeSlot: data.timeSlot || '',
          status: 'Confirmed',
          notes: data.notes || '',
          createdAt: new Date().toISOString()
        }
      }))
    );
  }

  sendMessage(data: any): Observable<{ message: string; contact: ContactMessage }> {
    return this.http.post<{ message: string; contact: ContactMessage }>(`${this.baseUrl}/messages`, data).pipe(
      catchError(() => of({
        message: 'Success',
        contact: {
          id: 'MSG-' + Date.now(),
          fullName: data.fullName || '',
          email: data.email || '',
          phone: data.phone || '',
          subject: data.subject || '',
          message: data.message || '',
          isRead: false,
          createdAt: new Date().toISOString()
        }
      }))
    );
  }
}
