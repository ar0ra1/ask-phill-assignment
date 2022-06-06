import React, { useState, memo, useMemo } from "react";

const Filters = ({
  allColors,
  allCategories,
  handleColorFilter,
  handleCategoryFilter,
  minPriceRange,
  maxPriceRange,
  handlePriceFilter,
  resetFilterProducts,
}) => {
  const [userMin, setUserMin] = useState(minPriceRange);
  const [userMax, setUserMax] = useState(maxPriceRange);
  const [userInducedChanged, setUserInducedChange] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(new Set());
  const [selectedColor, setSelectedColor] = useState(new Set());

  useMemo(() => {
    // only update when the user changes -> FIXES UI bug
    if (!userInducedChanged) {
      setUserMax(maxPriceRange);
      setUserMin(minPriceRange);
    }
  }, [maxPriceRange, minPriceRange, userInducedChanged]);

  const onResetClick = () => {
    setSelectedCategory(new Set());
    setSelectedColor(new Set());
    setUserInducedChange(false);
    resetFilterProducts();
  };

  const onCategorySelect = (newCategory) => {
    setSelectedCategory(
      selectedCategory.has(newCategory)
        ? new Set(Array.from(selectedCategory).filter((e) => e !== newCategory))
        : (prev) => new Set([...prev, newCategory])
    );
    handleCategoryFilter(newCategory);
  };

  const onColorSelect = (newColor) => {
    setSelectedColor(
      selectedColor.has(newColor)
        ? new Set(Array.from(selectedColor).filter((e) => e !== newColor))
        : (prev) => new Set([...prev, newColor])
    );
    handleColorFilter(newColor);
  };

  const onMinPriceChange = (e) => {
    const newMin = e.target.value;
    setUserMin(newMin);
    setUserInducedChange(true);
    handlePriceFilter([newMin, userMax]);
  };

  const onMaxPriceChange = (e) => {
    const newMax = e.target.value;
    setUserMax(newMax);
    setUserInducedChange(true);
    handlePriceFilter([userMin, newMax]);
  };

  return (
    <div className="flex flex-col max-w-sm gap-4 p-10 pb-20 rounded-sm shadow-md bg-secondaryBg h-fit">
      <h4 className="text-2xl font-bold text-orange-700">Filters</h4>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-5">
          <h5 className="font-semibold text-gray-500">Colors</h5>
          <div className="flex flex-row flex-wrap gap-3 my-4">
            {allColors.map((color) => (
              <div
                onClick={() => onColorSelect(color)}
                key={color}
                style={{ backgroundColor: color }}
                className={`w-7 h-7 rounded-full cursor-pointer drop-shadow-md hover:drop-shadow-xl transition-all ease-in-out delay-150 ${
                  selectedColor.has(color) && "border-cyan-300 border-2"
                } `}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-5 mt-10">
          <h5 className="font-semibold text-gray-500">Categories</h5>
          <div className="grid grid-cols-2 gap-5">
            {allCategories.sort() &&
              allCategories.map((category) => (
                <p
                  onClick={() => onCategorySelect(category)}
                  className={`cursor-pointer  transition-all ease-in-out delay-150 ${
                    selectedCategory.has(category) &&
                    "border-b-4 border-orange-400"
                  } `}
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
              onChange={(e) => onMinPriceChange(e)}
              className="w-20 px-4 py-2 leading-tight text-gray-700 border-b-2 border-gray-500 rounded appearance-none focus:outline-none bg-secondaryBg focus:border-orange-500"
              id="inline-full-name"
              type="number"
              value={userMin}
            />
            between
            <input
              onChange={(e) => onMaxPriceChange(e)}
              className="w-20 px-4 py-2 leading-tight text-gray-700 border-b-2 border-gray-500 rounded appearance-none focus:outline-none bg-secondaryBg focus:border-orange-500"
              id="inline-full-name"
              type="number"
              value={userMax}
            />
          </div>
        </div>
        <div className="flex items-center mt-10">
          <button
            disabled={
              userMin === minPriceRange &&
              userMax === maxPriceRange &&
              selectedCategory.size === 0 &&
              selectedColor.size === 0
            }
            onClick={() => onResetClick()}
            className="p-2 text-white bg-orange-700 border-r-2 w-36 hover:bg-orange-900 disabled:bg-orange-200"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export const FiltersComponent = memo(Filters);
