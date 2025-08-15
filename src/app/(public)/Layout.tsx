"use client";
import useTheme from "@/lib/store/useTheme";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const theme = useTheme((state) => state.theme);
  return (
    <main className={`bg-background container mx-auto ${theme}  `}>
      {children}
    </main>
  );
};
export default Layout;
