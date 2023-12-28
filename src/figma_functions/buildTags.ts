import { computeMaximumBounds } from "@create-figma-plugin/utilities";
import { setTextProps } from "./utilityFunctions";
import { buildIndexesFrame } from "./tns_subFunctions";
import {
  newABC,
  findAllNodes,
  elementsCoordinatesAndDimensions,
  getTagInstance,
  addLink,
} from "./tagBuilgingFunctions";
import { setVariantProps } from "../../plugin-utility-functions/setVariantProps";
import { getEffects } from "./getEffects";
import { makeLabelTextFlow } from "../../tidy_doc/src/buildDocumentationBlock";

export default function buildTags(
  tagComponent: ComponentNode | ComponentSetNode | undefined,
  frame,
  start,
  tagDirection,
  instances,
  textElements,
  elementMaxWidth?
) {
  const abc = "abcdefghijklmnopqrstuvwxyz0123456789♠♣♥♦●■▲▼○□◆◇◊★☆";
  const minSizeProperty = frame.minWidth ? frame.minWidth : null;

  // const minSizeElement = elementMinSize ? findMinSizeElement(frame) : null;
  const tagElements = [];
  const stringOfIndexes = newABC(abc, start);
  const frameMidPoint = frame.y + frame.height / 2;

  const tagComp = tagComponent;

  elementsCoordinatesAndDimensions.length = 0;

  findAllNodes(frame, instances, textElements);

  const indexes = buildIndexesFrame(frame);

  //! sort by elementX value
  elementsCoordinatesAndDimensions.sort((a, b) => a[0] - b[0]);

  elementsCoordinatesAndDimensions.forEach((element, index, array) => {
    const [
      elementX,
      elementY,
      elementWidth,
      elementHeight,
      elementName,
      linkTarget,
      elementStyleName,
      elementFontName,
      elementFontSize,
    ] = element;

    const midX = elementX + elementWidth / 2;
    const midY = elementY + elementHeight / 2;
    const aboveMidLine = midY > frameMidPoint;

    const tag = buildTagElements(
      tagDirection,
      tagComp,
      frame,
      midY,
      midX,
      index,
      array,
      aboveMidLine,
      elementX,
      elementY,
      elementWidth,
      elementHeight
    );

    const indexWithLabel = tagComp
      .findOne((node) => node.name === "type=text")
      .createInstance();
    indexes.appendChild(indexWithLabel);

    // set up index row
    if (linkTarget) {
      addLink({ component: indexWithLabel, link: linkTarget });
    } else {
      setTextProps(indexWithLabel, "link", "");
    }

    // set component props
    setTextProps(tag, "index", `${stringOfIndexes[index]}`);
    setTextProps(indexWithLabel, "index", `${stringOfIndexes[index]}`);

    if (elementStyleName) {
      setTextProps(
        indexWithLabel,
        "label",
        `${elementName}, ${elementStyleName} (${elementFontName.family} ${elementFontName.style} - ${elementFontSize}px)`
      );
    } else {
      setTextProps(indexWithLabel, "label", elementName);
    }

    if (linkTarget) {
      setTextProps(indexWithLabel, "link", `see documentation`);
    }

    if (elementName === "Icon") {
      setTextProps(indexWithLabel, "label", `Icon - ${elementWidth}px`);
      setTextProps(indexWithLabel, "link", "");
    }
    // set up proper naming for tag and index instances
    tag.name = `.tag`;
    // tag.name = `${stringOfIndexes[index]}_${elementName}`;
    indexWithLabel.name = `.${stringOfIndexes[index]}_${elementName}`;
    tagElements.push(tag);
  });

  if (minSizeProperty)
    addMinSizeIndex(minSizeProperty, tagComp, indexes, frame);

  if (elementMaxWidth && elementMaxWidth > 0)
    addMaxWidth(frame, tagComp, indexes, elementMaxWidth);
  addBorderRadius(frame, tagComp, indexes);
  addEffectsInfo(frame, tagComp, indexes);
  addStrokeInfo(frame, tagComp, indexes);

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
  return tagElements;
}

