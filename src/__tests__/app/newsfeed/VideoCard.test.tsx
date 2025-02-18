import VideoCard from "@/app/newsfeed/VideoCard";
import { Video } from "@/entities";
import { render, screen } from "@testing-library/react";

const video: Video = {
  id: 1,
  url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  title: "YouTube Video 1",
  description: "Video Description",
  user: { email: "user@email" },
};

describe("VideoCard", () => {
  it("should render the video card", () => {
    render(<VideoCard video={video} index={0} />);
    expect(screen.getByText(/YouTube Video 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Video Description/i)).toBeInTheDocument();
    expect(screen.getByText(/user@email/i)).toBeInTheDocument();

    const iframe = screen.getByTitle("YouTube Video 1") as HTMLIFrameElement;
    expect(iframe).toHaveAttribute(
      "src",
      "https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&origin=http://localhost:3000"
    );
  });
});
