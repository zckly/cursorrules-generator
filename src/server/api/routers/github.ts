import { Octokit } from "@octokit/rest";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

const packageFiles = [
  "package.json",
  "Cargo.toml",
  "requirements.txt",
  "composer.json",
  "Gemfile",
  "pom.xml",
  "build.gradle",
  "go.mod",
];

export const githubRouter = createTRPCRouter({
  getRepos: protectedProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        perPage: z.number().min(1).max(100).default(25),
        searchTerm: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const octokit = new Octokit({ auth: ctx.session.user.accessToken });
      const { page, perPage, searchTerm } = input;

      // Fetch all repositories
      const allRepos = await octokit.paginate(
        octokit.repos.listForAuthenticatedUser,
        {
          per_page: 100,
          sort: "updated",
          direction: "desc",
        },
      );

      // Filter repositories based on search term
      const filteredRepos = searchTerm
        ? allRepos.filter((repo) =>
            repo.full_name.toLowerCase().includes(searchTerm.toLowerCase()),
          )
        : allRepos;

      const totalCount = filteredRepos.length;
      const startIndex = (page - 1) * perPage;
      const endIndex = startIndex + perPage;

      const paginatedRepos = filteredRepos.slice(startIndex, endIndex);

      return {
        repos: paginatedRepos.map(({ id, name, full_name }) => ({
          id,
          name,
          full_name,
        })),
        totalCount,
        displayedCount: paginatedRepos.length,
      };
    }),

  getRepoContents: protectedProcedure
    .input(z.object({ fullName: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const octokit = new Octokit({ auth: ctx.session.user.accessToken });
      const [owner, repo] = input.fullName.split("/");

      const { data: contents } = await octokit.repos.getContent({
        owner: owner!,
        repo: repo!,
        path: "",
      });

      const files = Array.isArray(contents)
        ? contents.map((item) => item.path)
        : [];

      let packageFile = null;
      for (const file of packageFiles) {
        if (files.includes(file)) {
          try {
            const { data } = await octokit.repos.getContent({
              owner: owner!,
              repo: repo!,
              path: file,
            });
            if ("content" in data) {
              packageFile = {
                name: file,
                content: Buffer.from(data.content, "base64").toString("utf-8"),
              };
            }
            break;
          } catch (error) {
            console.error(`Error fetching ${file}:`, error);
          }
        }
      }

      return { files, packageFile };
    }),
});
