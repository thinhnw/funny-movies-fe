import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Login from "@/app/(auth)/login/page";

// Mock useAuth hook
vi.mock("@/context/AuthContext", () => ({
  useAuth: vi.fn(),
}));

// Mock useRouter
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

describe("Login", () => {
  const loginMock = vi.fn();
  const pushMock = vi.fn();

  beforeEach(() => {
    (useAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      login: loginMock,
    });
    (useRouter as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      push: pushMock,
    });
  });

  test("renders the login form correctly", () => {
    render(<Login />);
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("submits the form with valid inputs", async () => {
    loginMock.mockResolvedValueOnce({ success: true });

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith("test@example.com", "password123");
      expect(pushMock).toHaveBeenCalledWith("/");
    });
  });

  test("displays an error message on failed login", async () => {
    loginMock.mockResolvedValueOnce({
      success: false,
      message: "Invalid credentials",
    });

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    });
  });
});
