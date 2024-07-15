import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
  try {
    const { username, password, email, name } = await request.json();

    if (!username || !email || !password || !name) {
      return NextResponse.json({ error: 'Please fill in all fields' }, { status: 400 });
    }
    const exsistingUser = await prisma.user.findUnique({ where: { username } });

    if (exsistingUser) {
      return NextResponse.json({ error: 'Username already exists' }, { status: 401 });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
        name,
      },
    });

    return NextResponse.json({ success: true, user }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
