import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  isValidColor,
  formatCategories,
  checkForExisitngFilters,
  deleteKeyFromObject,
  filterOnColor,
  filterOnCategory,
  filterOnPrice,
} from "../lib/helper";
import { FiltersComponent } from "./Filters";
import { Product } from "./Product";
import { Pagination } from "./Pagination";

const PAGE_SIZE = 12;

export const PageWrapper = ({ data }) => {
  const [allColors, setAllColors] = useState(new Set());
  const [allCategories, setAllCategories] = useState(new Set());
  const [page, setPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [filterProducts, setFilterProducts] = useState({});
  const [minPriceRange, setMinPriceRange] = useState(Infinity);
  const [maxPriceRange, setMaxPriceRange] = useState(0);

  const edges = data.data.allContentfulProductPage.edges;

  // init
  useEffect(() => {
    [
      ...edges.map((o) => {
        if (o.node.colorFamily && isValidColor(o.node.colorFamily[0].name)) {
          setAllColors(
            (prev) => new Set([...prev, o.node.colorFamily[0].name])
          );
        }
        if (o.node.categoryTags) {
          setAllCategories(
            (prev) =>
              new Set([...prev, formatCategories(...o.node.categoryTags)])
          );
        }
      }),
    ];
  }, [edges]);

  const memoizedAllColors = useMemo(() => Array.from(allColors), [allColors]);
  const memoizedAllCategories = useMemo(
    () => Array.from(allCategories),
    [allCategories]
  );

  // pagination clicks
  const onNextPageClick = useCallback(() => {
    if (page + 1 <= totalPageCount) {
      setPage(page + 1);
    }
  }, [page, totalPageCount]);
  const onPrevPageClick = useCallback(() => {
    if (page - 1 !== 0) {
      setPage(page - 1);
    }
  }, [page]);

  // Filter Handlers
  const colorFilterCallBack = useCallback(
    (newColor) => {
      const existing = checkForExisitngFilters(
        "Color",
        newColor,
        filterProducts
      );
      if (existing.size === 0) {
        setFilterProducts((prev) => deleteKeyFromObject("Color", { ...prev }));
      } else {
        setFilterProducts((prev) => ({
          ...prev,
          ["Color"]: Array.from(existing),
        }));
      }
      setPage(1);
    },
    [filterProducts]
  );

  const categoryFilterCallBack = useCallback(
    (newCategory) => {
      const existing = checkForExisitngFilters(
        "Category",
        newCategory,
        filterProducts
      );
      if (existing.size === 0) {
        setFilterProducts((prev) =>
          deleteKeyFromObject("Category", { ...prev })
        );
      } else {
        setFilterProducts((prev) => ({
          ...prev,
          ["Category"]: Array.from(existing),
        }));
      }
      setPage(1);
    },
    [filterProducts]
  );

  const priceFilterCallBack = useCallback((newPrice) => {
    setPage(1);
    setFilterProducts((prev) => ({ ...prev, ["Price"]: [...newPrice] }));
  }, []);

  const applyFilters = useCallback(() => {
    return Object.entries(filterProducts).reduce((acc, [key, value]) => {
      return acc.filter((e) => {
        switch (key) {
          case "Color":
            return filterOnColor(value, e);
          case "Category":
            return filterOnCategory(value, e);
          case "Price":
            return filterOnPrice(value, e);
        }
      });
    }, edges);
  }, [filterProducts, edges]);

  // reset filters
  const resetFilterProducts = useCallback(() => {
    setFilterProducts({});
  }, []);

  // update min and max for each filter change
  const updatePrice = useCallback((data) => {
    const allPrices = data.map(
      (o) => o.node.shopifyProductEu.variants.edges[0].node.price
    );
    setMinPriceRange(Math.min(...(allPrices || 0)));
    setMaxPriceRange(Math.max(...allPrices) || 0);
  }, []);

  // products to display handler
  // memo for future extendability
  const allProductsToDisplay = useMemo(() => {
    const dataToDisplay =
      Object.keys(filterProducts).length !== 0 ? applyFilters(edges) : edges;
    const startingIndex = (page - 1) * PAGE_SIZE;
    const endingIndex = startingIndex + PAGE_SIZE;
    updatePrice(dataToDisplay);
    setTotalPageCount(Math.ceil(dataToDisplay.length / PAGE_SIZE));
    // sort -> for future extendability
    dataToDisplay.sort((a, b) => a.node.name.localeCompare(b.node.name));
    return dataToDisplay.slice(startingIndex, endingIndex);
  }, [page, edges, filterProducts, applyFilters, updatePrice]);

  return (
    <div className="flex flex-row gap-7">
      <FiltersComponent
        handleCategoryFilter={categoryFilterCallBack}
        handleColorFilter={colorFilterCallBack}
        allColors={memoizedAllColors}
        allCategories={memoizedAllCategories}
        minPriceRange={minPriceRange}
        maxPriceRange={maxPriceRange}
        handlePriceFilter={priceFilterCallBack}
        resetFilterProducts={resetFilterProducts}
      />
      <div className="flex flex-col grow-1">
        <Product data={allProductsToDisplay} />
        <Pagination
          page={page}
          totalPageCount={totalPageCount}
          onNextPageClick={onNextPageClick}
          onPrevPageClick={onPrevPageClick}
        />
      </div>
    </div>
  );
};
