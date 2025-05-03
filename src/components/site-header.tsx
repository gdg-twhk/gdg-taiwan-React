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
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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
                    <Link href="/activity">{t('navigation.recentArticles')}</Link>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <Link href="/annual_activity/international_womens_day">{t('navigation.internationalWomensDay.title')}</Link>
                  </MenubarItem>
                  <MenubarItem>
                    <Link href="/annual_activity/google_io_extended">{t('navigation.googleIOExtended.title')}</Link>
                  </MenubarItem>
                  <MenubarItem>
                    <Link href="/annual_activity/cloud_study_jam">{t('navigation.cloudStudyJam.title')}</Link>
                  </MenubarItem>
                  <MenubarItem>
                    <Link href="/annual_activity/devfest">{t('navigation.devfest.title')}</Link>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <Link href="/chapters">{t('navigation.chapters')}</Link>
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
          <div className="ml-auto flex items-between justify-between gap-2 w-1/3 ">
          <NavigationMenu className="w-full">
            <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/activity">{t('navigation.recentActivities')}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>{t('navigation.annualActivities')}</NavigationMenuTrigger>
                <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px]">
                <ListItem href="/annual_activity/international_womens_day" title={t('navigation.internationalWomensDay.title')}>
                  {t('navigation.internationalWomensDay.description')}
                </ListItem>
                <ListItem href="/annual_activity/google_io_extended" title={t('navigation.googleIOExtended.title')}>
                  {t('navigation.googleIOExtended.description')}
                </ListItem>
                <ListItem href="/annual_activity/cloud_study_jam" title={t('navigation.cloudStudyJam.title')}>
                  {t('navigation.cloudStudyJam.description')}
                </ListItem>
                <ListItem href="/annual_activity/devfest" title={t('navigation.devfest.title')}>
                  {t('navigation.devfest.description')}
                </ListItem>
              </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/chapters">{t('navigation.chapters')}</Link>
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
