var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@create-figma-plugin/utilities/lib/events.js
function on(name, handler) {
  const id = `${currentId}`;
  currentId += 1;
  eventHandlers[id] = { handler, name };
  return function() {
    delete eventHandlers[id];
  };
}
function once(name, handler) {
  let done = false;
  return on(name, function(...args) {
    if (done === true) {
      return;
    }
    done = true;
    handler(...args);
  });
}
function invokeEventHandler(name, args) {
  let invoked = false;
  for (const id in eventHandlers) {
    if (eventHandlers[id].name === name) {
      eventHandlers[id].handler.apply(null, args);
      invoked = true;
    }
  }
  if (invoked === false) {
    throw new Error(`No event handler with name \`${name}\``);
  }
}
var eventHandlers, currentId, emit;
var init_events = __esm({
  "node_modules/@create-figma-plugin/utilities/lib/events.js"() {
    eventHandlers = {};
    currentId = 0;
    emit = typeof window === "undefined" ? function(name, ...args) {
      figma.ui.postMessage([name, ...args]);
    } : function(name, ...args) {
      window.parent.postMessage({
        pluginMessage: [name, ...args]
      }, "*");
    };
    if (typeof window === "undefined") {
      figma.ui.onmessage = function(args) {
        if (!Array.isArray(args)) {
          return;
        }
        const [name, ...rest] = args;
        if (typeof name !== "string") {
          return;
        }
        invokeEventHandler(name, rest);
      };
    } else {
      window.onmessage = function(event) {
        if (typeof event.data.pluginMessage === "undefined") {
          return;
        }
        const args = event.data.pluginMessage;
        if (!Array.isArray(args)) {
          return;
        }
        const [name, ...rest] = event.data.pluginMessage;
        if (typeof name !== "string") {
          return;
        }
        invokeEventHandler(name, rest);
      };
    }
  }
});

// node_modules/@create-figma-plugin/utilities/lib/node/absolute-position/get-absolute-position.js
function getAbsolutePosition(node) {
  return {
    x: node.absoluteTransform[0][2],
    y: node.absoluteTransform[1][2]
  };
}
var init_get_absolute_position = __esm({
  "node_modules/@create-figma-plugin/utilities/lib/node/absolute-position/get-absolute-position.js"() {
  }
});

// node_modules/@create-figma-plugin/utilities/lib/node/get-nodes/get-parent-node.js
function getParentNode(node) {
  const parentNode = node.parent;
  if (parentNode === null) {
    throw new Error(`\`node.parent\` is \`null\``);
  }
  return parentNode;
}
var init_get_parent_node = __esm({
  "node_modules/@create-figma-plugin/utilities/lib/node/get-nodes/get-parent-node.js"() {
  }
});

// node_modules/@create-figma-plugin/utilities/lib/node/compute-bounding-box.js
function computeBoundingBox(node) {
  if ("rotation" in node && node.rotation === 0) {
    const absolutePosition2 = getAbsolutePosition(node);
    const { width: width2, height: height2 } = node;
    return __spreadProps(__spreadValues({}, absolutePosition2), { height: height2, width: width2 });
  }
  const parentNode = getParentNode(node);
  const index = parentNode.children.indexOf(node);
  const group = figma.group([node], parentNode, index);
  const absolutePosition = getAbsolutePosition(group);
  const { width, height } = group;
  parentNode.insertChild(index, node);
  return __spreadProps(__spreadValues({}, absolutePosition), { height, width });
}
var init_compute_bounding_box = __esm({
  "node_modules/@create-figma-plugin/utilities/lib/node/compute-bounding-box.js"() {
    init_get_absolute_position();
    init_get_parent_node();
  }
});

// node_modules/@create-figma-plugin/utilities/lib/node/compute-maximum-bounds.js
function computeMaximumBounds(nodes) {
  let maximumBounds = [
    {
      x: Number.MAX_VALUE,
      y: Number.MAX_VALUE
    },
    {
      x: -1 * Number.MAX_VALUE,
      y: -1 * Number.MAX_VALUE
    }
  ];
  for (const node of nodes) {
    const { x, y, width, height } = computeBoundingBox(node);
    maximumBounds = [
      {
        x: Math.min(maximumBounds[0].x, x),
        y: Math.min(maximumBounds[0].y, y)
      },
      {
        x: Math.max(maximumBounds[1].x, x + width),
        y: Math.max(maximumBounds[1].y, y + height)
      }
    ];
  }
  return maximumBounds;
}
var init_compute_maximum_bounds = __esm({
  "node_modules/@create-figma-plugin/utilities/lib/node/compute-maximum-bounds.js"() {
    init_compute_bounding_box();
  }
});

// node_modules/@create-figma-plugin/utilities/lib/ui.js
function showUI(options, data) {
  if (typeof __html__ === "undefined") {
    throw new Error("No UI defined");
  }
  const html = `<div id="create-figma-plugin"></div><script>document.body.classList.add('theme-${figma.editorType}');const __FIGMA_COMMAND__='${typeof figma.command === "undefined" ? "" : figma.command}';const __SHOW_UI_DATA__=${JSON.stringify(typeof data === "undefined" ? {} : data)};${__html__}</script>`;
  figma.showUI(html, __spreadProps(__spreadValues({}, options), {
    themeColors: typeof options.themeColors === "undefined" ? true : options.themeColors
  }));
}
var init_ui = __esm({
  "node_modules/@create-figma-plugin/utilities/lib/ui.js"() {
  }
});

// node_modules/@create-figma-plugin/utilities/lib/index.js
var init_lib = __esm({
  "node_modules/@create-figma-plugin/utilities/lib/index.js"() {
    init_events();
    init_compute_maximum_bounds();
    init_ui();
  }
});

// src/figma_functions/utilityFunctions.ts
function buildAutoLayoutFrame(name, direction, paddingHorizontal = 20, paddingVertical = 20, itemSpacing = 10) {
  const frame = figma.createFrame();
  frame.layoutMode = direction;
  frame.paddingBottom = paddingVertical;
  frame.paddingLeft = paddingHorizontal;
  frame.paddingRight = paddingHorizontal;
  frame.paddingTop = paddingVertical;
  frame.itemSpacing = itemSpacing;
  frame.counterAxisSizingMode = "AUTO";
  frame.name = name;
  return frame;
}
async function findMasterComponent(node) {
  const immediateMaster = await node.getMainComponentAsync();
  const masterParent = immediateMaster == null ? void 0 : immediateMaster.parent;
  const trueMaster = (masterParent == null ? void 0 : masterParent.type) === "COMPONENT_SET" ? masterParent : immediateMaster;
  return trueMaster;
}
async function findAllBooleanProps(node) {
  const masterFrame = await findMasterComponent(node);
  const frameProps = masterFrame == null ? void 0 : masterFrame.componentPropertyDefinitions;
  const foundProps = {};
  for (const prop in frameProps) {
    if (frameProps[prop].type === "BOOLEAN") {
      foundProps[prop] = frameProps[prop];
    }
  }
  return foundProps;
}
async function findAllVariantProps(node) {
  const masterFrame = await findMasterComponent(node);
  const frameProps = masterFrame == null ? void 0 : masterFrame.componentPropertyDefinitions;
  const foundProps = {};
  for (const prop in frameProps) {
    if (frameProps[prop].type === "VARIANT") {
      foundProps[prop] = frameProps[prop];
    }
  }
  return foundProps;
}
async function getDefaultElement(node) {
  var _a;
  if (node.type === "INSTANCE") {
    return await getDefaultVariant(node);
  } else if (node.type === "COMPONENT") {
    if (node.parent && ((_a = node.parent) == null ? void 0 : _a.type) === "COMPONENT_SET") {
      return node.parent.defaultVariant;
    } else
      return node;
  } else if (node.type === "COMPONENT_SET") {
    return node.defaultVariant;
  } else {
    figma.closePlugin(
      "Please, select Component, Component Set or Instance node"
    );
    return null;
  }
}
async function getDefaultVariant(node) {
  var _a;
  const mainComponent = await node.getMainComponentAsync();
  if (((_a = mainComponent == null ? void 0 : mainComponent.parent) == null ? void 0 : _a.type) === "COMPONENT_SET") {
    const defaultVariant = mainComponent.parent.defaultVariant;
    return defaultVariant;
  }
  return mainComponent;
}
async function getElementSizes(node) {
  const masterComponent = await findMasterComponent(node);
  if (masterComponent) {
    if (masterComponent.componentPropertyDefinitions.size)
      return masterComponent.componentPropertyDefinitions.size.variantOptions;
    if (masterComponent.componentPropertyDefinitions.Size) {
      return masterComponent.componentPropertyDefinitions.Size.variantOptions;
    }
  }
  return null;
}
function setVariantProps(node, name, value) {
  const propList = node.componentProperties;
  for (const property in propList) {
    if (property.includes(`${name}`) && propList[property].type === "VARIANT") {
      try {
        const newProps = {};
        newProps[property] = value;
        node.setProperties(newProps);
      } catch (error) {
      }
    }
  }
}
function setBooleanProps(element, name, value) {
  const propList = element.componentProperties;
  for (const property in propList) {
    if (property.includes(`${name}`)) {
      try {
        const newProps = {};
        newProps[property] = value;
        element.setProperties(newProps);
      } catch (error) {
      }
    }
  }
}
function setTextProps(element, name, value) {
  const propList = element.componentProperties;
  for (const property in propList) {
    if (property.startsWith(`${name}`)) {
      const newProps = {};
      newProps[property] = `${value}`;
      element.setProperties(newProps);
    }
  }
}
function turnAllBooleansOn(element, booleanProperties) {
  for (const property in booleanProperties) {
    setBooleanProps(element, property, true);
  }
}
function turnAllBooleansOff(element, booleanProperties) {
  for (const property in booleanProperties) {
    setBooleanProps(element, property, false);
  }
}
function hexToRGB(hex) {
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;
  const colors = {
    r,
    g,
    b
  };
  return colors;
}
function createPaintStyle(name, hex) {
  const baseStyle = figma.createPaintStyle();
  baseStyle.name = name;
  const paint = {
    type: "SOLID",
    color: hexToRGB(hex)
  };
  baseStyle.paints = [paint];
  return baseStyle;
}
async function getLocalColorStyle(name) {
  const styles = await figma.getLocalPaintStylesAsync();
  const newStyle = styles.find((style) => style.name === name);
  return newStyle;
}
async function setColorStyle(name, hex) {
  const existingStyle = await getLocalColorStyle(name);
  if (existingStyle) {
    return existingStyle;
  } else {
    const newStyle = createPaintStyle(name, hex);
    return newStyle;
  }
}
function setTextContent(element, layerName, text) {
  try {
    const textNode = element.findOne((node) => node.name === layerName);
    if (!textNode)
      throw new Error(
        `Text node with name ${layerName} doesn't exist on node ${element.name}`
      );
    if (textNode && textNode.type === "TEXT") {
      textNode.characters = text;
    }
  } catch (error) {
  }
}
function findMasterPage(node) {
  if (node.type === "PAGE") {
    return node;
  } else {
    if (node.parent) {
      const newNode = node.parent;
      return findMasterPage(newNode);
    } else {
      return null;
    }
  }
}
async function findDocFrame(node) {
  const master = await node.getMainComponentAsync();
  if (master) {
    const masterPage = findMasterPage(master);
    if (masterPage) {
      const docFrame = masterPage.children.find(
        (node2) => /(\.)?documentation/i.test(node2.name)
      );
      return docFrame;
    } else {
      return null;
    }
  }
}
function cloneFrame(frame) {
  let newFrame = frame.clone();
  if (newFrame.type === "INSTANCE") {
    newFrame = newFrame.detachInstance();
  }
  const parent = figma.currentPage;
  parent.appendChild(newFrame);
  if (frame.absoluteBoundingBox) {
    newFrame.x = frame.absoluteBoundingBox.x;
    newFrame.y = frame.absoluteBoundingBox.y;
  }
  return newFrame;
}
var init_utilityFunctions = __esm({
  "src/figma_functions/utilityFunctions.ts"() {
    "use strict";
  }
});

// src/figma_doc_sections/elementBuildingFunctions.ts
function buildTitle(title) {
  const titleFrame = buildAutoLayoutFrame("title", "HORIZONTAL", 0, 0, 0);
  const titleText = figma.createText();
  titleText.characters = title;
  titleText.fontSize = 40;
  titleText.fontName = { family: "Inter", style: "Semi Bold" };
  titleFrame.appendChild(titleText);
  return titleFrame;
}
function buildSubtitle(subtitle) {
  const titleFrame = buildAutoLayoutFrame("subtitle", "HORIZONTAL", 0, 0, 0);
  const titleText = figma.createText();
  titleText.characters = subtitle;
  titleText.fontSize = 28;
  titleText.fontName = { family: "Inter", style: "Regular" };
  titleFrame.appendChild(titleText);
  return titleFrame;
}
function buildText(text) {
  const textFrame = buildAutoLayoutFrame("text", "VERTICAL", 0, 0, 0);
  textFrame.maxWidth = 650;
  const textContent = figma.createText();
  textContent.characters = text;
  textContent.fontSize = 14;
  textContent.lineHeight = { value: 164, unit: "PERCENT" };
  textContent.fontName = { family: "Inter", style: "Regular" };
  textFrame.appendChild(textContent);
  textContent.layoutSizingHorizontal = "FILL";
  return textFrame;
}
function buildTwoColumns(element, parentFrame) {
  if (!element.content.subtitle1 || !element.content.subtitle2 || !element.content.text1 || !element.content.text2) {
    return;
  }
  const columnSpacing = 20;
  const columnWidth = (documentationWidth - documentationPadding * 2 - columnSpacing) / 2;
  const title1 = element.content.subtitle1;
  const title2 = element.content.subtitle2;
  const text1 = element.content.text1;
  const text2 = element.content.text2;
  const title1Frame = buildSubtitle(title1);
  title1Frame.resize(columnWidth, title1Frame.height);
  const title2Frame = buildSubtitle(title2);
  title2Frame.resize(columnWidth, title2Frame.height);
  const text1Frame = buildListText(text1, "unordered");
  text1Frame.resize(columnWidth, text1Frame.height);
  const text2Frame = buildListText(text2, "unordered");
  text2Frame.resize(columnWidth, text2Frame.height);
  const titleWrapper = buildAutoLayoutFrame(
    "titleWrapper",
    "HORIZONTAL",
    0,
    0,
    20
  );
  titleWrapper.appendChild(title1Frame);
  titleWrapper.appendChild(title2Frame);
  const textWrapper = buildAutoLayoutFrame(
    "textWrapper",
    "HORIZONTAL",
    0,
    0,
    20
  );
  textWrapper.appendChild(text1Frame);
  textWrapper.appendChild(text2Frame);
  parentFrame.appendChild(titleWrapper);
  parentFrame.appendChild(textWrapper);
}
function buildListText(text, type) {
  const textFrame = buildAutoLayoutFrame("text", "VERTICAL", 0, 0, 0);
  const textContent = figma.createText();
  textContent.characters = removeEmptyLines(text);
  textContent.fontSize = 14;
  textContent.lineHeight = { value: 164, unit: "PERCENT" };
  textContent.listSpacing = 16;
  textContent.fontName = { family: "Inter", style: "Regular" };
  textFrame.appendChild(textContent);
  textContent.layoutSizingHorizontal = "FILL";
  if (type === "unordered") {
    textContent.setRangeListOptions(0, textContent.characters.length, {
      type: "UNORDERED"
    });
  } else {
    textContent.setRangeListOptions(0, textContent.characters.length, {
      type: "UNORDERED"
    });
  }
  return textFrame;
}
function buildLinkText(text, link) {
  const textFrame = buildAutoLayoutFrame("link", "VERTICAL", 0, 0, 0);
  const textContent = figma.createText();
  textContent.characters = text;
  textContent.fontSize = 16;
  textContent.fontName = { family: "Inter", style: "Regular" };
  textContent.fills = [
    {
      type: "SOLID",
      color: {
        r: 0.15829861164093018,
        g: 0.6913270354270935,
        b: 0.8083333373069763
      }
    }
  ];
  textFrame.appendChild(textContent);
  textContent.layoutSizingHorizontal = "FILL";
  textContent.setRangeHyperlink(0, textContent.characters.length, {
    type: "URL",
    value: link
  });
  return textFrame;
}
async function buildImageFromRemoteSource(link) {
  const node = figma.createImageAsync(link).then(async (image) => {
    const node2 = figma.createRectangle();
    const { width, height } = await image.getSizeAsync();
    node2.resize(width, height);
    const currentDocumentationWidth = documentationWidth - documentationPadding * 2;
    const scale = currentDocumentationWidth / width;
    node2.resize(width * scale, height * scale);
    node2.fills = [
      {
        type: "IMAGE",
        imageHash: image.hash,
        scaleMode: "FILL"
      }
    ];
    return node2;
  });
  return node;
}
var removeEmptyLines;
var init_elementBuildingFunctions = __esm({
  "src/figma_doc_sections/elementBuildingFunctions.ts"() {
    "use strict";
    init_utilityFunctions();
    init_documentationBuilder();
    removeEmptyLines = (text) => {
      let result = text.replace(/^\s*[\r\n]/gm, "");
      result = result.replace(/\n+$/, "");
      return result;
    };
  }
});

