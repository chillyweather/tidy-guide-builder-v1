import { computeMaximumBounds } from "@create-figma-plugin/utilities";
import { buildIndexesFrame } from "./tns_subFunctions";
import {
  newABC,
  findAllNodes,
  elementsCoordinatesAndDimensions,
  getTagInstance,
  addLink,
} from "./tagBuilgingFunctions";
import { setVariantProps } from "./utilityFunctions";
import { getEffects } from "./getEffects";
import { setTextContent } from "./utilityFunctions";

export default function buildTags(
  tagComponent: ComponentSetNode | undefined,
  frame: any,
  start: string,
  tagDirection: string,
  instances: any,
  textElements: any,
  elementMaxWidth?: number
) {
  if (!tagComponent) return;
  const abc = "abcdefghijklmnopqrstuvwxyz0123456789♠♣♥♦●■▲▼○□◆◇◊★☆";
  const minSizeProperty = frame.minWidth ? frame.minWidth : null;

  // const minSizeElement = elementMinSize ? findMinSizeElement(frame) : null;
  const tagElements: any[] = [];
  const stringOfIndexes = newABC(abc, start);
  const frameMidPoint = frame.y + frame.height / 2;

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
    ]: [
      number,
      number,
      number,
      number,
      string,
      string,
      string,
      FontName,
      number,
    ] = element;

    const midX = elementX + elementWidth / 2;
    const midY = elementY + elementHeight / 2;
    const aboveMidLine = midY > frameMidPoint;

    const tag = buildTagElements(
      tagDirection,
      tagComponent,
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

    const indexWithLabel = tagComponent
      .findOne(
        (node) => node.name === "type=text" && node.type === "COMPONENT"
      )!
      //@ts-ignore
      .createInstance();
    indexes.appendChild(indexWithLabel);

    // set up index row
    if (linkTarget) {
      addLink({ component: indexWithLabel, link: linkTarget });
    } else {
      setTextContent(indexWithLabel, "link", "");
    }

    // set component props
    setTextContent(tag, "elementIndex", `${abc[index]}`);
    setTextContent(indexWithLabel, "elementIndex", `${abc[index]}`);

    if (elementStyleName) {
      setTextContent(
        indexWithLabel,
        "Text",
        `${elementName}, ${elementStyleName} (${elementFontName.family} ${elementFontName.style} - ${elementFontSize}px)`
      );
    } else {
      setTextContent(indexWithLabel, "Text", elementName);
    }

    if (linkTarget) {
      setTextContent(indexWithLabel, "link", `see documentation`);
    }

    if (elementName === "Icon") {
      setTextContent(indexWithLabel, "Text", `Icon - ${elementWidth}px`);
      setTextContent(indexWithLabel, "link", "");
    }
    // set up proper naming for tag and index instances
    tag.name = `.tag`;
    // tag.name = `${stringOfIndexes[index]}_${elementName}`;
    indexWithLabel.name = `.${abc[index]}_${elementName}`;
    tagElements.push(tag);
  });

  if (minSizeProperty)
    addMinSizeIndex(minSizeProperty, tagComponent, indexes, frame);

  if (elementMaxWidth && elementMaxWidth > 0)
    addMaxWidth(frame, tagComponent, indexes, elementMaxWidth);
  addBorderRadius(frame, tagComponent, indexes);
  addEffectsInfo(frame, tagComponent, indexes);
  addStrokeInfo(frame, tagComponent, indexes);

  //! find size of all tags (and frame) together
  const tagBounds = computeMaximumBounds(tagElements);
  const yLimit =
    tagBounds[1].y > frame.absoluteBoundingBox.y + frame.height
      ? tagBounds[1].y
      : frame.absoluteBoundingBox.y + frame.height;
  indexes.y = yLimit + 52;

  // tagElements.push(indexes);
  // indexes.children.forEach((child) => {
  //   if (child.type === "INSTANCE") {
  //     makeLabelTextFlow(child);
  //   }
  // });
  // console.log("tagElements", tagElements);
  return { tagElements, indexes };
}

