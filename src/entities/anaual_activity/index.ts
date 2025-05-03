export const activityMeta = {
    international_womens_day: {
      bevytagId: "30",
      backgroundUrl: "/event/iwd/bg.png",
      iconUrl: "/event/iwd/logo.png",
      animationUrl: "/event/iwd/iwd.png",
      url: "https://developers.google.com/womentechmakers/initiatives/iwd",
    },
    google_io_extended: {
      bevytagId: "24",
      backgroundUrl: "/event/io-extend/banner.svg",
      iconUrl: "/event/io-extend/logo-white.svg",
      animationUrl: "/event/io-extend/giphy.gif",
      url: "https://gdg.community.dev/ioextended/",
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