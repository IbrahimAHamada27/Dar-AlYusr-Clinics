import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth';
import { z } from 'zod';

const router = Router();
const prisma = new PrismaClient();

const contactSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(1),
  message: z.string().min(1)
});

// POST /api/v1/contact (Public inquiry form)
router.post('/', async (req: Request, res: Response) => {
  try {
    const data = contactSchema.parse(req.body);
    const msg = await prisma.contactMessage.create({
      data: {
        ...data,
        status: 'NEW'
      }
    });
    res.status(201).json({ success: true, data: msg });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// GET /api/v1/contact (Protected Admin Inbox)
router.get('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json({ success: true, data: messages });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/v1/contact/:id (Protected - Mark status)
router.put('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const updated = await prisma.contactMessage.update({
      where: { id: req.params.id },
      data: { status }
    });
    res.json({ success: true, data: updated });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE /api/v1/contact/:id (Protected)
router.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    await prisma.contactMessage.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Message deleted' });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

export default router;