// src/figma_functions/addNewProperty.ts
function addNewTextProperty(component, textNode, propName, propDefault) {
  component.addComponentProperty(`${propName}`, "TEXT", `${propDefault}`);
  const objName = Object.keys(component.componentPropertyDefinitions).find(
    (propertyName) => propertyName.startsWith(propName)
  );
  const references = JSON.parse(
    JSON.stringify(textNode.componentPropertyReferences)
  );
  references.characters = `${objName}`;
  textNode.componentPropertyReferences = references;
}
function addNewBooleanProperty(component, node, propName, propDefault) {
  component.addComponentProperty(`${propName}`, "BOOLEAN", propDefault);
  const objName = Object.keys(component.componentPropertyDefinitions).find(
    (propertyName) => propertyName.startsWith(propName)
  );
  const references = JSON.parse(
    JSON.stringify(node.componentPropertyReferences)
  );
  references.visible = `${objName}`;
  node.componentPropertyReferences = references;
}
var init_addNewProperty = __esm({
  "src/figma_functions/addNewProperty.ts"() {
    "use strict";
  }
});

// src/figma_layout_components/buildLabelComponent.ts
function buildLabelComponent(size = 14, color = { r: 0, g: 0, b: 0 }, fontWeight = "Bold") {
  const labelComponent = figma.createComponent();
  const labelComponentText = figma.createText();
  labelComponent.appendChild(labelComponentText);
  addNewTextProperty(labelComponent, labelComponentText, "text", "Label");
  labelComponentText.fills = [{ type: "SOLID", color }];
  labelComponentText.fontSize = size;
  labelComponentText.fontName = {
    family: "Inter",
    style: fontWeight
  };
  labelComponentText.characters = `Label`;
  labelComponent.layoutMode = "HORIZONTAL";
  labelComponent.primaryAxisAlignItems = "CENTER";
  labelComponent.counterAxisAlignItems = "CENTER";
  labelComponent.layoutSizingHorizontal = "HUG";
  labelComponent.layoutSizingVertical = "HUG";
  labelComponent.name = "text-label";
  return labelComponent;
}
var init_buildLabelComponent = __esm({
  "src/figma_layout_components/buildLabelComponent.ts"() {
    "use strict";
    init_addNewProperty();
  }
});

// src/figma_functions/tns_subFunctions.ts
function getFrameMeasurements(frame) {
  const frameMeasurements = {};
  frameMeasurements.x = frame.absoluteBoundingBox.x;
  frameMeasurements.y = frame.absoluteBoundingBox.y;
  frameMeasurements.width = frame.absoluteBoundingBox.width;
  frameMeasurements.height = frame.absoluteBoundingBox.height;
  return frameMeasurements;
}
function buildIndexesFrame(frame) {
  const frameMeasurements = getFrameMeasurements(frame);
  const indexes = figma.createFrame();
  indexes.y = frameMeasurements.y + frameMeasurements.height + 156;
  indexes.x = frameMeasurements.x;
  indexes.layoutPositioning = "AUTO";
  indexes.layoutMode = "VERTICAL";
  indexes.itemSpacing = 16;
  figma.currentPage.appendChild(indexes);
  indexes.fills = [];
  indexes.counterAxisSizingMode = "AUTO";
  indexes.name = `${frame.name} - indexes`;
  return indexes;
}
function getMarkerShift(marker) {
  const markerHandWidth = marker.children[1].width;
  if (markerHandWidth) {
    const markerText = marker.findOne((node) => node.type === "TEXT");
    if (!markerText)
      return 0;
    const difference = 16 - markerText.width;
    return markerHandWidth + 20 - difference;
  } else {
    const markerText = marker.findOne((node) => node.type === "TEXT");
    if (!markerText)
      return 0;
    const difference = 16 - markerText.width;
    return 40 - difference;
  }
  return 0;
}
var init_tns_subFunctions = __esm({
  "src/figma_functions/tns_subFunctions.ts"() {
    "use strict";
  }
});

// src/figma_functions/tagBuilgingFunctions.ts
async function findFontStyleName(textNode) {
  if (textNode.textStyleId === "") {
    return "\u{1F3A8} style not determined";
  } else {
    const foundStyle = await figma.getStyleByIdAsync(
      textNode.textStyleId
    );
    if ((foundStyle == null ? void 0 : foundStyle.remote) === false) {
      return foundStyle.name;
    } else {
      return "no style";
    }
  }
}
function isIcon(node) {
  return node.type === "INSTANCE" && node.children.length === 1 && node.children[0].name === "ic" && node.children[0].type === "VECTOR";
}
async function addInstancesToArray(node, array) {
  const docFrame = await findDocFrame(node);
  array.push([
    node.absoluteBoundingBox.x,
    node.absoluteBoundingBox.y,
    node.absoluteRenderBounds.width,
    node.absoluteRenderBounds.height,
    isIcon(node) ? "Icon" : node.name,
    docFrame ? docFrame.id : node.mainComponent.id
  ]);
}
async function addTextNodesToArray(node, array) {
  const styleName = await findFontStyleName(node);
  array.push([
    node.absoluteBoundingBox.x,
    node.absoluteBoundingBox.y,
    node.absoluteRenderBounds.width,
    node.height,
    node.name,
    null,
    styleName,
    node.fontName,
    node.fontSize
  ]);
}
async function findAllNodes(frame, instances, textElements) {
  figma.skipInvisibleInstanceChildren = true;
  for (const node of frame.children) {
    if (node.absoluteBoundingBox && node.width > 0.01) {
      if (node.type === "INSTANCE" && instances && !node.name.startsWith("_")) {
        await addInstancesToArray(node, elementsCoordinatesAndDimensions);
      }
      if (node.type === "TEXT" && textElements && !node.name.startsWith("_")) {
        await addTextNodesToArray(node, elementsCoordinatesAndDimensions);
      } else if ((node.type === "FRAME" || node.type === "GROUP") && node.children) {
        findAllNodes(node, instances, textElements);
      }
    }
  }
}
function getTagInstance(tagDirection, tagComp) {
  if (tagDirection === "top") {
    const tag = tagComp.findOne((node) => node.name === "type=bottom line").createInstance();
    return tag;
  }
  if (tagDirection === "right") {
    const tag = tagComp.findOne((node) => node.name === "type=left line").createInstance();
    return tag;
  }
  if (tagDirection === "bottom") {
    const tag = tagComp.findOne((node) => node.name === "type=top line").createInstance();
    return tag;
  }
  if (tagDirection === "left") {
    const tag = tagComp.findOne((node) => node.name === "type=right line").createInstance();
    return tag;
  }
}
var elementsCoordinatesAndDimensions;
var init_tagBuilgingFunctions = __esm({
  "src/figma_functions/tagBuilgingFunctions.ts"() {
    "use strict";
    init_utilityFunctions();
    elementsCoordinatesAndDimensions = [];
  }
});

// src/figma_functions/getEffects.ts
function getEffects(node) {
  const effectTypes = {
    DROP_SHADOW: "Drop shadow",
    INNER_SHADOW: "Inner shadow",
    BACKGROUND_BLUR: "Background blur",
    LAYER_BLUR: "Layer blur"
  };
  const effects = node.effects;
  if (!effects) {
    return null;
  }
  const result = {};
  const styleName = findStyleName(node);
  if (styleName) {
    result.style = `Effect style: ${styleName}`;
  }
  effects.forEach((effect) => {
    const effectType = effectTypes[effect.type];
    if (effectType === "Drop shadow") {
      const shadowDescription = buildShadowDescription(effectType, effect);
      result.dropShadow = shadowDescription;
    }
    if (effectType === "Inner shadow") {
      const shadowDescription = buildShadowDescription(effectType, effect);
      result.innerShadow = shadowDescription;
    }
    if (effectType === "Background blur") {
      const blurDescription = buildBlurDescription(effectType, effect);
      result.backgroundBlur = blurDescription;
    }
    if (effectType === "Layer blur") {
      const blurDescription = buildBlurDescription(effectType, effect);
      result.layerBlur = blurDescription;
    }
  });
  return result;
}
function findStyleName(node) {
  const effectStyleId = node.effectStyleId;
  if (effectStyleId && effectStyleId.length > 0) {
    const styles = figma.getLocalEffectStyles();
    const foundStyle = styles.find((s) => s.id === effectStyleId);
    if (foundStyle) {
      return foundStyle.name;
    }
  }
}
function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (Math.round(r * 255) << 16) + (Math.round(g * 255) << 8) + Math.round(b * 255)).toString(16).slice(1);
}
function buildShadowDescription(effectType, effect) {
  const red = effect.color.r;
  const green = effect.color.g;
  const blue = effect.color.b;
  return `${effectType}:
\u2022 color: ${rgbToHex(red, green, blue).toUpperCase()}
\u2022 transparency: ${Math.round(effect.color.a * 100)}%
\u2022 offset X: ${effect.offset.x}px
\u2022 offset Y: ${effect.offset.y}px
\u2022 radius: ${effect.radius}px
\u2022 spread: ${effect.spread}px`;
}
function buildBlurDescription(effectType, effect) {
  return `${effectType} radius: ${effect.radius}px`;
}
var init_getEffects = __esm({
  "src/figma_functions/getEffects.ts"() {
    "use strict";
  }
});

