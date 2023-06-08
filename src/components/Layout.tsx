import React, { ReactNode } from "react";
import { NavBar } from "./NavBar";
import WelcomeSection from "./WelcomeSection";

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <>
      {/*<NavBar />*/}
      <WelcomeSection />
      {children}
    </>
  );
};
