import { NextRequest, NextResponse } from 'next/server';
import { createExamSessionToken, validateRequestOrigin } from '@/lib/security';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  // Validate origin in production
  if (!validateRequestOrigin(req)) {
    return NextResponse.json({ error: 'Truy cập không hợp lệ' }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const taskType = searchParams.get('taskType') || 'task1';

  const token = createExamSessionToken(taskType);

  return NextResponse.json({
    token,
    issuedAt: Date.now(),
  });
}

export async function POST(req: NextRequest) {
  if (!validateRequestOrigin(req)) {
    return NextResponse.json({ error: 'Truy cập không hợp lệ' }, { status: 403 });
  }

  let taskType = 'task1';
  try {
    const body = await req.json();
    if (body.taskType) taskType = body.taskType;
  } catch {
    // default
  }

  const token = createExamSessionToken(taskType);

  return NextResponse.json({
    token,
    issuedAt: Date.now(),
  });
}
