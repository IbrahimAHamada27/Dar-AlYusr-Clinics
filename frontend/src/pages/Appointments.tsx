import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { dataService } from '../services/dataService';
import { apiService } from '../services/apiService';
import type { AppointmentBooking } from '../types';
import {
  Clock,
  MapPin,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  MessageSquare,
  Printer
} from 'lucide-react';

interface AppointmentsProps {
  preselectedClinicId?: string;
}

export const Appointments: React.FC<AppointmentsProps> = ({ preselectedClinicId }) => {
  const { isRtl, getText, ui } = useLanguage();
  const clinics = dataService.getClinics();

  // Wizard Step State (1 to 6)
  const [step, setStep] = useState<number>(1);

  // Form State
  const [selectedClinicId, setSelectedClinicId] = useState<string>(preselectedClinicId || clinics[0]?.id || '');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [patientName, setPatientName] = useState<string>('');
  const [patientPhone, setPatientPhone] = useState<string>('');
  const [patientEmail, setPatientEmail] = useState<string>('');
  const [appointmentType, setAppointmentType] = useState<'New Consultation' | 'Follow-up' | 'Online Consultation'>('New Consultation');
  const [notes, setNotes] = useState<string>('');

  // Confirmed booking state & slot error state
  const [confirmedBooking, setConfirmedBooking] = useState<AppointmentBooking | null>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const currentClinic = clinics.find(c => c.id === selectedClinicId) || clinics[0];

  const availableTimeSlots = [
    '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM',
    '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM'
  ];

  const handleNextStep = async () => {
    setBookingError(null);

    if (step === 1 && !selectedClinicId) return;
    if (step === 2 && !selectedServiceId && currentClinic?.services[0]) {
      setSelectedServiceId(currentClinic.services[0].id);
    }
    if (step === 3 && !selectedDate) return;
    if (step === 4 && !selectedTimeSlot) return;

    if (step === 5) {
      const chosenService = currentClinic.services.find(s => s.id === selectedServiceId) || currentClinic.services[0];
      
      try {
        // Try calling SQLite Express REST API first
        const apiAppt = await apiService.createAppointment({
          clinicId: currentClinic.id,
          serviceId: chosenService?.id || 'srv-1',
          patientName,
          patientPhone,
          patientEmail,
          appointmentDate: selectedDate,
          startTime: selectedTimeSlot,
          notes
        });
        setConfirmedBooking(apiAppt);
        setStep(6);
        return;
      } catch (err: any) {
        if (err.message && err.message.includes('no longer available')) {
          setBookingError(isRtl ? 'عفواً، هذا الموعد تم حجزه مؤخراً وهو غير متاح الآن.' : 'This appointment slot is no longer available.');
          return;
        }

        // Local fallback
        const newBooking = dataService.addAppointment({
          clinicId: currentClinic.id,
          clinicName: currentClinic.name,
          serviceId: chosenService?.id || 'srv-1',
          serviceName: chosenService?.name || { en: 'Medical Consultation', ar: 'كشف طبي' },
          date: selectedDate,
          timeSlot: selectedTimeSlot,
          patientName,
          patientPhone,
          patientEmail,
          appointmentType,
          notes
        });
        setConfirmedBooking(newBooking);
        setStep(6);
        return;
      }
    }

    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(prev => prev - 1);
  };

  return (
    <div>
      {/* Hero Header */}
      <section style={{ backgroundColor: 'var(--primary-light)', padding: '3.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <span className="section-subtitle">{isRtl ? 'حجز موعد العيادة' : 'Online Appointment Booking'}</span>
          <h1 style={{ color: 'var(--primary-dark)', marginBottom: '0.75rem' }}>
            {isRtl ? 'حجز استشارة طبية' : 'Book a Medical Appointment'}
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)' }}>
            {isRtl ? 'خطوات بسيطة وسريعة لاختيار العيادة والخدمة والموعد الأنسب لك.' : 'A simple 5-step booking wizard for scheduling your clinic consultation.'}
          </p>
        </div>
      </section>

      {/* Progress Steps Bar */}
      {step < 6 && (
        <section style={{ backgroundColor: '#ffffff', borderBottom: '1px solid var(--border-light)', padding: '1.25rem 0' }}>
          <div className="container" style={{ maxWidth: '850px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
              {[1, 2, 3, 4, 5].map(stepNum => {
                const isActive = step === stepNum;
                const isPassed = step > stepNum;
                return (
                  <div key={stepNum} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem', zIndex: 2 }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: isPassed ? 'var(--accent-teal)' : isActive ? 'var(--primary-navy)' : 'var(--bg-alt)',
                        color: isPassed || isActive ? '#ffffff' : 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        boxShadow: isActive ? 'var(--shadow-md)' : 'none'
                      }}
                    >
                      {isPassed ? '✓' : stepNum}
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: isActive ? 700 : 500, color: isActive ? 'var(--primary-dark)' : 'var(--text-light)' }}>
                      {stepNum === 1 && (isRtl ? 'العيادة' : 'Clinic')}
                      {stepNum === 2 && (isRtl ? 'الخدمة' : 'Service')}
                      {stepNum === 3 && (isRtl ? 'التاريخ' : 'Date')}
                      {stepNum === 4 && (isRtl ? 'الوقت' : 'Time')}
                      {stepNum === 5 && (isRtl ? 'بيانات المريض' : 'Patient Info')}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Wizard Form Container */}
      <section className="section">
        <div className="container" style={{ maxWidth: '750px' }}>
          <div className="card" style={{ backgroundColor: '#ffffff', padding: '2.5rem' }}>
            {/* STEP 1: CHOOSE CLINIC */}
            {step === 1 && (
              <div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: 'var(--primary-dark)' }}>
                  {isRtl ? 'الخطوة 1: اختر الفرع والعيادة' : 'Step 1: Choose Clinic Location'}
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
                  {isRtl ? 'اختر موقع العيادة الأقرب والأناسب لك:' : 'Select the clinic branch where you wish to see Dr. Ibrahim:'}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                  {clinics.map(clinic => {
                    const isSelected = selectedClinicId === clinic.id;
                    return (
                      <div
                        key={clinic.id}
                        onClick={() => setSelectedClinicId(clinic.id)}
                        style={{
                          border: isSelected ? '2px solid var(--accent-teal)' : '1px solid var(--border-light)',
                          backgroundColor: isSelected ? 'var(--accent-teal-light)' : '#ffffff',
                          borderRadius: 'var(--radius-md)',
                          padding: '1.25rem',
                          cursor: 'pointer',
                          transition: 'var(--transition-fast)'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <h4 style={{ fontSize: '1.2rem', color: 'var(--primary-dark)' }}>
                            {getText(clinic.name)}
                          </h4>
                          <span className="badge badge-navy">
                            <MapPin size={13} /> {getText(clinic.city)}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                          {getText(clinic.address)}
                        </p>
                        <div style={{ fontSize: '0.85rem', color: 'var(--accent-teal)', fontWeight: 600 }}>
                          📞 {clinic.phone}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button onClick={handleNextStep} className="btn btn-primary">
                    <span>{isRtl ? 'التالي: اختيار الخدمة' : 'Next: Choose Service'}</span>
                    <ArrowIcon size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: CHOOSE SERVICE */}
            {step === 2 && (
              <div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: 'var(--primary-dark)' }}>
                  {isRtl ? 'الخطوة 2: اختر الخدمة ونوع الاستشارة' : 'Step 2: Choose Medical Service'}
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
                  {isRtl ? `الخدمات المتاحة في ${getText(currentClinic.name)}:` : `Available services at ${getText(currentClinic.name)}:`}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                  {currentClinic.services.map(srv => {
                    const isSelected = selectedServiceId === srv.id;
                    return (
                      <div
                        key={srv.id}
                        onClick={() => setSelectedServiceId(srv.id)}
                        style={{
                          border: isSelected ? '2px solid var(--accent-teal)' : '1px solid var(--border-light)',
                          backgroundColor: isSelected ? 'var(--accent-teal-light)' : '#ffffff',
                          borderRadius: 'var(--radius-md)',
                          padding: '1.1rem 1.25rem',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--primary-dark)' }}>
                          {getText(srv.name)}
                        </div>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                          ⏱️ {srv.durationMinutes} mins
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button onClick={handlePrevStep} className="btn btn-outline">
                    {isRtl ? 'السابق' : 'Back'}
                  </button>
                  <button onClick={handleNextStep} className="btn btn-primary">
                    <span>{isRtl ? 'التالي: اختيار التاريخ' : 'Next: Choose Date'}</span>
                    <ArrowIcon size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: CHOOSE DATE */}
            {step === 3 && (
              <div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: 'var(--primary-dark)' }}>
                  {isRtl ? 'الخطوة 3: اختر تاريخ الكشف' : 'Step 3: Choose Appointment Date'}
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
                  {isRtl ? 'اختر اليوم المناسب لاستشارتك الطبية:' : 'Select your preferred appointment date:'}
                </p>

                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                    {isRtl ? 'تاريخ الحجز:' : 'Select Date:'}
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={selectedDate}
                    onChange={e => setSelectedDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-light)',
                      fontSize: '1rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button onClick={handlePrevStep} className="btn btn-outline">
                    {isRtl ? 'السابق' : 'Back'}
                  </button>
                  <button onClick={handleNextStep} className="btn btn-primary">
                    <span>{isRtl ? 'التالي: اختيار الوقت' : 'Next: Choose Time Slot'}</span>
                    <ArrowIcon size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: CHOOSE TIME SLOT */}
            {step === 4 && (
              <div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: 'var(--primary-dark)' }}>
                  {isRtl ? 'الخطوة 4: اختر الوقت المتاح' : 'Step 4: Choose Available Time Slot'}
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
                  {isRtl ? `الأوقات المتاحة ليوم ${selectedDate}:` : `Available time slots for ${selectedDate}:`}
                </p>

                <div className="grid-3" style={{ gap: '0.85rem', marginBottom: '2rem' }}>
                  {availableTimeSlots.map((slot, i) => {
                    const isSelected = selectedTimeSlot === slot;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedTimeSlot(slot)}
                        style={{
                          padding: '0.75rem',
                          borderRadius: 'var(--radius-md)',
                          border: isSelected ? '2px solid var(--accent-teal)' : '1px solid var(--border-light)',
                          backgroundColor: isSelected ? 'var(--accent-teal)' : 'var(--bg-alt)',
                          color: isSelected ? '#ffffff' : 'var(--primary-dark)',
                          fontWeight: 700,
                          fontSize: '0.95rem',
                          cursor: 'pointer'
                        }}
                      >
                        <Clock size={15} style={{ display: 'inline', margin: '0 4px' }} />
                        {slot}
                      </button>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button onClick={handlePrevStep} className="btn btn-outline">
                    {isRtl ? 'السابق' : 'Back'}
                  </button>
                  <button
                    onClick={handleNextStep}
                    disabled={!selectedTimeSlot}
                    className="btn btn-primary"
                    style={{ opacity: !selectedTimeSlot ? 0.6 : 1 }}
                  >
                    <span>{isRtl ? 'التالي: بيانات المريض' : 'Next: Patient Info'}</span>
                    <ArrowIcon size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: PATIENT DETAILS FORM */}
            {step === 5 && (
              <div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: 'var(--primary-dark)' }}>
                  {isRtl ? 'الخطوة 5: بيانات المريض وتأكيد الطلب' : 'Step 5: Patient Details & Confirmation'}
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
                  {isRtl ? 'يُرجى إدخال البيانات للتواصل وتأكيد الحجز:' : 'Please enter patient contact details to confirm booking:'}
                </p>

                {bookingError && (
                  <div
                    style={{
                      backgroundColor: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid #EF4444',
                      color: '#DC2626',
                      padding: '1rem 1.25rem',
                      borderRadius: 'var(--radius-md)',
                      marginBottom: '1.5rem',
                      fontWeight: 700,
                      fontSize: '0.95rem'
                    }}
                  >
                    ⚠️ {bookingError}
                  </div>
                )}

                <form onSubmit={e => { e.preventDefault(); handleNextStep(); }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                    <div>
                      <label style={{ display: 'block', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.35rem' }}>
                        {isRtl ? 'الاسم بالكامل *' : 'Full Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={isRtl ? 'أدخل اسمك الثلاثي' : 'Enter full patient name'}
                        value={patientName}
                        onChange={e => setPatientName(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--border-light)',
                          fontSize: '0.95rem',
                          outline: 'none'
                        }}
                      />
                    </div>

                    <div className="grid-2" style={{ gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.35rem' }}>
                          {isRtl ? 'رقم الهاتف / الواتساب *' : 'Mobile Number *'}
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+20 100 000 0000"
                          value={patientPhone}
                          onChange={e => setPatientPhone(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '0.75rem 1rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border-light)',
                            fontSize: '0.95rem',
                            outline: 'none'
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.35rem' }}>
                          {isRtl ? 'البريد الإلكتروني' : 'Email Address'}
                        </label>
                        <input
                          type="email"
                          placeholder="patient@example.com"
                          value={patientEmail}
                          onChange={e => setPatientEmail(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '0.75rem 1rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border-light)',
                            fontSize: '0.95rem',
                            outline: 'none'
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.35rem' }}>
                        {isRtl ? 'نوع الزيارة' : 'Appointment Type'}
                      </label>
                      <select
                        value={appointmentType}
                        onChange={e => setAppointmentType(e.target.value as any)}
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--border-light)',
                          fontSize: '0.95rem',
                          outline: 'none',
                          backgroundColor: '#ffffff'
                        }}
                      >
                        <option value="New Consultation">{isRtl ? 'كشف جديد (New Consultation)' : 'New Consultation'}</option>
                        <option value="Follow-up">{isRtl ? 'متابعة دورية (Follow-up)' : 'Follow-up'}</option>
                        <option value="Online Consultation">{isRtl ? 'استشارة أونلاين (Online Consultation)' : 'Online Consultation'}</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.35rem' }}>
                        {isRtl ? 'ملاحظات إضافية (اختياري)' : 'Optional Message / Notes'}
                      </label>
                      <textarea
                        rows={3}
                        placeholder={isRtl ? 'أي تفاصيل عن الحالة الطبية...' : 'Brief notes about your condition...'}
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--border-light)',
                          fontSize: '0.95rem',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button type="button" onClick={handlePrevStep} className="btn btn-outline">
                      {isRtl ? 'السابق' : 'Back'}
                    </button>
                    <button type="submit" className="btn btn-primary">
                      <CheckCircle size={18} />
                      <span>{ui.confirmBooking}</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* STEP 6: BOOKING CONFIRMED */}
            {step === 6 && confirmedBooking && (
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-teal-light)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem'
                  }}
                >
                  <CheckCircle size={36} color="var(--accent-teal)" />
                </div>

                <h2 style={{ color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>
                  {isRtl ? 'تم تأكيد طلب الموعد بنجاح!' : 'Appointment Booking Confirmed!'}
                </h2>

                <p style={{ color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
                  {isRtl ? 'رقم المرجعية الخاص بحجزك هو:' : 'Your appointment reference code is:'}
                </p>

                <div
                  style={{
                    backgroundColor: 'var(--primary-dark)',
                    color: 'var(--gold-accent)',
                    padding: '1rem 2rem',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '1.75rem',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    display: 'inline-block',
                    marginBottom: '2rem'
                  }}
                >
                  {confirmedBooking.bookingRef}
                </div>

                {/* Booking Summary Box */}
                <div style={{ backgroundColor: 'var(--bg-alt)', borderRadius: 'var(--radius-md)', padding: '1.5rem', textAlign: isRtl ? 'right' : 'left', marginBottom: '2rem', fontSize: '0.95rem' }}>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <strong>{isRtl ? 'المريض:' : 'Patient:'}</strong> {confirmedBooking.patientName}
                  </div>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <strong>{isRtl ? 'العيادة:' : 'Clinic:'}</strong> {getText(confirmedBooking.clinicName)}
                  </div>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <strong>{isRtl ? 'الخدمة:' : 'Service:'}</strong> {getText(confirmedBooking.serviceName)} ({confirmedBooking.appointmentType})
                  </div>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <strong>{isRtl ? 'التاريخ والوقت:' : 'Date & Time:'}</strong> {confirmedBooking.date} at {confirmedBooking.timeSlot}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <a
                    href={`https://wa.me/201000000000?text=Hello%20Doctor,%20I%20have%20booked%20an%20appointment%20ref:%20${confirmedBooking.bookingRef}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    <MessageSquare size={18} />
                    <span>{isRtl ? 'إرسال تأكيد عبر الواتساب' : 'Send WhatsApp Confirmation'}</span>
                  </a>

                  <button
                    onClick={() => window.print()}
                    className="btn btn-outline"
                  >
                    <Printer size={18} />
                    <span>{isRtl ? 'طباعة تذكرة الحجز' : 'Print Booking Receipt'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
