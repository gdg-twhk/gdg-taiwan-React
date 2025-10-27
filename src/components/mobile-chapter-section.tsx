import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { IconMapPin } from "@tabler/icons-react";
import React, { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Skeleton } from "@/components/ui/skeleton";

interface StatusListProps {
  setOpen: (open: boolean) => void;
  setSelectedCountry: (country: string) => void;
  sortedCountries: string[];
  selectedCountry: string;
}

function StatusList({ setOpen, setSelectedCountry, sortedCountries, selectedCountry }: StatusListProps) {
  const { t } = useTranslation();
  const wheelContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (wheelContainerRef.current) {
      const selectedButton = wheelContainerRef.current.querySelector<HTMLButtonElement>(
        `[data-active="true"]`
      );
      if (selectedButton) {
        const wheelItem = selectedButton.parentElement;
        if (wheelItem) {
          wheelItem.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }
    }
  }, [sortedCountries]); // Re-run when countries list changes

  return (
    <div ref={wheelContainerRef} className="wheel-container h-48 overflow-y-auto" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)' }}>
      <div className="wheel-item h-12"></div>
      {sortedCountries.map((country) => (
        <div key={country} className="wheel-item h-12 flex items-center justify-center">
          <Button
            variant="ghost"
            onClick={() => {
              setSelectedCountry(country);
              setOpen(false);
            }}
            className="text-xl w-full h-10 px-4 rounded-full data-[active=true]:text-google-red data-[active=true]:font-bold"
            data-active={selectedCountry === country}
          >
            {t('selectedCountryMap.' + country)}
          </Button>
        </div>
      ))}
      <div className="wheel-item h-12"></div>
    </div>
  );
}

interface MobileChapterSectionProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  sortedCountries: string[];
  isLoading?: boolean;
}

export function MobileChapterSection({
  open,
  setOpen,
  selectedCountry,
  setSelectedCountry,
  sortedCountries,
  isLoading = false,
}: MobileChapterSectionProps) {
  const { t } = useTranslation();

  useEffect(() => {
    if (open) {
      // We need a slight delay to ensure the content is rendered before scrolling
      setTimeout(() => {
        const selectedItem = document.querySelector(".wheel-item [data-active='true']");
        if (selectedItem) {
          selectedItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 50);
    }
  }, [open]);

  return (
    <div className="flex flex-row w-full justify-center items-center relative z-10 mb-4 bg-card">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            className="w-fit-content justify-start text-xl"
          >
            {isLoading ? (
              <Skeleton className="h-6 w-32" />
            ) : selectedCountry ? (
              <><IconMapPin className="w-5 h-5 mr-2" /> {t('selectedCountryMap.' + selectedCountry)}</>
            ) : (
              <>{t('chaptersSection.noContentYet')}</>
            )}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-center">{t('chaptersSection.selectCity')}</DrawerTitle>
            <DrawerDescription className="text-center">{t('chaptersSection.selectCityDescription')}</DrawerDescription>
          </DrawerHeader>
          <div className="mt-4 border-t text-center">
            <StatusList
              setOpen={setOpen}
              setSelectedCountry={setSelectedCountry}
              sortedCountries={sortedCountries}
              selectedCountry={selectedCountry}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
