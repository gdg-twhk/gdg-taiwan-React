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
import { Skeleton } from "@/components/ui/skeleton";
import { ClockIcon } from "lucide-react";

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
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    year: 'all',
    cities: [],
    eventTypes: [],
    audienceTypes: [],
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
      setIsLoading(true);
      const events = await getEventByTag(
        activityMeta[activity].bevytagId
      );
      setActivities(events || []);
      setIsLoading(false);
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
  }, [activities, t]);

  // 篩選後的活動
  const filteredEvents = useMemo(() => {
    return filterEvents(activities, filters, t);
  }, [activities, filters, t]);

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
  }, [filteredEvents, t]);

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
          isLoading={isLoading}
        />
      </section>

      <section className="container mx-auto px-4 w-full justify-center items-center">
      <div className="max-h-[800px] overflow-y-auto px-4">
          <div className="space-y-6">
            {displayEvents.sortedYears.length > 0 ? (
              displayEvents.sortedYears.map((year) => (
                <div key={year}>
                  <div className="sticky top-0 bg-background/80 backdrop-blur-sm py-2 mb-3 z-10 flex items-center">
                    <div className="flex-grow border-t border-muted-foreground" />
                    <h3 className="shrink-0 mx-4 text-3xl font-semibold text-muted-foreground">{year}</h3>
                    <div className="flex-grow border-t border-muted-foreground" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.values(displayEvents.eventsByYear[year])
                      .sort((a, b) => new Date(a.start_date_iso).getTime() - new Date(b.start_date_iso).getTime())
                      .map((event: Event) => (
                        <ModernEventCard key={event.id} eventObject={event} />
                      ))}
                  </div>
                </div>
              ))
            ) : isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 py-0 overflow-hidden rounded-lg border bg-card text-card-foreground">
                    {/* Image and badges area */}
                    <div className="relative h-48 overflow-hidden bg-muted">
                      <Skeleton className="h-full w-full" />
                      {/* Date badge */}
                      <div className="absolute top-4 left-4">
                        <div className="rounded-lg p-2 w-16">
                          <Skeleton className="h-12 w-full" />
                        </div>
                      </div>
                      {/* Event type badge */}
                      <div className="absolute top-4 right-4">
                        <Skeleton className="h-6 w-24 rounded-full" />
                      </div>
                    </div>

                    {/* Content area */}
                    <div className="p-6">
                      {/* Chapter badge and status */}
                      <div className="flex items-start justify-between gap-2 mb-4">
                        <Skeleton className="h-6 w-32 rounded-full" />
                        <Skeleton className="h-6 w-20 rounded-full" />
                      </div>

                      {/* Title */}
                      <div className="space-y-2 mb-4">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-6 w-1/2" />
                      </div>

                      {/* Description */}
                      <div className="space-y-2 mb-6">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                      </div>

                      {/* Event details */}
                      <div className="space-y-2 mb-6">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-4 w-32" />
                      </div>

                      {/* Button */}
                      <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <ClockIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">{t('annualActivitySection.noEvents')}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
