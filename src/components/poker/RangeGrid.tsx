import { useState } from 'react';

const RANKS = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'] as const;


function getCellLabel(row: number, col: number): string {
  if (row === col) return `${RANKS[row]}${RANKS[col]}`; // pair
  if (col > row) return `${RANKS[row]}${RANKS[col]}s`;   // suited (upper right)
  return `${RANKS[col]}${RANKS[row]}o`;                   // offsuit (lower left)
}

function getCellType(row: number, col: number): 'pair' | 'suited' | 'offsuit' {
  if (row === col) return 'pair';
  if (col > row) return 'suited';
  return 'offsuit';
}

interface RangeGridProps {
  mode?: 'interactive' | 'display' | 'quiz';
  selectedHands?: Set<string>;
  highlightHands?: Set<string>;
  correctHands?: Set<string>;
  wrongHands?: Set<string>;
  onSelectionChange?: (hands: Set<string>) => void;
  title?: string;
  compact?: boolean;
}

export function RangeGrid({
  mode = 'display',
  selectedHands,
  highlightHands,
  correctHands,
  wrongHands,
  onSelectionChange,
  title,
  compact = false,
}: RangeGridProps) {
  const [internalSelected, setInternalSelected] = useState<Set<string>>(new Set());
  const [isDragging, setIsDragging] = useState(false);
  const [dragMode, setDragMode] = useState<'add' | 'remove'>('add');

  const selected = selectedHands ?? internalSelected;

  function toggleCell(label: string) {
    if (mode !== 'interactive' && mode !== 'quiz') return;
    const next = new Set(selected);
    if (next.has(label)) {
      next.delete(label);
    } else {
      next.add(label);
    }
    if (onSelectionChange) onSelectionChange(next);
    else setInternalSelected(next);
  }

  function getCellColor(label: string, type: 'pair' | 'suited' | 'offsuit'): string {
    if (correctHands?.has(label)) return 'bg-green-600 border-green-400';
    if (wrongHands?.has(label)) return 'bg-red-600 border-red-400';
    if (selected.has(label)) return 'bg-amber-500 border-amber-300';
    if (highlightHands?.has(label)) return 'bg-blue-600 border-blue-400';

    switch (type) {
      case 'pair': return 'bg-purple-900/60 border-purple-700 hover:bg-purple-700';
      case 'suited': return 'bg-blue-900/40 border-blue-800 hover:bg-blue-700';
      case 'offsuit': return 'bg-slate-800/60 border-slate-700 hover:bg-slate-600';
    }
  }

  const cellSize = compact ? 'w-6 h-6 text-[7px]' : 'w-8 h-8 text-[9px]';

  return (
    <div className="flex flex-col items-center gap-2">
      {title && <div className="text-sm text-[#9db89f] font-medium">{title}</div>}

      {/* Column headers */}
      <div className="flex items-center gap-px">
        <div className={`${compact ? 'w-6' : 'w-8'}`} />
        {RANKS.map(r => (
          <div key={r} className={`${cellSize} flex items-center justify-center text-[#9db89f] font-bold`}>
            {r}
          </div>
        ))}
      </div>

      {/* Grid rows */}
      {RANKS.map((rowRank, row) => (
        <div key={rowRank} className="flex items-center gap-px">
          {/* Row header */}
          <div className={`${cellSize} flex items-center justify-center text-[#9db89f] font-bold`}>
            {rowRank}
          </div>

          {RANKS.map((_, col) => {
            const label = getCellLabel(row, col);
            const type = getCellType(row, col);
            const cellColor = getCellColor(label, type);
            const isInteractive = mode === 'interactive' || mode === 'quiz';

            return (
              <div
                key={label}
                className={`
                  ${cellSize} border rounded-sm flex items-center justify-center
                  font-mono leading-none transition-colors duration-75
                  ${cellColor}
                  ${isInteractive ? 'cursor-pointer select-none' : ''}
                `}
                onMouseDown={() => {
                  if (!isInteractive) return;
                  setIsDragging(true);
                  setDragMode(selected.has(label) ? 'remove' : 'add');
                  toggleCell(label);
                }}
                onMouseEnter={() => {
                  if (!isDragging || !isInteractive) return;
                  const next = new Set(selected);
                  if (dragMode === 'add') next.add(label);
                  else next.delete(label);
                  if (onSelectionChange) onSelectionChange(next);
                  else setInternalSelected(next);
                }}
                onMouseUp={() => setIsDragging(false)}
                title={label}
                aria-label={label}
              >
                {!compact && label}
              </div>
            );
          })}
        </div>
      ))}

      {/* Legend */}
      <div className="flex gap-3 text-xs text-[#9db89f] mt-1">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-purple-900/60 border border-purple-700 rounded-sm" />
          <span>Pairs</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-900/40 border border-blue-800 rounded-sm" />
          <span>Suited</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-slate-800/60 border border-slate-700 rounded-sm" />
          <span>Offsuit</span>
        </div>
        {(highlightHands || selected.size > 0) && (
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-amber-500 border border-amber-300 rounded-sm" />
            <span>Selected</span>
          </div>
        )}
      </div>

      {mode === 'interactive' && selected.size > 0 && (
        <div className="text-xs text-[#c9a227] mt-1">
          {selected.size} hand{selected.size !== 1 ? 's' : ''} selected
        </div>
      )}
    </div>
  );
}
