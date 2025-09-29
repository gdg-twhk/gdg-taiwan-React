"use client";

import Image from "next/image";
import { Event } from "@/interfaces";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChapterBadge } from "@/components/chapter-badge";
import Link from "next/link";
import {isCampusChapter} from "@/helper/index"
import { useTranslation } from "react-i18next";
import { defaultImage } from "@/entities/common_pic";
import { MapPinIcon, ClockIcon } from "lucide-react";

export function EventCard( {eventObject}: {eventObject: Event}) {
  const isMobile = useIsMobile();
  const { t, i18n } = useTranslation();

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

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString(i18n.language, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className={`relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 group cursor-pointer min-h-[400px] w-full mx-auto`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={eventObject.cropped_banner_url || defaultImage}
          alt="Event Background"
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {/* Gradient Overlay - stronger to reduce background noise */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/40"></div>
        {/* Additional blur overlay for text areas */}
        <div className="absolute inset-0 backdrop-blur-[1px]"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-8 text-white">
        {/* Top Section - Badges */}
        <div className="flex gap-3 flex-wrap mb-10">
          <ChapterBadge chapter={eventObject.chapter_title} />
        </div>

        {/* Bottom Section - Main Content */}
        <div className="space-y-4">
          {/* Title and Type */}
          <div className="space-y-2">
            <h1 className={`font-bold leading-tight text-white ${isMobile ? 'text-2xl' : 'text-3xl'}`}>
              {eventObject.title}
            </h1>
            <h2 className={`text-lg font-semibold text-google-${eventTypeColor}-900 opacity-90`}>
            {eventTypeMap[eventObject.event_type_title as keyof typeof eventTypeMap] || eventObject.event_type_title}
            </h2>
          </div>

          {/* Event Details */}
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-sm text-white/90">
              <ClockIcon className="w-4 h-4 flex-shrink-0" />
              <span className="font-medium">
              {formatTime(eventObject.start_date_iso)} ~ {formatTime(eventObject.end_date_iso)}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm text-white/90">
              <MapPinIcon className="w-4 h-4 flex-shrink-0" />
              <span className="font-medium truncate">{audienceTypeMap[eventObject.audience_type as keyof typeof audienceTypeMap]}{ eventObject.venue_name ? " · " + eventObject.venue_name : ''}</span>
            </div>
          
          </div>

          {/* Description */}
          <p className={`text-white/80 leading-relaxed ${isMobile ? 'text-sm' : 'text-base'}`}>
            {eventObject.description_short}
          </p>

          {/* Action Button */}
          <div className="pt-2">
            <Button
              asChild
              className={`bg-white/90 hover:bg-white text-black font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm ${isMobile ? 'w-full' : ''}`}
            >
              <Link href={eventObject.url} target="_blank">
                {t('eventCard.learnMore')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}