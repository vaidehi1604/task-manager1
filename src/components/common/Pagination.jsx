const Pagination = ({ page, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center gap-1">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="px-3 py-1 border rounded disabled:opacity-40 hover:bg-gray-100"
      >
        ‹
      </button>

      {[...Array(totalPages)].map((_, i) => {
        const p = i + 1;
        return (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`px-3 py-1 rounded ${
              page === p
                ? "bg-sky-900 text-white"
                : "border hover:bg-gray-100"
            }`}
          >
            {p}
          </button>
        );
      })}

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-3 py-1 border rounded disabled:opacity-40 hover:bg-gray-100"
      >
        ›
      </button>
    </div>
  );
};

export default Pagination;
