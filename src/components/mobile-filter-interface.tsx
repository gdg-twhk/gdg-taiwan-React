"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IconSchool, IconX, IconEye, IconCalendar, IconMapPin, IconTag, IconChevronDown } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  const [mobileDrawer, setMobileDrawer] = useState<MobileDrawerState>({
    open: false,
    activeFilter: null,
  });

  return (
    <div className="md:hidden mx-4 px-4 bg-card rounded-xl border shadow-sm p-4">
      {/* Horizontal Scrollable Filter Chips */}
      <div className="mb-4 ">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {/* Year Filter Select */}
          <div className="flex items-center gap-1 rounded-full px-3 py-2 text-sm whitespace-nowrap flex-shrink-0 border border-gray-300 bg-gray-100">
            <IconCalendar className="w-4 h-4 text-gray-600" />
            <Select
              value={filters.year === 'all' ? 'all' : filters.year || 'all'}
              onValueChange={(value) => setFilters(prev => ({ ...prev, year: value }))}
            >
              <SelectTrigger className="border-0 bg-transparent shadow-none p-0 h-auto text-gray-700 focus:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('annualActivitySection.allYears')}</SelectItem>
                {availableOptions.years.map((year) => (
                  <SelectItem key={year} value={year}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Cities Filter Chip */}
          <Sheet open={mobileDrawer.open && mobileDrawer.activeFilter === 'cities'} onOpenChange={(open) => setMobileDrawer({ open, activeFilter: open ? 'cities' : null })}>
            <SheetTrigger asChild>
              <button className="flex items-center gap-1 rounded-full px-3 py-2 text-sm whitespace-nowrap flex-shrink-0 border border-gray-300 bg-gray-100 hover:bg-gray-200">
                <IconMapPin className="w-4 h-4 text-gray-600" />
                <span className="text-gray-700">
                  {filters.cities.length === 0
                    ? t('annualActivitySection.allCities')
                    : filters.cities.length === 1
                      ? t('selectedCountryMap.' + filters.cities[0])
                      : t('annualActivitySection.selectedCities', { count: filters.cities.length })
                  }
                </span>
                <IconChevronDown className="w-4 h-4 text-gray-600" />
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[400px] px-4">
              <SheetHeader className="border-b border-primary pb-4">
                <SheetTitle className="text-lg font-semibold text-primary-800">
                  {t('annualActivitySection.city')}
                </SheetTitle>
                <p className="text-sm text-primary-500 mt-1">選擇您所在或感興趣的分會</p>
              </SheetHeader>
              <div className="mt-4">
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant={filters.cities.length === 0 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilters(prev => ({ ...prev, cities: [] }))}
                    className={`h-10 px-4 rounded-full flex-shrink-0 ${
                      filters.cities.length === 0
                        ? ""
                        : "border-primary text-primary-600 hover:bg-primary-50"
                    }`}
                  >
                    {t('annualActivitySection.allCities')}
                  </Button>
                  <div className="w-full border-t border-primary my-3"></div>
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
                      className="h-10 px-4 rounded-full flex-shrink-0 border border-primary"
                    >
                      {filters.cities.includes(city) && (
                        <IconX className="w-4 h-4 mr-1 text-current" />
                      )}
                      {t('selectedCountryMap.' + city)}
                    </Button>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Event Types Filter Chip */}
          <Sheet open={mobileDrawer.open && mobileDrawer.activeFilter === 'eventTypes'} onOpenChange={(open) => setMobileDrawer({ open, activeFilter: open ? 'eventTypes' : null })}>
            <SheetTrigger asChild>
              <button className="flex items-center gap-1 rounded-full px-3 py-2 text-sm whitespace-nowrap flex-shrink-0 border border-gray-300 bg-gray-100 hover:bg-gray-200">
                <IconTag className="w-4 h-4 text-primary-600" />
                <span className="text-primary-700">
                  {filters.eventTypes.length === 0
                    ? t('annualActivitySection.allEventTypes')
                    : filters.eventTypes.length === 1
                      ? (eventTypeMap[filters.eventTypes[0] as keyof typeof eventTypeMap] || filters.eventTypes[0])
                      : t('annualActivitySection.selectedEventTypes', { count: filters.eventTypes.length })
                  }
                </span>
                <IconChevronDown className="w-4 h-4 text-primary-600" />
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[400px] px-4">
              <SheetHeader className="border-b border-primary pb-4">
                <SheetTitle className="text-lg font-semibold text-primary-800">
                  {t('annualActivitySection.eventType')}
                </SheetTitle>
                <p className="text-sm text-primary-500 mt-1">選擇您感興趣的活動類型</p>
              </SheetHeader>
              <div className="mt-4">
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant={filters.eventTypes.length === 0 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilters(prev => ({ ...prev, eventTypes: [] }))}
                    className={`h-10 px-4 rounded-full flex-shrink-0 ${
                      filters.eventTypes.length === 0
                        ? ""
                        : "border-primary text-primary-600 hover:bg-primary-50"
                    }`}
                  >
                    {t('annualActivitySection.allEventTypes')}
                  </Button>
                  <div className="w-full border-t border-primary my-3"></div>
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
                      className="h-10 px-4 rounded-full flex-shrink-0 border border-primary"
                    >
                      {filters.eventTypes.includes(type) && (
                        <IconX className="w-4 h-4 mr-1 text-current" />
                      )}
                      {eventTypeMap[type as keyof typeof eventTypeMap] || type}
                    </Button>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Audience Types Filter Chip */}
          <Sheet open={mobileDrawer.open && mobileDrawer.activeFilter === 'audienceTypes'} onOpenChange={(open) => setMobileDrawer({ open, activeFilter: open ? 'audienceTypes' : null })}>
            <SheetTrigger asChild>
              <button className="flex items-center gap-1 rounded-full px-3 py-2 text-sm whitespace-nowrap flex-shrink-0 border border-gray-300 bg-gray-100 hover:bg-gray-200">
                <UsersIcon className="w-4 h-4 text-gray-600" />
                <span className="text-gray-700">
                  {filters.audienceTypes.length === 0
                    ? t('annualActivitySection.allAudienceTypes')
                    : filters.audienceTypes.length === 1
                      ? (audienceTypeMap[filters.audienceTypes[0] as keyof typeof audienceTypeMap] || filters.audienceTypes[0])
                      : t('annualActivitySection.selectedAudienceTypes', { count: filters.audienceTypes.length })
                  }
                </span>
                <IconChevronDown className="w-4 h-4 text-gray-600" />
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[400px] px-4">
              <SheetHeader className="border-b border-primary pb-4">
                <SheetTitle className="text-lg font-semibold text-primary-800">
                  {t('annualActivitySection.audienceType')}
                </SheetTitle>
                <p className="text-sm text-primary-500 mt-1">選擇適合的參與方式</p>
              </SheetHeader>
              <div className="mt-4">
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant={filters.audienceTypes.length === 0 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilters(prev => ({ ...prev, audienceTypes: [] }))}
                    className={`h-10 px-4 rounded-full flex-shrink-0 ${
                      filters.audienceTypes.length === 0
                        ? ""
                        : "border-primary text-primary-600 hover:bg-primary-50"
                    }`}
                  >
                    {t('annualActivitySection.allAudienceTypes')}
                  </Button>
                  <div className="w-full border-t border-primary my-3"></div>
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
                      className="h-10 px-4 rounded-full flex-shrink-0 border border-primary"
                    >
                      {filters.audienceTypes.includes(type) && (
                        <IconX className="w-4 h-4 mr-1 text-current" />
                      )}
                      {audienceTypeMap[type as keyof typeof audienceTypeMap] || type}
                    </Button>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Campus Toggle Chip */}
          <button
            onClick={() => setFilters(prev => ({ ...prev, showCampusOnly: !prev.showCampusOnly }))}
            className={`flex items-center gap-1 rounded-full px-3 py-2 text-sm whitespace-nowrap flex-shrink-0 transition-colors border border-primary ${
              filters.showCampusOnly
                ? "bg-google-green text-white"
                : "bg-primary-100 hover:bg-primary-200 text-foreground-700"
            }`}
          >
            <IconSchool className="w-4 h-4" />
            <span>{t('annualActivitySection.campusEvent')}</span>
          </button>
        </div>
      </div>

      {/* Results and Clear Button */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sm text-primary">
          <IconEye className="w-4 h-4" />
          <span>{t('annualActivitySection.showingResults', { count: displayEvents.length })}</span>
        </div>
        {(filters.year !== 'all' || filters.cities.length > 0 || filters.eventTypes.length > 0 || filters.audienceTypes.length > 0 || filters.showCampusOnly) && (
          <button
            onClick={() => setFilters({ year: 'all', cities: [], eventTypes: [], audienceTypes: [], showCampusOnly: false })}
            className="flex items-center gap-1 text-red-600 bg-red-50 rounded-full px-3 py-1 text-sm hover:bg-red-100 transition-colors border border-red-600"
          >
            <IconX className="w-4 h-4" />
            <span>{t('annualActivitySection.clearFilters')}</span>
          </button>
        )}
      </div>
    </div>
  );
}