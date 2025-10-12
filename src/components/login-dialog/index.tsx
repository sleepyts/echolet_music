import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useModal } from "./use-modal";
import { t } from "i18next";

export function LoginDialog() {
  const { qrBase64, generateQr } = useModal();
  return (
    <Dialog>
      <DialogTrigger>
        <span>{t("click-to-login")}</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("login-dialog.title")}</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center">
          <img src={qrBase64} alt="qr code" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
