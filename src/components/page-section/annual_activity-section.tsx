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
import { IconSchool, IconX, IconEye, IconCalendar, IconMapPin, IconTag, IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useClientOnly } from "@/components/use-client-only";
import { ModernEventCard } from "../modern-event-card";
import { isCampusChapter, getCountyFromChapterName, sortCountryList } from "@/helper/index";
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
interface FilterState {
  year: string | null; // 'all' | specific year string
  cities: string[];
  eventTypes: string[];
  audienceTypes: string[];
  showCampusOnly: boolean;
}

interface MobileFilterExpanded {
  year: boolean;
  cities: boolean;
  eventTypes: boolean;
  audienceTypes: boolean;
}



function filterEvents(events: Event[], filters: FilterState): Event[] {
  return events.filter(event => {
    // Year filter
    if (filters.year && filters.year !== 'all') {
      const eventYear = event.start_date_iso
        ? new Date(event.start_date_iso).getFullYear().toString()
        : "未知";
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
  const [mobileExpanded, setMobileExpanded] = useState<MobileFilterExpanded>({
    year: false,
    cities: false,
    eventTypes: false,
    audienceTypes: false,
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
        : "未知";
    }))].sort((a, b) => b.localeCompare(a)); // Sort in descending order (newest first)

    return { cities, eventTypes, audienceTypes, years };
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
        {/* Mobile Filter Interface */}
        <div className="md:hidden  px-4">
          <div className="bg-white rounded-lg border p-4 mb-4 space-y-3">
            {/* Year Filter */}
            <div>
              <button
                onClick={() => setMobileExpanded(prev => ({ ...prev, year: !prev.year }))}
                className="w-full flex items-center justify-between bg-gray-100 rounded-lg px-3 py-2 text-sm"
              >
                <div className="flex items-center gap-2">
                  <IconCalendar className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-700">
                    {filters.year === 'all' ? t('annualActivitySection.allYears') : filters.year}
                  </span>
                </div>
                {mobileExpanded.year ? <IconChevronUp className="w-4 h-4" /> : <IconChevronDown className="w-4 h-4" />}
              </button>
              {mobileExpanded.year && (
                <div className="mt-2 space-y-2 pl-4">
                  <label className="flex items-center space-x-2">
                    <Checkbox
                      checked={filters.year === 'all'}
                      onCheckedChange={() => setFilters(prev => ({ ...prev, year: 'all' }))}
                    />
                    <span className="text-sm">{t('annualActivitySection.allYears')}</span>
                  </label>
                  {availableOptions.years.map((year) => (
                    <label key={year} className="flex items-center space-x-2">
                      <Checkbox
                        checked={filters.year === year}
                        onCheckedChange={() => setFilters(prev => ({ ...prev, year }))}
                      />
                      <span className="text-sm">{year}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Cities Filter */}
            <div>
              <button
                onClick={() => setMobileExpanded(prev => ({ ...prev, cities: !prev.cities }))}
                className="w-full flex items-center justify-between bg-gray-100 rounded-lg px-3 py-2 text-sm"
              >
                <div className="flex items-center gap-2">
                  <IconMapPin className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-700">
                    {filters.cities.length === 0
                      ? t('annualActivitySection.allCities')
                      : filters.cities.length === 1
                        ? t('selectedCountryMap.' + filters.cities[0])
                        : `${filters.cities.length} 個城市`
                    }
                  </span>
                </div>
                {mobileExpanded.cities ? <IconChevronUp className="w-4 h-4" /> : <IconChevronDown className="w-4 h-4" />}
              </button>
              {mobileExpanded.cities && (
                <div className="mt-2 space-y-2 pl-4">
                  <label className="flex items-center space-x-2">
                    <Checkbox
                      checked={filters.cities.length === 0}
                      onCheckedChange={() => setFilters(prev => ({ ...prev, cities: [] }))}
                    />
                    <span className="text-sm">{t('annualActivitySection.allCities')}</span>
                  </label>
                  {availableOptions.cities.map((city) => (
                    <label key={city} className="flex items-center space-x-2">
                      <Checkbox
                        checked={filters.cities.includes(city)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFilters(prev => ({ ...prev, cities: [...prev.cities, city] }));
                          } else {
                            setFilters(prev => ({ ...prev, cities: prev.cities.filter(c => c !== city) }));
                          }
                        }}
                      />
                      <span className="text-sm">{t('selectedCountryMap.' + city)}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Event Types Filter */}
            <div>
              <button
                onClick={() => setMobileExpanded(prev => ({ ...prev, eventTypes: !prev.eventTypes }))}
                className="w-full flex items-center justify-between bg-gray-100 rounded-lg px-3 py-2 text-sm"
              >
                <div className="flex items-center gap-2">
                  <IconTag className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-700">
                    {filters.eventTypes.length === 0
                      ? t('annualActivitySection.allEventTypes')
                      : filters.eventTypes.length === 1
                        ? (eventTypeMap[filters.eventTypes[0] as keyof typeof eventTypeMap] || filters.eventTypes[0])
                        : `${filters.eventTypes.length} 個類型`
                    }
                  </span>
                </div>
                {mobileExpanded.eventTypes ? <IconChevronUp className="w-4 h-4" /> : <IconChevronDown className="w-4 h-4" />}
              </button>
              {mobileExpanded.eventTypes && (
                <div className="mt-2 space-y-2 pl-4">
                  <label className="flex items-center space-x-2">
                    <Checkbox
                      checked={filters.eventTypes.length === 0}
                      onCheckedChange={() => setFilters(prev => ({ ...prev, eventTypes: [] }))}
                    />
                    <span className="text-sm">{t('annualActivitySection.allEventTypes')}</span>
                  </label>
                  {availableOptions.eventTypes.map((type) => (
                    <label key={type} className="flex items-center space-x-2">
                      <Checkbox
                        checked={filters.eventTypes.includes(type)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFilters(prev => ({ ...prev, eventTypes: [...prev.eventTypes, type] }));
                          } else {
                            setFilters(prev => ({ ...prev, eventTypes: prev.eventTypes.filter(t => t !== type) }));
                          }
                        }}
                      />
                      <span className="text-sm">{eventTypeMap[type as keyof typeof eventTypeMap] || type}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Audience Types Filter */}
            <div>
              <button
                onClick={() => setMobileExpanded(prev => ({ ...prev, audienceTypes: !prev.audienceTypes }))}
                className="w-full flex items-center justify-between bg-gray-100 rounded-lg px-3 py-2 text-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="text-gray-700">
                    {filters.audienceTypes.length === 0
                      ? t('annualActivitySection.allAudienceTypes')
                      : filters.audienceTypes.length === 1
                        ? (audienceTypeMap[filters.audienceTypes[0] as keyof typeof audienceTypeMap] || filters.audienceTypes[0])
                        : `${filters.audienceTypes.length} 個參與方式`
                    }
                  </span>
                </div>
                {mobileExpanded.audienceTypes ? <IconChevronUp className="w-4 h-4" /> : <IconChevronDown className="w-4 h-4" />}
              </button>
              {mobileExpanded.audienceTypes && (
                <div className="mt-2 space-y-2 pl-4">
                  <label className="flex items-center space-x-2">
                    <Checkbox
                      checked={filters.audienceTypes.length === 0}
                      onCheckedChange={() => setFilters(prev => ({ ...prev, audienceTypes: [] }))}
                    />
                    <span className="text-sm">{t('annualActivitySection.allAudienceTypes')}</span>
                  </label>
                  {availableOptions.audienceTypes.map((type) => (
                    <label key={type} className="flex items-center space-x-2">
                      <Checkbox
                        checked={filters.audienceTypes.includes(type)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFilters(prev => ({ ...prev, audienceTypes: [...prev.audienceTypes, type] }));
                          } else {
                            setFilters(prev => ({ ...prev, audienceTypes: prev.audienceTypes.filter(t => t !== type) }));
                          }
                        }}
                      />
                      <span className="text-sm">{audienceTypeMap[type as keyof typeof audienceTypeMap] || type}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Campus Toggle */}
            <div className="flex items-center justify-between bg-gray-100 rounded-lg px-3 py-2">
              <div className="flex items-center gap-2">
                <IconSchool className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">校園活動</span>
              </div>
              <Switch
                checked={filters.showCampusOnly}
                onCheckedChange={(checked: boolean) => setFilters(prev => ({ ...prev, showCampusOnly: checked }))}
                className={`${filters.showCampusOnly ? "bg-google-green" : "bg-gray-400"}`}
              />
            </div>

            {/* Clear All Button */}
            {(filters.year !== 'all' || filters.cities.length > 0 || filters.eventTypes.length > 0 || filters.audienceTypes.length > 0 || filters.showCampusOnly) && (
              <button
                onClick={() => {
                  setFilters({ year: 'all', cities: [], eventTypes: [], audienceTypes: [], showCampusOnly: false });
                  setMobileExpanded({ year: false, cities: false, eventTypes: false, audienceTypes: false });
                }}
                className="w-full flex items-center justify-center gap-2 text-red-600 bg-red-50 rounded-lg px-3 py-2 text-sm hover:bg-red-100 transition-colors"
              >
                <IconX className="w-4 h-4" />
                <span>清除全部</span>
              </button>
            )}

            {/* Results Count */}
            <div className="flex items-center gap-2 text-sm text-gray-600 pt-3 border-t">
              <IconEye className="w-4 h-4" />
              <span>{t('annualActivitySection.showingResults', { count: displayEvents.length })}</span>
            </div>
          </div>
        </div>

        {/* Desktop Filter Interface */}
        <div className="hidden md:flex flex-col bg-card rounded-lg border-2 p-4">
          {/* 年份篩選列 */}
          <div className="card bg-card p-4 overflow-x-auto">
            <div className="flex gap-2 items-center min-w-max">
              <Button
                variant={filters.year === 'all' ? "default" : "outline"}
                size="sm"
                onClick={() => setFilters(prev => ({ ...prev, year: 'all' }))}
                className="h-10 px-4 rounded-full flex-shrink-0"
              >
                {t('annualActivitySection.allYears')}
              </Button>
              <Separator orientation="vertical" className="!h-6 bg-gray-300" />
              {availableOptions.years.map((year) => (
                <Button
                  key={year}
                  variant={filters.year === year ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilters(prev => ({ ...prev, year }))}
                  className="h-10 px-4 rounded-full flex-shrink-0"
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
                className="h-10 px-4 rounded-full flex-shrink-0"
              >
                {t('annualActivitySection.allCities')}
              </Button>
              <Separator orientation="vertical" className="!h-6 bg-border" />
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
                  className="h-10 px-4 rounded-full flex-shrink-0"
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
                className="h-10 px-4 rounded-full flex-shrink-0"
              >
                {t('annualActivitySection.allEventTypes')}
              </Button>
              <Separator orientation="vertical" className="!h-6" />
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
                  className="h-10 px-4 rounded-full flex-shrink-0"
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
                className="h-10 px-4 rounded-full flex-shrink-0"
              >
                {t('annualActivitySection.allAudienceTypes')}
              </Button>
              <Separator orientation="vertical" className="!h-6" />
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
                  className="h-10 px-4 rounded-full flex-shrink-0"
                >
                  {audienceTypeMap[type as keyof typeof audienceTypeMap] || type}
                </Button>
              ))}
              <Separator orientation="vertical" className="!h-6"/>
              <div className="flex items-center gap-3 px-4 py-2 h-10 bg-white border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow w-fit">
                <IconSchool className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
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
          <div className="flex flex-wrap gap-3 items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <IconEye className="w-4 h-4" />
              <span>{t('annualActivitySection.showingResults', { count: displayEvents.length })}</span>
            </div>

            {(filters.year !== 'all' || filters.cities.length > 0 || filters.eventTypes.length > 0 || filters.audienceTypes.length > 0 || filters.showCampusOnly) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFilters({ year: 'all', cities: [], eventTypes: [], audienceTypes: [], showCampusOnly: false })}
                className="h-8 px-3 text-red-600 hover:text-red-500 hover:bg-red-50"
              >
                <IconX className="w-4 h-4 mr-1" />
                {t('annualActivitySection.clearFilters')}
              </Button>
            )}
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
