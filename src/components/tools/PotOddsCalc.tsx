import { useState } from 'react';

export function PotOddsCalc() {
  const [pot, setPot] = useState(100);
  const [bet, setBet] = useState(50);

  const callAmount = bet;
  const totalPot = pot + bet + callAmount;
  const requiredEquity = (callAmount / totalPot) * 100;
  const mdf = (pot / (pot + bet)) * 100;
  const bluffNeedsFolds = (bet / (pot + bet)) * 100;

  return (
    <div className="bg-[#162b1a] border border-[#2a4a30] rounded-xl p-6 space-y-5">
      <h3 className="text-[#c9a227] font-bold text-lg">Pot Odds Calculator</h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-[#9db89f] mb-1">Pot Size ($)</label>
          <input
            type="range" min={10} max={500} value={pot}
            onChange={e => setPot(Number(e.target.value))}
            className="w-full accent-[#c9a227]"
          />
          <div className="text-[#f0ebe0] font-mono text-center mt-1">${pot}</div>
        </div>
        <div>
          <label className="block text-sm text-[#9db89f] mb-1">Villain's Bet ($)</label>
          <input
            type="range" min={5} max={500} value={bet}
            onChange={e => setBet(Number(e.target.value))}
            className="w-full accent-[#c9a227]"
          />
          <div className="text-[#f0ebe0] font-mono text-center mt-1">${bet}</div>
        </div>
      </div>

      <div className="bg-[#0d1f13] rounded-lg p-4 space-y-3 border border-[#2a4a30]">
        <div className="flex justify-between items-center">
          <span className="text-[#9db89f] text-sm">You must call:</span>
          <span className="text-[#f0ebe0] font-bold font-mono">${callAmount}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#9db89f] text-sm">Total pot if you call:</span>
          <span className="text-[#f0ebe0] font-bold font-mono">${totalPot}</span>
        </div>
        <hr className="border-[#2a4a30]" />
        <div className="flex justify-between items-center">
          <span className="text-[#9db89f]">Required equity to call:</span>
          <span className="text-[#c9a227] font-bold text-xl font-mono">{requiredEquity.toFixed(1)}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#9db89f]">MDF (must continue):</span>
          <span className="text-blue-400 font-bold text-lg font-mono">{mdf.toFixed(1)}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#9db89f]">Villain's bluff needs folds:</span>
          <span className="text-[#e03535] font-bold font-mono">{bluffNeedsFolds.toFixed(1)}%</span>
        </div>
      </div>

      <div className="text-xs text-[#9db89f] space-y-1 bg-[#0d1f13] p-3 rounded-lg border border-[#2a4a30]">
        <div className="font-mono">Required equity = Call ÷ (Pot + Bet + Call)</div>
        <div className="font-mono">MDF = Pot ÷ (Pot + Bet)</div>
        <div className="text-[#9db89f]/70 mt-2">
          Note: Pot odds asks "can THIS HAND call?" MDF asks "how much of MY RANGE must continue?"
        </div>
      </div>
    </div>
  );
}
