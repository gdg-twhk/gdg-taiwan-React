"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { IconSchool, IconX, IconEye, IconCalendar, IconMapPin, IconTag, IconChevronDown } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Event } from "@/interfaces";
import { UsersIcon } from "lucide-react";

interface FilterState {
  year: string | null;
  cities: string[];
  eventTypes: string[];
  audienceTypes: string[];
  showCampusOnly: boolean;
}

interface MobileDrawerState {
  open: boolean;
  activeFilter: 'cities' | 'eventTypes' | 'audienceTypes' | null;
}

interface AvailableOptions {
  cities: string[];
  eventTypes: string[];
  audienceTypes: string[];
  years: string[];
}

interface MobileFilterInterfaceProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  availableOptions: AvailableOptions;
  displayEvents: Event[] | Event[][];
  eventTypeMap: Record<string, string>;
  audienceTypeMap: Record<string, string>;
}

export function MobileFilterInterface({
  filters,
  setFilters,
  availableOptions,
  displayEvents,
  eventTypeMap,
  audienceTypeMap,
}: MobileFilterInterfaceProps) {
  const { t } = useTranslation();
  const [yearDrawerOpen, setYearDrawerOpen] = useState(false);
  const wheelContainerRef = useRef<HTMLDivElement>(null);
  const [mobileDrawer, setMobileDrawer] = useState<MobileDrawerState>({
    open: false,
    activeFilter: null,
  });

  useEffect(() => {
    if (yearDrawerOpen) {
      setTimeout(() => {
        if (!wheelContainerRef.current) return;
        const selectedButton = wheelContainerRef.current.querySelector<HTMLButtonElement>(
          `[data-active="true"]`
        );
        if (selectedButton) {
          const wheelItem = selectedButton.parentElement;
          if (wheelItem) {
            wheelItem.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        }
      }, 50);
    }
  }, [yearDrawerOpen]);

  return (
    <div className="md:hidden mx-4 bg-card rounded-xl border shadow-sm">
      {/* Horizontal Scrollable Filter Chips */}
      <div className="p-4 pb-3">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {/* Year Filter Select */}
          <Drawer open={yearDrawerOpen} onOpenChange={setYearDrawerOpen}>
            <DrawerTrigger asChild>
              <button className="flex items-center gap-2 rounded-full px-4 py-2.5 text-sm whitespace-nowrap flex-shrink-0 border border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-colors">
                <IconCalendar className="w-4 h-4 text-primary" />
                <span className="text-primary-700 font-medium">
                  {filters.year === 'all' || !filters.year
                    ? t('annualActivitySection.allYears')
                    : filters.year}
                </span>
                <IconChevronDown className="w-4 h-4 text-primary/60" />
              </button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle className="text-center">{t('annualActivitySection.yearFilterTitle')}</DrawerTitle>
                <DrawerDescription className="text-center">
                  {t('annualActivitySection.yearFilterSubtitle', 'Select a year to filter events')}
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4 border-t relative">
                  <div className="mb-3">
                    <Button
                      variant={!filters.year || filters.year === 'all' ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setFilters(prev => ({ ...prev, year: 'all' }));
                        setYearDrawerOpen(false);
                      }}
                      className={`h-10 px-4 rounded-full w-full ${
                        !filters.year || filters.year === 'all'
                          ? ""
                          : "border-primary text-primary-600 hover:bg-primary-50 hover:border-primary/60"
                      }`}
                    >
                      {t('annualActivitySection.allYears')}
                    </Button>
                  </div>
                <div ref={wheelContainerRef} className="wheel-container h-48 overflow-y-auto" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)' }}>
                  <div className="wheel-item h-12"></div>
                  {availableOptions.years.map((year) => (
                    <div key={year} className="wheel-item h-12 flex items-center justify-center">
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setFilters(prev => ({ ...prev, year }));
                          setYearDrawerOpen(false);
                        }}
                        className="text-xl w-full h-10 px-4 rounded-full data-[active=true]:text-google-red data-[active=true]:font-bold"
                        data-active={filters.year === year}
                      >
                        {year}
                      </Button>
                    </div>
                  ))}
                  <div className="wheel-item h-12"></div>
                </div>
              </div>
            </DrawerContent>
          </Drawer>

          {/* Cities Filter Chip */}
          <Drawer open={mobileDrawer.open && mobileDrawer.activeFilter === 'cities'} onOpenChange={(open) => setMobileDrawer({ open, activeFilter: open ? 'cities' : null })}>
            <DrawerTrigger asChild>
              <button className="flex items-center gap-2 rounded-full px-4 py-2.5 text-sm whitespace-nowrap flex-shrink-0 border border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-colors">
                <IconMapPin className="w-4 h-4 text-primary" />
                <span className="text-primary-700 font-medium">
                  {filters.cities.length === 0
                    ? t('annualActivitySection.allCities')
                    : filters.cities.length === 1
                      ? t('selectedCountryMap.' + filters.cities[0])
                      : t('annualActivitySection.selectedCities', { count: filters.cities.length })
                  }
                </span>
                <IconChevronDown className="w-4 h-4 text-primary/60" />
              </button>
            </DrawerTrigger>
            <DrawerContent className="h-auto max-h-[60vh] flex flex-col">
              <DrawerHeader>
                <DrawerTitle className="text-lg font-semibold text-primary-800 text-center">
                  {t('annualActivitySection.city')}
                </DrawerTitle>
                <DrawerDescription className="text-sm text-primary-500 mt-1 text-center">{t('annualActivitySection.cityFilterSubtitle')}</DrawerDescription>
              </DrawerHeader>
              <div className="flex-1 overflow-y-auto px-4 py-4 border-t">
                <div className="mb-3 items-center justify-center">
                  <Button
                      variant={filters.cities.length === 0 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilters(prev => ({ ...prev, cities: [] }))}
                      className={`h-10 px-4 rounded-full w-full py-4 ${
                        filters.cities.length === 0
                          ? ""
                          : "border-primary text-primary-600 hover:bg-primary-50"
                      }`}
                    >
                      {t('annualActivitySection.allCities')}
                    </Button>
                </div>
                <div className="flex gap-2 flex-wrap items-center justify-center">
                  {availableOptions.cities.map((city) => (
                    <Button
                      key={city}
                      variant={filters.cities.includes(city) ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        if (filters.cities.includes(city)) {
                          setFilters(prev => ({ ...prev, cities: prev.cities.filter(c => c !== city) }));
                        } else {
                          setFilters(prev => ({ ...prev, cities: [...prev.cities, city] }));
                        }
                      }}
                      className={`h-10 px-4 rounded-full flex-shrink-0 transition-all duration-200 ${
                        filters.cities.includes(city)
                          ? "border-primary bg-primary text-white shadow-md"
                          : "border-primary/30 hover:border-primary/60 hover:bg-primary/5"
                      }`}
                    >
                      {t('selectedCountryMap.' + city)}
                    </Button>
                  ))}
                </div>
              </div>
            </DrawerContent>
          </Drawer>

          {/* Event Types Filter Chip */}
          <Drawer open={mobileDrawer.open && mobileDrawer.activeFilter === 'eventTypes'} onOpenChange={(open) => setMobileDrawer({ open, activeFilter: open ? 'eventTypes' : null })}>
            <DrawerTrigger asChild>
              <button className="flex items-center gap-2 rounded-full px-4 py-2.5 text-sm whitespace-nowrap flex-shrink-0 border border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-colors">
                <IconTag className="w-4 h-4 text-primary" />
                <span className="text-primary-700 font-medium">
                  {filters.eventTypes.length === 0
                    ? t('annualActivitySection.allEventTypes')
                    : filters.eventTypes.length === 1
                      ? (eventTypeMap[filters.eventTypes[0] as keyof typeof eventTypeMap] || filters.eventTypes[0])
                      : t('annualActivitySection.selectedEventTypes', { count: filters.eventTypes.length })
                  }
                </span>
                <IconChevronDown className="w-4 h-4 text-primary/60" />
              </button>
            </DrawerTrigger>
            <DrawerContent className="h-auto max-h-[60vh] flex flex-col">
              <DrawerHeader className="px-4 pt-4 pb-3">
                <DrawerTitle className="text-lg font-semibold text-primary-800 text-center">
                  {t('annualActivitySection.eventType')}
                </DrawerTitle>
                <DrawerDescription className="text-sm text-primary-500 mt-1 text-center">{t('annualActivitySection.eventTypeFilterSubtitle')}</DrawerDescription>
              </DrawerHeader>
              <div className="flex-1 overflow-y-auto px-4 py-4 border-t">
                <div className="mb-3 items-center justify-center">
                  <Button
                      variant={filters.eventTypes.length === 0 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilters(prev => ({ ...prev, eventTypes: [] }))}
                      className={`h-10 px-4 rounded-full w-full py-4 ${
                        filters.eventTypes.length === 0
                          ? ""
                          : "border-primary text-primary-600 hover:bg-primary-50"
                      }`}
                    >
                      {t('annualActivitySection.allEventTypes')}
                    </Button>
                </div>
                <div className="flex gap-2 flex-wrap items-center justify-center">
                  {availableOptions.eventTypes
                    .filter(type => type && type.trim() !== '')
                    .map((type) => (
                    <Button
                      key={type}
                      variant={filters.eventTypes.includes(type) ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        if (filters.eventTypes.includes(type)) {
                          setFilters(prev => ({ ...prev, eventTypes: prev.eventTypes.filter(t => t !== type) }));
                        } else {
                          setFilters(prev => ({ ...prev, eventTypes: [...prev.eventTypes, type] }));
                        }
                      }}
                      className={`h-10 px-4 rounded-full flex-shrink-0 transition-all duration-200 ${
                        filters.eventTypes.includes(type)
                          ? "border-primary bg-primary text-white shadow-md"
                          : "border-primary/30 hover:border-primary/60 hover:bg-primary/5"
                      }`}
                    >
                      {eventTypeMap[type as keyof typeof eventTypeMap] || type}
                    </Button>
                  ))}
                </div>
              </div>
            </DrawerContent>
          </Drawer>

          {/* Audience Types Filter Chip */}
          <Drawer open={mobileDrawer.open && mobileDrawer.activeFilter === 'audienceTypes'} onOpenChange={(open) => setMobileDrawer({ open, activeFilter: open ? 'audienceTypes' : null })}>
            <DrawerTrigger asChild>
            <button className="flex items-center gap-2 rounded-full px-4 py-2.5 text-sm whitespace-nowrap flex-shrink-0 border border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-colors">
                <UsersIcon className="w-4 h-4 text-primary" />
                <span className="text-primary-700 font-medium">
                  {filters.audienceTypes.length === 0
                    ? t('annualActivitySection.allAudienceTypes')
                    : filters.audienceTypes.length === 1
                      ? (audienceTypeMap[filters.audienceTypes[0] as keyof typeof audienceTypeMap] || filters.audienceTypes[0])
                      : t('annualActivitySection.selectedAudienceTypes', { count: filters.audienceTypes.length })
                  }
                </span>
                <IconChevronDown className="w-4 h-4 text-primary/60" />
              </button>
            </DrawerTrigger>
            <DrawerContent className="h-auto max-h-[60vh] flex flex-col">
              <DrawerHeader>
                <DrawerTitle className="text-lg font-semibold text-primary-800 text-center">
                  {t('annualActivitySection.audienceType')}
                </DrawerTitle>
                <DrawerDescription className="text-sm text-primary-500 mt-1 text-center">{t('annualActivitySection.audienceTypeFilterSubtitle')}</DrawerDescription>
              </DrawerHeader>
              <div className="flex-1 overflow-y-auto px-4 py-4 border-t">
                <div className="mb-3">
                  <Button
                      variant={filters.audienceTypes.length === 0 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilters(prev => ({ ...prev, audienceTypes: [] }))}
                      className={`h-10 px-4 rounded-full w-full py-4 ${
                        filters.audienceTypes.length === 0
                          ? ""
                          : "border-primary text-primary-600 hover:bg-primary-50"
                      }`}
                    >
                      {t('annualActivitySection.allAudienceTypes')}
                    </Button>
                </div>
                <div className="flex gap-2 flex-wrap items-center justify-center">
                  {availableOptions.audienceTypes.map((type) => (
                    <Button
                      key={type}
                      variant={filters.audienceTypes.includes(type) ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        if (filters.audienceTypes.includes(type)) {
                          setFilters(prev => ({ ...prev, audienceTypes: prev.audienceTypes.filter(t => t !== type) }));
                        } else {
                          setFilters(prev => ({ ...prev, audienceTypes: [...prev.audienceTypes, type] }));
                        }
                      }}
                      className={`h-10 px-4 rounded-full flex-shrink-0 transition-all duration-200 ${
                        filters.audienceTypes.includes(type)
                          ? "border-primary bg-primary text-white shadow-md"
                          : "border-primary/30 hover:border-primary/60 hover:bg-primary/5"
                      }`}
                    >
                      {audienceTypeMap[type as keyof typeof audienceTypeMap] || type}
                    </Button>
                  ))}
                </div>
              </div>
            </DrawerContent>
          </Drawer>

          {/* Campus Toggle Chip */}
          <button
            onClick={() => setFilters(prev => ({ ...prev, showCampusOnly: !prev.showCampusOnly }))}
            className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm whitespace-nowrap flex-shrink-0 transition-colors border font-medium ${
              filters.showCampusOnly
                ? "bg-google-green border-google-green text-black hover:bg-google-green/90"
                : "border-primary/30 hover:border-primary/60 hover:bg-primary/5 text-primary-700"
            }`}
          >
            <IconSchool className="w-4 h-4" />
            <span>{t('annualActivitySection.campusEvent')}</span>
          </button>
        </div>
      </div>

      {/* Results and Clear Button */}
      <div className="flex items-center justify-between px-4 pb-4 border-t border-gray-100 pt-3">
        <div className="flex items-center gap-2 text-sm text-primary-600">
          <IconEye className="w-4 h-4" />
          <span className="font-medium">{t('annualActivitySection.showingResults', { count: displayEvents.length })}</span>
        </div>
        {(filters.year !== 'all' || filters.cities.length > 0 || filters.eventTypes.length > 0 || filters.audienceTypes.length > 0 || filters.showCampusOnly) && (
          <button
            onClick={() => setFilters({ year: 'all', cities: [], eventTypes: [], audienceTypes: [], showCampusOnly: false })}
            className="flex items-center gap-1.5 text-red-600 bg-red-50 rounded-full px-3 py-1.5 text-sm hover:bg-red-100 transition-colors border border-red-200 hover:border-red-300 font-medium"
          >
            <IconX className="w-4 h-4" />
            <span>{t('annualActivitySection.clearFilters')}</span>
          </button>
        )}
      </div>
    </div>
  );
}