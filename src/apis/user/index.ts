import { http } from "..";
import type { AccountInfoResp } from "../modal";

const generateQrKey = () => {
  return http.get("login/qr/key", {}).json();
};

const generateQr = (key: string) => {
  return http
    .get("login/qr/create", {
      searchParams: {
        key,
        qrimg: true,
        timestamp: Date.now(),
      },
    })
    .json();
};
const refreshLoginStatus = () => {
  return http
    .get("login/refresh", {
      searchParams: {
        timestamp: Date.now(),
      },
    })
    .json();
};

const getCurrentUserInfo = () => {
  return http
    .get<AccountInfoResp>("user/account", {
      searchParams: {
        timestamp: Date.now(),
      },
    })
    .json();
};

export const UserApis = {
  generateQrKey,
  refreshLoginStatus,
  generateQr,
  getCurrentUserInfo,
};
