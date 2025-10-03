import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { FiMinus, FiPlus } from "react-icons/fi";

const InputQuantity = ({ setQuantity, quantity, qtyStk }) => {
  const [value, setValue] = useState(1);
  const location = useLocation();

  const increase = () => {
    if (value < qtyStk) {
      setValue((prev) => prev + 1);
      setQuantity(quantity + 1);
    }
  };

  const decrease = () => {
    if (value > 1) {
      setValue((prev) => prev - 1);
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    if (location.pathname === "/cart") {
      setValue(quantity);
    } else {
      setQuantity(value);
    }
  }, [value, quantity, location.pathname]);

  return (
    <div className="flex items-center bg-white rounded-full shadow-md border border-gray-200 overflow-hidden w-[130px]">
      {/* Bouton - */}
      <button
        type="button"
        onClick={decrease}
        disabled={value <= 1}
        className={`flex items-center justify-center w-10 h-10 transition-all ${
          value <= 1
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <FiMinus className="text-lg" />
      </button>

      {/* Input nombre */}
      <input
        type="number"
        value={value}
        onChange={(e) => {
          let val = parseInt(e.target.value) || 1;
          if (val < 1) val = 1;
          if (val > qtyStk) val = qtyStk;
          setValue(val);
          setQuantity(val);
        }}
        min={1}
        max={qtyStk}
        className="w-full text-center text-gray-800 font-medium text-sm md:text-base bg-transparent focus:outline-none focus:ring-0 appearance-none"
      />

      {/* Bouton + */}
      <button
        type="button"
        onClick={increase}
        disabled={value >= qtyStk}
        className={`flex items-center justify-center w-10 h-10 transition-all ${
          value >= qtyStk
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <FiPlus className="text-lg" />
      </button>
    </div>
  );
};

export default InputQuantity;
