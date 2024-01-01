import buildSizeMarkerComponentSet from "../figma_layout_components/buildSizeMarker";
import buildSpacingMarkerComponentSet from "../figma_layout_components/buildSpacingMarker";
import { buildLabelComponent } from "src/figma_layout_components/buildLabelComponent";

export function buildSpacingSection() {
  const sizeMarker = buildSizeMarkerComponentSet();
  const spacingMarker = buildSpacingMarkerComponentSet();
  const labelComponent = buildLabelComponent();
}
