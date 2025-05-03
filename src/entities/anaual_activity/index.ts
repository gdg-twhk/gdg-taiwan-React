export const activityContent = {
    international_womens_day: {
      title: "International Women's Day",
      description:
        "國際婦女節 (IWD) 是 Women Techmakers 最大的年度活動，大使們在 3 月和 4 月期間在世界各地舉辦活動以慶祝這一時刻。從大型峰會到小型私密聚會， IWD 也是我們支持我們的使命的一種方式，即建設一個所有女性都能在科技領域茁壯成長的世界。 GDG 和 GDG on Campus 社群也可以參與 IWD 活動。",
      bevytagId: "30",
      backgroundUrl: "/event/IWD/bg.png",
      iconUrl: "/event/IWD/logo.png",
      animationUrl: "/event/IWD/IWD.png",
      url: "https://developers.google.com/womentechmakers/initiatives/iwd",
    },
    google_io_extended: {
      title: "Google I/O Extended",
      description:
        "Google I/O 將來自世界各地的開發人員聯繫在一起，進行深思熟慮的討論，與 Google 專家進行實踐學習，並搶先了解 Google 的最新開發人員產品。 I/O 的魔力並沒有在主賽事之後結束。 本地開發人員齊聚一堂參加 I/O Extended 活動，討論最新的新技術、總結內容、主持問答環節並會見其他技術愛好者。",
      bevytagId: "24",
      backgroundUrl: "/event/io-extend/IOE23-Bevy-Chapter-Banner-2560x650.svg",
      iconUrl: "/event/io-extend/GoogleIO Extended-White.svg",
      animationUrl: "/event/io-extend/giphy.gif",
      url: "https://gdg.community.dev/ioextended/",
    },
    cloud_study_jam: {
      title: "Cloud Study Jam",
      description:
        "從容器化應用程式到創建虛擬機，Study Jams 可以根據特定的雲端主題和技能水平進行自訂。 無論您是初學者開發人員還是有興趣深入研究機器學習、BigQuery、認證或 Kubernetes - 總有一條適合您。 您將透過免費造訪實作實驗室來了解 Google Cloud 的基本工具和功能。",
      bevytagId: "23",
      backgroundUrl: "/event/cloud-study-jam/banner.jpg",
      iconUrl: "/event/cloud-study-jam/logo.svg",
      animationUrl: "/event/cloud-study-jam/cloud_animation.gif",
      url: "https://events.withgoogle.com/cloud-studyjam/",
    },
    devfest: {
      title: "DevFest",
      description:
        "DevFests 是由全球 Google Developer Group (GDG) 主持的當地技術研討會。每個 DevFest 活動都是由當地發起人舉辦，以配合當地開發人員社群的需求和興趣，推動技術開放文化。無論是透過實作學習體驗，還是由專家提供的當地語言技術講座，或是只要與其他當地開發人員研討會，DevFest 的參與者就能學習如何透過 Google 的開源技術或開發人員工具共同協作並創新。",
      bevytagId: "21",
      backgroundUrl: "/event/devfest/banner.jpg",
      iconUrl: "/event/devfest/logo-white.svg",
      animationUrl: "/event/devfest/devfest.gif",
      url: "https://developers.google.com/community/devfest",
    },
} as const;


export type AnnualActivitySectionProps = {
  activity: "international_womens_day" | "google_io_extended" | "cloud_study_jam" | "devfest";
};