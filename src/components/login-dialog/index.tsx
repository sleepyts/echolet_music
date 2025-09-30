import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LogIn } from "lucide-react";
import { useModal } from "./use-modal";
import { t } from "i18next";

export function LoginDialog() {
  const { qrKey, qrBase64, generateQr } = useModal();
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="ghost" onClick={generateQr}>
            <span>{t("click-to-login")}</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t("login-dialog.title")}</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center">
            <img src={qrBase64} alt="qr code" />
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}
