'use client';

import { usePrivy, useLogin } from "@privy-io/react-auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login } = useLogin({
    onComplete: () => {
      router.push("/org");
    }
  });
  const { ready, authenticated } = usePrivy();
  const router = useRouter();



  if (!ready) return <div>Loading...</div>;

  return (
    <main className="flex items-center justify-center min-h-screen bg-blue-600 text-center text-white text-xl">
      <div>
        <h1 className="mb-4 font-bold text-2xl">Welcome to App 3002</h1>
        <button
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => login()}
        >
          Login with Privy
        </button>
      </div>
    </main>
  );
}
