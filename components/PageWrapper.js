import React, { useState, useEffect, useMemo } from "react";
import { isValidColor, formatCategories } from "../lib/helper";
import { FiltersComponent } from "./Filters";
import { Product } from "./Product";

export const PageWrapper = ({ data }) => {
  const [allColors, setAllColors] = useState(new Set());
  const [allCategories, setAllCategories] = useState(new Set());

  const edges = data.data.allContentfulProductPage.edges;
  const firstTwelve = edges.slice(0, 12);

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

  return (
    <div className="flex flex-row gap-7">
      <FiltersComponent
        allColors={memoizedAllColors}
        allCategories={memoizedAllCategories}
      />
      <Product data={firstTwelve} />
    </div>
  );
};