function addMinSizeIndex(
  minSize: number,
  tagComp: ComponentSetNode | ComponentNode | null | undefined,
  indexes: FrameNode,
  frame: any
) {
  const indexWithLabel = tagComp
    .findOne((node) => node.name === "type=size")
    .createInstance();

  indexes.appendChild(indexWithLabel);

  setVariantProps(indexWithLabel, "type", "size");
  if (minSize) {
    setTextProps(indexWithLabel, "label", `Minimal width - ${minSize}px`);
  } else {
    setTextProps(indexWithLabel, "label", `Minimal width - Not determined`);
  }
}

function buildTagElements(
  tagDirection: any,
  tagComp: ComponentSetNode | ComponentNode | undefined,
  frame: any,
  midY: number,
  midX: number,
  index: number,
  array: any,
  aboveMidLine: boolean,
  elementX: number,
  elementY: number,
  elementWidth: number,
  elementHeight: number
): InstanceNode {
  if (tagDirection === "auto") {
    if (index === 0) {
      const firstMarkerDirection = "left";
      const tag = getTagInstance(firstMarkerDirection, tagComp);
      figma.currentPage.appendChild(tag);
      placeTags(
        firstMarkerDirection,
        frame,
        midY,
        tag,
        midX,
        elementX,
        elementY
      );
      return tag;
    }
    if (index === 1) {
      const tag = getTagInstance("bottom", tagComp);
      figma.currentPage.appendChild(tag);
      placeTags(
        "bottom",
        frame,
        midY,
        tag,
        midX,
        elementX,
        elementY,
        elementWidth,
        elementHeight
      );
      return tag;
    }
    if (index === array.length - 1 && array.length > 3) {
      const tag = getTagInstance("right", tagComp);
      figma.currentPage.appendChild(tag);
      placeTags(
        "right",
        frame,
        midY,
        tag,
        midX,
        elementX,
        elementY,
        elementWidth,
        elementHeight
      );
      return tag;
    }
    if (index % 2 !== 0) {
      const tag = getTagInstance("bottom", tagComp);
      figma.currentPage.appendChild(tag);
      placeTags(
        "bottom",
        frame,
        midY,
        tag,
        midX,
        elementX,
        elementY,
        elementWidth,
        elementHeight
      );
      return tag;
    } else {
      const tag = getTagInstance("top", tagComp);
      figma.currentPage.appendChild(tag);
      placeTags(
        "top",
        frame,
        midY,
        tag,
        midX,
        elementX,
        elementY,
        elementWidth,
        elementHeight
      );
      return tag;
    }
  } else {
    const tag = getTagInstance(tagDirection, tagComp);
    figma.currentPage.appendChild(tag);
    placeTags(
      tagDirection,
      frame,
      midY,
      tag,
      midX,
      elementX,
      elementY,
      elementWidth,
      elementHeight
    );
    return tag;
  }
}

const tagDistanceFromObject = 2;

export function placeTags(
  tagDirection: any,
  frame: any,
  midY: number,
  tag: any,
  midX: number,
  elementX?: number,
  elementY?: number,
  elementWidth?: number,
  elementHeight?: number
) {
  const frameLeftX = frame.absoluteBoundingBox.x;
  const frameRightX = frameLeftX + frame.width;
  const frameTopY = frame.absoluteBoundingBox.y;
  const frameBottomY = frameTopY + frame.height;

  if (tagDirection === "top") {
    const tagHeight = Math.abs(elementY - frameTopY) + 64;
    tag.resize(24, tagHeight);
    tag.y = elementY - tagHeight - tagDistanceFromObject;
    tag.x = midX - tag.width / 2;
  }
  if (tagDirection === "right") {
    const tagWidth = Math.abs(frameRightX - (elementX + elementWidth)) + 64;
    tag.resize(tagWidth, 24);
    tag.y = midY - 12;
    tag.x = elementX + elementWidth + tagDistanceFromObject;
  }
  if (tagDirection === "bottom") {
    const tagHeight = Math.abs(frameBottomY - (elementY + elementHeight)) + 64;
    tag.resize(24, tagHeight);
    tag.y = elementY + elementHeight + tagDistanceFromObject;
    tag.x = midX - tag.width / 2;
  }
  if (tagDirection === "left") {
    const tagWidth = Math.abs(elementX - frameLeftX) + 64;
    tag.resize(tagWidth, 24);
    tag.y = midY - 12;
    tag.x = elementX - tagWidth - tagDistanceFromObject;
  }
}

