'use client'

import { Button } from "@/components/ui/button";
import { CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from 'react-i18next';


export function MainSection() {
  const { t } = useTranslation();


const sistersProjects = [
  {
    name: t('mainSection.sistersProjects.wtm.title'),
    description: t('mainSection.sistersProjects.wtm.description'),
    image: "/sistersProjects/wtm_taipei.jpeg",
    link: "https://www.womentechmakers.com/"
  },
  {
    name: t('mainSection.sistersProjects.gdsc.title'),
    description: t('mainSection.sistersProjects.gdsc.description'),
    image: "/sistersProjects/gdsc.png",
    link: "https://developers.google.com/community"
  },
  {
    name: t('mainSection.sistersProjects.gde.title'),
    description: t('mainSection.sistersProjects.gde.description'),
    image: "/sistersProjects/google-developers-experts-1.svg",
    link: "https://developers.google.com/community/experts"
  }
];

  return (
    <>
      <div >
        {/* Main Content */}
        <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-row gap-4 justify-center items-center w-full h-1/2"> 
          <div className="flex flex-col justify-left items-left">
            <h1 className="text-4xl font-bold" style={{ whiteSpace: 'pre-line', textAlign: 'left' }}>{t('mainSection.title')}</h1>
            <h2 className="text-xl font-light mt-4" style={{ whiteSpace: 'pre-line', textAlign: 'left' }}>{t('mainSection.description')}</h2>
          </div>
          <div className="flex flex-col justify-center items-center">
            <Image src="/google_sticker_3.gif" alt="main image" width={300} height={300} className="img-fluid w-full h-full" />
          </div>
        </div>
      </section>
       {/* Main Content */}
      <section className="container mx-auto px-4 py-16 md:py-24 ">
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center w-full">
          {/* 左側：標題與說明 */}
          <div className="flex-1 text-left">
            <h2 className="text-5xl font-bold mb-8 text-google-red">{t('mainSection.whoWeAre')}</h2>
            <p className="text-xl mb-8">
            {t('mainSection.whoWeAreDescription')}
            </p>
          </div>
          {/* 右側：大數字與說明 */}
          <div className="flex-1 flex justify-center items-center">
          <div className="rounded-[48px] border-2 w-full max-w-md bg-white aspect-[16/9] overflow-hidden flex items-center justify-center">
              <iframe
                src="https://www.youtube.com/embed/V6s5kjSoqzw?rel=0"
                className="w-full h-full"
                style={{ backgroundColor: 'var(--background)' }}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 py-10 md:py-24">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* 左側：照片區塊 */}
          <div className="flex-shrink-0">
            <div className="relative w-[350px] h-[350px] bg-pastel-blue rounded-[48px] border-6 border-black overflow-hidden"
                  style={{ borderBottomLeftRadius: '48px', borderTopRightRadius: '48px', borderTopLeftRadius: '48px', borderBottomRightRadius: '48px' }}>
              <Image src="/dash-big.svg" alt="main image" width={350} height={350} className="img-fluid w-full h-auto" />
            </div>
          </div>
          {/* 右側：引言與人名 */}
          <div className="flex-1 flex flex-col justify-center items-end">
            <p className="text-xl md:text-3xl font-bold leading-snug mb-8 text-black-02">
              &quot; {t('mainSection.recruitmentQuote')} &quot;
            </p>
            <div className="flex flex-col gap-3 justify-end items-end">
              <Button className="bg-google-blue dark:bg-google-blue border border-black border-3 rounded-lg text-xl font-medium text-black hover:bg-halftone-blue dark:hover:bg-halftone-blue hover:text-black hover:border-black">
                {t('mainSection.recruitmentButton')}
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Sisters project */}
      <section className="container mx-auto px-4 py-10 md:py-24">
      <h2 className="text-5xl font-bold mb-8 text-google-green">{t('mainSection.sistersProjects.title')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {sistersProjects.map((sisterProject) => (
          <Card key={sisterProject.name} className="h-full flex flex-col border-4 rounded-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-google-green">{sisterProject.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-xl">{sisterProject.description}</p>
            </CardContent>
            <CardFooter>
              <Button className={`bg-google-green dark:bg-google-green border border-dark border-3 rounded-lg text-xl font-medium text-black hover:bg-halftone-green dark:hover:bg-halftone-green hover:text-black hover:border-black`}>
                <Link href={sisterProject.link} target="_blank">{t('mainSection.sistersProjects.learnMore')}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>  
      </section>
    </div>
    </>
  );
}
