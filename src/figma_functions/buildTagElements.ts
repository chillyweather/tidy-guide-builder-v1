/* eslint-disable @typescript-eslint/no-explicit-any */
import { getTagInstance } from "./tagBuilgingFunctions";

export function buildTagElements(
  tagComp: ComponentSetNode | ComponentNode | undefined,
  frame: any,
  midY: number,
  midX: number,
  index: number,
  array: any,
  elementX: number,
  elementY: number,
  elementWidth: number,
  elementHeight: number
): InstanceNode {
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
