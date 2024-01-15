import { emit, on, once, showUI } from "@create-figma-plugin/utilities";
import documentationBuilder from "./figma_functions/documentationBuilder";
// import { tempData } from "./tempData";
import { checkSelection } from "./figma_functions/checkSelection";
import { tokenHandler } from "./figma_functions/tokenHandler";
import { findElement } from "./figma_functions/findElement";
import imageFromFigma from "./figma_functions/imageFromFigma";

//! time check
const time = new Date().getTime();
if (time > 1709244000000) {
  figma.closePlugin(
    "this version of plugin is no longer supported, please download it from the Figma Community"
  );
}
//! ----------

const loadFonts = async () => {
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });
  await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
  await figma.loadFontAsync({ family: "Inter", style: "Medium" });
};

export default async function () {
  await tokenHandler();

  const email = await figma.clientStorage.getAsync("email");
  if (email) emit("USER_EMAIL", email);

  const user = figma.currentUser;
  const document = figma.root.name;
  const page = figma.currentPage.name;

  const sessionData = {
    user: user,
    document: document,
    page: page,
  };

  emit("SESSION", sessionData);

  const selectionData = checkSelection();
  if (selectionData) emit("SELECTION", selectionData);

  once("SAVE_NEW_TOKEN", (token) => {
    tokenHandler(token);
  });
  once("SAVE_USER_EMAIL", (email) => {
    figma.clientStorage.setAsync("email", email);
  });

  on("LOGOUT", async () => {
    figma.clientStorage.deleteAsync("token");
  });

  on("GET_SELECTION", async () => {
    const selectionData = checkSelection();
    if (selectionData) emit("SELECTION", selectionData);
  });

  on("CLOSE", () => {
    figma.closePlugin();
  });

  on("PIC_FROM_FIGMA", async ({ type, key, nodeId }) => {
    imageFromFigma(loadFonts, type, key, nodeId);
  });

  on("CLEAR_SELECTION", () => {
    figma.currentPage.selection = [];
  });

  on("GET_NEW_SELECTION", async (key, id) => {
    const foundElement = await findElement(key, id);
    if (foundElement) {
      const foundElementName = foundElement.name;
      emit("FOUND_ELEMENT", foundElement, foundElementName, key);
    }
  });

  on("BUILD", async (data, elementId) => {
    //!----building documentation on canvas----//
    try {
      console.log("data in main", data);
      await documentationBuilder(data, loadFonts);
    } catch (error) {
      console.log("error on documentation build in Figma :>> ", error);
    }
  });

  once("CLOSE", () => {
    figma.closePlugin();
  });
}

showUI({
  height: 720,
  width: 640,
});
