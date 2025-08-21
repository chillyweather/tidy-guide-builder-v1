/**
 * Safely creates a group from an array of Figma nodes, filtering out invalid nodes
 * @param nodes Array of nodes to group
 * @param parent Parent node for the group
 * @returns GroupNode if successful, null if no valid nodes to group
 */
export function safeGroup(nodes: any[], parent: any): GroupNode | null {
  if (!nodes || !Array.isArray(nodes) || !parent) {
    return null;
  }

  // Filter out invalid nodes - ensure they exist and are valid Figma nodes
  const validNodes = nodes.filter(node => {
    return (
      node && 
      typeof node === 'object' &&
      'id' in node &&
      'type' in node &&
      node.type !== 'DOCUMENT' &&
      node.type !== 'PAGE'
    );
  });

  // Must have at least one valid node to create a group
  if (validNodes.length === 0) {
    return null;
  }

  try {
    return figma.group(validNodes, parent);
  } catch (error) {
    console.error('Failed to create group:', error);
    return null;
  }
}