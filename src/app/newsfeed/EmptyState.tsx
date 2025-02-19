import Link from "next/link";
export default function EmptyState() {
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
