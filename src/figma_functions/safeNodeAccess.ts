/**
 * Safe utilities for accessing Figma node properties that might be undefined
 */

/**
 * Safely get a child node at a specific index
 * @param parent Parent node
 * @param index Index of child to get
 * @returns Child node or null if not found
 */
export function safeGetChild(parent: any, index: number): any | null {
  if (!parent || !parent.children || !Array.isArray(parent.children)) {
    return null;
  }
  
  if (index < 0 || index >= parent.children.length) {
    return null;
  }
  
  const child = parent.children[index];
  return child || null;
}

/**
 * Safely get absoluteTransform from a node
 * @param node Node to get absoluteTransform from
 * @returns Transform array or null if not available
 */
export function safeGetAbsoluteTransform(node: any): number[][] | null {
  if (!node || !node.absoluteTransform) {
    return null;
  }
  
  return node.absoluteTransform;
}

/**
 * Safely get X position from absoluteTransform
 * @param node Node to get X position from
 * @returns X position or 0 if not available
 */
export function safeGetX(node: any): number {
  const transform = safeGetAbsoluteTransform(node);
  if (!transform || !transform[0] || transform[0].length < 3) {
    return 0;
  }
  return transform[0][2];
}

/**
 * Safely get Y position from absoluteTransform
 * @param node Node to get Y position from
 * @returns Y position or 0 if not available
 */
export function safeGetY(node: any): number {
  const transform = safeGetAbsoluteTransform(node);
  if (!transform || !transform[1] || transform[1].length < 3) {
    return 0;
  }
  return transform[1][2];
}

/**
 * Check if a node is valid and has required properties
 * @param node Node to check
 * @param requiredProps Array of property names that must exist
 * @returns true if node is valid
 */
export function isValidNode(node: any, requiredProps: string[] = []): boolean {
  if (!node || typeof node !== 'object') {
    return false;
  }
  
  // Check for basic Figma node properties
  if (!('id' in node) || !('type' in node)) {
    return false;
  }
  
  // Check for required properties
  for (const prop of requiredProps) {
    if (!(prop in node) || node[prop] === undefined || node[prop] === null) {
      return false;
    }
  }
  
  return true;
}