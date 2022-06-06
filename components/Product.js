import React from "react";
import Image from "next/image";

export const Product = ({ data }) => {
  return (
    <div
      className={
        "grid md:grid-cols-3 mb-5 md:gap-y-4 gap-y-5 grid-cols-1 grid-rows-2 self-center"
      }
    >
      {data.length > 0 ? (
        data.map((e) => (
          <div
            onClick={() => alert("Product Page - Out of scope :P")}
            key={e.node.name}
            className="flex flex-col bg-white rounded-sm cursor-pointer hover:ease-in-out w-80 md:w-96 hover:shadow-lg hover:delay-100 hover:transition-all"
          >
            <div className="relative h-80 md:w-full md:h-96 w-80">
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
