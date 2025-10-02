"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { IconSchool, IconX, IconEye } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { Separator } from "@/components/ui/separator";
import { Event } from "@/interfaces";

interface FilterState {
  year: string | null;
  cities: string[];
  eventTypes: string[];
  audienceTypes: string[];
  showCampusOnly: boolean;
}

interface AvailableOptions {
  cities: string[];
  eventTypes: string[];
  audienceTypes: string[];
  years: string[];
}

interface DesktopFilterInterfaceProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  availableOptions: AvailableOptions;
  displayEvents: Event[];
  eventTypeMap: Record<string, string>;
  audienceTypeMap: Record<string, string>;
}

export function DesktopFilterInterface({
  filters,
  setFilters,
  availableOptions,
  displayEvents,
  eventTypeMap,
  audienceTypeMap,
}: DesktopFilterInterfaceProps) {
  const { t } = useTranslation();

  return (
    <div className="hidden md:flex flex-col bg-card rounded-lg border-2 p-4">
      {/* 年份篩選列 */}
      <div className="card bg-card p-4 overflow-x-auto">
        <div className="flex gap-2 items-center min-w-max">
          <Button
            variant={filters.year === 'all' ? "default" : "outline"}
            size="sm"
            onClick={() => setFilters(prev => ({ ...prev, year: 'all' }))}
            className="h-10 px-4 rounded-full flex-shrink-0 border border-primary"
          >
            {t('annualActivitySection.allYears')}
          </Button>
          <Separator orientation="vertical" className="!h-6 bg-primary" />
          {availableOptions.years.map((year) => (
            <Button
              key={year}
              variant={filters.year === year ? "default" : "outline"}
              size="sm"
              onClick={() => setFilters(prev => ({ ...prev, year }))}
              className="h-10 px-4 rounded-full flex-shrink-0 border border-primary"
            >
              {year}
            </Button>
          ))}
        </div>
      </div>

      {/* 分會城市篩選列 */}
      <div className="card bg-card  p-4 overflow-x-auto">
        <div className="flex gap-2 items-center min-w-max">
          <Button
            variant={filters.cities.length === 0 ? "default" : "outline"}
            size="sm"
            onClick={() => setFilters(prev => ({ ...prev, cities: [] }))}
            className="h-10 px-4 rounded-full flex-shrink-0 border border-primary"
          >
            {t('annualActivitySection.allCities')}
          </Button>
          <Separator orientation="vertical" className="!h-6 bg-primary" />
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
              {t('selectedCountryMap.' + city)}
            </Button>
          ))}
        </div>
      </div>

      {/* 活動類型篩選列 */}
      <div className="card bg-card  p-4 overflow-x-auto">
        <div className="flex gap-2 items-center min-w-max">
          <Button
            variant={filters.eventTypes.length === 0 ? "default" : "outline"}
            size="sm"
            onClick={() => setFilters(prev => ({ ...prev, eventTypes: [] }))}
            className="h-10 px-4 rounded-full flex-shrink-0 border border-primary"
          >
            {t('annualActivitySection.allEventTypes')}
          </Button>
          <Separator orientation="vertical" className="!h-6 bg-primary" />
          {availableOptions.eventTypes.map((type) => (
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
              {eventTypeMap[type as keyof typeof eventTypeMap] || type}
            </Button>
          ))}
        </div>
      </div>

      {/* 參與者類型篩選列 */}
      <div className="card bg-card  p-4 overflow-x-auto">
        <div className="flex gap-2 items-center min-w-max">
          <Button
            variant={filters.audienceTypes.length === 0 ? "default" : "outline"}
            size="sm"
            onClick={() => setFilters(prev => ({ ...prev, audienceTypes: [] }))}
            className="h-10 px-4 rounded-full flex-shrink-0 border border-primary"
          >
            {t('annualActivitySection.allAudienceTypes')}
          </Button>
          <Separator orientation="vertical" className="!h-6 bg-primary" />
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
              className="h-10 px-4 rounded-full flex-shrink-0 bg-white border border-primary"
            >
              {audienceTypeMap[type as keyof typeof audienceTypeMap] || type}
            </Button>
          ))}
          <Separator orientation="vertical" className="!h-6 bg-primary"/>
          <div className="flex items-center gap-3 px-4 py-2 h-10 border border-primary rounded-full shadow-sm hover:shadow-md transition-shadow w-fit">
            <IconSchool className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              {filters.showCampusOnly ? t('annualActivitySection.campusOnly') : t('annualActivitySection.allEvents')}
            </span>
            <Switch
              checked={filters.showCampusOnly}
              onCheckedChange={(checked: boolean) => setFilters(prev => ({ ...prev, showCampusOnly: checked }))}
              className={filters.showCampusOnly ? "bg-google-green" : "bg-google-blue"}
            />
          </div>
        </div>
      </div>

      {/* Desktop Results Display */}
      <div className="flex flex-wrap gap-3 items-center justify-between pt-4 border-t border-primary">
        <div className="flex items-center gap-2 text-sm text-primary">
          <IconEye className="w-4 h-4" />
          <span>{t('annualActivitySection.showingResults', { count: displayEvents.length })}</span>
        </div>

        {(filters.year !== 'all' || filters.cities.length > 0 || filters.eventTypes.length > 0 || filters.audienceTypes.length > 0 || filters.showCampusOnly) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setFilters({ year: 'all', cities: [], eventTypes: [], audienceTypes: [], showCampusOnly: false })}
            className="h-8 px-3 hover:bg-gray-100 border border-red-600"
          >
            <IconX className="w-4 h-4 mr-1 text-red-600 hover:text-red-500" />
            <span className="text-red-600 hover:text-red-500">{t('annualActivitySection.clearFilters')}</span>
          </Button>
        )}
      </div>
    </div>
  );
}