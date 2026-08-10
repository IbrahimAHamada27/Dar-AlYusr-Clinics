import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// GET /api/v1/clinics
router.get('/', async (req: Request, res: Response) => {
  try {
    const clinics = await prisma.clinic.findMany({
      include: {
        services: true,
        workingHours: true
      }
    });
    res.json({ success: true, data: clinics });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/v1/clinics
router.post('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const item = await prisma.clinic.create({
      data: req.body
    });
    res.json({ success: true, data: item });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

export default router;
