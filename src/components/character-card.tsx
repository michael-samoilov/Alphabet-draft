"use client";

import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import type { AlphabetChar } from "@/data/alphabets";
import { useLongPress } from "@/hooks/use-long-press";
import { TengwarGlyph, isTengwar } from "@/components/tengwar-glyph";

interface CharacterCardProps {
  character: AlphabetChar;
  selected: boolean;
  onToggle: () => void;
  /** Optional subtitle shown below script name (e.g. IPA in script view) */
  subtitle?: string;
}

export function CharacterCard({
  character,
  selected,
  onToggle,
  subtitle,
}: CharacterCardProps) {
  const [copied, setCopied] = useState(false);

  const handleLongPress = useCallback(() => {
    navigator.clipboard.writeText(character.char);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }, [character.char]);

  const { onPointerDown, onPointerUp, onPointerLeave, didLongPress } =
    useLongPress(handleLongPress);

  const handleClick = () => {
    if (didLongPress.current) return; // suppress click after long-press
    onToggle();
  };

  return (
    <button
      onClick={handleClick}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
      title="Click to select — long-press to copy"
      className={cn(
        "group relative flex flex-col items-center justify-center gap-1 rounded-xl border-2 p-3 transition-all duration-200 hover:scale-105 cursor-pointer min-w-[80px] select-none",
        selected
          ? "border-zinc-900 bg-zinc-900 text-white shadow-lg dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
          : "border-zinc-200 bg-white hover:border-zinc-400 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-500"
      )}
    >
      {isTengwar(character.char) ? (
        <TengwarGlyph char={character.char} className="text-3xl leading-none" size="1.875rem" />
      ) : (
        <span className="text-3xl leading-none font-normal">{character.char}</span>
      )}
      <span
        className={cn(
          "text-[10px] font-medium leading-tight",
          selected
            ? "text-zinc-300 dark:text-zinc-600"
            : "text-zinc-500 dark:text-zinc-400"
        )}
      >
        {character.name}
      </span>
      <span
        className={cn(
          "text-[9px] leading-tight",
          selected
            ? "text-zinc-400 dark:text-zinc-500"
            : "text-zinc-400 dark:text-zinc-500"
        )}
      >
        {subtitle || character.script}
      </span>
      {selected && (
        <div className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] text-white shadow">
          ✓
        </div>
      )}
      {copied && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap rounded-lg bg-black/90 px-3 py-1.5 text-sm font-semibold text-white shadow-lg animate-bounce pointer-events-none">
          Copied!
        </div>
      )}
    </button>
  );
}
