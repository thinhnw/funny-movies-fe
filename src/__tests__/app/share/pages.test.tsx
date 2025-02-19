import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import SharePage from "@/app/share/page";

// Mock the `useAuth` hook
vi.mock("@/context/AuthContext", () => ({
  useAuth: vi.fn(),
}));

// Mock the `useRouter` hook
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

describe("SharePage Component", () => {
  beforeEach(() => {
    (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
      user: { token: "test-token" },
    });
    (useRouter as ReturnType<typeof vi.fn>).mockReturnValue({
      push: vi.fn(),
    });
  });

  test("renders the form and inputs correctly", () => {
    render(<SharePage />);
    expect(
      screen.getByPlaceholderText("Enter YouTube URL")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /share/i })).toBeInTheDocument();
  });

  test("displays success message on successful video share", async () => {
    global.fetch = vi.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ message: "Success" }),
    } as Response));

    render(<SharePage />);

    const input = screen.getByPlaceholderText("Enter YouTube URL");
    const button = screen.getByRole("button", { name: /share/i });

    fireEvent.change(input, {
      target: { value: "https://youtube.com/example" },
    });
    fireEvent.click(button);

    await waitFor(() => {
      expect(
        screen.getByText("Video shared successfully!")
      ).toBeInTheDocument();
    });

    expect(input).toHaveValue(""); // Ensure the input is cleared
  });

  test("displays error message on API failure", async () => {
    global.fetch = vi.fn(() => Promise.resolve({
      json: () => Promise.resolve({ error: { message: "Invalid YouTube URL" } }),
    } as Response))

    render(<SharePage />);

    const input = screen.getByPlaceholderText("Enter YouTube URL");
    const button = screen.getByRole("button", { name: /share/i });

    fireEvent.change(input, { target: { value: "https://example.com" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Invalid YouTube URL")).toBeInTheDocument();
    });
  });

  test("displays a generic error message on network failure", async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error("Network error")));

    render(<SharePage />);

    const input = screen.getByPlaceholderText("Enter YouTube URL");
    const button = screen.getByRole("button", { name: /share/i });

    fireEvent.change(input, {
      target: { value: "https://youtube.com/example" },
    });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Network error")).toBeInTheDocument();
    });
  });
});
