"use client";

import { useRef } from "react";
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

export function MyAlphabetPanel({
  entries,
  onRemove,
  onClear,
}: MyAlphabetPanelProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  const copyToClipboard = () => {
    const text = entries.map((e) => e.character.char).join(" ");
    navigator.clipboard.writeText(text);
  };

  const downloadAsText = () => {
    const lines = entries.map(
      (e) => `${e.character.char}\t${e.character.name}\t${e.character.script}\t${e.soundLabel}`
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

  // Count by script
  const scriptCounts = new Map<string, number>();
  for (const e of entries) {
    scriptCounts.set(
      e.character.script,
      (scriptCounts.get(e.character.script) || 0) + 1
    );
  }

  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-300 p-8 text-center dark:border-zinc-700">
        <p className="text-lg font-medium text-zinc-400 dark:text-zinc-500">
          Your alphabet is empty
        </p>
        <p className="mt-1 text-sm text-zinc-400 dark:text-zinc-600">
          Click on characters above to start building your custom alphabet
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-xl font-bold">My Alphabet</h2>
          <Badge variant="secondary">{entries.length} characters</Badge>
          {Array.from(scriptCounts.entries()).map(([script, count]) => (
            <Badge key={script} variant="outline" className="text-[10px]">
              {script}: {count}
            </Badge>
          ))}
        </div>
        <div className="flex gap-1">
          <Button variant="outline" size="sm" onClick={copyToClipboard}>
            Copy
          </Button>
          <Button variant="outline" size="sm" onClick={downloadAsText}>
            Export
          </Button>
          <Button variant="ghost" size="sm" onClick={onClear}>
            Clear
          </Button>
        </div>
      </div>
      <div ref={gridRef} className="flex flex-wrap gap-3">
        {entries.map(({ character, key, soundLabel }) => (
          <button
            key={key}
            onClick={() => onRemove(key)}
            className="group relative flex flex-col items-center gap-0.5 rounded-xl border-2 border-emerald-200 bg-emerald-50 p-3 transition-all hover:border-red-300 hover:bg-red-50 dark:border-emerald-800 dark:bg-emerald-950 dark:hover:border-red-700 dark:hover:bg-red-950 min-w-[72px] cursor-pointer"
          >
            <span className="text-2xl leading-none">{character.char}</span>
            <span className="text-[9px] text-zinc-500 dark:text-zinc-400">
              {character.name}
            </span>
            <span className="text-[8px] text-zinc-400 dark:text-zinc-500">
              {soundLabel}
            </span>
            <div className="absolute -top-1.5 -right-1.5 hidden h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white shadow group-hover:flex">
              ✕
            </div>
          </button>
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
