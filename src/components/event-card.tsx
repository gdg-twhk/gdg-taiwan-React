"use client";

import Image from "next/image";
import { Event } from "@/interfaces";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChapterBadge } from "@/components/chapter-badge";
import { AudienceTypeBadge } from "@/components/audience-type-badge";
import Link from "next/link";
import { useTheme } from "next-themes";
import {isCampusChapter} from "@/helper/index"
import { useTranslation } from "react-i18next";
import { defaultImage } from "@/entities/common_pic";

export function EventCard( {eventObject}: {eventObject: Event}) {
  const isMobile = useIsMobile();
  const { resolvedTheme } = useTheme();
  const { t } = useTranslation();

  const eventTypeColor = isCampusChapter(eventObject.chapter_title) ? 'green' : 'blue';

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

  return (
    <div className={`flex flex-${isMobile ? 'col' : 'row'} items-center p-8 gap-8 w-full`}>
      {/* 左側 Mock 圓形圖片 */}
      <div className="flex-shrink-0 w-48 h-48 rounded-full flex items-center justify-center overflow-hidden shadow-md">
        <Avatar className="w-full h-full">
          <AvatarImage
            src={eventObject.picture_url ? eventObject.picture_url : defaultImage}
            alt="Event Logo"
            width={100}
            height={100}
            className="object-cover w-full h-full"
          />
          <AvatarFallback>
            <Image
              src={defaultImage}
              alt="Event Logo"
              width={100}
              height={100}
              className="object-cover w-full h-full"
            />
          </AvatarFallback>
        </Avatar>
      </div>
      {/* 右側內容 */}
      <div className="flex-1">
        <div className="flex gap-2 mb-2">
          <ChapterBadge chapter={eventObject.chapter_title} />
          <AudienceTypeBadge audienceType={eventObject.audience_type} />
        </div>
        <h1 className="text-4xl font-bold mb-2">{eventObject.title}</h1>
        <h3 className={`font-medium text-base mb-2 inline-block text-google-${eventTypeColor}`}>{eventTypeMap[eventObject.event_type_title as keyof typeof eventTypeMap] || eventObject.event_type_title}</h3>
        <p className="text-lg mb-6">
          {eventObject.description_short}
        </p>
        <Button className={`bg-google-${eventTypeColor} dark:bg-google-${eventTypeColor} border ${resolvedTheme === 'dark' ? 'border-white' : 'border-dark'} border-3 rounded-lg text-xl font-medium text-black hover:bg-halftone-${eventTypeColor} dark:hover:bg-halftone-${eventTypeColor} hover:text-black hover:border-black`}>
              <Link href={eventObject.url} target="_blank">{t('eventCard.learnMore')}</Link>
        </Button>
        </div>
    </div>
  );
}