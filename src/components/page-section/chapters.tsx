"use client";

import React, { useEffect, useState } from "react";
import { getChapters } from "@/api/bevy";
import { Chapter } from "@/interfaces";
import Taiwan from "@react-map/taiwan";
import { Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { collectChaptersByCountry, sortCountryList } from "@/helper";
import { svgCountryMap } from "@/entities/chapters";
import { ChapterCard } from "@/components/chapter-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";
import { useTranslation } from 'react-i18next';
import { useClientOnly } from "@/components/use-client-only";
import { QRCodeDialog } from "@/components/qr-code-dialog";
import { MobileChapterSection } from "@/components/mobile-chapter-section";
import { Skeleton } from "@/components/ui/skeleton";

export default function ChaptersSection() {
  const mounted = useClientOnly();
  const [isLoading, setIsLoading] = useState(true);
  const [chaptersByCountry, setChaptersByCountry] = useState<{[key: string]: Chapter[]}>({});
  const [sortedCountries, setSortedCountries] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchChapters = async () => {
      setIsLoading(true);
      try {
        const chapters: Chapter[] = await getChapters();
        const chaptersByCountry:{[key: string]: Chapter[]} = collectChaptersByCountry(chapters);
        const sortedCountries = sortCountryList(Object.keys(chaptersByCountry));

        setChaptersByCountry(chaptersByCountry);
        setSortedCountries(sortedCountries);
        setSelectedCountry(sortedCountries[0]);
      } catch (error) {
        console.error('Error fetching chapters:', error);
      } finally {
        setIsLoading(false);
      }
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

  const handleChapterImageClick = (chapter: Chapter) => {
    setSelectedChapter(chapter);
    setQrDialogOpen(true);
  };

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
            {isLoading ? (
              <div className="w-[400px] h-[400px] relative">
                <Skeleton className="absolute inset-0 w-full h-full" />
              </div>
            ) : (
              <Taiwan 
                onSelect={handleSelect} 
                size={400} 
                mapColor="var(--color-off-white)"
                hoverColor="var(--color-pastel-red)" 
                strokeColor="var(--color-black-02)"
                selectColor="var(--color-google-red)"
                hints={true}
                type="select-single" />
            )}
          </Sidebar>
          <SidebarInset className="flex flex-col flex-2 w-full">
            <div className="flex flex-col flex-2 w-full">
              <div key={selectedCountry}>
                <Card className="w-full">
                  <CardHeader className="flex flex-row">
                    <CardTitle className="text-center w-full flex items-center justify-center" style={{textAlign: "center"}}>
                      {isMobile ? (
                          <MobileChapterSection
                            open={open}
                            setOpen={setOpen}
                            selectedCountry={selectedCountry}
                            setSelectedCountry={setSelectedCountry}
                            sortedCountries={sortedCountries}
                            isLoading={isLoading}
                          />
                      ) : (
                        isLoading ? <Skeleton className="h-8 w-1/3" /> : <h1 className="text-center text-4xl font-bold flex items-center justify-center">{`${t('selectedCountryMap.' + selectedCountry)}`}</h1>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {isLoading ? (
                      <>
                        {Array.from({ length: 7 }).map((_, i) => (
                          <div key={i} className="relative overflow-hidden rounded-xl w-full ">
                            <div className="relative h-full flex flex-col p-6 gap-4 items-center justify-center">
                              <Skeleton className="w-32 h-32 rounded-full" />
                              <Skeleton className="h-6 w-3/4" />
                              <Skeleton className="h-8 w-1/2" />
                            </div>
                          </div>
                        ))}
                      </>
                    ) : chaptersByCountry[selectedCountry] ? (
                      chaptersByCountry[selectedCountry].map((chapter) => (
                        <ChapterCard key={chapter.id} chapter={chapter} onImageClick={handleChapterImageClick} />
                      ))
                    ) : (
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
      {selectedChapter && (
        <QRCodeDialog
          open={qrDialogOpen}
          onOpenChange={setQrDialogOpen}
          url={selectedChapter.url}
          chapterName={selectedChapter.title}
        />
      )}
    </div>
  );
}
