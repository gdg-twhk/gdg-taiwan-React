'use client';
import { useTranslation } from 'react-i18next';
import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import Link from "next/link";


export function SiteMobileMenu() {
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline"><MenuIcon className="w-4 h-4" /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mx-4 my-4 bg-card text-card-foreground flex flex-col gap-2 rounded-xl border px-6 py-6 shadow-sm w-[300px]">
        <DropdownMenuItem className="dropdown-mobile-menu-item">
          <Link href="/activity">{t('navigation.recentActivities')}</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="w-full h-0 border-t border-gray-300 border-t-3 shadow-md mt-0 gap-0" />
        <DropdownMenuGroup className="flex flex-col gap-2">
          <DropdownMenuLabel className="text-sm font-medium text-muted-foreground">{t('navigation.annualActivities')}</DropdownMenuLabel>
          <DropdownMenuItem className="dropdown-mobile-menu-item">
            <Link href="/annual_activity/international_womens_day">{t('navigation.internationalWomensDay.title')}</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="dropdown-mobile-menu-item">
            <Link href="/annual_activity/google_io_extended">{t('navigation.googleIOExtended.title')}</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="dropdown-mobile-menu-item">
            <Link href="/annual_activity/cloud_study_jam">{t('navigation.cloudStudyJam.title')}</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="dropdown-mobile-menu-item">
            <Link href="/annual_activity/devfest">{t('navigation.devfest.title')}</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="w-full h-0 border-t border-gray-300 border-t-3 shadow-md mt-0 gap-0" />
        <DropdownMenuItem className="dropdown-mobile-menu-item">
          <Link href="/chapters">{t('navigation.chapters')}</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
  </DropdownMenu>        
  )
}
