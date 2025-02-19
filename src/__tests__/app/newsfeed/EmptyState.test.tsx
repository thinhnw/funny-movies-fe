import EmptyState from "@/app/newsfeed/EmptyState";
import { render, screen } from "@testing-library/react";

describe("EmptyState", () => {

  test("renders heading and message", () => {
    render(<EmptyState />);

    expect(
      screen.getByRole("heading", { name: /no videos available/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/share your first video to get started!/i)
    ).toBeInTheDocument();
  });

  test("renders Share button with correct text", () => {
    render(<EmptyState />);

    const shareButton = screen.getByRole("link", { name: /share videos/i });

    expect(shareButton).toBeInTheDocument();
    expect(shareButton).toHaveTextContent("Share videos");
  });

  test("Share button has correct href", () => {
    render(<EmptyState />);

    const shareButton = screen.getByRole("link", { name: /share videos/i });

    expect(shareButton).toHaveAttribute("href", "/share");
  });
});
