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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { AnnualActivitySectionProps, activityMeta } from "@/entities/anaual_activity/index";
import { useActivityContent } from "@/entities/anaual_activity/useActivityContent";
import Image from "next/image";
import { IconCalendar, IconMapPin, IconSchool, IconTag, IconX, IconEye } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useClientOnly } from "@/components/use-client-only";
import { ModernEventCard } from "../modern-event-card";
import { isCampusChapter, getCountyFromChapterName, sortCountryList } from "@/helper/index";
interface FilterState {
  year: string | null;
  city: string | null;
  eventType: string | null;
  showCampusOnly: boolean;
}



function filterEvents(events: Event[], filters: FilterState): Event[] {
  return events.filter(event => {
    if (filters.year) {
      const eventYear = event.start_date_iso
        ? new Date(event.start_date_iso).getFullYear().toString()
        : "未知";
      if (eventYear !== filters.year) return false;
    }

    if (filters.city) {
      const eventCity = getCountyFromChapterName(event.chapter_title);
      if (eventCity !== filters.city) {
        return false;
      }
    }

    if (filters.eventType && event.event_type_title !== filters.eventType) {
      return false;
    }

    if (filters.showCampusOnly) {
      if (!isCampusChapter(event.chapter_title)) {
        return false;
      }
    }

    return true;
  });
}

function groupEventsByYear(events: Event[]) {
  const result: Record<string, Event[]> = {};
  events.forEach((event) => {
    const year = event.start_date_iso
      ? new Date(event.start_date_iso).getFullYear().toString()
      : "未知";
    if (!result[year]) result[year] = [];
    result[year].push(event);
  });
  Object.keys(result).forEach((year) => {
    result[year].sort(
      (a, b) =>
        new Date(b.start_date_iso).getTime() -
        new Date(a.start_date_iso).getTime()
    );
  });
  return result;
}

export default function AnnualActivitySection({ activity }: AnnualActivitySectionProps) {
  const mounted = useClientOnly();
  const [activities, setActivities] = useState<Event[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    year: null,
    city: null,
    eventType: null,
    showCampusOnly: false,
  });
  const [hasInitializedYear, setHasInitializedYear] = useState(false);
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
    const years = [...new Set(activities.map(event => {
      return event.start_date_iso
        ? new Date(event.start_date_iso).getFullYear().toString()
        : "未知";
    }))].sort();

    return { cities, eventTypes, years };
  }, [activities]);

  // 篩選後的活動
  const filteredEvents = useMemo(() => {
    return filterEvents(activities, filters);
  }, [activities, filters]);

  // 依年份分組
  const eventsByYear = useMemo(
    () => groupEventsByYear(filteredEvents),
    [filteredEvents]
  );

  // 預設選擇最新年份（僅在初始化時）
  useEffect(() => {
    if (availableOptions.years.length > 0 && !hasInitializedYear) {
      const latestYear = availableOptions.years[availableOptions.years.length - 1];
      setFilters(prev => ({ ...prev, year: latestYear }));
      setHasInitializedYear(true);
    }
  }, [availableOptions.years, hasInitializedYear]);

  // 顯示活動
  const displayEvents = useMemo(() => {
    if (filters.year) {
      return eventsByYear[filters.year] || [];
    }
    return filteredEvents;
  }, [filteredEvents, eventsByYear, filters.year]);


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
          {/* 水平篩選器列 */}
          <div className="md:flex md:flex-wrap gap-3 items-center card border-2 bg-card rounded-lg p-4 md:justify-center overflow-x-auto">
            <div className="flex gap-3 items-center md:flex-wrap md:justify-center w-max md:w-auto">
            {/* 分會城市篩選 */}
            <Select value={filters.city || "all"} onValueChange={(value) => setFilters(prev => ({ ...prev, city: value === "all" ? null : value }))}>
              <SelectTrigger className="w-auto min-w-[140px] h-10 bg-white border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2">
                  <IconMapPin className="w-4 h-4 text-gray-500" />
                  <SelectValue placeholder={filters.city || (t('annualActivitySection.allCities'))} />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('annualActivitySection.allCities')}</SelectItem>
                {availableOptions.cities.map((city) => (
                  <SelectItem key={city} value={city}>{t('selectedCountryMap.' + city)}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* 年份篩選 */}
            <Select value={filters.year || "all"} onValueChange={(value) => setFilters(prev => ({ ...prev, year: value === "all" ? null : value }))}>
              <SelectTrigger className="w-auto min-w-[120px] h-10 bg-white border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2">
                  <IconCalendar className="w-4 h-4 text-gray-500" />
                  <SelectValue placeholder={filters.year || (t('annualActivitySection.allYears'))} />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('annualActivitySection.allYears')}</SelectItem>
                {availableOptions.years.map((year) => (
                  <SelectItem key={year} value={year}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* 活動類型篩選 */}
            <Select value={filters.eventType || "all"} onValueChange={(value) => setFilters(prev => ({ ...prev, eventType: value === "all" ? null : value }))}>
              <SelectTrigger className="w-auto min-w-[140px] h-10 bg-white border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2">
                  <IconTag className="w-4 h-4 text-gray-500" />
                  <SelectValue placeholder={filters.eventType || (t('annualActivitySection.allEventTypes'))} />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('annualActivitySection.allEventTypes')}</SelectItem>
                {availableOptions.eventTypes.map((type) => (
                  <SelectItem key={type} value={type}>{eventTypeMap[type as keyof typeof eventTypeMap] || type}</SelectItem>
                ))}
              </SelectContent>
            </Select>

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
            {(filters.year || filters.city || filters.eventType || filters.showCampusOnly) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFilters({ year: null, city: null, eventType: null, showCampusOnly: false })}
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
