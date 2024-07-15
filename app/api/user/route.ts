import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { verifyToken } from '../../../lib/jwt';

export async function GET(request: NextRequest) {
  // get user from DB - not hardcoded ideally for the search params
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');
  const authHeader = request.headers.get('authorization');
  const token = authHeader && authHeader.split(' ')[1];

  const decoded = verifyToken(token);

  // if (!decoded) {
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  // }

  if (!username) {
    return NextResponse.json({ error: 'Please enter a username' }, { status: 404 });
  }

  const user = await prisma.user.findUnique({ where: { username } });

  // if no user then respond with message
  if (!user) {
    return NextResponse.json({ error: 'Cannot find user' }, { status: 404 });
  }

  // return user if found
  return NextResponse.json(user, { status: 200 });
}
