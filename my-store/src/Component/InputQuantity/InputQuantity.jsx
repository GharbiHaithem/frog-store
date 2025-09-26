import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'

const InputQuantity = ({ setQuantity, quantity }) => {
  const [value, setValue] = useState(1)
  const location = useLocation()

  const increase = () => {
    setValue(prevValue => prevValue + 1)
    setQuantity(quantity + 1)
  }

  const decrease = () => {
    setValue(prevValue => (prevValue > 1 ? prevValue - 1 : 1))
    setQuantity(quantity - 1)
  }

  useEffect(() => {
    if (location.pathname === "/cart") {
      setValue(quantity)
    } else {
      setQuantity(value)
    }
  }, [value, quantity, location.pathname])

  return (
    <div className="flex items-center border rounded-lg overflow-hidden w-[120px]">
      {/* Bouton - */}
      <button
        type="button"
        onClick={decrease}
        className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-lg font-bold"
      >
        −
      </button>

      {/* Input */}
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value) || 1)}
        className="w-full text-center border-x text-sm font-medium outline-none focus:ring-0"
      />

      {/* Bouton + */}
      <button
        type="button"
        onClick={increase}
        className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-lg font-bold"
      >
        +
      </button>
    </div>
  )
}

export default InputQuantity
