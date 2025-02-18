import PaginationControls from "@/app/newsfeed/PaginationControls";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from 'vitest'


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

  test("calls onNext handler when 'Next' button is clicked", () => {
    const onNextMock = vi.fn();
    render(
      <PaginationControls
        page={2}
        totalPages={5}
        onNext={onNextMock}
        onPrevious={() => {}}
      />
    );

    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    // Verify that onNext was called
    expect(onNextMock).toHaveBeenCalledTimes(1);
  });

  test("calls onPrevious handler when 'Previous' button is clicked", () => {
    const onPreviousMock = vi.fn();
    render(
      <PaginationControls
        page={2}
        totalPages={5}
        onNext={() => {}}
        onPrevious={onPreviousMock}
      />
    );

    const previousButton = screen.getByText("Previous");
    fireEvent.click(previousButton);

    // Verify that onPrevious was called
    expect(onPreviousMock).toHaveBeenCalledTimes(1);
  });

  test("does not call onNext when 'Next' is disabled", () => {
    const onNextMock = vi.fn();
    render(
      <PaginationControls
        page={5}
        totalPages={5}
        onNext={onNextMock}
        onPrevious={() => {}}
      />
    );

    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    // Verify that onNext was not called
    expect(onNextMock).not.toHaveBeenCalled();
  });

  test("does not call onPrevious when 'Previous' is disabled", () => {
    const onPreviousMock = vi.fn();
    render(
      <PaginationControls
        page={1}
        totalPages={5}
        onNext={() => {}}
        onPrevious={onPreviousMock}
      />
    );

    const previousButton = screen.getByText("Previous");
    fireEvent.click(previousButton);

    // Verify that onPrevious was not called
    expect(onPreviousMock).not.toHaveBeenCalled();
  });
});
