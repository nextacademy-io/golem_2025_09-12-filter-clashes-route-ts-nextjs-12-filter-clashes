export default function PeerDetailLoading() {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto animate-pulse">
        <div className="mb-6">
          <div className="h-10 bg-gray-300 rounded w-32 mb-4"></div>
          <div className="h-8 bg-gray-300 rounded w-48"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-300 h-96 rounded-lg"></div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-300 rounded w-3/4"></div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-4/5"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
