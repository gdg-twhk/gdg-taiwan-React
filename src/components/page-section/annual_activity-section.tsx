"use client";

import { getEventByTag } from "@/api/bevy";
import { useState, useEffect, useMemo } from "react";
import { Event } from "@/interfaces";
import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { AnnualActivitySectionProps, activityMeta } from "@/entities/anaual_activity/index";
import { useActivityContent } from "@/entities/anaual_activity/useActivityContent";
import Image from "next/image";
import { IconSchool, IconX, IconEye } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useClientOnly } from "@/components/use-client-only";
import { ModernEventCard } from "../modern-event-card";
import { isCampusChapter, getCountyFromChapterName, sortCountryList } from "@/helper/index";
import { Separator } from "@/components/ui/separator"
interface FilterState {
  timeRange: string | null; // 'all' | 'thisWeek' | 'weekend' | 'thisMonth' | 'custom'
  customDateRange: { start: Date | null; end: Date | null } | null;
  cities: string[];
  eventTypes: string[];
  showCampusOnly: boolean;
}



function getTimeRangeFilter(timeRange: string | null, customDateRange: { start: Date | null; end: Date | null } | null) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  switch (timeRange) {
    case 'thisWeek': {
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);
      return { start: startOfWeek, end: endOfWeek };
    }
    case 'weekend': {
      const saturday = new Date(today);
      saturday.setDate(today.getDate() + (6 - today.getDay()));
      const sunday = new Date(saturday);
      sunday.setDate(saturday.getDate() + 1);
      sunday.setHours(23, 59, 59, 999);
      return { start: saturday, end: sunday };
    }
    case 'thisMonth': {
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      endOfMonth.setHours(23, 59, 59, 999);
      return { start: startOfMonth, end: endOfMonth };
    }
    case 'custom':
      return customDateRange && customDateRange.start && customDateRange.end
        ? { start: customDateRange.start, end: customDateRange.end }
        : null;
    default:
      return null;
  }
}

function filterEvents(events: Event[], filters: FilterState): Event[] {
  return events.filter(event => {
    // Time range filter
    if (filters.timeRange && filters.timeRange !== 'all') {
      const timeFilter = getTimeRangeFilter(filters.timeRange, filters.customDateRange);
      if (timeFilter) {
        const eventDate = new Date(event.start_date_iso);
        if (eventDate < timeFilter.start || eventDate > timeFilter.end) {
          return false;
        }
      }
    }

    // Cities filter (multi-select)
    if (filters.cities.length > 0) {
      const eventCity = getCountyFromChapterName(event.chapter_title);
      if (!eventCity || !filters.cities.includes(eventCity)) {
        return false;
      }
    }

    // Event types filter (multi-select)
    if (filters.eventTypes.length > 0) {
      if (!event.event_type_title || !filters.eventTypes.includes(event.event_type_title)) {
        return false;
      }
    }

    // Campus filter
    if (filters.showCampusOnly) {
      if (!isCampusChapter(event.chapter_title)) {
        return false;
      }
    }

    return true;
  });
}

