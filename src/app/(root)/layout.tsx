"use client";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {

  return (
    <main className={`bg-background container mx-auto transition-all`}>
      {children}
    </main>
  );
};
export default Layout;
