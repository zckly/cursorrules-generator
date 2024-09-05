import { getServerAuthSession } from "~/server/auth";
import GithubLogin from "../components/GithubLogin";
import RepoList from "../components/RepoList";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#1c1c1c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-lg tracking-tight">.cursorrules generator</h1>

        {session ? <RepoList /> : <GithubLogin />}
      </div>
    </main>
  );
}
