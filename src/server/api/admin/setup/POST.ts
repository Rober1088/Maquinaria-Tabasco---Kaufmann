/**
 * One-time admin setup endpoint.
 * Creates the first admin user if no admin exists yet.
 * After the first admin is created, this endpoint becomes disabled.
 */
import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { user } from '../../../db/schema.js';
import { eq } from 'drizzle-orm';
import { auth } from '../../../../lib/auth/auth.js';

export default async function handler(req: Request, res: Response) {
  const { email, password, secretKey } = req.body;

  // Simple protection: require a setup key
  if (secretKey !== 'kaufmann-setup-2026') {
    return res.status(403).json({ error: 'Clave de configuración incorrecta' });
  }

  if (!email || !password) {
    return res.status(400).json({ error: 'Correo y contraseña requeridos' });
  }

  try {
    // Check if admin already exists
    const existingAdmin = await db.select().from(user).where(eq(user.role, 'admin')).limit(1);
    if (existingAdmin.length > 0) {
      return res.status(400).json({ error: 'Ya existe un administrador' });
    }

    const result = await auth.api.signUpEmail({
      body: { email, password, name: 'Administrador Kaufmann' },
    });

    if (!result?.user) {
      return res.status(400).json({ error: 'No se pudo crear el administrador' });
    }

    await db.update(user).set({ role: 'admin' }).where(eq(user.id, result.user.id));

    res.status(201).json({ message: 'Administrador creado exitosamente', email });
  } catch (error) {
    res.status(500).json({ error: 'Error', message: String(error) });
  }
}
