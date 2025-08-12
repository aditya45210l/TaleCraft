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
import dynamic from "next/dynamic";
import { CustomCampConnectButton } from "./CustomCampConnectButton";
import useTheme from "@/lib/store/useTheme";

export default function NavBar() {
  const setTheme = useTheme((state) => state.setTheme);
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background container mx-auto">
      <div className="min-w-full flex h-16  items-center justify-between">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <span>
            <img src="./Logo.png" alt="logo" className="size-6" />
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

function MountainIcon() {
  return (
    <svg
      viewBox="0 0 192 192"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="google_idx__w-8"
    >
      <rect x="28" y="156" width="88" height="24" rx="12" fill="#8964e8" />
      <rect x="104" y="120" width="36" height="24" rx="12" fill="#17b877" />
      <rect x="56" y="120" width="36" height="24" rx="12" fill="#17b877" />
      <rect x="84" y="84" width="52" height="24" rx="12" fill="#ffa23e" />
      <rect x="148" y="84" width="24" height="24" rx="12" fill="#ffa23e" />
      <rect x="56" y="48" width="88" height="24" rx="12" fill="#25a6e9" />
      <rect x="64" y="12" width="52" height="24" rx="12" fill="#8964e8" />
      <rect x="28" y="12" width="24" height="24" rx="12" fill="#8964e8" />
    </svg>
  );
}

function PhoneIcon(props) {
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
