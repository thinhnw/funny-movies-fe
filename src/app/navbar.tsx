"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <Link href="/">
          <p className="text-2xl font-bold">Funny Movies</p>
        </Link>

        {user ? (
          <div className="flex items-center space-x-4">
            <p>{user.email}</p>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-gray-300 border border-gray-600 rounded hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Login / Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
