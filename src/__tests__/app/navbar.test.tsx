import { render, screen, fireEvent } from "@testing-library/react";
import { useAuth } from "@/context/AuthContext";
import { vi } from "vitest";
import { useRouter } from "next/navigation";
import Navbar from "@/app/navbar";

// Mock the `useAuth` hook
vi.mock("@/context/AuthContext", () => ({
  useAuth: vi.fn(),
}));

// Mock the `useRouter` hook
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

describe("Navbar Component", () => {
  beforeEach(() => {
    (useRouter as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      push: vi.fn(),
    });
  });

  test("renders brand name", () => {
    (useAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      user: null,
    });

    render(<Navbar />);
    expect(screen.getByText("Funny Movies")).toBeInTheDocument();
  });

  test("renders Login/Register link when no user is logged in", () => {
    (useAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      user: null,
    });

    render(<Navbar />);
    expect(screen.getByText("Login / Register")).toBeInTheDocument();
  });

  test("renders user info, share link, and logout button when user is logged in", () => {
    (useAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      user: { email: "test@example.com" },
      logout: vi.fn(),
    });

    render(<Navbar />);
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
    expect(screen.getByText("Share a movie")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  test("calls logout function when Logout button is clicked", () => {
    const logoutMock = vi.fn();
    (useAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      user: { email: "test@example.com" },
      logout: logoutMock,
    });

    render(<Navbar />);
    fireEvent.click(screen.getByText("Logout"));
    expect(logoutMock).toHaveBeenCalledTimes(1);
  });

});
