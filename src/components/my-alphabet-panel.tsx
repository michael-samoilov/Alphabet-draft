"use client";

import { useMemo, useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLongPress } from "@/hooks/use-long-press";
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

  // Fixed keyboard height. Keys start large and shrink as more are added.
  const KEYBOARD_HEIGHT = 100;
  const MAX_KEY_SIZE = 44;
  const MIN_KEY_SIZE = 24;
  const gap = 3;
  const count = entries.length;
  const numRows = rows.length || 1;

  // Scale key size: large when few, smaller as count grows
  // Lerp from MAX down to MIN over ~20 keys, then hold at MIN
  const t = Math.min(1, count / 20);
  const baseSize = MAX_KEY_SIZE - t * (MAX_KEY_SIZE - MIN_KEY_SIZE);

  // If rows overflow container, shrink further
  const naturalHeight = numRows * baseSize + (numRows - 1) * gap;
  const keySize = naturalHeight > KEYBOARD_HEIGHT
    ? Math.max(12, (KEYBOARD_HEIGHT - gap * (numRows - 1)) / numRows)
    : baseSize;
  const fontSize = Math.max(8, Math.min(20, keySize * 0.5));

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
                <KeyboardKey
                  key={key}
                  character={character}
                  entryKey={key}
                  onRemove={onRemove}
                  keySize={keySize}
                  fontSize={fontSize}
                />
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/** Single key in the keyboard panel — supports long-press to copy */
function KeyboardKey({
  character,
  entryKey,
  onRemove,
  keySize,
  fontSize,
}: {
  character: AlphabetChar;
  entryKey: string;
  onRemove: (key: string) => void;
  keySize: number;
  fontSize: number;
}) {
  const [copied, setCopied] = useState(false);

  const handleLongPress = useCallback(() => {
    navigator.clipboard.writeText(character.char);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }, [character.char]);

  const { onPointerDown, onPointerUp, onPointerLeave, didLongPress } =
    useLongPress(handleLongPress);

  const handleClick = () => {
    if (didLongPress.current) return;
    onRemove(entryKey);
  };

  return (
    <button
      onClick={handleClick}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
      title={`${character.name} (${character.script}) — click to remove, long-press to copy`}
      className="group relative flex items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 leading-none transition-all hover:border-red-300 hover:bg-red-50 active:scale-95 dark:border-emerald-800 dark:bg-emerald-950 dark:hover:border-red-700 dark:hover:bg-red-950 cursor-pointer shadow-sm shrink-0 select-none"
      style={{ width: `${keySize}px`, height: `${keySize}px`, fontSize: `${fontSize}px` }}
    >
      {character.char}
      <div className="absolute -top-1 -right-1 hidden h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[8px] text-white shadow group-hover:flex">
        ✕
      </div>
      {copied && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap rounded-md bg-black/90 px-2 py-1 text-[10px] font-semibold text-white shadow-lg pointer-events-none">
          Copied!
        </div>
      )}
    </button>
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
