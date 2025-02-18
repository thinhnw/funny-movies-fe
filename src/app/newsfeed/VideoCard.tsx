import { Video } from "@/entities";

type VideoCardProps = {
  video: Video;
  index: number;
};

export default function VideoCard({ video, index }: VideoCardProps) {
  return (
    <div className="border rounded-lg shadow-md p-4 flex flex-col md:flex-row gap-4">
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
      <div className="flex flex-col w-full md:w-1/2">
        <h2 className="text-xl font-bold mb-2">{video.title}</h2>
        <p className="text-gray-700">Shared by: {video.user.email}</p>
        <br />
        <p className="text-gray-700 font-bold">Description:</p>
        <p className="text-gray-700 line-clamp-6">{video.description}</p>
      </div>
    </div>
  );
}

function getYoutubeVideoId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
}
