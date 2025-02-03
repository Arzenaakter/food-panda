import { useEffect, useState } from "react";
import { HiOutlineTrash, HiOutlineMinusSmall } from "react-icons/hi2";
import { GoPlus } from "react-icons/go";
import currency from "currency.js";
import PopularItem from "./PopularItem";
import { SiHuggingface } from "react-icons/si";
const OrderSummeryCard = ({
  incrementQuantity,
  decrementQuantity,
  quantity,
  setQuantity,
  openModal,
  closeModal,
  isModalOpen,
  selectedItem,
  setSelectedItem,
  currencySymbol,
  cartItems,
  setCartItems,
}) => {
  const [activeTab, setActiveTab] = useState("pickup");

  const updateQuantity = (index, newQuantity) => {
    const updatedCart = cartItems.map((item, i) => {
      if (i === index) {
        return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
      }
      return item;
    });

    setCartItems(updatedCart);
    localStorage.setItem("selectedFood", JSON.stringify(updatedCart));
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const addOnsTotal = item?.selectedAddOns?.reduce(
        (sum, addOn) => sum + (addOn.price || 0),
        0
      );

      const itemTotal = currency(item?.selectedItem?.price || 0, {
        symbol: "",
        precision: 2,
      })
        .add(item?.selectedVariant?.price || 0)
        .add(addOnsTotal || 0) // Ensure all add-ons are summed properly
        .multiply(item?.quantity || 1).value;

      return total + itemTotal;
    }, 0);
  };

  const removeItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("selectedFood", JSON.stringify(updatedCart));
  };

  return (
    <div className="lg:h-[100%]">
      <div className="lg:h-[75%] overflow-y-scroll">
        {/* Tabs */}
        <div className="m-4 flex justify-center items-center text-center bg-gray-50 rounded-md px-2 py-3">
          <div
            className={`cursor-pointer lg:w-[50%] lg:h-16 flex items-center justify-center ${
              activeTab === "delivery"
                ? "border bg-white p-2 rounded-md hover:bg-primary/10"
                : ""
            }`}
            onClick={() => setActiveTab("delivery")}
          >
            <div>
              <p className="font-semibold text-gray-600">Delivery</p>
              {cartItems.length > 0 ? (
                <p className="text-[12px] text-gray-600">
                  {activeTab === "delivery" ? "Standard time (35-50 mins)" : ""}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>

          <div
            className={`cursor-pointer lg:w-[50%] lg:h-16 flex items-center justify-center ${
              activeTab === "pickup"
                ? "border bg-white p-2 rounded-md hover:bg-primary/10"
                : ""
            }`}
            onClick={() => setActiveTab("pickup")}
          >
            <div>
              <p className="font-semibold text-gray-600">Pick-up</p>
              {cartItems.length > 0 ? (
                <p className="text-[12px] text-gray-600">
                  {activeTab === "pickup" ? "Standard time (20 mins)" : ""}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        {/* Tabs end */}

        <div>
          {cartItems.length > 0 ? (
            <div>
              <h3 className="font-bold text-xl text-gray-600 px-4">
                Your items
              </h3>

              {/* Items list */}
              <div className="px-4">
                {cartItems.map((item, index) => {
                  const itemTotal = currency(item?.selectedItem?.price || 0, {
                    symbol: "",
                    precision: 2,
                  })
                    .add(item?.selectedVariant?.price || 0)
                    .add(
                      item?.selectedAddOns?.reduce(
                        (sum, addOn) => sum + (addOn.price || 0),
                        0
                      ) // Sum all add-ons' prices
                    )
                    .multiply(item?.quantity || 1)
                    .format();

                  return (
                    <div
                      key={index}
                      className=" py-4 w-full items-center border-b"
                    >
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <div>
                            <img
                              src={item?.selectedItem?.itemImg.src}
                              alt=""
                              className="w-10 h-10 rounded-md"
                            />
                          </div>
                          <div className="w-full">
                            <h5 className=" text-gray-700 text-sm flex justify-between">
                              <span className="font-semibold">
                                {item?.selectedItem?.name}
                              </span>
                              <span className="flex gap-1">
                                {" "}
                                <span>{currencySymbol}</span>
                                <span> {item?.selectedItem?.price}</span>
                              </span>
                            </h5>
                            <p className="text-gray-900 text-sm flex justify-between">
                              <span>{item?.selectedVariant?.name}</span>
                              <span className="flex gap-1">
                                {" "}
                                <span>{currencySymbol}</span>
                                <span>{item?.selectedVariant?.price}</span>
                              </span>
                            </p>
                            {/* add on */}
                            <div className="my-2">
                              {item?.selectedAddOns &&
                              item?.selectedAddOns?.length > 0 ? (
                                <>
                                  {item?.selectedAddOns?.map(
                                    (addOnitem, index) => {
                                      console.log("addOnitem", addOnitem);
                                      return (
                                        <div key={index}>
                                          <div className="flex justify-between text-sm text-gray-800">
                                            <p className="flex gap-1">
                                              <span>Extra:</span>
                                              <span>{addOnitem?.name}</span>
                                            </p>
                                            <p className="flex gap-1">
                                              <span>{currencySymbol}</span>{" "}
                                              {addOnitem?.price}
                                            </p>
                                          </div>
                                        </div>
                                      );
                                    }
                                  )}
                                </>
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="flex justify-between gap-10 w-full ">
                              <p className="text-primary font-medium flex gap-1">
                                <span>{currencySymbol}</span> {itemTotal}
                              </p>

                              {/* Quantity controls */}
                              <div className="flex items-center space-x-2">
                                {item.quantity === 1 ? (
                                  <HiOutlineTrash
                                    className="cursor-pointer"
                                    onClick={() => removeItem(index)}
                                  />
                                ) : (
                                  <button
                                    onClick={() =>
                                      updateQuantity(index, item.quantity - 1)
                                    }
                                    className="w-8 h-8 border border-gray-300 rounded-full text-xl text-gray-500 flex items-center justify-center"
                                  >
                                    <HiOutlineMinusSmall />
                                  </button>
                                )}
                                <span className="font-semibold text-gray-600">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(index, item.quantity + 1)
                                  }
                                  className="w-8 h-8 border border-gray-300 text-gray-500 rounded-full text-xl flex items-center justify-center"
                                >
                                  <GoPlus />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Popular items section */}
              {/* <PopularItem
          incrementQuantity={incrementQuantity}
          decrementQuantity={decrementQuantity}
          quantity={quantity}
          setQuantity={setQuantity}
          openModal={openModal}
          closeModal={closeModal}
          isModalOpen={isModalOpen}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        /> */}

              {/* Order Summary */}
              <div className="my-5 space-y-4 p-4">
                <div className="flex text-gray-600 justify-between">
                  <p>Subtotal</p>
                  <p>
                    {currencySymbol} {calculateTotalPrice()}
                  </p>
                </div>
                <div className="flex text-gray-600 justify-between">
                  <p>Service fee</p>
                  <p>{currencySymbol} 4</p>
                </div>
                <div className="flex text-gray-600 justify-between">
                  <p>VAT</p>
                  <p>{currencySymbol} 13</p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="mt-10">
                <div className="flex justify-center items-center text-primary">
                  <SiHuggingface size={60} />
                </div>
                <h2 className="text-center font-semibold text-gray-800">
                  Hungry?
                </h2>
                <p className="text-center  text-gray-800">
                  You haven't added anything to your cart!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Review button */}
      <div className="w-full px-4 lg:h-[25%] flex justify-center">
        <div className="w-full">
          <div className="flex justify-between mt-2 mb-8 text-lg font-semibold">
            <h2 className="text-gray-700">
              Total{" "}
              <span className="ms-1 text-[12px]">(incl. fees and tax)</span>
            </h2>
            <p className="text-primary">
              {cartItems.length > 0 ? (
                <>
                  {currencySymbol} {calculateTotalPrice() + 4 + 13}
                </>
              ) : (
                <>0</>
              )}
            </p>
          </div>
          <div className="w-full">
            <button className="px-4 py-2 w-full rounded-lg font-semibold bg-primary/90 hover:bg-primary/100 text-white">
              Review payment and address
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummeryCard;
