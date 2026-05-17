import type { Card, Suit } from '../../types';

const SUIT_SYMBOLS: Record<Suit, string> = {
  spades: '♠',
  hearts: '♥',
  diamonds: '♦',
  clubs: '♣',
};

const SUIT_LABELS: Record<Suit, string> = {
  spades: 'S', hearts: 'H', diamonds: 'D', clubs: 'C',
};

function isRedSuit(suit: Suit) {
  return suit === 'hearts' || suit === 'diamonds';
}

interface PlayingCardProps {
  card: Card;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  faceDown?: boolean;
  className?: string;
  animate?: boolean;
}

const sizeClasses = {
  xs: 'w-7 h-10 text-xs',
  sm: 'w-10 h-14 text-sm',
  md: 'w-14 h-20 text-base',
  lg: 'w-20 h-28 text-xl',
};

export function PlayingCard({ card, size = 'md', faceDown = false, className = '', animate }: PlayingCardProps) {
  const red = isRedSuit(card.suit);
  const suitColor = red ? 'text-red-500' : 'text-gray-900';
  const sizeClass = sizeClasses[size];

  if (faceDown) {
    return (
      <div
        className={`${sizeClass} bg-blue-800 border-2 border-blue-600 rounded-lg flex items-center justify-center ${className}`}
        role="img"
        aria-label="Card face down"
      >
        <span className="text-blue-400 text-lg">?</span>
      </div>
    );
  }

  return (
    <div
      className={`
        ${sizeClass} bg-white border border-gray-300 rounded-lg shadow-sm
        flex flex-col justify-between p-0.5 select-none
        ${animate ? 'card-flip' : ''}
        ${className}
      `}
      role="img"
      aria-label={`${card.rank} of ${card.suit}`}
    >
      <div className={`${suitColor} font-bold leading-none`}>
        <div>{card.rank}</div>
        <div>{SUIT_SYMBOLS[card.suit]}</div>
      </div>
      <div className={`${suitColor} font-bold leading-none self-end rotate-180`}>
        <div>{card.rank}</div>
        <div>{SUIT_SYMBOLS[card.suit]}</div>
      </div>
      <span className="sr-only">{SUIT_LABELS[card.suit]}</span>
    </div>
  );
}

interface HandDisplayProps {
  cards: Card[];
  size?: 'xs' | 'sm' | 'md' | 'lg';
  gap?: number;
  animate?: boolean;
}

export function HandDisplay({ cards, size = 'md', animate }: HandDisplayProps) {
  return (
    <div className="flex gap-1 items-center flex-wrap">
      {cards.map((card, i) => (
        <PlayingCard
          key={`${card.rank}-${card.suit}-${i}`}
          card={card}
          size={size}
          animate={animate}
        />
      ))}
    </div>
  );
}
