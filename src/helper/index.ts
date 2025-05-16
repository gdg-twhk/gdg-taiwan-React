import { chapterNameMap,chapterCountyMapping, citiesList } from "@/entities/";

import { Event, Chapter } from "@/interfaces";

export const isCampusChapter = (name: string) =>{
    return name.indexOf(' on Campus')!==-1
}

export const chapterNameFilter = (name: string) =>{

  if(!isCampusChapter(name)){
    return name
  }
    const parts = name.split(' - ');

    const universityPart = parts[0].split(' on Campus');
  
    return universityPart[1].trim();
}


export const collectEventsByDate = (events: Event[]) : { [key: string]: Event[] }=>  {
  const eventsByDate: { [key: string]: Event[] } = events.reduce((acc: { [key: string]: Event[] }, event) => {
    const date = new Date(event.start_date_iso).toISOString().split('T')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(event);
    return acc;
  }, {});
  return eventsByDate;
};

export const sortEventsByDate = (events: string[]) => {
  return events.sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime();
  });
};


export const getChapterByCity = (chapters: Chapter[], city: string) => {
  return chapters.find((chapter) => chapter.city === city);
};


export const stripCampusChapterName = (name: string) => {
  if(!isCampusChapter(name)){
    return name
  }
    const parts = name.split(' - ');

    const universityPart = parts[0].split(' on Campus');
  
    return universityPart[1].trim();
}

export const collectChaptersByCountry = (chapters: Chapter[])=>{
  const chaptersByCountry: { [key: string]: Chapter[] } = chapters.reduce((acc: { [key: string]: Chapter[] }, chapter) => {
    const country =
      chapterCountyMapping[
        chapterNameMap[stripCampusChapterName(chapter.title) as keyof typeof chapterNameMap] as keyof typeof chapterCountyMapping
      ];
    if (!acc[country]) {
      acc[country] = [];
    }
    acc[country].push(chapter);
    return acc;
  }, {});
  return chaptersByCountry;
} 

export const sortCountryList = (countries: string[]) => {
  const output = []
  for(let i = 0; i < citiesList.length; i++){
    if(countries.indexOf(citiesList[i]) !== -1){
      output.push(citiesList[i]);
    }
  }
  return output;
}