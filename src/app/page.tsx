import { getServerAuthSession } from "~/server/auth";
import ClientContent from "../components/ClientContent";
import GithubLogin from "../components/GithubLogin";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#1c1c1c] text-white">
      <div className="container flex flex-col items-center justify-center gap-6 px-4 py-16">
        {session ? <ClientContent /> : <GithubLogin />}
      </div>
    </main>
  );
}
