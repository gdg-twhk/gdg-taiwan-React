"use client";

import Image from "next/image";
import { Event } from "@/interfaces";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPinIcon, ClockIcon, UsersIcon, ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import { isCampusChapter } from "@/helper/index";
import { useTranslation } from "react-i18next";
import { defaultImage } from "@/entities/common_pic";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChapterBadge } from "@/components/chapter-badge";

export function ModernEventCard({ eventObject }: { eventObject: Event }) {
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
    "Google Hosted Summit": t('eventTypeMap.GoogleHostedSummit')
  };

  const audienceTypeMap = {
    "Virtual": t('audienceTypeMap.Virtual'),
    "In-person": t('audienceTypeMap.In-person'),
    "Hybrid": t('audienceTypeMap.Hybrid')
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString(i18n.language, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getEventTypeVariant = () => {
    return eventTypeColor === 'green' ? 'secondary' : 'default';
  };

  const getAudienceTypeVariant = () => {
    switch (eventObject.audience_type.toLowerCase()) {
      case 'public':
        return 'outline';
      case 'members':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 py-0 overflow-hidden max-w-md ${isMobile ? 'w-full' : ''} flex flex-col`}>
      {/* Event Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={eventObject.banner.url || defaultImage}
          alt={eventObject.title}
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Date Badge */}
        <div className="absolute top-4 left-4">
          <div className={`bg-google-blue/90 rounded-lg p-2 text-center shadow-sm`}>
            <div className="text-xs font-medium text-white">
              {new Date(eventObject.start_date_iso).toLocaleDateString(i18n.language, { month: 'short' }).toUpperCase()}
            </div>
            <div className="text-lg font-bold text-foreground">
              {new Date(eventObject.start_date_iso).getDate()}
            </div>
          </div>
        </div>

        {/* Event Type Badge */}
        <div className="absolute top-4 right-4">
          <Badge variant={getEventTypeVariant()} className="bg-google-blue/90">
            {eventTypeMap[eventObject.event_type_title as keyof typeof eventTypeMap] || eventObject.event_type_title}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 mb-2">
        <ChapterBadge chapter={eventObject.chapter_title} />
          <Badge variant={getAudienceTypeVariant()} className="text-xs">
            <UsersIcon className="w-3 h-3" />
            {audienceTypeMap[eventObject.audience_type as keyof typeof audienceTypeMap]}
          </Badge>
        </div>

        <CardTitle className="text-xl leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          {eventObject.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0 pb-4">
        <CardDescription className="text-sm mb-4">
          {eventObject.description_short}
        </CardDescription>

        {/* Event Details */}
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <ClockIcon className="w-4 h-4 flex-shrink-0" />
            <span>{formatTime(eventObject.start_date_iso)} ~ {formatTime(eventObject.end_date_iso)}</span>
          </div>

          {eventObject.venue_name && (
            <div className="flex items-center gap-2">
              <MapPinIcon className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{eventObject.venue_name}</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-0 pb-4 mt-auto">
        <Button
          asChild
          className={`w-full bg-google-${eventTypeColor} dark:bg-google-${eventTypeColor} hover:bg-halftone-${eventTypeColor} dark:hover:bg-halftone-${eventTypeColor} text-black hover:text-black group`}
        >
          <Link href={eventObject.url} target="_blank" className="flex items-center gap-2">
            {t('eventCard.learnMore')}
            <ExternalLinkIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}