function addEffectsInfo(
  frame: any,
  tagComp: ComponentNode | ComponentSetNode | undefined,
  indexes: FrameNode
) {
  const effects = getEffects(frame);
  if (effects) {
    const tag = tagComp.findOne((node) => node.name === "type=info");
    const effectNames = Object.keys(effects);
    effectNames.forEach((effectName) => {
      const indexInfo = tag.createInstance();
      indexInfo.name = `.${effectName}`;
      setTextProps(indexInfo, "label", `${effects[effectName]}`);
      const indexLink = indexInfo.findOne((node) => node.name === "link");
      indexLink.visible = false;
      if (effectName === "innerShadow" || effectName === "dropShadow") {
        indexInfo.counterAxisAlignItems = "MIN";
        const indexText = indexInfo.findOne((node) => node.name === "Text");
        indexText.paragraphSpacing = 3;
      }
      indexes.appendChild(indexInfo);
    });
  }
}

function addBorderRadius(
  frame: any,
  tagComp: ComponentNode | ComponentSetNode | undefined,
  indexes: FrameNode
) {
  if (frame.cornerRadius !== 0) {
    const tag = tagComp.findOne((node) => node.name === "type=cornerRadius");
    if (frame.cornerRadius !== figma.mixed) {
      (function () {
        const indexInfo = tag.createInstance();
        indexInfo.name = ".corner-radius";
        const cornerRadius = frame.cornerRadius;
        setTextProps(indexInfo, "label", `Border radius - ${cornerRadius}px`);
        indexes.appendChild(indexInfo);
        return;
      })();
    } else if (frame.cornerRadius == figma.mixed) {
      const ltRadiusIndex = tag.createInstance();
      const rtRadiusIndex = tag.createInstance();
      const rbRadiusIndex = tag.createInstance();
      const lbRadiusIndex = tag.createInstance();

      setTextProps(
        ltRadiusIndex,
        "label",
        `Top left corner radius - ${frame.topLeftRadius}px`
      );
      setTextProps(
        rtRadiusIndex,
        "label",
        `Top right corner radius - ${frame.topRightRadius}px`
      );
      setTextProps(
        rbRadiusIndex,
        "label",
        `Bottom right corner radius - ${frame.bottomRightRadius}px`
      );
      setTextProps(
        lbRadiusIndex,
        "label",
        `Bottom left corner radius - ${frame.bottomLeftRadius}px`
      );
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
  tagComp: ComponentNode | ComponentSetNode | undefined,
  indexes: FrameNode,
  maxWidth: number
) {
  if (maxWidth && maxWidth > 0) {
    const tag = tagComp
      .findOne((node) => node.name === "type=size")
      .createInstance();

    setTextProps(tag, "label", `Maximal width - ${maxWidth}px`);
    indexes.appendChild(tag);
  }
}

function addStrokeInfo(
  frame: any,
  tagComp: ComponentNode | ComponentSetNode | undefined,
  indexes: FrameNode
) {
  if (frame.strokes.length > 0) {
    const strokeAlign = frame.strokeAlign;
    let strokeWeight = "";

    if (frame.strokeWeight === figma.mixed) {
      const result = {};
      result["Left stroke"] = frame.strokeLeftWeight;
      result["Right stroke"] = frame.strokeRightWeight;
      result["Top stroke"] = frame.strokeTopWeight;
      result["Bottom stroke"] = frame.strokeBottomWeight;
      for (const res in result) {
        if (result[res] > 0) {
          const tag = tagComp
            .findOne((node) => node.name === "type=info")
            .createInstance();
          strokeWeight = result[res];
          setStrokeProps(tag, strokeWeight, strokeAlign, indexes, res);
        }
      }
    } else {
      const tag = tagComp
        .findOne((node) => node.name === "type=info")
        .createInstance();
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
  strokeKind: string
) {
  setTextProps(
    tag,
    "label",
    `${strokeKind} - ${strokeWeight}px, ${strokeAlign}`
  );
  const indexLink = tag.findOne((element) => element.name === "link");
  indexLink.visible = false;
  indexes.appendChild(tag);
}
