import React, { useState } from 'react';
import { IoPricetagsOutline } from "react-icons/io5";
const ProductCard = ({ img1, img2, title, oldPrice, newPrice ,onClick,solde,qtystk}) => {
  const [hover, setHover] = useState(false);

  return (
    <div
    onClick={onClick}
      className=" mt-3 border border-gray-100 cursor-pointer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
data-aos="zoom-in-down"
    >
      <div className="relative w-full aspect-[4/5]">
          <img
    src={hover ? img2 : img1}
    className="object-contain w-full h-full"
    alt={title}
  />
        {solde>0 &&<span className="absolute right-3 top-3 bg-red-400 font-medium rounded-sm text-xs  p-1 flex items-center gap-2 text-white">
        <IoPricetagsOutline  className='text-2xl'/>  -{solde}%
        </span>}
    {qtystk==0 &&    <span className='absolute bottom-[-10px] right-5 bg-red-400 p-2 text-white font-mono italic uppercase'>Sold out</span>}
      </div>

      <p className={`mt-5 text-sm font-mono text-gray-500 px-5 ${hover ? 'underline' :''}`}>{title}</p>

     <div className="flex gap-3 items-center px-5 mt-2">
 {oldPrice != newPrice && <span className="uppercase text-xl font-light line-through text-gray-500">
    {oldPrice} TND
  </span>}
  <span className="uppercase text-2xl font-semibold text-green-600">
    {newPrice} TND
  </span>
</div>

    </div>
  );
};

export default ProductCard;
