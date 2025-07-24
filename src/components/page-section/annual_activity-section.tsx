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
import { EventCard } from "@/components/event-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useIsMobile } from "@/hooks/use-mobile";
import Link from "next/link";
import { AnnualActivitySectionProps, activityMeta } from "@/entities/anaual_activity/index";
import { useActivityContent } from "@/entities/anaual_activity/useActivityContent";
import Image from "next/image";
import { IconCalendar } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useClientOnly } from "@/components/use-client-only";

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
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const content = useActivityContent();

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

  // 依年份分組
  const eventsByYear = useMemo(
    () => groupEventsByYear(activities),
    [activities]
  );
  const years = useMemo(() => Object.keys(eventsByYear).sort(), [eventsByYear]);

  // 預設選擇最新年份
  useEffect(() => {
    if (years.length > 0) {
      setSelectedYear(years[years.length - 1]);
    }
  }, [years]);

  function StatusList({
    setOpen,
    setSelectedYear,
  }: {
    setOpen: (open: boolean) => void;
    setSelectedYear: (year: string | null) => void;
  }) {
    return (
      <Command>
        <CommandList>
          <CommandEmpty>No events found.</CommandEmpty>
          <CommandGroup>
            {years.map((year) => (
              <CommandItem
                key={year}
                value={year}
                className={`text-center justify-center transition-colors ${
                  selectedYear === year 
                    ? 'bg-google-blue text-white dark:bg-google-blue dark:text-black' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                onSelect={(value: string) => {
                  setSelectedYear(value);
                  setOpen(false);
                }}
              >
                {year}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    );
  }

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
          <div className="col-lg-12 text-left">
            <Image
              src={activityMeta[activity].iconUrl}
              alt="main image"
              width={100}
              height={100}
              style={{ width: isMobile ? "90vw" : "30vw", height: "auto" }}
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
            <div className="col-span-1">
              <CardHeader>
                <CardTitle className="text-2xl font-bold mb-4 text-google-blue">
                  {content[activity].title}
                </CardTitle>
                <CardDescription className="text-lg">
                  {content[activity].description}
                </CardDescription>
                <CardFooter className="flex flex-col gap-4 justify-start items-start px-0 mt-4">
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
      <section className="container mx-auto px-4 py-16 md:py-16 w-full justify-center items-center">
        <h2 className="text-4xl font-bold mb-4 text-center">{t('annualActivitySection.activityList')}</h2>
        <Tabs
          value={selectedYear ?? undefined}
          className="w-full gap-4"
          onValueChange={setSelectedYear}
        >
          {!isMobile && (
            <TabsList className="flex flex-row w-full justify-center items-center relative mb-4 bg-pastel-blue gap-2 ">
              {years.map((year) => (
                <TabsTrigger key={year} value={year} className="custom-tabs-trigger">
                  {year}
                </TabsTrigger>
              ))}
            </TabsList>
          )}
          {isMobile && (
            <div className="flex flex-row w-full justify-center items-center relative mb-4">
              <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-fit-content justify-center w-2/3 text-lg text-center"
                  >
                    {selectedYear ? (
                      <><IconCalendar className="w-4 h-4 mr-2" /> {selectedYear}</>
                    ) : (
                      <> {t('annualActivitySection.selectYear')}</>
                    )}
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerTitle className="text-center">{t('annualActivitySection.selectYear')}</DrawerTitle>
                  <DrawerDescription className="text-center">
                    {t('annualActivitySection.selectYearDescription')}
                  </DrawerDescription>
                  <div className="mt-4 border-t">
                    <StatusList
                      setOpen={setOpen}
                      setSelectedYear={setSelectedYear}
                    />
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          )}
          <div className="relative">
            {years.map((year) => (
              <TabsContent key={year} value={year} className="gap-4">
                <div className="flex flex-col gap-4 w-full">
                  {(eventsByYear[year] || []).map((event) => (
                    <EventCard key={event.id} eventObject={event} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </section>
    </div>
  );
}
