import React from 'react'
import { RiCustomerService2Fill } from "react-icons/ri";
import { IoCube } from "react-icons/io5";
import { PiMedalFill } from "react-icons/pi";
import { PiCurrencyDollarSimpleFill } from "react-icons/pi";

const Contact = () => {
  const items = [
    {
      icon: <RiCustomerService2Fill className="text-yellow-400"   style={{fontSize:'20px'}}/>,
      title: "Service Client",
      desc: "98233311",
    },
    {
      icon: <IoCube className="text-green-400"   style={{fontSize:'20px'}}/>,
      title: "Livraison",
      desc: "Disponible sur toute la Tunisie",
    },
    {
      icon: <PiMedalFill  style={{fontSize:'20px'}} className="text-blue-400" />,
      title: "Confiance",
      desc: "Expérience client premium",
    },
    {
      icon: <PiCurrencyDollarSimpleFill style={{fontSize:'20px'}} className="text-red-400" />,
      title: "Prix",
      desc: "Meilleur prix pour meilleure qualité",
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-transform duration-300 hover:scale-105"
            >
              <div  style={{fontSize:'60px !important'}} className="text-6xl mb-5">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h3>
              <p className="text-gray-600 font-sans text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
