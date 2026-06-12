import { promises as fs } from 'fs';
import path from 'path';

export interface Subscriber {
  email: string;
  subscribedAt: string;
}

export type AddResult =
  | { ok: true }
  | { ok: false; reason: 'duplicate' | 'storage' };

const STORE_PATH = path.join(process.cwd(), 'lib', 'subscribers.json');
const REDIS_KEY = 'muskverse:subscribers';

const redisUrl =
  process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const redisToken =
  process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

const hasRedis = Boolean(redisUrl && redisToken);

/**
 * Upstash REST command. SADD returns 1 when the member is new and 0
 * when it already exists — duplicate detection is atomic.
 */
async function redisCommand(command: string[]): Promise<unknown> {
  const res = await fetch(
    `${redisUrl}/${command.map(encodeURIComponent).join('/')}`,
    {
      headers: { Authorization: `Bearer ${redisToken}` },
      cache: 'no-store',
    }
  );
  if (!res.ok) throw new Error(`Redis command failed: ${res.status}`);
  const payload = (await res.json()) as { result: unknown };
  return payload.result;
}

async function addToRedis(email: string): Promise<AddResult> {
  try {
    const added = await redisCommand(['SADD', REDIS_KEY, email]);
    if (added === 0) return { ok: false, reason: 'duplicate' };
    // Best-effort timestamp record; failure here shouldn't fail the signup
    await redisCommand([
      'HSET',
      `${REDIS_KEY}:meta`,
      email,
      new Date().toISOString(),
    ]).catch(() => undefined);
    return { ok: true };
  } catch {
    return { ok: false, reason: 'storage' };
  }
}

async function readFileStore(): Promise<Subscriber[]> {
  try {
    const raw = await fs.readFile(STORE_PATH, 'utf-8');
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Subscriber[]) : [];
  } catch {
    return [];
  }
}

async function addToFile(email: string): Promise<AddResult> {
  const existing = await readFileStore();
  if (existing.some((sub) => sub.email === email)) {
    return { ok: false, reason: 'duplicate' };
  }
  const next: Subscriber[] = [
    ...existing,
    { email, subscribedAt: new Date().toISOString() },
  ];
  try {
    await fs.writeFile(STORE_PATH, JSON.stringify(next, null, 2), 'utf-8');
    return { ok: true };
  } catch {
    return { ok: false, reason: 'storage' };
  }
}

/**
 * Stores a subscriber in Upstash Redis when configured (production on
 * Vercel), otherwise in lib/subscribers.json (local development).
 */
export async function addSubscriber(email: string): Promise<AddResult> {
  const normalized = email.trim().toLowerCase();
  return hasRedis ? addToRedis(normalized) : addToFile(normalized);
}
