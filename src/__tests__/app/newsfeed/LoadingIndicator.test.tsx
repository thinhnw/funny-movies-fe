import LoadingIndicator from "@/app/newsfeed/LoadingIndicator";
import { render, screen } from "@testing-library/react";

describe("LoadingIndicator Component", () => {
  test("renders loading message", () => {
    render(<LoadingIndicator />);
    
    expect(screen.getByText(/loading videos\.\.\./i)).toBeInTheDocument();
  });
});