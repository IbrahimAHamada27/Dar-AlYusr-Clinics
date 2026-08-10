import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// GET /api/v1/research/areas
router.get('/areas', async (req: Request, res: Response) => {
  try {
    const areas = await prisma.researchArea.findMany({ orderBy: { displayOrder: 'asc' } });
    res.json({ success: true, data: areas });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/v1/research/projects
router.get('/projects', async (req: Request, res: Response) => {
  try {
    const projects = await prisma.researchProject.findMany({ orderBy: { startDate: 'desc' } });
    res.json({ success: true, data: projects });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/v1/research/projects
router.post('/projects', authenticateToken, async (req: Request, res: Response) => {
  try {
    const doctor = await prisma.doctor.findFirst();
    if (!doctor) return res.status(400).json({ success: false, message: 'Doctor profile missing' });

    const project = await prisma.researchProject.create({
      data: {
        ...req.body,
        doctorId: doctor.id
      }
    });
    res.json({ success: true, data: project });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PUT /api/v1/research/projects/:id
router.put('/projects/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const updated = await prisma.researchProject.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json({ success: true, data: updated });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE /api/v1/research/projects/:id
router.delete('/projects/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    await prisma.researchProject.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Research project deleted' });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

export default router;
