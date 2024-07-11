import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      username: 'username',
      email: 'user@example.com',
      name: 'Toba Ojo',
    },
    { status: 200 },
  );
}
