import { SettingsDialog } from "~/components/SettingsDialog";
import { getServerAuthSession } from "~/server/auth";
import ClientContent from "../components/ClientContent";
import GithubLogin from "../components/GithubLogin";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#1c1c1c] text-white">
      <div className="container flex flex-col items-center justify-center gap-6 px-4 py-16">
        <div className="flex flex-col items-center justify-between gap-2">
          <h1 className="text-lg tracking-tight">.cursorrules generator</h1>
          <SettingsDialog />
        </div>

        {session ? <ClientContent /> : <GithubLogin />}
      </div>
    </main>
  );
}
