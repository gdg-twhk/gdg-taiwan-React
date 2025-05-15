import React from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import ChaptersSection from "@/components/page-section/chapters";
import Head from 'next/head';

export default function ChaptersPage() {
  return (
    <>
      <Head>
        <title>GDG Taiwan | 全台各縣市分會</title>
        <meta name="description" content="GDG Taiwan 全台各縣市分會" />
      </Head>
      <div>
        <div className="flex flex-col">
          <SiteHeader />
          <ChaptersSection />
        </div>
        <SiteFooter />
      </div>
    </>
  );
} 