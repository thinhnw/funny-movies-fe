"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useState, FormEvent } from "react";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    const result = await login(email, password);
    if (result.success) {
      router.push("/");
    } else {
      setError(result.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center pt-32">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl mb-4">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>
        <p className="mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-500">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
