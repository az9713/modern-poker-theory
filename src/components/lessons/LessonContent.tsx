import type { LessonSection } from '../../types';
import { HandDisplay } from '../cards/PlayingCard';
import { PokerTable } from '../poker/PokerTable';
import { RangeGrid } from '../poker/RangeGrid';

interface Props {
  sections: LessonSection[];
}

function renderText(text: string) {
  // Bold: **text** and code: `text`
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\n\n|\n)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-[#f0ebe0] font-semibold">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i} className="bg-[#0d1f13] text-[#c9a227] px-1 py-0.5 rounded font-mono text-sm">{part.slice(1, -1)}</code>;
    }
    if (part === '\n\n') return <><br key={i} /><br /></>;
    if (part === '\n') return <br key={i} />;
    return <span key={i}>{part}</span>;
  });
}

const CALLOUT_STYLES = {
  concept: {
    border: 'border-[#c9a227]',
    bg: 'bg-[#c9a227]/10',
    label: '💡 Key Concept',
    labelColor: 'text-[#c9a227]',
  },
  example: {
    border: 'border-blue-500',
    bg: 'bg-blue-900/20',
    label: '📝 Example',
    labelColor: 'text-blue-400',
  },
  warning: {
    border: 'border-[#f87171]',
    bg: 'bg-red-900/20',
    label: '⚠️ Watch Out',
    labelColor: 'text-[#f87171]',
  },
  tip: {
    border: 'border-[#4ade80]',
    bg: 'bg-green-900/20',
    label: '✅ Quick Summary',
    labelColor: 'text-[#4ade80]',
  },
};

