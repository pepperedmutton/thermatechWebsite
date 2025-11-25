const fs = require('fs/promises');
const path = require('path');
const { newDb } = require('pg-mem');

const DB_EXPORT_PATH = path.join(__dirname, '..', 'data', 'messages.json');

// Use pg-mem to avoid native drivers; knex uses its Postgres dialect.
const memDb = newDb({ autoCreateForeignKeyIndices: true });
const knex = memDb.adapters.createKnex();

async function ensureSchema() {
  const hasMessages = await knex.schema.hasTable('messages');
  if (!hasMessages) {
    await knex.schema.createTable('messages', table => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('phone');
      table.string('email').notNullable();
      table.text('message').notNullable();
      table.string('source').defaultTo('contact-form');
      table.boolean('is_bot').notNullable().defaultTo(false);
      table.timestamp('created_at', { useTz: false }).notNullable().defaultTo(knex.fn.now());
    });
  }

  // Seed once from the existing JSON dump if the table is empty.
  const existing = await knex('messages').count('id as count').first();
  const count = Number(existing?.count ?? existing?.COUNT ?? 0);
  if (count === 0) {
    await seedFromExport();
  }
}

async function seedFromExport() {
  try {
    const raw = await fs.readFile(DB_EXPORT_PATH, 'utf8');
    const data = JSON.parse(raw);
    if (!Array.isArray(data) || data.length === 0) return;

    const rows = data.map(item => ({
      id: typeof item.id === 'number' ? item.id : undefined,
      name: item.name ?? '',
      phone: item.phone ?? null,
      email: item.email ?? '',
      message: item.message ?? '',
      source: item.source ?? 'import',
      is_bot: Boolean(item.honeypot),
      created_at: item.timestamp
        ? new Date(item.timestamp).toISOString()
        : new Date().toISOString(),
    }));

    await knex('messages').insert(rows);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.warn('[db] Failed to seed from messages.json:', error.message);
    }
  }
}

async function addMessage(payload) {
  const [saved] = await knex('messages')
    .insert(payload)
    .returning(['id', 'created_at', 'name', 'phone', 'email', 'message']);
  return saved;
}

async function getAllMessages() {
  const rows = await knex('messages')
    .select('id', 'created_at', 'name', 'phone', 'email', 'message')
    .orderBy('created_at', 'desc');

  return rows.map(row => ({
    ...row,
    created_at:
      row.created_at instanceof Date
        ? row.created_at.toISOString()
        : new Date(row.created_at).toISOString(),
  }));
}

async function exportMessages() {
  const rows = await getAllMessages();
  return rows.map(row => ({
    id: row.id,
    timestamp: row.created_at,
    name: row.name,
    phone: row.phone,
    email: row.email,
    message: row.message,
  }));
}

module.exports = {
  knex,
  ensureSchema,
  addMessage,
  getAllMessages,
  exportMessages,
};
