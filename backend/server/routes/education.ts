import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// GET /api/v1/education
router.get('/', async (req: Request, res: Response) => {
  try {
    const list = await prisma.education.findMany({
      orderBy: { displayOrder: 'asc' }
    });
    res.json({ success: true, data: list });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/v1/education
router.post('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const doctor = await prisma.doctor.findFirst();
    if (!doctor) return res.status(400).json({ success: false, message: 'Doctor profile missing' });

    const item = await prisma.education.create({
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

// PUT /api/v1/education/:id
router.put('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const updated = await prisma.education.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json({ success: true, data: updated });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE /api/v1/education/:id
router.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    await prisma.education.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Education deleted successfully' });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

export default router;
