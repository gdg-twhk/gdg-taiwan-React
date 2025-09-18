export const activityMeta = {
    international_womens_day: {
      bevytagId: "30",
      backgroundUrl: "/event/international-womans-day/bg.png",
      iconUrl: "/event/international-womans-day/logo.png",
      animationUrl: "/event/international-womans-day/main.png",
      url: "https://developers.google.com/womentechmakers/initiatives/iwd",
    },
    google_io_extended: {
      bevytagId: "24",
      backgroundUrl: "/event/io-extends/banner.svg",
      iconUrl: "/event/io-extends/logo-white.svg",
      animationUrl: "/event/io-extends/giphy.gif",
      url: "https://gdg.community.dev/ioextended/",
    },
    build_with_ai: {
      bevytagId: "73",
      backgroundUrl: "/event/build-with-ai/banner.jpg",
      iconUrl: "/event/build-with-ai/logo.png",
      animationUrl: "/event/build-with-ai/logo.png",
      url: "https://ai.google/build/",
    },
    cloud_study_jam: {
      bevytagId: "23",
      backgroundUrl: "/event/cloud-study-jam/banner.jpg",
      iconUrl: "/event/cloud-study-jam/logo.svg",
      animationUrl: "/event/cloud-study-jam/cloud_animation.gif",
      url: "https://events.withgoogle.com/cloud-studyjam/",
    },
    devfest: {
      bevytagId: "21",
      backgroundUrl: "/event/devfest/banner.jpg",
      iconUrl: "/event/devfest/logo-white.svg",
      animationUrl: "/event/devfest/devfest.gif",
      url: "https://developers.google.com/community/devfest",
    },
} as const;


export type AnnualActivitySectionProps = {
  activity: keyof typeof activityMeta;
};