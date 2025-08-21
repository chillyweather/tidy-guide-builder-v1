export const DEFAULT_FONTS = {
  inter: [
    { family: "Inter", style: "Regular" },
    { family: "Inter", style: "Bold" },
    { family: "Inter", style: "Semi Bold" },
    { family: "Inter", style: "Medium" },
  ],
  mono: [{ family: "IBM Plex Mono", style: "Medium" }],
} as const;

export type FontConfig = { family: string; style: string };

export async function loadFontSet(fonts: FontConfig[]): Promise<void> {
  try {
    await Promise.all(fonts.map((font) => figma.loadFontAsync(font)));
  } catch (error: unknown) {
    console.error("Failed to load fonts:", error);
    throw new Error(
      `Font loading failed: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

export async function loadAllRequiredFonts(): Promise<void> {
  const requiredFonts = [...DEFAULT_FONTS.inter, ...DEFAULT_FONTS.mono];
  await loadFontSet(requiredFonts);
}
