import type { Request, Response } from 'express';
import { db } from '../../../../db/client.js';
import { reports, reportPhotos, equipment, clients } from '../../../../db/schema.js';
import { eq } from 'drizzle-orm';
import { auth } from '../../../../../lib/auth/auth.js';

export default async function handler(req: Request, res: Response) {
  const session = await auth.api.getSession({ headers: new Headers(req.headers as Record<string, string>) });
  if (!session) return res.status(401).json({ error: 'No autenticado' });

  const reportId = parseInt(req.params.reportId);
  if (isNaN(reportId)) return res.status(400).json({ error: 'ID inválido' });

  try {
    const client = await db.select().from(clients).where(eq(clients.userId, session.user.id)).limit(1);
    if (!client.length) return res.status(404).json({ error: 'Cliente no encontrado' });

    const report = await db.select().from(reports)
      .where(eq(reports.id, reportId))
      .limit(1);

    if (!report.length || report[0].clientId !== client[0].id) {
      return res.status(404).json({ error: 'Reporte no encontrado' });
    }

    const photos = await db.select().from(reportPhotos).where(eq(reportPhotos.reportId, reportId));
    const eq_ = await db.select().from(equipment).where(eq(equipment.id, report[0].equipmentId)).limit(1);

    res.json({ report: report[0], photos, equipment: eq_[0] });
  } catch (error) {
    res.status(500).json({ error: 'Error', message: String(error) });
  }
}
