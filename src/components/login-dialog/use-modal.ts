import { UserApis } from "@/apis/user";
import { useMount } from "ahooks";
import { useState } from "react";

export const useModal = () => {
  const [qrKey, setQrKey] = useState("");
  const [qrBase64, setQrBase64] = useState("");

  const generateQr = () => {
    UserApis.generateQrKey().then((res: any) => {
      setQrKey(res.data.unikey);

      UserApis.generateQr(res.data.unikey).then((res: any) => {
        setQrBase64(res.data.qrimg);
      });
    });
  };

  return {
    qrKey,
    qrBase64,
    generateQr,
  };
};
