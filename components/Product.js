import React from "react";
import Image from "next/image";

export const Product = ({ data }) => {
  return (
    <div className={"grid grid-cols-3 mb-5 gap-y-4"}>
      {data.length > 0 ? (
        data.map((e) => (
          <div
            key={e.node.name}
            className="flex flex-col bg-white rounded-sm hover:ease-in-out w-96 hover:shadow-lg hover:delay-100 hover:transition-all"
          >
            <div className="relative w-full h-96">
              <Image
                objectFit="cover"
                src={`https:${e.node.thumbnailImage.file.url}`}
                alt={e.node.name}
                layout={"fill"}
              />
            </div>
            <span className="flex flex-col justify-between p-4 text-sm border-t-2 border-black-300">
              <h3 className="font-semibold">{e.node.name}</h3>
              <p className="text-orange-500">
                € {e.node.shopifyProductEu.variants.edges[0].node.price}
              </p>
            </span>
          </div>
        ))
      ) : (
        <h3 className="text-2xl">No products to show :/</h3>
      )}
    </div>
  );
};
