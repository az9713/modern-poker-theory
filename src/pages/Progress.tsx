import { Link } from 'react-router-dom';
import { useProgressStore } from '../store/progressStore';
import { BADGES } from '../data/badges';
import { MODULES } from '../data/modules';
import { getLevelForXP, getNextLevel, LEVELS } from '../types';

export function Progress() {
  const { xp, xpHistory, unlockedBadges, streakDays, completedLessons, getBestQuizScore, hasPassedQuiz } = useProgressStore();

  const level = getLevelForXP(xp);
  const nextLevel = getNextLevel(xp);
  const xpIntoLevel = xp - level.requiredXP;
  const xpNeeded = nextLevel ? nextLevel.requiredXP - level.requiredXP : 1;
  const levelProgress = nextLevel ? (xpIntoLevel / xpNeeded) * 100 : 100;

  const passedCount = MODULES.filter(m => hasPassedQuiz(m.id)).length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-[#f0ebe0] text-3xl font-bold">Your Progress</h1>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total XP', value: xp.toLocaleString(), color: 'text-[#c9a227]' },
          { label: 'Modules Complete', value: `${passedCount} / ${MODULES.length}`, color: 'text-[#4ade80]' },
          { label: 'Day Streak', value: `${streakDays} 🔥`, color: 'text-[#fb923c]' },
          { label: 'Lessons Done', value: completedLessons.length, color: 'text-blue-400' },
        ].map(stat => (
          <div key={stat.label} className="bg-[#162b1a] border border-[#2a4a30] rounded-xl p-4 text-center">
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-[#9db89f] text-sm mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Level progress */}
      <div className="bg-[#162b1a] border border-[#2a4a30] rounded-xl p-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-[#f0ebe0] font-bold text-lg">Level {level.level}: {level.name}</div>
            <div className="text-[#9db89f] text-sm">
              {nextLevel
                ? `${xpIntoLevel.toLocaleString()} / ${xpNeeded.toLocaleString()} XP to Level ${nextLevel.level}`
                : 'Maximum level reached!'}
            </div>
          </div>
          <div className="text-4xl">
            {level.level >= 7 ? '🏆' : level.level >= 5 ? '⭐' : level.level >= 3 ? '🎯' : '🃏'}
          </div>
        </div>

        <div className="h-4 bg-[#0d1f13] rounded-full overflow-hidden border border-[#2a4a30]">
          <div
            className="h-full bg-gradient-to-r from-[#c9a227] to-[#e8c347] rounded-full transition-all"
            style={{ width: `${levelProgress}%` }}
          />
        </div>

        {/* All levels */}
        <div className="flex justify-between mt-3">
          {LEVELS.map(l => (
            <div
              key={l.level}
              className={`text-xs text-center ${xp >= l.requiredXP ? 'text-[#c9a227]' : 'text-[#2a4a30]'}`}
            >
              <div>{l.level}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div>
        <h2 className="text-[#f0ebe0] text-xl font-bold mb-4">Badges ({unlockedBadges.length}/{BADGES.length})</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {BADGES.map(badge => {
            const unlocked = unlockedBadges.some(b => b.badgeId === badge.id);
            const unlockedData = unlockedBadges.find(b => b.badgeId === badge.id);
            return (
              <div
                key={badge.id}
                className={`bg-[#162b1a] border rounded-xl p-4 text-center transition-all ${
                  unlocked
                    ? 'border-[#c9a227]/50 shadow-[0_0_15px_rgba(201,162,39,0.15)]'
                    : 'border-[#2a4a30] opacity-50 grayscale'
                }`}
              >
                <div className={`text-3xl mb-2 ${!unlocked && 'filter'}`}>{unlocked ? badge.icon : '🔒'}</div>
                <div className="text-[#f0ebe0] text-sm font-bold mb-1">{badge.name}</div>
                <div className="text-[#9db89f] text-xs leading-snug">
                  {unlocked && unlockedData
                    ? `Unlocked ${new Date(unlockedData.unlockedAt).toLocaleDateString()}`
                    : badge.unlockCondition}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Module-by-module progress */}
      <div>
        <h2 className="text-[#f0ebe0] text-xl font-bold mb-4">Module Progress</h2>
        <div className="space-y-3">
          {MODULES.map(module => {
            const lessonIds = module.lessons.map(l => l.id);
            const completedCount = lessonIds.filter(id => completedLessons.includes(id)).length;
            const quizScore = getBestQuizScore(module.id);
            const passed = hasPassedQuiz(module.id);

            return (
              <div key={module.id} className="bg-[#162b1a] border border-[#2a4a30] rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl">{module.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[#f0ebe0] font-medium text-sm">{module.title}</span>
                      {passed && <span className="text-[#4ade80] text-xs">✓ Passed</span>}
                    </div>
                  </div>
                  <div className="text-right text-xs">
                    <div className="text-[#9db89f]">Quiz: <span className={`font-bold ${passed ? 'text-[#4ade80]' : 'text-[#9db89f]'}`}>{quizScore > 0 ? `${quizScore}%` : '—'}</span></div>
                  </div>
                </div>

                {/* Lesson dots */}
                <div className="flex gap-1 flex-wrap mb-2">
                  {lessonIds.map((id, i) => (
                    <div
                      key={id}
                      className={`w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold ${
                        completedLessons.includes(id) ? 'bg-[#c9a227] text-black' : 'bg-[#0d1f13] text-[#9db89f] border border-[#2a4a30]'
                      }`}
                      title={module.lessons[i].title}
                    >
                      {completedLessons.includes(id) ? '✓' : i + 1}
                    </div>
                  ))}
                </div>

                <div className="text-xs text-[#9db89f]">
                  {completedCount}/{lessonIds.length} lessons
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* XP History */}
      {xpHistory.length > 0 && (
        <div>
          <h2 className="text-[#f0ebe0] text-xl font-bold mb-4">Recent XP</h2>
          <div className="bg-[#162b1a] border border-[#2a4a30] rounded-xl divide-y divide-[#2a4a30]">
            {xpHistory.slice(0, 10).map((event, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-3">
                <span className="text-[#9db89f] text-sm">{event.reason}</span>
                <span className="text-[#c9a227] font-bold text-sm">+{event.amount} XP</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {completedLessons.length === 0 && (
        <div className="text-center py-10">
          <div className="text-4xl mb-4">🃏</div>
          <h3 className="text-[#f0ebe0] font-bold text-lg mb-2">Start your journey!</h3>
          <p className="text-[#9db89f] mb-6">Complete your first lesson to start earning XP.</p>
          <Link
            to="/learn/module1"
            className="px-6 py-3 bg-[#c9a227] hover:bg-[#e8c347] text-black font-bold rounded-xl transition-colors inline-block"
          >
            Start Module 1 →
          </Link>
        </div>
      )}
    </div>
  );
}
