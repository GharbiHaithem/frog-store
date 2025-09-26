import { useState } from 'react';
import React from 'react'
export default function InputNumber({ initial = 1, min = 1, max = 999 }) {
  const [value, setValue] = useState(initial);

  const dec = () => setValue(v => Math.max(min, v - 1));
  const inc = () => setValue(v => Math.min(max, v + 1));
  const onChange = (e) => {
    let v = parseInt(e.target.value, 10);
    if (isNaN(v)) v = min;
    setValue(Math.min(max, Math.max(min, v)));
  };

  return (
    <div className="inline-flex items-center border border-gray-300 rounded-lg overflow-hidden w-36">
      <button onClick={dec} className="w-10 h-10 flex items-center justify-center">−</button>
      <input type="number" value={value} onChange={onChange}
             className="w-full text-center py-2 focus:outline-none" />
      <button onClick={inc} className="w-10 h-10 flex items-center justify-center">+</button>
    </div>
  );
}
