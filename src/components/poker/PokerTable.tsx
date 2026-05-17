interface SeatConfig {
  label: string;
  abbrev: string;
  angle: number;  // degrees around the oval
  strength: number; // 1-5 stars
}

const SEATS: SeatConfig[] = [
  { label: 'Button', abbrev: 'BTN', angle: 90, strength: 5 },
  { label: 'Cutoff', abbrev: 'CO', angle: 45, strength: 4 },
  { label: 'Hijack', abbrev: 'HJ', angle: 0, strength: 3 },
  { label: 'Lojack', abbrev: 'LJ', angle: -45, strength: 2 },
  { label: 'UTG+1', abbrev: 'UTG+1', angle: -90, strength: 2 },
  { label: 'UTG', abbrev: 'UTG', angle: -135, strength: 1 },
  { label: 'Small Blind', abbrev: 'SB', angle: 180, strength: 1 },
  { label: 'Big Blind', abbrev: 'BB', angle: 135, strength: 2 },
];

interface PokerTableProps {
  highlightPosition?: string;
  showStrength?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

function polarToXY(angleDeg: number, rx: number, ry: number, cx: number, cy: number) {
  const rad = (angleDeg - 90) * (Math.PI / 180);
  return {
    x: cx + rx * Math.cos(rad),
    y: cy + ry * Math.sin(rad),
  };
}

export function PokerTable({ highlightPosition, showStrength = false }: PokerTableProps) {
  const cx = 200, cy = 150;
  const rx = 150, ry = 100;
  const seatRx = 175, seatRy = 125;

  return (
    <div className="w-full flex justify-center my-4">
      <svg viewBox="0 0 400 300" className="w-full max-w-md" role="img" aria-label="Poker table with positions">
        {/* Table felt */}
        <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#1a5c32" stroke="#2d8a50" strokeWidth="8" />
        {/* Table edge */}
        <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke="#8B4513" strokeWidth="12" />

        {/* Dealer chip marker */}
        <circle cx={cx + 20} cy={cy + 30} r="10" fill="#e8c347" stroke="#c9a227" strokeWidth="2" />
        <text x={cx + 20} y={cy + 34} textAnchor="middle" fontSize="8" fontWeight="bold" fill="#000">D</text>

        {/* Center text */}
        <text x={cx} y={cy - 5} textAnchor="middle" fontSize="12" fill="#4ade80" fontWeight="bold">
          Texas Hold'em
        </text>
        <text x={cx} y={cy + 12} textAnchor="middle" fontSize="10" fill="#9db89f">
          9-max table
        </text>

        {/* Seats */}
        {SEATS.map((seat) => {
          const { x, y } = polarToXY(seat.angle, seatRx, seatRy, cx, cy);
          const isHighlighted = highlightPosition === seat.abbrev;

          return (
            <g key={seat.abbrev}>
              {/* Seat circle */}
              <circle
                cx={x} cy={y} r={22}
                fill={isHighlighted ? '#c9a227' : '#162b1a'}
                stroke={isHighlighted ? '#e8c347' : '#2a4a30'}
                strokeWidth={isHighlighted ? 3 : 1.5}
              />
              {/* Position abbreviation */}
              <text
                x={x} y={y - 3}
                textAnchor="middle"
                fontSize={seat.abbrev.length > 3 ? '7' : '9'}
                fontWeight="bold"
                fill={isHighlighted ? '#000' : '#f0ebe0'}
              >
                {seat.abbrev}
              </text>
              {/* Strength stars */}
              {showStrength && (
                <text x={x} y={y + 9} textAnchor="middle" fontSize="6" fill={isHighlighted ? '#000' : '#c9a227'}>
                  {'★'.repeat(seat.strength)}{'☆'.repeat(5 - seat.strength)}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      {showStrength && (
        <div className="ml-4 flex flex-col justify-center gap-1">
          {SEATS.map(s => (
            <div key={s.abbrev} className="flex items-center gap-2 text-xs">
              <span
                className="font-mono font-bold w-14"
                style={{ color: highlightPosition === s.abbrev ? '#c9a227' : '#9db89f' }}
              >
                {s.abbrev}
              </span>
              <span className="text-yellow-400">{'★'.repeat(s.strength)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
