# myposter.ai

myposter.ai is a web application that allows users to browse and purchase
AI-generated posters. With a sleek user interface and seamless integration with
cutting-edge AI technology, myposter.ai aims to be the leader in its sector.

## Features

- AI-generated posters
- Custom poster generation based on user input
- User accounts with authentication and personalization
- Shopping cart functionality
- Secure payment processing with Stripe
- Admin dashboard for order management and shipping

## Tech Stack

- Frontend: Next.js v13 (beta app directory), React.js, TailwindCSS, Radix-ui
- Backend: Next.js serverless functions (API routes)
- Client-side API calls: React Query
- Database ORM: Prisma
- Authentication: next-auth
- Payment processing: Stripe
- Frontend hosting: Vercel
- Database: PostgresSQL hosted on Railway
- Package management: pnpm
- Language: TypeScript

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/flosrn/myposter.ai.git
```

2. Install dependencies:

```bash
pnpm install
```

3. Copy the \`.env.example\` file and rename it to \`.env.local\`:

```bash
cp .env.example .env
```

4. Generate a `NEXTAUTH_SECRET` using a random string generator or a password
   manager. You can also generate one using a command like:

```bash
openssl rand -base64 32
```

5. To obtain `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`, follow these steps:

    - Go to
      the [Google Developer Console](https://console.developers.google.com/)
    - Create a new project or select an existing one
    - Click on "Credentials" in the left-hand menu
    - Click on "Create credentials" and select "OAuth client ID"
    - Choose "Web application" as the Application type
    - Set the "Authorized JavaScript origins" to `http://localhost:3000` for
      local development
    - Set the "Authorized redirect URIs"
      to `http://localhost:3000/api/auth/callback/google`
    - Click "Create" to generate your `GOOGLE_CLIENT_ID`
      and `GOOGLE_CLIENT_SECRET`


6. For the rest of the environment variables, such as `DATABASE_URL`,
   Stripe-related variables, and Uploadcare, please contact the main maintainer
   of the project (flosrn).


4. Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to
discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
