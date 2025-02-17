"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function SharePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleShare = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/videos`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify({ url }),
        }
      );

      if (response.ok) {
        setMessage("Video shared successfully!");
        setUrl("");
        setError("");
        setTimeout(() => router.push("/"), 2000);
      } else {
        const responseBody = await response.json();
        setError(responseBody.error);
        setMessage("");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen flex pt-24 items-start p-6 justify-center">
      <div className="max-w-md w-full p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Share a Youtube Movie</h1>
        <form onSubmit={handleShare} className="space-y-4">
          <input
            type="url"
            id="youtube-url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter YouTube URL"
            className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 rounded text-white font-semibold hover:bg-blue-700 transition"
          >
            Share
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm font-medium text-green-400">
            {message}
          </p>
        )}
        {error && (
          <p className="mt-4 text-center text-sm font-medium text-red-500">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
