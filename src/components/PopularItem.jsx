"use client";
import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Burger from "@/assets/Burger.jpg";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import ItemAddToCartModal from "./ItemAddToCartModal";

const products = [
  {
    id: "01",
    name: "Popular",
    items: [
      {
        id: "item_1",
        name: "Giving Mainstream Startled Chicken",
        price: 250,
        description:
          "Chicken with additional served with chicken stuffed with sweetness.",
        itemImg: Burger,
        variation: [
          { id: "variation_1", name: "Naga", price: 300 },
          { id: "variation_2", name: "Garlic", price: 350 },
        ],
        frequentlyItem: [
          { id: "1", name: "Naga", price: 300, frequentlyItemImg: Burger },
          {
            id: "2",
            name: "Chicken",
            price: 250,
            frequentlyItemImg: Burger,
          },
          {
            id: "3",
            name: "gerlic",
            price: 200,
            frequentlyItemImg: Burger,
          },
        ],
      },
    ],
  },
  {
    id: "02",
    name: "Macdierl X Footpanda",
    items: [
      {
        id: "item_3",
        name: "Brandivity",
        price: 250,
        description:
          "Pregnant with strong Red Season with, creamy, global & delicious snacks.",
        itemImg: Burger,
        variation: [
          { id: "variation_5", name: "Naga", price: 300 },
          { id: "variation_6", name: "Garlic", price: 350 },
        ],
        frequentlyItem: [
          { id: "1", name: "Naga", price: 300, frequentlyItemImg: Burger },
          {
            id: "2",
            name: "Chicken",
            price: 250,
            frequentlyItemImg: Burger,
          },
          {
            id: "3",
            name: "gerlic",
            price: 200,
            frequentlyItemImg: Burger,
          },
        ],
      },
    ],
  },
  {
    id: "03",
    name: "Teaser's Slides",
    items: [
      {
        id: "item_4",
        name: "Clean Ring",
        price: 250,
        description: "Strain and seasonings with breadcrumbs.",
        itemImg: Burger,
        variation: [
          { id: "variation_7", name: "Naga", price: 300 },
          { id: "variation_8", name: "Garlic", price: 350 },
        ],
        frequentlyItem: [
          { id: "1", name: "Naga", price: 300, frequentlyItemImg: Burger },
          {
            id: "2",
            name: "Chicken",
            price: 250,
            frequentlyItemImg: Burger,
          },
          {
            id: "3",
            name: "gerlic",
            price: 200,
            frequentlyItemImg: Burger,
          },
        ],
      },
    ],
  },
  {
    id: "04",
    name: "Rice Meals",
    items: [
      {
        id: "item_6",
        name: "Spicy Chicken Rice",
        price: 300,
        description: "Delicious spicy chicken served with fragrant rice.",
        itemImg: Burger,
        variation: [
          { id: "variation_11", name: "Naga", price: 300 },
          { id: "variation_12", name: "Garlic", price: 350 },
        ],
        frequentlyItem: [
          { id: "1", name: "Naga", price: 300, frequentlyItemImg: Burger },
          {
            id: "2",
            name: "Chicken",
            price: 250,
            frequentlyItemImg: Burger,
          },
          {
            id: "3",
            name: "gerlic",
            price: 200,
            frequentlyItemImg: Burger,
          },
        ],
      },
    ],
  },
];

const PopularItem = ({
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
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.params.navigation.prevEl = prevRef.current;
      swiperRef.current.swiper.params.navigation.nextEl = nextRef.current;
      swiperRef.current.swiper.navigation.init();
      swiperRef.current.swiper.navigation.update();
    }
  }, []);

  return (
    <div className="relative mt-5 bg-[#F7F7F7] p-4">
      <div className="flex justify-between ">
        <div>
          <h5 className="font-bold text-gray-600">Popular with your order</h5>
          <p className="text-gray-500">
            Based on what other customers bought together
          </p>
        </div>
        <div className="flex justify-center mt-4 space-x-2 mb-6">
          <button
            ref={prevRef}
            className="bg-white w-10 h-10 rounded-full  border flex items-center justify-center cursor-pointer"
          >
            <IoMdArrowBack className="text-gray-600 h-6 w-6" />
          </button>
          <button
            ref={nextRef}
            className="bg-white w-10 h-10 rounded-full  border flex items-center justify-center cursor-pointer"
          >
            <IoMdArrowForward className="text-gray-600 h-6 w-6" />
          </button>
        </div>
      </div>

      <div>
        <Swiper
          ref={swiperRef}
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={2}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        >
          {products?.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="  shadow-lg rounded-lg flex gap-10 w-full">
                {product.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="p-4 bg-white w-full h-36">
                    <div
                      className="  bg-cover bg-center relative h-16 w-full rounded-md "
                      style={{ backgroundImage: `url(${item.itemImg.src})` }}
                    >
                      <button
                        onClick={() => openModal(item)}
                        className="absolute bottom-2 right-2  bg-white w-8 h-8 rounded-full border shadow flex justify-center items-center"
                      >
                        <GoPlus className="text-gray-500 text-2xl" />
                      </button>
                    </div>
                    <div className="w-full  mt-2">
                      <h3 className=" font-medium text-[12px]">
                        {product.name}
                      </h3>
                      <p className=" text-gray-500  text-[10px]">
                        Tk {item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* modal start */}
      {isModalOpen && selectedItem && (
        <ItemAddToCartModal
          incrementQuantity={incrementQuantity}
          decrementQuantity={decrementQuantity}
          closeModal={closeModal}
          quantity={quantity}
          selectedItem={selectedItem}
        />
      )}
    </div>
  );
};

export default PopularItem;
