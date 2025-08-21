/* eslint-disable @typescript-eslint/no-explicit-any */
import { emit, on, once, showUI } from "@create-figma-plugin/utilities";
import documentationBuilder from "./figma_functions/documentationBuilder";
import { checkSelection } from "./figma_functions/checkSelection";
import { settingsDataHandler } from "./figma_functions/settingsDataHandler";
import { getNode } from "./figma_functions/getNode";
import { loadAllRequiredFonts } from "./utils/fonts";

import { buildOneSection } from "./figma_functions/buildOneSection";
import handleCanvasColors from "./figma_functions/handleCanvasColors";

export default async function () {
  try {
    await loadAllRequiredFonts();
    await settingsDataHandler();
    let savedData: any = {};

    try {
      const savedDataString = figma.root.getSharedPluginData(
        "guide_lite",
        "saved_data"
      );
      if (savedDataString) savedData = JSON.parse(savedDataString);
      if (Object.keys(savedData).length) {
        const savedDataArray = convertToArray(savedData);
        emit("SAVED_DATA", savedDataArray);
      }
    } catch (error) {
      console.log("error", error);
    }

    const selectionData = await checkSelection();
    if (selectionData) emit("SELECTION", selectionData);

    on("GET_SELECTION", async () => {
      const selectionData = await checkSelection();
      if (selectionData) emit("SELECTION", selectionData);
    });

    on("CLOSE", () => {
      figma.closePlugin();
    });

    on("UPDATE_APP_SETTINGS", async (data) => {
      figma.clientStorage.setAsync("appSettings", data);
      handleCanvasColors(data);
    });

    on("CLEAR_SELECTION", () => {
      figma.currentPage.selection = [];
    });

    on("GET_NEW_SELECTION", async (key, id) => {
      if (key) {
        const foundElement = await getNode(id, key);
        if (foundElement) {
          const foundElementName = foundElement.name;
          emit("FOUND_ELEMENT", foundElement, foundElementName, key);
        }
      }
    });

    on("BUILD", async (data, appSettings, template) => {
      try {
        const id = data.nodeId;
        savedData[id] = data;
        const savedDataArray = convertToArray(savedData);
        emit("SAVED_DATA", savedDataArray);
        const savedDataString = JSON.stringify(savedData);
        figma.root.setSharedPluginData(
          "guide_lite",
          "saved_data",
          savedDataString
        );
        await documentationBuilder(
          data,
          loadAllRequiredFonts,
          appSettings,
          template
        );
      } catch (error) {
        console.log("error in documentation build in Figma :>> ", error);
      }
    });

    on(
      "BUILD_ONE_SECTION",
      async ({
        selectedNodeId,
        selectedNodeKey,
        cardType,
        anatomyIndexPosition,
        anatomyIndexSpacing,
        appSettings,
        isInternalSpacing,
        template,
      }) => {
        buildOneSection(
          // loadAllRequiredFonts,
          selectedNodeId,
          selectedNodeKey,
          cardType,
          anatomyIndexPosition,
          anatomyIndexSpacing,
          appSettings,
          isInternalSpacing,
          template
        );
      }
    );

    on("DELETE_DOCUMENTATION", async (data) => {
      delete savedData[data];
      const savedDataArray = convertToArray(savedData);
      emit("SAVED_DATA", savedDataArray);
      const savedDataString = JSON.stringify(savedData);
      figma.root.setSharedPluginData(
        "guide_lite",
        "saved_data",
        savedDataString
      );
    });

    figma.on("selectionchange", async () => {
      const selectionData = await checkSelection();
      if (selectionData) {
        emit("CHANGED_SELECTION", selectionData);
      } else {
        emit("CHANGED_SELECTION", null);
      }
    });

    once("CLOSE", () => {
      figma.closePlugin("☠️ ☠ ️☠️");
    });
  } catch (error) {
    console.error("Plugin initialization failed:", error);
    figma.closePlugin("Failed to load required fonts");
    return;
  }
}

showUI({
  height: 720,
  width: 640,
});
function convertToArray(savedData: any) {
  const savedDataArray = [];
  for (const key in savedData) {
    savedDataArray.push(savedData[key]);
  }
  return savedDataArray;
}