// src/figma_functions/buildTags.ts
async function buildTags(tagComponent, frame, start, tagDirection, instances, textElements, elementMaxWidth) {
  if (!tagComponent)
    return;
  const links = tagComponent.findAll((node) => node.name === "link");
  links.forEach((link) => {
    link.visible = false;
  });
  const abc = "abcdefghijklmnopqrstuvwxyz0123456789\u2660\u2663\u2665\u2666\u25CF\u25A0\u25B2\u25BC\u25CB\u25A1\u25C6\u25C7\u25CA\u2605\u2606";
  const minSizeProperty = frame.minWidth ? frame.minWidth : null;
  const tagElements = [];
  const frameMidPoint = frame.y + frame.height / 2;
  elementsCoordinatesAndDimensions.length = 0;
  await findAllNodes(frame, instances, textElements);
  const indexes = buildIndexesFrame(frame);
  elementsCoordinatesAndDimensions.sort((a, b) => a[0] - b[0]);
  elementsCoordinatesAndDimensions.forEach((element, index, array) => {
    const [
      elementX,
      elementY,
      elementWidth,
      elementHeight,
      elementName,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      linkTarget,
      elementStyleName,
      elementFontName,
      elementFontSize
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
    const indexWithLabelComp = tagComponent.findOne(
      (node) => node.name === "type=text" && node.type === "COMPONENT"
    );
    if (!indexWithLabelComp || indexWithLabelComp.type !== "COMPONENT")
      return;
    const indexWithLabel = indexWithLabelComp.createInstance();
    indexes.appendChild(indexWithLabel);
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
    if (elementName === "Icon") {
      setTextContent(indexWithLabel, "Text", `Icon - ${elementWidth}px`);
    }
    tag.name = `.tag`;
    indexWithLabel.name = `.${abc[index]}_${elementName}`;
    tagElements.push(tag);
  });
  if (minSizeProperty)
    addMinSizeIndex(minSizeProperty, tagComponent, indexes);
  if (elementMaxWidth && elementMaxWidth > 0)
    addMaxWidth(frame, tagComponent, indexes, elementMaxWidth);
  addBorderRadius(frame, tagComponent, indexes);
  addEffectsInfo(frame, tagComponent, indexes);
  addStrokeInfo(frame, tagComponent, indexes);
  const tagBounds = computeMaximumBounds(tagElements);
  const yLimit = tagBounds[1].y > frame.absoluteBoundingBox.y + frame.height ? tagBounds[1].y : frame.absoluteBoundingBox.y + frame.height;
  indexes.y = yLimit + 52;
  return { tagElements, indexes };
}
function addMinSizeIndex(minSize, tagComponent, indexes) {
  const indexWithLabelComponent = tagComponent.findOne(
    (node) => node.name === "type=size" && node.type === "COMPONENT"
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
function buildTagElements(tagDirection, tagComp, frame, midY, midX, index, array, aboveMidLine, elementX, elementY, elementWidth, elementHeight) {
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
        elementWidth,
        //maybe should be removed
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
function placeTags(tagDirection, frame, midY, tag, midX, elementX, elementY, elementWidth, elementHeight) {
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
function addEffectsInfo(frame, tagComponent, indexes) {
  const effects = getEffects(frame);
  if (!effects)
    return;
  const tag = tagComponent.findOne((node) => node.name === "type=info");
  if (!(tag && tag.type === "COMPONENT"))
    return;
  const effectNames = Object.keys(effects);
  effectNames.forEach((effectName) => {
    const indexInfo = tag.createInstance();
    indexInfo.name = `.${effectName}`;
    setTextContent(indexInfo, "Text", `${effects[effectName]}`);
    const indexLink = indexInfo.findOne((node) => node.name === "link");
    if (!indexLink)
      return;
    indexLink.visible = false;
    if (effectName === "innerShadow" || effectName === "dropShadow") {
      indexInfo.counterAxisAlignItems = "MIN";
      const indexText = indexInfo.findOne((node) => node.name === "Text");
      if (!(indexText && indexText.type === "TEXT"))
        return;
      indexText.paragraphSpacing = 3;
    }
    indexes.appendChild(indexInfo);
  });
}
function addBorderRadius(frame, tagComponent, indexes) {
  if (frame.cornerRadius !== 0) {
    const tag = tagComponent.findOne(
      (node) => node.name === "type=cornerRadius"
    );
    if (!(tag && tag.type === "COMPONENT"))
      return;
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
        lbRadiusIndex
      ];
      cornerIndexes.forEach((node) => {
        indexes.appendChild(node);
      });
      return;
    }
  }
}
function addMaxWidth(frame, tagComponent, indexes, maxWidth) {
  if (maxWidth && maxWidth > 0) {
    const foundTagComponent = tagComponent.findOne(
      (node) => node.name === "type=size" && node.type === "COMPONENT"
    );
    if (!foundTagComponent || foundTagComponent.type !== "COMPONENT")
      return;
    const tag = foundTagComponent.createInstance();
    setTextContent(tag, "Text", `Maximal width - ${maxWidth}px`);
    indexes.appendChild(tag);
  }
}
function addStrokeInfo(frame, tagComp, indexes) {
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
          const foundTagComponent = tagComp.findOne(
            (node) => node.name === "type=info" && node.type === "COMPONENT"
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
        (node) => node.name === "type=info" && node.type === "COMPONENT"
      );
      if (!foundTagComponent || foundTagComponent.type !== "COMPONENT")
        return;
      const tag = foundTagComponent.createInstance();
      strokeWeight = frame.strokeWeight;
      setStrokeProps(tag, strokeWeight, strokeAlign, indexes, "Stroke");
    }
  }
}
function setStrokeProps(tag, strokeWeight, strokeAlign, indexes, strokeKind) {
  setTextContent(
    tag,
    "Text",
    `${strokeKind} - ${strokeWeight}px, ${strokeAlign}`
  );
  const indexLink = tag.findOne((element) => element.name === "link");
  indexLink.visible = false;
  indexes.appendChild(tag);
}
var tagDistanceFromObject;
var init_buildTags = __esm({
  "src/figma_functions/buildTags.ts"() {
    "use strict";
    init_lib();
    init_tns_subFunctions();
    init_tagBuilgingFunctions();
    init_utilityFunctions();
    init_getEffects();
    init_utilityFunctions();
    tagDistanceFromObject = 2;
  }
});

// src/figma_functions/buildAtomTags.ts
async function buildAtomTags(element, booleanProperties, elementSizes, variantProperties, labelComponent, tagComponentSet) {
  const tagGroups = [];
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
async function buildOneTag(element, booleanProperties, tagComponentSet, labelComponent, size) {
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
    setTextProps(title, "text", `Size - ${size == null ? void 0 : size.toUpperCase()}`);
  }
  return resultFrame;
}
function setTitlePosition(title, frame) {
  frame.appendChild(title);
  title.layoutPositioning = "ABSOLUTE";
  title.x = 16;
  title.y = 8;
  return title;
}
async function buildElementTags(element, booleanProperties, tagComponentSet) {
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
  console.log("tagBuildResults", tagBuildResults);
  if (!tagBuildResults)
    return currentAtom;
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
var init_buildAtomTags = __esm({
  "src/figma_functions/buildAtomTags.ts"() {
    "use strict";
    init_utilityFunctions();
    init_buildTags();
  }
});

// src/figma_layout_components/buildTag.ts
function addText(letterText) {
  const letter = figma.createText();
  letter.fills = [
    {
      type: "SOLID",
      visible: true,
      opacity: 1,
      blendMode: "NORMAL",
      color: {
        r: 1,
        g: 1,
        b: 1
      }
    }
  ];
  letter.fontSize = 14;
  letter.fontName = {
    family: "Inter",
    style: "Semi Bold"
  };
  letter.textCase = "UPPER";
  letter.characters = letterText;
  letter.textAlignHorizontal = "CENTER";
  letter.textAlignVertical = "CENTER";
  letter.lineHeight = {
    unit: "PERCENT",
    value: 2.9999999329447746
  };
  return letter;
}
async function createEllipse(textNode) {
  const TGGray900 = await setColorStyle(".TG-admin/anatomy-primary", "292929");
  const ellipse = figma.createFrame();
  ellipse.bottomLeftRadius = 50;
  ellipse.bottomRightRadius = 50;
  ellipse.topRightRadius = 50;
  ellipse.topLeftRadius = 50;
  await ellipse.setFillStyleIdAsync(TGGray900.id);
  ellipse.appendChild(textNode);
  ellipse.layoutPositioning = "AUTO";
  ellipse.layoutMode = "VERTICAL";
  ellipse.resize(24, 24);
  ellipse.primaryAxisAlignItems = "CENTER";
  ellipse.counterAxisAlignItems = "CENTER";
  ellipse.name = "index";
  return ellipse;
}
async function buildLine() {
  const line = figma.createVector();
  line.strokes = [
    {
      type: "SOLID",
      visible: true,
      opacity: 1,
      blendMode: "NORMAL",
      color: {
        r: 0.9833333492279053,
        g: 0.012291669845581055,
        b: 0.012291669845581055
      }
    }
  ];
  line.strokeAlign = "CENTER";
  line.strokeCap = "ROUND";
  line.strokeJoin = "MITER";
  line.strokeMiterLimit = 4;
  line.dashPattern = [1, 2];
  line.strokeWeight = 1;
  await line.setVectorNetworkAsync({
    regions: [],
    segments: [
      {
        start: 0,
        end: 1,
        tangentStart: {
          x: 0,
          y: 0
        },
        tangentEnd: {
          x: 0,
          y: 0
        }
      }
    ],
    vertices: [
      {
        x: 40,
        y: 0,
        strokeCap: "ROUND",
        strokeJoin: "MITER",
        cornerRadius: 0,
        handleMirroring: "NONE"
      },
      {
        x: 0,
        y: 4664075386320289e-28,
        strokeCap: "ROUND",
        strokeJoin: "MITER",
        cornerRadius: 0,
        handleMirroring: "NONE"
      }
    ]
  });
  return line;
}
async function createLineBox() {
  const TGGray900 = await setColorStyle(".TG-admin/anatomy-primary", "292929");
  const rect = await buildLine();
  rect.resize(40, rect.height);
  const lineBox = figma.createFrame();
  lineBox.appendChild(rect);
  lineBox.layoutPositioning = "AUTO";
  lineBox.layoutMode = "VERTICAL";
  lineBox.counterAxisAlignItems = "CENTER";
  lineBox.counterAxisSizingMode = "FIXED";
  lineBox.resize(24, 82);
  lineBox.layoutGrow = 1;
  lineBox.fills = [];
  rect.rotation = 90;
  rect.layoutGrow = 1;
  await rect.setStrokeStyleIdAsync(TGGray900.id);
  return lineBox;
}
async function buildLabelText(label) {
  const anatomyLabelsColor = await setColorStyle(
    ".TG-admin/anatomy-labels",
    "292929"
  );
  const labelText = figma.createText();
  await labelText.setFillStyleIdAsync(anatomyLabelsColor.id);
  labelText.fontSize = 14;
  labelText.fontName = {
    family: "Inter",
    style: "Medium"
  };
  labelText.characters = label;
  return labelText;
}
async function buildTag(letter, type, label, isLink = true) {
  const TGWhite = await setColorStyle(".TG-admin/anatomy-icon", "FFFFFF");
  const TGGray600 = await setColorStyle(
    ".TG-admin/anatomy-secondary",
    "707070"
  );
  const TGLightBlue500 = await setColorStyle(".TG-admin/links", "00B0FF");
  const TGGray900 = await setColorStyle(".TG-admin/anatomy-primary", "292929");
  const index = addText(`${letter}`);
  index.name = "elementIndex";
  const ellipse = await createEllipse(index);
  const tag = figma.createComponent();
  tag.layoutPositioning = "AUTO";
  if (type === "bottom") {
    const lineBox = await createLineBox();
    tag.counterAxisSizingMode = "AUTO";
    tag.layoutMode = "VERTICAL";
    tag.appendChild(ellipse);
    tag.appendChild(lineBox);
    tag.resize(24, 32);
    addNewTextProperty(tag, index, "index", "A");
    return tag;
  }
  if (type === "top") {
    const lineBox = await createLineBox();
    tag.counterAxisSizingMode = "AUTO";
    tag.layoutMode = "VERTICAL";
    tag.appendChild(lineBox);
    tag.appendChild(ellipse);
    tag.resize(24, 32);
    addNewTextProperty(tag, index, "index", "A");
    return tag;
  }
  if (type === "left") {
    const lineBox = await createLineBox();
    tag.counterAxisSizingMode = "AUTO";
    tag.layoutMode = "HORIZONTAL";
    tag.appendChild(lineBox);
    tag.appendChild(ellipse);
    lineBox.rotation = 90;
    lineBox.layoutAlign = "STRETCH";
    tag.resize(32, 24);
    addNewTextProperty(tag, index, "index", "A");
    return tag;
  }
  if (type === "right") {
    const lineBox = await createLineBox();
    tag.counterAxisSizingMode = "AUTO";
    tag.layoutMode = "HORIZONTAL";
    tag.appendChild(ellipse);
    tag.appendChild(lineBox);
    lineBox.rotation = 90;
    lineBox.layoutAlign = "STRETCH";
    tag.resize(32, 24);
    addNewTextProperty(tag, index, "index", "A");
    return tag;
  }
  if (type === "index") {
    tag.counterAxisSizingMode = "AUTO";
    tag.layoutMode = "HORIZONTAL";
    tag.appendChild(ellipse);
    tag.resize(24, 24);
    addNewTextProperty(tag, index, "index", "A");
    return tag;
  }
  if (type === "text" || type === "important" || type === "info" || type === "size" || type === "cornerRadius") {
    const text = await buildLabelText("text");
    tag.resize(24, 24);
    tag.counterAxisSizingMode = "AUTO";
    tag.counterAxisAlignItems = "CENTER";
    tag.itemSpacing = 8;
    tag.layoutMode = "HORIZONTAL";
    tag.appendChild(ellipse);
    tag.appendChild(text);
    if (isLink) {
      const linkText = await buildLabelText("link");
      await linkText.setFillStyleIdAsync(TGLightBlue500.id);
      linkText.textDecoration = "UNDERLINE";
      tag.appendChild(linkText);
      addNewTextProperty(tag, linkText, "link", "link");
      addNewBooleanProperty(tag, linkText, "Show link", true);
    }
    text.textCase = "ORIGINAL";
    if (type !== "text") {
      await ellipse.setFillStyleIdAsync(TGGray600.id);
    }
    if (type === "info") {
      ellipse.paddingLeft = 1;
      ellipse.paddingBottom = 1;
    }
    if (type === "size") {
      const icon = figma.createVector();
      await icon.setVectorNetworkAsync({
        regions: [
          {
            windingRule: "NONZERO",
            loops: [[0, 1, 2, 3, 4, 10, 5, 6, 7, 8, 9, 11]],
            fills: [
              {
                type: "SOLID",
                visible: true,
                opacity: 1,
                blendMode: "NORMAL",
                color: {
                  r: 1,
                  g: 1,
                  b: 1
                }
              }
            ],
            fillStyleId: ""
          }
        ],
        segments: [
          {
            start: 0,
            end: 1,
            tangentStart: {
              x: 0,
              y: 0
            },
            tangentEnd: {
              x: 0,
              y: 0
            }
          },
          {
            start: 2,
            end: 0,
            tangentStart: {
              x: 0,
              y: 0
            },
            tangentEnd: {
              x: 0,
              y: 0
            }
          },
          {
            start: 2,
            end: 3,
            tangentStart: {
              x: 0,
              y: 0
            },
            tangentEnd: {
              x: 0,
              y: 0
            }
          },
          {
            start: 4,
            end: 3,
            tangentStart: {
              x: 0,
              y: 0
            },
            tangentEnd: {
              x: 0,
              y: 0
            }
          },
          {
            start: 5,
            end: 4,
            tangentStart: {
              x: 0,
              y: 0
            },
            tangentEnd: {
              x: 0,
              y: 0
            }
          },
          {
            start: 7,
            end: 6,
            tangentStart: {
              x: 0,
              y: 0
            },
            tangentEnd: {
              x: 0,
              y: 0
            }
          },
          {
            start: 8,
            end: 7,
            tangentStart: {
              x: 0,
              y: 0
            },
            tangentEnd: {
              x: 0,
              y: 0
            }
          },
          {
            start: 8,
            end: 9,
            tangentStart: {
              x: 0,
              y: 0
            },
            tangentEnd: {
              x: 0,
              y: 0
            }
          },
          {
            start: 10,
            end: 9,
            tangentStart: {
              x: 0,
              y: 0
            },
            tangentEnd: {
              x: 0,
              y: 0
            }
          },
          {
            start: 11,
            end: 10,
            tangentStart: {
              x: 0,
              y: 0
            },
            tangentEnd: {
              x: 0,
              y: 0
            }
          },
          {
            start: 6,
            end: 5,
            tangentStart: {
              x: 0,
              y: 0
            },
            tangentEnd: {
              x: 0,
              y: 0
            }
          },
          {
            start: 1,
            end: 11,
            tangentStart: {
              x: 0,
              y: 0
            },
            tangentEnd: {
              x: 0,
              y: 0
            }
          }
        ],
        vertices: [
          {
            x: 0.998077392578125,
            y: 0,
            strokeCap: "NONE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE"
          },
          {
            x: 0,
            y: 0,
            strokeCap: "NONE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE"
          },
          {
            x: 0.998077392578125,
            y: 3,
            strokeCap: "NONE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE"
          },
          {
            x: 13.001922607421875,
            y: 3,
            strokeCap: "NONE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE"
          },
          {
            x: 13.001922607421875,
            y: 0,
            strokeCap: "NONE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE"
          },
          {
            x: 14,
            y: 0,
            strokeCap: "NONE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE"
          },
          {
            x: 14,
            y: 7,
            strokeCap: "NONE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE"
          },
          {
            x: 13.001922607421875,
            y: 7,
            strokeCap: "NONE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE"
          },
          {
            x: 13.001922607421875,
            y: 4,
            strokeCap: "NONE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE"
          },
          {
            x: 0.998077392578125,
            y: 4,
            strokeCap: "NONE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE"
          },
          {
            x: 0.998077392578125,
            y: 7,
            strokeCap: "NONE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE"
          },
          {
            x: 0,
            y: 7,
            strokeCap: "NONE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE"
          }
        ]
      });
      if (TGWhite) {
        await icon.setFillStyleIdAsync(TGWhite.id);
      }
      icon.strokes = [];
      ellipse.appendChild(icon);
    }
    if (type === "cornerRadius") {
      const icon = figma.createVector();
      await icon.setVectorNetworkAsync({
        regions: [
          {
            windingRule: "EVENODD",
            loops: [[4, 0, 5, 1, 6, 2, 7, 3]],
            fills: [
              {
                type: "SOLID",
                visible: true,
                opacity: 1,
                blendMode: "NORMAL",
                color: {
                  r: 1,
                  g: 1,
                  b: 1
                }
              }
            ],
            fillStyleId: ""
          }
        ],
        segments: [
          {
            start: 2,
            end: 1,
            tangentStart: {
              x: 0,
              y: -3.0373363494873047
            },
            tangentEnd: {
              x: 3.0373363494873047,
              y: 3250539302825928e-19
            }
          },
          {
            start: 4,
            end: 3,
            tangentStart: {
              x: 0,
              y: 0
            },
            tangentEnd: {
              x: 0,
              y: 0
            }
          },
          {
            start: 6,
            end: 5,
            tangentStart: {
              x: 2.485093116760254,
              y: 2658963203430176e-19
            },
            tangentEnd: {
              x: 0,
              y: -2.485093593597412
            }
          },
          {
            start: 0,
            end: 7,
            tangentStart: {
              x: 0,
              y: 0
            },
            tangentEnd: {
              x: 0,
              y: 0
            }
          },
          {
            start: 1,
            end: 0,
            tangentStart: {
              x: 0,
              y: 0
            },
            tangentEnd: {
              x: 0,
              y: 0
            }
          },
          {
            start: 3,
            end: 2,
            tangentStart: {
              x: 0,
              y: 0
            },
            tangentEnd: {
              x: 0,
              y: 0
            }
          },
          {
            start: 5,
            end: 4,
            tangentStart: {
              x: 0,
              y: 0
            },
            tangentEnd: {
              x: 0,
              y: 0
            }
          },
          {
            start: 7,
            end: 6,
            tangentStart: {
              x: 0,
              y: 0
            },
            tangentEnd: {
              x: 0,
              y: 0
            }
          }
        ],
        vertices: [
          {
            x: 10704994201660156e-20,
            y: 0,
            strokeCap: "SQUARE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE"
          },
          {
            x: 3.4851388931274414,
            y: 37297606468200684e-20,
            strokeCap: "SQUARE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE"
          },
          {
            x: 8.984550476074219,
            y: 5.500372886657715,
            strokeCap: "SQUARE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE"
          },
          {
            x: 8.984550476074219,
            y: 8.999931335449219,
            strokeCap: "SQUARE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE"
          },
          {
            x: 7.984550476074219,
            y: 8.999931335449219,
            strokeCap: "SQUARE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE"
          },
          {
            x: 7.984550476074219,
            y: 5.500372886657715,
            strokeCap: "SQUARE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE"
          },
          {
            x: 3.485032081604004,
            y: 1.0003730058670044,
            strokeCap: "SQUARE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE"
          },
          {
            x: 0,
            y: 1,
            strokeCap: "SQUARE",
            strokeJoin: "MITER",
            cornerRadius: 0,
            handleMirroring: "NONE"
          }
        ]
      });
      if (TGWhite) {
        await icon.setFillStyleIdAsync(TGWhite.id);
      }
      icon.strokes = [];
      ellipse.appendChild(icon);
    }
    if (type === "text") {
      if (TGGray900) {
        await ellipse.setFillStyleIdAsync(TGGray900.id);
      }
      addNewTextProperty(tag, index, "index", "A");
    }
    addNewTextProperty(tag, text, "label", "Text");
    return tag;
  }
}
var init_buildTag = __esm({
  "src/figma_layout_components/buildTag.ts"() {
    "use strict";
    init_utilityFunctions();
    init_addNewProperty();
  }
});

// src/figma_layout_components/buildTagComponent.ts
async function buildAllTags() {
  const tagBottomLine = await buildTag("A", "bottom");
  tagBottomLine.name = "type=bottom line";
  const tagTopLine = await buildTag("B", "top");
  tagTopLine.name = "type=top line";
  const tagLeftLine = await buildTag("C", "left");
  tagLeftLine.name = "type=left line";
  const tagRightLine = await buildTag("D", "right");
  tagRightLine.name = "type=right line";
  const tagIndex = await buildTag("E", "index");
  tagIndex.name = "type=index only";
  const tagText = await buildTag("F", "text", "Text");
  tagText.name = "type=text";
  const tagImportant = await buildTag("!", "important", "Text");
  tagImportant.name = "type=important";
  const tagInfo = await buildTag("\xBB", "info", "Text");
  tagInfo.name = "type=info";
  const tagSize = await buildTag("", "size", "Text", false);
  tagSize.name = "type=size";
  const tagCornerRadius = await buildTag("", "cornerRadius", "Text", false);
  tagCornerRadius.name = "type=cornerRadius";
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
    tagCornerRadius
  ];
  const tagComponentSet = figma.combineAsVariants(
    tags,
    figma.currentPage
  );
  if (!tags.length)
    return;
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
        b: 1
      },
      boundVariables: {}
    }
  ];
  tagComponentSet.paddingBottom = 20;
  tagComponentSet.paddingTop = 20;
  tagComponentSet.paddingLeft = 20;
  tagComponentSet.paddingRight = 20;
  tagComponentSet.cornerRadius = 28;
  tagComponentSet.resize(372, tagComponentSet.height);
  return tagComponentSet;
}
var init_buildTagComponent = __esm({
  "src/figma_layout_components/buildTagComponent.ts"() {
    "use strict";
    init_buildTag();
  }
});

