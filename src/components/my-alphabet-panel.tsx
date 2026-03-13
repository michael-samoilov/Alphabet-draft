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

/** Number of keys per row in the keyboard layout */
const KEYS_PER_ROW = 10;

/**
 * Arrange entries into keyboard-style staggered rows.
 */
function arrangeAsKeyboard(entries: SelectedEntry[]): SelectedEntry[][] {
  const rows: SelectedEntry[][] = [];
  for (let i = 0; i < entries.length; i += KEYS_PER_ROW) {
    rows.push(entries.slice(i, i + KEYS_PER_ROW));
  }
  return rows;
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

  // Fixed keyboard height. Keys are square, centered, expand outward.
  const KEYBOARD_HEIGHT = 100;
  const BASE_KEY_SIZE = 28;
  const gap = 3;
  const numRows = rows.length || 1;
  const naturalHeight = numRows * BASE_KEY_SIZE + (numRows - 1) * gap;
  const needsShrink = naturalHeight > KEYBOARD_HEIGHT;
  const keySize = needsShrink
    ? Math.max(14, (KEYBOARD_HEIGHT - gap * (numRows - 1)) / numRows)
    : BASE_KEY_SIZE;
  const fontSize = Math.max(8, Math.min(16, keySize * 0.55));

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

      {/* Keyboard — fixed height, centered, expands outward */}
      <div
        className="flex flex-col items-center justify-center w-full overflow-hidden"
        style={{ height: `${KEYBOARD_HEIGHT}px`, gap: `${gap}px` }}
      >
        {entries.length === 0 ? (
          <div className="flex items-center justify-center h-full w-full rounded-xl border-2 border-dashed border-zinc-300 dark:border-zinc-700">
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              Click on characters to start building
            </p>
          </div>
        ) : (
          rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex items-center justify-center"
              style={{
                gap: `${gap}px`,
                paddingLeft: rowIndex % 2 === 1 ? `${keySize * 0.5}px` : 0,
              }}
            >
              {row.map(({ character, key }) => (
                <button
                  key={key}
                  onClick={() => onRemove(key)}
                  title={`${character.name} (${character.script}) — click to remove`}
                  className="group relative flex items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 leading-none transition-all hover:border-red-300 hover:bg-red-50 active:scale-95 dark:border-emerald-800 dark:bg-emerald-950 dark:hover:border-red-700 dark:hover:bg-red-950 cursor-pointer shadow-sm overflow-hidden shrink-0"
                  style={{ width: `${keySize}px`, height: `${keySize}px`, fontSize: `${fontSize}px` }}
                >
                  {character.char}
                  <div className="absolute -top-1 -right-1 hidden h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[8px] text-white shadow group-hover:flex">
                    ✕
                  </div>
                </button>
              ))}
            </div>
          ))
        )}
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
