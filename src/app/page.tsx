import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
const sistersProjects = [
  {
    name: "Woman Techmakers",
    description: "Google Women Techmakers 是一個致力於促進女性在科技領域中的發展和參與的社群組織。透過舉辦活動、研討會、工作坊、課程和聚會等形式，致力於提供一個互動交流和學習的平台，讓女性更好地了解科技領域的最新發展，掌握相關技能，建立自信，拓展人脈，實現個人和職業生涯的目標。",
    image: "/sistersProjects/wtm_taipei.jpeg",
    link: "https://www.womentechmakers.com/"
  },
  {
    name: "Google Developer Groups on Campus",
    description: "GDG on Campus 為全球大學和大專院校的開發人員提供學習機會，讓他們獲得實作經驗、培養必要技能，並為科技職涯奠定堅實基礎。畢業後，校園 GDG 成員可以無縫轉移至更廣泛的 GDG 社群，繼續學習並與其他開發人員合作。",
    image: "/sistersProjects/gdsc.png",
    link: "https://developers.google.com/community"
  },
  {
    name: "Google Developers Experts",
    description: "加入超過1,000位專業人士的全球網絡。與經驗豐富的Google技術專家、影響者和思想領袖會面。探索社群，獲取建議並建立人脈關係，或者通過GDE或Googler的推薦申請。請下載申請指南以獲取更多詳情。",
    image: "/sistersProjects/google-developers-experts-1.svg",
    link: "https://developers.google.com/community/experts"
  }
];

export const metadata = {
  title: "GDG Taiwan",
  description: "GDG Taiwan 是一個致力於促進女性在科技領域中的發展和參與的社群組織。",
};

export default function Home() {
  return (
    <>
      <div >
      <div className="flex flex-col">
        <SiteHeader /> 
        {/* Main Content */}
        <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-row gap-4 justify-center items-center w-full h-1/2"> 
          <div className="flex flex-col justify-left items-left">
            <h1 className="text-4xl font-bold" style={{ whiteSpace: 'pre-line', textAlign: 'left' }}>發掘Google技術精髓<br />與全球開發者<br />學習、交流、成長！</h1>
            <h2 className="text-xl font-light mt-4" style={{ whiteSpace: 'pre-line', textAlign: 'left' }}>Google 的 Google developers 計畫為科技領域的開發者提供知名度、社群和資源。</h2>
          </div>
          <div className="flex flex-col justify-center items-center">
            <img src="/google_sticker_3.gif" alt="main image" className="img-fluid w-full h-full" />
          </div>
        </div>
      </section>
       {/* Main Content */}
      <section className="container mx-auto px-4 py-16 md:py-24 ">
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center w-full">
          {/* 左側：標題與說明 */}
          <div className="flex-1 text-left">
            <h2 className="text-5xl font-bold mb-8 text-google-red">我們是誰？</h2>
            <p className="text-xl mb-8">
            Google Developer Groups (GDG) 立志成為開發人員與他人聯繫以了解並在所有 Google 平台上成功構建的最有幫助的方式。 全球有超過 145 個國家/地區的
                            1000 多個 GDG 社群。 Google Developer Groups 是世界上最大的開發者社群網絡。 每個 GDG 都是專業開發人員的本地社群中心，他們分享對 Google
                            開發人員技術的專業知識和熱情。 GDG 計劃的重點是幫助開發人員接觸 Google 最新最好的開發人員技術，共同學習、共同構建成功的產品，並與技術行業的其他開發人員和專家建立聯繫。            </p>
          </div>
          {/* 右側：大數字與說明 */}
          <div className="flex-1 flex justify-center items-center">
          <div className="rounded-[48px] border-2 w-full max-w-md bg-white aspect-[16/9] overflow-hidden flex items-center justify-center">
              <iframe
                src="https://www.youtube.com/embed/V6s5kjSoqzw?rel=0"
                className="w-full h-full"
                style={{ backgroundColor: 'var(--background)' }}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 py-10 md:py-24">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* 左側：照片區塊 */}
          <div className="flex-shrink-0">
            <div className="relative w-[350px] h-[350px] bg-pastel-blue rounded-[48px] border-6 border-black overflow-hidden"
                  style={{ borderBottomLeftRadius: '48px', borderTopRightRadius: '48px', borderTopLeftRadius: '48px', borderBottomRightRadius: '48px' }}>
              <Image src="/dash-big.svg" alt="main image" width={350} height={350} className="img-fluid w-full h-auto" />
            </div>
          </div>
          {/* 右側：引言與人名 */}
          <div className="flex-1 flex flex-col justify-center items-end">
            <p className="text-xl md:text-3xl font-bold leading-snug mb-8 text-black-02">
              &quot; 我們誠徵願意分享 Android, Kotlin, Firebase, AI, Flutter, TensorFlow, Gemini 或 Google Cloud
              相關技術主題的朋友，不管是自己想分享的主題，或是想聽到任何相關的主題，只有你有一顆熱情的心，不用怕自己的主題不夠專業，我們需要的是簡單、輕鬆和快樂的 Talk。&quot;
            </p>
            <div className="flex flex-col gap-3 justify-end items-end">
              <Button className="bg-google-blue dark:bg-google-blue border border-black border-3 rounded-lg text-xl font-medium text-black hover:bg-halftone-blue dark:hover:bg-halftone-blue hover:text-black hover:border-black">
                立即投稿
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Sisters project */}
      <section className="container mx-auto px-4 py-10 md:py-24">
      <h2 className="text-5xl font-bold mb-8 text-google-green">Sisters project</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {sistersProjects.map((sisterProject) => (
          <Card key={sisterProject.name} className="h-full flex flex-col border-4 rounded-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-google-green">{sisterProject.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-xl">{sisterProject.description}</p>
            </CardContent>
            <CardFooter>
              <Button className={`bg-google-green dark:bg-google-green border border-dark border-3 rounded-lg text-xl font-medium text-black hover:bg-halftone-green dark:hover:bg-halftone-green hover:text-black hover:border-black`}>
                <Link href={sisterProject.link} target="_blank">了解更多</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>  
      </section>
        {/* Footer */}
        <SiteFooter />
      </div>
    </div>
    </>
  );
}
