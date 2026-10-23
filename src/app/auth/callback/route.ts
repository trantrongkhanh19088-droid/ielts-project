import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const type = requestUrl.searchParams.get('type');
  const next = requestUrl.searchParams.get('next') || '/auth?mode=update-password';

  if (code) {
    // Forward the authorization code to /auth?mode=update-password so the client session can exchange it
    const redirectUrl = new URL('/auth', request.url);
    redirectUrl.searchParams.set('mode', 'update-password');
    redirectUrl.searchParams.set('code', code);
    if (type) redirectUrl.searchParams.set('type', type);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.redirect(new URL(next, request.url));
}
