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
import { eventTypeMap  } from "@/entities";
const placeholderImage = "https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2,f_auto,g_center,h_200,q_auto:good,w_200/v1/gcs/platform-data-goog/event_banners/gdev-eccosystems-bevy-chapters-thumbnail_x4z1EBy.png"

export function EventCard( {eventObject}: {eventObject: Event}) {
  const isMobile = useIsMobile();
  const { resolvedTheme } = useTheme();

  const eventTypeColor = isCampusChapter(eventObject.chapter_title) ? 'green' : 'blue';

  return (
    <div className={`flex flex-${isMobile ? 'col' : 'row'} items-center p-8 gap-8 w-full`}>
      {/* 左側 Mock 圓形圖片 */}
      <div className="flex-shrink-0 w-48 h-48 rounded-full flex items-center justify-center overflow-hidden shadow-md">
        <Avatar className="w-full h-full">
          <AvatarImage
            src={eventObject.picture_url ? eventObject.picture_url : placeholderImage}
            alt="Event Logo"
            width={100}
            height={100}
            className="object-cover w-full h-full"
          />
          <AvatarFallback>
            <Image
              src={placeholderImage}
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
              <Link href={eventObject.url} target="_blank">了解更多</Link>
        </Button>
        </div>
    </div>
  );
}