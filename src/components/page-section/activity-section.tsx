'use client';

import { AddToCalendarButton } from 'add-to-calendar-button-react';
import React, { useState, useEffect } from "react";
import {getUpcomingEvents, getPastEvents} from "@/api/bevy";
import { Event } from "@/interfaces";
import { SidebarHeader, SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { CardDescription } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { Card } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";
import { collectEventsByDate, sortEventsByDate } from "@/helper";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile";
import { useTranslation } from 'react-i18next';
import i18n from "@/i18n/config"
import { enUS, zhTW ,zhCN, ja, ko} from "date-fns/locale";
import { useClientOnly } from "@/components/use-client-only";
import { EventCard } from "@/components/event-card";
import { useMemo } from 'react';

export default function ActivitySection() {
  const mounted = useClientOnly();
  const [events, setEvents] = useState<Event[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [eventsByDate, setEventsByDate] = useState<{ [key: string]: Event[] }>({});
  const [dates, setDates] = useState<string[]>([]);
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  // 取得所有活動
  useEffect(() => {
    async function fetchEvents() {
      const upcomingEvents = await getUpcomingEvents();
      const pastEvents = await getPastEvents();
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
    }
    fetchEvents();
  }, []);

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
          <div className="flex justify-center w-full">
            <Calendar
              mode="single"
              onSelect={(day) => handleClickCalendar(day)}
              className="rounded-md"
              month={calendarMonth}
              onMonthChange={setCalendarMonth}
              modifiers={{
                selected: (day) => events.slice(0, -1).some((event) => new Date(event.start_date_iso).toDateString() === day.toDateString()),
              }}
              modifiersClassNames={{
                today: 'text-red-500 border-red-500 rounded-md border-2',
              }}
              onDayClick={(day) => handleClickCalendar(day)}
              locale={calendarLocale[i18n.language as keyof typeof calendarLocale]}
            />
          </div>
        </SidebarHeader>
        <Separator />
        <SidebarContent>
          <SidebarGroup className="px-0 gap-3.5 p-4 justify-center w-full">
            <SidebarGroupContent>
            <Card>
              <CardHeader className="flex flex-col justify-between">
              <CardDescription>{t('activitySection.thisMonthActivities', { month: selectedMonthName })}</CardDescription>
              <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                {eventsInSelectedMonth.length}
              </CardTitle>
              </CardHeader>
            </Card>
            </SidebarGroupContent>
            <SidebarGroupContent>
              <Card>
                <CardHeader className="flex flex-col justify-between">
                  <CardDescription>{t('activitySection.thisWeekActivities')}</CardDescription>
                  <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                    {eventsInThisWeek.length}
                  </CardTitle>
                </CardHeader>
              </Card>
            </SidebarGroupContent>
            <SidebarGroupContent>
              <Card>
                <CardHeader className="flex flex-col justify-between">
                  <CardDescription>{t('activitySection.thisWeekendActivities')}</CardDescription>
                  <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                    {eventsInThisWeekend.length}
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
                  <h1 className="text-2xl font-bold">{dates[currentPage] ? getDateString(dates[currentPage]) : <span>{t('activitySection.pickADate')}</span>}</h1>
                  ) : (
                    <PaginationItem>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline">
                            <CalendarIcon />
                            {dates[currentPage] ?  getDateString(dates[currentPage]) : <span>{t('activitySection.pickADate')}</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            onSelect={(day) => handleClickCalendar(day)}
                            className="rounded-md"
                            month={calendarMonth}
                            onMonthChange={setCalendarMonth}
                            modifiers={{
                              selected: (day) => events.slice(0, -1).some((event) => new Date(event.start_date_iso).toDateString() === day.toDateString()),
                            }}
                            modifiersClassNames={{
                              today: 'text-red-500 border-red-500 rounded-md border-2', 
                            }}
                            onDayClick={(day) => handleClickCalendar(day)}
                            locale={calendarLocale[i18n.language as keyof typeof calendarLocale]}
                          />
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
              {eventsByDate[dates[currentPage]]?.length > 0 ? eventsByDate[dates[currentPage]].map((event:Event  ) => (
                <EventCard key={event.id} eventObject={event} />
              )):null}
              {eventsByDate[dates[currentPage]]?.length === 0 ? (
                <div className="text-center text-lg text-muted-foreground">
                  {t('activitySection.noEvents')}
                </div>
              ):null}
            </div>
          </div>
      </SidebarInset>
      </SidebarProvider>
      </section>
    </div>
  );
}
