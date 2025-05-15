'use client';
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
import { useTranslation } from 'react-i18next';

export function SiteDesktopMenu() {

  const { t } = useTranslation();

  return (
    <NavigationMenu className="w-full">
      <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
          <Link href="/activity">{t('navigation.recentActivities')}</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger>{t('navigation.annualActivities')}</NavigationMenuTrigger>
          <NavigationMenuContent className="bg-card">
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
  )
}
