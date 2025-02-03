import React, { useState, useRef, useEffect } from "react";

const StyledSelect = ({ setAvailabilityOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Remove order");
  const dropdownRef = useRef(null);

  const options = [
    { value: "Remove order", label: "Remove it from my order" },
    { value: "Call me", label: "Call me" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelectedOption(option.value);
    setAvailabilityOption(option.value);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full border rounded-lg p-3 text-sm focus:outline-none bg-white text-left flex justify-between items-center"
      >
        {options.find((opt) => opt.value === selectedOption)?.label}
        <svg
          className={`w-5 h-5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option)}
              className="p-3 cursor-pointer hover:bg-gray-100  first:rounded-t-lg last:rounded-b-lg"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StyledSelect;
