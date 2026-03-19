import type { Request, Response } from 'express';
import { db } from '../../../../db/client.js';
import { reports, reportPhotos, equipment, clients, user } from '../../../../db/schema.js';
import { eq } from 'drizzle-orm';
import { auth } from '../../../../../lib/auth/auth.js';

export default async function handler(req: Request, res: Response) {
  const session = await auth.api.getSession({ headers: new Headers(req.headers as Record<string, string>) });
  if (!session) return res.status(401).json({ error: 'No autenticado' });

  const dbUser = await db.select().from(user).where(eq(user.id, session.user.id)).limit(1);
  if (!dbUser.length || dbUser[0].role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const reportId = parseInt(req.params.reportId);
  if (isNaN(reportId)) return res.status(400).json({ error: 'ID inválido' });

  try {
    const report = await db.select().from(reports).where(eq(reports.id, reportId)).limit(1);
    if (!report.length) return res.status(404).json({ error: 'Reporte no encontrado' });

    const photos = await db.select().from(reportPhotos).where(eq(reportPhotos.reportId, reportId));
    const equip = await db.select().from(equipment).where(eq(equipment.id, report[0].equipmentId)).limit(1);
    const client = await db.select().from(clients).where(eq(clients.id, report[0].clientId)).limit(1);

    res.json({ report: report[0], photos, equipment: equip[0], client: client[0] });
  } catch (error) {
    res.status(500).json({ error: 'Error', message: String(error) });
  }
}
