import React, { useState } from 'react';

const ProductCard = ({ img1, img2, title, oldPrice, newPrice ,onClick}) => {
  const [hover, setHover] = useState(false);

  return (
    <div
    onClick={onClick}
      className=" mt-3 border border-gray-100 cursor-pointer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}

    >
      <div className="relative w-full aspect-[4/5]">
          <img
    src={hover ? img2 : img1}
    className="object-cover w-full h-full"
    alt={title}
  />
        <span className="absolute right-3 top-3 bg-green-400 rounded-sm text-xs font-light p-1 text-white">
          Solde
        </span>
      </div>

      <p className={`mt-2 text-sm font-mono px-1 ${hover ? 'underline' :''}`}>{title}</p>

      <div className="flex gap-3 items-center mt-2">
        <span className="uppercase text-xs font-light line-through">
          {oldPrice}
        </span>
        <span className="uppercase text-xs font-semibold">{newPrice}</span>
      </div>
    </div>
  );
};

export default ProductCard;
