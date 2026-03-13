"use client";

import { useState, useMemo } from "react";
import { soundGroups, allScripts } from "@/data/alphabets";
import { SoundGroupRow } from "@/components/sound-group-row";
import { ScriptBrowser } from "@/components/script-browser";
import {
  MyAlphabetPanel,
  resolveSelections,
} from "@/components/my-alphabet-panel";
import { Button } from "@/components/ui/button";

type ViewMode = "by-sound" | "by-script";
type CategoryFilter = "all" | "vowel" | "consonant";

export function AlphabetDesigner() {
  const [selections, setSelections] = useState<Record<string, boolean>>({});
  const [viewMode, setViewMode] = useState<ViewMode>("by-sound");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [scriptFilter, setScriptFilter] = useState<string>("all");

  const handleToggle = (_soundId: string, key: string) => {
    setSelections((prev) => {
      const next = { ...prev };
      if (next[key]) {
        delete next[key];
      } else {
        next[key] = true;
      }
      return next;
    });
  };

  const handleRemove = (key: string) => {
    setSelections((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleClear = () => setSelections({});

  const filteredGroups = useMemo(() => {
    return soundGroups
      .filter((g) => categoryFilter === "all" || g.category === categoryFilter)
      .map((g) => {
        if (scriptFilter === "all") return g;
        const filtered = g.characters.filter((c) => c.script === scriptFilter);
        if (filtered.length === 0) return null;
        return { ...g, characters: filtered };
      })
      .filter(Boolean) as typeof soundGroups;
  }, [categoryFilter, scriptFilter]);

  const selectedEntries = useMemo(
    () => resolveSelections(selections, soundGroups),
    [selections]
  );

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="space-y-2 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Alphabet Designer
        </h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400">
          Pick the coolest characters from writing systems around the world.
          Build your own super alphabet.
        </p>
      </header>

      {/* My Alphabet (sticky at top) */}
      <section className="sticky top-0 z-10 rounded-2xl border border-zinc-200 bg-white/80 p-5 shadow-sm backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
        <MyAlphabetPanel
          entries={selectedEntries}
          onRemove={handleRemove}
          onClear={handleClear}
        />
      </section>

      {/* View mode toggle */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Browse by:
          </span>
          <div className="flex gap-1 rounded-lg border border-zinc-200 p-1 dark:border-zinc-700">
            <Button
              variant={viewMode === "by-sound" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("by-sound")}
            >
              Sound Group
            </Button>
            <Button
              variant={viewMode === "by-script" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("by-script")}
            >
              Origin Script
            </Button>
          </div>
        </div>

        {/* Filters (only in sound-group view) */}
        {viewMode === "by-sound" && (
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Filter:
            </span>

            {/* Category filter */}
            <div className="flex gap-1">
              {(["all", "vowel", "consonant"] as const).map((cat) => (
                <Button
                  key={cat}
                  variant={categoryFilter === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCategoryFilter(cat)}
                >
                  {cat === "all"
                    ? "All sounds"
                    : cat === "vowel"
                      ? "Vowels"
                      : "Consonants"}
                </Button>
              ))}
            </div>

            <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-700" />

            {/* Script filter */}
            <div className="flex flex-wrap gap-1">
              <Button
                variant={scriptFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setScriptFilter("all")}
              >
                All scripts
              </Button>
              {allScripts.map((script) => (
                <Button
                  key={script}
                  variant={scriptFilter === script ? "default" : "outline"}
                  size="sm"
                  onClick={() => setScriptFilter(script)}
                >
                  {script}
                </Button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Main content */}
      <section>
        {viewMode === "by-sound" ? (
          <div className="space-y-8">
            {filteredGroups.map((group) => (
              <SoundGroupRow
                key={group.id}
                group={group}
                selections={selections}
                onToggle={handleToggle}
              />
            ))}
          </div>
        ) : (
          <ScriptBrowser
            selections={selections}
            onToggle={handleToggle}
          />
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 pt-6 text-center text-sm text-zinc-400 dark:border-zinc-800 dark:text-zinc-600">
        Alphabet Designer — Characters from {allScripts.length} writing systems
      </footer>
    </div>
  );
}
