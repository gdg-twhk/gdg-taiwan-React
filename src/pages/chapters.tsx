import React from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import ChaptersSection from "@/components/page-section/chapters";
import Head from 'next/head';
import { useTranslation } from "react-i18next";

export default function ChaptersPage() {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t("metadata.chapters.title")}</title>
        <meta name="description" content={t("metadata.chapters.description")} />
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