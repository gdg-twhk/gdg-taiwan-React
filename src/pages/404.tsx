import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';
import Head from 'next/head';

export default function Custom404() {
    const { t } = useTranslation();
    return (      
    <div className="flex flex-col">
        <Head>
            <title>{t('notFound.title')}</title>
            <meta name="description" content={t('notFound.description')} />
        </Head>
        <SiteHeader />
        <div className="flex flex-col items-center justify-center min-h-screen bg-background">
            <Image src="/dinosaur.gif" alt="404 not found" width={300} height={300} />
        <h1 className="text-4xl font-bold mt-4">{t('notFound.title')}</h1>
        <p className="mt-2 text-lg">{t('notFound.description')}</p>
            <Button variant="outline" className="mt-6  bg-google-yellow border-none hover:bg-google-yellow/80">
                <Link href="/">
                    {t('notFound.backToHome')}
                </Link>
            </Button>
        </div>
        <SiteFooter />
    </div>
    );
} 