import React, { useState } from 'react';

const FilterSize = ({setSelectedSize,selectedSize}) => {
  const [sizes, setSizes] = useState(['ALL','S','M','L','XL','XXL']);
  
 
  return (
    <div className='mt-20 p-4 flex flex-col items-center gap-6'>
      <p className='text-xl font-mono text-gray-500 text-center'>
        Select a size to see products we have in stock
      </p>

      <div className='flex flex-wrap justify-center gap-4'>
        {sizes.map((s, i) => (
          <button
            key={i}
            onClick={() => setSelectedSize(s)}
            className={`
              w-14 h-14 flex items-center justify-center rounded-lg border 
              font-semibold text-sm transition-all duration-200
              ${selectedSize === s ? 'bg-black text-white border-black shadow-md' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}
            `}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterSize;
