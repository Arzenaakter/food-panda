// import { useEffect, useState } from "react";
// import { HiOutlineTrash, HiOutlineMinusSmall } from "react-icons/hi2";
// import { GoPlus } from "react-icons/go";
// import currency from "currency.js";
// import PopularItem from "./PopularItem";
// import { SiHuggingface } from "react-icons/si";
// import { HiOutlineX } from "react-icons/hi";
// const OrderSummeryCard = ({
//   incrementQuantity,
//   decrementQuantity,
//   quantity,
//   setQuantity,
//   openModal,
//   closeModal,
//   isModalOpen,
//   selectedItem,
//   setSelectedItem,
//   currencySymbol,
//   cartItems,
//   setCartItems,
// }) => {
//   const [activeTab, setActiveTab] = useState("pickup");
//   const [isMobileView, setIsMobileView] = useState(false);

//   const updateQuantity = (index, newQuantity) => {
//     const updatedCart = cartItems.map((item, i) => {
//       if (i === index) {
//         return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
//       }
//       return item;
//     });

//     setCartItems(updatedCart);
//     localStorage.setItem("selectedFood", JSON.stringify(updatedCart));
//   };

//   const calculateTotalPrice = () => {
//     return cartItems.reduce((total, item) => {
//       const addOnsTotal = item?.selectedAddOns?.reduce(
//         (sum, addOn) => sum + (addOn.price || 0),
//         0
//       );

//       const itemTotal = currency(item?.selectedItem?.price || 0, {
//         symbol: "",
//         precision: 2,
//       })
//         .add(item?.selectedVariant?.price || 0)
//         .add(addOnsTotal || 0) // Ensure all add-ons are summed properly
//         .multiply(item?.quantity || 1).value;

//       return total + itemTotal;
//     }, 0);
//   };

//   const removeItem = (index) => {
//     const updatedCart = cartItems.filter((_, i) => i !== index);
//     setCartItems(updatedCart);
//     localStorage.setItem("selectedFood", JSON.stringify(updatedCart));
//   };

//   return (
//     <div className="lg:h-[100%]">
//       {/* content  */}
//       <div className={`${isMobileView ? "hidden" : "block"} lg:block`}>
//         <div className="lg:h-[75%] overflow-y-scroll">
//           {/* Tabs */}
//           <div className="m-4 flex justify-center items-center text-center bg-gray-50 rounded-md px-2 py-3">
//             <div
//               className={`cursor-pointer lg:w-[50%] lg:h-16 flex items-center justify-center ${
//                 activeTab === "delivery"
//                   ? "border bg-white p-2 rounded-md hover:bg-primary/10"
//                   : ""
//               }`}
//               onClick={() => setActiveTab("delivery")}
//             >
//               <div>
//                 <p className="font-semibold text-gray-600">Delivery</p>
//                 {cartItems.length > 0 ? (
//                   <p className="text-[12px] text-gray-600">
//                     {activeTab === "delivery"
//                       ? "Standard time (35-50 mins)"
//                       : ""}
//                   </p>
//                 ) : (
//                   ""
//                 )}
//               </div>
//             </div>

//             <div
//               className={`cursor-pointer lg:w-[50%] lg:h-16 flex items-center justify-center ${
//                 activeTab === "pickup"
//                   ? "border bg-white p-2 rounded-md hover:bg-primary/10"
//                   : ""
//               }`}
//               onClick={() => setActiveTab("pickup")}
//             >
//               <div>
//                 <p className="font-semibold text-gray-600">Pick-up</p>
//                 {cartItems.length > 0 ? (
//                   <p className="text-[12px] text-gray-600">
//                     {activeTab === "pickup" ? "Standard time (20 mins)" : ""}
//                   </p>
//                 ) : (
//                   ""
//                 )}
//               </div>
//             </div>
//           </div>
//           {/* Tabs end */}

//           <div>
//             {cartItems.length > 0 ? (
//               <div>
//                 <h3 className="font-bold text-xl text-gray-600 px-4">
//                   Your items
//                 </h3>

//                 {/* Items list */}
//                 <div className="px-4">
//                   {cartItems.map((item, index) => {
//                     const itemTotal = currency(item?.selectedItem?.price || 0, {
//                       symbol: "",
//                       precision: 2,
//                     })
//                       .add(item?.selectedVariant?.price || 0)
//                       .add(
//                         item?.selectedAddOns?.reduce(
//                           (sum, addOn) => sum + (addOn.price || 0),
//                           0
//                         )
//                       )
//                       .multiply(item?.quantity || 1)
//                       .format();

