import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { reports, equipment, clients } from '../../../db/schema.js';
import { eq } from 'drizzle-orm';
import { auth } from '../../../../lib/auth/auth.js';

export default async function handler(req: Request, res: Response) {
  const session = await auth.api.getSession({ headers: new Headers(req.headers as Record<string, string>) });
  if (!session) return res.status(401).json({ error: 'No autenticado' });

  try {
    const client = await db.select().from(clients).where(eq(clients.userId, session.user.id)).limit(1);
    if (!client.length) return res.status(404).json({ error: 'Cliente no encontrado' });

    const clientReports = await db
      .select({
        id: reports.id,
        title: reports.title,
        notes: reports.notes,
        createdAt: reports.createdAt,
        equipmentId: reports.equipmentId,
        economicNumber: equipment.economicNumber,
        description: equipment.description,
      })
      .from(reports)
      .leftJoin(equipment, eq(reports.equipmentId, equipment.id))
      .where(eq(reports.clientId, client[0].id))
      .orderBy(reports.createdAt);

    res.json({ client: client[0], reports: clientReports });
  } catch (error) {
    res.status(500).json({ error: 'Error', message: String(error) });
  }
}
