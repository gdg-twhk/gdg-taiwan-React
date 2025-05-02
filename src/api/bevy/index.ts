import axios from 'axios';
import { API_URL } from '../const';
import { Event, Chapter } from '@/interfaces';

export const getUpcomingEvents = async (): Promise<Event[]> => {
  try{
    const response = await axios.get(`${API_URL}/search/event?q=(TW)&around_radius=200&status=upcoming`);
    return response.data.results;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch upcoming events: ${error}`);
  }
}


export const getEventByTag = async(eventTagsId: string): Promise<Event[]> =>{
  try{
    const response = await axios.get(`${API_URL}/search/event?latitude=23.5825&longitude=120.582&around_radius=200&event_tags_ids=${eventTagsId}`);
    return response.data.results;

  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch events by tag ${eventTagsId}: ${error}`);
  }
}


export const getChapter = async(): Promise<Chapter[]>=>{
  try{
    const response = await axios.get(`${API_URL}/search/chapter?q=(TW)`);
    return response.data.results

  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch chapters: ${error}`);
  }
}
