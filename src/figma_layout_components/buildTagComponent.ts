// import { setColorStyle } from "../figma_functions/utilityFunctions";
import { buildTag } from "./buildTag";

// export const dsWhite = setColorStyle(".TG-admin/White", "FFFFFF");
// export const dsGray900 = setColorStyle(".TG-admin/gray/gray-900", "292929");
//
// export const dsBlueGray = setColorStyle(".TG-admin/BlueGray", "617C9F");

export default async function buildAllTags() {
  const tagBottomLine = await buildTag("A", "bottom");
  tagBottomLine!.name = "type=bottom line";
  const tagTopLine = await buildTag("B", "top");
  tagTopLine!.name = "type=top line";
  const tagLeftLine = await buildTag("C", "left");
  tagLeftLine!.name = "type=left line";
  const tagRightLine = await buildTag("D", "right");
  tagRightLine!.name = "type=right line";
  const tagIndex = await buildTag("E", "index");
  tagIndex!.name = "type=index only";
  const tagText = await buildTag("F", "text", "Text");
  tagText!.name = "type=text";
  const tagImportant = await buildTag("!", "important", "Text");
  tagImportant!.name = "type=important";
  const tagInfo = await buildTag("»", "info", "Text");
  tagInfo!.name = "type=info";
  const tagSize = await buildTag("", "size", "Text", false);
  tagSize!.name = "type=size";
  const tagCornerRadius = await buildTag("", "cornerRadius", "Text", false);
  tagCornerRadius!.name = "type=cornerRadius";

  const tags = [
    tagTopLine,
    tagRightLine,
    tagBottomLine,
    tagLeftLine,
    tagIndex,
    tagText,
    tagImportant,
    tagInfo,
    tagSize,
    tagCornerRadius,
  ];

  const tagComponentSet = figma.combineAsVariants(
    tags as ComponentNode[],
    figma.currentPage
  );
  if (!tags.length) return;
  tagComponentSet.name = ".DS anatomy tags";
  tagComponentSet.layoutPositioning = "AUTO";
  tagComponentSet.layoutMode = "VERTICAL";
  tagComponentSet.itemSpacing = 20;
  tagComponentSet.fills = [
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
  tagComponentSet.paddingBottom = 20;
  tagComponentSet.paddingTop = 20;
  tagComponentSet.paddingLeft = 20;
  tagComponentSet.paddingRight = 20;
  tagComponentSet.cornerRadius = 28;
  tagComponentSet.resize(372, tagComponentSet.height);

  return tagComponentSet;
}
