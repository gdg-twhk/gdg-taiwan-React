import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import AnnualActivitySection from "@/components/page-section/annual_activity-section";
import { activityMeta } from "@/entities/anaual_activity/index";
import { activity as activityTranslation } from "@/i18n/locales/en/activity";
import { Metadata } from "next";
import React from "react";

type ActivityKey = keyof typeof activityMeta;

export function generateStaticParams(): { activity: ActivityKey }[] {
  return (Object.keys(activityMeta) as ActivityKey[]).map((activity) => ({
    activity,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ activity: ActivityKey }> }): Promise<Metadata> {
  const { activity } = await params;
  const activityInfo = activityTranslation[activity];
  return {
    title: `GDG Taiwan | ${activityInfo.title}`,
    description: activityInfo.description,
  };
}

export default async function AnnualActivityPage({
  params,
}: {
  params: Promise<{ activity: ActivityKey }>;
}) {
  const { activity } = await params;

  return (
    <div>
      <div className="flex flex-col">
        <SiteHeader />
        <AnnualActivitySection activity={activity} />
      </div>
      <SiteFooter />
    </div>
  );
}
