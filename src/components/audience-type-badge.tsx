import { Badge } from "@/components/ui/badge"
import { audienceTypeMap, audienceTypeColorMap } from "@/entities"

export function AudienceTypeBadge({ audienceType }: { audienceType: string }) {
  return (
    <Badge style={{ backgroundColor: audienceTypeColorMap[audienceType as keyof typeof audienceTypeColorMap] }}>
      {audienceTypeMap[audienceType as keyof typeof audienceTypeMap]}
    </Badge>
  );
}