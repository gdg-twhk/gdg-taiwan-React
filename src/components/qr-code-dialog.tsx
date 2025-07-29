import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { QRCodeSVG } from "qrcode.react";
import { useTranslation } from "react-i18next";

interface QRCodeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  url: string;
  chapterName: string;
}

export function QRCodeDialog({ open, onOpenChange, url, chapterName }: QRCodeDialogProps) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {t('qrCodeDialog.title', { chapterName })}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4 p-4">
          <div className="bg-white p-4 rounded-lg">
            <QRCodeSVG
              value={url}
              size={200}
              bgColor="#ffffff"
              fgColor="#000000"
              level="M"
              marginSize={4}
            />
          </div>
          <p className="text-sm text-muted-foreground text-center">
            {t('qrCodeDialog.description')}
          </p>
          <p className="text-xs text-muted-foreground text-center break-all">
            {url}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}