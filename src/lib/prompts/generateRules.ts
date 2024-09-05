export function generateRulesPrompt(
  contents: { files: string[] },
  packageInfo: string,
): string {
  return `Generate a .cursorrules file for the following repository:
Files: ${contents.files.join(", ")}
Package info:
${packageInfo}

Here's an example of what a good .cursorrules file looks like:
<input>
Package info:
{
  "name": "v1",
  "private": true,
  "workspaces": ["packages/*", "apps/*", "tooling/*"],
  "scripts": {
    "build": "turbo build",
    "clean": "git clean -xdf node_modules",
    "clean:workspaces": "turbo clean",
    "dev": "turbo dev --parallel",
    "dev:web": "turbo dev --filter=@v1/web",
    "dev:jobs": "turbo jobs --filter=@v1/jobs",
    "dev:app": "turbo dev --filter=@v1/app",
    "start:web": "turbo start --filter=@v1/web",
    "start:app": "turbo start --filter=@v1/app",
    "test": "turbo test --parallel",
    "format": "biome format --write .",
    "lint": "turbo lint && bun lint:repo",
    "lint:repo": "bunx sherif@latest",
    "lint:repo:fix": "bunx sherif@latest --fix",
    "typecheck": "turbo typecheck"
  },
  "devDependencies": {
    "@biomejs/biome": "1.8.3",
    "@t3-oss/env-nextjs": "^0.11.1",
    "turbo": "2.1.1",
    "typescript": "^5.5.4"
  },
  "packageManager": "bun@1.1.26"
}
</input>
<output>
You are an expert in TypeScript, Node.js, Next.js App Router, React, Shadcn UI, Radix UI and Tailwind.

Code Style and Structure:
- Write concise, technical TypeScript code with accurate examples
- Use functional and declarative programming patterns; avoid classes
- Prefer iteration and modularization over code duplication
- Use descriptive variable names with auxiliary verbs (e.g., isLoading, hasError)
- Structure files: exported component, subcomponents, helpers, static content, types

Naming Conventions:
- Use lowercase with dashes for directories (e.g., components/auth-wizard)
- Favor named exports for components

TypeScript Usage:
- Use TypeScript for all code; prefer interfaces over types
- Avoid enums; use maps instead
- Use functional components with TypeScript interfaces

Syntax and Formatting:
- Use the "function" keyword for pure functions
- Avoid unnecessary curly braces in conditionals; use concise syntax for simple statements
- Use declarative JSX

Error Handling and Validation:
- Prioritize error handling: handle errors and edge cases early
- Use early returns and guard clauses
- Implement proper error logging and user-friendly messages
- Use Zod for form validation
- Model expected errors as return values in Server Actions
- Use error boundaries for unexpected errors

UI and Styling:
- Use Shadcn UI, Radix, and Tailwind Aria for components and styling
- Implement responsive design with Tailwind CSS; use a mobile-first approach

Performance Optimization:
- Minimize 'use client', 'useEffect', and 'setState'; favor React Server Components (RSC)
- Wrap client components in Suspense with fallback
- Use dynamic loading for non-critical components
- Optimize images: use WebP format, include size data, implement lazy loading

Key Conventions:
- Use 'nuqs' for URL search parameter state management
- Optimize Web Vitals (LCP, CLS, FID)
- Limit 'use client':
  - Favor server components and Next.js SSR
  - Use only for Web API access in small components
  - Avoid for data fetching or state management

Follow Next.js docs for Data Fetching, Rendering, and Routing
</output>

Please create rules that would be suitable for this repository based on its structure, content, and package information. Consider the dependencies and project setup when generating the rules.

Don't say anything else, just output the rules.`;
}
