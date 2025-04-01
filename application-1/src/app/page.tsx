'use client';
import { usePrivy, useLogin } from "@privy-io/react-auth";

export default function Home() {
  const { login } = useLogin();
  const { ready, authenticated, user, logout } = usePrivy();
  const email = user?.email?.address;

  if (!ready) return <div>Loading...</div>;

  return (
    <main className="flex items-center justify-center min-h-screen bg-blue-600 text-center text-xl">
      Nothing to see here, for login go to <a href="/login" className="text-blue-300">Login</a> page
    </main>
  );
}
