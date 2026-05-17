import { Link } from 'react-router-dom';
import { MODULES } from '../data/modules';
import { useProgressStore } from '../store/progressStore';
import { isModuleUnlocked } from '../data/modules';
import type { BeltRank } from '../types';

const BELT_COLORS: Record<BeltRank, { border: string; bg: string; text: string }> = {
  white: { border: 'border-gray-400', bg: 'bg-gray-400/10', text: 'text-gray-300' },
  blue: { border: 'border-blue-400', bg: 'bg-blue-400/10', text: 'text-blue-300' },
  purple: { border: 'border-purple-400', bg: 'bg-purple-400/10', text: 'text-purple-300' },
  brown: { border: 'border-amber-600', bg: 'bg-amber-600/10', text: 'text-amber-400' },
  black: { border: 'border-gray-200', bg: 'bg-gray-200/10', text: 'text-gray-100' },
};

export function Dashboard() {
  const { completedLessons, hasPassedQuiz } = useProgressStore();

  const passedModules = MODULES.filter(m => hasPassedQuiz(m.id)).map(m => m.id);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-[#f0ebe0] text-3xl font-bold mb-2">Learning Modules</h1>
        <p className="text-[#9db89f]">Complete modules in order. Each quiz unlocks the next module.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {MODULES.map((module, index) => {
          const lessonIds = module.lessons.map(l => l.id);
          const completedCount = lessonIds.filter(id => completedLessons.includes(id)).length;
          const passed = hasPassedQuiz(module.id);
          const unlocked = isModuleUnlocked(module.id, passedModules);
          const progressPct = lessonIds.length > 0 ? (completedCount / lessonIds.length) * 100 : 0;
          const belt = BELT_COLORS[module.belt];

          return (
            <div
              key={module.id}
              className={`bg-[#162b1a] border rounded-xl overflow-hidden transition-all ${
                unlocked
                  ? `border-[#2a4a30] hover:border-[#c9a227]/50 cursor-pointer`
                  : 'border-[#2a4a30] opacity-50'
              } ${passed ? 'border-[#4ade80]/30' : ''}`}
            >
              {/* Header */}
              <div className="p-5">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl shrink-0">{module.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-[#f0ebe0] font-bold text-lg leading-tight">{module.title}</h2>
                      {passed && <span className="text-[#4ade80] text-sm">✓ Complete</span>}
                      {!unlocked && <span className="text-[#9db89f] text-sm">🔒</span>}
                    </div>
                    <p className="text-[#9db89f] text-sm mt-1">{module.tagline}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-[#9db89f]">
                  <span>{module.weekEquivalent}</span>
                  <span>·</span>
                  <span>{module.lessons.length} lessons</span>
                  <span>·</span>
                  <span className={`border rounded px-1.5 py-0.5 ${belt.border} ${belt.bg} ${belt.text}`}>
                    {module.belt} belt
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="px-5 pb-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex-1 h-2 bg-[#0d1f13] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${passed ? 'bg-[#4ade80]' : 'bg-[#c9a227]'}`}
                      style={{ width: `${passed ? 100 : progressPct}%` }}
                    />
                  </div>
                  <span className="text-xs text-[#9db89f] whitespace-nowrap">
                    {passed ? 'Done!' : `${completedCount}/${lessonIds.length}`}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              {unlocked && (
                <div className="px-5 pb-5 flex gap-2">
                  <Link
                    to={`/learn/${module.id}`}
                    className="flex-1 py-2 bg-[#0d1f13] hover:bg-[#2a4a30] border border-[#2a4a30] hover:border-[#c9a227]/50 text-[#f0ebe0] text-sm font-medium rounded-lg text-center transition-colors"
                  >
                    {completedCount === 0 ? 'Start' : completedCount === lessonIds.length ? 'Review' : 'Continue'} →
                  </Link>
                  {completedCount === lessonIds.length && (
                    <Link
                      to={`/quiz/${module.id}`}
                      className={`flex-1 py-2 text-sm font-bold rounded-lg text-center transition-colors ${
                        passed
                          ? 'bg-[#4ade80]/10 border border-[#4ade80]/30 text-[#4ade80] hover:bg-[#4ade80]/20'
                          : 'bg-[#c9a227] hover:bg-[#e8c347] text-black'
                      }`}
                    >
                      {passed ? '✓ Retake Quiz' : 'Take Quiz →'}
                    </Link>
                  )}
                </div>
              )}

              {!unlocked && (
                <div className="px-5 pb-5">
                  <div className="text-xs text-[#9db89f] bg-[#0d1f13] rounded-lg px-3 py-2 border border-[#2a4a30]">
                    🔒 Complete Module {index} to unlock
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
