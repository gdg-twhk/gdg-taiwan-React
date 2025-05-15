'use client'

import { Card, CardContent } from "../ui/card";
import { useTranslation } from 'react-i18next';
import { useClientOnly } from "@/components/use-client-only";

export default function CodeOfConduct() {
  const { t } = useTranslation();
  const mounted = useClientOnly();

  if (!mounted) return null;

  return (
    <section className="flex flex-col items-center justify-center bg-muted">
      <div className="flex flex-col items-center justify-center px-4 py-8">
        <h1 className="text-5xl font-bold text-google-red">{t('codeOfConduct.title')}</h1>
        <Card className="w-full max-w-4xl mt-10">
          <CardContent className="flex flex-col gap-5 p-6">
            <h5>{t('codeOfConduct.intro')}</h5>
            <h5 className="mt-0 text-google-red font-bold">{t('codeOfConduct.policyTitle')}</h5>
            <div>
              <ol className="custom-list list-decimal list-inside mt-4">
                <li className="ml-4">{t('codeOfConduct.policy1')}</li>
                <li className="ml-4">{t('codeOfConduct.policy2')}</li>
                <li className="ml-4">{t('codeOfConduct.policy3')}</li>
                <li className="ml-4">{t('codeOfConduct.policy4')}</li>
              </ol>
              <p className="mt-4">{t('codeOfConduct.content1')}</p>
              <p className="mt-4">{t('codeOfConduct.content2')}</p>
              <p className="mt-4">{t('codeOfConduct.content3')}</p>
              <p className="mt-4">{t('codeOfConduct.contactList.title')}</p>
              <ul className="custom-list-disc list-inside mt-4">
                <li className="ml-4"> {t('codeOfConduct.contactList.item1')}</li>
                <li className="ml-4"> {t('codeOfConduct.contactList.item2')}</li>
                <li className="ml-4"> {t('codeOfConduct.contactList.item3')}</li>
              </ul>
              <br />
              {t('codeOfConduct.exhibitorPolicy')}
          </div>
          <h5 className="mt-4 text-google-red font-bold">{t('codeOfConduct.partners.title')}</h5>
          <p>{t('codeOfConduct.partners.description')}</p>
          <h5 className="mt-4 text-google-red font-bold">{t('codeOfConduct.importance.title')}</h5>
          <p>{t('codeOfConduct.importance.description')}</p>
          <h5 className="mt-4 text-google-red font-bold">{t('codeOfConduct.license.title')}</h5>
          <p>
            {t('codeOfConduct.license.description')}
          </p>
        </CardContent>
        </Card>
      </div>
    </section>
  );
}
