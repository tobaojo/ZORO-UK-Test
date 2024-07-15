import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function POST(req: NextRequest) {
  try {
    // destructuring username and password from the request
    const { username, password } = await req.json();

    // Find user from database that the username and password matches req
    const user = await prisma.user.findUnique({ where: { username, password } });

    if (user) {
      // respond with success and status 200
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      // else respond with error message and status 401
      return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
    }
  } catch (error) {
    // generic error if error is thrown from request
    console.error('Error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
