import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import ActivitySection from "@/components/page-section/activity-section";
import Head from 'next/head';
import React from "react";
import { useTranslation } from "react-i18next";

export default function ActivityPage() {
    const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t("activity.title")}</title>
        <meta name="description" content={t("activity.description")} />
      </Head>
      <div>
        <div className="flex flex-col">
          <SiteHeader />
          <ActivitySection />
        </div>
        <SiteFooter />
      </div>
    </>
  );
} 