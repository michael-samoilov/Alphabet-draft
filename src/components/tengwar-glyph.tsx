"use client";

import { tengwarPaths } from "@/data/tengwar-glyphs";

/**
 * Renders a Tengwar character as an inline SVG using extracted glyph paths.
 * Falls back to the raw character if no SVG path exists.
 */
export function TengwarGlyph({
  char,
  className,
  size,
}: {
  char: string;
  className?: string;
  size?: string | number;
}) {
  const path = tengwarPaths[char];
  if (!path) return <span className={className}>{char}</span>;

  return (
    <svg
      viewBox="-50 -350 1050 1100"
      fill="currentColor"
      className={className}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <g transform="scale(1,-1) translate(0,-400)">
        <path d={path} />
      </g>
    </svg>
  );
}

/** Check whether a character has an SVG Tengwar glyph available */
export function isTengwar(char: string): boolean {
  return char in tengwarPaths;
}
