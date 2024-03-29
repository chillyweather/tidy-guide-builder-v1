/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  buildAutoLayoutFrame,
  setTextProps,
  setVariantProps,
  turnAllBooleansOn,
  setColorStyle,
} from "../figma_functions/utilityFunctions";
import buildTags from "./buildTags";

export async function buildAtomTags(
  element: InstanceNode,
  booleanProperties: any,
  elementSizes: string[],
  variantProperties: any,
  labelComponent: ComponentNode,
  tagComponentSet: ComponentSetNode | undefined
) {
  const tagGroups: FrameNode[] = [];

  if (elementSizes) {
    for (const size of elementSizes) {
      const propNames = Object.keys(variantProperties);
      const sizeProp = propNames.find(
        (propName) => propName.toLowerCase() === "size"
      );
      if (sizeProp) {
        setVariantProps(element, sizeProp, size);
      }
      const tagGroup = await buildOneTag(
        element,
        booleanProperties,
        tagComponentSet,
        labelComponent,
        size
      );

      tagGroups.push(tagGroup);
    }
  } else {
    const tagGroup = await buildOneTag(
      element,
      booleanProperties,
      tagComponentSet
    );
    tagGroups.push(tagGroup);
  }
  return tagGroups;
}

async function buildOneTag(
  element: InstanceNode,
  booleanProperties: any,
  tagComponentSet: ComponentSetNode | undefined,
  labelComponent?: ComponentNode,
  size?: string
) {
  const TGGray600 = await setColorStyle(
    ".TG-admin/anatomy-secondary",
    "707070"
  );

  const resultFrame = buildAutoLayoutFrame("tagFrame", "HORIZONTAL", 20, 0);
  const group = await buildElementTags(
    element,
    booleanProperties,
    tagComponentSet
  );

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
      await title.children[0].setFillStyleIdAsync(TGGray600.id);
    setVariantProps(title, "font", "regular");
    setTextProps(title, "text", `Size - ${size?.toUpperCase()}`);
  }
  return resultFrame;
}

function setTitlePosition(title: InstanceNode, frame: FrameNode) {
  frame.appendChild(title);
  title.layoutPositioning = "ABSOLUTE";
  title.x = 16;
  title.y = 8;
  return title;
}

async function buildElementTags(
  element: InstanceNode,
  booleanProperties: any,
  tagComponentSet: ComponentSetNode | undefined
) {
  const currentAtom = element.clone();
  turnAllBooleansOn(currentAtom, booleanProperties);

  const tagBuildResults = await buildTags(
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
