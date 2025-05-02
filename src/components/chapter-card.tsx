import { Chapter } from "@/interfaces";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import { isCampusChapter, schoolNameFinder } from "@/helper";
import Image from "next/image";
import Link from "next/link";
import { chapterNameMap } from "@/entities";

const placeholderImage = "https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2,f_auto,g_center,h_200,q_auto:good,w_200/v1/gcs/platform-data-goog/event_banners/gdev-eccosystems-bevy-chapters-thumbnail_x4z1EBy.png"


export function ChapterCard({chapter}: {chapter: Chapter}) {
    
    const eventTypeColor = isCampusChapter(chapter.title) ? 'green' : 'blue';

    
    return (
        <div className={`flex flex-col items-center p-8 gap-4 w-full items-center justify-center`}>
        <div className="flex-shrink-0 w-32 h-32 rounded-full flex items-center justify-center overflow-hidden shadow-md">
          <Avatar className="w-full h-full">
            <AvatarImage
              src={chapter.logo ? chapter.logo : placeholderImage}
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
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-xl font-bold mb-2">{chapterNameMap[schoolNameFinder(chapter.title) as keyof typeof chapterNameMap] ?? schoolNameFinder(chapter.title)}
          </h1>
          <Button className={`bg-google-${eventTypeColor} dark:bg-google-${eventTypeColor} border border-3 rounded-lg text-xl font-medium text-black hover:bg-halftone-${eventTypeColor} dark:hover:bg-halftone-${eventTypeColor} hover:text-black hover:border-black`}>
                <Link href={chapter.url} target="_blank">找到我們</Link>
          </Button>
          </div>
      </div>
    )
}