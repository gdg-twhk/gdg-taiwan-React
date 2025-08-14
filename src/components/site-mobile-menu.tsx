'use client';
import { useTranslation } from 'react-i18next';
import { MenuIcon, ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DrawerTrigger } from './ui/drawer';
import { Drawer, DrawerClose } from './ui/drawer';
import { DrawerContent } from './ui/drawer';
import { LanguageToggle } from './language-toggle';
import { ModeToggle } from './model-toggle';
import { useState, useEffect } from 'react';
import { IconBrandGoogle, IconCalendarEvent, IconCode, IconCloud, IconMapPin, IconWomanFilled, IconHome } from '@tabler/icons-react';

export function SiteMobileMenu() {
  const { t } = useTranslation();
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname === path || pathname.startsWith(path + '/');
  };
  
  // Check if any annual activity is active
  const isAnyAnnualActivityActive = pathname.startsWith('/annual_activity');
  const [isAnnualActivitiesOpen, setIsAnnualActivitiesOpen] = useState(isAnyAnnualActivityActive);

  // Auto-expand annual activities if one is active
  useEffect(() => {
    if (isAnyAnnualActivityActive) {
      setIsAnnualActivitiesOpen(true);
    }
  }, [isAnyAnnualActivityActive]);

  const annualActivities = [
    { 
      icon: IconWomanFilled, 
      label: t('navigation.internationalWomensDay.title'), 
      href: '/annual_activity/international_womens_day',
      isActive: isActive('/annual_activity/international_womens_day')
    },
    { 
      icon: IconBrandGoogle, 
      label: t('navigation.googleIOExtended.title'), 
      href: '/annual_activity/google_io_extended',
      isActive: isActive('/annual_activity/google_io_extended')
    },
    { 
      icon: IconCloud, 
      label: t('navigation.cloudStudyJam.title'), 
      href: '/annual_activity/cloud_study_jam',
      isActive: isActive('/annual_activity/cloud_study_jam')
    },
    { 
      icon: IconCode, 
      label: t('navigation.devfest.title'), 
      href: '/annual_activity/devfest',
      isActive: isActive('/annual_activity/devfest')
    }
  ];

  return (
    <Drawer>
      <DrawerTrigger><MenuIcon className="w-4 h-4" /></DrawerTrigger>
      <DrawerContent className="h-full bg-background">
      
        <div className="flex flex-col flex-1 px-6 justify-center">
          <div className="flex flex-col space-y-2 flex-1">
            {/* Home */}
            <DrawerClose asChild>
              <Link 
                className={`flex items-center w-full p-4 rounded-lg transition-colors hover:bg-accent ${
                  isActive('/') 
                    ? 'bg-gray-700 text-white border border-gray-600' 
                    : 'text-foreground hover:bg-gray-100 dark:hover:bg-gray-800'
                }`} 
                href="/"
              >
                <div className="flex items-center space-x-3">
                  <IconHome className="w-5 h-5" />
                  <span className="text-lg font-medium">{t('navigation.home')}</span>
                </div>
              </Link>
            </DrawerClose>

            {/* Recent Activities */}
            <DrawerClose asChild>
              <Link 
                className={`flex items-center w-full p-4 rounded-lg transition-colors hover:bg-accent ${
                  isActive('/activity') 
                    ? 'bg-gray-700 text-white border border-gray-600' 
                    : 'text-foreground hover:bg-gray-100 dark:hover:bg-gray-800'
                }`} 
                href="/activity"
              >
                <div className="flex items-center space-x-3">
                  <IconCalendarEvent className="w-5 h-5" />
                  <span className="text-lg font-medium">{t('navigation.recentActivities')}</span>
                </div>
              </Link>
            </DrawerClose>

            {/* Annual Activities - Expandable */}
            <div className="space-y-1">
              <button
                onClick={() => setIsAnnualActivitiesOpen(!isAnnualActivitiesOpen)}
                className="flex items-center justify-between w-full p-4 rounded-lg transition-colors hover:bg-accent text-foreground"
              >
                <div className="flex items-center space-x-3">
                  <IconCalendarEvent className="w-5 h-5" />
                  <span className="text-lg font-medium">{t('navigation.annualActivities')}</span>
                </div>
                <ChevronDownIcon className={`w-5 h-5 text-muted-foreground transition-transform ${
                  isAnnualActivitiesOpen ? 'rotate-180' : ''
                }`} />
              </button>
              
              {isAnnualActivitiesOpen && (
                <div className="pl-8 space-y-1">
                  {annualActivities.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <DrawerClose key={index} asChild>
                        <Link 
                          className={`flex items-center w-full p-3 rounded-lg transition-colors hover:bg-accent ${
                            item.isActive 
                              ? 'bg-gray-700 text-white border border-gray-600' 
                              : 'text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`} 
                          href={item.href}
                        >
                          <div className="flex items-center space-x-3">
                            <Icon className="w-4 h-4" />
                            <span className="text-base font-medium">{item.label}</span>
                          </div>
                        </Link>
                      </DrawerClose>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Chapters */}
            <DrawerClose asChild>
              <Link 
                className={`flex items-center justify-between w-full p-4 rounded-lg transition-colors hover:bg-accent ${
                  isActive('/chapters') 
                    ? 'bg-gray-700 text-white border border-gray-600' 
                    : 'text-foreground hover:bg-gray-100 dark:hover:bg-gray-800'
                }`} 
                href="/chapters"
              >
                <div className="flex items-center space-x-3">
                  <IconMapPin className="w-5 h-5" />
                  <span className="text-lg font-medium">{t('navigation.chapters')}</span>
                </div>
              </Link>
            </DrawerClose>
          </div>
          
          <div className="border-t border-border pt-6 mt-6">
              <div className="w-full flex items-center justify-around px-6 py-4">
                <LanguageToggle />
                <ModeToggle />
              </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>    
  )
}
