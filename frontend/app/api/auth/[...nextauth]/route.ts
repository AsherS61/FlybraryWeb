import { NextResponse } from 'next/server';

export async function GET() {
  const clientId = process.env.LINE_CHANNEL_ID!;
  const redirectUri = encodeURIComponent(process.env.LINE_REDIRECT_URI!);

  const authUrl =
    `https://access.line.me/oauth2/v2.1/authorize?` +
    `response_type=code&` +
    `client_id=${clientId}&` +
    `redirect_uri=${redirectUri}&` +
    `state=random123&` + // can be random
    `scope=profile%20openid%20email`;

  return NextResponse.redirect(authUrl);
}
