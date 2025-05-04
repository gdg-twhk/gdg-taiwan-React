'use client';
import { ModeToggle } from "./model-toggle"
import Image from "next/image"
import { useTheme } from "next-themes"
import Link from "next/link";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { SiteMobileMenu } from "./site-mobile-menu";
import { SiteDesktopMenu } from "./site-desktop-menu";
const logo = {
  light: "/GDG-Light.svg",
  dark: "/GDG-Dark.svg"
}

export function SiteHeader() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 bg-background border-b-3 flex h-full w-full shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear z-10">
      <div className={`flex flex-row h-full w-full items-${isMobile ? "between" : "center"} justify-${isMobile ? "between" : "center"} gap-1 px-4 lg:gap-2 lg:px-6`}>
        {isMobile && (
          <div className="flex items-center justify-between gap-2">
            <SiteMobileMenu />
          </div>
        )}
        {mounted && (
          <Link href="/" passHref className={`${isMobile ? "w-2/3 h-2/3" : "w-1/5 h-1/5"} `}>
            <Image
              src={resolvedTheme === "dark" ? logo.dark : logo.light}
              alt="main logo"
              width={100}
              height={100}
              className="w-full h-full"
            />
          </Link>
        )}
        {!isMobile && (
          <div className="ml-auto flex items-between justify-between gap-2 w-1/3 ">
            <SiteDesktopMenu />
        </div>
        )}
        <div className="flex items-center justify-between gap-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
