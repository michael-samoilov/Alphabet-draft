"use client";

import { Badge } from "@/components/ui/badge";
import { CharacterCard } from "@/components/character-card";
import { allScripts, getCharactersByScript, type SoundGroup } from "@/data/alphabets";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ScriptBrowserProps {
  selections: Record<string, boolean>;
  onToggle: (soundId: string, key: string) => void;
}

export function ScriptBrowser({ selections, onToggle }: ScriptBrowserProps) {
  const [activeScript, setActiveScript] = useState<string>(allScripts[0]);

  const chars = getCharactersByScript(activeScript);

  // Group by sound group for display
  const grouped = new Map<string, { soundGroup: SoundGroup; characters: typeof chars }>();
  for (const entry of chars) {
    const existing = grouped.get(entry.soundGroup.id);
    if (existing) {
      existing.characters.push(entry);
    } else {
      grouped.set(entry.soundGroup.id, {
        soundGroup: entry.soundGroup,
        characters: [entry],
      });
    }
  }

  return (
    <div className="space-y-6">
      {/* Script selector */}
      <div className="flex flex-wrap gap-1.5">
        {allScripts.map((script) => (
          <Button
            key={script}
            variant={activeScript === script ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveScript(script)}
          >
            {script}
            <Badge variant="secondary" className="ml-1.5 text-[10px]">
              {getCharactersByScript(script).length}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Characters grouped by sound */}
      <div className="space-y-6">
        {Array.from(grouped.entries()).map(([soundId, { soundGroup, characters }]) => (
          <div key={soundId} className="space-y-2">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                {soundGroup.label}
              </h4>
              <Badge variant="secondary" className="font-mono text-[10px]">
                {soundGroup.ipa}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              {characters.map(({ character }) => {
                const key = `${soundId}:${character.name}:${character.script}`;
                return (
                  <CharacterCard
                    key={key}
                    character={character}
                    selected={!!selections[key]}
                    onToggle={() => onToggle(soundId, key)}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
