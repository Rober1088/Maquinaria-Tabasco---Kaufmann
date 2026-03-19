import {
  mysqlTable,
  int,
  varchar,
  text,
  timestamp,
  boolean,
} from 'drizzle-orm/mysql-core';

// ─── BetterAuth tables ───────────────────────────────────────────────────────

export const user = mysqlTable('user', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  emailVerified: boolean('email_verified').default(false),
  image: text('image'),
  role: varchar('role', { length: 20 }).default('client').notNull(), // 'admin' | 'client'
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

export const session = mysqlTable('session', {
  id: varchar('id', { length: 36 }).primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: varchar('token', { length: 255 }).notNull().unique(),
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  userId: varchar('user_id', { length: 36 })
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

export const account = mysqlTable('account', {
  id: varchar('id', { length: 36 }).primaryKey(),
  accountId: varchar('account_id', { length: 255 }).notNull(),
  providerId: varchar('provider_id', { length: 255 }).notNull(),
  userId: varchar('user_id', { length: 36 })
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: varchar('password', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

export const verification = mysqlTable('verification', {
  id: varchar('id', { length: 36 }).primaryKey(),
  identifier: varchar('identifier', { length: 255 }).notNull(),
  value: varchar('value', { length: 255 }).notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

// ─── App tables ───────────────────────────────────────────────────────────────

// Clientes (empresa)
export const clients = mysqlTable('clients', {
  id: int('id').primaryKey().autoincrement(),
  companyName: varchar('company_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  userId: varchar('user_id', { length: 36 }).references(() => user.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

// Equipos identificados por número económico (ej: Mont-10)
export const equipment = mysqlTable('equipment', {
  id: int('id').primaryKey().autoincrement(),
  economicNumber: varchar('economic_number', { length: 50 }).notNull(), // Mont-10
  description: varchar('description', { length: 255 }),
  clientId: int('client_id')
    .notNull()
    .references(() => clients.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

// Reportes fotográficos
export const reports = mysqlTable('reports', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 255 }).notNull(),
  notes: text('notes'),
  equipmentId: int('equipment_id')
    .notNull()
    .references(() => equipment.id, { onDelete: 'cascade' }),
  clientId: int('client_id')
    .notNull()
    .references(() => clients.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

// Fotos de cada reporte
export const reportPhotos = mysqlTable('report_photos', {
  id: int('id').primaryKey().autoincrement(),
  reportId: int('report_id')
    .notNull()
    .references(() => reports.id, { onDelete: 'cascade' }),
  filename: varchar('filename', { length: 255 }).notNull(),
  originalName: varchar('original_name', { length: 255 }).notNull(),
  caption: varchar('caption', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
});
