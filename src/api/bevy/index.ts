import axios from 'axios';
import { API_URL } from '../const';
import { Event, Chapter } from '@/interfaces';


export const getEvents = async (): Promise<Event[]> => {
  try{
    const params = new URLSearchParams({
      q: 'Taiwan',
      around_radius: '200',
    });
    const response = await axios.get(`${API_URL}/search/event/`, { params });
    return response.data.results;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch events: ${error}`);
  }
}


export const getPastEvents = async (page: number = 1): Promise<{ events: Event[], hasNextPage: boolean }> => {
  try {
    const params = new URLSearchParams({
      q: 'Taiwan',
      around_radius: '200',
      status: 'past',
      page: page.toString(),
    });
    const response = await axios.get(`${API_URL}/search/event/`, { params });
    return {
      events: response.data.results,
      hasNextPage: response.data.links?.next !== null
    };
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch past events: ${error}`);
  }
}

  // Function to fetch all past events by iterating through all pages
  export const fetchAllPastEvents = async () => {
    const allPastEvents: Event[] = [];
    let currentPage = 1;
    let hasNextPage = true;

    while (hasNextPage) {
      const { events: pastEvents, hasNextPage: morePages } = await getPastEvents(currentPage);
      allPastEvents.push(...pastEvents);
      hasNextPage = morePages;
      currentPage++;
    }

    return allPastEvents;
  };

export const getUpcomingEvents = async (): Promise<Event[]> => {
  try{
    const params = new URLSearchParams({
      q: 'Taiwan',
      around_radius: '200',
      status: 'upcoming',
    });
    const response = await axios.get(`${API_URL}/search/event/`, { params });
    return response.data.results;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch upcoming events: ${error}`);
  }
}

export const getLiveEvents = async (): Promise<Event[]> => {
  try{
    const params = new URLSearchParams({
      q: 'Taiwan',
      around_radius: '200',
      status: 'upcoming',
      page_size: '10',
    });
    const response = await axios.get(`${API_URL}/search/event/`, { params });
    return response.data.results;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch live events: ${error}`);
  }
}

export const getEventByTag = async(eventTagsId: string): Promise<Event[]> =>{
  try{
    const params = new URLSearchParams({
      latitude: '23.5825',
      longitude: '120.582',
      around_radius: '200',
      event_tags_ids: eventTagsId,
    });
    const response = await axios.get(`${API_URL}/search/event/`, { params });
    return response.data.results;

  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch events by tag ${eventTagsId}: ${error}`);
  }
}


export const getChapters = async(): Promise<Chapter[]>=>{
  try{
    const params = new URLSearchParams({
      q: '(TW)',
    });
    const response = await axios.get(`${API_URL}/search/chapter/`, { params });
    return response.data.results

  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch chapters: ${error}`);
  }
}
