"use client";
import useTheme from "@/lib/store/useTheme";
import { ReactNode, useEffect } from "react";

const Layout = ({ children }: { children: ReactNode }) => {

  return (
    <main className={`bg-background container mx-auto`}>
      {children}
    </main>
  );
};
export default Layout;
