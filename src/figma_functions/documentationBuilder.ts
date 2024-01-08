import { buildPropSection } from "../figma_doc_sections/buildPropSection";
import { buildVarSection } from "../figma_doc_sections/buildVarSection";
import { buildAnatomySection } from "../figma_doc_sections/buildAnatomySection";
import { buildReleaseNotes } from "../figma_doc_sections/buildReleaseNotes";
import { buildSpacingSection } from "src/figma_doc_sections/buildSpacingSection";
import {
  buildTitle,
  buildLinkText,
  buildText,
  buildTwoColumns,
  buildListText,
  buildImageFromRemoteSource,
} from "../figma_doc_sections/elementBuildingFunctions";
import { buildAutoLayoutFrame, getDefaultElement } from "./utilityFunctions";
import { getNode } from "./getNode";

interface ElementData {
  node?: SceneNode;
}

// const loadFonts = async () => {
//   await figma.loadFontAsync({ family: "Inter", style: "Regular" });
//   await figma.loadFontAsync({ family: "Inter", style: "Bold" });
//   await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
//   await figma.loadFontAsync({ family: "Inter", style: "Medium" });
// };

let elementId: string;

export const documentationWidth = 1200;
export const documentationPadding = 20;

const sectionCornerRadius = 8;
const documentationCornerRadius = 12;

function getElement(id: string) {
  const component = figma.getNodeById(id);
  if (component) return component;
}

export default async function documentationBuilder(
  data: any,
  loadFonts: Function
) {
  const page = figma.currentPage;
  const node = await getNode(data.nodeId, data._id);
  if (!node) return;

  const defaultElement = getDefaultElement(node);
  if (!defaultElement) return;

  const documentationFrame = buildAutoLayoutFrame(
    "Documentation",
    "VERTICAL",
    50,
    60,
    40
  );
  const divider = figma.createRectangle();
  divider.name = "divider";
  divider.resize(documentationWidth, 1.5);

  documentationFrame.resize(documentationWidth, documentationFrame.height);
  documentationFrame.fills = [
    {
      type: "SOLID",
      visible: true,
      opacity: 1,
      blendMode: "NORMAL",
      color: {
        r: 1,
        g: 1,
        b: 1,
      },
      boundVariables: {},
    },
  ];
  documentationFrame.topLeftRadius = documentationCornerRadius;
  documentationFrame.topRightRadius = documentationCornerRadius;
  documentationFrame.bottomLeftRadius = documentationCornerRadius;
  documentationFrame.bottomRightRadius = documentationCornerRadius;
  page.appendChild(documentationFrame);

  const elements = data.docs;

  const currentElementData: ElementData = {};

  await loadFonts();

  function buildSectionFrame() {
    const sectionFrame = buildAutoLayoutFrame(
      "sectionFrame",
      "VERTICAL",
      20,
      20,
      24
    );

    sectionFrame.topLeftRadius = sectionCornerRadius;
    sectionFrame.topRightRadius = sectionCornerRadius;
    sectionFrame.bottomLeftRadius = sectionCornerRadius;
    sectionFrame.bottomRightRadius = sectionCornerRadius;

    documentationFrame.appendChild(sectionFrame);
    documentationFrame.appendChild(divider.clone());
    sectionFrame.layoutSizingHorizontal = "FILL";
    return sectionFrame;
  }

  const headerSectionFrame = buildSectionFrame();
  const title = buildTitle(data.title);
  const currentNode = defaultElement.createInstance();
  headerSectionFrame.appendChild(title);
  headerSectionFrame.appendChild(currentNode);

  for (const element of elements) {
    const sectionFrame = buildSectionFrame();
    const title = element.title;
    if (title) {
      const titleFrame = buildTitle(title);
      sectionFrame.appendChild(titleFrame);
    }
    const content = element.content;

    switch (element.datatype) {
      case "link":
        const inputs = content.sources;
        if (!inputs.length) return;
        inputs.forEach((input: any) => {
          const link = buildLinkText(input.source, input.link);
          sectionFrame.appendChild(link);
        });
        break;

      case "anatomy":
        buildAnatomySection(currentNode, sectionFrame);
        break;

      case "spacing":
        buildSpacingSection(currentNode, sectionFrame);
        break;

      case "property":
        buildPropSection(currentNode, sectionFrame);
        break;

      case "variants":
        buildVarSection(currentNode, sectionFrame);
        break;

      case "release-notes":
        buildReleaseNotes(sectionFrame);
        break;

      case "text":
        const text = element.text;
        if (text) {
          const textFrame = buildText(text);
          sectionFrame.appendChild(textFrame);
          textFrame.layoutSizingHorizontal = "FILL";
        }
        break;

      case "two-columns":
        buildTwoColumns(element, sectionFrame);
        break;

      case "list":
        const list = content.inputs.join("\n");
        if (list.length) {
          const listFrame = buildListText(list, content.listType);
          sectionFrame.appendChild(listFrame);
          listFrame.layoutSizingHorizontal = "FILL";
        }
        break;

      case "image":
        if (content.remoteImageLink.lenght === 0) {
          return;
        } else {
          const imageLink = content.remoteImageLink;
          const image = await buildImageFromRemoteSource(imageLink);
          sectionFrame.appendChild(image);
        }
        break;

      case "video":
        const videoDataElements = content.videoDataElements;
        for (const videoDataElement of videoDataElements) {
          const textVideo = videoDataElement.name;
          const linkVideo = videoDataElement.video;
          if (!textVideo || !linkVideo) return;
          const videoFrame = buildLinkText(textVideo, linkVideo);
          sectionFrame.appendChild(videoFrame);
        }
        break;
      default:
        throw new Error(
          "Error: No datatype found for this section. Please check the section data."
        );
    }
    documentationFrame.layoutSizingHorizontal = "HUG";
  }

  //resize documentation title
  const docTitle = documentationFrame.findOne((node) => node.name === "title");
  if (!docTitle || docTitle.type !== "FRAME") return;
  const titleText = docTitle.children[0] as TextNode;
  titleText.fontSize = 70;

  const dividers = documentationFrame.findAll(
    (node) => node.name === "divider"
  );
  dividers.forEach((divider) => {
    if (divider.type === "RECTANGLE") {
      divider.layoutAlign = "STRETCH";
    }
  });
  divider.remove();
}
