// ─── Poker Core Types ────────────────────────────────────────────────────────

export type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'T' | 'J' | 'Q' | 'K' | 'A';
export type Suit = 'spades' | 'hearts' | 'diamonds' | 'clubs';
export type HandClass = 'pair' | 'suited' | 'offsuit';

export interface Card {
  rank: Rank;
  suit: Suit;
}

export interface HandNotation {
  label: string;    // "AKs", "QQ", "T9o"
  class: HandClass;
  combos: number;
}

export type BoardTexture = 'static' | 'dynamic';
export type WetnessTexture = 'dry' | 'wet';

// ─── Module & Lesson Types ────────────────────────────────────────────────────

export type LessonSectionType =
  | 'text'
  | 'callout'
  | 'card-demo'
  | 'range-grid'
  | 'table'
  | 'formula'
  | 'board-demo'
  | 'position-table'
  | 'key-point'
  | 'step-list'
  | 'scenario';

export interface TableData {
  headers: string[];
  rows: string[][];
}

export interface ScenarioData {
  pot: string;
  stacks: string;
  position: string;
  action?: string;
  board?: Card[];
}

export interface LessonSection {
  type: LessonSectionType;
  content?: string;
  cards?: Card[];
  rangeHighlight?: string[];
  tableData?: TableData;
  formula?: string;
  formulaLabel?: string;
  calloutType?: 'concept' | 'example' | 'warning' | 'tip' | 'definition' | 'theorem' | 'proof' | 'lemma';
  steps?: string[];
  scenarioData?: ScenarioData;
}

export interface KeyTerm {
  term: string;
  definition: string;
}

export interface Lesson {
  id: string;               // "module1-lesson1"
  title: string;
  estimatedMinutes: number;
  xpReward: number;
  sections: LessonSection[];
  keyTerms: KeyTerm[];
}

export type BeltRank = 'white' | 'blue' | 'purple' | 'brown' | 'black';

export interface Module {
  id: string;               // "module1"
  title: string;
  tagline: string;
  icon: string;
  weekEquivalent: string;
  badgeId: string;
  belt: BeltRank;
  color: string;            // CSS color for module card accent
  lessons: Lesson[];
  treatiseSections: number[];
}

// ─── Quiz Types ───────────────────────────────────────────────────────────────

export interface BaseQuestion {
  id: string;
  moduleId: string;
  difficulty: 1 | 2 | 3;
  xpReward: number;
  explanation: string;
}

export interface MultiChoiceOption {
  id: string;
  text: string;
}

export interface MultiChoiceQuestion extends BaseQuestion {
  type: 'multi-choice';
  prompt: string;
  context?: {
    cards?: Card[];
    tablePosition?: string;
    boardCards?: Card[];
  };
  options: MultiChoiceOption[];
  correctOptionId: string;
}

export interface BoardClassifyQuestion extends BaseQuestion {
  type: 'board-classify';
  prompt: string;
  board: Card[];
  correctAnswer: 'static' | 'dynamic';
  whyHint: string;
}

export interface NumericInputQuestion extends BaseQuestion {
  type: 'numeric-input';
  prompt: string;
  unit: string;
  correctAnswer: number;
  tolerance: number;
  hint: string;
}

export type QuizQuestion =
  | MultiChoiceQuestion
  | BoardClassifyQuestion
  | NumericInputQuestion;

export interface QuizAnswer {
  questionId: string;
  answer: string | number;
  correct: boolean;
  timeMs: number;
}

export interface QuizAttempt {
  id: string;
  moduleId: string;
  startedAt: string;
  completedAt: string | null;
  answers: QuizAnswer[];
  score: number;
  xpEarned: number;
  passed: boolean;
}

// ─── Progress Types ───────────────────────────────────────────────────────────

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockCondition: string;
}

export interface UnlockedBadge {
  badgeId: string;
  unlockedAt: string;
}

export interface XPEvent {
  amount: number;
  reason: string;
  timestamp: string;
}

export type LevelName = 'Fish' | 'Calling Station' | 'TAG Beginner' | 'Range Reader' | 'GTO Scholar' | 'Exploit Expert' | 'Poker Theorist';

export interface Level {
  level: number;
  name: LevelName;
  requiredXP: number;
}

export const LEVELS: Level[] = [
  { level: 1, name: 'Fish', requiredXP: 0 },
  { level: 2, name: 'Calling Station', requiredXP: 200 },
  { level: 3, name: 'TAG Beginner', requiredXP: 500 },
  { level: 4, name: 'Range Reader', requiredXP: 1000 },
  { level: 5, name: 'GTO Scholar', requiredXP: 1800 },
  { level: 6, name: 'Exploit Expert', requiredXP: 2800 },
  { level: 7, name: 'Poker Theorist', requiredXP: 4000 },
];

export function getLevelForXP(xp: number): Level {
  let current = LEVELS[0];
  for (const level of LEVELS) {
    if (xp >= level.requiredXP) current = level;
    else break;
  }
  return current;
}

export function getNextLevel(xp: number): Level | null {
  const current = getLevelForXP(xp);
  return LEVELS.find(l => l.level === current.level + 1) ?? null;
}
