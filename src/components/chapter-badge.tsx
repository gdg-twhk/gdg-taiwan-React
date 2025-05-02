import { Badge } from "@/components/ui/badge"
import { chapterNameMap } from "@/entities"
import { IconSchool } from "@tabler/icons-react"
import {isCampusChapter, schoolNameFinder} from "@/helper"


export function ChapterBadge({ chapter }: { chapter: string }) {
  return (
    <Badge className={isCampusChapter(chapter) ? 'bg-google-green' : 'bg-google-blue'}>
      
      {isCampusChapter(chapter)?<IconSchool className="w-4 h-4" />:null}
      {chapterNameMap[schoolNameFinder(chapter) as keyof typeof chapterNameMap] ?? schoolNameFinder(chapter)}
    </Badge>
  );
}