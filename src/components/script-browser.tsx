"use client";

import { Badge } from "@/components/ui/badge";
import { CharacterCard } from "@/components/character-card";
import { allScripts, getCharactersByScript } from "@/data/alphabets";
import { Button } from "@/components/ui/button";

interface ScriptBrowserProps {
  activeScript: string;
  onScriptChange: (script: string) => void;
  selections: Record<string, boolean>;
  onToggle: (soundId: string, key: string) => void;
}

export function ScriptBrowser({
  activeScript,
  onScriptChange,
  selections,
  onToggle,
}: ScriptBrowserProps) {
  const isAll = activeScript === "all";

  // For "all", show every script grouped; for a specific script, show flat grid
  const chars = isAll ? [] : getCharactersByScript(activeScript);

  return (
    <div className="space-y-6">
      {/* Script selector */}
      <div className="flex flex-wrap gap-1.5">
        <Button
          variant={isAll ? "default" : "outline"}
          size="sm"
          onClick={() => onScriptChange("all")}
        >
          All scripts
        </Button>
        {allScripts.map((script) => (
          <Button
            key={script}
            variant={activeScript === script ? "default" : "outline"}
            size="sm"
            onClick={() => onScriptChange(script)}
          >
            {script}
            <Badge variant="secondary" className="ml-1.5 text-[10px]">
              {getCharactersByScript(script).length}
            </Badge>
          </Button>
        ))}
      </div>

      {isAll ? (
        // Show each script as a section
        <div className="space-y-8">
          {allScripts.map((script) => {
            const scriptChars = getCharactersByScript(script);
            return (
              <div key={script} className="space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">{script}</h3>
                  <Badge variant="secondary">{scriptChars.length}</Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {scriptChars.map(({ character, soundGroup }) => {
                    const key = `${soundGroup.id}:${character.name}:${character.script}`;
                    return (
                      <CharacterCard
                        key={key}
                        character={character}
                        selected={!!selections[key]}
                        onToggle={() => onToggle(soundGroup.id, key)}
                        subtitle={soundGroup.ipa}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // Flat grid for a single script
        <div>
          <div className="mb-3 flex items-center gap-2">
            <h3 className="text-lg font-semibold">{activeScript}</h3>
            <Badge variant="secondary">{chars.length} characters</Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            {chars.map(({ character, soundGroup }) => {
              const key = `${soundGroup.id}:${character.name}:${character.script}`;
              return (
                <CharacterCard
                  key={key}
                  character={character}
                  selected={!!selections[key]}
                  onToggle={() => onToggle(soundGroup.id, key)}
                  subtitle={soundGroup.ipa}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
