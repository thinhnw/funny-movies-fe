import PaginationControls from "@/app/newsfeed/PaginationControls";
import { render, screen, fireEvent } from "@testing-library/react";

describe("PaginationControls", () => {
  test("renders the correct page and totalPages", () => {
    render(
      <PaginationControls
        page={2}
        totalPages={5}
        onNext={() => {}}
        onPrevious={() => {}}
      />
    );

    expect(screen.getByText(/Page 2 of 5/i)).toBeInTheDocument();
  });

  test("disables 'Previous' button on the first page", () => {
    render(
      <PaginationControls
        page={1}
        totalPages={5}
        onNext={() => {}}
        onPrevious={() => {}}
      />
    );

    expect(screen.getByText("Previous")).toBeDisabled();
  });

  test("disables 'Next' button on the last page", () => {
    render(
      <PaginationControls
        page={5}
        totalPages={5}
        onNext={() => {}}
        onPrevious={() => {}}
      />
    );

    expect(screen.getByText("Next")).toBeDisabled();
  });
});
