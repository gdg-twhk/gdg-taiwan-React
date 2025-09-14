"use client";

import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import i18n from "@/i18n/config";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { supportedLanguages } from "@/i18n/languages";


export function LanguageToggle() {
  const router = useRouter();
  const [language, setLanguage] = useState(i18n.language);
  
  useEffect(() => {
    const handleLanguageChange = (lang: string) => {
      setLanguage(lang);
    };
    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);
  
  const handleSelectChange = (language: string) => {
    i18n.changeLanguage(language);
    router.refresh();
  };

  return (
    <Select onValueChange={handleSelectChange} value={language}>
      <SelectTrigger>
        <SelectValue placeholder={supportedLanguages.find(lang => lang.code === language)?.name} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {supportedLanguages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              {lang.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}