export const activityMeta = {
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
      animationUrl: "/event/build-with-ai/minilogo.png",
      url: "https://ai.google/build/",
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