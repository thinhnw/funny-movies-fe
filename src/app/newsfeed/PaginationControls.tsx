type PaginationControlsProps = {
  page: number;
  totalPages: number;
  onNext: () => void;
  onPrevious: () => void;
};

export default function PaginationControls({
  page,
  totalPages,
  onNext,
  onPrevious,
}: PaginationControlsProps) {
  return (
    <div className="flex justify-between mt-6">
      <button
        onClick={onPrevious}
        disabled={page === 1}
        className="rounded-lg py-2 px-4 bg-gray-700 text-white disabled:opacity-50"
      >
        Previous
      </button>
      <span className="text-gray-700">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={onNext}
        disabled={page === totalPages}
        className="rounded-lg py-2 px-4 bg-gray-700 text-white disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
