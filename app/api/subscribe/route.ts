import { NextResponse } from 'next/server';
import { addSubscriber } from '@/lib/subscribers';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_EMAIL_LENGTH = 254;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body.' },
      { status: 400 }
    );
  }

  const email =
    typeof body === 'object' && body !== null && 'email' in body
      ? (body as { email: unknown }).email
      : undefined;

  if (typeof email !== 'string' || email.trim().length === 0) {
    return NextResponse.json(
      { success: false, error: 'Email is required.' },
      { status: 400 }
    );
  }

  const trimmed = email.trim();
  if (trimmed.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(trimmed)) {
    return NextResponse.json(
      { success: false, error: 'Please enter a valid email address.' },
      { status: 400 }
    );
  }

  const result = await addSubscriber(trimmed);

  if (!result.ok && result.reason === 'duplicate') {
    return NextResponse.json(
      { success: false, error: 'That email is already subscribed.' },
      { status: 409 }
    );
  }

  if (!result.ok) {
    return NextResponse.json(
      { success: false, error: 'Could not save your subscription. Try again later.' },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, error: null }, { status: 201 });
}
