export default function PeersLoading() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Peers</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="border border-gray-200 rounded-lg p-4 flex flex-col gap-3 shadow-sm bg-white">
              <div className="bg-gray-300 h-48 w-full rounded-md"></div>
              <div className="h-6 bg-gray-300 rounded w-3/4"></div>
              <div className="mt-auto flex justify-end">
                <div className="h-8 bg-gray-300 rounded w-24"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
