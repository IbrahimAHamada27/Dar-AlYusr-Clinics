import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const router = Router();
const prisma = new PrismaClient();

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1)
});

// POST /api/v1/auth/login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = loginSchema.parse(req.body);

    const user = await prisma.adminUser.findFirst({
      where: {
        OR: [{ username }, { email: username }]
      }
    });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const secret = process.env.JWT_SECRET || 'dribrahim_jwt_secret_key_2026_secure';
    const token = jwt.sign({ id: user.id, username: user.username }, secret, { expiresIn: '7d' });

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      }
    });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message || 'Login failed' });
  }
});

export default router;
