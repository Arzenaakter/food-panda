"use client";
import { HiOutlineMinusSmall } from "react-icons/hi2";
import { GoPlus } from "react-icons/go";
import { useEffect, useState, useRef } from "react";
import StyledSelect from "./Select";
import FrequentlyBoughtItem from "./FrequentlyBoughtItem";
import AddOnItemsComponent from "./AddOnItemsComponent";

const ItemAddToCartModal = ({
  incrementQuantity,
  decrementQuantity,
  closeModal,
  quantity,
  selectedItem,
  currencySymbol,
  handleAddToCart,
}) => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [specialRequest, setSpecialRequest] = useState("");
  const [availabilityOption, setAvailabilityOption] = useState("");
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const contentHeight = contentRef.current.scrollHeight;
        const scrollTop = contentRef.current.scrollTop;
        setIsHeaderVisible(scrollTop > 0 && scrollTop < contentHeight);
      }
    };

    if (contentRef.current) {
      contentRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (contentRef.current) {
        contentRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);
  const handleSelect = (variant) => {
    setSelectedVariant(variant);
  };
  // const handleAddToCart = () => {
  //   const selectedFood = {
  //     selectedVariant,
  //     selectedItem,
  //     quantity,
  //     specialRequest,
  //     availabilityOption,
  //     selectedAddOns, // Include selected add-ons
  //   };

  //   const existingCart = JSON.parse(localStorage.getItem("selectedFood")) || [];
  //   const updatedCart = Array.isArray(existingCart)
  //     ? [...existingCart, selectedFood]
  //     : [selectedFood];

  //   localStorage.setItem("selectedFood", JSON.stringify(updatedCart));
  //   closeModal();
  // };

  const onAddToCart = () => {
    const selectedFood = {
      selectedVariant,
      selectedItem,
      quantity,
      specialRequest,
      availabilityOption,
      selectedAddOns,
    };

    handleAddToCart(selectedFood); // Use the handleAddToCart function from props
    closeModal();
  };

  return (
    <div className="  fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white relative rounded-lg w-11/12 md:w-1/2 lg:w-[700px] h-[450px] flex flex-col overflow-hidden">
        {/* Header */}
        <div
          className={`flex justify-between items-center p-4 border-b bg-white z-10 ${
            isHeaderVisible ? "sticky top-0" : "hidden"
          }`}
        >
          <h2 className="text-xl font-bold">{selectedItem?.name}</h2>
        </div>
        <button
          onClick={closeModal}
          className="text-gray-600 shadow-xl bg-white shadow-gray-200  top-2 z-10 right-5 absolute hover:text-gray-700 border flex justify-center items-center w-10 h-10 rounded-full"
        >
          ✕
        </button>

        {/* Content */}
        <div ref={contentRef} className=" overflow-y-auto  flex-1">
          <img src={selectedItem?.itemImg?.src} alt="" className="" />
          <p className="text-gray-600 px-4">{selectedItem?.description}</p>
          <p className="text-lg font-bold text-gray-800 mt-4 px-4">
            {currencySymbol} {selectedItem?.price}
          </p>
          {/* variation */}
          <div
            className={`rounded-2xl border p-4 mx-4 ${
              selectedVariant ? "bg-[#F7F7F7]" : "bg-primary/5"
            }`}
          >
            <div className="flex justify-between items-center mb-3">
              <div>
                <h4 className="font-semibold text-lg">Variation</h4>
                <p>Select 1</p>
              </div>
              <div>
                <button
                  className={`py-1 px-4 text-sm rounded-full ${
                    selectedVariant
                      ? "bg-white text-black border border-gray-300"
                      : "bg-primary text-white"
                  }`}
                >
                  {selectedVariant ? "Completed" : "Required"}
                </button>
              </div>
            </div>
            {selectedItem.variation.map((variant, index) => (
              <div
                key={index}
                className="flex justify-between  gap-5 space-y-4"
              >
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="variation"
                    value={variant.name}
                    checked={selectedVariant?.name === variant?.name}
                    onChange={() => handleSelect(variant)}
                    // className="h-4 w-4 text-black bg-black focus:ring-black"
                    className="h-4 w-4 text-black bg-white border-gray-300 focus:ring-0"
                  />
                  <span>{variant.name}</span>
                </label>
                <p>
                  {currencySymbol} {variant.price}
                </p>
              </div>
            ))}
          </div>
          {/* addOnItems */}
          <div>
            <AddOnItemsComponent
              selectedItem={selectedItem}
              currencySymbol={currencySymbol}
              selectedAddOns={selectedAddOns}
              setSelectedAddOns={setSelectedAddOns}
            />
          </div>
          {/* Frequently bought together */}
          <div>
            <FrequentlyBoughtItem
              selectedItem={selectedItem}
              currencySymbol={currencySymbol}
            />
          </div>
          {/* Special Instructions start */}
          <div className="p-4 mx-auto">
            <div className="mb-6">
              <h4 className="font-semibold text-lg mb-1">
                Special instructions
              </h4>
              <p className="text-sm text-gray-500 mb-2">
                Special requests are subject to the restaurant's approval. Tell
                us here!
              </p>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none  "
                placeholder="e.g. No mayo"
                rows="3"
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
              ></textarea>
            </div>

            {/* If this item is not available */}
            {/* <div>
              <h4 className="font-semibold text-lg mb-1">
                If this item is not available
              </h4>

              <StyledSelect setAvailabilityOption={setAvailabilityOption} />
            </div> */}
          </div>
          {/* Special Instructions end */}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-4 border-t">
          <div className="flex items-center space-x-2 lg:w-[20%]">
            <button
              onClick={decrementQuantity}
              className="w-8 h-8 border border-gray-300 rounded-full text-2xl text-gray-500 flex items-center justify-center"
            >
              <HiOutlineMinusSmall />
            </button>
            <span className="font-semibold text-gray-600">{quantity}</span>
            <button
              onClick={incrementQuantity}
              className="w-8 h-8 border border-gray-300 text-gray-500 rounded-full text-2xl flex items-center justify-center"
            >
              <GoPlus />
            </button>
          </div>
          <div className="lg:w-[80%]">
            <button
              onClick={onAddToCart}
              className={`px-4 py-3 w-full rounded-lg ${
                selectedVariant
                  ? "bg-primary/90 hover:bg-primary/100 text-white"
                  : "bg-gray-400 text-white"
              }`}
              disabled={!selectedVariant}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemAddToCartModal;
