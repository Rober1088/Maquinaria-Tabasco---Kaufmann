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

  const { companyName, email, password } = req.body;
  if (!companyName || !email || !password) {
    return res.status(400).json({ error: 'Nombre de empresa, correo y contraseña son requeridos' });
  }

  try {
    const signUpResult = await auth.api.signUpEmail({
      body: { email, password, name: companyName },
    });

    if (!signUpResult || !signUpResult.user) {
      return res.status(400).json({ error: 'No se pudo crear la cuenta del cliente' });
    }

    await db.update(user).set({ role: 'client' }).where(eq(user.id, signUpResult.user.id));

    const result = await db.insert(clients).values({
      companyName,
      email,
      userId: signUpResult.user.id,
    });

    const insertId = Number(result[0].insertId);
    const newClient = await db.select().from(clients).where(eq(clients.id, insertId)).limit(1);

    res.status(201).json(newClient[0]);
  } catch (error) {
    const msg = String(error);
    if (msg.includes('Duplicate') || msg.includes('unique')) {
      return res.status(400).json({ error: 'Ya existe un cliente con ese correo' });
    }
    res.status(500).json({ error: 'Error al crear cliente', message: msg });
  }
}
