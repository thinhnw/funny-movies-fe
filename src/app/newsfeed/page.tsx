"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import cable from "@/utils/cable";
import { toast } from "react-toastify";
import { getCookie, setCookie, deleteCookie } from "@/utils/cookies";

type Video = {
  id: number;
  title: string;
  url: string;
  description: string;
  user: {
    email: string;
  };
};

const ITEMS_PER_PAGE = 5;

export default function Newsfeed() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const subscription = cable.subscriptions.create(
      {
        channel: "NotificationChannel",
        token: getCookie("token"),
      },
      {
        received: (video: Video) => {
          toast(
            <div>
              <h5 className="font-semibold text-lg mb-2 text-gray-800">
                New Video Shared!
              </h5>
              <p className="text-sm font-medium text-gray-600">
                Video: <span className="font-bold">{video.title}</span>
              </p>
              <p className="text-sm text-gray-500">
                Shared by: <span className="italic">{video.user.email}</span>
              </p>
            </div>
          );
        },
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  });

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/videos?page=${page}&limit=${ITEMS_PER_PAGE}`
        );
        if (!response.ok) throw new Error("Failed to fetch videos");
        const data = await response.json();
        setVideos(data.videos);
        setTotalPages(Math.ceil(data.total_videos / ITEMS_PER_PAGE));
      } catch (error) {
        console.error("Error fetching videos:", error);
        setError("Unable to load videos. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  if (loading) {
    return (
      <div className="py-12 text-center">
        <p className="text-xl text-gray-500">Loading videos...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="py-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-700">Error</h2>
        <p className="mt-2 text-gray-500">{error}</p>
      </div>
    );
  }

  // Handle empty state
  if (videos.length === 0) {
    return (
      <div className="py-12 text-center empty-state">
        <h2 className="text-2xl font-semibold text-gray-700">
          No videos available
        </h2>
        <p className="mt-2 text-gray-500">
          Share your first video to get started!
        </p>
        <div className="mt-6">
          <Link
            className="rounded-lg py-3 px-5 bg-gray-800 text-white font-medium"
            data-turbo="false"
            href="/share"
          >
            Share videos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="max-w-5xl mx-auto grid gap-6">
        {videos.map((video: Video, index: number) => (
          <div
            key={index}
            className="border rounded-lg shadow-md p-4 flex flex-col md:flex-row gap-4"
          >
            {/* Video on the left */}
            <div className="flex-shrink-0 w-full md:w-1/2">
              <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${getYoutubeVideoId(
                  video.url
                )}?rel=0&origin=${window.location.origin}`}
                title={`YouTube Video ${index + 1}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Title and truncated description on the right */}
            <div className="flex flex-col w-full md:w-1/2">
              <h2 className="text-xl font-bold mb-2">{video.title}</h2>
              <p className="text-gray-700">Shared by: {video.user.email}</p>
              <br />
              <p className="text-gray-700 font-bold">Description:</p>
              <p className="text-gray-700 line-clamp-6">{video.description}</p>
            </div>
          </div>
        ))}
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className="rounded-lg py-2 px-4 bg-gray-700 text-white disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className="rounded-lg py-2 px-4 bg-gray-700 text-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

function getYoutubeVideoId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
}
