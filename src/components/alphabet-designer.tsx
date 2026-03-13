"use client";

import { useState, useMemo, useCallback } from "react";
import {
  soundGroups,
  allScripts,
  getCharactersByScript,
  type AlphabetChar,
  type SoundGroup,
} from "@/data/alphabets";
import { CharacterCard } from "@/components/character-card";
import {
  MyAlphabetPanel,
  resolveSelections,
} from "@/components/my-alphabet-panel";
import { Badge } from "@/components/ui/badge";
import { useLocalStorage } from "@/hooks/use-local-storage";

type GroupBy = "sound" | "script";

export function AlphabetDesigner() {
  const [selections, setSelections] = useLocalStorage<Record<string, boolean>>(
    "alphabet-designer-selections",
    {}
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [groupBy, setGroupBy] = useState<GroupBy>("sound");
  const [selectedSounds, setSelectedSounds] = useState<Set<string>>(new Set());
  const [selectedScripts, setSelectedScripts] = useState<Set<string>>(
    new Set()
  );

  const handleToggle = useCallback((_soundId: string, key: string) => {
    setSelections((prev) => {
      const next = { ...prev };
      if (next[key]) {
        delete next[key];
      } else {
        next[key] = true;
      }
      return next;
    });
  }, []);

  const handleRemove = useCallback((key: string) => {
    setSelections((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const handleClear = useCallback(() => setSelections({}), []);

  const toggleSound = (id: string) => {
    setSelectedSounds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleScript = (name: string) => {
    setSelectedScripts((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  // Filter characters based on selected sounds, scripts, and search
  const filteredCharacters = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    const results: {
      character: AlphabetChar;
      soundGroup: SoundGroup;
      key: string;
    }[] = [];
    const seen = new Set<string>();

    for (const group of soundGroups) {
      if (selectedSounds.size > 0 && !selectedSounds.has(group.id)) continue;

      for (const char of group.characters) {
        if (selectedScripts.size > 0 && !selectedScripts.has(char.script))
          continue;

        if (query) {
          const match =
            char.name.toLowerCase().includes(query) ||
            char.script.toLowerCase().includes(query) ||
            char.char.includes(query) ||
            char.sound.toLowerCase().includes(query) ||
            group.label.toLowerCase().includes(query);
          if (!match) continue;
        }

        const key = `${group.id}:${char.name}:${char.script}`;
        if (!seen.has(key)) {
          seen.add(key);
          results.push({ character: char, soundGroup: group, key });
        }
      }
    }
    return results;
  }, [selectedSounds, selectedScripts, searchQuery]);

  // Group the filtered characters
  const grouped = useMemo(() => {
    const map = new Map<
      string,
      {
        label: string;
        subtitle: string;
        items: typeof filteredCharacters;
      }
    >();

    for (const item of filteredCharacters) {
      const groupKey =
        groupBy === "sound" ? item.soundGroup.id : item.character.script;
      const label =
        groupBy === "sound" ? item.soundGroup.label : item.character.script;
      const subtitle =
        groupBy === "sound" ? item.soundGroup.ipa : "";

      if (!map.has(groupKey)) {
        map.set(groupKey, { label, subtitle, items: [] });
      }
      map.get(groupKey)!.items.push(item);
    }

    return Array.from(map.entries());
  }, [filteredCharacters, groupBy]);

  const selectedEntries = useMemo(
    () => resolveSelections(selections, soundGroups),
    [selections]
  );

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="space-y-2 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Alphabet Designer
        </h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400">
          Pick the coolest characters from writing systems around the world.
        </p>
      </header>

      {/* My Alphabet (sticky) */}
      <section className="sticky top-0 z-10 rounded-2xl border border-zinc-200 bg-white/80 p-5 shadow-sm backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
        <MyAlphabetPanel
          entries={selectedEntries}
          onRemove={handleRemove}
          onClear={handleClear}
        />
      </section>

      {/* Search */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search characters by name, script, or sound..."
        className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder:text-zinc-500 dark:focus:border-zinc-500"
      />

      {/* Filter lists + main content */}
      <div className="flex gap-6">
        {/* Sidebar: two filter lists */}
        <aside className="hidden w-56 shrink-0 space-y-4 sm:block">
          {/* Sound filter list */}
          <FilterList
            title="Sounds"
            groupByActive={groupBy === "sound"}
            onGroupByToggle={() => setGroupBy("sound")}
            items={soundGroups.map((g) => ({
              id: g.id,
              label: g.label,
              badge: g.ipa,
              count: g.characters.length,
            }))}
            selected={selectedSounds}
            onToggle={toggleSound}
          />

          {/* Script filter list */}
          <FilterList
            title="Scripts"
            groupByActive={groupBy === "script"}
            onGroupByToggle={() => setGroupBy("script")}
            items={allScripts.map((s) => ({
              id: s,
              label: s,
              count: getCharactersByScript(s).length,
            }))}
            selected={selectedScripts}
            onToggle={toggleScript}
          />
        </aside>

        {/* Mobile filters */}
        <div className="flex flex-col gap-3 sm:hidden w-full">
          <MobileFilterBar
            groupBy={groupBy}
            setGroupBy={setGroupBy}
            selectedSounds={selectedSounds}
            toggleSound={toggleSound}
            selectedScripts={selectedScripts}
            toggleScript={toggleScript}
          />

          {/* Main content (mobile) */}
          <MainContent
            grouped={grouped}
            groupBy={groupBy}
            selections={selections}
            onToggle={handleToggle}
          />
        </div>

        {/* Main content (desktop) */}
        <div className="hidden sm:block flex-1 min-w-0">
          <MainContent
            grouped={grouped}
            groupBy={groupBy}
            selections={selections}
            onToggle={handleToggle}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-200 pt-6 text-center text-sm text-zinc-400 dark:border-zinc-800 dark:text-zinc-600">
        Alphabet Designer — {allScripts.length} writing systems
      </footer>
    </div>
  );
}

// ── Filter List ──────────────────────────────────────────

interface FilterListProps {
  title: string;
  groupByActive: boolean;
  onGroupByToggle: () => void;
  items: { id: string; label: string; badge?: string; count: number }[];
  selected: Set<string>;
  onToggle: (id: string) => void;
}

function FilterList({
  title,
  groupByActive,
  onGroupByToggle,
  items,
  selected,
  onToggle,
}: FilterListProps) {
  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      {/* Header with group-by toggle */}
      <button
        onClick={onGroupByToggle}
        className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-semibold transition-colors cursor-pointer ${
          groupByActive
            ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
            : "bg-zinc-50 text-zinc-700 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
        }`}
      >
        <span>{title}</span>
        <span className="text-[10px] font-normal opacity-70">
          {groupByActive ? "Grouped" : "Group by"}
        </span>
      </button>

      {/* Scrollable list */}
      <div className="max-h-64 overflow-y-auto">
        {/* All option */}
        <button
          onClick={() => {
            // Clear all selections for this filter
            if (selected.size > 0) {
              // If anything is selected, deselect all
              for (const id of selected) onToggle(id);
            }
          }}
          className={`w-full flex items-center justify-between px-3 py-1.5 text-xs transition-colors cursor-pointer ${
            selected.size === 0
              ? "bg-zinc-100 font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
              : "text-zinc-500 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-900"
          }`}
        >
          <span>All</span>
        </button>

        {items.map((item) => {
          const isActive = selected.has(item.id);
          return (
            <button
              key={item.id}
              onClick={() => onToggle(item.id)}
              className={`w-full flex items-center justify-between px-3 py-1.5 text-xs transition-colors cursor-pointer ${
                isActive
                  ? "bg-zinc-100 font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                  : "text-zinc-500 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-900"
              }`}
            >
              <span className="truncate">{item.label}</span>
              <span className="ml-1 flex items-center gap-1">
                {item.badge && (
                  <span className="font-mono text-[10px] opacity-50">
                    {item.badge}
                  </span>
                )}
                <span className="text-[10px] opacity-40">{item.count}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Mobile Filter Bar ────────────────────────────────────

function MobileFilterBar({
  groupBy,
  setGroupBy,
  selectedSounds,
  toggleSound,
  selectedScripts,
  toggleScript,
}: {
  groupBy: GroupBy;
  setGroupBy: (g: GroupBy) => void;
  selectedSounds: Set<string>;
  toggleSound: (id: string) => void;
  selectedScripts: Set<string>;
  toggleScript: (id: string) => void;
}) {
  return (
    <div className="space-y-3">
      {/* Group by toggle */}
      <div className="flex gap-1 rounded-lg border border-zinc-200 p-1 dark:border-zinc-700">
        <button
          onClick={() => setGroupBy("sound")}
          className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
            groupBy === "sound"
              ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
              : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400"
          }`}
        >
          Group by Sound
        </button>
        <button
          onClick={() => setGroupBy("script")}
          className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
            groupBy === "script"
              ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
              : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400"
          }`}
        >
          Group by Script
        </button>
      </div>

      {/* Horizontal scrollable sound pills */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {soundGroups.map((g) => (
          <button
            key={g.id}
            onClick={() => toggleSound(g.id)}
            className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors cursor-pointer border ${
              selectedSounds.has(g.id)
                ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                : "border-zinc-200 text-zinc-500 dark:border-zinc-700 dark:text-zinc-400"
            }`}
          >
            {g.ipa}
          </button>
        ))}
      </div>

      {/* Horizontal scrollable script pills */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {allScripts.map((s) => (
          <button
            key={s}
            onClick={() => toggleScript(s)}
            className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors cursor-pointer border ${
              selectedScripts.has(s)
                ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                : "border-zinc-200 text-zinc-500 dark:border-zinc-700 dark:text-zinc-400"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Main Content ─────────────────────────────────────────

function MainContent({
  grouped,
  groupBy,
  selections,
  onToggle,
}: {
  grouped: [
    string,
    {
      label: string;
      subtitle: string;
      items: {
        character: AlphabetChar;
        soundGroup: SoundGroup;
        key: string;
      }[];
    },
  ][];
  groupBy: GroupBy;
  selections: Record<string, boolean>;
  onToggle: (soundId: string, key: string) => void;
}) {
  if (grouped.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-zinc-300 p-12 dark:border-zinc-700">
        <p className="text-zinc-400 dark:text-zinc-500">
          No characters match your filters
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {grouped.map(([key, { label, subtitle, items }]) => (
        <div key={key} className="space-y-3">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold tracking-tight">{label}</h3>
            {subtitle && (
              <Badge variant="secondary" className="font-mono text-xs">
                {subtitle}
              </Badge>
            )}
            <Badge variant="outline" className="text-[10px]">
              {items.length}
            </Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            {items.map(({ character, soundGroup, key: charKey }) => (
              <CharacterCard
                key={charKey}
                character={character}
                selected={!!selections[charKey]}
                onToggle={() => onToggle(soundGroup.id, charKey)}
                subtitle={
                  groupBy === "script" ? soundGroup.ipa : character.script
                }
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
