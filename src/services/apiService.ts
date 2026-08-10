import type {
  DoctorProfile,
  AppointmentBooking
} from '../types';

const API_BASE = 'http://localhost:5000/api/v1';

function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem('dr_ibrahim_jwt_token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

export const apiService = {
  // Health Check
  async checkHealth(): Promise<boolean> {
    try {
      const res = await fetch('http://localhost:5000/api/health');
      const data = await res.json();
      return data.success === true;
    } catch {
      return false;
    }
  },

  // Auth
  async login(username: string, password: string): Promise<{ token: string; user: any }> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const result = await res.json();
    if (!res.ok || !result.success) throw new Error(result.message || 'Login failed');
    localStorage.setItem('dr_ibrahim_jwt_token', result.data.token);
    return result.data;
  },

  // Doctor Profile
  async getDoctorProfile(): Promise<DoctorProfile> {
    const res = await fetch(`${API_BASE}/doctor`);
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error('Failed to fetch doctor profile');
    
    const raw = data.data;
    return {
      name: { en: raw.fullName, ar: 'د. إبراهيم الشرقاوي' },
      title: { en: raw.professionalTitle, ar: 'استشاري الأمراض الباطنية والباحث الطبي' },
      specialty: { en: raw.specialty, ar: 'الأمراض الباطنية' },
      subSpecialties: [
        { en: 'Diabetes & Metabolic Disorders', ar: 'السكر والاضطرابات الايضية' },
        { en: 'Hypertension', ar: 'ارتفاع ضغط الدم' },
        { en: 'Cardiovascular Risk Management', ar: 'إدارة مخاطر أمراض القلب والأوعية الدموية' },
        { en: 'Preventive Medicine', ar: 'الطب الوقائي' }
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
  },

  async updateDoctorProfile(profile: Partial<DoctorProfile>): Promise<void> {
    const res = await fetch(`${API_BASE}/doctor`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(profile)
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || 'Failed to update profile');
  },

  // Appointments (WITH SLOT CONFLICT ERROR HANDLING)
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
    const res = await fetch(`${API_BASE}/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    });

    const result = await res.json();
    if (!res.ok || !result.success) {
      throw new Error(result.message || 'This appointment slot is no longer available.');
    }

    const appt = result.data;
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
  },

  // Contact Form
  async submitContactMsg(msg: {
    fullName: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }): Promise<void> {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(msg)
    });
    const result = await res.json();
    if (!res.ok || !result.success) throw new Error(result.message || 'Failed to send message');
  }
};
