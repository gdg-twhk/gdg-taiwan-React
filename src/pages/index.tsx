import React from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { MainSection } from "@/components/page-section/main-section";
import Head from 'next/head';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>GDG Taiwan</title>
        <meta name="description" content="GDG Taiwan 全台各縣市分會" />
      </Head>
      <div>
        <div className="flex flex-col">
          <SiteHeader />
          <MainSection />
        </div>
        <SiteFooter />
      </div>
    </>
  );
} 