export interface Event {
    id: number;
    chapter_id: number;
    chapter_city: string;
    chapter_location: string;
    chapter_title: string;
    chapter_url: string;
    _geoloc: {
        lat: number;
        lng: number;
    };
    event_type: number;
    event_type_slug: string;
    event_type_title: string;
    relative_url: string;
    url: string;
    picture_url: string;
    start_date_iso: string;
    end_date_iso: string;
    title: string;
    description_short: string;
    venue_name: string;
    venue_address: string;
    venue_city: string;
    venue_zip_code: string;
    mobile_relative_event_type: string;
    banner: {
        url: string;
    },
    event_timezone: string;
    audience_type: string;
    event_type_allow_new_agenda: boolean;
    event_type_rsvp_only: boolean;
    virtual_event_type: string;
    cropped_banner_url: string;
    objectID: string;
}

export interface Chapter {
    id: number;
    title: string;
    city: string;
    state: string;
    chapter_location: string;
    country: string;
    country_code: string;
    is_city: boolean;
    logo: string;
    picture: {
        url: string;
    },
    member_count: number;
    url: string;
    _geoloc: {
        lat: number;
        lng: number;
    },
    region_id: number;
    region: string;
    team: {
        id: number;
        full_name: string;
    }[];
    objectID: string;
}