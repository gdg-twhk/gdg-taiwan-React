import { GetStaticPaths, GetStaticProps } from 'next';
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import AnnualActivitySection from "@/components/page-section/annual_activity-section";
import { activityMeta } from "@/entities/anaual_activity/index";
import { activity as activityTranslation } from "@/i18n/locales/en/activity";
import Head from 'next/head';
import React from "react";

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
  const activityInfo = activityTranslation[activity];
  return (
    <>
      <Head>
        <title>{`GDG Taiwan | ${activityInfo.title}`}</title>
        <meta name="description" content={activityInfo.description} />
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