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


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images?.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images?.length]);



  return (
    <div className="w-full flex flex-col md:flex-row mt-10 md:mt-20 shadow-2xl rounded-lg overflow-hidden">
      
      {/* Bloc gauche */}
      <div className="md:w-1/3 w-full hidden  md:flex flex-col gap-4 bg-gradient-to-b from-gray-50 to-white items-center justify-center text-gray-700 p-6">
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
  
  </div>
</div>

    </div>
  )
}

export default BandePub
