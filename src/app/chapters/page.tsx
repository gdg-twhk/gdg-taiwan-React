import React from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import ChaptersSection from "@/components/page-section/chapters";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GDG Taiwan | 全台各縣市分會",
  description: "GDG Taiwan 全台各縣市分會",
};

export default function ChaptersPage() {
  return (
    <div>
      <div className="flex flex-col">
        <SiteHeader />
        <ChaptersSection />
      </div>
      <SiteFooter />
    </div>
  );
}
