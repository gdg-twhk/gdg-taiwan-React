"use client"

import { Badge } from "@/components/ui/badge"
import { chapterNameMap } from "@/entities"
import { IconSchool } from "@tabler/icons-react"
import {isCampusChapter, chapterNameFilter} from "@/helper"
import { useTranslation } from "react-i18next";

export function ChapterBadge({ chapter }: { chapter: string }) {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const chapterName = currentLanguage.includes('zh')
      ? chapterNameMap[chapterNameFilter(chapter) as keyof typeof chapterNameMap]
      : chapterNameFilter(chapter);

  return (
    <Badge className={isCampusChapter(chapter) ? 'bg-google-green' : 'bg-google-blue'}>
      
      {isCampusChapter(chapter)?<IconSchool className="w-4 h-4" />:null}
      {isCampusChapter(chapter)? `GDG ${chapterName}` :chapter}
    </Badge>
  );
}