import React, { useState } from "react";

const ShippingMethod = ({ name, price }) => {
  const [selectedShippingMethod, setSelectedShippingMethod] = useState("");

  const handleChange = () => {
    if (selectedShippingMethod === name) {
      setSelectedShippingMethod("");
    } else {
      setSelectedShippingMethod(name);
    }
  };

  const isChecked = selectedShippingMethod === name;

  return (
    <label className="p-4 rounded-lg flex items-center" htmlFor={name}>
      <div
        className={`custom-radio w-5 h-5 aspect-square flex-shrink-0 border ${
          isChecked ? "border-8" : "border"
        } border-gray-900 transition rounded-full`}
      ></div>
      <input
        type="radio"
        name={name}
        value={price}
        hidden
        id={name}
        checked={isChecked}
        onChange={handleChange}
      />
      <span className="text-base" onClick={handleChange}>
        {name}
      </span>
    </label>
  );
};

export default ShippingMethod;
