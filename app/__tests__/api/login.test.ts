import { createMocks } from 'node-mocks-http';
import { POST } from '../../../app/api/login/route';
import { NextRequest, NextResponse } from 'next/server';

describe('/api/login API Endpoint', () => {
  it('returns success on valid credentials', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { username: 'username', password: 'password' },
    });

    const nextRequest = new NextRequest('http://localhost/api/login', {
      method: req.method,
      body: JSON.stringify(req.body),
    });

    const response = await POST(nextRequest);

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toEqual({ success: true });
  });

  it('returns error on invalid credentials', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { username: 'wrong', password: 'wrong' },
    });

    const nextRequest = new NextRequest('http://localhost/api/login', {
      method: req.method,

      body: JSON.stringify(req.body),
    });

    const response = await POST(nextRequest);

    expect(response.status).toBe(401);
    const data = await response.json();
    expect(data).toEqual({ error: 'Authentication failed' });
  });
});
