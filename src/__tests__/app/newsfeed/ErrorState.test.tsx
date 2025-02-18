import ErrorState from "@/app/newsfeed/ErrorState";
import { render, screen } from "@testing-library/react";

describe("ErrorState", () => {
  test("renders error heading and message", () => {
    const errorMessage = "Failed to fetch data";
    render(<ErrorState error={errorMessage}/>);

    expect(
      screen.getByRole("heading", { name: /error/i })
    ).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

});
