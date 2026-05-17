import { useState } from 'react';

export function EVCalculator() {
  const [equity, setEquity] = useState(40);
  const [potSize, setPotSize] = useState(100);
  const [betSize, setBetSize] = useState(0);

  const equityFrac = equity / 100;
  const totalPot = potSize + betSize;
  const evCall = equityFrac * totalPot - (1 - equityFrac) * betSize;
  const evFold = 0;
  const evDiff = evCall - evFold;

  const bluffBreakEven = betSize > 0 ? (betSize / (potSize + betSize)) * 100 : 0;

  return (
    <div className="bg-[#162b1a] border border-[#2a4a30] rounded-xl p-6 space-y-5">
      <h3 className="text-[#c9a227] font-bold text-lg">EV Calculator</h3>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm text-[#9db89f] mb-1">Your Equity (%)</label>
          <input
            type="range" min={0} max={100} value={equity}
            onChange={e => setEquity(Number(e.target.value))}
            className="w-full accent-[#c9a227]"
          />
          <div className="text-[#f0ebe0] font-mono text-center mt-1">{equity}%</div>
        </div>
        <div>
          <label className="block text-sm text-[#9db89f] mb-1">Pot Size ($)</label>
          <input
            type="range" min={10} max={500} value={potSize}
            onChange={e => setPotSize(Number(e.target.value))}
            className="w-full accent-[#c9a227]"
          />
          <div className="text-[#f0ebe0] font-mono text-center mt-1">${potSize}</div>
        </div>
        <div>
          <label className="block text-sm text-[#9db89f] mb-1">Your Call/Bet Amount (0 = check/call on last street)</label>
          <input
            type="range" min={0} max={400} value={betSize}
            onChange={e => setBetSize(Number(e.target.value))}
            className="w-full accent-[#c9a227]"
          />
          <div className="text-[#f0ebe0] font-mono text-center mt-1">${betSize}</div>
        </div>
      </div>

      <div className="bg-[#0d1f13] rounded-lg p-4 space-y-3 border border-[#2a4a30]">
        <div className="text-xs text-[#9db89f] font-mono mb-2">
          EV = (equity × total pot) − ((1 − equity) × call amount)
          <br />
          EV = ({equity}% × ${totalPot}) − ({100-equity}% × ${betSize})
        </div>
        <hr className="border-[#2a4a30]" />
        <div className="flex justify-between items-center">
          <span className="text-[#9db89f]">EV of calling/continuing:</span>
          <span className={`font-bold text-xl font-mono ${evCall >= 0 ? 'text-[#4ade80]' : 'text-[#f87171]'}`}>
            {evCall >= 0 ? '+' : ''}${evCall.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#9db89f]">EV of folding:</span>
          <span className="text-[#9db89f] font-mono">$0.00</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#9db89f]">EV advantage of calling:</span>
          <span className={`font-bold font-mono ${evDiff >= 0 ? 'text-[#4ade80]' : 'text-[#f87171]'}`}>
            {evDiff >= 0 ? '+' : ''}${evDiff.toFixed(2)}
          </span>
        </div>
        {betSize > 0 && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-[#9db89f]">If bluffing, need villain to fold:</span>
            <span className="text-[#e03535] font-mono">{bluffBreakEven.toFixed(1)}%</span>
          </div>
        )}
      </div>

      <div className={`p-3 rounded-lg text-sm font-bold text-center border ${
        evCall > 0
          ? 'bg-green-900/30 border-green-600 text-green-400'
          : evCall < 0
          ? 'bg-red-900/30 border-red-600 text-red-400'
          : 'bg-slate-800 border-slate-600 text-slate-300'
      }`}>
        {evCall > 0 ? '✓ Calling is +EV' : evCall < 0 ? '✗ Calling is -EV (fold is better)' : '= Break even'}
      </div>
    </div>
  );
}
