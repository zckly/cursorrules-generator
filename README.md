# .cursorrules Generator

This is a [T3 Stack](https://create.t3.gg/) project that generates .cursorrules for your GitHub repositories.

## What is .cursorrules Generator?

.cursorrules Generator is an application that automatically creates .cursorrules files for your GitHub repositories. These files are used by the Cursor IDE to provide custom rules and settings for your projects.

## Technologies Used

This project is built using the T3 Stack, which includes:

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## How to Run

To run this project locally, you'll need to set up a few things:

1. Clone the repository
2. Install dependencies with `npm install` or `yarn install`
3. Set up your environment variables:
   - `ANTHROPIC_API_KEY` or `OPENAI_API_KEY`: For AI-powered rule generation
   - `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`: For GitHub authentication
4. Run the development server with `npm run dev` or `yarn dev`

## Features

- GitHub authentication
- Fetches user's GitHub repositories
- Generates .cursorrules based on repository contents
- Caches generated rules for quick access

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Learn More

To learn more about the T3 Stack and the technologies used in this project, check out the following resources:

- [T3 Stack Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available)

## Deployment

This project can be deployed on platforms like Vercel, Netlify, or using Docker. Make sure to set up the required environment variables on your deployment platform.
