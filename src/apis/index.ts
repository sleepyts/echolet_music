import ky, { HTTPError, type Options } from "ky";
import { toast } from "sonner";

// 公共配置
const baseOptions: Options = {
  prefixUrl: process.env.APP_BASE_URL,
  retry: {
    limit: 0,
  },
  searchParams: {
    proxy: process.env.APP_PROXY_URL || undefined,
    // 本地开发时 cookie domain属性无法设置，手动携带
    cookie: import.meta.env.DEV
      ? encodeURIComponent(
          "MUSIC_U=008D5F44EAD68FC994DD013F8FD0C1B060EA23EB3C9DF489C176C06FAE9C54483C7F0F9CD6A7ABEA629E907BBF06C3724CCFC701F00FFC3DE961DEE21B7C78169E6BF92892C42F2C11D1364A88002D5B5F6C67EEB59BE043D010C11D13F7C5D448D00183E37218E6EDF31E6E6724A1D4E01CDDD7BCE1B4517E3BF04D40EFF16D259890D4E0B7C3153CAC47961F4D0CACB04053584DCC661197F72A52CE622570B24368F4967CAC631401BBFE6AA400CBD4F47DCBAFC242BEC7EBA6F7D9F7CB54D3A55E787A8007C295E018D3887FECD7F3C7FCBEDA70A93A4B1C7237CE1D13BF84F44DF4DEE3723C42B7B57ED7B62F1C1E63E7D0602FEC30C09A2C657103FC7C63B9EFB635D8B0D4ED46464B84CE78BAF076C31CFE81058B86261ACE8732EF42ACFB1FCD558F1780CB07F5753C6DB49398"
        )
      : undefined,
  },
  hooks: {
    beforeRequest: [(request, options) => {}],
    afterResponse: [
      async (request, options, response) => {
        return response;
      },
    ],
    beforeError: [
      (error: HTTPError) => {
        console.log(error);
        toast.error("接口调用出错", { position: "top-right" });
        return error;
      },
    ],
  },
  credentials: "include",
};

export const http = ky.create(baseOptions);
