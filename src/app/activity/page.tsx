import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import ActivitySection from "@/components/page-section/activity-section";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GDG Taiwan | 全台近期活動",
  description: "GDG Taiwan 全台近期活動",
};

export default function ActivityPage() {

  return (
    <div>
      <div className="flex flex-col">
        <SiteHeader />
        <ActivitySection />
      </div>
      <SiteFooter />
    </div>
  );
}
