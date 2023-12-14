import { emit, on, once, showUI } from "@create-figma-plugin/utilities";
import documentationBuilder from "./figma_functions/documentationBuilder";
// import { tempData } from "./tempData";
import { checkSelection } from "./figma_functions/checkSelection";
import { tokenHandler } from "./figma_functions/tokenHandler";

export default async function () {
  await tokenHandler();

  const email = await figma.clientStorage.getAsync("email");
  if (email) emit("USER_EMAIL", email);

  const user = figma.currentUser;
  emit("USER", user);

  const currentSelection = checkSelection();
  if (currentSelection) emit("SELECTION", currentSelection);

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
    console.log("selectionData :>> ", selectionData);
    if (selectionData) emit("SELECTION", selectionData);
  });

  //! maybe change originalObj structure???
  function convertFormat(originalObj: any) {
    const newObj: any = {};
    for (const key in originalObj) {
      newObj._id = key;
      newObj.docs = Object.values(originalObj[key]);
    }
    return newObj;
  }

  on("CLEAR_SELECTION", () => {
    figma.currentPage.selection = [];
  });

  once("BUILD", async (data, elementId) => {
    //----building documentation on canvas------//
    try {
      await documentationBuilder(data);
      console.log("data :>> ", data);
    } catch (error) {
      console.log("error on documentation build in Figma :>> ", error);
    }
    //--building documentation for db--------//
    try {
      const elementData: any = {};
      elementData[elementId] = data;
      const newTempData = convertFormat(elementData);
      console.log("newTempData(converted) :>> ", newTempData);
      emit("UPDATE_GIT", newTempData);
      //!---------------------------------------------//
      // data from saved object
      // documentationBuilder(tempData);
      // const newTempData = convertFormat(tempData);
      // console.log("newTempData(converted) :>> ", newTempData);
      // emit("UPDATE_GIT", newTempData);
      //!---------------------------------------------//
    } catch (error) {
      console.log("error on JSON data generation :>> ", error);
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
