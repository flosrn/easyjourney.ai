import React from "react";

import Header from "~/components/header/Header";

type LayoutPageProps = {
  children: React.ReactNode;
};

const LayoutPage = ({ children }: LayoutPageProps) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default LayoutPage;
