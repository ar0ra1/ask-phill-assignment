import React, { memo } from "react";

const Filters = ({ allColors, allCategories }) => {
  return (
    <div className="flex flex-col max-w-sm gap-4 p-10 pb-20 rounded-sm shadow-md bg-secondaryBg h-fit">
      <h4 className="text-2xl font-bold text-orange-700">Filters</h4>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-5">
          <h5 className="font-semibold text-gray-500">Colors</h5>
          <div className="flex flex-row flex-wrap gap-3 my-4">
            {allColors.map((color) => (
              <div
                key={color}
                style={{ backgroundColor: color }}
                className={`w-7 h-7 rounded-full cursor-pointer drop-shadow-md hover:drop-shadow-xl transition-all ease-in-out delay-150 `}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-5 mt-10">
          <h5 className="font-semibold text-gray-500">Categories</h5>
          <div className="flex flex-wrap gap-5">
            {allCategories.sort() &&
              allCategories.map((category) => (
                <p
                  className={`cursor-pointer  transition-all ease-in-out delay-150  `}
                  key={category}
                >
                  {category}
                </p>
              ))}
          </div>
        </div>
        <div className="flex flex-col gap-5 mt-10">
          <h5 className="font-semibold text-gray-500">Price Range</h5>
          <div className="flex flex-row items-center gap-4">
            <input
              className="w-20 px-4 py-2 leading-tight text-gray-700 border-b-2 border-gray-500 rounded appearance-none focus:outline-none bg-secondaryBg focus:border-orange-500"
              id="inline-full-name"
              type="number"
            />
            between
            <input
              className="w-20 px-4 py-2 leading-tight text-gray-700 border-b-2 border-gray-500 rounded appearance-none focus:outline-none bg-secondaryBg focus:border-orange-500"
              id="inline-full-name"
              type="number"
            />
          </div>
        </div>
        <div className="flex items-center mt-10">
          <button className="p-2 text-white bg-orange-700 border-r-2 w-36 hover:bg-orange-900 disabled:bg-orange-200">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export const FiltersComponent = memo(Filters);
