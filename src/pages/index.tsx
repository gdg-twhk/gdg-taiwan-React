import React from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { MainSection } from "@/components/page-section/main-section";
import Head from 'next/head';
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t("metadata.home.title")}</title>
        <meta name="description" content={t("metadata.home.description")} />
        <meta name="google-site-verification" content="x30L4M9Cq4th7Caqp23O8CWHZBMcPZhIte4ixAJLVy4" />
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