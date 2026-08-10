import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth';
import { z } from 'zod';

const router = Router();
const prisma = new PrismaClient();

const createAppointmentSchema = z.object({
  clinicId: z.string().min(1),
  serviceId: z.string().min(1),
  patientName: z.string().min(1),
  patientPhone: z.string().min(1),
  patientEmail: z.string().email().or(z.string()),
  appointmentDate: z.string().min(1), // YYYY-MM-DD
  startTime: z.string().min(1), // e.g. "17:30"
  notes: z.string().optional()
});

// GET /api/v1/appointments (Public or Admin)
router.get('/', async (req: Request, res: Response) => {
  try {
    const list = await prisma.appointment.findMany({
      include: {
        clinic: true
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ success: true, data: list });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/v1/appointments — WITH BACKEND CONFLICT CHECKING LOGIC
router.post('/', async (req: Request, res: Response) => {
  try {
    const data = createAppointmentSchema.parse(req.body);

    // 1. Check clinic exists
    const clinic = await prisma.clinic.findUnique({
      where: { id: data.clinicId },
      include: { workingHours: true }
    });
    if (!clinic || !clinic.isActive) {
      return res.status(400).json({ success: false, message: 'Clinic not found or inactive.' });
    }

    // 2. Check service exists
    const service = await prisma.clinicService.findUnique({
      where: { id: data.serviceId }
    });
    if (!service || !service.isActive) {
      return res.status(400).json({ success: false, message: 'Service not found or inactive.' });
    }

    // 3. Check clinic working hours for requested day of week
    const dateObj = new Date(data.appointmentDate);
    const dayOfWeek = dateObj.getDay(); // 0 = Sunday, 1 = Monday, ...
    const workingDay = clinic.workingHours.find(wh => wh.dayOfWeek === dayOfWeek);

    if (!workingDay || workingDay.isClosed) {
      return res.status(400).json({
        success: false,
        message: 'This clinic is closed on the selected date.'
      });
    }

    // 4 & 5 & 6. Check existing appointments on the same date, clinic & time slot
    const existingConflict = await prisma.appointment.findFirst({
      where: {
        clinicId: data.clinicId,
        appointmentDate: data.appointmentDate,
        startTime: data.startTime,
        status: {
          in: ['PENDING', 'CONFIRMED']
        }
      }
    });

    if (existingConflict) {
      return res.status(409).json({
        success: false,
        message: 'This appointment slot is no longer available.'
      });
    }

    // 7. Generate unique booking reference (e.g. DR-2026-XXXXXX)
    const randomCode = Math.floor(100000 + Math.random() * 900000);
    const currentYear = new Date().getFullYear();
    const bookingReference = `DR-${currentYear}-${randomCode}`;

    // 8. Create appointment
    const appointment = await prisma.appointment.create({
      data: {
        clinicId: data.clinicId,
        serviceId: data.serviceId,
        patientName: data.patientName,
        patientPhone: data.patientPhone,
        patientEmail: data.patientEmail || '',
        appointmentDate: data.appointmentDate,
        startTime: data.startTime,
        notes: data.notes || '',
        status: 'PENDING',
        bookingReference
      },
      include: {
        clinic: true
      }
    });

    res.status(201).json({
      success: true,
      data: appointment
    });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message || 'Failed to create appointment.' });
  }
});

// PUT /api/v1/appointments/:id/status (Protected Admin endpoint)
router.put('/:id/status', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const updated = await prisma.appointment.update({
      where: { id: req.params.id },
      data: { status }
    });
    res.json({ success: true, data: updated });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE /api/v1/appointments/:id (Protected)
router.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    await prisma.appointment.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Appointment deleted successfully' });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

export default router;
