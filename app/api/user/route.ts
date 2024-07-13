import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET(request: NextRequest) {
  // get user from DB - not hardcoded ideally
  const user = await prisma.user.findUnique({ where: { username: 'username' } });

  // if no user then respond with message
  if (!user) {
    return NextResponse.json({ error: 'Cannot find user' }, { status: 404 });
  }

  // return user if found
  return NextResponse.json(user, { status: 200 });
}
