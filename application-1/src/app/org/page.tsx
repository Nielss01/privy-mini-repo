'use client';

import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";

export default function OrgPage() {
  const { ready, authenticated, user, logout } = usePrivy();
  const router = useRouter();
  const email = user?.email?.address;

  const logout1 = () => {
    logout();
    router.push("/login");
  };


  if (!ready || !authenticated) return <div>Loading...</div>;

  return (
    <main className="flex items-center justify-center min-h-screen bg-green-500 text-center text-white text-xl">
      <div>
        <h1 className="mb-4">Hello {email}</h1>
        <p className="mb-4">You're inside the organization dashboard!</p>
        <button
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-700"
          onClick={() => logout1()}
        >
          Logout
        </button>
      </div>
    </main>
  );
}
