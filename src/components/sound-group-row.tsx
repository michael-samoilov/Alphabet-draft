"use client";

import { Badge } from "@/components/ui/badge";
import { CharacterCard } from "@/components/character-card";
import type { SoundGroup } from "@/data/alphabets";

interface SoundGroupRowProps {
  group: SoundGroup;
  /** Map of "soundId:charName" → true for selected chars */
  selections: Record<string, boolean>;
  onToggle: (soundId: string, charKey: string) => void;
}

export function SoundGroupRow({
  group,
  selections,
  onToggle,
}: SoundGroupRowProps) {
  const selectedCount = group.characters.filter(
    (c) => selections[`${group.id}:${c.name}:${c.script}`]
  ).length;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <h3 className="text-lg font-semibold tracking-tight">{group.label}</h3>
        <Badge variant="secondary" className="font-mono text-xs">
          {group.ipa}
        </Badge>
        <Badge
          variant={group.category === "vowel" ? "default" : "outline"}
          className="text-[10px] uppercase tracking-wider"
        >
          {group.category}
        </Badge>
        {selectedCount > 0 && (
          <span className="ml-auto text-sm text-emerald-600 dark:text-emerald-400 font-medium">
            {selectedCount} selected
          </span>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {group.characters.map((char) => {
          const key = `${group.id}:${char.name}:${char.script}`;
          return (
            <CharacterCard
              key={key}
              character={char}
              selected={!!selections[key]}
              onToggle={() => onToggle(group.id, key)}
            />
          );
        })}
      </div>
    </div>
  );
}
