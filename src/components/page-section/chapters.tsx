"use client";

import React, { useEffect, useState } from "react";
import { getChapter } from "@/api/bevy";
import { Chapter } from "@/interfaces";
import Taiwan from "@react-map/taiwan";
import { Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { collectChaptersByCountry, sortCountryList } from "@/helper";
import { svgCountryMap } from "@/entities/chapters";
import { ChapterCard } from "@/components/chapter-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DrawerTrigger } from "@/components/ui/drawer";
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Command } from "@/components/ui/command";
import Image from "next/image";
import { useTranslation } from 'react-i18next';
import { IconLocationBroken, IconMapPin } from "@tabler/icons-react";
import { useClientOnly } from "@/components/use-client-only";

export default function ChaptersSection() {
  const mounted = useClientOnly();
  const [chaptersByCountry, setChaptersByCountry] = useState<{[key: string]: Chapter[]}>({});
  const [sortedCountries, setSortedCountries] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchChapters = async () => {
      const chapters: Chapter[] = await getChapter();
      const chaptersByCountry:{[key: string]: Chapter[]} = collectChaptersByCountry(chapters);
      const sortedCountries = sortCountryList(Object.keys(chaptersByCountry));

      setChaptersByCountry(chaptersByCountry);
      setSortedCountries(sortedCountries);
      setSelectedCountry(sortedCountries[0]);
    };
    fetchChapters();
  }, []);

  useEffect(() => {
    setSelectedCountry(sortedCountries[0]);
  }, [sortedCountries]);

  const handleSelect = (sc: string | null) => {
    if (sc) {
      setSelectedCountry(svgCountryMap[sc as keyof typeof svgCountryMap]);
    }
  };

  function StatusList({
    setOpen,
    setSelectedCountry,
  }: {
    setOpen: (open: boolean) => void;
    setSelectedCountry: (country: string) => void;
  }) {
    return (
      <Command>
        <CommandList>
          <CommandEmpty>{t('chaptersSection.noChaptersFound')}</CommandEmpty>
          <CommandGroup>
            {sortedCountries.map((country) => (
              <CommandItem
                key={country}
                value={country}
                className={`text-center justify-center transition-colors ${
                  selectedCountry === country 
                    ? 'bg-google-red text-white dark:bg-google-red dark:text-black' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                onSelect={(value: string) => {
                  setSelectedCountry(value);
                  setOpen(false);
                }}
              >
                {t('selectedCountryMap.' + country)}
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
          backgroundImage: `url(/GDG23-VideoChatBG-Blue.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          width: "100%",
          margin: 0,
        }}
      >
      <div className="flex flex-col justify-center items-center gap-4">
          <h1 className="text-white text-5xl font-bold">{t('chaptersSection.title')}</h1>
        </div>
      </section>
      <section className="container mx-auto px-4 md:py-16 gap-4">
        <SidebarProvider className="flex flex-row flex-3 w-fit h-fit w-full gap-4">
          <Sidebar collapsible="none" className="flex w-full flex-col flex-1 hidden md:flex rounded justify-center items-center gap-8 text-card-foreground rounded-xl">
            <h1 className="text-2xl font-bold mt-4">{t('chaptersSection.selectCity')}</h1>
            <Taiwan 
              onSelect={handleSelect} 
              size={400} 
              mapColor="var(--color-off-white)"
              hoverColor="var(--color-pastel-red)" 
              strokeColor="var(--color-black-02)"
              selectColor="var(--color-google-red)"
              hints={true}
              type="select-single" />
          </Sidebar>
          <SidebarInset className="flex flex-col flex-2 w-full">
            <div className="flex flex-col flex-2 w-full">
              <div key={selectedCountry}>
                <Card className="w-full">
                  <CardHeader className="flex flex-row justify-between text-center">
                    <CardTitle className="text-center w-full" style={{textAlign: "center"}}>
                      {isMobile ? (
                        <div className="flex flex-row w-full justify-center items-center relative z-10 mb-4 bg-card">
                          <Drawer open={open} onOpenChange={setOpen}>
                            <DrawerTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-fit-content justify-start text-xl"
                              >
                                {selectedCountry ? (
                                  <><IconMapPin className="w-5 h-5 mr-2" /> {t('selectedCountryMap.' + selectedCountry)}</>
                                ) : (
                                  <>{t('chaptersSection.noContentYet')}</>
                                )}
                              </Button>
                            </DrawerTrigger>
                            <DrawerContent>
                              <DrawerTitle className="text-center">{t('chaptersSection.selectCity')}</DrawerTitle>
                              <DrawerDescription className="text-center">
                                {t('chaptersSection.selectCityDescription')}
                              </DrawerDescription>
                              <div className="mt-4 border-t text-center">
                                <StatusList
                                  setOpen={setOpen}
                                  setSelectedCountry={setSelectedCountry}
                                />
                              </div>
                            </DrawerContent>
                          </Drawer>
                        </div>
                      ) : (
                        <h1 className="text-center text-4xl font-bold ">{`${t('selectedCountryMap.' + selectedCountry)}`}</h1>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {chaptersByCountry[selectedCountry]
                      ? chaptersByCountry[selectedCountry].map((chapter) => (
                          <ChapterCard key={chapter.id} chapter={chapter} />
                        ))
                      : (
                        <Card className="row-span-3 w-full col-span-4 justify-center items-center bg-transparent">
                          <Image src="/dinosaur.gif" alt="404 not found" width={100} height={100} className="w-1/2 h-auto" />
                          <CardContent className="flex flex-col justify-center items-center">
                            <h1 className="text-center text-2xl font-bold">{t('chaptersSection.noLocation')}</h1>
                          </CardContent>
                        </Card>
                      )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </section>
    </div>
  );
}
