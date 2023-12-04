import { buildPropSection } from "./figma_doc_sections/buildPropSection";
import { buildVarSection } from "./figma_doc_sections/buildVarSection";
import { buildReleaseNotes } from "./figma_doc_sections/buildReleaseNotes";
import {
  buildTitle,
  buildLinkText,
  buildText,
  buildTwoColumns,
  buildListText,
  buildImageFromLocalSource,
  buildImageFromRemoteSource,
} from "./figma_doc_sections/elementBuildingFunctions";
import { buildAutoLayoutFrame, getDefaultElement } from "./utilityFunctions";
import { emit } from "@create-figma-plugin/utilities";

interface ElementData {
  node?: SceneNode;
}

const loadFonts = async () => {
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });
  await figma.loadFontAsync({ family: "Roboto", style: "Bold" });
};

let elementId: string;

export const documentationWidth = 1200;
export const documentationPadding = 20;

const sectionCornerRadius = 8;
const documentationCornerRadius = 12;

function getElement(id: string) {
  const component = figma.getNodeById(id);
  if (component) return component;
}

export default async function documentationBuilder(data: any) {
  const page = figma.currentPage;
  const documentationFrame = buildAutoLayoutFrame(
    "Documentation",
    "VERTICAL",
    documentationPadding,
    documentationPadding,
    40
  );
  emit("DOC_ID", documentationFrame.id);
  //   documentationFrame.resize(documentationWidth, documentationFrame.height);
  //   documentationFrame.fills = [
  //     {
  //       type: "SOLID",
  //       visible: true,
  //       opacity: 1,
  //       blendMode: "NORMAL",
  //       color: {
  //         r: 0.7166666388511658,
  //         g: 0.7166666388511658,
  //         b: 0.7166666388511658,
  //       },
  //       boundVariables: {},
  //     },
  //   ];
  //   documentationFrame.topLeftRadius = documentationCornerRadius;
  //   documentationFrame.topRightRadius = documentationCornerRadius;
  //   documentationFrame.bottomLeftRadius = documentationCornerRadius;
  //   documentationFrame.bottomRightRadius = documentationCornerRadius;
  //   page.appendChild(documentationFrame);
  //
  //   const dataKeys = Object.keys(data).sort((a, b) => Number(a) - Number(b));
  //   const currentElementData: ElementData = {};
  //
  //   await loadFonts();
  //   for (const key of dataKeys) {
  //     const element = data[key];
  //     const sectionFrame = buildAutoLayoutFrame(
  //       element.title,
  //       "VERTICAL",
  //       20,
  //       20,
  //       24
  //     );
  //
  //     sectionFrame.topLeftRadius = sectionCornerRadius;
  //     sectionFrame.topRightRadius = sectionCornerRadius;
  //     sectionFrame.bottomLeftRadius = sectionCornerRadius;
  //     sectionFrame.bottomRightRadius = sectionCornerRadius;
  //
  //     documentationFrame.appendChild(sectionFrame);
  //     sectionFrame.layoutSizingHorizontal = "FILL";
  //     const title = element.title;
  //     if (title) {
  //       const titleFrame = buildTitle(title);
  //       sectionFrame.appendChild(titleFrame);
  //     }
  //
  //     switch (element.datatype) {
  //       case "header":
  //         console.log("element :>> ", element);
  //         elementId = element.element.id;
  //         const selectedNode = getElement(elementId);
  //         if (!selectedNode) return;
  //         currentElementData.node =
  //           //@ts-ignore
  //           getDefaultElement(selectedNode).createInstance();
  //         if (!currentElementData.node) {
  //           figma.closePlugin("Error: No component found for this section.");
  //           return;
  //         }
  //         sectionFrame.appendChild(currentElementData.node);
  //         if (
  //           element.content.firstResource &&
  //           element.content.firstResourceLink
  //         ) {
  //           const firstResource = buildLinkText(
  //             element.content.firstResource,
  //             element.content.firstResourceLink
  //           );
  //           sectionFrame.appendChild(firstResource);
  //         }
  //         if (
  //           element.content.secondResource &&
  //           element.content.secondResourceLink
  //         ) {
  //           const secondResource = buildLinkText(
  //             element.content.secondResource,
  //             element.content.secondResourceLink
  //           );
  //           sectionFrame.appendChild(secondResource);
  //         }
  //         break;
  //
  //       case "link":
  //         const inputs = element.content.sources;
  //         if (!inputs.length) return;
  //         inputs.forEach((input: any) => {
  //           const link = buildLinkText(input.source, input.link);
  //           sectionFrame.appendChild(link);
  //         });
  //         break;
  //
  //       case "element":
  //         if (element.title === "Anatomy") {
  //           console.log("no Anatomy for now");
  //         } else if (element.title === "Spacing") {
  //           console.log("no Spacing for now");
  //         } else if (element.title === "Property") {
  //           buildPropSection(
  //             currentElementData.node as InstanceNode,
  //             sectionFrame
  //           );
  //         } else if (element.title === "Variants") {
  //           buildVarSection(
  //             currentElementData.node as InstanceNode,
  //             sectionFrame
  //           );
  //         } else if (element.title === "Release Notes") {
  //           buildReleaseNotes(sectionFrame);
  //         }
  //         break;
  //
  //       case "text":
  //         const text = element.content;
  //         if (text) {
  //           const textFrame = buildText(text);
  //           sectionFrame.appendChild(textFrame);
  //           textFrame.layoutSizingHorizontal = "FILL";
  //         }
  //         break;
  //
  //       case "two-columns":
  //         buildTwoColumns(element, sectionFrame);
  //         break;
  //
  //       case "list":
  //         const list = element.content.inputs.join("\n");
  //         if (list.length) {
  //           const listFrame = buildListText(list, element.content.listType);
  //           sectionFrame.appendChild(listFrame);
  //           listFrame.layoutSizingHorizontal = "FILL";
  //         }
  //         break;
  //
  //       case "image":
  //         if (
  //           element.content.localFilePath.lenght === 0 &&
  //           element.content.remoteImageLink.lenght === 0
  //         ) {
  //           return;
  //         } else {
  //           if (element.content.localFilePath !== "") {
  //             const imageLink = element.content.localFilePath;
  //             const image = await buildImageFromLocalSource(imageLink);
  //             sectionFrame.appendChild(image);
  //           } else {
  //             const imageLink = element.content.remoteImageLink;
  //             const image = await buildImageFromRemoteSource(imageLink);
  //             sectionFrame.appendChild(image);
  //           }
  //         }
  //         break;
  //       case "video":
  //         const textVideo = element.content.selectedVideoContent.name;
  //         const linkVideo = element.content.selectedVideoContent.video;
  //         if (!textVideo || !linkVideo) return;
  //         const videoFrame = buildLinkText(textVideo, linkVideo);
  //         sectionFrame.appendChild(videoFrame);
  //         //
  //         break;
  //       default:
  //         throw new Error(
  //           "Error: No datatype found for this section. Please check the section data."
  //         );
  //     }
  //
  //     documentationFrame.layoutSizingHorizontal = "HUG";
  //   }
}
