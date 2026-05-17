import { Link } from 'react-router-dom';
import { MODULES } from '../data/modules';
import { useProgressStore } from '../store/progressStore';
import type { BeltRank } from '../types';

const BELT_COLORS: Record<BeltRank, string> = {
  white: 'border-gray-400 text-gray-300',
  blue: 'border-blue-400 text-blue-300',
  purple: 'border-purple-400 text-purple-300',
  brown: 'border-amber-600 text-amber-400',
  black: 'border-gray-200 text-gray-100',
};

export function Landing() {
  const { completedLessons, hasPassedQuiz } = useProgressStore();

  // Find the first incomplete module for "continue" CTA
  const nextModule = MODULES.find(m => !hasPassedQuiz(m.id));

  return (
    <div className="min-h-screen bg-[#0d1f13]">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-6 animate-bounce-slow">🃏</div>
        <h1 className="text-5xl md:text-6xl font-bold text-[#f0ebe0] leading-tight mb-4">
          Think in Ranges.
          <br />
          <span className="text-[#c9a227]">Play the Edges.</span>
        </h1>
        <p className="text-xl text-[#9db89f] max-w-2xl mx-auto mb-8 leading-relaxed">
          An interactive course based on <em>Modern Poker Theory</em> by Michael Acevedo.
          Start from absolute zero — learn GTO concepts, combinatorics, and exploitative play
          through 8 progressive modules.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to={nextModule ? `/learn/${nextModule.id}` : '/learn'}
            className="px-8 py-4 bg-[#c9a227] hover:bg-[#e8c347] text-black font-bold text-lg rounded-xl transition-colors"
          >
            {completedLessons.length > 0 ? 'Continue Learning →' : 'Start Learning Free →'}
          </Link>
          <Link
            to="/tools"
            className="px-8 py-4 bg-[#162b1a] hover:bg-[#2a4a30] border border-[#2a4a30] text-[#f0ebe0] font-bold text-lg rounded-xl transition-colors"
          >
            🔧 Open Tools
          </Link>
        </div>

        {completedLessons.length > 0 && (
          <div className="mt-6 text-sm text-[#9db89f]">
            ✓ {completedLessons.length} lesson{completedLessons.length !== 1 ? 's' : ''} completed
          </div>
        )}
      </section>

      {/* Three pillars */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#162b1a] border border-[#2a4a30] rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">🧠</div>
            <h3 className="text-[#f0ebe0] font-bold text-lg mb-2">Range Thinking</h3>
            <p className="text-[#9db89f] text-sm">Stop thinking about your hand. Start thinking about distributions, equity, and board interaction.</p>
          </div>
          <div className="bg-[#162b1a] border border-[#2a4a30] rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">📐</div>
            <h3 className="text-[#f0ebe0] font-bold text-lg mb-2">Math Foundations</h3>
            <p className="text-[#9db89f] text-sm">Combinatorics, EV, pot odds, and MDF — the formulas that every decision is built on.</p>
          </div>
          <div className="bg-[#162b1a] border border-[#2a4a30] rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">⚔️</div>
            <h3 className="text-[#f0ebe0] font-bold text-lg mb-2">Exploitative Play</h3>
            <p className="text-[#9db89f] text-sm">GTO is your defense. Exploitation is where the money lives. Learn when and how to deviate.</p>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="max-w-4xl mx-auto px-4 py-4">
        <div className="border-y border-[#2a4a30] py-4 flex flex-wrap justify-center gap-6 text-sm text-[#9db89f]">
          {[
            { value: '40+', label: 'lessons' },
            { value: '80+', label: 'quiz questions' },
            { value: '9', label: 'modules' },
            { value: '200+', label: 'key terms' },
          ].map(({ value, label }) => (
            <div key={label} className="flex items-baseline gap-1.5">
              <span className="text-[#c9a227] font-bold text-lg">{value}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Built on Acevedo's treatise */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-[#162b1a] border border-[#c9a227]/20 rounded-2xl p-8">
          <div className="text-xs text-[#9db89f] uppercase tracking-wider mb-3">The intellectual foundation</div>
          <blockquote className="text-[#f0ebe0] text-xl italic leading-relaxed mb-3">
            "The correct target: Become a solver-literate, range-based, exploit-capable poker decision maker."
          </blockquote>
          <p className="text-[#9db89f] text-sm mb-6">
            — distilled from Michael Acevedo's <em>Modern Poker Theory</em> (2019, D&amp;B Publishing)
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                title: 'Elements of Theory',
                desc: 'EV, equity, Nash equilibrium, GTO vs exploitative, MDF, combinatorics, modern software.',
              },
              {
                title: 'Preflop Theory & Practice',
                desc: 'Opening ranges, 3-bet pots, push/fold, stack depth, tournament ICM, bankroll and variance.',
              },
              {
                title: 'Postflop Theory & Practice',
                desc: 'Equity buckets, bet sizing, board textures, c-betting, turn barrels, and river abstract models.',
              },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-[#0d1f13] border border-[#2a4a30] rounded-lg p-4">
                <div className="text-[#c9a227] font-semibold text-sm mb-2">{title}</div>
                <p className="text-[#9db89f] text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What this course covers */}
      <section className="max-w-4xl mx-auto px-4 py-6">
        <h2 className="text-[#f0ebe0] text-2xl font-bold mb-4">What You'll Master</h2>
        <div className="overflow-x-auto rounded-xl border border-[#2a4a30]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#162b1a]">
                <th className="px-4 py-2.5 text-left text-[#9db89f] font-medium border-b border-[#2a4a30]">Topic</th>
                <th className="px-4 py-2.5 text-left text-[#9db89f] font-medium border-b border-[#2a4a30] hidden sm:table-cell">Where</th>
                <th className="px-4 py-2.5 text-left text-[#9db89f] font-medium border-b border-[#2a4a30]">Why it matters</th>
              </tr>
            </thead>
            <tbody>
              {[
                { topic: 'Range thinking', where: 'Module 2', why: 'The foundational mental upgrade — stop thinking in hands' },
                { topic: 'Combinatorics & EV', where: 'Module 3', why: 'Every decision is a math problem; learn to calculate it' },
                { topic: 'Position & stack depth', where: 'Module 4', why: 'Context that changes which hands to play and how' },
                { topic: 'Board textures', where: 'Modules 5–6', why: 'Reading the battlefield before you act' },
                { topic: 'Turn & river play', where: 'Module 7', why: 'Where pots are won and lost' },
                { topic: 'Exploitation', where: 'Module 8', why: 'Where the real money is — punishing opponent errors' },
                { topic: 'Solver literacy & study', where: 'Module 9', why: 'How to keep improving beyond this course' },
              ].map((row, ri) => (
                <tr key={row.topic} className={ri % 2 === 0 ? 'bg-[#0d1f13]' : 'bg-[#162b1a]/50'}>
                  <td className="px-4 py-2.5 text-[#f0ebe0] font-medium border-b border-[#2a4a30]/50">{row.topic}</td>
                  <td className="px-4 py-2.5 text-[#c9a227] text-xs border-b border-[#2a4a30]/50 hidden sm:table-cell">{row.where}</td>
                  <td className="px-4 py-2.5 text-[#9db89f] border-b border-[#2a4a30]/50">{row.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Module preview */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-[#f0ebe0] text-2xl font-bold mb-6">9 Modules, Zero to Dangerous</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {MODULES.map(module => {
            const lessonIds = module.lessons.map(l => l.id);
            const completedCount = lessonIds.filter(id => completedLessons.includes(id)).length;
            const passed = hasPassedQuiz(module.id);

            return (
              <Link
                key={module.id}
                to={`/learn/${module.id}`}
                className="bg-[#162b1a] border border-[#2a4a30] hover:border-[#c9a227]/50 rounded-xl p-4 flex items-center gap-4 transition-all"
              >
                <div className="text-3xl shrink-0">{module.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[#f0ebe0] font-semibold truncate">{module.title}</span>
                    {passed && <span className="text-[#4ade80] text-xs shrink-0">✓</span>}
                  </div>
                  <div className="text-[#9db89f] text-xs">{module.weekEquivalent}</div>
                  {completedCount > 0 && (
                    <div className="mt-2 h-1.5 bg-[#0d1f13] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#c9a227] rounded-full transition-all"
                        style={{ width: `${(completedCount / lessonIds.length) * 100}%` }}
                      />
                    </div>
                  )}
                </div>
                <span className={`text-xs border rounded px-1.5 py-0.5 shrink-0 ${BELT_COLORS[module.belt]}`}>
                  {module.belt}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-[#162b1a] border border-[#c9a227]/30 rounded-2xl p-10">
          <div className="text-3xl mb-4">🎯</div>
          <h2 className="text-[#f0ebe0] text-2xl font-bold mb-3">The Correct Target</h2>
          <blockquote className="text-[#9db89f] text-lg italic leading-relaxed max-w-xl mx-auto mb-6">
            "Become a solver-literate, range-based, exploit-capable poker decision maker."
          </blockquote>
          <p className="text-[#9db89f] text-sm mb-6">— inspired by Michael Acevedo's Modern Poker Theory</p>
          <Link
            to="/learn"
            className="px-8 py-4 bg-[#c9a227] hover:bg-[#e8c347] text-black font-bold text-lg rounded-xl transition-colors inline-block"
          >
            Start Module 1 →
          </Link>
        </div>
      </section>
    </div>
  );
}
