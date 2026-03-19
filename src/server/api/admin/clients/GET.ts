import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { clients, user } from '../../../db/schema.js';
import { eq } from 'drizzle-orm';
import { auth } from '../../../../lib/auth/auth.js';

export default async function handler(req: Request, res: Response) {
  const session = await auth.api.getSession({ headers: new Headers(req.headers as Record<string, string>) });
  if (!session) return res.status(401).json({ error: 'No autenticado' });

  const dbUser = await db.select().from(user).where(eq(user.id, session.user.id)).limit(1);
  if (!dbUser.length || dbUser[0].role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  try {
    const allClients = await db
      .select({
        id: clients.id,
        companyName: clients.companyName,
        email: clients.email,
        userId: clients.userId,
        createdAt: clients.createdAt,
      })
      .from(clients)
      .orderBy(clients.companyName);

    res.json(allClients);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener clientes', message: String(error) });
  }
}
