import React, { useEffect, useState } from 'react'
import a from '../../assets/aqw-removebg-preview.png'
import ab from '../../assets/aA1.jpg'
import ac from '../../assets/aaaaaa.jpg'
import ad from '../../assets/mother.jpg'
import { RiArrowRightSLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { banner } from '../../features/banner/bannerSlice'
const BandePub = () => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const  dispatch = useDispatch()
     useEffect(()=>{
                      dispatch(banner())
                   },[dispatch])
                   const{images_banner} = useSelector(state=>state?.banner)
                     const images = images_banner[0]?.images_banner?.map((img)=>img?.url);
  const txt1 = `Nouvelle collection oversize ✨
T-shirts 100% coton –
Livraison à domicile 🏡
📲 Infoline: 98 233 311`;

  const txt2 = `Un style tendance, une qualité supérieure… à prix de rêve 💫 à seulement ❗39,9 DT❗️`;
  const txt3 = `👉 Dispo dès maintenant chez Frog Store 🐸`;
  const txt4 = 'Une collection qui suit votre rythme';

  const texts = [txt1, txt2, txt3, txt4];

  // Changement image
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images?.length]);

  // Changement texte
  const [currentText, setCurrentText] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div className="w-full flex flex-col md:flex-row mt-10 md:mt-20 shadow-2xl rounded-lg overflow-hidden">
      
      {/* Bloc gauche */}
      <div className="md:w-1/3 w-full flex flex-col gap-4 bg-gradient-to-b from-gray-50 to-white items-center justify-center text-gray-700 p-6">
        <img
          src={a}
          className="md:w-[120px] md:h-[120px] w-[60px] h-[60px] object-contain drop-shadow-lg"
        />
        <span className="text-xs md:text-xs text-center w-full font-light tracking-wide uppercase">
          Best Quality <br /> Best Style
        </span>
      </div>

      {/* Bloc droite - images */}
    <div className="md:w-[70%] w-full relative h-[480px] md:h-[850px] overflow-hidden rounded-xl shadow-2xl">
  {images?.map((src, index) => (
    <img
      key={index}
      src={src}
      className={`absolute w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
        index === currentIndex ? "opacity-100 scale-105" : "opacity-0 scale-100"
      }`}
      alt="slide"
    />
  ))}

  {/* Overlay dégradé pour contraste */}
  <div className="absolute w-full h-full bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>

  {/* Texte + CTA */}
  <div className="absolute bottom-10 md:bottom-16 left-1/2 transform -translate-x-1/2 text-center w-[90%] md:w-[65%]">
    <div className="flex flex-col items-center gap-4 animate-fadeIn">
      <span
        className="bg-black/50 backdrop-blur-md text-white px-6 py-4 md:px-10 md:py-6 rounded-2xl shadow-lg font-medium text-sm md:text-lg leading-relaxed tracking-wide whitespace-pre-line transition-transform duration-500 transform hover:scale-105"
      >
        {texts[currentText]}
      </span>

      <button className="px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-red-500 to-pink-500 hover:from-pink-500 hover:to-red-500 text-white font-semibold rounded-full shadow-xl transform hover:scale-105 transition-all flex items-center gap-2">
        Je découvre <RiArrowRightSLine size={20} />
      </button>
    </div>
  </div>
</div>

    </div>
  )
}

export default BandePub
