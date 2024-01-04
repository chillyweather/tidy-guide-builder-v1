import {
  buildAutoLayoutFrame,
  setTextProps,
  setVariantProps,
  turnAllBooleansOn,
  setColorStyle,
} from "../figma_functions/utilityFunctions";
import buildTags from "./buildTags";

export const TGGray100 = setColorStyle("TG-admin/gray/gray-100", "F5F5F5");
export const TGGray600 = setColorStyle("TG-admin/gray/gray-600", "707070");

export async function buildAtomTags(
  element: InstanceNode,
  booleanProperties: any,
  elementSizes: string[],
  variantProperties: any,
  labelComponent: ComponentNode,
  tagComponentSet: ComponentSetNode | undefined
) {
  const tagGroups: FrameNode[] = [];

  const isToSplit =
    element.children &&
    element.children.length > 1 &&
    element.children.every(
      (child) => !child.name.toLowerCase().startsWith("min")
    ) &&
    element.layoutMode === "VERTICAL";

  if (elementSizes) {
    elementSizes.forEach((size) => {
      const propNames = Object.keys(variantProperties);
      const sizeProp = propNames.find(
        (propName) => propName.toLowerCase() === "size"
      );
      if (sizeProp) {
        setVariantProps(element, sizeProp, size);
      }
      const tagGroup = buildOneTag(
        element,
        booleanProperties,
        tagComponentSet,
        labelComponent,
        size
      );
      tagGroups.push(tagGroup);
    });
  } else {
    const tagGroup = buildOneTag(element, booleanProperties, tagComponentSet);
    tagGroups.push(tagGroup);
  }
  return tagGroups;
}

function buildOneTag(
  element: InstanceNode,
  booleanProperties: any,
  tagComponentSet: ComponentSetNode | undefined,
  labelComponent?: ComponentNode,
  size?: string
) {
  const resultFrame = buildAutoLayoutFrame("tagFrame", "HORIZONTAL", 20, 0);
  const group = buildElementTags(element, booleanProperties, tagComponentSet);
  resultFrame.appendChild(group);
  resultFrame.paddingBottom = 40;
  resultFrame.paddingTop = 40;
  resultFrame.counterAxisAlignItems = "CENTER";
  if (labelComponent) {
    const title = setTitlePosition(
      labelComponent.createInstance(),
      resultFrame
    );
    if (title.children[0] && title.children[0].type === "TEXT")
      title.children[0].fillStyleId = TGGray600.id;
    setVariantProps(title, "font", "regular");
    setTextProps(title, "text", `Size - ${size?.toUpperCase()}`);
  }
  return resultFrame;
}

//! ⬇⬇⬇ here changes ⬇⬇⬇
function buildOneSplitAnatomyTag(
  group: GroupNode,
  labelComponent?: ComponentNode
) {
  const resultFrame = buildAutoLayoutFrame("tagFrame", "HORIZONTAL", 160, 0);
  resultFrame.appendChild(group);
  resultFrame.fillStyleId = TGGray100.id;
  resultFrame.paddingBottom = 40;
  resultFrame.paddingTop = 40;
  resultFrame.counterAxisAlignItems = "CENTER";
  if (labelComponent) {
    const title = setTitlePosition(
      labelComponent.createInstance(),
      resultFrame
    );
    if (title.children[0] && title.children[0].type === "TEXT")
      title.children[0].fillStyleId = TGGray600.id;
    setVariantProps(title, "font", "regular");
    setTextProps(title, "text", `${group.name.split("-t")[0]}`);
  }
  return resultFrame;
}
//! ⬆⬆⬆ here change ⬆⬆⬆

function setTitlePosition(title: InstanceNode, frame: FrameNode) {
  frame.appendChild(title);
  title.layoutPositioning = "ABSOLUTE";
  title.x = 16;
  title.y = 8;
  return title;
}

function buildElementTags(
  element: InstanceNode,
  booleanProperties: any,
  tagComponentSet: ComponentSetNode | undefined
) {
  const currentAtom = element.clone();
  turnAllBooleansOn(currentAtom, booleanProperties);
  const tagBuildResults = buildTags(
    tagComponentSet,
    currentAtom,
    "A",
    "auto",
    true,
    true
  );
  if (!tagBuildResults) return currentAtom;
  const tagElements = tagBuildResults.tagElements;
  const indexes = tagBuildResults.indexes;
  const tagGroup = figma.group(
    [currentAtom, ...tagElements],
    figma.currentPage
  );
  tagGroup.name = `${element.name}-with-tags`;
  const tagAutoLayoutFrame = buildAutoLayoutFrame(
    "tagAutoLayoutFrame",
    "HORIZONTAL",
    20,
    20,
    12
  );
  tagAutoLayoutFrame.appendChild(indexes);
  tagAutoLayoutFrame.appendChild(tagGroup);
  return tagAutoLayoutFrame;
}
