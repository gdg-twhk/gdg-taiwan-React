"use client";

import Link from "next/link";
import { useTranslation } from 'react-i18next';
import { LanguageToggle } from "./language-toggle";
import { useClientOnly } from "./use-client-only";
import { useIsMobile } from "@/hooks/use-mobile";

export function SiteFooter() {
  const mounted = useClientOnly();
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  if (!mounted) return null;
  return (
    <footer className="py-10 border-t border-gray-400 border-t-3">
      <div className="flex flex-row items-center mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center md:text-left text-google-blue">{t('footer.disclaimer')}</h2>
          <p className="text-lg mb-2 text-center md:text-left">
            {t('footer.disclaimerText')}
          </p>
          <a
            href={t('footer.communityUrl')}
            className="underline break-all text-center md:text-left block mb-6 text-google-blue"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('footer.communityUrl')}
          </a>
          <p className="text-center md:text-left text-base mt-8">
            © 2025 <Link href="/" className="underline text-google-blue">{t('footer.siteName')}</Link>・<Link href="/code_of_conduct" className="underline text-google-blue">{t('footer.codeOfConduct')}</Link>
          </p>
        </div>
        {!isMobile && (
          <div className="flex items-center justify-between gap-2">
            <LanguageToggle />
          </div>
        )}
      </div>
    </footer>
  );
}