//                     return (
//                       <div
//                         key={index}
//                         className=" py-4 w-full items-center border-b"
//                       >
//                         <div className="space-y-2">
//                           <div className="flex gap-2">
//                             <div>
//                               <img
//                                 src={item?.selectedItem?.itemImg.src}
//                                 alt=""
//                                 className="w-10 h-10 rounded-md"
//                               />
//                             </div>
//                             <div className="w-full">
//                               <h5 className=" text-gray-700 text-sm flex justify-between">
//                                 <span className="font-semibold">
//                                   {item?.selectedItem?.name}
//                                 </span>
//                                 <span className="flex gap-1">
//                                   {" "}
//                                   <span>{currencySymbol}</span>
//                                   <span> {item?.selectedItem?.price}</span>
//                                 </span>
//                               </h5>
//                               <p className="text-gray-900 text-sm flex justify-between">
//                                 <span>{item?.selectedVariant?.name}</span>
//                                 <span className="flex gap-1">
//                                   {" "}
//                                   <span>{currencySymbol}</span>
//                                   <span>{item?.selectedVariant?.price}</span>
//                                 </span>
//                               </p>
//                               {/* add on */}
//                               <div className="my-2">
//                                 {item?.selectedAddOns &&
//                                 item?.selectedAddOns?.length > 0 ? (
//                                   <>
//                                     {item?.selectedAddOns?.map(
//                                       (addOnitem, index) => {
//                                         console.log("addOnitem", addOnitem);
//                                         return (
//                                           <div key={index}>
//                                             <div className="flex justify-between text-sm text-gray-800">
//                                               <p className="flex gap-1">
//                                                 <span>Extra:</span>
//                                                 <span>{addOnitem?.name}</span>
//                                               </p>
//                                               <p className="flex gap-1">
//                                                 <span>{currencySymbol}</span>{" "}
//                                                 {addOnitem?.price}
//                                               </p>
//                                             </div>
//                                           </div>
//                                         );
//                                       }
//                                     )}
//                                   </>
//                                 ) : (
//                                   ""
//                                 )}
//                               </div>
//                               <div className="flex justify-between gap-10 w-full ">
//                                 <p className="text-primary font-medium flex gap-1">
//                                   <span>{currencySymbol}</span> {itemTotal}
//                                 </p>

//                                 {/* Quantity controls */}
//                                 <div className="flex items-center space-x-2">
//                                   {item.quantity === 1 ? (
//                                     <HiOutlineTrash
//                                       className="cursor-pointer"
//                                       onClick={() => removeItem(index)}
//                                     />
//                                   ) : (
//                                     <button
//                                       onClick={() =>
//                                         updateQuantity(index, item.quantity - 1)
//                                       }
//                                       className="w-8 h-8 border border-gray-300 rounded-full text-xl text-gray-500 flex items-center justify-center"
//                                     >
//                                       <HiOutlineMinusSmall />
//                                     </button>
//                                   )}
//                                   <span className="font-semibold text-gray-600">
//                                     {item.quantity}
//                                   </span>
//                                   <button
//                                     onClick={() =>
//                                       updateQuantity(index, item.quantity + 1)
//                                     }
//                                     className="w-8 h-8 border border-gray-300 text-gray-500 rounded-full text-xl flex items-center justify-center"
//                                   >
//                                     <GoPlus />
//                                   </button>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>

//                 {/* Popular items section */}
//                 {/* <PopularItem
//           incrementQuantity={incrementQuantity}
//           decrementQuantity={decrementQuantity}
//           quantity={quantity}
//           setQuantity={setQuantity}
//           openModal={openModal}
//           closeModal={closeModal}
//           isModalOpen={isModalOpen}
//           selectedItem={selectedItem}
//           setSelectedItem={setSelectedItem}
//         /> */}

//                 {/* Order Summary */}
//                 <div className="my-5 space-y-4 p-4">
//                   <div className="flex text-gray-600 justify-between">
//                     <p>Subtotal</p>
//                     <p>
//                       {currencySymbol} {calculateTotalPrice()}
//                     </p>
//                   </div>
//                   <div className="flex text-gray-600 justify-between">
//                     <p>Service fee</p>
//                     <p>{currencySymbol} 4</p>
//                   </div>
//                   <div className="flex text-gray-600 justify-between">
//                     <p>VAT</p>
//                     <p>{currencySymbol} 13</p>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div>
//                 <div className="mt-10">
//                   <div className="flex justify-center items-center text-primary">
//                     <SiHuggingface size={60} />
//                   </div>
//                   <h2 className="text-center font-semibold text-gray-800">
//                     Hungry?
//                   </h2>
//                   <p className="text-center  text-gray-800">
//                     You haven't added anything to your cart!
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       {/* content  */}

