import React, { useState } from 'react';
import { IoPricetagsOutline } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";
import { MdRemoveShoppingCart } from "react-icons/md";

const ProductCard = ({ img1, img2, title, oldPrice, newPrice, onClick, solde, qtystk, index, p }) => {
  const [hover, setHover] = useState(false);
  const isSmall = useMediaQuery({ maxWidth: 640 });
  const isMedium = useMediaQuery({ minWidth: 641, maxWidth: 2024 });

  let aosValue = "zoom-in-down";
  if (isSmall && (index === 0 || index === 1)) aosValue = "";
  if (isMedium && (index === 0 || index === 1 || index === 2 || index === 3)) aosValue = "";

  const isSoldOut = p?.sizes?.length > 0 && p?.sizes?.every((s) => s?.quantity === 0);

  return (
    <div
      onClick={onClick}
      className="relative mt-3 border border-gray-200 rounded-xl cursor-pointer overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      data-aos={aosValue}
    >
      {/* Image */}
      <div className="relative w-full aspect-[4/5] overflow-hidden">
        <img
          src={hover ? img2 : img1}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
        />

        {solde > 0 && (
          <span className="absolute top-3 right-3 flex items-center gap-1 bg-red-500 text-white font-semibold text-xs p-2 rounded-md shadow-md">
            <IoPricetagsOutline className="text-lg" /> -{solde}%
          </span>
        )}

        {isSoldOut && (
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white font-mono px-4 py-2 rounded-lg text-sm uppercase flex items-center gap-2 shadow-lg">
            <MdRemoveShoppingCart className="text-xl" /> Sold out
          </span>
        )}
      </div>

      {/* Infos produit */}
      <div className="px-4 py-3">
        <p className={`text-sm md:text-base font-medium text-gray-700 ${hover ? 'underline' : ''} truncate`}>
          {title}
        </p>

        {/* Prix avec effet magique */}
        <div className="flex items-center gap-3 mt-2">
          {oldPrice && oldPrice !== newPrice && (
            <span className="line-through text-gray-400 font-light text-lg md:text-xl">
              {oldPrice} TND
            </span>
          )}
          <span className="text-green-600 font-extrabold text-3xl md:text-4xl relative animate-bounce">
            {newPrice} <span className="text-xl md:text-2xl">TND</span>
            {/* Glow effect */}
            <span className="absolute -inset-1 bg-gradient-to-r from-green-400 via-green-200 to-green-400 opacity-30 blur-xl rounded-md"></span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
