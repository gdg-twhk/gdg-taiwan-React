import React from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import CodeOfConductSection from "@/components/page-section/code-of-conduct";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GDG Taiwan | 行為準則",
  description: "GDG Taiwan 致力於為所有人提供一個沒有騷擾且包容的活動體驗，不論性別身份和表現、性傾向、殘疾、外貌、體型、種族、國籍、年齡、宗教或其他受保護的類別。我們不容忍對參加者任何形式的騷擾。GDG Taiwan 重視我們的政策違規行為，會作出適當回應。",
};

export default function CodeOfConductPage() {
  return (
    <div>
      <div className="flex flex-col">
        <SiteHeader />
        <CodeOfConductSection />
      </div>
      <SiteFooter />
    </div>
  );
}