export default function AnnualActivitySection({ activity }: AnnualActivitySectionProps) {
  const mounted = useClientOnly();
  const [activities, setActivities] = useState<Event[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    timeRange: 'all',
    customDateRange: null,
    cities: [],
    eventTypes: [],
    showCampusOnly: false,
  });
  const { t } = useTranslation();
  const content = useActivityContent();

  const eventTypeMap = {
    "Conference": t('eventTypeMap.Conference'),
    "Info session": t('eventTypeMap.InfoSession'),
    "Watch Party": t('eventTypeMap.WatchParty'),
    "Conference with Bevy Virtual Conference": t('eventTypeMap.ConferenceWithBevyVirtualConference'),
    "External Ticketing": t('eventTypeMap.ExternalTicketing'),
    "Hackathon": t('eventTypeMap.Hackathon'),
    "Workshop / Study Group": t('eventTypeMap.WorkshopStudyGroup'),
    "Speaker Session / Tech Talk": t('eventTypeMap.SpeakerSessionTechTalk'),
    "Test Event - use to test creating an event page": t('eventTypeMap.TestEvent'),
    "Women's Online Safety Program": t('eventTypeMap.WomenOnlineSafetyProgram'),
    "Google Hosted Summit": t('eventTypeMap.GoogleHostedSummit')
  }


  // 取得所有活動
  useEffect(() => {
    async function fetchEvents() {
      const events = await getEventByTag(
        activityMeta[activity].bevytagId
      );
      setActivities(events || []);
    }
    fetchEvents();
  }, [activity]);

  // 計算可用的篩選選項
  const availableOptions = useMemo(() => {
    const citySet = new Set(activities.map(event => getCountyFromChapterName(event.chapter_title)).filter(Boolean));
    const cities = sortCountryList([...citySet]);
    const eventTypes = [...new Set(activities.map(event => event.event_type_title).filter(Boolean))].sort();

    return { cities, eventTypes };
  }, [activities]);

  // 篩選後的活動
  const filteredEvents = useMemo(() => {
    return filterEvents(activities, filters);
  }, [activities, filters]);

  // 顯示活動 (直接使用篩選後的結果)
  const displayEvents = filteredEvents;


  if (!mounted) return null;

  return (
    <div>
      <section
        className="w-full px-0 flex flex-col justify-center items-center relative py-16 md:py-24 h-[400px]"
        style={{
          backgroundImage: `url(${activityMeta[activity].backgroundUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          width: "100%",
          margin: 0,
        }}
      >
        <div className="row align-items-lg-center justify-content-left">
          <div className="col-lg-12 text-center">
            <Image
              src={activityMeta[activity].iconUrl}
              alt="main image"
              width={100}
              height={100}
              className="w-[90vw] md:w-[30vw] h-auto"
            />
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 py-16 md:py-16">
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className="col-span-1"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                src={activityMeta[activity].animationUrl}
                alt="main image"
                width={100}
                height={100}
                style={{ width: "50%", height: "auto" }}
              />
            </div>
            <div className="col-span-1 text-center md:text-left">
              <CardHeader>
                <CardTitle className="text-2xl font-bold mb-4 text-google-blue">
                  {content[activity].title}
                </CardTitle>
                <CardDescription className="text-lg">
                  {content[activity].description}
                </CardDescription>
                <CardFooter className="flex flex-col gap-4 justify-start items-center md:items-start px-0 mt-4">
                  <Button
                    className={`bg-google-blue dark:bg-google-blue border border-3 rounded-lg text-xl font-medium text-black hover:bg-halftone-blue dark:hover:bg-halftone-blue hover:text-black hover:border-black`}
                  >
                    <Link
                      href={activityMeta[activity].url}
                      target="_blank"
                    >
                      {t('annualActivitySection.learnMore')}
                    </Link>
                  </Button>
                </CardFooter>
              </CardHeader>
            </div>
          </div>
        </Card>
      </section>

      {/* 篩選區域 */}
      <section className="container mx-auto px-4 py-6">
        <div className="flex flex-col space-y-4">
          {/* 時間範圍篩選列 */}
          <div className="md:flex md:flex-wrap gap-3 items-center card border-2 bg-card rounded-lg p-4 md:justify-center overflow-x-auto">
            <div className="flex gap-3 items-center md:flex-wrap md:justify-center w-max md:w-auto">
            {/* 時間範圍快速篩選 */}
            <div className="flex gap-2">
              {(['all', 'thisWeek', 'weekend', 'thisMonth'] as const).map((timeRange) => (
                <Button
                  key={timeRange}
                  variant={filters.timeRange === timeRange ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilters(prev => ({ ...prev, timeRange, customDateRange: null }))}
                  className="h-10 px-4 rounded-full"
                >
                  {t(`annualActivitySection.${timeRange === 'all' ? 'allTime' : timeRange}`)}
                </Button>
              ))}
              <Button
                variant={filters.timeRange === 'custom' ? "default" : "outline"}
                size="sm"
                onClick={() => setFilters(prev => ({ ...prev, timeRange: 'custom' }))}
                className="h-10 px-4 rounded-full"
              >
                {t('annualActivitySection.customRange')}
              </Button>
            </div>
            <Separator />
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={filters.cities.length === 0 ? "default" : "outline"}
                size="sm"
                onClick={() => setFilters(prev => ({ ...prev, cities: [] }))}
                className="h-10 px-4 rounded-full"
              >
                {t('annualActivitySection.allCities')}
              </Button>
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
                  className="h-10 px-4 rounded-full"
                >
                  {t('selectedCountryMap.' + city)}
                </Button>
              ))}
            </div>
            </div>
          </div>

          {/* 活動類型篩選列 */}
          <div className="md:flex md:flex-wrap gap-3 items-center card border-2 bg-card rounded-lg p-4 md:justify-center overflow-x-auto">
            <div className="flex gap-3 items-center md:flex-wrap md:justify-center w-max md:w-auto">
            {/* 活動類型快速篩選 */}
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={filters.eventTypes.length === 0 ? "default" : "outline"}
                size="sm"
                onClick={() => setFilters(prev => ({ ...prev, eventTypes: [] }))}
                className="h-10 px-4 rounded-full"
              >
                {t('annualActivitySection.allEventTypes')}
              </Button>
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
                  className="h-10 px-4 rounded-full"
                >
                  {eventTypeMap[type as keyof typeof eventTypeMap] || type}
                </Button>
              ))}
            </div>
            </div>
          </div>

          {/* 其他篩選器列 */}
          <div className="md:flex md:flex-wrap gap-3 items-center card border-2 bg-card rounded-lg p-4 md:justify-center overflow-x-auto">
            <div className="flex gap-3 items-center md:flex-wrap md:justify-center w-max md:w-auto">

            {/* 校園活動開關 */}
            <div className="flex items-center gap-3 px-4 py-2 h-10 bg-white border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow">
              <IconSchool className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                {filters.showCampusOnly ? t('annualActivitySection.campusOnly') : t('annualActivitySection.allEvents')}
              </span>
              <Switch
                checked={filters.showCampusOnly}
                onCheckedChange={(checked: boolean) => setFilters(prev => ({ ...prev, showCampusOnly: checked }))}
                className={filters.showCampusOnly ? "bg-green-500" : "bg-blue-500"}
              />
            </div>

            {/* 清除全部按鈕 */}
            {(filters.timeRange !== 'all' || filters.cities.length > 0 || filters.eventTypes.length > 0 || filters.showCampusOnly) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFilters({ timeRange: 'all', customDateRange: null, cities: [], eventTypes: [], showCampusOnly: false })}
                className="h-8 px-3 text-gray-600 hover:text-gray-900"
              >
                <IconX className="w-4 h-4 mr-1" />
                {t('annualActivitySection.clearFilters')}
              </Button>
            )}
            </div>
          </div>

          {/* 瀏覽統計 */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <IconEye className="w-4 h-4" />
            <span>{t('annualActivitySection.showingResults', { count: displayEvents.length })}</span>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 md:py-16 w-full justify-center items-center">
        <div className="gap-4 px-4 py-4 overflow-auto w-full justify-center items-center flex flex-col">
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 w-full`}>
            {displayEvents.length > 0 ? displayEvents.sort((a, b) => new Date(b.start_date_iso).getTime() - new Date(a.start_date_iso).getTime()).map((event:Event) => (
              <ModernEventCard key={event.id} eventObject={event} />
            )) : (
              <div className="col-span-full text-center text-lg text-muted-foreground py-16">
                {t('annualActivitySection.noEvents')}
              </div>
            )}
        </div>
        </div>
      </section>
    </div>
  );
}
