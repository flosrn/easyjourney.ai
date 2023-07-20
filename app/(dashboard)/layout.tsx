import React from "react";
import { Toaster } from "react-hot-toast";

import Header from "~/components/header/header";

type LayoutPageProps = {
  children: React.ReactNode;
};

const LayoutPage = ({ children }: LayoutPageProps) => {
  return (
    <>
      <Header />
      <div className="pt-[57px]">{children}</div>
      <Toaster />
    </>
  );
};

export default LayoutPage;
