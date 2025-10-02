export default function ClashesLoading() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Clashes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="border-2 border-gray-200 rounded-lg p-2 flex gap-2 flex-col shadow max-w-64 max-h-80">
              <div className="bg-gray-300 h-48 w-full rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="flex gap-2 mb-2">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="w-8 h-8 bg-gray-300 rounded-full"></div>
                ))}
              </div>
              <div className="h-10 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
