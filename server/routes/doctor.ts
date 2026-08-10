import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// GET /api/v1/doctor
router.get('/', async (req: Request, res: Response) => {
  try {
    const doctor = await prisma.doctor.findFirst({
      include: {
        educations: { orderBy: { displayOrder: 'asc' } },
        experiences: { orderBy: { displayOrder: 'asc' } },
        certificates: { orderBy: { displayOrder: 'asc' } },
        socialProfiles: { orderBy: { displayOrder: 'asc' } }
      }
    });

    res.json({
      success: true,
      data: doctor
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/v1/doctor (Protected)
router.put('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const existing = await prisma.doctor.findFirst();
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Doctor profile not found' });
    }

    const updated = await prisma.doctor.update({
      where: { id: existing.id },
      data: req.body
    });

    res.json({
      success: true,
      data: updated
    });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

export default router;