// src/figma_doc_sections/buildAnatomySection.ts
async function buildAnatomySection(node, parentFrame) {
  const booleanProperties = await findAllBooleanProps(node);
  const elementSizes = await getElementSizes(node);
  const variantProperties = await findAllVariantProps(node);
  const labelComponent = buildLabelComponent();
  const tagComponent = await buildAllTags();
  const tags = await buildAtomTags(
    node,
    booleanProperties,
    elementSizes,
    variantProperties,
    labelComponent,
    tagComponent
  );
  tags.forEach((tag) => {
    parentFrame.appendChild(tag);
  });
  labelComponent.remove();
  tagComponent.remove();
  return parentFrame;
}
var init_buildAnatomySection = __esm({
  "src/figma_doc_sections/buildAnatomySection.ts"() {
    "use strict";
    init_utilityFunctions();
    init_utilityFunctions();
    init_utilityFunctions();
    init_buildLabelComponent();
    init_buildAtomTags();
    init_buildTagComponent();
  }
});

// src/figma_functions/getDate.ts
function getDate() {
  const today = /* @__PURE__ */ new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  return dd + "." + mm + "." + yyyy;
}
var init_getDate = __esm({
  "src/figma_functions/getDate.ts"() {
    "use strict";
  }
});

// src/figma_doc_sections/buildReleaseNotes.ts
function buildReleaseNotes(parentFrame) {
  const releaseNotes = buildAutoLayoutFrame(
    "release-notes",
    "VERTICAL",
    0,
    0,
    0
  );
  const titleRow = buildRow("Date", "Version", "Details", {
    family: "Inter",
    style: "Bold"
  });
  const firstRow = buildRow(date, "1.0.0", "Initial release", {
    family: "Inter",
    style: "Regular"
  });
  releaseNotes.appendChild(titleRow);
  releaseNotes.appendChild(firstRow);
  titleRow.layoutSizingHorizontal = "FILL";
  firstRow.layoutSizingHorizontal = "FILL";
  parentFrame.appendChild(releaseNotes);
  releaseNotes.layoutSizingHorizontal = "FILL";
}
function buildRow(dateString = date, versionString = "1.0.0", detailsString = "Initial release", fontName = { family: "Inter", style: "Regular" }) {
  const row = buildAutoLayoutFrame("title-row", "HORIZONTAL", 0, 0, 0);
  const dateCell = buildAutoLayoutFrame("date-cell", "HORIZONTAL", 0, 0, 0);
  dateCell.paddingBottom = 12;
  dateCell.paddingTop = 12;
  dateCell.paddingLeft = 12;
  dateCell.paddingRight = 12;
  const versionCell = dateCell.clone();
  const detailsCell = dateCell.clone();
  const dateText = figma.createText();
  dateText.characters = dateString;
  dateText.fontSize = 14;
  dateText.fontName = fontName;
  const versionText = dateText.clone();
  versionText.characters = versionString;
  const detailsText = dateText.clone();
  detailsText.characters = detailsString;
  dateCell.appendChild(dateText);
  versionCell.appendChild(versionText);
  detailsCell.appendChild(detailsText);
  row.appendChild(dateCell);
  row.appendChild(versionCell);
  row.appendChild(detailsCell);
  dateCell.resize(100, dateCell.height);
  versionCell.resize(80, versionCell.height);
  detailsCell.layoutSizingHorizontal = "FILL";
  row.strokes = [
    {
      type: "SOLID",
      visible: true,
      opacity: 1,
      blendMode: "NORMAL",
      color: {
        r: 0.8291666507720947,
        g: 0.8291666507720947,
        b: 0.8291666507720947
      },
      boundVariables: {}
    }
  ];
  row.strokeBottomWeight = 1;
  return row;
}
var date;
var init_buildReleaseNotes = __esm({
  "src/figma_doc_sections/buildReleaseNotes.ts"() {
    "use strict";
    init_getDate();
    init_utilityFunctions();
    date = getDate();
  }
});

// src/figma_layout_components/buildSizeMarker.ts
function addTextProperty(component, textNode) {
  component.addComponentProperty("text", "TEXT", `16`);
  const objName = Object.keys(component.componentPropertyDefinitions)[0];
  textNode.componentPropertyReferences = { characters: `${objName}` };
}
async function createMarkerLines(position) {
  const dsPink500 = await setColorStyle(".TG-admin/spacing-primary", "EC2D79");
  const frame = figma.createFrame();
  frame.fills = emptyFill;
  const line = figma.createLine();
  frame.appendChild(line);
  line.strokeWeight = 1;
  if (position === "top" || position === "bottom") {
    frame.strokeLeftWeight = 1;
    frame.strokeRightWeight = 1;
    line.constraints = {
      horizontal: "STRETCH",
      vertical: "CENTER"
    };
    line.y = 50;
    frame.resize(16, 5);
  }
  if (position === "left" || position === "right") {
    frame.strokeTopWeight = 1;
    frame.strokeBottomWeight = 1;
    line.constraints = {
      horizontal: "CENTER",
      vertical: "STRETCH"
    };
    line.rotation = 90;
    frame.resize(5, 15);
    line.x = 3;
    line.y = 15;
  }
  await frame.setStrokeStyleIdAsync(dsPink500.id);
  await line.setStrokeStyleIdAsync(dsPink500.id);
  frame.name = `${TG_SIZE_MARKER}-marker`;
  frame.layoutAlign = "STRETCH";
  return frame;
}
async function createAnatomySpacingsText(size) {
  const dsGray900 = await setColorStyle(".TG-admin/spacing-text", "292929");
  const meterValue = figma.createText();
  meterValue.fontSize = 14;
  meterValue.fontName = {
    family: "Inter",
    style: "Regular"
  };
  meterValue.characters = `${size}`;
  meterValue.name = `${TG_SIZE_MARKER}-value`;
  meterValue.layoutAlign = "INHERIT";
  meterValue.textAlignHorizontal = "CENTER";
  await meterValue.setFillStyleIdAsync(dsGray900.id);
  return meterValue;
}
async function createAnatomySpacingsMeter(size, position) {
  const meter = figma.createFrame();
  const marker = await createMarkerLines(position);
  const value = await createAnatomySpacingsText(size);
  meter.layoutPositioning = "AUTO";
  meter.itemSpacing = 0;
  meter.layoutAlign = "STRETCH";
  meter.layoutGrow = 0;
  meter.layoutMode = "VERTICAL";
  meter.counterAxisAlignItems = "CENTER";
  if (position === "top") {
    meter.appendChild(value);
    meter.appendChild(marker);
    meter.paddingBottom = 8;
  }
  if (position === "bottom") {
    meter.appendChild(marker);
    meter.appendChild(value);
    meter.paddingTop = 8;
  }
  if (position === "left") {
    meter.layoutMode = "HORIZONTAL";
    meter.appendChild(value);
    meter.appendChild(marker);
    meter.paddingRight = 8;
  }
  if (position === "right") {
    meter.layoutMode = "HORIZONTAL";
    meter.appendChild(marker);
    meter.appendChild(value);
    meter.paddingLeft = 8;
  }
  meter.itemSpacing = 4;
  meter.name = `${TG_SIZE_MARKER}-element`;
  meter.fills = emptyFill;
  meter.clipsContent = false;
  return meter;
}
async function createAnatomySpacings(size, position) {
  const spacingMarker = figma.createComponent();
  spacingMarker.layoutPositioning = "AUTO";
  spacingMarker.layoutAlign = "STRETCH";
  const meter = await createAnatomySpacingsMeter(size, position);
  if (position === "top") {
    spacingMarker.name = "position=top";
    spacingMarker.appendChild(meter);
  }
  if (position === "bottom") {
    spacingMarker.name = "position=bottom";
    spacingMarker.appendChild(meter);
  }
  if (position === "left") {
    spacingMarker.name = "position=left";
    spacingMarker.appendChild(meter);
  }
  if (position === "right") {
    spacingMarker.name = "position=right";
    spacingMarker.appendChild(meter);
  }
  if (position === "top" || position === "bottom") {
    spacingMarker.layoutMode = "VERTICAL";
  }
  if (position === "left" || position === "right") {
    spacingMarker.layoutMode = "HORIZONTAL";
  }
  const valueText = meter.children.find((node) => node.type === "TEXT");
  if (!(valueText && valueText.type === "TEXT"))
    return;
  addTextProperty(spacingMarker, valueText);
  return spacingMarker;
}
async function buildSizeMarkerComponentSet() {
  const toolsPage = figma.currentPage;
  const spacingTop = await createAnatomySpacings("16", "top");
  const spacingBottom = await createAnatomySpacings("16", "bottom");
  const spacingLeft = await createAnatomySpacings("16", "left");
  const spacingRight = await createAnatomySpacings("16", "right");
  const spacings = [spacingTop, spacingBottom, spacingLeft, spacingRight];
  if (!spacings)
    return;
  for (const node of spacings) {
    if (!node)
      return;
    toolsPage.appendChild(node);
  }
  const spacingComponentSet = figma.combineAsVariants(
    spacings,
    toolsPage
  );
  return spacingComponentSet;
}
var TG_SIZE_MARKER, emptyFill, buildSizeMarker_default;
var init_buildSizeMarker = __esm({
  "src/figma_layout_components/buildSizeMarker.ts"() {
    "use strict";
    init_utilityFunctions();
    TG_SIZE_MARKER = ".TG-size-marker";
    emptyFill = [
      {
        type: "SOLID",
        visible: false,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 1,
          g: 1,
          b: 1
        }
      }
    ];
    buildSizeMarker_default = buildSizeMarkerComponentSet;
  }
});

