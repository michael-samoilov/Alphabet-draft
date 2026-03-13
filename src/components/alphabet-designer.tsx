"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
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
import { speakIpa } from "@/hooks/use-ipa-audio";

type GroupBy = "sound" | "script";

export function AlphabetDesigner() {
  const [selections, setSelections] = useLocalStorage<Record<string, boolean>>(
    "alphabet-designer-selections",
    {}
  );
  const [groupBy, setGroupBy] = useState<GroupBy>("sound");
  const [selectedSounds, setSelectedSounds] = useState<Set<string>>(new Set());
  const [selectedScripts, setSelectedScripts] = useState<Set<string>>(
    new Set()
  );

  const stickyRef = useRef<HTMLDivElement>(null);
  const [stickyHeight, setStickyHeight] = useState(0);

  useEffect(() => {
    if (!stickyRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      setStickyHeight(entry.contentRect.height + 24); // include padding
    });
    observer.observe(stickyRef.current);
    return () => observer.disconnect();
  }, []);

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

        const key = `${group.id}:${char.name}:${char.script}`;
        if (!seen.has(key)) {
          seen.add(key);
          results.push({ character: char, soundGroup: group, key });
        }
      }
    }
    return results;
  }, [selectedSounds, selectedScripts]);

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
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      {/* Sticky top pane: keyboard + filters (~40vh on mobile) */}
      <div ref={stickyRef} className="sticky top-0 z-10 bg-white/95 backdrop-blur-md dark:bg-zinc-950/95 pb-3 pt-3 border-b border-zinc-200 dark:border-zinc-800">
        <div className="space-y-3">
          {/* Keyboard */}
          <MyAlphabetPanel
            entries={selectedEntries}
            onRemove={handleRemove}
            onClear={handleClear}
          />

          {/* Mobile filters — two side-by-side fixed-height scroll lists */}
          <div className="sm:hidden">
            <MobileFilterBar
              groupBy={groupBy}
              setGroupBy={setGroupBy}
              selectedSounds={selectedSounds}
              toggleSound={toggleSound}
              selectedScripts={selectedScripts}
              toggleScript={toggleScript}
            />
          </div>

          {/* Desktop filters — inline */}
          <div className="hidden sm:flex gap-4">
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
          </div>

        </div>
      </div>

      {/* Main content — scrollable below the sticky pane */}
      <div className="pt-2 pb-8">
        <MainContent
          grouped={grouped}
          groupBy={groupBy}
          selections={selections}
          onToggle={handleToggle}
          stickyOffset={stickyHeight}
        />
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-200 pt-6 pb-8 text-center text-sm text-zinc-400 dark:border-zinc-800 dark:text-zinc-600">
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
    <div className="flex-1 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      {/* Header with group-by toggle */}
      <button
        onClick={onGroupByToggle}
        className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold transition-colors cursor-pointer ${
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

      {/* Fixed-height body: scroll area + optional clear button share the space */}
      <div className="flex flex-col" style={{ height: "140px" }}>
        <div className="flex-1 min-h-0 overflow-y-auto">
          {/* All option */}
          <button
            onClick={() => {
              if (selected.size > 0) {
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
                <span className="flex items-center gap-1.5 truncate">
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span className="font-mono text-[10px] opacity-50">
                      {item.badge}
                    </span>
                  )}
                </span>
                <span className="text-[10px] opacity-40 ml-1 shrink-0">{item.count}</span>
              </button>
            );
          })}
        </div>

        {selected.size > 0 && (
          <button
            onClick={() => { for (const id of selected) onToggle(id); }}
            className="shrink-0 w-full flex items-center justify-center text-[10px] text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 border-t border-zinc-200 dark:border-zinc-800 transition-colors cursor-pointer"
            style={{ height: "28px" }}
          >
            Clear filters
          </button>
        )}
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
    <div className="grid grid-cols-2 gap-2">
      {/* Sound filter list */}
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <button
          onClick={() => setGroupBy("sound")}
          className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold transition-colors cursor-pointer ${
            groupBy === "sound"
              ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
              : "bg-zinc-50 text-zinc-700 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-300"
          }`}
        >
          <span>Sounds</span>
          <span className="text-[9px] font-normal opacity-70">
            {groupBy === "sound" ? "Grouped" : "Group by"}
          </span>
        </button>
        <div className="flex flex-col" style={{ height: "110px" }}>
          <div className="flex-1 min-h-0 overflow-y-auto">
            {soundGroups.map((g) => (
              <button
                key={g.id}
                onClick={() => toggleSound(g.id)}
                className={`w-full flex items-center justify-between px-2.5 py-1 text-[11px] transition-colors cursor-pointer ${
                  selectedSounds.has(g.id)
                    ? "bg-zinc-100 font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                    : "text-zinc-500 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-900"
                }`}
              >
                <span className="flex items-center gap-1 truncate">
                  <span className="truncate">{g.label}</span>
                  <span className="font-mono text-[9px] opacity-50">{g.ipa}</span>
                </span>
                <span className="text-[9px] opacity-40 ml-1 shrink-0">{g.characters.length}</span>
              </button>
            ))}
          </div>
          {selectedSounds.size > 0 && (
            <button
              onClick={() => { for (const id of selectedSounds) toggleSound(id); }}
              className="shrink-0 w-full flex items-center justify-center text-[9px] text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 border-t border-zinc-200 dark:border-zinc-800 transition-colors cursor-pointer"
              style={{ height: "22px" }}
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Script filter list */}
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <button
          onClick={() => setGroupBy("script")}
          className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold transition-colors cursor-pointer ${
            groupBy === "script"
              ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
              : "bg-zinc-50 text-zinc-700 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-300"
          }`}
        >
          <span>Scripts</span>
          <span className="text-[9px] font-normal opacity-70">
            {groupBy === "script" ? "Grouped" : "Group by"}
          </span>
        </button>
        <div className="flex flex-col" style={{ height: "110px" }}>
          <div className="flex-1 min-h-0 overflow-y-auto">
            {allScripts.map((s) => (
              <button
                key={s}
                onClick={() => toggleScript(s)}
                className={`w-full flex items-center justify-between px-2.5 py-1 text-[11px] transition-colors cursor-pointer ${
                  selectedScripts.has(s)
                    ? "bg-zinc-100 font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                    : "text-zinc-500 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-900"
                }`}
              >
                <span className="truncate">{s}</span>
                <span className="text-[9px] opacity-40 ml-1 shrink-0">{getCharactersByScript(s).length}</span>
              </button>
            ))}
          </div>
          {selectedScripts.size > 0 && (
            <button
              onClick={() => { for (const id of selectedScripts) toggleScript(id); }}
              className="shrink-0 w-full flex items-center justify-center text-[9px] text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 border-t border-zinc-200 dark:border-zinc-800 transition-colors cursor-pointer"
              style={{ height: "22px" }}
            >
              Clear filters
            </button>
          )}
        </div>
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
  stickyOffset,
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
  stickyOffset: number;
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
          <div className="sticky z-[5] flex items-center gap-2 bg-white/95 backdrop-blur-md dark:bg-zinc-950/95 py-2 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8" style={{ top: `${stickyOffset}px` }}>
            <h3 className="text-lg font-semibold tracking-tight">{label}</h3>
            {subtitle && (
              <button
                onClick={() => speakIpa(subtitle)}
                title="Listen to this sound"
                className="inline-flex items-center gap-1 cursor-pointer hover:opacity-70 transition-opacity"
              >
                <Badge variant="secondary" className="font-mono text-xs">
                  {subtitle}
                </Badge>
                <span className="text-zinc-400 text-xs">&#9654;</span>
              </button>
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
