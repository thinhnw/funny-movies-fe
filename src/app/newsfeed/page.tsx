const mockData: string[] = [
  "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "https://www.youtube.com/watch?v=3JZ_D3ELwOQ",
  "https://www.youtube.com/watch?v=2Vv-BfVoq4g",
];

export default function Newsfeed() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">YouTube Newsfeed</h1>
      <div className="grid grid-cols-1 gap-6">
        {mockData.map((url: string, index: number) => {
          const videoId = extractYouTubeVideoId(url);
          const embedUrl = `https://www.youtube.com/embed/${videoId}`;

          return (
            <div key={index} className="border rounded-lg shadow-md p-4">
              <iframe
                width="100%"
                height="315"
                src={embedUrl}
                title={`YouTube Video ${index + 1}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Function to extract the video ID from a YouTube URL
const extractYouTubeVideoId = (url: string): string => {
  const urlParams = new URL(url).searchParams;
  return urlParams.get("v") || ""; // Return the video ID or an empty string if not found
};

