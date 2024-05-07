import React, { useEffect, useState } from "react";

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const testimonials = [
    "Testimonial 1",
    "Testimonial 2",
    "Testimonial 3"
  ];
  
  useEffect(() => {
    const testimonInterval = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % testimonials.length);
    }, 4500);

    return () => clearInterval(testimonInterval);
  }, [testimonials.length]);

  const handlePrevSlide = () => {
    setCurrentSlide(prevSlide => (prevSlide - 1 + testimonials.length) % testimonials.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide(prevSlide => (prevSlide + 1) % testimonials.length);
  };

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="py-16 text-center bg-slate-200">
      <h1 className="mt-8 font-medium lg:text-3xl text-blue-800">
        Testimonials
      </h1>
      <p className="mt-4 lg:text-sm md:text-xs">
        Read first thing what our valued clients are saying about us
      </p>
      <div className="w-full max-w-xl mx-auto relative">
        <div id="testim" className="relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full flex">
            <button
              id="left-arrow"
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full text-gray-700 focus:outline-none"
              onClick={handlePrevSlide}
            >
              &lt;
            </button>
            <div
              id="testim-content"
              className="flex transition-all ease-in-out duration-300"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="w-full h-full bg-gray-200 p-4 flex items-center justify-center"
                >
                  {testimonial}
                </div>
              ))}
            </div>
            <button
              id="right-arrow"
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full text-gray-700 focus:outline-none"
              onClick={handleNextSlide}
            >
              &gt;
            </button>
          </div>
          <div
            id="testim-dots"
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2"
          >
            {testimonials.map((_, index) => (
              <div
                key={index}
                className={`w-4 h-4 bg-gray-500 rounded-full cursor-pointer ${currentSlide === index ? "bg-gray-800" : ""}`}
                onClick={() => handleDotClick(index)}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
