import { Header } from '@/Components'
import AnimatedScroll from '@/Components/UI/AnimatedScroll'
import React from 'react'

const page = () => {
  return (
    <div>
    <Header />
    <div
    className="w-full relative bg-cover bg-center"
    style={{
      backgroundImage: "url(/images/nurse.jpg)",
      backgroundPosition: "center top", 
      backgroundSize: "cover", 
    }}
  >
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <h1 className="text-3xl md:text-3xl sm:text-xl font-normal text-white text-center px-2 mt-48 font-sans">
        Discover How Our Seamless Processes Make a Difference <br /> Follow
        the Steps Below!
      </h1>
      <div className="flex items-center justify-center text-center">
        <AnimatedScroll targetId="faq-section" />
      </div>
    </div>
    <div className="h-[80vh]"></div> {/* Adjust height as needed */}
  </div>

  </div>
  )
}

export default page