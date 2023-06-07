import React, { ReactNode } from 'react'
import { NavBar } from './NavBar'

type Props = {
  children: ReactNode
}

export const Layout = ({ children }: Props) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}