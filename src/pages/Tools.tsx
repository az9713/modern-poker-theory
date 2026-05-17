import { useState } from 'react';
import { PotOddsCalc } from '../components/tools/PotOddsCalc';
import { EVCalculator } from '../components/tools/EVCalculator';
import { RangeGrid } from '../components/poker/RangeGrid';

type ActiveTool = 'potodds' | 'ev' | 'range';

export function Tools() {
  const [active, setActive] = useState<ActiveTool>('potodds');

  const tools = [
    { id: 'potodds' as ActiveTool, label: '📊 Pot Odds', desc: 'Required equity & MDF' },
    { id: 'ev' as ActiveTool, label: '⚖️ EV Calculator', desc: 'Expected value of decisions' },
    { id: 'range' as ActiveTool, label: '🎯 Range Grid', desc: '13×13 interactive range builder' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-[#f0ebe0] text-3xl font-bold mb-2">Interactive Tools</h1>
        <p className="text-[#9db89f]">Practice the math and visualize ranges interactively.</p>
      </div>

      {/* Tool tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {tools.map(tool => (
          <button
            key={tool.id}
            onClick={() => setActive(tool.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              active === tool.id
                ? 'bg-[#c9a227] text-black'
                : 'bg-[#162b1a] border border-[#2a4a30] text-[#9db89f] hover:text-[#f0ebe0] hover:border-[#c9a227]/50'
            }`}
          >
            {tool.label}
            <span className="ml-1.5 text-xs opacity-70">{tool.desc}</span>
          </button>
        ))}
      </div>

      {/* Tool content */}
      <div className="max-w-2xl">
        {active === 'potodds' && <PotOddsCalc />}
        {active === 'ev' && <EVCalculator />}
        {active === 'range' && (
          <div className="bg-[#162b1a] border border-[#2a4a30] rounded-xl p-6">
            <h3 className="text-[#c9a227] font-bold text-lg mb-2">Range Builder</h3>
            <p className="text-[#9db89f] text-sm mb-4">
              Click cells to select hands. Click and drag to paint multiple cells.
              Upper-right = suited, diagonal = pairs, lower-left = offsuit.
            </p>
            <RangeGrid mode="interactive" />
          </div>
        )}
      </div>

      {/* Quick reference */}
      <div className="mt-10">
        <h2 className="text-[#f0ebe0] text-xl font-bold mb-4">Quick Reference</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#162b1a] border border-[#2a4a30] rounded-xl p-5">
            <h3 className="text-[#c9a227] font-bold mb-3">Combo Counts</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#9db89f]">Pocket pair (e.g. AA)</span>
                <span className="text-[#f0ebe0] font-mono font-bold">6 combos</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9db89f]">Suited hand (e.g. AKs)</span>
                <span className="text-[#f0ebe0] font-mono font-bold">4 combos</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9db89f]">Offsuit hand (e.g. AKo)</span>
                <span className="text-[#f0ebe0] font-mono font-bold">12 combos</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9db89f]">AK total (s + o)</span>
                <span className="text-[#f0ebe0] font-mono font-bold">16 combos</span>
              </div>
            </div>
          </div>

          <div className="bg-[#162b1a] border border-[#2a4a30] rounded-xl p-5">
            <h3 className="text-[#c9a227] font-bold mb-3">Bet Size Reference</h3>
            <div className="space-y-2 text-sm">
              {[
                ['33% pot', '20%', '25%', '75%'],
                ['50% pot', '25%', '33.3%', '66.7%'],
                ['100% pot', '33.3%', '50%', '50%'],
                ['200% pot', '40%', '66.7%', '33.3%'],
              ].map(([bet, eq, fold, mdf]) => (
                <div key={bet} className="grid grid-cols-4 gap-1 text-xs">
                  <span className="text-[#9db89f]">{bet}</span>
                  <span className="text-blue-400 text-right">{eq}</span>
                  <span className="text-[#e03535] text-right">{fold}</span>
                  <span className="text-[#4ade80] text-right">{mdf}</span>
                </div>
              ))}
              <div className="grid grid-cols-4 gap-1 text-xs text-[#9db89f]/60 mt-1">
                <span>Bet</span>
                <span className="text-right">Req EQ</span>
                <span className="text-right">Need fold</span>
                <span className="text-right">MDF</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
