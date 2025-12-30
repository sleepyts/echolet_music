import i18n from "@/i18n";
import { SearchType } from "./types";

export namespace AppConstMap {
  export const SearchTypeToText = {
    // [SearchType.Comprehensive]: {
    //   text: i18n.t("search-type.comprehensive"),
    //   priority: 1,
    // },
    [SearchType.Track]: { text: i18n.t("search-type.track"), priority: 2 },
    [SearchType.Artist]: { text: i18n.t("search-type.artist"), priority: 3 },
    [SearchType.Album]: { text: i18n.t("search-type.album"), priority: 4 },
    [SearchType.Playlist]: {
      text: i18n.t("search-type.playlist"),
      priority: 5,
    },
    // [SearchType.MV]: i18n.t("search-type.mv"),
    // [SearchType.Video]: i18n.t("search-type.video"),
    [SearchType.User]: { text: i18n.t("search-type.user"), priority: 6 },
    // [SearchType.Lyric]: i18n.t("search-type.lyric"),
    // [SearchType.Voice]: i18n.t("search-type.voice"),
  };
}
