type ErrorStateProps = {
  error: string;
};

export default function ErrorState({ error }: ErrorStateProps) {
  return (
    <div className="py-12 text-center">
      <h2 className="text-2xl font-semibold text-gray-700">Error</h2>
      <p className="mt-2 text-gray-500">{error}</p>
    </div>
  );
}
