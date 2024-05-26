/* eslint-disable @typescript-eslint/no-explicit-any */
import { emit } from "@create-figma-plugin/utilities";

export async function settingsDataHandler() {
  const currentSettings: any =
    await figma.clientStorage.getAsync("appSettings");
  console.log("currentSettings2", currentSettings);
  if (currentSettings) {
    emit("SETTINGS", currentSettings);
  }
}
