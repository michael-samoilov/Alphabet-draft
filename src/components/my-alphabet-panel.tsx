"use client";

import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { AlphabetChar, SoundGroup } from "@/data/alphabets";

export interface SelectedEntry {
  soundId: string;
  soundLabel: string;
  character: AlphabetChar;
  key: string;
}

interface MyAlphabetPanelProps {
  entries: SelectedEntry[];
  onRemove: (key: string) => void;
  onClear: () => void;
}

/**
 * Arrange entries into keyboard-style staggered rows.
 * 10 keys per row (like QWERTY), each subsequent row offset slightly.
 */
function arrangeAsKeyboard(entries: SelectedEntry[]): SelectedEntry[][] {
  const rows: SelectedEntry[][] = [];
  const perRow = 10;
  for (let i = 0; i < entries.length; i += perRow) {
    rows.push(entries.slice(i, i + perRow));
  }
  return rows;
}

/**
 * Compute a scale factor so the keyboard fits within a fixed max-height.
 * Base key size ~40px + gaps. We want the whole keyboard to fit in ~160px max height.
 */
function getKeyScale(entryCount: number): { keySize: number; fontSize: number; gap: number } {
  if (entryCount === 0) return { keySize: 40, fontSize: 18, gap: 4 };
  const rows = Math.ceil(entryCount / 10);
  // Max height budget: 160px on mobile, 180px on larger
  const maxHeight = 160;
  const availablePerRow = maxHeight / rows;
  // Key size is the row height minus gap
  const gap = Math.max(2, Math.min(4, availablePerRow * 0.1));
  const keySize = Math.max(24, Math.min(44, availablePerRow - gap));
  const fontSize = Math.max(10, Math.min(20, keySize * 0.5));
  return { keySize, fontSize, gap };
}

export function MyAlphabetPanel({
  entries,
  onRemove,
  onClear,
}: MyAlphabetPanelProps) {
  const copyToClipboard = () => {
    const text = entries.map((e) => e.character.char).join(" ");
    navigator.clipboard.writeText(text);
  };

  const downloadAsText = () => {
    const lines = entries.map(
      (e) =>
        `${e.character.char}\t${e.character.name}\t${e.character.script}\t${e.soundLabel}`
    );
    const content = "Char\tName\tScript\tSound\n" + lines.join("\n");
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "my-alphabet.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const rows = useMemo(() => arrangeAsKeyboard(entries), [entries]);
  const { keySize, fontSize, gap } = useMemo(
    () => getKeyScale(entries.length),
    [entries.length]
  );

  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-300 py-4 text-center dark:border-zinc-700">
        <p className="text-sm font-medium text-zinc-400 dark:text-zinc-500">
          Your alphabet is empty
        </p>
        <p className="mt-0.5 text-xs text-zinc-400 dark:text-zinc-600">
          Click on characters to start building
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold sm:text-base">My Alphabet</h2>
          <Badge variant="secondary" className="text-[10px]">
            {entries.length}
          </Badge>
        </div>
        <div className="flex gap-1">
          <Button variant="outline" size="sm" className="h-7 text-xs px-2" onClick={copyToClipboard}>
            Copy
          </Button>
          <Button variant="outline" size="sm" className="h-7 text-xs px-2" onClick={downloadAsText}>
            Export
          </Button>
          <Button variant="ghost" size="sm" className="h-7 text-xs px-2" onClick={onClear}>
            Clear
          </Button>
        </div>
      </div>

      {/* Keyboard layout */}
      <div
        className="flex flex-col items-center"
        style={{ gap: `${gap}px` }}
      >
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex justify-center"
            style={{
              gap: `${gap}px`,
              // Stagger odd rows like a keyboard
              paddingLeft: rowIndex % 2 === 1 ? `${keySize * 0.3}px` : 0,
              paddingRight: rowIndex % 2 === 1 ? `${keySize * 0.3}px` : 0,
            }}
          >
            {row.map(({ character, key }) => (
              <button
                key={key}
                onClick={() => onRemove(key)}
                title={`${character.name} (${character.script}) — click to remove`}
                className="group relative flex items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 transition-all hover:border-red-300 hover:bg-red-50 active:scale-95 dark:border-emerald-800 dark:bg-emerald-950 dark:hover:border-red-700 dark:hover:bg-red-950 cursor-pointer shadow-sm"
                style={{
                  width: `${keySize}px`,
                  height: `${keySize}px`,
                  fontSize: `${fontSize}px`,
                }}
              >
                {character.char}
                <div className="absolute -top-1 -right-1 hidden h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[8px] text-white shadow group-hover:flex">
                  ✕
                </div>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Resolve selections map -> SelectedEntry[] for the panel */
export function resolveSelections(
  selections: Record<string, boolean>,
  soundGroups: SoundGroup[]
): SelectedEntry[] {
  const entries: SelectedEntry[] = [];
  for (const [key, val] of Object.entries(selections)) {
    if (!val) continue;
    const [soundId, charName, charScript] = key.split(":");
    const group = soundGroups.find((g) => g.id === soundId);
    if (!group) continue;
    const character = group.characters.find(
      (c) => c.name === charName && c.script === charScript
    );
    if (!character) continue;
    entries.push({ soundId, soundLabel: group.label, character, key });
  }
  return entries;
}
