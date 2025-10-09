import React, { useEffect, useState } from "react";
import { FaPhone } from "react-icons/fa6";
import {  FaShoppingBag, FaHome } from "react-icons/fa";
import i from '../../assets/aqw-removebg-preview.png'
const RotatingText = () => {
 const texts = [
    <span key="1" className="flex items-center gap-2">
      <FaHome style={{ fontSize: "15px" }} className="text-yellow-400" />
      Bienvenue sur notre site
    </span>,

    <span key="2" className="flex items-center gap-2">
      <FaShoppingBag style={{ fontSize: "15px" }} className="text-green-400" />
      Découvrez nos produits
    </span>,

    <span key="3" className="flex items-center gap-2">
      <FaPhone style={{ fontSize: "15px" }} className="text-blue-400" />
      Infoline&nbsp;<span className="font-extrabold">98 233 311</span>
    </span>,

  
  ];

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // on commence à cacher le texte
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % texts.length); // changer de texte
        setFade(true); // réafficher le texte
      }, 500); // délai pour le fondu avant changement
    }, 5000); // durée totale avant changement (3 secondes)

    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div className="md:hidden flex items-center fixed top-0 w-full z-[1000] justify-center h-[60px] bg-gray-800 text-white text-xs font-mono">
      <span
        className={`transition-opacity duration-500 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        {texts[index]}
      </span>
    </div>
  );
};

export default RotatingText;
