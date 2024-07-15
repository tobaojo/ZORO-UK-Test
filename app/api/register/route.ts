import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
  try {
    // Extracting data from the request body
    const { username, password, email, name } = await request.json();

    // Validate input fields
    if (!username || !email || !password || !name) {
      return NextResponse.json({ error: 'Please fill in all fields' }, { status: 400 });
    }

    // Check if the user already exists
    const exsistingUser = await prisma.user.findUnique({ where: { username } });
    if (exsistingUser) {
      return NextResponse.json({ error: 'Username already exists' }, { status: 401 });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user in the database
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
        name,
      },
    });

    // Respond with success and the created user
    return NextResponse.json({ success: true, user }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
