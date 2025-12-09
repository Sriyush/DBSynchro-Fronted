export function TableSkeleton() {
  return (
    <div className="animate-pulse space-y-3">
      <div className="h-4 bg-gray-200 rounded w-1/3"></div>

      <div className="grid grid-cols-4 gap-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-6 bg-gray-200 rounded"></div>
        ))}
      </div>

      {[...Array(5)].map((_, r) => (
        <div key={r} className="grid grid-cols-4 gap-2">
          {[...Array(4)].map((_, c) => (
            <div key={c} className="h-6 bg-gray-100 rounded"></div>
          ))}
        </div>
      ))}
    </div>
  );
}
