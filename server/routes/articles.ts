import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// GET /api/v1/articles
router.get('/', async (req: Request, res: Response) => {
  try {
    const articles = await prisma.article.findMany({
      orderBy: { publishedAt: 'desc' }
    });
    res.json({ success: true, data: articles });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/v1/articles/:slug
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const article = await prisma.article.findUnique({
      where: { slug: req.params.slug }
    });
    if (!article) return res.status(404).json({ success: false, message: 'Article not found' });
    res.json({ success: true, data: article });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/v1/articles
router.post('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const doctor = await prisma.doctor.findFirst();
    if (!doctor) return res.status(400).json({ success: false, message: 'Doctor missing' });

    const item = await prisma.article.create({
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

// DELETE /api/v1/articles/:id
router.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    await prisma.article.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Article deleted' });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

export default router;
