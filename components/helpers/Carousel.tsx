"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  return (
    <div className="relative w-full h-72 md:h-[550px]">
    <div className="absolute inset-0 overflow-hidden">
      {images.map((imageUrl, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-300 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image src={imageUrl} alt={`Image ${index}`} layout="fill" objectFit="cover" />
        </div>
      ))}
    </div>
    <button
      onClick={handlePrev}
      className="absolute top-1/2 left-4 -translate-y-1/2 text-3xl sm:text-6xl text-white px-2 py-1 rounded-full hover:bg-opacity-70"
    >
      &lt;
    </button>
    <button
      onClick={handleNext}
      className="absolute top-1/2 right-4 -translate-y-1/2 text-3xl sm:text-6xl  text-white px-2 py-1 rounded-full hover:bg-opacity-70"
    >
       &gt;
    </button>
  </div>
  );
};

export default Carousel;
