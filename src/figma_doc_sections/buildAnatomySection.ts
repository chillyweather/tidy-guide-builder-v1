import { findAllBooleanProps } from "../figma_functions/utilityFunctions";
import { findAllVariantProps } from "../figma_functions/utilityFunctions";
import { getElementSizes } from "../figma_functions/utilityFunctions";
import { buildLabelComponent } from "../figma_layout_components/buildLabelComponent";
import { buildAtomTags } from "../figma_functions/buildAtomTags";
import buildAllTags from "../figma_layout_components/buildTagComponent";

export async function buildAnatomySection(
  node: InstanceNode,
  parentFrame: FrameNode
) {
  const booleanProperties = findAllBooleanProps(node);
  const elementSizes = getElementSizes(node);
  const variantProperties = findAllVariantProps(node);

  const labelComponent = buildLabelComponent();
  const tagComponent = buildAllTags();

  const tags = await buildAtomTags(
    node,
    booleanProperties,
    elementSizes!,
    variantProperties,
    labelComponent,
    tagComponent
  );

  tags.forEach((tag) => {
    parentFrame.appendChild(tag);
  });

  labelComponent.remove();
  tagComponent!.remove();

  return tags;
}
