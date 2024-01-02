/* eslint-disable prefer-const */
import {
  turnAllBooleansOn,
  setVariantProps,
  buildAutoLayoutFrame,
  setColorStyle,
} from "../figma_functions/utilityFunctions";
import buildSpacingMarks from "../figma_functions/buildSpacingMarks";
import { setSizingMarkerValue } from "../figma_functions/setSizingMarkerValue";
import recurciveSearch from "../figma_functions/recurciveSearch";

const dsGray100 = setColorStyle("ds-admin/gray/gray-100", "F5F5F5");

export function buildAnatomySpacings(
  element: InstanceNode,
  booleanProperties: any,
  elementSizes: string[],
  variantProperties: any,
  sizeMarker: ComponentSetNode,
  spacingMarker: ComponentSetNode
) {
  const anatomyGroups: (FrameNode[] | null)[] = [];
  if (elementSizes) {
    elementSizes.forEach((size) => {
      const propNames = Object.keys(variantProperties);
      const sizeProp = propNames.find(
        (propName) => propName.toLowerCase() === "size"
      );
      if (sizeProp) {
        setVariantProps(element, sizeProp, size);
      }
      const spacings = buildOneSizeAnatomySpacings(
        element,
        booleanProperties,
        sizeMarker,
        spacingMarker
      );
      anatomyGroups.push(spacings);
    });
  } else {
    const spacings = buildOneSizeAnatomySpacings(
      element,
      booleanProperties,
      sizeMarker,
      spacingMarker
    );
    anatomyGroups.push(spacings);
  }
  return anatomyGroups;
}

function buildOneSizeAnatomySpacings(
  element: InstanceNode,
  booleanProperties: any,
  sizeMarker: ComponentSetNode,
  spacingMarker: ComponentSetNode
) {
  const page = figma.currentPage;
  if (!element.children) {
    return null;
  }
  const elements = getAnatomyElements(element);

  const workingElements: InstanceNode[] = [];
  let tempX = 0;

  elements.forEach(() => {
    const currentElement = element.clone();
    workingElements.push(currentElement);
    turnAllBooleansOn(currentElement, booleanProperties);
    page.appendChild(currentElement);
    currentElement.x = tempX;
    tempX += 300;
  });

  const anatomyFrames: FrameNode[] = [];

  workingElements.forEach((node, index) => {
    figma.skipInvisibleInstanceChildren = true;
    const found = findNodeByName(node, elements[index].name);

    if (found && (found.type === "INSTANCE" || found.type === "FRAME")) {
      const absX = found.absoluteTransform[0][2];
      const absY = found.absoluteTransform[1][2];
      const clonedFrame = found.clone();
      figma.currentPage.appendChild(clonedFrame);
      clonedFrame.x = absX;
      clonedFrame.y = absY;
      if (found.type === "FRAME" || found.type === "INSTANCE") {
        const background = createElementBackground(found, node);
        const spacingMarks = buildSpacingMarks(
          clonedFrame as InstanceNode,
          {
            size: false,
            paddings: true,
            itemspacings: true,
            sameSpacingsColor: false,
            isShallow: true,
          },
          sizeMarker,
          spacingMarker
        );

        if (!spacingMarks) return;
        spacingMarks?.forEach((mark) => {
          if (mark) {
            setSizingMarkerValue(mark);
          }
        });
        const groupContent =
          spacingMarks && spacingMarks.length > 0
            ? [clonedFrame, node, background, ...spacingMarks]
            : [clonedFrame, node, background];

        const anatomyGroup = figma.group(
          groupContent as readonly BaseNode[],
          figma.currentPage
        );
        const anatomyFrame = buildAutoLayoutFrame(
          `${found.name}`,
          "HORIZONTAL",
          0,
          0
        );
        anatomyFrame.appendChild(anatomyGroup);
        anatomyFrame.paddingLeft = 160;
        anatomyFrame.paddingRight = 160;
        anatomyFrame.paddingTop = 40;
        anatomyFrame.paddingBottom = 40;
        anatomyFrame.fillStyleId = dsGray100.id;
        anatomyFrames.push(anatomyFrame);
        node.opacity = 0.2;
      }
    }
  });
  return anatomyFrames;
}

function getAnatomyElements(element: InstanceNode | FrameNode) {
  const anatomyElements: FrameNode | InstanceNode[] = [];
  recurciveSearch(element, anatomyElements);
  const result = anatomyElements.filter(
    (item: any, index: number, self: any) =>
      self.findIndex((t: any) => t.name === item.name) === index &&
      (item.layoutMode === "HORIZONTAL" || item.layoutMode === "VERTICAL")
  );

  return result;
}

function findNodeByName(node: SceneNode, name: string): SceneNode | null {
  if (node.name === name) {
    return node;
  }
  if (
    (node.type === "FRAME" || node.type === "INSTANCE") &&
    Array.isArray(node.children)
  ) {
    for (const child of node.children) {
      const found = findNodeByName(child, name);
      if (found) {
        return found;
      }
    }
  }
  return null;
}

const lightFrameColor: SolidPaint = {
  type: "SOLID",
  visible: true,
  opacity: 1,
  blendMode: "NORMAL",
  color: {
    r: 1,
    g: 1,
    b: 1,
  },
};
const darkFrameColor: SolidPaint = {
  type: "SOLID",
  visible: true,
  opacity: 1,
  blendMode: "NORMAL",
  color: {
    r: 0,
    g: 0,
    b: 0,
  },
};

function createElementBackground(
  element: FrameNode | InstanceNode | TextNode,
  node: InstanceNode
) {
  const selectionBackground = figma.createFrame();
  selectionBackground.fills = [];

  //@ts-ignore
  if (node.fills && node.fills.length > 0) {
    //@ts-ignore
    const colors = node.fills[0].color;
    const hslFill = rgbToHsb(colors.r, colors.g, colors.b);
    if (hslFill.b > 0.8 && hslFill.s < 0.2) {
      selectionBackground.strokes = [darkFrameColor];
    } else {
      selectionBackground.strokes = [lightFrameColor];
    }
  } else {
    selectionBackground.strokes = [darkFrameColor];
  }

  selectionBackground.strokeWeight = 1;
  selectionBackground.dashPattern = [2, 4];
  selectionBackground.opacity = 0.5;

  figma.currentPage.appendChild(selectionBackground);
  if (element.width >= 0.01 && element.height >= 0.01) {
    selectionBackground.resize(element.width, element.height);
  }
  if (element.absoluteBoundingBox) {
    selectionBackground.x = element.absoluteBoundingBox.x;
    selectionBackground.y = element.absoluteBoundingBox.y;
  }
  return selectionBackground;
}

function rgbToHsb(
  r: number,
  g: number,
  b: number
): { h: number; s: number; b: number } {
  // r /= 255;
  // g /= 255;
  // b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    v = max;

  const d = max - min;
  s = max == 0 ? 0 : d / max;

  if (max == min) {
    h = 0;
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    b: Math.round(v * 100),
  };
}
