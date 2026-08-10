import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// GET /api/v1/publications
router.get('/', async (req: Request, res: Response) => {
  try {
    const list = await prisma.publication.findMany({
      where: { published: true },
      include: {
        authors: { orderBy: { order: 'asc' } },
        keywords: true
      },
      orderBy: { publicationDate: 'desc' }
    });
    res.json({ success: true, data: list });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/v1/publications (Protected)
router.post('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const doctor = await prisma.doctor.findFirst();
    if (!doctor) return res.status(400).json({ success: false, message: 'Doctor missing' });

    const { authorsList, keywordsList, ...pubData } = req.body;

    const created = await prisma.publication.create({
      data: {
        ...pubData,
        doctorId: doctor.id,
        authors: authorsList ? {
          create: authorsList.map((a: string, i: number) => ({ name: a, order: i + 1 }))
        } : undefined,
        keywords: keywordsList ? {
          create: keywordsList.map((k: string) => ({ keyword: k }))
        } : undefined
      },
      include: { authors: true, keywords: true }
    });

    res.json({ success: true, data: created });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE /api/v1/publications/:id
router.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    await prisma.publication.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Publication deleted' });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

export default router;
