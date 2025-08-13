"use client";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/obus3LxsAfo
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { Toggle } from "@/components/ui/toggle";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

import WriteStoryButton from "./WriteStoryButton";
import { CampModal } from "@campnetwork/origin/react";
import { CustomCampConnectButton } from "./CustomCampConnectButton";
import useTheme from "@/lib/store/useTheme";
import Image from "next/image";

export default function NavBar() {
  const setTheme = useTheme((state) => state.setTheme);
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background container mx-auto">
      <div className="min-w-full flex h-16  items-center justify-between">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <span>
            <Image src="/Logo.png" alt="logo" className="size-6"  width={24} height={24}/>
            
          </span>
          <span className="text-primary size-6">TaleCraft</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link
            href="/"
            className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
            prefetch={false}
          >
            Dashboard
          </Link>
          <Link
            href="#"
            className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
            prefetch={false}
          >
            My Stories
          </Link>
          <Link
            href="#"
            className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
            prefetch={false}
          >
            Earning
          </Link>
          <Link
            href="#"
            className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
            prefetch={false}
          >
            Help
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <WriteStoryButton />
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <SearchIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="sr-only">Search</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[300px] p-4">
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-8 w-full"
                />
              </div>
            </DropdownMenuContent>
          </DropdownMenu> */}

          <span className="text-gray-500 dark:text-gray-400">
            <CampModal injectButton={false} />
            <CustomCampConnectButton />
          </span>
          <Toggle
            onClick={() => setTheme()}
            aria-label="Toggle dark mode"
            className="rounded-full"
          >
            <MoonIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </Toggle>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full md:hidden"
              >
                <MenuIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="md:hidden">
              <div className="grid gap-4 p-4">
                <Link
                  href="#"
                  className="text-sm font-medium text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                  prefetch={false}
                >
                  Home
                </Link>
                <Link
                  href="#"
                  className="text-sm font-medium text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                  prefetch={false}
                >
                  About
                </Link>
                <Link
                  href="#"
                  className="text-sm font-medium text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                  prefetch={false}
                >
                  Services
                </Link>
                <Link
                  href="#"
                  className="text-sm font-medium text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                  prefetch={false}
                >
                  Contact
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MoonIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}
