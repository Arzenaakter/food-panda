"use client";
import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import ItemAddToCartModal from "./ItemAddToCartModal";

const FoodItemsComponent = ({
  incrementQuantity,
  decrementQuantity,
  quantity,
  setQuantity,
  openModal,
  closeModal,
  isModalOpen,
  selectedItem,
  setSelectedItem,
  categories,
  currencySymbol,
}) => {
  return (
    <div className="p-4 ">
      {categories.map((category, index) => (
        <div key={index} className="mb-8 " id={category.name}>
          <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
            {category.items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                // id={category.id}
                className="bg-white p-4 rounded-lg shadow-md flex justify-between"
              >
                <div className="lg:w-[70%]">
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-gray-600">{item.description}</p>
                  <p className="text-lg font-bold text-gray-800 mt-2">
                    {currencySymbol} {item.price}
                  </p>
                </div>
                <div
                  className="lg:w-[30%] bg-cover bg-center relative rounded-md"
                  style={{ backgroundImage: `url(${item.itemImg.src})` }}
                >
                  <button
                    onClick={() => openModal(item)}
                    className="absolute bottom-2 right-2  bg-white w-10 h-10 rounded-full border shadow flex justify-center items-center"
                  >
                    <GoPlus className="text-gray-500 text-2xl" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {/* modal start */}
      {isModalOpen && selectedItem && (
        <ItemAddToCartModal
          incrementQuantity={incrementQuantity}
          decrementQuantity={decrementQuantity}
          closeModal={closeModal}
          quantity={quantity}
          selectedItem={selectedItem}
          currencySymbol={currencySymbol}
        />
      )}
    </div>
  );
};

export default FoodItemsComponent;
