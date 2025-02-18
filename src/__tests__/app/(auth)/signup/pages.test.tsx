import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Signup from "@/app/(auth)/signup/page";

// Mock useAuth hook
vi.mock("@/context/AuthContext", () => ({
  useAuth: vi.fn(),
}));

// Mock useRouter
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

describe("Signup", () => {
  const signupMock = vi.fn();
  const pushMock = vi.fn();

  beforeEach(() => {
    (useAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      signup: signupMock,
    });
    (useRouter as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      push: pushMock,
    });
  });

  test("renders the signup form correctly", () => {
    render(<Signup />);
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign up/i })
    ).toBeInTheDocument();
  });

  test("submits the form with valid inputs and navigates to home", async () => {
    signupMock.mockResolvedValueOnce({ success: true });

    render(<Signup />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(signupMock).toHaveBeenCalledWith(
        "test@example.com",
        "password123"
      );
      expect(pushMock).toHaveBeenCalledWith("/");
    });
  });

  test("displays an error message on failed signup", async () => {
    signupMock.mockResolvedValueOnce({
      success: false,
      message: "Email already in use",
    });

    render(<Signup />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText("Email already in use")).toBeInTheDocument();
    });
  });

  test("displays a default error message if none is provided", async () => {
    signupMock.mockResolvedValueOnce({ success: false });

    render(<Signup />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText("Signup failed")).toBeInTheDocument();
    });
  });
});
