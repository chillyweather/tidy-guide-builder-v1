import { buildAutoLayoutFrame } from "../figma_functions/utilityFunctions";
import buildSpacingMarks from "../../tidy_tags_and_spaces/src/buildSpacingMarks";
import { changeSizingMarkerCharacters } from "./setSizingMarkerValue";
import { setTextProps } from "../../plugin-utility-functions/micro_utils";
import { setVariantProps } from "../../plugin-utility-functions/setVariantProps";
import { turnAllBooleansOn } from "./turnAllBooleansOn";
import { dsGray100, dsGray600 } from "../../plugin-constants/color-styles";

export function buildAtomSpacings(
  element: InstanceNode,
  booleanProperties: any,
  labelComponent: ComponentNode,
  elementType: string,
  buttonSizes: string[],
  variantProperties: any
) {
  turnAllBooleansOn(element, booleanProperties);
  const page = figma.currentPage;

  const spacingGroups: FrameNode[] = [];

  if (buttonSizes) {
    buildForManySizes(
      buttonSizes,
      variantProperties,
      element,
      booleanProperties,
      elementType,
      page,
      labelComponent,
      spacingGroups
    );
  } else {
    const spacingGroup = buildOneSpacingGroup(
      element,
      booleanProperties,
      elementType,
      page,
      labelComponent
    );
    spacingGroups.push(spacingGroup);
  }

  return spacingGroups;
}

function buildForManySizes(
  buttonSizes: string[],
  variantProperties: any,
  element: InstanceNode,
  booleanProperties: any,
  elementType: string,
  page: PageNode,
  labelComponent: ComponentNode,
  spacingGroups: FrameNode[]
) {
  buttonSizes.forEach((size) => {
    const propNames = Object.keys(variantProperties);
    const sizeProp = propNames.find(
      (propName) => propName.toLowerCase() === "size"
    );
    if (sizeProp) {
      setVariantProps(element, sizeProp, size);
    }

    const spacingGroup = buildOneSpacingGroup(
      element,
      booleanProperties,
      elementType,
      page,
      labelComponent,
      size
    );
    spacingGroups.push(spacingGroup);
  });
}

//! =================FUNCTIONS======================= !//

function buildOneSpacingGroup(
  element: InstanceNode,
  booleanProperties: any,
  elementType: string,
  page: PageNode,
  labelComponent: ComponentNode,
  size?: string
) {
  const elementSize = element.clone();
  const elementPadding = element.clone();
  const elementHSpacing = element.clone();

  const sizes = buildSizeMarkers(elementSize);
  const paddings = buildPaddingMarkers(elementPadding);
  const spacings = buildSpacingMarkers(elementHSpacing, elementType);

  const sizingMarksFrame = arrangeFrameContents(
    elementSize,
    elementPadding,
    elementHSpacing,
    sizes,
    element,
    page,
    paddings,
    spacings,
    labelComponent,
    size
  );

  return sizingMarksFrame;
}

function arrangeFrameContents(
  elementSize: InstanceNode,
  elementPadding: InstanceNode,
  elementHSpacing: InstanceNode,
  sizes: any[] | undefined,
  element: InstanceNode,
  page: PageNode,
  paddings: any[] | undefined,
  spacings: any[] | undefined,
  labelComponent: ComponentNode,
  size: string | undefined
) {
  const {
    sizeGroup,
    paddingsGroup,
    spacingsGroup,
  }: { sizeGroup: any; paddingsGroup: any; spacingsGroup: any } =
    buildSpacingsGroups(
      elementSize,
      elementPadding,
      elementHSpacing,
      sizes,
      element,
      page,
      paddings,
      spacings
    );

  //! check if marks created
  const isPaddings = paddings && paddings.length > 0 ? true : false;
  const isSpacings = spacings && spacings.length > 0 ? true : false;

  //! create labels
  const { sizeTitle, paddingsTitle, spacingsTitle } = buildLabels(
    labelComponent,
    page
  );

  //! place group and label into autolayout frame
  const { sizeAl, paddingsAl, spacingsAl } = placeLabels(
    sizeTitle,
    sizeGroup,
    paddingsTitle,
    paddingsGroup,
    spacingsTitle,
    spacingsGroup
  );

  //! place al frames inside one frame and return it
  //!
  const sizingMarksFrame = arrangeResultFrame(
    sizeAl,
    isPaddings,
    isSpacings,
    paddingsAl,
    spacingsAl,
    size
  );
  return sizingMarksFrame;
}

function arrangeResultFrame(
  sizeAl: FrameNode,
  isPaddings: boolean,
  isSpacings: boolean,
  paddingsAl: FrameNode,
  spacingsAl: FrameNode,
  size?: string | undefined
) {
  const sizingMarksFrame = buildAutoLayoutFrame(
    size ? `Size ${size}` : " ",
    "VERTICAL",
    0,
    24
  );

  sizingMarksFrame.appendChild(sizeAl);
  isPaddings ? sizingMarksFrame.appendChild(paddingsAl) : paddingsAl.remove();
  isSpacings ? sizingMarksFrame.appendChild(spacingsAl) : spacingsAl.remove();
  sizingMarksFrame.fills = [];
  return sizingMarksFrame;
}

function buildSpacingsGroups(
  elementSize: InstanceNode,
  elementPadding: InstanceNode,
  elementHSpacing: InstanceNode,
  sizes: any[] | undefined,
  element: InstanceNode,
  page: PageNode,
  paddings: any[] | undefined,
  spacings: any[] | undefined
) {
  let sizeGroup: any = elementSize;
  let paddingsGroup: any = elementPadding;
  let spacingsGroup: any = elementHSpacing;

  if (sizes) {
    // changeSizeMarkerDirection(element, sizes);
    sizeGroup = figma.group([elementSize, ...sizes], page);
  }
  if (paddings) {
    paddingsGroup = figma.group([elementPadding, ...paddings], page);
  }
  if (spacings) {
    spacingsGroup = figma.group([elementHSpacing, ...spacings], page);
  }
  return { sizeGroup, paddingsGroup, spacingsGroup };
}

