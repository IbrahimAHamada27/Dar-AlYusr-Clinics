export type Language = 'en' | 'ar';

export interface LocalizedString {
  en: string;
  ar: string;
}

export interface DoctorProfile {
  id?: string;
  name: LocalizedString;
  title: LocalizedString;
  specialty?: LocalizedString;
  subSpecialties: LocalizedString[];
  brandTagline: LocalizedString;
  bioIntro: LocalizedString;
  fullBio: LocalizedString;
  experienceYears: number;
  publicationCount: number;
  conferenceCount: number;
  certificationCount: number;
  doctorPortrait: string;
  doctorSecondaryPortrait?: string;
  heroImage?: string;
  heroBackground?: string;
}

export interface ExpertiseArea {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  iconName: string;
}

export interface EducationItem {
  id: string;
  degree: LocalizedString;
  institution: LocalizedString;
  year: number | string;
  description?: LocalizedString;
}

export interface CareerTimelineItem {
  id: string;
  period: string;
  role: LocalizedString;
  institution: LocalizedString;
  location?: LocalizedString;
  description?: LocalizedString;
}

export interface CertificateItem {
  id: string;
  title: LocalizedString;
  issuingOrganization: LocalizedString;
  year: number | string;
  credentialId: string;
  verificationUrl?: string;
  badgeImage?: string;
}

export interface ResearchAreaItem {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
}

export interface ResearchProjectItem {
  id: string;
  title: LocalizedString;
  institution: LocalizedString;
  status: 'Completed' | 'Ongoing' | 'Planned' | string;
  year: number | string;
  description: LocalizedString;
}

export interface PublicationItem {
  id: string;
  title: LocalizedString;
  authors: string;
  journal: string;
  year: number;
  type: string;
  doi: string;
  abstract: LocalizedString;
  keywords: string[];
  pdfUrl?: string;
  externalUrl?: string;
}

export interface ConferenceItem {
  id: string;
  eventName: LocalizedString;
  role: LocalizedString;
  location: LocalizedString;
  date: string;
  isUpcoming: boolean;
  topic: LocalizedString;
  description?: LocalizedString;
  externalLink?: string;
}

export interface ArticleItem {
  id: string;
  slug: string;
  title: LocalizedString;
  summary: LocalizedString;
  content: LocalizedString;
  category: LocalizedString;
  author: LocalizedString;
  date: string;
  readingTime: string;
  coverImage: string;
  isFeatured?: boolean;
  isPublished?: boolean;
  references?: string[];
  keywords?: string[];
}

export interface ClinicService {
  id: string;
  name: LocalizedString;
  description?: LocalizedString;
  durationMinutes?: number;
}

export type MedicalService = ClinicService;

export interface ClinicLocation {
  id: string;
  name: LocalizedString;
  city: LocalizedString;
  address: LocalizedString;
  phone: string;
  workingHours: LocalizedString[];
  googleMapsEmbedUrl?: string;
  mapLocationUrl?: string;
  isActive?: boolean;
  services: ClinicService[];
}

export interface SocialLink {
  id: string;
  platform: string;
  category: 'social' | 'academic' | 'Social' | 'Academic';
  url: string;
  iconName: string;
  description?: LocalizedString;
}

export interface SiteSettings {
  contactPhone: string;
  contactEmail: string;
  whatsappNumber?: string;
  emergencyNotice: LocalizedString;
  disclaimerNotice: LocalizedString;
}

export interface AppointmentBooking {
  id: string;
  bookingRef: string;
  clinicId: string;
  clinicName: LocalizedString;
  serviceId: string;
  serviceName: LocalizedString;
  patientName: string;
  patientPhone: string;
  patientEmail?: string;
  appointmentType: 'New Consultation' | 'Follow-up' | 'Online Consultation' | string;
  date: string;
  timeSlot: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled' | 'Pending' | string;
  notes?: string;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface UiTranslations {
  home: string;
  about: string;
  academic: string;
  education: string;
  certificates: string;
  research: string;
  researchAreas: string;
  publications: string;
  conferences: string;
  articles: string;
  clinics: string;
  socialMedia: string;
  contact: string;
  bookAppointment: string;
  confirmBooking: string;
  getDirections: string;
  clinicLocations: string;
  sendMessage: string;
  exploreProfile: string;
  commitmentTitle: string;
  readFullProfile: string;
  areasOfExpertise: string;
  viewDetails: string;
  latestPublications: string;
  viewPublication: string;
  featuredArticle: string;
  readArticle: string;
  finalCtaTitle: string;
  finalCtaText: string;
  contactClinic: string;
  yearsExperience: string;
  publishedResearch: string;
  speakingConferences: string;
  verifiedCertificates: string;
  scientificPublications: string;
  scientificConferences: string;
  certifications: string;
  demoContentNotice: string;
  demoNoticeDesc: string;
  quickLinks: string;
  academicLinks: string;
  allRightsReserved: string;
  privacyPolicy: string;
  termsOfUse: string;
  medicalDisclaimer: string;
  close: string;
  filterByYear: string;
  allTypes: string;
  clearFilters: string;
}
