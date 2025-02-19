import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Newsfeed from "@/app/newsfeed/page";
import { Video } from "@/entities";

const mockVideos: Video[] = [
    { id: 1, url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", title: "Video 1", description: "Description 1", user: { email: "user1@example.com" } },
    { id: 2, url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", title: "Video 2", description: "Description 2", user: { email: "user2@example.com" } },
];

describe("Newsfeed Component", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("displays ErrorState on fetch error", async () => {
    global.fetch = vi.fn(() =>
      Promise.reject(new Error("Failed to fetch videos"))
    );

    render(<Newsfeed />);

    await waitFor(() =>
      expect(
        screen.getByText("Unable to load videos. Please try again later.")
      ).toBeInTheDocument()
    );
  });

  test("displays EmptyState when no videos are returned", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ videos: [], total_videos: 0 }),
      } as Response)
    );

    render(<Newsfeed />);

    await waitFor(() =>
      expect(screen.getByText("No videos available")).toBeInTheDocument()
    );
  });

    test("renders videos on successful fetch", async () => {
      global.fetch = vi.fn(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ videos: mockVideos, total_videos: 2 }),
      } as Response));

      render(<Newsfeed />);

      await waitFor(() => {
        expect(screen.getByText("Video 1")).toBeInTheDocument();
        expect(screen.getByText("Video 2")).toBeInTheDocument();
      });
    });

    test("handles pagination correctly", async () => {
      global.fetch = vi.fn()
        .mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({
                videos: mockVideos,
                total_videos: 10,
            })
        }).mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({
                videos: mockVideos,
                total_videos: 10,
            })
        })

      render(<Newsfeed />);
      await waitFor(() =>
        expect(screen.getByText("Video 1")).toBeInTheDocument()
      );

      fireEvent.click(screen.getByText("Next"));
      await waitFor(() =>
        expect(screen.getByText("Video 2")).toBeInTheDocument()
      );
    });

  
});
