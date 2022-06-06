import React from "react";

export const Pagination = ({
  page,
  onPrevPageClick,
  onNextPageClick,
  totalPageCount,
}) => {
  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <div className="inline-flex gap-1">
        <button
          disabled={page === 1}
          onClick={onPrevPageClick}
          className="w-40 p-3 text-white transition-all ease-in-out delay-150 bg-orange-500 rounded-l-lg hover:shadow-sm hover:bg-orange-600 disabled:bg-orange-200"
        >
          Previous
        </button>
        <button
          disabled={page === totalPageCount}
          onClick={onNextPageClick}
          className="w-40 p-3 text-white transition-all ease-in-out delay-150 bg-orange-500 rounded-r-lg hover:shadow-sm hover:bg-orange-600 disabled:bg-orange-200"
        >
          Next
        </button>
      </div>
      <p>
        Page <span className="text-orange-500">{page}</span> of{" "}
        <span className="text-orange-500">{totalPageCount}</span>
      </p>
    </div>
  );
};
