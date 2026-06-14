export const activityMeta = {
    google_io_extended: {
      bevytagId: "24",
      backgroundUrl: "/event/io-extends/banner.svg",
      iconUrl: "/event/io-extends/logo-white.svg",
      animationUrl: "/event/io-extends/giphy.gif",
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