import Link from 'next/link';
import React from 'react';

interface ButtonProps {
    className?: string
}

const Button: React.FC<ButtonProps> = () => {
    return (
    <div className="text-center lg:text-left mt-4">
      <Link
        href="/clients/register-interest" 
        className="mt-1 px-[2em] py-[.5em] mx-[-.2em] bg-gradient-to-r from-blue-900 to-green-700 hover:bg-red-400 text-white rounded-full md:text-xl text-base duration-300 hover:scale-110 transform transition-all ease-in-out font-sans inline-block"
      >
        Register your Interest to get a quote 
      </Link>
    </div>
  );
};

export default Button;
