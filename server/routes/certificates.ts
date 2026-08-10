import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// GET /api/v1/certificates
router.get('/', async (req: Request, res: Response) => {
  try {
    const list = await prisma.certificate.findMany({
      orderBy: { displayOrder: 'asc' }
    });
    res.json({ success: true, data: list });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/v1/certificates
router.post('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const doctor = await prisma.doctor.findFirst();
    if (!doctor) return res.status(400).json({ success: false, message: 'Doctor profile missing' });

    const cert = await prisma.certificate.create({
      data: {
        ...req.body,
        doctorId: doctor.id
      }
    });
    res.json({ success: true, data: cert });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PUT /api/v1/certificates/:id
router.put('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const updated = await prisma.certificate.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json({ success: true, data: updated });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE /api/v1/certificates/:id
router.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    await prisma.certificate.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Certificate deleted' });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

export default router;
