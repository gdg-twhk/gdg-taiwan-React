import { Badge } from "@/components/ui/badge"
import { audienceTypeColorMap } from "@/entities"
import { useTranslation } from "react-i18next";

export function AudienceTypeBadge({ audienceType }: { audienceType: string }) {
  const { t } = useTranslation();
  
  const audienceTypeMap = {
    "Virtual": t('audienceTypeMap.Virtual'),
    "In-person": t('audienceTypeMap.In-person'),
    "Hybrid": t('audienceTypeMap.Hybrid')
}
  return (
    <Badge style={{ backgroundColor: audienceTypeColorMap[audienceType as keyof typeof audienceTypeColorMap] }}>
      {audienceTypeMap[audienceType as keyof typeof audienceTypeMap]}
    </Badge>
  );
}