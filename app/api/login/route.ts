import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import bcrypt from 'bcrypt';
import { generateToken } from '../../../lib/jwt';

export async function POST(req: NextRequest) {
  try {
    // destructuring username and password from the request
    const { username, password } = await req.json();

    // Find user from database that the username and password matches req

    const user = await prisma.user.findUnique({ where: { username } });

    if (user) {
      const isMatch = await bcrypt.compare(password, user?.password);
      if (isMatch) {
        const token = await generateToken(username);
        // respond with success and status 200 and send token
        return NextResponse.json({ success: true, token }, { status: 200 });
      } else {
        return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
      }
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
