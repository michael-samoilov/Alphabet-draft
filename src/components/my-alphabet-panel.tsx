"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { AlphabetChar, SoundGroup } from "@/data/alphabets";

interface SelectedEntry {
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold">My Alphabet</h2>
          <Badge variant="secondary">{entries.length} characters</Badge>
        </div>
        <Button variant="ghost" size="sm" onClick={onClear}>
          Clear all
        </Button>
      </div>
      <div className="flex flex-wrap gap-3">
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

/** Resolve selections map → SelectedEntry[] for the panel */
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
