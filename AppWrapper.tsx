import React, { ReactNode } from "react";
import Footer from "./components/ui/Footer";

const AppWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className=" relative ">
      <div className="my-[4em]" />
      {children}
      <Footer />
    </div>
  );
};

export default AppWrapper;
