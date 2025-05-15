import { GetStaticPaths, GetStaticProps } from 'next';
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import AnnualActivitySection from "@/components/page-section/annual_activity-section";
import { activityMeta } from "@/entities/anaual_activity/index";
import Head from 'next/head';
import React from "react";
import { useTranslation } from "react-i18next";
type ActivityKey = keyof typeof activityMeta;

type Props = {
  activity: ActivityKey;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(activityMeta).map((activity) => ({
    params: { activity },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const activity = context.params?.activity as ActivityKey;
  return { props: { activity } };
};

export default function AnnualActivityPage({ activity }: Props) {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t(`metadata.annual_activity.${activity}.title`)}</title>
        <meta name="description" content={t(`metadata.annual_activity.${activity}.description`)} />
      </Head>
      <div>
        <div className="flex flex-col">
          <SiteHeader />
          <AnnualActivitySection activity={activity} />
        </div>
        <SiteFooter />
      </div>
    </>
  );
} 