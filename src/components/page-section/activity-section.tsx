'use client';

import { AddToCalendarButton } from 'add-to-calendar-button-react';
import React, { useState, useEffect } from "react";
import {getUpcomingEvents} from "@/api/bevy";
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
import { EventCard } from "@/components/event-card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile";
import { useTranslation } from 'react-i18next';
import i18n from "@/i18n/config"
import { enUS, zhTW ,zhCN, ja, ko} from "date-fns/locale";
import { useClientOnly } from "@/components/use-client-only";

export default function ActivitySection() {
  const mounted = useClientOnly();
  const [events, setEvents] = useState<Event[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [eventsByDate, setEventsByDate] = useState<{ [key: string]: Event[] }>({});
  const [dates, setDates] = useState<string[]>([]);
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  // 取得所有活動
  useEffect(() => {
    async function fetchEvents() {
      const events = await getUpcomingEvents();
      setEvents(events || []);
      const eventsByDate = collectEventsByDate(events);
      setEventsByDate(eventsByDate);
      const dates = sortEventsByDate(Object.keys(eventsByDate));
      setTotalPages(dates.length);
      setCurrentPage(0);
      setDates(dates);
    }
    fetchEvents();
  }, []);

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
              <CardDescription>{t('activitySection.recentActivities')}</CardDescription>
              <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                {events.length}
              </CardTitle>
              </CardHeader>
            </Card>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="flex flex-col flex-3 h-full">
          <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4 justify-center">
          {isMobile ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <CalendarIcon />
                  {dates[currentPage] ?  getDateString(dates[currentPage]) : <span>Pick a date</span>} 
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  onSelect={(day) => handleClickCalendar(day)}
                  className="rounded-md"
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
          ) : (   
          
          <Pagination className="w-full">
              <PaginationContent className="flex flex-row justify-between w-full">
                  <PaginationItem>
                  {currentPage > 0 ? (
                      <PaginationPrevious onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))} />
                  ) : (
                      <PaginationPrevious isActive={false}/>
                  )}
                  </PaginationItem>
                  <h1 className="text-2xl font-bold">{dates[currentPage] ? getDateString(dates[currentPage]) : <span>Pick a date</span>}</h1>
                  
                  <PaginationItem>
                  {currentPage < totalPages ? (
                      <PaginationNext onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} />
                  ) : (
                      <PaginationNext isActive={false} />
                  )}
                  </PaginationItem>
              </PaginationContent>
          </Pagination>
          )}
          </header>
          <div className="gap-4 px-4 py-4 overflow-auto">
            <div className="flex flex-col gap-4 items-center">              
              {eventsByDate[dates[currentPage]]?eventsByDate[dates[currentPage]].map((event:Event  ) => (
                <EventCard key={event.id} eventObject={event} />
              )):null}
            </div>
          </div>
      </SidebarInset>
      </SidebarProvider>
      </section>
    </div>
  );
}
