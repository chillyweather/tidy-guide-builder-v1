/* eslint-disable @typescript-eslint/no-explicit-any */
import { computeMaximumBounds } from "@create-figma-plugin/utilities";
import { buildIndexesFrame } from "./tns_subFunctions";
import {
  findAllNodes,
  elementsCoordinatesAndDimensions,
  // getTagInstance,
} from "./tagBuilgingFunctions";
import { buildTagElements } from "./buildTagElements";
import { setVariantProps } from "./utilityFunctions";
import { getEffects } from "./getEffects";
import { setTextContent } from "./utilityFunctions";

export default async function buildTags(
  tagComponent: ComponentSetNode | undefined,
  frame: any,
  instances: any,
  textElements: any,
  elementMaxWidth?: number,
) {
  if (!tagComponent) return;

  const links = tagComponent.findAll((node) => node.name === "link");
  links.forEach((link) => {
    link.visible = false;
  });
  const abc = "abcdefghijklmnopqrstuvwxyz0123456789♠♣♥♦●■▲▼○□◆◇◊★☆";
  const minSizeProperty = frame.minWidth ? frame.minWidth : null;

  const tagElements: any[] = [];

  elementsCoordinatesAndDimensions.length = 0;

  await findAllNodes(frame, instances, textElements);

  const indexes = buildIndexesFrame(frame);

  //! sort by elementX value
  //! need to implement better sorting

  //data for tag placement
  interface FrameData {
    width: number;
    height: number;
    x: number;
    y: number;
  }

  const frameData: FrameData = {
    width: frame.width,
    height: frame.height,
    x: frame.absoluteBoundingBox.x,
    y: frame.absoluteBoundingBox.y,
  };

  function getDistances(dot: any, rectangle: FrameData) {
    const bottomDistance = rectangle.y + rectangle.height - (dot[1] + dot[3]);
    const topDistance = dot[1] - rectangle.y;
    const leftDistance = dot[0] - rectangle.x;
    const rightDistance = rectangle.x + rectangle.width - (dot[0] + dot[2]);

    const distances = {
      top: topDistance,
      bottom: bottomDistance,
      left: leftDistance,
      right: rightDistance,
    };

    return distances;
  }

  function getPriority(dot: any, rectangle: FrameData) {
    const distances = getDistances(dot, rectangle);

    const verticalMinimum = Math.min(distances.top, distances.bottom);
    const horizontalMinimum = Math.min(distances.left, distances.right);

    const firstPriority = Math.min(verticalMinimum, horizontalMinimum);
    const secondPriority = (verticalMinimum + horizontalMinimum) / 2;

    return [firstPriority, secondPriority];
  }

  //elements with same distance from the edge sorted by
  //distance to the edge on other axis
  elementsCoordinatesAndDimensions.sort((a, b) => {
    const prioritiesA = getPriority(a, frameData);
    const prioritiesB = getPriority(b, frameData);
    if (prioritiesA[0] === prioritiesB[0]) {
      return prioritiesA[1] - prioritiesB[1];
    }
    return prioritiesA[0] - prioritiesB[0];
  });

  elementsCoordinatesAndDimensions.forEach((element, index) => {
    const distances = getDistances(element, frameData);
    const [
      elementX,
      elementY,
      elementWidth,
      elementHeight,
      elementName,
      elementStyleName,
      elementFontName,
      elementFontSize,
    ]: [number, number, number, number, string, string, FontName, number] =
      element;

    const tag = buildTagElements(
      tagComponent,
      frame,
      elementX,
      elementY,
      elementWidth,
      elementHeight,
      distances,
    );

    const indexWithLabelComp = tagComponent.findOne(
      (node) => node.name === "type=text" && node.type === "COMPONENT",
    );
    if (!indexWithLabelComp || indexWithLabelComp.type !== "COMPONENT") return;

    const indexWithLabel = indexWithLabelComp.createInstance();
    indexes.appendChild(indexWithLabel);

    setTextContent(tag, "elementIndex", `${abc[index]}`);
    setTextContent(indexWithLabel, "elementIndex", `${abc[index]}`);

    if (elementStyleName && elementFontName && elementFontSize) {
      setTextContent(
        indexWithLabel,
        "Text",
        `${elementName}, ${elementStyleName} (${elementFontName.family} ${elementFontName.style} - ${elementFontSize}px)`,
      );
    } else {
      setTextContent(indexWithLabel, "Text", elementName);
    }

    if (elementName === "Icon") {
      setTextContent(indexWithLabel, "Text", `Icon - ${elementWidth}px`);
    }
    tag.name = `.tag`;
    indexWithLabel.name = `.${abc[index]}_${elementName}`;
    tagElements.push(tag);
  });

  if (minSizeProperty) addMinWidthIndex(minSizeProperty, tagComponent, indexes);

  if (elementMaxWidth && elementMaxWidth > 0)
    addMaxWidth(frame, tagComponent, indexes, elementMaxWidth);
  addBorderRadius(frame, tagComponent, indexes);
  addEffectsInfo(frame, tagComponent, indexes);
  //! error here
  addStrokeInfo(frame, tagComponent, indexes);

  //! find size of all tags (and frame) together
  const tagBounds = computeMaximumBounds(tagElements);

  const yLimit =
    tagBounds[1].y > frame.absoluteBoundingBox.y + frame.height
      ? tagBounds[1].y
      : frame.absoluteBoundingBox.y + frame.height;
  indexes.y = yLimit + 52;

  tagElements.push(indexes);
  indexes.children.forEach((child) => {
    if (child.type === "INSTANCE") {
      makeLabelTextFlow(child);
    }
  });

  return { tagElements, indexes };
}

