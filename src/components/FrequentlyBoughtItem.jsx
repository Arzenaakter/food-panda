import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const FrequentlyBoughtItem = ({ selectedItem, currencySymbol }) => {
  const [showAll, setShowAll] = useState(false);

  const totalItems = selectedItem.frequentlyItem.length;
  const visibleItems = showAll ? totalItems : 1;
  const hiddenItemCount = totalItems - visibleItems;

  return (
    <div className="px-4 my-6">
      <div className="flex justify-between">
        <div>
          <h3 className="font-semibold text-lg text-gray-900">
            Frequently bought together
          </h3>
          <p className="text-gray-700">Others around you liked this</p>
        </div>
        <div>
          <button className="py-1 px-4 text-sm rounded-full bg-gray-200 text-gray-600 border border-gray-300">
            Optional
          </button>
        </div>
      </div>
      <div className="mt-4">
        {selectedItem.frequentlyItem
          .slice(0, visibleItems)
          .map((item, index) => (
            <div key={index} className="flex justify-between gap-5 space-y-4">
              <div className="mb-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="variation"
                    value={item.name}
                    className="h-4 w-4 text-black bg-white border-gray-300"
                  />
                  <img
                    src={item?.frequentlyItemImg.src}
                    alt="item"
                    className="w-16 h-16 rounded-md"
                  />
                  <span>{item.name}</span>
                </label>
              </div>
              <p className="flex gap-1">
                <span>{currencySymbol}</span>
                <span>{item.price}</span>
              </p>
            </div>
          ))}

        {/* Show "See more (x)" only if there are hidden items */}
        {hiddenItemCount > 0 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-gray-800 font-semibold mt-2 flex gap-2 items-center"
          >
            {" "}
            <IoIosArrowDown />
            {showAll ? "See less" : `View  ${hiddenItemCount} more`}
          </button>
        )}
      </div>
    </div>
  );
};

export default FrequentlyBoughtItem;
