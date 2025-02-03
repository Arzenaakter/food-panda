"use client";
import FoodItemsComponent from "@/components/FoodItemsComponent";
import OrderSummeryCard from "@/components/OrderSummeryCard";
import TabsHeader from "@/components/TabsHeader";
import { useState } from "react";
import Burger from "@/assets/Burger.jpg";

export default function Home() {
  const [quantity, setQuantity] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([
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
        {
          id: "item_2",
          name: "High Paid Chicken",
          price: 300,
          description:
            "Chicken with additional served with seafood in good day to eat flavourful.",
          itemImg: Burger,
          variation: [
            { id: "variation_3", name: "Naga", price: 300 },
            { id: "variation_4", name: "Garlic", price: 350 },
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
        {
          id: "item_5",
          name: "Split Sugar Pizza",
          price: 250,
          description: "Chicken from above.",
          itemImg: Burger,
          variation: [
            { id: "variation_9", name: "Naga", price: 300 },
            { id: "variation_10", name: "Garlic", price: 350 },
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
    {
      id: "05",
      name: "Classic Burgers",
      items: [
        {
          id: "item_7",
          name: "Gourmet Burger",
          price: 250,
          description: "A classic gourmet burger with fresh ingredients.",
          itemImg: Burger,
          variation: [
            { id: "variation_13", name: "Naga", price: 300 },
            { id: "variation_14", name: "Garlic", price: 350 },
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
      id: "06",
      name: "Desserts",
      items: [
        {
          id: "item_8",
          name: "Chocolate Lava Cake",
          price: 250,
          description: "Warm chocolate cake with molten center.",
          itemImg: Burger,
          variation: [
            { id: "variation_15", name: "Naga", price: 300 },
            { id: "variation_16", name: "Garlic", price: 350 },
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
      id: "07",
      name: "Beverages",
      items: [
        {
          id: "item_9",
          name: "Lemon Iced Tea",
          price: 250,
          description: "Refreshing iced tea with a twist of lemon.",
          itemImg: Burger,
          variation: [
            { id: "variation_17", name: "Naga", price: 300 },
            { id: "variation_18", name: "Garlic", price: 350 },
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
      id: "08",
      name: "Specials",
      items: [
        {
          id: "item_10",
          name: "Chef's Special Steak",
          price: 500,
          description: "Premium steak cooked to perfection.",
          itemImg: Burger,
          variation: [
            { id: "variation_19", name: "Naga", price: 300 },
            { id: "variation_20", name: "Garlic", price: 350 },
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
  ]);

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    setQuantity(1);
  };
  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));
  return (
    <div className="relative">
      <div className=" absolute top-0 z-50  sticky">
        <TabsHeader categories={categories} />
      </div>
      <div className="flex gap-10  ">
        <div className="w-[70%]  overflow-y-auto">
          <FoodItemsComponent
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
            setQuantity={setQuantity}
            quantity={quantity}
            openModal={openModal}
            closeModal={closeModal}
            isModalOpen={isModalOpen}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            categories={categories}
          />
        </div>
        <div className="w-[30%] lg:h-[510px] absolute top-20 border rounded-md mx-5 mt-6 sticky">
          <OrderSummeryCard
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
        </div>
      </div>
    </div>
  );
}
