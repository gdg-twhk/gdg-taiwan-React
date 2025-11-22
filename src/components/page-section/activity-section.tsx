'use client';

import { AddToCalendarButton } from 'add-to-calendar-button-react';
import React, { useState, useEffect } from "react";
import {getUpcomingEvents, fetchAllPastEvents} from "@/api/bevy";
import { Event } from "@/interfaces";
import { SidebarHeader, SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";
import { collectEventsByDate, sortEventsByDate } from "@/helper";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ChevronsLeft, ChevronsRight } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile";
import { addYears, subYears } from "date-fns";
import { useTranslation } from 'react-i18next';
import i18n from "@/i18n/config"
import { enUS, zhTW ,zhCN, ja, ko} from "date-fns/locale";
import { useClientOnly } from "@/components/use-client-only";
import { EventCard } from "@/components/event-card";
import { useMemo } from 'react';
import { Skeleton } from "@/components/ui/skeleton";

export default function ActivitySection() {
  const mounted = useClientOnly();
  const [events, setEvents] = useState<Event[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [eventsByDate, setEventsByDate] = useState<{ [key: string]: Event[] }>({});
  const [dates, setDates] = useState<string[]>([]);
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  // 取得所有活動
  useEffect(() => {
    async function fetchEvents() {
      setIsLoading(true);
      const upcomingEvents = await getUpcomingEvents();
      const pastEvents = await fetchAllPastEvents();
      const allEvents = [...upcomingEvents, ...pastEvents];
      setEvents(allEvents);
      const eventsByDate = collectEventsByDate(allEvents);
      setEventsByDate(eventsByDate);
      const dates = sortEventsByDate(Object.keys(eventsByDate));
      setTotalPages(dates.length);

      // Find today or nearest upcoming date
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison

      let defaultPageIndex = 0;

      // First, try to find today's date
      const todayIndex = dates.findIndex(date => {
        const eventDate = new Date(date);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate.getTime() === today.getTime();
      });

      if (todayIndex !== -1) {
        defaultPageIndex = todayIndex;
      } else {
        // If today is not found, find the nearest upcoming date
        const upcomingIndex = dates.findIndex(date => {
          const eventDate = new Date(date);
          eventDate.setHours(0, 0, 0, 0);
          return eventDate.getTime() >= today.getTime();
        });

        if (upcomingIndex !== -1) {
          defaultPageIndex = upcomingIndex;
        }
        // If no upcoming dates, defaultPageIndex remains 0 (first event)
      }

      setCurrentPage(defaultPageIndex);
      setDates(dates);
      setIsLoading(false);
    }
    fetchEvents();
  }, []);

  useEffect(() => {
    if (dates[currentPage]) {
      setCalendarMonth(new Date(dates[currentPage]));
    }
  }, [currentPage, dates]);

  const eventsInSelectedMonth = useMemo(() => {
    const selectedMonth = calendarMonth.getMonth();
    const selectedYear = calendarMonth.getFullYear();
    return events.filter(event => {
      const eventDate = new Date(event.start_date_iso);
      return eventDate.getMonth() === selectedMonth && eventDate.getFullYear() === selectedYear;
    });
  }, [events, calendarMonth]);

  const eventsInThisWeek = useMemo(() => {
    const today = new Date();
    const dayOfWeek = today.getDay(); 
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)); 
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    return events.filter(event => {
      const eventDate = new Date(event.start_date_iso);
      return eventDate >= startOfWeek && eventDate <= endOfWeek;
    });
  }, [events]);

  const eventsInThisWeekend = useMemo(() => {
    return eventsInThisWeek.filter(event => {
      const eventDate = new Date(event.start_date_iso);
      const dayOfWeek = eventDate.getDay();
      return dayOfWeek === 6 || dayOfWeek === 0; 
    });
  }, [eventsInThisWeek]);


  const selectedMonthName = useMemo(() => {
    return calendarMonth.toLocaleDateString(i18n.language, { month: 'long' });
  }, [calendarMonth, i18n.language]);

  useEffect(() => {
    i18n.loadNamespaces(['activitySection']);
  }, []);

  const handleClickCalendar = (day?: Date) => {
    if(!day) return;

    const index = dates.findIndex((date) => new Date(date).toDateString() === day.toDateString());
    if (index !== -1) {
      setCurrentPage(index);
    }
  };

  const jumpToToday = () => {
    const today = new Date();
    setCalendarMonth(today);
    
    // Find today's index or nearest upcoming
    const todayIndex = dates.findIndex(date => {
      const eventDate = new Date(date);
      eventDate.setHours(0, 0, 0, 0);
      const todayZero = new Date(today);
      todayZero.setHours(0, 0, 0, 0);
      return eventDate.getTime() === todayZero.getTime();
    });

    if (todayIndex !== -1) {
      setCurrentPage(todayIndex);
    } else {
      // If today is not found, find the nearest upcoming date
      const upcomingIndex = dates.findIndex(date => {
        const eventDate = new Date(date);
        eventDate.setHours(0, 0, 0, 0);
        const todayZero = new Date(today);
        todayZero.setHours(0, 0, 0, 0);
        return eventDate.getTime() >= todayZero.getTime();
      });

      if (upcomingIndex !== -1) {
        setCurrentPage(upcomingIndex);
      }
    }
  };

  const handlePrevYear = () => {
    setCalendarMonth(prev => subYears(prev, 1));
  };

  const handleNextYear = () => {
    setCalendarMonth(prev => addYears(prev, 1));
  };

  const CanlendercustomLabels={
    "close": t('activitySection.calendar.close'),
    "apple": t('activitySection.calendar.apple'),
    "google": t('activitySection.calendar.google'),
    "outlookcom": t('activitySection.calendar.outlookcom'),
    "yahoo": t('activitySection.calendar.yahoo'),
    "ical": t('activitySection.calendar.ical')
  }


  const getDateString = (date: string) => {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return 'Invalid Date'; // 或者返回一個默認值
    }
    const locale = i18n.language.includes('zh') ? 'zh-TW' : i18n.language; // 提供默認的語言標籤
    return parsedDate.toLocaleDateString(locale, { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' });
  }


  const calendarLocale = {
    'zh': zhTW,
    'zh_CN': zhCN,
    'ja': ja,
    'ko': ko,
    'en': enUS,
  }

  if (!mounted) return null;

  return (
    <div>
      <section
        className="w-full px-0 flex flex-col justify-center items-center relative py-16 md:py-24 h-[400px]"
        style={{
          backgroundImage: `url(https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_1200/c_crop,h_650,w_1200,y_0.5_mul_h_sub_0.5_mul_650/c_crop,h_650,w_1200/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/gdev-eccosystems-bevy-chapters-background-blue_rCAKIc6.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          width: "100%",
          margin: 0,
        }}
      >
      <div className="flex flex-col justify-center items-center gap-4">
              <h1 className="text-white text-5xl font-bold">{t('activitySection.title')}</h1>
              <AddToCalendarButton
                  name="Google Developer Group Subscription Service"
                  subscribe={true}
                  startDate="2000-01-01"
                  icsFile="https://calendar.google.com/calendar/ical/c_956fb0210ce3ab577f81bc24e8992f2511b57214638878cb86d3d750b1d91f07%40group.calendar.google.com/public/basic.ics"
                  options="'Apple','Google','Outlook.com','Yahoo','iCal'"
                  label={t('activitySection.calendar.subscribe')}
                  inline
                  listStyle="modal"
                  customLabels={CanlendercustomLabels}
                  lightMode="bodyScheme"
                  iCalFileName="gdg-taiwan-subscript-calender"
              ></AddToCalendarButton>
          </div>
      </section>
      <section className="container mx-auto px-4 py-16 md:py-16">
      <SidebarProvider>
      <Sidebar collapsible="none" className="hidden flex-1 md:flex h-full rounded">
        <SidebarHeader className="gap-3.5 p-4 justify-center">
          <Card>
            <CardHeader className="vertical-align-center">
              <CardTitle>{t('activitySection.calendar.title', 'Activity Calendar')}</CardTitle>
              <CardAction>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={jumpToToday}
                    className="h-7 text-xs"
                  >
                    {t('activitySection.calendar.backToToday')}
                  </Button>
                </div>
              </CardAction>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                onSelect={(day) => handleClickCalendar(day)}
                className="bg-transparent p-0"
                month={calendarMonth}
                onMonthChange={setCalendarMonth}
                modifiers={{
                  selected: (day) => {
                    if (!dates[currentPage]) return false;
                    const currentEventDate = new Date(dates[currentPage]);
                    currentEventDate.setHours(0, 0, 0, 0);
                    const currentDay = new Date(day);
                    currentDay.setHours(0, 0, 0, 0);
                    return currentDay.getTime() === currentEventDate.getTime();
                  },
                  hasEvent: (day) => events.some((event) => {
                    const startDate = new Date(event.start_date_iso);
                    startDate.setHours(0, 0, 0, 0);
                    const endDate = new Date(event.end_date_iso || event.start_date_iso);
                    endDate.setHours(0, 0, 0, 0);
                    const currentDay = new Date(day);
                    currentDay.setHours(0, 0, 0, 0);
                    return currentDay >= startDate && currentDay <= endDate;
                  }),
                }}
                modifiersClassNames={{
                  today: 'text-google-blue border-google-blue rounded-md border-2',
                  hasEvent: 'font-bold text-google-blue decoration-google-blue underline decoration-2 underline-offset-4 hover:bg-google-blue/10 hover:text-google-blue hower:decoration-primary',
                  selected: 'bg-google-blue text-white border-google-blue underline decoration-white hover:bg-google-blue/90 hover:text-white focus:bg-google-blue focus:text-white',
                }}
                onDayClick={(day) => handleClickCalendar(day)}
                locale={calendarLocale[i18n.language as keyof typeof calendarLocale]}
              />
            </CardContent>
          </Card>
        </SidebarHeader>
        <Separator />
        <SidebarContent>
          <SidebarGroup className="px-0 gap-3.5 p-4 justify-center w-full">
            <SidebarGroupContent>
            <Card>
              <CardHeader className="flex flex-col justify-between">
              <CardDescription>{t('activitySection.thisMonthActivities', { month: selectedMonthName })}</CardDescription>
              <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                {isLoading ? 0 : eventsInSelectedMonth.length}
              </CardTitle>
              </CardHeader>
            </Card>
            </SidebarGroupContent>
            <SidebarGroupContent>
              <Card>
                <CardHeader className="flex flex-col justify-between">
                  <CardDescription>{t('activitySection.thisWeekActivities')}</CardDescription>
                  <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                    {isLoading ? 0 : eventsInThisWeek.length}
                  </CardTitle>
                </CardHeader>
              </Card>
            </SidebarGroupContent>
            <SidebarGroupContent>
              <Card>
                <CardHeader className="flex flex-col justify-between">
                  <CardDescription>{t('activitySection.thisWeekendActivities')}</CardDescription>
                  <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                    {isLoading ? 0 : eventsInThisWeekend.length}
                  </CardTitle>
                </CardHeader>
              </Card>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="flex flex-col flex-3 h-full">
          <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4 justify-center">        
          <Pagination className="w-full">
              <PaginationContent className="flex flex-row justify-between w-full">
                  <PaginationItem>
                  {currentPage > 0 ? (
                      <PaginationPrevious onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))} />
                  ) : (
                      <PaginationPrevious isActive={false}/>
                  )}
                  </PaginationItem>
                  {!isMobile ? (
                    isLoading
                      ? <Skeleton className="h-8 w-64 hidden md:block" />
                      : <h1 className="text-2xl font-bold">{dates[currentPage] ? getDateString(dates[currentPage]) : <span>{t('activitySection.pickADate')}</span>}</h1>
                  ) : (
                    <PaginationItem>
                      <Popover>
                        <PopoverTrigger asChild >
                          <Button variant="outline" className="w-48">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {isLoading
                              ? <Skeleton className="h-4 w-full" />
                              : (dates[currentPage] ?  getDateString(dates[currentPage]) : <span>{t('activitySection.pickADate')}</span>)}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 justify-center items-center gap-2">
                          <Calendar
                            mode="single"
                            onSelect={(day) => handleClickCalendar(day)}
                            className="rounded-md"
                            month={calendarMonth}
                            onMonthChange={setCalendarMonth}
                            modifiers={{
                              selected: (day) => {
                                if (!dates[currentPage]) return false;
                                const currentEventDate = new Date(dates[currentPage]);
                                currentEventDate.setHours(0, 0, 0, 0);
                                const currentDay = new Date(day);
                                currentDay.setHours(0, 0, 0, 0);
                                return currentDay.getTime() === currentEventDate.getTime();
                              },
                              hasEvent: (day) => events.some((event) => {
                                const startDate = new Date(event.start_date_iso);
                                startDate.setHours(0, 0, 0, 0);
                                const endDate = new Date(event.end_date_iso || event.start_date_iso);
                                endDate.setHours(0, 0, 0, 0);
                                const currentDay = new Date(day);
                                currentDay.setHours(0, 0, 0, 0);
                                return currentDay >= startDate && currentDay <= endDate;
                              }),
                            }}
                            modifiersClassNames={{
                              today: 'text-google-blue border-google-blue rounded-md border-2',
                              hasEvent: 'font-bold text-google-blue decoration-google-blue underline decoration-2 underline-offset-4 hover:bg-google-blue/10 hover:text-google-blue hower:decoration-primary',
                              selected: 'bg-google-blue text-white border-google-blue underline decoration-white hover:bg-google-blue/90 hover:text-white focus:bg-google-blue focus:text-white',
                            }}
                            onDayClick={(day) => handleClickCalendar(day)}
                            locale={calendarLocale[i18n.language as keyof typeof calendarLocale]}
                          />
                          <div className="flex justify-center mb-2">
                            <Button
                              onClick={jumpToToday}
                              className="h-7 text-xs w-48 p-2 bg-primary text-primary-foreground"
                            >
                              {t('activitySection.calendar.backToToday')}
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </PaginationItem>
                  )}
                  
                  <PaginationItem>
                  {currentPage < totalPages-1 ? (
                      <PaginationNext onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} />
                  ) : (
                      <PaginationNext isActive={false} />
                  )}
                  </PaginationItem>
              </PaginationContent>
          </Pagination>
          </header>
          <div className="gap-4 px-4 py-4 overflow-auto">
          <div className="flex flex-col gap-4 items-center">
              {isLoading ? (
                <>
                  <div className="relative overflow-hidden rounded-3xl shadow-xl w-full mx-auto min-h-[400px]">
                    <Skeleton className="absolute inset-0 w-full h-full" />
                    <div className="relative h-full flex flex-col justify-between p-8">
                      <div className="flex gap-3 flex-wrap mb-10">
                        <Skeleton className="h-6 w-24 rounded-full bg-gray-200 hidden md:block  md:w-full" />
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Skeleton className="h-8 w-3/4 bg-gray-200" />
                          <Skeleton className="h-6 w-1/2 bg-gray-200" />
                        </div>
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-1/3 bg-gray-200" />
                          <Skeleton className="h-4 w-1/2 bg-gray-200" />
                        </div>
                        <Skeleton className="h-4 w-full bg-gray-200" />
                        <Skeleton className="h-4 w-5/6 bg-gray-200" />
                        <div className="pt-2">
                          <Skeleton className="h-12 w-32 rounded-xl bg-gray-200" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-3xl shadow-xl w-full mx-auto min-h-[400px]">
                    <Skeleton className="absolute inset-0 w-full h-full" />
                    <div className="relative h-full flex flex-col justify-between p-8">
                      <div className="flex gap-3 flex-wrap mb-10">
                        <Skeleton className="h-6 w-24 rounded-full bg-gray-200" />
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Skeleton className="h-8 w-3/4 bg-gray-200" />
                          <Skeleton className="h-6 w-1/2 bg-gray-200" />
                        </div>
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-1/3 bg-gray-200" />
                          <Skeleton className="h-4 w-1/2 bg-gray-200" />
                        </div>
                        <Skeleton className="h-4 w-full bg-gray-200" />
                        <Skeleton className="h-4 w-5/6 bg-gray-200" />
                        <div className="pt-2">
                          <Skeleton className="h-12 w-32 rounded-xl bg-gray-200" />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {eventsByDate[dates[currentPage]]?.length > 0 ? (
                    eventsByDate[dates[currentPage]]
                      .sort((a: Event, b: Event) => new Date(a.start_date_iso).getTime() - new Date(b.start_date_iso).getTime())
                      .map((event: Event) => (
                        <EventCard key={event.id} eventObject={event} />
                      ))
                  ) : (
                    <div className="text-center text-lg text-muted-foreground">
                      {t('activitySection.noEvents')}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
      </SidebarInset>
      </SidebarProvider>
      </section>
    </div>
  );
}