//       {/* Review Button (Always Visible on Mobile) */}
//       <div
//         className={`${
//           isMobileView ? "hidden" : "fixed"
//         } lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t`}
//       >
//         <button
//           className="bg-primary text-white w-full p-3 rounded-md font-semibold"
//           onClick={() => setIsMobileView(true)}
//         >
//           Review Payment and Address
//         </button>
//       </div>

//       <div
//         className={`${
//           isMobileView ? "block" : "hidden"
//         } lg:hidden fixed inset-0 bg-white overflow-y-auto`}
//       >
//         <div className="p-4">
//           {/* Close Button */}
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="font-bold text-lg">Cart</h3>
//             <button
//               onClick={() => setIsMobileView(false)}
//               className="text-gray-600 hover:text-black"
//             >
//               <HiOutlineX size={24} />
//             </button>
//           </div>

//           {/* Cart Content */}
//           {cartItems.length === 0 ? (
//             <div className="p-4">
//               <div className="flex justify-center">
//                 <SiHuggingface size={60} className="text-primary" />
//               </div>
//               <h2 className="text-center font-semibold text-gray-800">
//                 Hungry?
//               </h2>
//               <p className="text-center text-gray-600">
//                 You haven't added anything to your cart!
//               </p>
//             </div>
//           ) : (
//             <div>
//               {cartItems.map((item, index) => (
//                 <div key={index} className="p-4 border-b">
//                   <div className="flex justify-between items-center mb-2">
//                     <p>{item.selectedItem.name}</p>
//                     <button
//                       onClick={() => removeItem(index)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       <HiOutlineTrash size={20} />
//                     </button>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <div className="flex items-center gap-2">
//                       <button
//                         onClick={() => decrementQuantity(index)}
//                         className="p-2 rounded-md border bg-gray-200 hover:bg-gray-300"
//                       >
//                         <HiOutlineMinusSmall />
//                       </button>
//                       <span className="font-semibold">{item.quantity}</span>
//                       <button
//                         onClick={() => incrementQuantity(index)}
//                         className="p-2 rounded-md border bg-gray-200 hover:bg-gray-300"
//                       >
//                         <GoPlus />
//                       </button>
//                     </div>
//                     <p className="font-semibold">
//                       {currency(item.selectedItem.price, { symbol: "Tk" })
//                         .multiply(item.quantity)
//                         .format()}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Total and Checkout Button */}
//           <div className="p-4">
//             <div className="flex justify-between mb-4">
//               <p>Total</p>
//               <p>
//                 {currency(calculateTotalPrice(), { symbol: "Tk" }).format()}
//               </p>
//             </div>
//             <button className="bg-primary w-full p-3 rounded-md text-white font-semibold">
//               Proceed to Checkout
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderSummeryCard;
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

      const itemTotal = currency(item?.selectedVariant?.price || 0, {
        symbol: "",
        precision: 2,
      })
        .add(addOnsTotal || 0)
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
                  const itemTotal = currency(
                    item?.selectedVariant?.price || 0,
                    {
                      symbol: "",
                      precision: 2,
                    }
                  )
                    .add(
                      item?.selectedAddOns?.reduce(
                        (sum, addOn) => sum + (addOn.price || 0),
                        0
                      )
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
                                <span> {item?.selectedVariant?.price}</span>
                              </span>
                            </h5>
                            <p className="text-gray-900 text-sm flex justify-between">
                              <span>{item?.selectedVariant?.name}</span>
                            </p>
                            {/* add on */}
                            <div className="my-2">
                              {item?.selectedAddOns &&
                              item?.selectedAddOns?.length > 0 ? (
                                <>
                                  {item?.selectedAddOns?.map(
                                    (addOnitem, index) => {
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
          <div className="w-full ">
            <button className="px-4 py-2 w-full rounded-lg font-semibold bg-primary/90 hover:bg-primary/100 text-white">
              <span className="hidden lg:block">
                Review payment and address
              </span>
              <span className="block lg:hidden ">Review pick-up order</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummeryCard;
