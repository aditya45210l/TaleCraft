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
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <span>
            <Image
              src="/Logo.png"
              alt="logo"
              className="size-6"
              width={24}
              height={24}
            />
          </span>
          <span className="text-primary size-6 font-bold leading-relaxed tracking-wide">TaleCraft</span>
        </Link>
        <nav className="hidden items-center gap-6  font-medium md:flex">
          <Link
            href="/"
            className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
            prefetch={false}
          >
            Dashboard
          </Link>
          <Link
            href="/my-stories"
            className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
            prefetch={false}
          >
            My Stories
          </Link>
          {/* <Link
            href="#"
            className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
            prefetch={false}
          >
            Earning
          </Link> */}
          <Link
            href="/create-story"
            className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
            prefetch={false}
          >
            Create
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <WriteStoryButton />
          <span className="text-gray-500 dark:text-gray-400 w-[121.2px] hidden md:flex h-10">
            <CampModal injectButton={false} />
            <span className="w-[121.2px] h-10">
              <CustomCampConnectButton />
            </span>
          </span>
              <span className="hidden md:flex">
                <Toggle
                  onClick={() => setTheme()}
                  aria-label="Toggle dark mode"
                  className="rounded-full"
                >
                  <MoonIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </Toggle>
              </span>
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
<div className="flex flex-col justify-between py-4 min-h-full">
                <div className="grid gap-4 px-4">
                <span className="text-gray-500 dark:text-gray-400 w-[121.2px]">
                  <CampModal injectButton={false} />
                  <span className="w-[121.2px] h-10">
                    <CustomCampConnectButton />
                  </span>
                </span>
                <Link
                  href="/"
                  className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                  prefetch={false}
                >
                  Dashboard
                </Link>
                <Link
                  href="/my-stories"
                  className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                  prefetch={false}
                >
                  My Stories
                </Link>
                {/* <Link
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
                </Link> */}
              </div>
              <span className="flex px-4">
                <Toggle
                  onClick={() => setTheme()}
                  aria-label="Toggle dark mode"
                  className="rounded-full"
                >
                  <MoonIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </Toggle>
              </span>
</div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
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

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
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