export function LessonContent({ sections }: Props) {
  return (
    <div className="space-y-5">
      {sections.map((section, i) => {
        switch (section.type) {
          case 'text':
            return (
              <p key={i} className="text-[#f0ebe0] leading-relaxed text-base">
                {renderText(section.content ?? '')}
              </p>
            );

          case 'callout': {
            const style = CALLOUT_STYLES[section.calloutType ?? 'concept'];
            return (
              <div key={i} className={`border-l-4 ${style.border} ${style.bg} rounded-r-lg p-4`}>
                <div className={`text-sm font-bold mb-2 ${style.labelColor}`}>{style.label}</div>
                <div className="text-[#f0ebe0] text-sm leading-relaxed whitespace-pre-line">
                  {renderText(section.content ?? '')}
                </div>
              </div>
            );
          }

          case 'key-point':
            return (
              <div key={i} className="bg-[#c9a227]/10 border border-[#c9a227]/40 rounded-lg p-4">
                <div className="text-[#c9a227] font-bold text-sm mb-1">⭐ Remember This</div>
                <div className="text-[#f0ebe0] font-medium text-sm leading-relaxed">
                  {renderText(section.content ?? '')}
                </div>
              </div>
            );

          case 'card-demo':
            return (
              <div key={i} className="bg-[#162b1a] border border-[#2a4a30] rounded-lg p-4 space-y-2">
                {section.content && (
                  <p className="text-[#9db89f] text-sm">{section.content}</p>
                )}
                {section.cards && (
                  <HandDisplay cards={section.cards} size="md" animate />
                )}
              </div>
            );

          case 'board-demo':
            return (
              <div key={i} className="bg-[#162b1a] border border-[#2a4a30] rounded-lg p-4 space-y-2">
                {section.content && (
                  <p className="text-[#9db89f] text-sm">{section.content}</p>
                )}
                {section.cards && (
                  <div className="flex items-center gap-2">
                    <span className="text-[#9db89f] text-sm">Flop:</span>
                    <HandDisplay cards={section.cards} size="lg" animate />
                  </div>
                )}
              </div>
            );

          case 'table':
            if (!section.tableData) return null;
            return (
              <div key={i} className="overflow-x-auto rounded-lg border border-[#2a4a30]">
                {section.content && (
                  <div className="bg-[#162b1a] px-4 py-2 text-[#c9a227] text-sm font-semibold border-b border-[#2a4a30]">
                    {section.content}
                  </div>
                )}
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#162b1a]">
                      {section.tableData.headers.map((h, hi) => (
                        <th key={hi} className="px-3 py-2 text-left text-[#9db89f] font-medium border-b border-[#2a4a30]">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.tableData.rows.map((row, ri) => (
                      <tr key={ri} className={ri % 2 === 0 ? 'bg-[#0d1f13]' : 'bg-[#162b1a]/50'}>
                        {row.map((cell, ci) => (
                          <td key={ci} className="px-3 py-2 text-[#f0ebe0] border-b border-[#2a4a30]/50">
                            {renderText(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case 'formula':
            return (
              <div key={i} className="bg-[#0d1f13] border border-[#2a4a30] rounded-lg p-4">
                {section.formulaLabel && (
                  <div className="text-[#9db89f] text-xs mb-2 uppercase tracking-wider">{section.formulaLabel}</div>
                )}
                <div className="font-mono text-[#c9a227] text-base leading-relaxed">
                  {section.formula}
                </div>
              </div>
            );

          case 'position-table':
            return (
              <div key={i} className="my-4">
                {section.content && (
                  <p className="text-[#9db89f] text-sm mb-2">{section.content}</p>
                )}
                <PokerTable showStrength />
              </div>
            );

          case 'range-grid':
            return (
              <div key={i} className="bg-[#162b1a] border border-[#2a4a30] rounded-lg p-4">
                {section.content && (
                  <p className="text-[#9db89f] text-sm mb-3">{section.content}</p>
                )}
                <RangeGrid
                  mode="display"
                  highlightHands={section.rangeHighlight ? new Set(section.rangeHighlight) : undefined}
                  compact
                />
              </div>
            );

          case 'step-list':
            if (!section.steps?.length) return null;
            return (
              <div key={i} className="bg-[#162b1a] border border-[#2a4a30] rounded-lg p-4">
                {section.content && (
                  <p className="text-[#9db89f] text-sm mb-3 font-medium">{section.content}</p>
                )}
                <ol className="space-y-2">
                  {section.steps.map((step, si) => (
                    <li key={si} className="flex items-start gap-3">
                      <span className="shrink-0 w-6 h-6 rounded-full bg-[#4ade80]/20 border border-[#4ade80]/40 flex items-center justify-center text-xs text-[#4ade80] font-bold mt-0.5">
                        {si + 1}
                      </span>
                      <span className="text-[#f0ebe0] text-sm leading-relaxed">
                        {renderText(step)}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            );

          case 'scenario': {
            const s = section.scenarioData;
            if (!s) return null;
            const rows = [
              { label: 'Pot', value: s.pot },
              { label: 'Stacks', value: s.stacks },
              { label: 'Position', value: s.position },
              ...(s.action ? [{ label: 'Action', value: s.action }] : []),
            ];
            return (
              <div key={i} className="bg-[#0d1f13] border border-[#2a4a30] rounded-lg p-4">
                <div className="text-[#c9a227] text-sm font-bold mb-3">🃏 Scenario</div>
                <div className="space-y-1.5 text-sm">
                  {rows.map(({ label, value }) => (
                    <div key={label} className="flex gap-2">
                      <span className="text-[#9db89f] w-20 shrink-0">{label}:</span>
                      <span className="text-[#f0ebe0]">{value}</span>
                    </div>
                  ))}
                </div>
                {s.board && s.board.length > 0 && (
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-[#9db89f] text-sm w-20 shrink-0">Board:</span>
                    <HandDisplay cards={s.board} size="md" animate />
                  </div>
                )}
                {section.content && (
                  <p className="mt-3 text-[#9db89f] text-sm leading-relaxed border-t border-[#2a4a30] pt-3">
                    {renderText(section.content)}
                  </p>
                )}
              </div>
            );
          }

          default:
            return null;
        }
      })}
    </div>
  );
}
