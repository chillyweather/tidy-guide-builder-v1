export async function getNode(id: string, key: string) {
  const node = figma.getNodeById(id);
  if (
    node &&
    (node.type === "COMPONENT" || node.type === "COMPONENT_SET") &&
    node.key === key
  ) {
    return node;
  }

  try {
    const importedComponentSet = await figma.importComponentSetByKeyAsync(key);
    return importedComponentSet;
  } catch (error) {
    console.log("error", error);
  }

  try {
    const importedComponent = await figma.importComponentByKeyAsync(key);
    return importedComponent;
  } catch (error) {
    console.log("error", error);
  }

  figma.closePlugin(
    "Error: No component found for this section. Please import it from the library."
  );
}