function addMinSizeIndex(
  minSize: number,
  tagComponent: ComponentSetNode,
  indexes: FrameNode,
  frame: any
) {
  const indexWithLabel = tagComponent
    .findOne((node) => node.name === "type=size" && node.type === "COMPONENT")!
    //@ts-ignore
    .createInstance();

  indexes.appendChild(indexWithLabel);

  setVariantProps(indexWithLabel, "type", "size");
  if (minSize) {
    setTextContent(indexWithLabel, "Text", `Minimal width - ${minSize}px`);
  } else {
    setTextContent(indexWithLabel, "Text", `Minimal width - Not determined`);
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
        elementY,
        elementWidth, //maybe should be removed
        elementHeight
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
  elementX: number,
  elementY: number,
  elementWidth: number,
  elementHeight: number
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
  tagComponent: ComponentSetNode,
  indexes: FrameNode
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
    if (!indexLink) return;
    indexLink.visible = false;
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
  indexes: FrameNode
) {
  if (frame.cornerRadius !== 0) {
    const tag = tagComponent.findOne(
      (node) => node.name === "type=cornerRadius"
    );
    if (!(tag && tag.type === "COMPONENT")) return;
    if (frame.cornerRadius !== figma.mixed) {
      const indexInfo = tag.createInstance();
      indexInfo.name = ".corner-radius";
      // console.log("frame", frame);
      const cornerRadius = frame.cornerRadius;
      // console.log(indexInfo);
      // setTextContent(indexInfo, "Text", "test");
      //@ts-ignore
      indexInfo.children[1].characters = `Border radius - ${cornerRadius}px`;
      // setTextContent(indexInfo, "Text", `Border radius - ${cornerRadius}px`);
      indexes.appendChild(indexInfo);
      return;
    } else if (frame.cornerRadius === figma.mixed) {
      const ltRadiusIndex = tag.createInstance();
      const rtRadiusIndex = tag.createInstance();
      const rbRadiusIndex = tag.createInstance();
      const lbRadiusIndex = tag.createInstance();

      //@ts-ignore
      ltRadiusIndex.children[1].characters = `Top left corner radius - ${frame.topLeftRadius}px`;
      //@ts-ignore
      rtRadiusIndex.children[1].characters = `Top right corner radius - ${frame.topRightRadius}px`;
      //@ts-ignore
      rbRadiusIndex.children[1].characters = `Bottom right corner radius - ${frame.bottomRightRadius}px`;
      //@ts-ignore
      lbRadiusIndex.children[1].characters = `Bottom left corner radius - ${frame.bottomLeftRadius}px`;

      // setTextContent(
      //   ltRadiusIndex,
      //   "Text",
      //   `Top left corner radius - ${frame.topLeftRadius}px`
      // );
      // setTextContent(
      //   rtRadiusIndex,
      //   "Text",
      //   `Top right corner radius - ${frame.topRightRadius}px`
      // );
      // setTextContent(
      //   rbRadiusIndex,
      //   "Text",
      //   `Bottom right corner radius - ${frame.bottomRightRadius}px`
      // );
      // setTextContent(
      //   lbRadiusIndex,
      //   "Text",
      //   `Bottom left corner radius - ${frame.bottomLeftRadius}px`
      // );
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
  maxWidth: number
) {
  if (maxWidth && maxWidth > 0) {
    const tag = tagComponent
      .findOne(
        (node) => node.name === "type=size" && node.type === "COMPONENT"
      )!
      //@ts-ignore
      .createInstance();

    setTextContent(tag, "Text", `Maximal width - ${maxWidth}px`);
    indexes.appendChild(tag);
  }
}

function addStrokeInfo(
  frame: any,
  tagComp: ComponentSetNode,
  indexes: FrameNode
) {
  if (frame.strokes.length > 0) {
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
          const tag = tagComp
            .findOne(
              (node) => node.name === "type=info" && node.type === "COMPONENT"
            )!
            //@ts-ignore
            .createInstance();
          strokeWeight = result[res];
          setStrokeProps(tag, strokeWeight, strokeAlign, indexes, res);
        }
      }
    } else {
      const tag = tagComp
        .findOne(
          (node) => node.name === "type=info" && node.type === "COMPONENT"
        )!
        //@ts-ignore
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
  setTextContent(
    tag,
    "Text",
    `${strokeKind} - ${strokeWeight}px, ${strokeAlign}`
  );
  const indexLink = tag.findOne((element: any) => element.name === "link");
  indexLink.visible = false;
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
