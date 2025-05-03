import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MainSection } from "@/components/page-section/main-section";


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
        <MainSection />
        <SiteFooter />
      </div>
    </div>
    </>
  );
}
