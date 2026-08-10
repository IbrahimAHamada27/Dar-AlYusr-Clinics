import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// GET /api/v1/conferences
router.get('/', async (req: Request, res: Response) => {
  try {
    const list = await prisma.conference.findMany({ orderBy: { startDate: 'desc' } });
    res.json({ success: true, data: list });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/v1/conferences
router.post('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const doctor = await prisma.doctor.findFirst();
    if (!doctor) return res.status(400).json({ success: false, message: 'Doctor missing' });

    const item = await prisma.conference.create({
      data: {
        ...req.body,
        doctorId: doctor.id
      }
    });
    res.json({ success: true, data: item });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE /api/v1/conferences/:id
router.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    await prisma.conference.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Conference deleted' });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

export default router;
