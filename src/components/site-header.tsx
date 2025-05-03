'use client';
import { ModeToggle } from "./model-toggle"
import Image from "next/image"
import { useTheme } from "next-themes"
import { ListItem } from "@/components/ui/list-item"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import Link from "next/link";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { IconMenu2 } from "@tabler/icons-react"
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
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger><IconMenu2 /></MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    <Link href="/activity">Recent Articles</Link>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <Link href="/annual_activity/international_womens_day">International Women&apos;s Day</Link>
                  </MenubarItem>
                  <MenubarItem>
                    <Link href="/annual_activity/google_io_extended">Google I/O Extended</Link>
                  </MenubarItem>
                  <MenubarItem>
                    <Link href="/annual_activity/cloud_study_jam">Cloud Study Jam</Link>
                  </MenubarItem>
                  <MenubarItem>
                    <Link href="/annual_activity/devfest">DevFest</Link>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <Link href="/chapters">Chapters</Link>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
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
          <div className="ml-auto flex items-center justify-between gap-2 w-fit-content">
          <NavigationMenu className="w-full">
            <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/activity"> Recent Activities</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Annual Activities</NavigationMenuTrigger>
                <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px]">
                <ListItem href="/annual_activity/international_womens_day" title="International Women's Day">
                  國際婦女節 (IWD) 是 Women Techmakers 最大的年度活動
                </ListItem>
                <ListItem href="/annual_activity/google_io_extended" title="Google I/O Extended">
                  討論最新的新技術、總結內容、主持問答環節並會見其他技術愛好者。
                </ListItem>
                <ListItem href="/annual_activity/cloud_study_jam" title="Cloud Study Jam">
                  從容器化應用程式到創建虛擬機，Study Jams 可以根據特定的雲端主題和技能水平進行自訂。
                </ListItem>
                <ListItem href="/annual_activity/devfest" title="DevFest">
                  是由全球 Google Developer Group (GDG) 主持的當地技術研討會。
                </ListItem>
              </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/chapters">Chapters</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            </NavigationMenuList>
            </NavigationMenu>
        </div>
        )}
        <div className="flex items-center justify-between gap-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
