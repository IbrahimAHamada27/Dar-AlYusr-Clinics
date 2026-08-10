export type Language = 'en' | 'ar';

export interface MultilingualText {
  en: string;
  ar: string;
}

export interface DoctorProfile {
  name: MultilingualText;
  title: MultilingualText;
  specialty: MultilingualText;
  subSpecialties: MultilingualText[];
  brandTagline: MultilingualText;
  bioIntro: MultilingualText;
  fullBio: MultilingualText;
  experienceYears: number;
  publicationCount: number;
  conferenceCount: number;
  certificationCount: number;
  heroImage: string;
  doctorPortrait: string;
}

export interface ExpertiseArea {
  id: string;
  title: MultilingualText;
  description: MultilingualText;
  iconName: string;
}

export interface EducationItem {
  id: string;
  degree: MultilingualText;
  institution: MultilingualText;
  year: string;
  description?: MultilingualText;
}

export interface CareerTimelineItem {
  id: string;
  period: string;
  role: MultilingualText;
  institution: MultilingualText;
  location?: MultilingualText;
  description?: MultilingualText;
}

export interface CertificateItem {
  id: string;
  title: MultilingualText;
  issuingOrganization: MultilingualText;
  year: string;
  credentialId: string;
  verificationUrl?: string;
  imageUrl?: string;
  pdfUrl?: string;
}

export interface ResearchAreaItem {
  id: string;
  title: MultilingualText;
  description: MultilingualText;
}

export interface ResearchProjectItem {
  id: string;
  title: MultilingualText;
  status: 'Completed' | 'Ongoing';
  institution: MultilingualText;
  year: string;
  description: MultilingualText;
}

export interface PublicationItem {
  id: string;
  title: MultilingualText;
  authors: string;
  journal: string;
  year: number;
  type: 'Original Research' | 'Review Article' | 'Clinical Study' | 'Case Report';
  doi: string;
  abstract: MultilingualText;
  keywords: string[];
  pdfUrl?: string;
  externalUrl?: string;
  isFeatured?: boolean;
}

export interface ConferenceItem {
  id: string;
  eventName: MultilingualText;
  date: string;
  location: MultilingualText;
  role: MultilingualText;
  topic: MultilingualText;
  isUpcoming: boolean;
  description?: MultilingualText;
  presentationPdfUrl?: string;
  externalLink?: string;
}

export interface ArticleItem {
  id: string;
  slug: string;
  title: MultilingualText;
  category: MultilingualText;
  readingTime: string;
  author: MultilingualText;
  date: string;
  coverImage: string;
  summary: MultilingualText;
  content: MultilingualText;
  references?: string[];
  keywords?: string[];
  isFeatured?: boolean;
  isPublished: boolean;
  seoTitle?: MultilingualText;
  seoDescription?: MultilingualText;
}

export interface ClinicService {
  id: string;
  name: MultilingualText;
  durationMinutes: number;
}

export interface ClinicLocation {
  id: string;
  name: MultilingualText;
  city: MultilingualText;
  address: MultilingualText;
  phone: string;
  workingHours: MultilingualText[];
  mapLocationUrl?: string;
  googleMapsEmbedUrl?: string;
  services: ClinicService[];
  isActive: boolean;
}

export interface AppointmentBooking {
  id: string;
  bookingRef: string;
  clinicId: string;
  clinicName: MultilingualText;
  serviceId: string;
  serviceName: MultilingualText;
  date: string;
  timeSlot: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  appointmentType: 'New Consultation' | 'Follow-up' | 'Online Consultation';
  notes?: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  description?: MultilingualText;
  iconName: string;
  category: 'social' | 'academic';
}

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export interface SiteSettings {
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  emergencyNotice: MultilingualText;
  disclaimerNotice: MultilingualText;
}
