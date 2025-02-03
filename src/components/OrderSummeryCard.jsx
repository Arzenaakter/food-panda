import { useEffect, useState } from "react";
import { HiOutlineTrash, HiOutlineMinusSmall } from "react-icons/hi2";
import { GoPlus } from "react-icons/go";
import currency from "currency.js";
import PopularItem from "./PopularItem";

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
}) => {
  const [activeTab, setActiveTab] = useState("pickup");
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("selectedFood")) || [];
    setCartItems(storedItems);
  }, []);

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
      const itemTotal = currency(item?.selectedItem?.price || 0, {
        symbol: "",
        precision: 2,
      })
        .add(item?.selectedVariant?.price || 0)
        .multiply(item?.quantity || 1).value;
      return total + itemTotal;
    }, 0);
  };

  return (
    <div className="lg:h-[100%]">
      <div className="lg:h-[75%] overflow-y-scroll">
        {/* Tabs */}
        <div className="m-4 flex justify-center items-center text-center bg-gray-50 rounded-md px-2 py-3">
          <div
            className={`cursor-pointer lg:w-[50%] lg:h-16 flex items-center justify-center ${
              activeTab === "delivery"
                ? "border bg-white p-2 rounded-md hover:bg-[#FDF2F7]"
                : ""
            }`}
            onClick={() => setActiveTab("delivery")}
          >
            <div>
              <p className="font-semibold text-gray-600">Delivery</p>
              <p className="text-[12px] text-gray-600">
                {activeTab === "delivery" ? "Standard time (35-50 mins)" : ""}
              </p>
            </div>
          </div>

          <div
            className={`cursor-pointer lg:w-[50%] lg:h-16 flex items-center justify-center ${
              activeTab === "pickup"
                ? "border bg-white p-2 rounded-md hover:bg-[#FDF2F7]"
                : ""
            }`}
            onClick={() => setActiveTab("pickup")}
          >
            <div>
              <p className="font-semibold text-gray-600">Pick-up</p>
              <p className="text-[12px] text-gray-600">
                {activeTab === "pickup" ? "Standard time (20 mins)" : ""}
              </p>
            </div>
          </div>
        </div>
        {/* Tabs end */}

        <h3 className="font-bold text-xl text-gray-600 px-4">Your items</h3>

        {/* Items list */}
        <div className="px-4">
          {cartItems.map((item, index) => {
            const itemTotal = currency(item?.selectedItem?.price || 0, {
              symbol: "",
              precision: 2,
            })
              .add(item?.selectedVariant?.price || 0)
              .multiply(item?.quantity || 1)
              .format();

            return (
              <div
                key={index}
                className="flex py-4 w-full items-center border-b"
              >
                <div className="space-y-2">
                  <h5 className="font-semibold text-gray-700 text-sm">
                    {item?.selectedItem?.name}
                  </h5>
                  <p className="text-gray-900 text-sm">
                    {item?.selectedVariant?.name}
                  </p>
                  <div className="flex justify-between gap-10">
                    <p className="text-[#E21E72] font-medium">Tk {itemTotal}</p>

                    {/* Quantity controls */}
                    <div className="flex items-center space-x-2">
                      {item.quantity === 1 ? (
                        <HiOutlineTrash />
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
                        onClick={() => updateQuantity(index, item.quantity + 1)}
                        className="w-8 h-8 border border-gray-300 text-gray-500 rounded-full text-xl flex items-center justify-center"
                      >
                        <GoPlus />
                      </button>
                    </div>
                  </div>
                  {/* Quantity controls end */}
                </div>
              </div>
            );
          })}
        </div>

        {/* Popular items section */}
        <PopularItem
          incrementQuantity={incrementQuantity}
          decrementQuantity={decrementQuantity}
          quantity={quantity}
          setQuantity={setQuantity}
          openModal={openModal}
          closeModal={closeModal}
          isModalOpen={isModalOpen}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />

        {/* Order Summary */}
        <div className="my-5 space-y-4 p-4">
          <div className="flex text-gray-600 justify-between">
            <p>Subtotal</p>
            <p>Tk {calculateTotalPrice()}</p>
          </div>
          <div className="flex text-gray-600 justify-between">
            <p>Service fee</p>
            <p>Tk 4</p>
          </div>
          <div className="flex text-gray-600 justify-between">
            <p>VAT</p>
            <p>Tk 13</p>
          </div>
        </div>
      </div>

      {/* Review button */}
      <div className="w-full px-4 lg:h-[25%] flex justify-center">
        <div className="w-full">
          <div className="flex justify-between mt-2 mb-8 text-lg font-semibold">
            <h2 className="text-gray-700">Total</h2>
            <p className="text-[#E21E72]">
              Tk {calculateTotalPrice() + 4 + 13}
            </p>
          </div>
          <div className="w-full">
            <button className="px-4 py-2 w-full rounded-lg font-semibold bg-[#FF2B85] hover:bg-[#C21760] text-white">
              Review payment and address
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummeryCard;
