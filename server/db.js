const { createClient } = require('@libsql/client');

// In production (Vercel) point TURSO_DATABASE_URL at your Turso libSQL database.
// Locally, with no env set, it falls back to an on-disk SQLite file so dev keeps working.
const url = process.env.TURSO_DATABASE_URL || 'file:server/darvelour.db';
const authToken = process.env.TURSO_AUTH_TOKEN;

const client = createClient(authToken ? { url, authToken } : { url });

// Normalize bound params: libSQL rejects `undefined`, so coerce it to null.
function toArgs(args) {
  return args.map((a) => (a === undefined ? null : a));
}

// libSQL rows are array-like with named columns; project to plain objects.
function rowsToObjects(result) {
  return result.rows.map((row) => {
    const obj = {};
    for (const col of result.columns) obj[col] = row[col];
    return obj;
  });
}

// Thin async shim mirroring the better-sqlite3 prepare().get/all/run API,
// so the existing SQL and call sites port over with just `await` added.
function prepare(sql) {
  return {
    async get(...args) {
      const result = await client.execute({ sql, args: toArgs(args) });
      return rowsToObjects(result)[0];
    },
    async all(...args) {
      const result = await client.execute({ sql, args: toArgs(args) });
      return rowsToObjects(result);
    },
    async run(...args) {
      const result = await client.execute({ sql, args: toArgs(args) });
      return {
        lastInsertRowid:
          result.lastInsertRowid != null ? Number(result.lastInsertRowid) : undefined,
        changes: result.rowsAffected,
      };
    },
  };
}

async function exec(sql) {
  await client.executeMultiple(sql);
}

module.exports = { client, prepare, exec };
