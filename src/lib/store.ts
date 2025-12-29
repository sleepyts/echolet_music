import { Store as TauriStore } from "@tauri-apps/plugin-store";
export const appStore = await TauriStore.load("store.echolet_music");
