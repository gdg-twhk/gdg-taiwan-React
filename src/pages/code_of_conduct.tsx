import React from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import CodeOfConductSection from "@/components/page-section/code-of-conduct";
import Head from 'next/head';

export default function CodeOfConductPage() {
  return (
    <>
      <Head>
        <title>GDG Taiwan | 行為準則</title>
        <meta name="description" content="GDG Taiwan 致力於為所有人提供一個沒有騷擾且包容的活動體驗，不論性別身份和表現、性傾向、殘疾、外貌、體型、種族、國籍、年齡、宗教或其他受保護的類別。我們不容忍對參加者任何形式的騷擾。GDG Taiwan 重視我們的政策違規行為，會作出適當回應。" />
      </Head>
      <div>
        <div className="flex flex-col">
          <SiteHeader />
          <CodeOfConductSection />
        </div>
        <SiteFooter />
      </div>
    </>
  );
} 