function addMinWidthIndex(
  minSize: number,
  tagComponent: ComponentSetNode,
  indexes: FrameNode,
) {
  const indexWithLabelComponent = tagComponent.findOne(
    (node) => node.name === "type=size" && node.type === "COMPONENT",
  );
  if (!indexWithLabelComponent || indexWithLabelComponent.type !== "COMPONENT")
    return;
  const indexWithLabel = indexWithLabelComponent.createInstance();

  indexes.appendChild(indexWithLabel);

  setVariantProps(indexWithLabel, "type", "size");
  if (minSize) {
    setTextContent(indexWithLabel, "Text", `Minimal width - ${minSize}px`);
  } else {
    setTextContent(indexWithLabel, "Text", `Minimal width - Not determined`);
  }
}

function addEffectsInfo(
  frame: any,
  tagComponent: ComponentSetNode,
  indexes: FrameNode,
) {
  const effects: any = getEffects(frame);
  if (!effects) return;

  const tag = tagComponent.findOne((node) => node.name === "type=info");
  if (!(tag && tag.type === "COMPONENT")) return;
  const effectNames = Object.keys(effects);
  effectNames.forEach((effectName) => {
    const indexInfo = tag.createInstance();
    indexInfo.name = `.${effectName}`;
    setTextContent(indexInfo, "Text", `${effects[effectName]}`);
    const indexLink = indexInfo.findOne((node) => node.name === "link");
    if (indexLink) indexLink.visible = false;
    if (effectName === "innerShadow" || effectName === "dropShadow") {
      indexInfo.counterAxisAlignItems = "MIN";
      const indexText = indexInfo.findOne((node) => node.name === "Text");
      if (!(indexText && indexText.type === "TEXT")) return;
      indexText.paragraphSpacing = 3;
    }
    indexes.appendChild(indexInfo);
  });
}

