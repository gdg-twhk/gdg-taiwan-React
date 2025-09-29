"use client";

import { getEventByTag } from "@/api/bevy";
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
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
import Link from "next/link";
import { AnnualActivitySectionProps, activityMeta } from "@/entities/anaual_activity/index";
import { useActivityContent } from "@/entities/anaual_activity/useActivityContent";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useClientOnly } from "@/components/use-client-only";
import { ModernEventCard } from "../modern-event-card";
import { isCampusChapter, getCountyFromChapterName, sortCountryList } from "@/helper/index";
import { MobileFilterInterface } from "../mobile-filter-interface";
import { DesktopFilterInterface } from "../desktop-filter-interface";
import { TFunction } from "i18next";
interface FilterState {
  year: string | null; // 'all' | specific year string
  cities: string[];
  eventTypes: string[];
  audienceTypes: string[];
  showCampusOnly: boolean;
}




function filterEvents(events: Event[], filters: FilterState, t: TFunction): Event[] {
  return events.filter(event => {
    // Year filter
    if (filters.year && filters.year !== 'all') {
      const eventYear = event.start_date_iso
        ? new Date(event.start_date_iso).getFullYear().toString()
        : t('annualActivitySection.unknownYear');
      if (eventYear !== filters.year) {
        return false;
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

    // Audience types filter (multi-select)
    if (filters.audienceTypes.length > 0) {
      if (!event.audience_type || !filters.audienceTypes.includes(event.audience_type)) {
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
    year: 'all',
    cities: [],
    eventTypes: [],
    audienceTypes: [],
    showCampusOnly: false,
  });
  const [stickyYear, setStickyYear] = useState<string | null>(null);
  const yearRefs = useRef<Record<string, HTMLDivElement | null>>({});
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
    "Google Hosted Summit": t('eventTypeMap.GoogleHostedSummit'),
    "Hands on workshop - Virtual": t('eventTypeMap.HandsOnWorkshopVirtual'),
    "International Women's Day": t('eventTypeMap.InternationalWomensDay'),
    "Speaker Session/ Tech Talk - Virtual": t('eventTypeMap.SpeakerSessionTechTalkVirtual'),
    "DevFest Co-Host": t('eventTypeMap.DevFestCoHost')
  }

  const audienceTypeMap = {
    "Virtual": t('audienceTypeMap.Virtual'),
    "In-person": t('audienceTypeMap.In-person'),
    "Hybrid": t('audienceTypeMap.Hybrid')
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
    const audienceTypes = [...new Set(activities.map(event => event.audience_type).filter(Boolean))].sort();
    const years = [...new Set(activities.map(event => {
      return event.start_date_iso
        ? new Date(event.start_date_iso).getFullYear().toString()
        : t('annualActivitySection.unknownYear');
    }))].sort((a, b) => b.localeCompare(a)); // Sort in descending order (newest first)

    return { cities, eventTypes, audienceTypes, years };
  }, [activities]);

  // 篩選後的活動
  const filteredEvents = useMemo(() => {
    return filterEvents(activities, filters, t);
  }, [activities, filters]);

  // 顯示活動 (按年份分組)
  const displayEvents = useMemo(() => {
    const eventsByYear = filteredEvents.reduce((acc, event) => {
      const year = event.start_date_iso
        ? new Date(event.start_date_iso).getFullYear().toString()
        : t('annualActivitySection.unknownYear');

      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(event);
      return acc;
    }, {} as Record<string, Event[]>);

    // Sort years in descending order (newest first)
    const sortedYears = Object.keys(eventsByYear).sort((a, b) => {
      const unknownYear = t('annualActivitySection.unknownYear');
      if (a === unknownYear) return 1;
      if (b === unknownYear) return -1;
      return b.localeCompare(a);
    });

    return { eventsByYear, sortedYears };
  }, [filteredEvents]);

  // Scroll detection for sticky year header
  const handleScroll = useCallback(() => {
    if (displayEvents.sortedYears.length <= 1) {
      setStickyYear(null);
      return;
    }

    let currentStickyYear = null;
    const scrollY = window.scrollY;
    const offsetThreshold = 100; // Offset from top of viewport

    for (const year of displayEvents.sortedYears) {
      const yearElement = yearRefs.current[year];
      if (yearElement) {
        const rect = yearElement.getBoundingClientRect();
        const absoluteTop = scrollY + rect.top;

        if (scrollY + offsetThreshold >= absoluteTop) {
          currentStickyYear = year;
        } else {
          break;
        }
      }
    }

    setStickyYear(currentStickyYear);
  }, [displayEvents.sortedYears]);

  useEffect(() => {
    if (!mounted || displayEvents.sortedYears.length <= 1) return;

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mounted, handleScroll, displayEvents.sortedYears.length]);

  if (!mounted) return null;

  return (
    <div className="relative">
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
                    className={`bg-google-blue dark:bg-google-blue border border-3  text-xl font-medium text-black hover:bg-halftone-blue dark:hover:bg-halftone-blue hover:text-black hover:border-black`}
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
      <section className="container mx-auto py-6">
        <MobileFilterInterface
          filters={filters}
          setFilters={setFilters}
          availableOptions={availableOptions}
          displayEvents={Object.values(displayEvents.eventsByYear).flat()}
          eventTypeMap={eventTypeMap}
          audienceTypeMap={audienceTypeMap}
        />

        <DesktopFilterInterface
          filters={filters}
          setFilters={setFilters}
          availableOptions={availableOptions}
          displayEvents={Object.values(displayEvents.eventsByYear).flat()}
          eventTypeMap={eventTypeMap}
          audienceTypeMap={audienceTypeMap}
        />
      </section>

      {/* Sticky Year Header */}
      <div
        className={`fixed sticky top-16 left-0 right-0 z-9 bg-background border-b-3 shadow-sm transition-all duration-300 ease-in-out ${
          stickyYear
            ? 'translate-y-0 opacity-100'
            : '-translate-y-full opacity-0'
        }`}
      >
        <div className="container mx-auto px-4">
          {(displayEvents.sortedYears.length > 1 || filters.year !== 'all') && (
            <div className="flex items-center justify-center mb-4 mt-4">
              <div className="flex-1 border-t border-primary"></div>
              <div className="mx-4 text-xl font-semibold px-4 transition-all duration-200">
                {stickyYear || ''}{t('annualActivitySection.yearSuffix')}
              </div>
              <div className="flex-1 border-t border-primary"></div>
            </div>
          )}
        </div>
      </div>

      <section className="container mx-auto px-4 py-16 md:py-16 w-full justify-center items-center">
        <div className="gap-4 px-4 py-4 overflow-auto w-full justify-center items-center flex flex-col">
          {displayEvents.sortedYears.length > 0 ? (
            displayEvents.sortedYears.map((year) => (
              <div
                key={year}
                className="w-full"
                ref={(el) => {
                  yearRefs.current[year] = el;
                }}
              >
                {/* Year separator - only show if multiple years or not showing all years */}
                {(displayEvents.sortedYears.length > 1 || filters.year !== 'all') && (
                  <div className="flex items-center justify-center mb-8 mt-8">
                    <div className="flex-1 border-t border-primary"></div>
                    <div className="mx-4 text-xl font-semibold px-4">
                      {year}{t('annualActivitySection.yearSuffix')}
                    </div>
                    <div className="flex-1 border-t border-primary"></div>
                  </div>
                )}

                {/* Events grid for this year */}
                <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-12`}>
                  {Object.values(displayEvents.eventsByYear[year])
                    .sort((a, b) => new Date(b.start_date_iso).getTime() - new Date(a.start_date_iso).getTime())
                    .map((event: Event) => (
                      <ModernEventCard key={event.id} eventObject={event} />
                    ))}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-lg text-muted-foreground py-16">
              {t('annualActivitySection.noEvents')}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
