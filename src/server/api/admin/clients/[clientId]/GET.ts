import type { Request, Response } from 'express';
import { db } from '../../../../db/client.js';
import { clients, equipment, reports, user } from '../../../../db/schema.js';
import { eq } from 'drizzle-orm';
import { auth } from '../../../../../lib/auth/auth.js';

export default async function handler(req: Request, res: Response) {
  const session = await auth.api.getSession({ headers: new Headers(req.headers as Record<string, string>) });
  if (!session) return res.status(401).json({ error: 'No autenticado' });

  const dbUser = await db.select().from(user).where(eq(user.id, session.user.id)).limit(1);
  if (!dbUser.length || dbUser[0].role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const clientId = parseInt(req.params.clientId);
  if (isNaN(clientId)) return res.status(400).json({ error: 'ID inválido' });

  try {
    const client = await db.select().from(clients).where(eq(clients.id, clientId)).limit(1);
    if (!client.length) return res.status(404).json({ error: 'Cliente no encontrado' });

    const clientEquipment = await db.select().from(equipment).where(eq(equipment.clientId, clientId));
    const clientReports = await db.select().from(reports).where(eq(reports.clientId, clientId)).orderBy(reports.createdAt);

    res.json({ client: client[0], equipment: clientEquipment, reports: clientReports });
  } catch (error) {
    res.status(500).json({ error: 'Error', message: String(error) });
  }
}
