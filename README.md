# ZORO-UK-Test

This Project was created for the technical test for Zoro Uk. It is a login and user page created with Next.j and prisma and SQLite for database management.

I used Typescript to create this project along with TailwindCSS as a framework, and connected using a prisma database and wrote a test for logging in.


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

The Login details for this project are `username` and `password` - All lowercase

## Getting Started
```bash
git clone <repository-url>

npm install
```

Then set up environment variables.
In the root directory of the project, create a .env file and add the following line:

```bash
DATABASE_URL="file:./dev.db"
```
Then Run Prisma Migrations then generate the prisma client:
```bash
npx prisma migrate dev --name init

npx prisma generate
```

Seed the database: 
```bash
npx ts-node --transpile-only scripts/init-db.ts
```
And finally run the dev server: 
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Enhancements and considerations

If I were to add more features or to enhance this project. I would have added a registration page where new users would be create an account using a new /register endpoint.
Additionally for added security, I would have add JWT authentication for more secure login and protected routes. So users would need to login before they are able to access /user data.
