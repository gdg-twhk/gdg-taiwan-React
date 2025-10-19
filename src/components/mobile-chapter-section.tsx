import { Drawer, DrawerContent, DrawerDescription, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { IconMapPin } from "@tabler/icons-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";

interface StatusListProps {
  setOpen: (open: boolean) => void;
  setSelectedCountry: (country: string) => void;
  sortedCountries: string[];
  selectedCountry: string;
}

function StatusList({ setOpen, setSelectedCountry, sortedCountries, selectedCountry }: StatusListProps) {
  const { t } = useTranslation();
  return (
    <Command>
      <CommandList>
        <CommandEmpty>{t('chaptersSection.noChaptersFound')}</CommandEmpty>
        <CommandGroup>
          {sortedCountries.map((country) => (
            <CommandItem
              key={country}
              value={country}
              className={`text-center justify-center transition-colors ${
                selectedCountry === country
                  ? 'bg-google-red text-white dark:bg-google-red dark:text-black'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              onSelect={(value: string) => {
                setSelectedCountry(value);
                setOpen(false);
              }}
            >
              {t('selectedCountryMap.' + country)}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

interface MobileChapterSectionProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  sortedCountries: string[];
}

export function MobileChapterSection({
  open,
  setOpen,
  selectedCountry,
  setSelectedCountry,
  sortedCountries,
}: MobileChapterSectionProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-row w-full justify-center items-center relative z-10 mb-4 bg-card">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            className="w-fit-content justify-start text-xl"
          >
            {selectedCountry ? (
              <><IconMapPin className="w-5 h-5 mr-2" /> {t('selectedCountryMap.' + selectedCountry)}</>
            ) : (
              <>{t('chaptersSection.noContentYet')}</>
            )}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerTitle className="text-center">{t('chaptersSection.selectCity')}</DrawerTitle>
          <DrawerDescription className="text-center">
            {t('chaptersSection.selectCityDescription')}
          </DrawerDescription>
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
