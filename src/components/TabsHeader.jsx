"use client";
import React, { useRef, useState, useEffect } from "react";
import MenuItemSerach from "./MenuItemSerach";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import { Link } from "react-scroll";

const TabsHeader = ({ categories, setCategories, originalCategories }) => {
  const tabContainerRef = useRef(null);
  const [activeTab, setActiveTab] = useState(categories[0]?.id);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Function to update arrow visibility
  const updateArrowVisibility = () => {
    const container = tabContainerRef.current;
    if (!container) return;
    setShowLeftArrow(container.scrollLeft > 0);
    setShowRightArrow(
      container.scrollLeft < container.scrollWidth - container.clientWidth
    );
  };

  // Function to scroll the tabs
  const scrollTabs = (direction) => {
    const container = tabContainerRef.current;
    const scrollAmount = 200;

    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }

    setTimeout(updateArrowVisibility, 300); // Delay to update state after scroll
  };

  // Automatically scroll when the last visible tab is reached
  useEffect(() => {
    const container = tabContainerRef.current;
    if (!container) return;

    const activeTabElement = document.getElementById(`tab-${activeTab}`);
    if (activeTabElement) {
      const tabOffset = activeTabElement.offsetLeft;
      const tabWidth = activeTabElement.offsetWidth;
      const containerScrollLeft = container.scrollLeft;
      const containerWidth = container.clientWidth;

      // If the active tab is outside the visible area, adjust the scroll
      if (
        tabOffset + tabWidth > containerScrollLeft + containerWidth ||
        tabOffset < containerScrollLeft
      ) {
        container.scrollTo({
          left: tabOffset - containerWidth / 2 + tabWidth / 2,
          behavior: "smooth",
        });
      }
    }
    updateArrowVisibility();
  }, [activeTab]);

  return (
    <div className="shadow-md h-[66px] flex items-center gap-5 px-10 relative fixed bg-white w-full">
      <div className="w-[20%] relative top-1">
        <MenuItemSerach
          categories={categories}
          setCategories={setCategories}
          originalCategories={originalCategories}
        />
      </div>

      <div className="relative flex items-center w-[80%]">
        {showLeftArrow && (
          <button
            onClick={() => scrollTabs("left")}
            className="absolute text-2xl left-0 z-10 border bg-white flex items-center justify-center h-10 w-10 shadow-lg rounded-full"
          >
            <MdOutlineKeyboardArrowLeft />
          </button>
        )}

        <div
          ref={tabContainerRef}
          className="flex overflow-x-auto scroll-smooth space-x-4 p-2 no-scrollbar"
          onScroll={updateArrowVisibility}
        >
          {categories.map((tab) => (
            <div
              key={tab.id}
              id={`tab-${tab.id}`}
              className={`flex-shrink-0 px-4 top-2 items-center h-[50px] py-2 cursor-pointer hover:rounded-t-md hover:bg-[#F0F2F2] relative group`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Link
                to={tab.name}
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-100}
                duration={400}
                onSetActive={() => setActiveTab(tab.id)}
              >
                {tab.name}
              </Link>

              {/* Bottom Border Effect */}
              <div className="flex justify-center">
                <div
                  className={`absolute bottom-0 z-10 w-20 h-1 mx-auto transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-[#171F26] rounded-md"
                      : "bg-transparent group-hover:bg-[#171F26] hover:rounded-md"
                  }`}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {showRightArrow && (
          <button
            onClick={() => scrollTabs("right")}
            className="absolute border right-0 z-10 text-2xl bg-white flex items-center justify-center h-10 w-10 shadow-lg rounded-full"
          >
            <MdOutlineKeyboardArrowRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default TabsHeader;
