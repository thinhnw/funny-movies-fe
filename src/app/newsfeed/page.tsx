"use client";
import { useState, useEffect } from "react";
import cable from "@/utils/cable";
import { toast } from "react-toastify";
import { getCookie } from "@/utils/cookies";
import { Video } from "@/entities";
import VideoCard from "./VideoCard";
import PaginationControls from "./PaginationControls";
import LoadingIndicator from "./LoadingIndicator";
import ErrorState from "./ErrorState";
import EmptyState from "./EmptyState";

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

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorState error={error} />;
  if (videos.length === 0) return <EmptyState />;

  return (
    <div className="p-4">
      <div className="max-w-5xl mx-auto grid gap-6">
        {videos.map((video: Video, index: number) => (
          <VideoCard key={video.id} video={video} index={index} />
        ))}
        <PaginationControls
          page={page}
          totalPages={totalPages}
          onNext={handleNextPage}
          onPrevious={handlePreviousPage}
        />
      </div>
    </div>
  );
}
