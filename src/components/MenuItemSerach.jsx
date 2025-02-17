import React, { useEffect, useState } from "react";

const MenuItemSerach = ({ categories, setCategories, originalCategories }) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm.trim() === "") {
      // Reset to original categories when search field is empty
      setCategories(originalCategories);
      return;
    }

    const filteredCategories = originalCategories
      .map((category) => {
        const filteredItems = category.items.filter(
          (item) =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return { ...category, items: filteredItems };
      })
      .filter((category) => category.items.length > 0);

    setCategories(filteredCategories);
  }, [searchTerm, originalCategories, setCategories]);

  return (
    <>
      {/* search start */}
      <div className="">
        <form class="max-w-md mx-auto">
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none ">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              class="block w-full p-2 ps-10  text-sm border lg:rounded-2xl rounded-full bg-white lg:bg-[#F7F7F7] shadow-xl lg:shadow-none"
              placeholder="Search in menu"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              required
            />
          </div>
        </form>
      </div>
      {/* search end */}
    </>
  );
};

export default MenuItemSerach;
