import React, { useState, useEffect, useMemo, useCallback } from "react";
import { isValidColor, formatCategories } from "../lib/helper";
import { FiltersComponent } from "./Filters";
import { Product } from "./Product";
import { Pagination } from "./Pagination";

const PAGE_SIZE = 12;

export const PageWrapper = ({ data }) => {
  const [allColors, setAllColors] = useState(new Set());
  const [allCategories, setAllCategories] = useState(new Set());
  const [page, setPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(0);

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

  // products to display handler
  // memo for future extendability
  const allProductsToDisplay = useMemo(() => {
    const dataToDisplay = edges;
    const startingIndex = (page - 1) * PAGE_SIZE;
    const endingIndex = startingIndex + PAGE_SIZE;
    setTotalPageCount(Math.ceil(dataToDisplay.length / PAGE_SIZE));
    // sort -> for future extendability
    dataToDisplay.sort((a, b) => a.node.name.localeCompare(b.node.name));
    return dataToDisplay.slice(startingIndex, endingIndex);
  }, [page, edges]);

  return (
    <div className="flex flex-row gap-7">
      <FiltersComponent
        allColors={memoizedAllColors}
        allCategories={memoizedAllCategories}
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