// src/figma_layout_components/buildSpacingMarker.ts
async function buildLine2() {
  const line = figma.createVector();
  line.strokes = [
    {
      type: "SOLID",
      visible: true,
      opacity: 1,
      blendMode: "NORMAL",
      color: {
        r: 0.9833333492279053,
        g: 0.012291669845581055,
        b: 0.012291669845581055
      }
    }
  ];
  line.strokeAlign = "CENTER";
  line.strokeCap = "ROUND";
  line.strokeJoin = "MITER";
  line.strokeMiterLimit = 4;
  line.dashPattern = [1, 2];
  line.strokeWeight = 0.5;
  await line.setVectorNetworkAsync({
    regions: [],
    segments: [
      {
        start: 0,
        end: 1,
        tangentStart: {
          x: 0,
          y: 0
        },
        tangentEnd: {
          x: 0,
          y: 0
        }
      }
    ],
    vertices: [
      {
        x: 40,
        y: 0,
        strokeCap: "ROUND",
        strokeJoin: "MITER",
        cornerRadius: 0,
        handleMirroring: "NONE"
      },
      {
        x: 0,
        y: 4664075386320289e-28,
        strokeCap: "ROUND",
        strokeJoin: "MITER",
        cornerRadius: 0,
        handleMirroring: "NONE"
      }
    ]
  });
  return line;
}
function addTextProperty2(component, textNode) {
  component.addComponentProperty("text", "TEXT", `16`);
  const objName = Object.keys(component.componentPropertyDefinitions)[0];
  textNode.componentPropertyReferences = { characters: `${objName}` };
}
async function createAnatomySpacingsText2(size) {
  const dsGray900 = await setColorStyle(".TG-admin/spacing-text", "292929");
  const meterValue = figma.createText();
  meterValue.fontSize = 14;
  meterValue.fontName = {
    family: "Inter",
    style: "Regular"
  };
  meterValue.characters = `${size}`;
  await meterValue.setFillStyleIdAsync(dsGray900.id);
  meterValue.name = `${TG_SPACING_MARKER}-value`;
  meterValue.layoutAlign = "INHERIT";
  meterValue.textAlignHorizontal = "CENTER";
  return meterValue;
}
async function createAnatomyBar(position) {
  const dsPink500 = await setColorStyle(".TG-admin/spacing-primary", "EC2D79");
  const bar = figma.createFrame();
  bar.name = `${TG_SPACING_MARKER}-bar`;
  bar.resize(16, 88);
  await bar.setFillStyleIdAsync(dsPink500.id);
  bar.opacity = 0.4;
  bar.layoutPositioning = "AUTO";
  bar.layoutAlign = "STRETCH";
  bar.layoutMode = "VERTICAL";
  bar.layoutGrow = 1;
  if (position === "left" || position === "right") {
    bar.layoutMode = "HORIZONTAL";
  }
  return bar;
}
async function createAnatomySpacings2(size, position) {
  const dsPink500 = await setColorStyle(".TG-admin/spacing-primary", "EC2D79");
  const spacingMarker = figma.createComponent();
  const value = await createAnatomySpacingsText2(size);
  const line = await buildLine2();
  line.resize(TG_SPACING_MARKER_HAND_LENGTH, line.height);
  await line.setStrokeStyleIdAsync(dsPink500.id);
  line.name = `marker-hand`;
  spacingMarker.layoutPositioning = "AUTO";
  spacingMarker.itemSpacing = 2;
  spacingMarker.layoutAlign = "STRETCH";
  const bar = await createAnatomyBar(position);
  if (position === "top") {
    spacingMarker.name = "position=top";
    spacingMarker.appendChild(value);
    spacingMarker.appendChild(line);
    line.rotation = 90;
    spacingMarker.appendChild(bar);
  }
  if (position === "bottom") {
    spacingMarker.name = "position=bottom";
    spacingMarker.appendChild(bar);
    spacingMarker.appendChild(line);
    line.rotation = 90;
    spacingMarker.appendChild(value);
  }
  if (position === "left") {
    spacingMarker.name = "position=left";
    spacingMarker.appendChild(value);
    spacingMarker.appendChild(line);
    spacingMarker.appendChild(bar);
  }
  if (position === "right") {
    spacingMarker.name = "position=right";
    spacingMarker.appendChild(bar);
    spacingMarker.appendChild(line);
    spacingMarker.appendChild(value);
  }
  spacingMarker.counterAxisAlignItems = "CENTER";
  if (position === "top" || position === "bottom") {
    spacingMarker.layoutMode = "VERTICAL";
    spacingMarker.resize(16, 160);
  }
  if (position === "left" || position === "right") {
    spacingMarker.layoutMode = "HORIZONTAL";
    spacingMarker.resize(160, 16);
  }
  addTextProperty2(spacingMarker, value);
  return spacingMarker;
}
async function buildSpacingMarkerComponentSet() {
  const toolsPage = figma.currentPage;
  const spacingTop = await createAnatomySpacings2("16", "top");
  const spacingBottom = await createAnatomySpacings2("16", "bottom");
  const spacingLeft = await createAnatomySpacings2("16", "left");
  const spacingRight = await createAnatomySpacings2("16", "right");
  const spacings = [spacingTop, spacingBottom, spacingLeft, spacingRight];
  spacings.forEach((node) => toolsPage.appendChild(node));
  const spacingComponentSet = figma.combineAsVariants(spacings, toolsPage);
  spacingLeft.resize(120, 16);
  spacingRight.resize(120, 16);
  return spacingComponentSet;
}
var TG_SPACING_MARKER, TG_SPACING_MARKER_HAND_LENGTH, buildSpacingMarker_default;
var init_buildSpacingMarker = __esm({
  "src/figma_layout_components/buildSpacingMarker.ts"() {
    "use strict";
    init_utilityFunctions();
    TG_SPACING_MARKER = ".TG-spacing-marker";
    TG_SPACING_MARKER_HAND_LENGTH = 40;
    buildSpacingMarker_default = buildSpacingMarkerComponentSet;
  }
});

// src/figma_functions/getElementsSizes.ts
function researchNodes(frame, arrX, arrY, isShallow) {
  if (frame && frame.children) {
    frame.children.forEach((node) => {
      if (!(node.type === "INSTANCE" || node.type === "FRAME" || node.type === "TEXT"))
        return;
      if (node.visible === true) {
        if (
          // !node.children ||
          node.type === "TEXT" || node.children.length === 0 || node.type === "INSTANCE" || node.layoutMode !== frame.layoutMode || isShallow && node.type === "FRAME"
        ) {
          getCoordinates(node, arrX, arrY);
        } else {
          researchNodes(node, arrX, arrY);
        }
      }
    });
  }
}
function getCoordinates(node, arrX, arrY) {
  if (node.absoluteBoundingBox && node.absoluteBoundingBox.width > 0.01 && node.absoluteBoundingBox.height > 0.01) {
    arrX.push([
      node.absoluteBoundingBox.x,
      node.absoluteBoundingBox.x + node.absoluteBoundingBox.width,
      node.absoluteBoundingBox.width
    ]);
    arrY.push([
      node.absoluteBoundingBox.y,
      node.absoluteBoundingBox.y + node.absoluteBoundingBox.height,
      node.absoluteBoundingBox.height
    ]);
  }
}
var init_getElementsSizes = __esm({
  "src/figma_functions/getElementsSizes.ts"() {
    "use strict";
  }
});

// src/figma_functions/getMarkerComponent.ts
function getMarkerComponent(sizeMarker, spacingMarker, markerPosition, type = "spacing") {
  const page = figma.currentPage;
  const spacingSet = type === "size" ? sizeMarker : spacingMarker;
  const spacing = spacingSet.findOne(
    (node) => node !== null && node.name === `position=${markerPosition}`
  );
  if (!spacing || spacing.type !== "COMPONENT")
    return;
  const spacingInstance = spacing.createInstance();
  page.appendChild(spacingInstance);
  return spacingInstance;
}
var init_getMarkerComponent = __esm({
  "src/figma_functions/getMarkerComponent.ts"() {
    "use strict";
  }
});

// src/figma_functions/setMarkerSizeProps.ts
function setMarkerSizeProps(rootSize, markerSize, marker, units, direction, frame) {
  if (units === "rem") {
    const remSize = Math.round(+markerSize / rootSize * 1e3) / 1e3;
    setTextProps(marker, "text", `${remSize}rem`);
  }
  if (units === "percent") {
    if (direction === "VERTICAL") {
      const percentSize = Math.ceil(+markerSize / frame.height * 100);
      setTextProps(marker, "text", `${percentSize}%`);
    }
    if (direction === "HORIZONTAL") {
      const percentSize = Math.ceil(+markerSize / frame.width * 100);
      setTextProps(marker, "text", `${percentSize}%`);
    }
  }
  if (units === "px") {
    setTextProps(marker, "text", `${markerSize}`);
  }
}
var init_setMarkerSizeProps = __esm({
  "src/figma_functions/setMarkerSizeProps.ts"() {
    "use strict";
    init_utilityFunctions();
  }
});

// src/figma_functions/buldMarksForHorizontal.ts
function buildMarksForHorizontal(frame, elementsDimensions, yPos, rootElementSize, units, sizeMarker, spacingMarker) {
  const spacings = [];
  elementsDimensions.forEach((element, index, array) => {
    if (index < array.length - 1) {
      const space = array[index + 1][0] - array[index][1];
      if (space > 0) {
        const marker = getMarkerComponent(sizeMarker, spacingMarker, "top");
        if (!marker)
          return;
        const markerHandLength = marker.children[1].width;
        marker.resize(space, frame.height + markerHandLength + 21);
        marker.x = array[index][1];
        marker.y = yPos - markerHandLength - 21;
        setMarkerSizeProps(
          rootElementSize,
          space,
          marker,
          units,
          "HORIZONTAL",
          frame
        );
        marker.name = `.spacing-marker-${index + 1}_horizontal`;
        spacings.push(marker);
      }
    }
  });
  if (spacings.length > 0 && frame.parent) {
    const spacingGroup = figma.group(spacings, frame.parent);
    spacingGroup.name = "spacings";
  }
  return spacings;
}
var init_buldMarksForHorizontal = __esm({
  "src/figma_functions/buldMarksForHorizontal.ts"() {
    "use strict";
    init_getMarkerComponent();
    init_setMarkerSizeProps();
  }
});

// src/figma_functions/buildMarksForVertical.ts
function buildMarksForVertical(frame, elementsDimensions, xPos, rootElementSize, units, sizeMarker, spacingMarker) {
  const spacings = [];
  elementsDimensions.forEach((element, index, array) => {
    if (index < array.length - 1) {
      const space = array[index + 1][0] - array[index][1];
      if (space > 0) {
        const marker = getMarkerComponent(sizeMarker, spacingMarker, "right");
        if (!marker)
          return;
        marker.x = xPos;
        marker.y = array[index][1];
        setMarkerSizeProps(
          rootElementSize,
          space,
          marker,
          units,
          "VERTICAL",
          frame
        );
        const shift = getMarkerShift(marker);
        marker.resize(frame.width + shift, space);
        marker.name = `.spacing-marker-${index + 1}_vertical`;
        spacings.push(marker);
      }
    }
  });
  if (spacings.length > 0 && frame.parent) {
    const spacingGroup = figma.group(spacings, frame.parent);
    spacingGroup.name = "spacings";
  }
  return spacings;
}
var init_buildMarksForVertical = __esm({
  "src/figma_functions/buildMarksForVertical.ts"() {
    "use strict";
    init_tns_subFunctions();
    init_getMarkerComponent();
    init_setMarkerSizeProps();
  }
});

// src/figma_functions/buildMarksForPaddings.ts
function findPaddings(frame) {
  var _a, _b;
  const elementPaddings = {
    topPadding: {},
    rightPadding: {},
    bottomPadding: {},
    leftPadding: {}
  };
  const frameParameters = {};
  frameParameters.paddingLeft = frame.paddingLeft;
  frameParameters.paddingRight = frame.paddingRight;
  frameParameters.paddingTop = frame.paddingTop;
  frameParameters.paddingBottom = frame.paddingBottom;
  frameParameters.width = frame.width;
  frameParameters.height = frame.height;
  frameParameters.x = (_a = frame.absoluteBoundingBox) == null ? void 0 : _a.x;
  frameParameters.y = (_b = frame.absoluteBoundingBox) == null ? void 0 : _b.y;
  if (frame.children) {
    const children = figma.group(frame.children, frame);
    if (!frame.absoluteBoundingBox || !children.absoluteBoundingBox)
      return;
    elementPaddings.topPadding.y = frame.absoluteBoundingBox.y;
    elementPaddings.topPadding.size = frameParameters.paddingTop || children.absoluteBoundingBox.y - frame.absoluteBoundingBox.y;
    elementPaddings.bottomPadding.y = frameParameters.paddingBottom ? frame.absoluteBoundingBox.y + frameParameters.height - frameParameters.paddingBottom : children.absoluteBoundingBox.y + children.absoluteBoundingBox.height;
    elementPaddings.bottomPadding.size = frameParameters.paddingBottom || frame.absoluteBoundingBox.y + frameParameters.height - (children.absoluteBoundingBox.y + children.absoluteBoundingBox.height);
    elementPaddings.leftPadding.x = frame.absoluteBoundingBox.x;
    elementPaddings.leftPadding.size = frameParameters.paddingLeft || children.absoluteBoundingBox.x - frame.absoluteBoundingBox.x;
    elementPaddings.rightPadding.x = frameParameters.paddingRight ? frame.absoluteBoundingBox.x + frameParameters.width - frameParameters.paddingRight : children.absoluteBoundingBox.x + children.absoluteBoundingBox.width;
    elementPaddings.rightPadding.size = frameParameters.paddingRight || frame.absoluteBoundingBox.x + frameParameters.width - (children.absoluteBoundingBox.x + children.absoluteBoundingBox.width);
    figma.ungroup(children);
  }
  return elementPaddings;
}
function buildMarksForPaddings(node, rootSize, units, sizeMarker, spacingMarker) {
  var _a, _b, _c;
  const elementPaddings = findPaddings(node);
  const paddingMarkers = [];
  if (!elementPaddings)
    return;
  if (elementPaddings.leftPadding.size && elementPaddings.leftPadding.size > 0.01) {
    const leftPaddingMarker = getMarkerComponent(
      sizeMarker,
      spacingMarker,
      "top"
    );
    if (!leftPaddingMarker)
      return;
    const markerHandLength = leftPaddingMarker.children[1].width;
    if (elementPaddings.leftPadding.x)
      leftPaddingMarker.x = elementPaddings.leftPadding.x;
    if (node.absoluteBoundingBox)
      leftPaddingMarker.y = node.absoluteBoundingBox.y - markerHandLength - 21;
    leftPaddingMarker.resize(
      elementPaddings.leftPadding.size,
      node.height + markerHandLength + 21
    );
    setMarkerSizeProps(
      rootSize,
      elementPaddings.leftPadding.size,
      leftPaddingMarker,
      units,
      "HORIZONTAL",
      node
    );
    leftPaddingMarker.name = ".padding-marker_left";
    paddingMarkers.push(leftPaddingMarker);
  }
  if (elementPaddings.rightPadding.size && elementPaddings.rightPadding.size > 0.01) {
    const rightPaddingMarker = getMarkerComponent(
      sizeMarker,
      spacingMarker,
      "top"
    );
    if (!rightPaddingMarker)
      return;
    const markerHandLength = rightPaddingMarker.children[1].width;
    rightPaddingMarker.x = (_a = elementPaddings.rightPadding.x) != null ? _a : 0;
    rightPaddingMarker.y = node.absoluteBoundingBox ? node.absoluteBoundingBox.y - markerHandLength - 21 : 0;
    rightPaddingMarker.resize(
      elementPaddings.rightPadding.size,
      node.height + markerHandLength + 21
    );
    setMarkerSizeProps(
      rootSize,
      elementPaddings.rightPadding.size,
      rightPaddingMarker,
      units,
      "HORIZONTAL",
      node
    );
    rightPaddingMarker.name = ".padding-marker_right";
    paddingMarkers.push(rightPaddingMarker);
  }
  if (elementPaddings.topPadding.size && elementPaddings.topPadding.size > 0.01) {
    const topPaddingMarker = getMarkerComponent(
      sizeMarker,
      spacingMarker,
      "right"
    );
    if (!topPaddingMarker)
      return;
    topPaddingMarker.y = (_b = elementPaddings.topPadding.y) != null ? _b : 0;
    if (node.absoluteBoundingBox)
      topPaddingMarker.x = node.absoluteBoundingBox.x;
    setMarkerSizeProps(
      rootSize,
      elementPaddings.topPadding.size,
      topPaddingMarker,
      units,
      "VERTICAL",
      node
    );
    const shift = getMarkerShift(topPaddingMarker);
    topPaddingMarker.resize(
      node.width + shift,
      elementPaddings.topPadding.size
    );
    topPaddingMarker.name = ".padding-marker_top";
    paddingMarkers.push(topPaddingMarker);
  }
  if (elementPaddings.bottomPadding.size && elementPaddings.bottomPadding.size > 0.01) {
    const bottomPaddingMarker = getMarkerComponent(
      sizeMarker,
      spacingMarker,
      "right"
    );
    if (!bottomPaddingMarker)
      return;
    bottomPaddingMarker.y = (_c = elementPaddings.bottomPadding.y) != null ? _c : 0;
    if (node.absoluteBoundingBox)
      bottomPaddingMarker.x = node.absoluteBoundingBox.x;
    setMarkerSizeProps(
      rootSize,
      elementPaddings.bottomPadding.size,
      bottomPaddingMarker,
      units,
      "VERTICAL",
      node
    );
    const shift = getMarkerShift(bottomPaddingMarker);
    bottomPaddingMarker.resize(
      node.width + shift,
      elementPaddings.bottomPadding.size
    );
    bottomPaddingMarker.name = ".padding-marker_bottom";
    paddingMarkers.push(bottomPaddingMarker);
  }
  return paddingMarkers;
}
var buildMarksForPaddings_default;
var init_buildMarksForPaddings = __esm({
  "src/figma_functions/buildMarksForPaddings.ts"() {
    "use strict";
    init_tns_subFunctions();
    init_getMarkerComponent();
    init_setMarkerSizeProps();
    buildMarksForPaddings_default = buildMarksForPaddings;
  }
});

