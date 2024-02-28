import buildSizeMarkerComponentSet from "../figma_layout_components/buildSizeMarker";
import buildSpacingMarkerComponentSet from "../figma_layout_components/buildSpacingMarker";
import { buildLabelComponent } from "src/figma_layout_components/buildLabelComponent";
import { buildAtomSpacings } from "src/figma_functions/buildDefaultSpacings";
import { findAllBooleanProps } from "src/figma_functions/utilityFunctions";
import { findAllVariantProps } from "src/figma_functions/utilityFunctions";
import { getElementSizes } from "src/figma_functions/utilityFunctions";

export async function buildSpacingSection(
  node: InstanceNode,
  frame: FrameNode
) {
  const sizeMarker = await buildSizeMarkerComponentSet();
  const spacingMarker = await buildSpacingMarkerComponentSet();
  const labelComponent = buildLabelComponent();

  if (!(sizeMarker && spacingMarker && labelComponent)) return;

  const booleanProps = findAllBooleanProps(node);
  const variantProps = findAllVariantProps(node);
  const elementSizes = getElementSizes(node) || [];
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

  atomSpacings.forEach((node) => {
    if (!node) return;
    frame.appendChild(node);
    node.layoutSizingHorizontal = "FILL";
    node.primaryAxisAlignItems = "CENTER";
  });

  sizeMarker.remove();
  spacingMarker.remove();
  labelComponent.remove();
  return frame;
}
