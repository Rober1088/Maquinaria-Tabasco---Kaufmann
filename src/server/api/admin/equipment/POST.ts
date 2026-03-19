import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { equipment, user } from '../../../db/schema.js';
import { eq } from 'drizzle-orm';
import { auth } from '../../../../lib/auth/auth.js';

export default async function handler(req: Request, res: Response) {
  const session = await auth.api.getSession({ headers: new Headers(req.headers as Record<string, string>) });
  if (!session) return res.status(401).json({ error: 'No autenticado' });

  const dbUser = await db.select().from(user).where(eq(user.id, session.user.id)).limit(1);
  if (!dbUser.length || dbUser[0].role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { economicNumber, description, clientId } = req.body;
  if (!economicNumber || !clientId) {
    return res.status(400).json({ error: 'Número económico y cliente son requeridos' });
  }

  try {
    const result = await db.insert(equipment).values({
      economicNumber,
      description: description || null,
      clientId: parseInt(clientId),
    });

    const insertId = Number(result[0].insertId);
    const newEquipment = await db.select().from(equipment).where(eq(equipment.id, insertId)).limit(1);

    res.status(201).json(newEquipment[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear equipo', message: String(error) });
  }
}
