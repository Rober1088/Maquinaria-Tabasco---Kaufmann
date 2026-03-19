import type { Request, Response } from 'express';
import { db } from '../../../../../db/client.js';
import { reportPhotos, user } from '../../../../../db/schema.js';
import { eq } from 'drizzle-orm';
import { auth } from '../../../../../../lib/auth/auth.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = 'public/assets/reports';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Solo se permiten imágenes'));
  },
});

export const middleware = upload.array('photos', 20);

export default async function handler(req: Request, res: Response) {
  const session = await auth.api.getSession({ headers: new Headers(req.headers as Record<string, string>) });
  if (!session) return res.status(401).json({ error: 'No autenticado' });

  const dbUser = await db.select().from(user).where(eq(user.id, session.user.id)).limit(1);
  if (!dbUser.length || dbUser[0].role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const reportId = parseInt(req.params.reportId);
  if (isNaN(reportId)) return res.status(400).json({ error: 'ID inválido' });

  const files = req.files as Express.Multer.File[];
  if (!files || files.length === 0) {
    return res.status(400).json({ error: 'No se subieron fotos' });
  }

  try {
    const inserted = [];
    for (const file of files) {
      const result = await db.insert(reportPhotos).values({
        reportId,
        filename: file.filename,
        originalName: file.originalname,
        caption: null,
      });
      const insertId = Number(result[0].insertId);
      const photo = await db.select().from(reportPhotos).where(eq(reportPhotos.id, insertId)).limit(1);
      inserted.push(photo[0]);
    }
    res.status(201).json(inserted);
  } catch (error) {
    res.status(500).json({ error: 'Error al subir fotos', message: String(error) });
  }
}