function addBorderRadius(
  frame: any,
  tagComponent: ComponentSetNode,
  indexes: FrameNode,
) {
  if (frame.cornerRadius !== 0) {
    const tag = tagComponent.findOne(
      (node) => node.name === "type=cornerRadius",
    );
    if (!(tag && tag.type === "COMPONENT")) return;
    if (frame.cornerRadius !== figma.mixed) {
      const indexInfo = tag.createInstance();
      indexInfo.name = ".corner-radius";
      const cornerRadius = frame.cornerRadius;
      if (indexInfo.children[1].type === "TEXT") {
        indexInfo.children[1].characters = `Border radius - ${cornerRadius}px`;
        indexes.appendChild(indexInfo);
      }
      return;
    } else if (frame.cornerRadius === figma.mixed) {
      const ltRadiusIndex = tag.createInstance();
      const rtRadiusIndex = tag.createInstance();
      const rbRadiusIndex = tag.createInstance();
      const lbRadiusIndex = tag.createInstance();

      if (ltRadiusIndex.children[1].type === "TEXT")
        ltRadiusIndex.children[1].characters = `Top left corner radius - ${frame.topLeftRadius}px`;
      if (rtRadiusIndex.children[1].type === "TEXT")
        rtRadiusIndex.children[1].characters = `Top right corner radius - ${frame.topRightRadius}px`;
      if (rbRadiusIndex.children[1].type === "TEXT")
        rbRadiusIndex.children[1].characters = `Bottom right corner radius - ${frame.bottomRightRadius}px`;
      if (lbRadiusIndex.children[1].type === "TEXT")
        lbRadiusIndex.children[1].characters = `Bottom left corner radius - ${frame.bottomLeftRadius}px`;

      const cornerIndexes = [
        ltRadiusIndex,
        rtRadiusIndex,
        rbRadiusIndex,
        lbRadiusIndex,
      ];

      cornerIndexes.forEach((node) => {
        indexes.appendChild(node);
      });
      return;
    }
  }
}

function addMaxWidth(
  frame: any,
  tagComponent: ComponentSetNode,
  indexes: FrameNode,
  maxWidth: number,
) {
  if (maxWidth && maxWidth > 0) {
    const foundTagComponent = tagComponent.findOne(
      (node) => node.name === "type=size" && node.type === "COMPONENT",
    );
    if (!foundTagComponent || foundTagComponent.type !== "COMPONENT") return;
    const tag = foundTagComponent.createInstance();

    setTextContent(tag, "Text", `Maximal width - ${maxWidth}px`);
    indexes.appendChild(tag);
  }
}

function addStrokeInfo(
  frame: any,
  tagComp: ComponentSetNode,
  indexes: FrameNode,
) {
  if (frame.strokes && frame.strokes.length > 0) {
    const strokeAlign = frame.strokeAlign;
    let strokeWeight = "";

    if (frame.strokeWeight === figma.mixed) {
      const result: any = {};
      result["Left stroke"] = frame.strokeLeftWeight;
      result["Right stroke"] = frame.strokeRightWeight;
      result["Top stroke"] = frame.strokeTopWeight;
      result["Bottom stroke"] = frame.strokeBottomWeight;

      for (const res in result) {
        if (result[res] > 0) {
          const foundTagComponent = tagComp.findOne(
            (node) => node.name === "type=info" && node.type === "COMPONENT",
          );
          if (!foundTagComponent || foundTagComponent.type !== "COMPONENT")
            return;
          const tag = foundTagComponent.createInstance();
          strokeWeight = result[res];
          setStrokeProps(tag, strokeWeight, strokeAlign, indexes, res);
        }
      }
    } else {
      const foundTagComponent = tagComp.findOne(
        (node) => node.name === "type=info" && node.type === "COMPONENT",
      );
      if (!foundTagComponent || foundTagComponent.type !== "COMPONENT") return;
      const tag = foundTagComponent.createInstance();
      strokeWeight = frame.strokeWeight;
      setStrokeProps(tag, strokeWeight, strokeAlign, indexes, "Stroke");
    }
  }
}

function setStrokeProps(
  tag: any,
  strokeWeight: string,
  strokeAlign: any,
  indexes: FrameNode,
  strokeKind: string,
) {
  setTextContent(
    tag,
    "Text",
    `${strokeKind} - ${strokeWeight}px, ${strokeAlign}`,
  );

  const indexLink = tag.findOne((element: any) => element.name === "link");
  if (indexLink) indexLink.visible = false;
  indexes.appendChild(tag);
}

export function makeLabelTextFlow(labelInstance: InstanceNode) {
  labelInstance.primaryAxisSizingMode = "FIXED";
  labelInstance.layoutAlign = "STRETCH";
  labelInstance.children.forEach((child) => {
    if (child.type === "TEXT" && child.characters !== "") {
      child.layoutGrow = 1;
      child.textAutoResize = "HEIGHT";
    }
  });
}
