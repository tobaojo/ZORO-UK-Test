import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { verifyToken } from '../../../lib/jwt';

export async function GET(request: NextRequest) {
  try {
    //// Extract search parameters and authorization header from the request
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');
    const authHeader = request.headers.get('authorization');
    const token = authHeader && authHeader.split(' ')[1];

    // Check if the token is provided
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if the username is provided in the query parameters
    if (!username) {
      return NextResponse.json({ error: 'Please enter a username' }, { status: 404 });
    }

    // Get the user form the database
    const user = await prisma.user.findUnique({ where: { username } });

    // if no user then respond with message
    if (!user) {
      return NextResponse.json({ error: 'Cannot find user' }, { status: 404 });
    }

    // return user if found
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
