import React, { ReactNode } from "react";
import { Header } from "@/components";
import Footer from "./components/UI/Footer";

const AppWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className=" relative ">
      <Header />
      <div className="my-[4em]" />
      {children}
      <Footer />
    </div>
  );
};

export default AppWrapper;