function placeLabels(
  sizeTitle: InstanceNode,
  sizeGroup: any,
  paddingsTitle: InstanceNode,
  paddingsGroup: any,
  spacingsTitle: InstanceNode,
  spacingsGroup: any
) {
  const sizeAl = buildAutoLayoutFrame("sizeFrame", "VERTICAL", 0, 50);
  sizeAl.counterAxisAlignItems = "CENTER";
  sizeAl.fillStyleId = dsGray100.id;
  sizeAl.paddingBottom = 40;
  sizeAl.paddingTop = 40;
  sizeAl.paddingLeft = 160;
  sizeAl.paddingRight = 160;
  const paddingsAl = sizeAl.clone();
  paddingsAl.name = "paddingsFrame";
  const spacingsAl = sizeAl.clone();
  spacingsAl.name = "spacingsFrame";
  sizeAl.layoutAlign = "STRETCH";
  paddingsAl.layoutAlign = "STRETCH";
  spacingsAl.layoutAlign = "STRETCH";
  sizeAl.appendChild(sizeGroup);
  paddingsAl.appendChild(paddingsGroup);
  setTitlePosition(sizeTitle, sizeAl);
  setTitlePosition(paddingsTitle, paddingsAl);
  setTitlePosition(spacingsTitle, spacingsAl);
  // sizeAl.appendChild(sizeTitle);
  // paddingsAl.appendChild(paddingsTitle);
  // spacingsAl.appendChild(spacingsTitle);
  spacingsAl.appendChild(spacingsGroup);
  return { sizeAl, paddingsAl, spacingsAl };
}

function setTitlePosition(title: InstanceNode, frame: FrameNode) {
  frame.appendChild(title);
  title.layoutPositioning = "ABSOLUTE";
  title.x = 16;
  title.y = 8;
}

function buildLabels(labelComponent: ComponentNode, page: PageNode) {
  const sizeTitle = labelComponent.createInstance();
  if (sizeTitle.children[0] && sizeTitle.children[0].type === "TEXT") {
    sizeTitle.children[0].fillStyleId = dsGray600.id;
  }
  page.appendChild(sizeTitle);
  setVariantProps(sizeTitle, "font", "regular");
  setVariantProps(sizeTitle, "size", "s");
  setTextProps(sizeTitle, "text", "Element size (px)");

  const paddingsTitle = sizeTitle.clone();
  setTextProps(paddingsTitle, "text", "Paddings (px)");

  const spacingsTitle = sizeTitle.clone();
  setTextProps(spacingsTitle, "text", "Spacings (px)");
  return { sizeTitle, paddingsTitle, spacingsTitle };
}

export function buildSizeMarkers(elementSize: InstanceNode) {
  const sizeMarkers = buildSpacingMarks(elementSize, {
    size: true,
    paddings: false,
    itemspacings: false,
    sameSpacingsColor: true,
  });
  sizeMarkers?.forEach((marker) => {
    const position = `${marker.componentProperties.position.value}`;
    changeSizingMarkerCharacters(marker, position);
    if (position === "bottom") {
      try {
        setMinSizeMarkerValue(elementSize, marker);
      } catch (error) {
        console.log("error :>> ", error);
      }
    }
  });
  return sizeMarkers;
}

function buildPaddingMarkers(elementPadding: InstanceNode) {
  const paddingMarkers = buildSpacingMarks(elementPadding, {
    size: false,
    paddings: true,
    itemspacings: false,
    sameSpacingsColor: false,
    isShallow: true,
  });
  paddingMarkers?.forEach((marker) =>
    modifyMarkers(elementPadding, marker, changeSizingMarkerCharacters)
  );
  return paddingMarkers;
}

function buildSpacingMarkers(
  elementHSpacing: InstanceNode,
  elementType: string
) {
  const spacingMarkers = buildSpacingMarks(elementHSpacing, {
    size: false,
    paddings: false,
    itemspacings: true,
    sameSpacingsColor: true,
    isShallow: true,
  });
  // spacingMarkers?.forEach((marker) => {
  //   modifyMarkers(elementHSpacing, marker, changeSizingMarkerCharacters);
  // });
  return spacingMarkers;
}

function modifyMarkers(
  element: InstanceNode,
  marker: InstanceNode,
  setValue: (node: InstanceNode, position: string) => void
) {
  const position = `${marker.componentProperties.position.value}`;

  changeSizingMarkerCharacters(marker, position);
  //   const barMarker = marker.findOne(
  //     (node) => node.name === ".DS-spacing-marker-bar"
  //   );
  //   const spacingMeter = marker.findOne(
  //     (node) => node.name === ".DS-spacing-marker-value"
  //   );
  //   if (position === "left" || position === "right") {
  //     // resizeHorizontalMarker(barMarker, spacingMeter, element, marker);
  //     // changeHorizontalMarkerDirection(element, marker);--
  //   } else {
  //     // resizeVerticalMarker(barMarker, spacingMeter, element, marker);
  //     changeVerticalMarkerDirection(element, marker);
  //   }
}

function setMinSizeMarkerValue(element: InstanceNode, marker: InstanceNode) {
  const minSizeValue = element.minWidth;
  if (minSizeValue) {
    const minSize = minSizeValue + element.paddingLeft + element.paddingRight;
    setTextProps(marker, "text", `Minimal size - ${minSize}px`);
  }
}
