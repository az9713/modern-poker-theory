import { useState, useMemo } from 'react';
import { MODULES } from '../data/modules';

type TermEntry = {
  term: string;
  definition: string;
  moduleId: string;
  moduleTitle: string;
  moduleIcon: string;
  moduleColor: string;
};

export function Reference() {
  const [search, setSearch] = useState('');
  const [filterModule, setFilterModule] = useState<string | null>(null);

  const allTerms = useMemo<TermEntry[]>(() => {
    const seen = new Set<string>();
    const terms: TermEntry[] = [];
    for (const m of MODULES) {
      for (const l of m.lessons) {
        for (const kt of l.keyTerms) {
          const key = kt.term.toLowerCase();
          if (!seen.has(key)) {
            seen.add(key);
            terms.push({
              term: kt.term,
              definition: kt.definition,
              moduleId: m.id,
              moduleTitle: m.title,
              moduleIcon: m.icon,
              moduleColor: m.color,
            });
          }
        }
      }
    }
    return terms.sort((a, b) => a.term.localeCompare(b.term));
  }, []);

  const filtered = useMemo(() => {
    return allTerms.filter(t => {
      const matchesSearch =
        !search ||
        t.term.toLowerCase().includes(search.toLowerCase()) ||
        t.definition.toLowerCase().includes(search.toLowerCase());
      const matchesModule = !filterModule || t.moduleId === filterModule;
      return matchesSearch && matchesModule;
    });
  }, [allTerms, search, filterModule]);

  const grouped = useMemo(() => {
    const map = new Map<string, TermEntry[]>();
    for (const t of filtered) {
      const letter = t.term[0].toUpperCase();
      if (!map.has(letter)) map.set(letter, []);
      map.get(letter)!.push(t);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#f0ebe0] mb-2">📖 Reference Glossary</h1>
        <p className="text-[#9db89f]">
          All key terms from the MPT Academy curriculum — searchable and filterable.
        </p>
        <div className="mt-3 text-sm text-[#9db89f]">
          <span className="text-[#c9a227] font-bold">{allTerms.length}</span> terms across{' '}
          <span className="text-[#c9a227] font-bold">{MODULES.length}</span> modules
        </div>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search terms or definitions..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-[#162b1a] border border-[#2a4a30] rounded-lg px-4 py-2.5 text-[#f0ebe0] placeholder-[#9db89f] focus:outline-none focus:border-[#c9a227] text-sm"
        />
      </div>

      {/* Module filter pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilterModule(null)}
          className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
            !filterModule
              ? 'bg-[#c9a227] text-black border-[#c9a227]'
              : 'text-[#9db89f] border-[#2a4a30] hover:border-[#c9a227]/50'
          }`}
        >
          All modules
        </button>
        {MODULES.map(m => (
          <button
            key={m.id}
            onClick={() => setFilterModule(prev => (prev === m.id ? null : m.id))}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
              filterModule === m.id
                ? 'text-black border-transparent'
                : 'text-[#9db89f] border-[#2a4a30] hover:border-[#c9a227]/50'
            }`}
            style={
              filterModule === m.id
                ? { backgroundColor: m.color, borderColor: m.color }
                : {}
            }
          >
            {m.icon} {m.title}
          </button>
        ))}
      </div>

      {/* Results count */}
      {(search || filterModule) && (
        <div className="mb-4 text-sm text-[#9db89f]">
          {filtered.length} result{filtered.length !== 1 ? 's' : ''}
          {search && (
            <>
              {' '}for "<span className="text-[#f0ebe0]">{search}</span>"
            </>
          )}
        </div>
      )}

      {/* Alphabetical groups */}
      <div className="space-y-8">
        {grouped.length === 0 && (
          <div className="text-center py-12 text-[#9db89f]">
            <div className="text-4xl mb-3">🔍</div>
            <p>No terms found. Try a different search.</p>
          </div>
        )}
        {grouped.map(([letter, terms]) => (
          <div key={letter}>
            <div className="text-[#c9a227] font-bold text-lg border-b border-[#2a4a30] pb-1 mb-3">
              {letter}
            </div>
            <div className="space-y-3">
              {terms.map(t => (
                <div
                  key={t.term}
                  className="bg-[#162b1a] border border-[#2a4a30] rounded-lg p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="text-[#c9a227] font-semibold text-sm mb-1">{t.term}</div>
                      <div className="text-[#f0ebe0] text-sm leading-relaxed">{t.definition}</div>
                    </div>
                    <div
                      className="shrink-0 flex items-center gap-1 px-2 py-1 rounded border text-xs"
                      style={{ borderColor: t.moduleColor + '60', color: t.moduleColor }}
                    >
                      <span>{t.moduleIcon}</span>
                      <span className="hidden sm:inline">{t.moduleTitle}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