// src/figma_functions/getFrameMeasurements.ts
function getFrameMeasurements2(frame, rootElementSize, units, sizeMarker, spacingMarker) {
  const rightMarker = getMarkerComponent(
    sizeMarker,
    spacingMarker,
    "right",
    "size"
  );
  const bottomMarker = getMarkerComponent(
    sizeMarker,
    spacingMarker,
    "bottom",
    "size"
  );
  if (rightMarker) {
    setMarkerSizeProps(
      rootElementSize,
      frame.height,
      rightMarker,
      units,
      "VERTICAL",
      frame
    );
    rightMarker.resize(rightMarker.width, frame.height);
    rightMarker.x = frame.x + frame.width;
    rightMarker.y = frame.y;
    rightMarker.name = ".frame-size_left";
  }
  if (bottomMarker) {
    setMarkerSizeProps(
      rootElementSize,
      frame.width,
      bottomMarker,
      units,
      "HORIZONTAL",
      frame
    );
    bottomMarker.resize(frame.width, bottomMarker.height);
    bottomMarker.x = frame.x;
    bottomMarker.y = frame.y + frame.height;
    bottomMarker.name = ".frame-size_bottom";
  }
  return [rightMarker, bottomMarker];
}
var init_getFrameMeasurements = __esm({
  "src/figma_functions/getFrameMeasurements.ts"() {
    "use strict";
    init_getMarkerComponent();
    init_setMarkerSizeProps();
  }
});

// src/figma_functions/buildSpacingMarks.ts
function buildSpacingMarks(frame, selectedCheckboxes, sizeMarker, spacingMarker) {
  try {
    const spacingMarkers = [];
    const workingFrame = cloneFrame(frame);
    workingFrame.effects = [];
    elementsCoordinatesAndDimensionsX.length = 0;
    elementsCoordinatesAndDimensionsY.length = 0;
    researchNodes(
      workingFrame,
      elementsCoordinatesAndDimensionsX,
      elementsCoordinatesAndDimensionsY,
      selectedCheckboxes.isShallow
    );
    if (selectedCheckboxes.paddings) {
      const paddingMarkers = buildMarksForPaddings_default(
        workingFrame,
        selectedCheckboxes.rootElementSize,
        selectedCheckboxes.units,
        sizeMarker,
        spacingMarker
      );
      if (paddingMarkers)
        spacingMarkers.push(...paddingMarkers);
    }
    if (selectedCheckboxes.itemspacings) {
      if (workingFrame.layoutMode === "VERTICAL" && workingFrame.absoluteBoundingBox) {
        const verticalMarkers = buildMarksForVertical(
          workingFrame,
          elementsCoordinatesAndDimensionsY,
          workingFrame.absoluteBoundingBox.x,
          selectedCheckboxes.rootElementSize,
          selectedCheckboxes.units,
          sizeMarker,
          spacingMarker
        );
        spacingMarkers.push(...verticalMarkers);
      } else if (workingFrame.absoluteBoundingBox) {
        const horizontalMarkers = buildMarksForHorizontal(
          workingFrame,
          elementsCoordinatesAndDimensionsX,
          workingFrame.absoluteBoundingBox.y,
          selectedCheckboxes.rootElementSize,
          selectedCheckboxes.units,
          sizeMarker,
          spacingMarker
        );
        spacingMarkers.push(...horizontalMarkers);
      }
    }
    if (selectedCheckboxes.size) {
      const sizeMarkers = getFrameMeasurements2(
        workingFrame,
        selectedCheckboxes.rootElementSize,
        selectedCheckboxes.units,
        sizeMarker,
        spacingMarker
      );
      spacingMarkers.push(...sizeMarkers);
    }
    workingFrame.remove();
    return spacingMarkers;
  } catch (err) {
  }
}
var elementsCoordinatesAndDimensionsX, elementsCoordinatesAndDimensionsY, buildSpacingMarks_default;
var init_buildSpacingMarks = __esm({
  "src/figma_functions/buildSpacingMarks.ts"() {
    "use strict";
    init_utilityFunctions();
    init_getElementsSizes();
    init_buldMarksForHorizontal();
    init_buildMarksForVertical();
    init_buildMarksForPaddings();
    init_getFrameMeasurements();
    elementsCoordinatesAndDimensionsX = [];
    elementsCoordinatesAndDimensionsY = [];
    buildSpacingMarks_default = buildSpacingMarks;
  }
});

// src/figma_functions/setSizingMarkerValue.ts
function setSizingMarkerValue(node, position = `${node.componentProperties.position.value}`) {
  const markerText = node.findOne((node2) => node2.type === "TEXT");
  if (!markerText)
    return;
  if (position === "left" || position === "right") {
    setTextProps(node, "text", `${Math.round(node.height)}`);
    if (markerText) {
      const diff = 16 - markerText.width;
      const newWidth = node.width - diff;
      node.resize(newWidth, node.height);
    }
  } else {
    if (markerText.type === "TEXT") {
      markerText.characters = `${Math.round(node.width)}`;
    }
  }
}
var init_setSizingMarkerValue = __esm({
  "src/figma_functions/setSizingMarkerValue.ts"() {
    "use strict";
    init_utilityFunctions();
  }
});

