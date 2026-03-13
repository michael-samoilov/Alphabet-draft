"use client";

import { cn } from "@/lib/utils";
import type { AlphabetChar } from "@/data/alphabets";

interface CharacterCardProps {
  character: AlphabetChar;
  selected: boolean;
  onToggle: () => void;
}

export function CharacterCard({
  character,
  selected,
  onToggle,
}: CharacterCardProps) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "group relative flex flex-col items-center justify-center gap-1 rounded-xl border-2 p-3 transition-all duration-200 hover:scale-105 cursor-pointer min-w-[80px]",
        selected
          ? "border-zinc-900 bg-zinc-900 text-white shadow-lg dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
          : "border-zinc-200 bg-white hover:border-zinc-400 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-500"
      )}
    >
      <span className="text-3xl leading-none font-normal">{character.char}</span>
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
        {character.script}
      </span>
      {selected && (
        <div className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] text-white shadow">
          ✓
        </div>
      )}
    </button>
  );
}
