import Link from "next/link";

export default function GithubLogin() {
  return (
    <Link
      href="/api/auth/signin"
      className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
    >
      Sign in with GitHub
    </Link>
  );
}
