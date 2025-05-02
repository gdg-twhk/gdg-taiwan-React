import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import AnnualActivitySection from "@/components/page-section/annual_activity-section";
import { activityContent } from "@/entities/anaual_activity/index";
import { Metadata } from "next";
import React from "react";

type ActivityKey = keyof typeof activityContent;

interface PageProps {
  params: Promise<{
    activity: ActivityKey;
  }>;
}

export async function generateMetadata({ params }: { params: { activity: ActivityKey } }): Promise<Metadata> {
  const activity = params.activity;
  const activityInfo = activityContent[activity];
  return {
    title: `GDG Taiwan | ${activityInfo.title}`,
    description: activityInfo.description,
  };
}

export default function AnnualActivityPage({
  params: paramsPromise,
}: PageProps) {
  const params = React.use(paramsPromise);

  return (
    <div>
      <div className="flex flex-col">
        <SiteHeader />
        <AnnualActivitySection activity={params.activity} />
      </div>
      <SiteFooter />
    </div>
  );
}