// src/figma_functions/buildDefaultSpacings.ts
async function buildAtomSpacings(element, booleanProperties, labelComponent, elementType, buttonSizes, variantProperties, sizeMarker, spacingMarker) {
  turnAllBooleansOn(element, booleanProperties);
  const page = figma.currentPage;
  const spacingGroups = [];
  if (buttonSizes.length) {
    await buildForManySizes(
      buttonSizes,
      variantProperties,
      element,
      booleanProperties,
      elementType,
      page,
      labelComponent,
      spacingGroups,
      sizeMarker,
      spacingMarker
    );
  } else {
    const spacingGroup = await buildOneSpacingGroup(
      element,
      booleanProperties,
      elementType,
      page,
      labelComponent,
      sizeMarker,
      spacingMarker
    );
    spacingGroups.push(spacingGroup);
  }
  return spacingGroups;
}
async function buildForManySizes(buttonSizes, variantProperties, element, booleanProperties, elementType, page, labelComponent, spacingGroups, sizeMarker, spacingMarker) {
  for (const size of buttonSizes) {
    const propNames = Object.keys(variantProperties);
    const sizeProp = propNames.find(
      (propName) => propName.toLowerCase() === "size"
    );
    if (sizeProp) {
      setVariantProps(element, sizeProp, size);
    }
    const spacingGroup = await buildOneSpacingGroup(
      element,
      booleanProperties,
      elementType,
      page,
      labelComponent,
      sizeMarker,
      spacingMarker,
      size
    );
    spacingGroups.push(spacingGroup);
  }
}
function buildOneSpacingGroup(element, booleanProperties, elementType, page, labelComponent, sizeMarker, spacingMarker, size) {
  const elementSize = element.clone();
  const elementPadding = element.clone();
  const elementHSpacing = element.clone();
  const sizes = buildSizeMarkers(elementSize, sizeMarker, spacingMarker);
  const paddings = buildPaddingMarkers(
    elementPadding,
    sizeMarker,
    spacingMarker
  );
  const spacings = buildSpacingMarkers(
    elementHSpacing,
    // elementType,
    sizeMarker,
    spacingMarker
  );
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
async function arrangeFrameContents(elementSize, elementPadding, elementHSpacing, sizes, element, page, paddings, spacings, labelComponent, size) {
  const {
    sizeGroup,
    paddingsGroup,
    spacingsGroup
  } = buildSpacingsGroups(
    elementSize,
    elementPadding,
    elementHSpacing,
    sizes,
    element,
    page,
    paddings,
    spacings
  );
  const isPaddings = paddings && paddings.length > 0 ? true : false;
  const isSpacings = spacings && spacings.length > 0 ? true : false;
  const { sizeTitle, paddingsTitle, spacingsTitle } = await buildLabels(
    labelComponent,
    page
  );
  const { sizeAl, paddingsAl, spacingsAl } = await placeLabels(
    sizeTitle,
    sizeGroup,
    paddingsTitle,
    paddingsGroup,
    spacingsTitle,
    spacingsGroup
  );
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
function arrangeResultFrame(sizeAl, isPaddings, isSpacings, paddingsAl, spacingsAl, size) {
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
function buildSpacingsGroups(elementSize, elementPadding, elementHSpacing, sizes, element, page, paddings, spacings) {
  let sizeGroup = elementSize;
  let paddingsGroup = elementPadding;
  let spacingsGroup = elementHSpacing;
  if (sizes) {
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
async function placeLabels(sizeTitle, sizeGroup, paddingsTitle, paddingsGroup, spacingsTitle, spacingsGroup) {
  const dsGray100 = await setColorStyle(
    ".TG-admin/spacing-block-background",
    "F5F5F5"
  );
  const sizeAl = buildAutoLayoutFrame("sizeFrame", "VERTICAL", 0, 50);
  sizeAl.counterAxisAlignItems = "CENTER";
  await sizeAl.setFillStyleIdAsync(dsGray100.id);
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
  setTitlePosition2(sizeTitle, sizeAl);
  setTitlePosition2(paddingsTitle, paddingsAl);
  setTitlePosition2(spacingsTitle, spacingsAl);
  spacingsAl.appendChild(spacingsGroup);
  return { sizeAl, paddingsAl, spacingsAl };
}
function setTitlePosition2(title, frame) {
  frame.appendChild(title);
  title.layoutPositioning = "ABSOLUTE";
  title.x = 16;
  title.y = 8;
}
async function buildLabels(labelComponent, page) {
  const dsGray600 = await setColorStyle(
    ".TG-admin/spacing-block-label",
    "707070"
  );
  const sizeTitle = labelComponent.createInstance();
  if (sizeTitle.children[0] && sizeTitle.children[0].type === "TEXT") {
    await sizeTitle.children[0].setFillStyleIdAsync(dsGray600.id);
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
function buildSizeMarkers(elementSize, sizeMarker, spacingMarker) {
  const sizeMarkers = buildSpacingMarks_default(
    elementSize,
    {
      size: true,
      paddings: false,
      itemspacings: false,
      sameSpacingsColor: true
    },
    sizeMarker,
    spacingMarker
  );
  if (!sizeMarkers)
    return;
  sizeMarkers.forEach((marker) => {
    if (marker) {
      const position = `${marker.componentProperties.position.value}`;
      setSizingMarkerValue(marker, position);
      if (position === "bottom") {
        try {
          setMinSizeMarkerValue(elementSize, marker);
        } catch (error) {
        }
      }
    }
  });
  return sizeMarkers;
}
function buildPaddingMarkers(elementPadding, sizeMarker, spacingMarker) {
  const paddingMarkers = buildSpacingMarks_default(
    elementPadding,
    {
      size: false,
      paddings: true,
      itemspacings: false,
      sameSpacingsColor: false,
      isShallow: true
    },
    sizeMarker,
    spacingMarker
  );
  paddingMarkers == null ? void 0 : paddingMarkers.forEach((marker) => {
    if (marker)
      modifyMarkers(elementPadding, marker);
  });
  return paddingMarkers;
}
function buildSpacingMarkers(elementHSpacing, sizeMarker, spacingMarker) {
  const spacingMarkers = buildSpacingMarks_default(
    elementHSpacing,
    {
      size: false,
      paddings: false,
      itemspacings: true,
      sameSpacingsColor: true,
      isShallow: true
    },
    sizeMarker,
    spacingMarker
  );
  spacingMarkers == null ? void 0 : spacingMarkers.forEach((marker) => {
    if (marker)
      modifyMarkers(elementHSpacing, marker);
  });
  return spacingMarkers;
}
function modifyMarkers(element, marker) {
  const position = `${marker.componentProperties.position.value}`;
  setSizingMarkerValue(marker, position);
}
function setMinSizeMarkerValue(element, marker) {
  const minSizeValue = element.minWidth;
  if (minSizeValue) {
    const minSize = minSizeValue + element.paddingLeft + element.paddingRight;
    setTextProps(marker, "text", `Minimal size - ${minSize}px`);
  }
}
var init_buildDefaultSpacings = __esm({
  "src/figma_functions/buildDefaultSpacings.ts"() {
    "use strict";
    init_utilityFunctions();
    init_buildSpacingMarks();
    init_utilityFunctions();
    init_setSizingMarkerValue();
  }
});

// src/figma_doc_sections/buildSpacingSection.ts
async function buildSpacingSection(node, frame) {
  const sizeMarker = await buildSizeMarker_default();
  const spacingMarker = await buildSpacingMarker_default();
  const labelComponent = buildLabelComponent();
  if (!(sizeMarker && spacingMarker && labelComponent))
    return;
  const booleanProps = await findAllBooleanProps(node);
  const variantProps = await findAllVariantProps(node);
  const elementSizes = await getElementSizes(node) || [];
  const atomSpacings = await buildAtomSpacings(
    node,
    booleanProps,
    labelComponent,
    node.name,
    elementSizes,
    variantProps,
    sizeMarker,
    spacingMarker
  );
  atomSpacings.forEach((node2) => {
    if (!node2)
      return;
    frame.appendChild(node2);
    node2.layoutSizingHorizontal = "FILL";
    node2.primaryAxisAlignItems = "CENTER";
  });
  sizeMarker.remove();
  spacingMarker.remove();
  labelComponent.remove();
  return frame;
}
var init_buildSpacingSection = __esm({
  "src/figma_doc_sections/buildSpacingSection.ts"() {
    "use strict";
    init_buildSizeMarker();
    init_buildSpacingMarker();
    init_buildLabelComponent();
    init_buildDefaultSpacings();
    init_utilityFunctions();
    init_utilityFunctions();
    init_utilityFunctions();
  }
});

// src/figma_doc_sections/buildPropSection.ts
function buildContentFrame(name, direction, spacing) {
  const elementsFrame = buildAutoLayoutFrame(
    name,
    direction,
    0,
    0,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    spacing = 16
  );
  return elementsFrame;
}
async function buildPropSection(node, parentFrame) {
  const booleanProps = await findAllBooleanProps(node);
  turnAllBooleansOff(node, booleanProps);
  const sizes = await getElementSizes(node);
  if (sizes) {
    const propertyFrame = buildContentFrame("frameForSizes", "VERTICAL");
    const subtitle = buildSubtitle("Size property");
    const allElementsFrame = buildContentFrame(
      "allElementsFrame",
      "HORIZONTAL"
    );
    propertyFrame.appendChild(subtitle);
    propertyFrame.appendChild(allElementsFrame);
    parentFrame.appendChild(propertyFrame);
    for (const size of sizes) {
      buildVarProperytyElement(node, size, allElementsFrame, "size");
    }
  }
  const booleanPropsKeys = Object.keys(booleanProps);
  if (booleanPropsKeys.length) {
    const propertyFrame = buildContentFrame("frameForBooleanProps", "VERTICAL");
    const allElementsFrame = buildContentFrame("allElementsFrame", "VERTICAL");
    parentFrame.appendChild(propertyFrame);
    propertyFrame.layoutSizingHorizontal = "FILL";
    const subtitle = buildSubtitle("Boolean properties");
    propertyFrame.appendChild(subtitle);
    booleanPropsKeys.forEach((key) => {
      const propName = key.split("#")[0];
      const currentNode = node.clone();
      const elementFrame = buildAutoLayoutFrame(
        "booleanPropFrame",
        "VERTICAL",
        160,
        40,
        10
      );
      elementFrame.fills = [
        {
          type: "SOLID",
          visible: true,
          opacity: 1,
          blendMode: "NORMAL",
          color: {
            r: 0.9607843160629272,
            g: 0.9607843160629272,
            b: 0.9607843160629272
          },
          boundVariables: {}
        }
      ];
      propertyFrame.appendChild(elementFrame);
      const booleanPropText = figma.createText();
      booleanPropText.characters = `${propName}`;
      booleanPropText.fontSize = 14;
      booleanPropText.fontName = { family: "Inter", style: "Bold" };
      setBooleanProps(currentNode, propName, true);
      elementFrame.appendChild(booleanPropText);
      booleanPropText.layoutPositioning = "ABSOLUTE";
      booleanPropText.x = 16;
      booleanPropText.y = 8;
      elementFrame.appendChild(currentNode);
      allElementsFrame.appendChild(elementFrame);
      elementFrame.layoutSizingHorizontal = "FILL";
      elementFrame.counterAxisAlignItems = "CENTER";
    });
    propertyFrame.appendChild(allElementsFrame);
    allElementsFrame.layoutSizingHorizontal = "FILL";
  }
  return parentFrame;
}
function buildVarProperytyElement(node, text, parentFrame, propertyName) {
  const elementFrame = buildContentFrame("sizeElementFrame", "VERTICAL", 12);
  const currentNode = node.clone();
  const elementText = figma.createText();
  elementText.characters = `Size: ${text}`;
  elementText.fontSize = 12;
  elementFrame.appendChild(elementText);
  elementFrame.appendChild(currentNode);
  parentFrame.appendChild(elementFrame);
  setVariantProps(currentNode, propertyName, text);
}
var init_buildPropSection = __esm({
  "src/figma_doc_sections/buildPropSection.ts"() {
    "use strict";
    init_elementBuildingFunctions();
    init_utilityFunctions();
  }
});

// src/figma_doc_sections/getVariantsArray.ts
function getVariantsArray(variantProperties, variantKeys) {
  const secondProp = variantKeys[variantKeys.length - 2];
  if (secondProp && variantKeys.length > 2) {
    const secondPropOptions = variantProperties[secondProp].variantOptions;
    const workingArrays = splitArray(
      buildAllPropsArray(variantProperties, variantKeys),
      secondPropOptions.length
    );
    return workingArrays;
  } else {
    const workingArrays = buildAllPropsArray(variantProperties, variantKeys);
    return workingArrays;
  }
}
function buildAllPropsArray(obj, keys) {
  const orderedKeys = reorderProps(keys, obj);
  const combinations = [];
  const stack = [];
  function generate(index) {
    if (index === orderedKeys.length) {
      combinations.push(Object.assign({}, ...stack));
      return;
    }
    const key = orderedKeys[index];
    const { variantOptions } = obj[key];
    for (let i = 0; i < variantOptions.length; i++) {
      stack.push({ [key]: variantOptions[i] });
      generate(index + 1);
      stack.pop();
    }
  }
  generate(0);
  const lastKey = orderedKeys[orderedKeys.length - 1];
  const subarrays = [];
  const subarrayLength = obj[lastKey].variantOptions.length;
  for (let i = 0; i < combinations.length; i += subarrayLength) {
    subarrays.push(combinations.slice(i, i + subarrayLength));
  }
  return subarrays;
}
function splitArray(arr, len) {
  const result = [];
  for (let i = 0; i < arr.length; i += len) {
    const chunk = arr.slice(i, i + len);
    result.push(chunk);
  }
  return result;
}
function reorderProps(variantKeys, variantProps) {
  reorderArrayByPropLength(variantKeys, variantProps);
  reorderArrayByType(variantKeys);
  return variantKeys.reverse();
}
function reorderArrayByPropLength(arr, variantProps) {
  arr.sort((propA, propB) => {
    const variantOptionsA = variantProps[propA].variantOptions;
    const variantOptionsB = variantProps[propB].variantOptions;
    return variantOptionsB.length - variantOptionsA.length;
  });
}
function reorderArrayByType(arr) {
  let temp;
  const state = arr.find((node) => node.toLowerCase() === "state");
  const type = arr.find((node) => node.toLowerCase() === "type");
  if (type) {
    const index = arr.indexOf(type);
    temp = arr.splice(index, 1)[0];
    arr.unshift(temp);
  }
  if (state) {
    const index = arr.indexOf(state);
    temp = arr.splice(index, 1)[0];
    arr.splice(1, 0, temp);
  }
}
var init_getVariantsArray = __esm({
  "src/figma_doc_sections/getVariantsArray.ts"() {
    "use strict";
  }
});

// src/figma_doc_sections/buildVariantFrames.ts
function buildVariantFrames(workingArrays, defaultElement, elementCollector, baseFrameCollector, variantKeys, missedItemsArray2) {
  const allElementsFrame = buildAutoLayoutFrame(
    "variants-frame",
    "VERTICAL",
    0,
    0
  );
  if (variantKeys.length > 1) {
    if (variantKeys.length === 2) {
      const secondLevelFrame = buildSecondLevelFrame(variantKeys);
      workingArrays.forEach((subArr) => {
        const thirdLevelFrame = buildThirdLevelFrame(variantKeys, "HORIZONTAL");
        for (const element of subArr) {
          buildLowestLevelFrames(
            defaultElement,
            elementCollector,
            element,
            thirdLevelFrame,
            missedItemsArray2
          );
        }
        thirdLevelFrame.layoutSizingHorizontal = "HUG";
        secondLevelFrame.layoutSizingHorizontal = "HUG";
        secondLevelFrame.appendChild(thirdLevelFrame);
      });
      baseFrameCollector.push(secondLevelFrame);
      allElementsFrame.appendChild(secondLevelFrame);
    }
    if (variantKeys.length > 2) {
      workingArrays.forEach((arr) => {
        const secondLevelFrame = buildSecondLevelFrame(variantKeys);
        arr.forEach((subArr) => {
          const thirdLevelFrame = buildThirdLevelFrame(
            variantKeys,
            "HORIZONTAL"
          );
          for (const element of subArr) {
            buildLowestLevelFrames(
              defaultElement,
              elementCollector,
              element,
              thirdLevelFrame,
              missedItemsArray2
            );
          }
          secondLevelFrame.appendChild(thirdLevelFrame);
          secondLevelFrame.layoutSizingHorizontal = "HUG";
          thirdLevelFrame.layoutSizingHorizontal = "HUG";
        });
        if (defaultElement) {
          if (isBasicFrameEmpty(secondLevelFrame, defaultElement)) {
            secondLevelFrame.remove();
          } else {
            baseFrameCollector.push(secondLevelFrame);
            allElementsFrame.appendChild(secondLevelFrame);
          }
        }
      });
    }
  } else {
    const thirdLevelFrame = buildThirdLevelFrame(variantKeys, "VERTICAL");
    const subArr = workingArrays[0];
    for (const element of subArr) {
      buildLowestLevelFrames(
        defaultElement,
        elementCollector,
        element,
        thirdLevelFrame,
        missedItemsArray2
      );
    }
    baseFrameCollector.push(thirdLevelFrame);
    thirdLevelFrame.layoutSizingHorizontal = "HUG";
    allElementsFrame.appendChild(thirdLevelFrame);
  }
  const result = figma.ungroup(allElementsFrame)[0];
  return result;
}
function buildLowestLevelFrames(defaultElement, elementCollector, element, thirdLevelFrame, missedItemsArray2) {
  const currentElement = defaultElement == null ? void 0 : defaultElement.clone();
  if (currentElement) {
    elementCollector.push(currentElement);
    try {
      currentElement.setProperties(element);
      thirdLevelFrame.appendChild(currentElement);
      if (currentElement.opacity === 0 || currentElement.children.every(
        (child) => "opacity" in child && child.opacity === 0
      )) {
        missedItemsArray2.push(currentElement);
      }
    } catch (error) {
      thirdLevelFrame.appendChild(currentElement);
      currentElement.opacity = 0;
      missedItemsArray2.push(currentElement);
    }
  }
}
function buildThirdLevelFrame(variantKeys, direction) {
  return buildAutoLayoutFrame(
    `${variantKeys[variantKeys.length - 1]}-frame`,
    direction,
    18,
    18
  );
}
function buildSecondLevelFrame(variantKeys) {
  return buildAutoLayoutFrame(
    `${variantKeys[variantKeys.length - 2]}-frame`,
    "VERTICAL",
    0,
    0
  );
}
function isBasicFrameEmpty(frame, node) {
  const elements = frame.findAll((element) => element.type === "INSTANCE").filter((instance) => instance.name.startsWith(node.name));
  return elements.every(
    (item) => item.type === "INSTANCE" && item.opacity === 0
  );
}
var init_buildVariantFrames = __esm({
  "src/figma_doc_sections/buildVariantFrames.ts"() {
    "use strict";
    init_utilityFunctions();
  }
});

// src/figma_doc_sections/buildBasicGridLabels.ts
function buildBasicGridLabels(frame, variantProps) {
  const defaultElement = frame.findOne((node) => node.type === "INSTANCE");
  if (!defaultElement)
    return;
  const topLabels = [];
  const leftLabels = [];
  const isOnlyFrames = frame.children.every((node) => node.type === "FRAME");
  if (isOnlyFrames) {
    buildSecondLevelLabels(
      frame,
      variantProps,
      topLabels,
      defaultElement,
      leftLabels
    );
  }
  buildFirstLevelLabels(
    frame,
    variantProps,
    defaultElement,
    leftLabels,
    topLabels,
    isOnlyFrames
  );
  const leftest = leftLabels.sort((a, b) => a.x - b.x);
  leftLabels.forEach((node) => node.x = leftest[0].x);
  const topLabelsGroup = topLabels.length > 0 ? figma.group(topLabels, figma.currentPage) : null;
  const leftLabelsGroup = leftLabels.length > 0 ? figma.group(leftLabels, figma.currentPage) : null;
  if (topLabelsGroup && leftLabelsGroup) {
    return [topLabelsGroup, leftLabelsGroup];
  } else if (topLabelsGroup) {
    return [topLabelsGroup];
  } else {
    return [leftLabelsGroup];
  }
}
function buildFirstLevelLabels(frame, variantProps, defaultElement, leftLabels, topLabels, isOnlyFrames) {
  const firstLevelFrame = isOnlyFrames ? frame.children[0] : frame;
  if (firstLevelFrame && firstLevelFrame.type === "FRAME") {
    const firstLevelLayoutMode = firstLevelFrame.layoutMode;
    const firstProp = firstLevelFrame.name.split("-")[0];
    const firstPropVariants = variantProps[firstProp].variantOptions;
    firstPropVariants.forEach((prop, index) => {
      const label = figma.createText();
      figma.currentPage.appendChild(label);
      label.characters = prop;
      label.fontSize = DEFAULT_FONT_SIZE;
      label.fontName = DEFAULT_FONT;
      if (firstLevelLayoutMode === "VERTICAL") {
        label.x = //@ts-ignore
        firstLevelFrame.children[index].absoluteBoundingBox.x - (label.width + 60);
        label.y = //@ts-ignore
        firstLevelFrame.children[index].absoluteBoundingBox.y + (defaultElement == null ? void 0 : defaultElement.height) / 2 - label.height / 2;
        leftLabels.push(label);
      }
      if (firstLevelLayoutMode === "HORIZONTAL") {
        label.x = //@ts-ignore
        firstLevelFrame.children[index].absoluteBoundingBox.x + firstLevelFrame.children[index].width / 2 - label.width / 2;
        label.y = label.y = //@ts-ignore
        firstLevelFrame.children[index].absoluteBoundingBox.y - 60;
        topLabels.push(label);
      }
    });
  }
}
function buildSecondLevelLabels(frame, variantProps, topLabels, defaultElement, leftLabels) {
  const secondLevelLayoutMode = frame.layoutMode;
  const secondProp = frame.name.split("-")[0];
  const secondPropVariants = variantProps[secondProp].variantOptions;
  secondPropVariants.forEach((variant, index) => {
    const label = figma.createText();
    label.fontSize = DEFAULT_FONT_SIZE;
    label.fontName = DEFAULT_FONT;
    figma.currentPage.appendChild(label);
    label.characters = variant;
    if (secondLevelLayoutMode === "HORIZONTAL") {
      label.x = //@ts-ignore
      frame.children[index].absoluteBoundingBox.x + frame.children[index].width / 2 - label.width / 2;
      label.y = frame.children[index].absoluteBoundingBox.y - 60;
      topLabels.push(label);
    }
    if (secondLevelLayoutMode === "VERTICAL") {
      label.x = //@ts-ignore
      frame.children[index].absoluteBoundingBox.x - (label.width + 60);
      label.y = //@ts-ignore
      frame.children[index].absoluteBoundingBox.y + (defaultElement == null ? void 0 : defaultElement.height) / 2 - label.height / 2 + BACKGROUND_PADDING;
      leftLabels.push(label);
    }
  });
}
var BACKGROUND_PADDING, DEFAULT_FONT, DEFAULT_FONT_SIZE;
var init_buildBasicGridLabels = __esm({
  "src/figma_doc_sections/buildBasicGridLabels.ts"() {
    "use strict";
    BACKGROUND_PADDING = 10;
    DEFAULT_FONT = { family: "Inter", style: "Regular" };
    DEFAULT_FONT_SIZE = 12;
  }
});

// src/figma_doc_sections/buildVarSection.ts
async function buildVarSection(node, parentFrame) {
  const variantProps = await findAllVariantProps(node);
  if (Object.keys(variantProps).length === 0)
    return;
  const variantKeys = Object.keys(variantProps).filter(
    (key) => key.toLocaleLowerCase() !== "size"
  );
  const variantsArray = getVariantsArray(variantProps, variantKeys);
  const variantFrames = buildVariantFrames(
    variantsArray,
    node,
    allElements,
    allBasicFrames,
    variantKeys,
    missedItemsArray
  );
  if (variantFrames.type !== "FRAME")
    return;
  const labels = buildBasicGridLabels(variantFrames, variantProps);
  if (!labels)
    return;
  const varsWithLabels = figma.group(
    [variantFrames, ...labels],
    parentFrame
  );
  const resultFrame = buildAutoLayoutFrame(
    "variantsFrame",
    "VERTICAL",
    160,
    40,
    10
  );
  resultFrame.fills = [
    {
      type: "SOLID",
      visible: true,
      opacity: 1,
      blendMode: "NORMAL",
      color: {
        r: 0.9607843160629272,
        g: 0.9607843160629272,
        b: 0.9607843160629272
      },
      boundVariables: {}
    }
  ];
  resultFrame.appendChild(varsWithLabels);
  parentFrame.appendChild(resultFrame);
  resultFrame.layoutSizingHorizontal = "FILL";
  resultFrame.counterAxisAlignItems = "CENTER";
  return parentFrame;
}
var missedItemsArray, allElements, allBasicFrames;
var init_buildVarSection = __esm({
  "src/figma_doc_sections/buildVarSection.ts"() {
    "use strict";
    init_getVariantsArray();
    init_utilityFunctions();
    init_buildVariantFrames();
    init_buildBasicGridLabels();
    missedItemsArray = [];
    allElements = [];
    allBasicFrames = [];
  }
});

// src/figma_functions/sectionBuilder.ts
async function buildSection(element, sectionFrame, currentNode = null) {
  const content = element.content;
  switch (element.datatype) {
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
    case "link":
      const inputs = content.sources;
      if (!inputs.length)
        return;
      inputs.forEach((input) => {
        const link = buildLinkText(input.source, input.link);
        sectionFrame.appendChild(link);
      });
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
        if (!textVideo || !linkVideo)
          return;
        const videoFrame = buildLinkText(textVideo, linkVideo);
        sectionFrame.appendChild(videoFrame);
      }
      break;
    default:
      throw new Error(
        "Error: No datatype found for this section. Please check the section data."
      );
  }
}
var sectionBuilder_default;
var init_sectionBuilder = __esm({
  "src/figma_functions/sectionBuilder.ts"() {
    "use strict";
    init_elementBuildingFunctions();
    init_buildAnatomySection();
    init_buildReleaseNotes();
    init_buildSpacingSection();
    init_buildPropSection();
    init_buildVarSection();
    sectionBuilder_default = buildSection;
  }
});

// src/figma_functions/getNode.ts
async function getNode(id, key) {
  try {
    const node = await figma.getNodeByIdAsync(id);
    if (node && node.type === "COMPONENT_SET")
      return node;
    else if (node && node.type === "COMPONENT") {
      if (node.parent && node.parent.type === "COMPONENT_SET") {
        return node.parent;
      } else {
        return node;
      }
    } else if (node && node.type === "INSTANCE") {
      const masterComponent = await findMasterComponent(node);
      return masterComponent;
    }
  } catch (error) {
  }
  try {
    const importedComponentSet = await figma.importComponentSetByKeyAsync(key);
    return importedComponentSet;
  } catch (error) {
  }
  try {
    const importedComponent = await figma.importComponentByKeyAsync(key);
    return importedComponent;
  } catch (error) {
  }
  return null;
}
var init_getNode = __esm({
  "src/figma_functions/getNode.ts"() {
    "use strict";
    init_utilityFunctions();
  }
});

// src/figma_functions/documentationBuilder.ts
async function documentationBuilder(data, loadFonts2) {
  await loadFonts2();
  const bounds = computeMaximumBounds(Array.from(figma.currentPage.children));
  const documentationFrame = buildDocumentationFrame();
  figma.currentPage.appendChild(documentationFrame);
  documentationFrame.x = bounds[1].x + 100;
  documentationFrame.y = bounds[0].y;
  const headerSectionFrame = buildSectionFrame();
  documentationFrame.appendChild(headerSectionFrame);
  headerSectionFrame.layoutSizingHorizontal = "FILL";
  const title = buildTitle(data.title);
  const divider = buildDivider();
  const defaultElement = await getNodeAndDefaultElement(data);
  let currentNode = null;
  if (defaultElement) {
    currentNode = defaultElement.createInstance();
    headerSectionFrame.appendChild(title);
    headerSectionFrame.appendChild(currentNode);
  } else {
    headerSectionFrame.appendChild(title);
  }
  const predefinedSections = ["anatomy", "spacing", "property", "variants"];
  for (const element of data.docs) {
    if (element.hidden)
      continue;
    const isPredefined = predefinedSections.includes(element.datatype);
    if (isPredefined && !currentNode)
      continue;
    const sectionFrame = buildSectionFrame();
    addSectionToDocFrame(sectionFrame, element);
    sectionBuilder_default(element, sectionFrame, currentNode);
    documentationFrame.layoutSizingHorizontal = "HUG";
  }
  adjustTitle();
  adjustDividers();
  function addSectionToDocFrame(sectionFrame, element) {
    documentationFrame.appendChild(sectionFrame);
    sectionFrame.layoutSizingHorizontal = "FILL";
    documentationFrame.appendChild(divider.clone());
    const title2 = element.title;
    if (title2) {
      const titleFrame = buildTitle(title2);
      sectionFrame.appendChild(titleFrame);
    }
  }
  async function getNodeAndDefaultElement(data2) {
    const node = await getNode(data2.nodeId, data2.componentKey);
    if (!node)
      return;
    emit("FOUND_ELEMENT", node, node.name, node.key);
    const defaultElement2 = await getDefaultElement(node);
    if (defaultElement2)
      return defaultElement2;
  }
  function buildDocumentationFrame() {
    const documentationFrame2 = buildAutoLayoutFrame(
      "Documentation",
      "VERTICAL",
      50,
      60,
      40
    );
    documentationFrame2.resize(documentationWidth, documentationFrame2.height);
    documentationFrame2.fills = [
      {
        type: "SOLID",
        visible: true,
        opacity: 1,
        blendMode: "NORMAL",
        color: {
          r: 1,
          g: 1,
          b: 1
        },
        boundVariables: {}
      }
    ];
    documentationFrame2.topLeftRadius = documentationCornerRadius;
    documentationFrame2.topRightRadius = documentationCornerRadius;
    documentationFrame2.bottomLeftRadius = documentationCornerRadius;
    documentationFrame2.bottomRightRadius = documentationCornerRadius;
    return documentationFrame2;
  }
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
    return sectionFrame;
  }
  function adjustTitle() {
    const docTitle = documentationFrame.findOne(
      (node) => node.name === "title"
    );
    if (!docTitle || docTitle.type !== "FRAME")
      return;
    const titleText = docTitle.children[0];
    titleText.fontSize = 70;
  }
  function buildDivider() {
    const divider2 = figma.createRectangle();
    divider2.name = "divider";
    divider2.resize(documentationWidth, 1.5);
    return divider2;
  }
  function adjustDividers() {
    const dividers = documentationFrame.findAll(
      (node) => node.name === "divider"
    );
    dividers.forEach((divider2) => {
      if (divider2.type === "RECTANGLE") {
        divider2.layoutAlign = "STRETCH";
      }
    });
    divider.remove();
  }
  figma.viewport.scrollAndZoomIntoView([documentationFrame]);
}
var documentationWidth, documentationPadding, sectionCornerRadius, documentationCornerRadius;
var init_documentationBuilder = __esm({
  "src/figma_functions/documentationBuilder.ts"() {
    "use strict";
    init_elementBuildingFunctions();
    init_sectionBuilder();
    init_utilityFunctions();
    init_getNode();
    init_lib();
    documentationWidth = 1200;
    documentationPadding = 20;
    sectionCornerRadius = 8;
    documentationCornerRadius = 12;
  }
});

// src/figma_functions/checkSelection.ts
async function checkSelection() {
  const selection = figma.currentPage.selection;
  if (selection.length === 0) {
  } else if (selection.length > 1) {
  } else {
    const node = selection[0];
    if (node.type !== "INSTANCE" && node.type !== "COMPONENT" && node.type !== "COMPONENT_SET") {
      figma.notify("Please select an instance, component or component set");
      return;
    }
    const defaultNode = await getDefaultElement(node);
    if (!defaultNode) {
      figma.notify("Please select an instance, component or component set");
      return;
    }
    const name = defaultNode && defaultNode.parent && defaultNode.parent.type === "COMPONENT_SET" ? defaultNode.parent.name : defaultNode.name;
    const key = defaultNode && defaultNode.parent && defaultNode.parent.type === "COMPONENT_SET" ? defaultNode.parent.key : defaultNode.key;
    return { defaultNode, name, key };
  }
}
var init_checkSelection = __esm({
  "src/figma_functions/checkSelection.ts"() {
    "use strict";
    init_utilityFunctions();
  }
});

// src/figma_functions/loginDataHandler.ts
async function tokenAndEmailHandler(token, email) {
  if (token) {
    await figma.clientStorage.setAsync("token", token);
    await figma.clientStorage.setAsync("email", email);
    emit("AUTH_CHANGE", token, email);
  } else {
    const savedToken = await figma.clientStorage.getAsync("token");
    const savedEmail = await figma.clientStorage.getAsync("email");
    if (savedToken && savedEmail) {
      emit("AUTH_CHANGE", savedToken, savedEmail);
    } else {
      emit("AUTH_CHANGE", null);
    }
  }
}
var init_loginDataHandler = __esm({
  "src/figma_functions/loginDataHandler.ts"() {
    "use strict";
    init_lib();
  }
});

// src/figma_functions/imageFromFigma.ts
function findWidestElement(node) {
  let maxWidth = node.width;
  if ("children" in node) {
    for (const child of node.children) {
      const childWidth = findWidestElement(child);
      if (childWidth > maxWidth) {
        maxWidth = childWidth;
      }
    }
  }
  return maxWidth;
}
function detachAllInstances(node) {
  if (node.type === "INSTANCE") {
    node = node.detachInstance();
  }
  if ("children" in node) {
    for (const child of node.children) {
      detachAllInstances(child);
    }
  }
  return node;
}
var imageFromFigma, imageFromFigma_default;
var init_imageFromFigma = __esm({
  "src/figma_functions/imageFromFigma.ts"() {
    "use strict";
    init_buildAnatomySection();
    init_buildSpacingSection();
    init_buildVarSection();
    init_buildPropSection();
    init_getNode();
    init_utilityFunctions();
    init_lib();
    imageFromFigma = async (loadFonts2, type, nodeId, key) => {
      const pdTypes = ["anatomy", "spacing", "property", "variants"];
      if (!key || !pdTypes.includes(type))
        return;
      await loadFonts2();
      const resultFrame = buildAutoLayoutFrame(
        "resultFrame",
        "VERTICAL",
        50,
        60,
        40
      );
      const node = await getNode(nodeId, key);
      if (!node)
        return;
      let tempNode;
      if (node.type === "COMPONENT") {
        tempNode = node.createInstance();
      } else {
        tempNode = node.defaultVariant.createInstance();
      }
      let builtGraphics;
      const buildFunctions = {
        anatomy: buildAnatomySection,
        spacing: buildSpacingSection,
        property: buildPropSection,
        variants: buildVarSection
      };
      if (buildFunctions[type]) {
        builtGraphics = await buildFunctions[type](tempNode, resultFrame);
        if (!builtGraphics) {
          resultFrame.remove();
          tempNode.remove();
          throw Error(`Error in building graphics of ${type}`);
        }
        if (type === "spacing" || type === "property") {
          const maxWidth = findWidestElement(builtGraphics);
          builtGraphics.resize(maxWidth + 520, builtGraphics.height);
          detachAllInstances(builtGraphics);
        }
      } else {
        throw Error(`Invalid type: ${type}`);
      }
      const bytes = await resultFrame.exportAsync({
        format: "SVG"
      });
      emit("IMAGE_ARRAY_FOR_UPLOAD", { bytes, type });
      tempNode.remove();
      resultFrame.remove();
      return;
    };
    imageFromFigma_default = imageFromFigma;
  }
});

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => main_default
});
async function main_default() {
  await tokenAndEmailHandler();
  const user = figma.currentUser;
  const document = figma.root.name;
  const page = figma.currentPage.name;
  const sessionData = {
    user,
    document,
    page
  };
  emit("SESSION", sessionData);
  const selectionData = await checkSelection();
  if (selectionData)
    emit("SELECTION", selectionData);
  once("SAVE_NEW_TOKEN_AND_EMAIL", (token, email) => {
    tokenAndEmailHandler(token, email);
  });
  on("LOGOUT", async () => {
    figma.clientStorage.deleteAsync("token");
  });
  on("GET_SELECTION", async () => {
    const selectionData2 = await checkSelection();
    if (selectionData2)
      emit("SELECTION", selectionData2);
  });
  on("CLOSE", () => {
    figma.closePlugin();
  });
  on("PIC_FROM_FIGMA", async ({ type, nodeId, key }) => {
    imageFromFigma_default(loadFonts, type, nodeId, key);
  });
  on("GET_COMPONENT_PIC", async (key, id) => {
    if (key) {
      const foundElement = await getNode(id, key);
      if (foundElement) {
        if (foundElement.type === "COMPONENT_SET") {
          const bytes = await foundElement.defaultVariant.exportAsync({
            format: "SVG"
          });
          emit("COMPONENT_PIC_FOR_UPLOAD", { bytes });
        } else {
          const bytes = await foundElement.exportAsync({
            format: "SVG"
          });
          emit("COMPONENT_PIC_FOR_UPLOAD", { bytes });
        }
      }
    }
  });
  on("CLEAR_SELECTION", () => {
    figma.currentPage.selection = [];
  });
  on("GET_NEW_SELECTION", async (key, id) => {
    if (key) {
      const foundElement = await getNode(id, key);
      if (foundElement) {
        const foundElementName = foundElement.name;
        emit("FOUND_ELEMENT", foundElement, foundElementName, key);
      }
    }
  });
  on("BUILD", async (data) => {
    try {
      await documentationBuilder(data, loadFonts);
    } catch (error) {
    }
  });
  on("DELETE_ACCOUNT", async () => {
    await figma.clientStorage.deleteAsync("token");
    figma.notify("Account deleted");
  });
  once("CLOSE", () => {
    figma.closePlugin();
  });
}
var loadFonts;
var init_main = __esm({
  "src/main.ts"() {
    "use strict";
    init_lib();
    init_documentationBuilder();
    init_checkSelection();
    init_loginDataHandler();
    init_getNode();
    init_imageFromFigma();
    loadFonts = async () => {
      await figma.loadFontAsync({ family: "Inter", style: "Regular" });
      await figma.loadFontAsync({ family: "Inter", style: "Bold" });
      await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
      await figma.loadFontAsync({ family: "Inter", style: "Medium" });
    };
    showUI({
      height: 720,
      width: 640
    });
  }
});

// <stdin>
var modules = { "src/main.ts--default": (init_main(), __toCommonJS(main_exports))["default"] };
var commandId = true ? "src/main.ts--default" : figma.command;
modules[commandId]();
//!--------BUILD----------//
//!--------FIND----------//
//!--------SET----------//
//!color styles
//! sort by elementX value
//! find size of all tags (and frame) together
//! ⬇⬇⬇ here changes ⬇⬇⬇
//! ⬆⬆⬆ here change ⬆⬆⬆
//! find position property
//! check if marks created
//! create labels
//! place group and label into autolayout frame
//! place al frames inside one frame and return it
//!
//! =================FUNCTIONS======================= !//
//! build size property (if size)
//! buld boolean properties
//! we need this for later splitting
//! reordep props array
//! case 2 - 2 variant properties
//! case 3 - 3 or more variant properties
//! case 1 - 1 variant property
//!----building documentation on canvas----//
