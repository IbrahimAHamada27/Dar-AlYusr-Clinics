import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// GET /api/v1/settings
router.get('/', async (req: Request, res: Response) => {
  try {
    const list = await prisma.websiteSetting.findMany();
    const settingsObj: Record<string, string> = {};
    list.forEach(item => {
      settingsObj[item.key] = item.value;
    });
    res.json({ success: true, data: settingsObj });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/v1/settings (Protected)
router.put('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const settings = req.body as Record<string, string>;

    for (const [key, value] of Object.entries(settings)) {
      await prisma.websiteSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value }
      });
    }

    res.json({ success: true, message: 'Settings updated' });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

export default router;
