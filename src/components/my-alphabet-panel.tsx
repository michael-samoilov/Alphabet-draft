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

      {/* Keyboard layout — uses CSS grid so keys shrink to fit container */}
      <div className="flex flex-col items-center gap-1 w-full overflow-hidden">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="grid w-full"
            style={{
              /* Each row always has KEYS_PER_ROW columns; unfilled cells just stay empty */
              gridTemplateColumns: `repeat(${KEYS_PER_ROW}, 1fr)`,
              gap: "3px",
              /* Stagger odd rows with padding (3% each side ≈ half a key offset) */
              paddingLeft: rowIndex % 2 === 1 ? "3%" : 0,
              paddingRight: rowIndex % 2 === 1 ? "3%" : 0,
            }}
          >
            {row.map(({ character, key }) => (
              <button
                key={key}
                onClick={() => onRemove(key)}
                title={`${character.name} (${character.script}) — click to remove`}
                className="group relative flex items-center justify-center aspect-square rounded-lg border border-emerald-200 bg-emerald-50 text-sm leading-none transition-all hover:border-red-300 hover:bg-red-50 active:scale-95 dark:border-emerald-800 dark:bg-emerald-950 dark:hover:border-red-700 dark:hover:bg-red-950 cursor-pointer shadow-sm overflow-hidden"
              >
                <span className="text-[clamp(10px,3.5vw,20px)]">{character.char}</span>
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
