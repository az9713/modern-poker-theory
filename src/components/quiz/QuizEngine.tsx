import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { QuizQuestion, QuizAttempt, QuizAnswer } from '../../types';
import { useProgressStore } from '../../store/progressStore';
import { MODULE_BADGES } from '../../data/badges';
import { HandDisplay } from '../cards/PlayingCard';

type QuizState = 'in-progress' | 'showing-feedback' | 'summary';

interface QuizEngineProps {
  moduleId: string;
  questions: QuizQuestion[];
}

const PASSING_SCORE = 70;
const QUIZ_COMPLETION_BONUS = 50;
const PERFECT_SCORE_BONUS = 100;
const STREAK_MULTIPLIER_THRESHOLD = 3;

export function QuizEngine({ moduleId, questions }: QuizEngineProps) {
  const navigate = useNavigate();
  const { recordQuizAttempt, unlockBadge, currentStreak, bumpSessionStreak, resetSessionStreak } = useProgressStore();

  const [state, setState] = useState<QuizState>('in-progress');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | number | null>(null);
  const [numericInput, setNumericInput] = useState('');
  const [lastWasCorrect, setLastWasCorrect] = useState<boolean | null>(null);
  const [startTime] = useState(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [attempt, setAttempt] = useState<QuizAttempt | null>(null);

  const question = questions[currentIndex];

  const submitAnswer = useCallback(() => {
    if (!question) return;

    let answer: string | number;
    let correct = false;
    const timeMs = Date.now() - questionStartTime;

    if (question.type === 'multi-choice') {
      answer = selectedOption as string;
      correct = answer === question.correctOptionId;
    } else if (question.type === 'board-classify') {
      answer = selectedOption as string;
      correct = answer === question.correctAnswer;
    } else if (question.type === 'numeric-input') {
      answer = parseFloat(numericInput) || 0;
      correct = Math.abs((answer as number) - question.correctAnswer) <= question.tolerance;
    } else {
      return;
    }

    if (correct) bumpSessionStreak();
    else resetSessionStreak();

    const newAnswer: QuizAnswer = {
      questionId: question.id,
      answer,
      correct,
      timeMs,
    };

    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);
    setLastWasCorrect(correct);
    setState('showing-feedback');

    // If last question, compute result
    if (currentIndex === questions.length - 1) {
      const correctCount = newAnswers.filter(a => a.correct).length;
      const earnedXP = newAnswers.reduce((sum, a, i) => {
        return sum + (a.correct ? questions[i].xpReward : 0);
      }, 0);
      const totalTimeMs = Date.now() - startTime;
      const score = Math.round((correctCount / questions.length) * 100);
      const passed = score >= PASSING_SCORE;

      let totalXP = earnedXP + QUIZ_COMPLETION_BONUS;
      if (score === 100) totalXP += PERFECT_SCORE_BONUS;

      const completedAttempt: QuizAttempt = {
        id: crypto.randomUUID(),
        moduleId,
        startedAt: new Date(startTime).toISOString(),
        completedAt: new Date().toISOString(),
        answers: newAnswers,
        score,
        xpEarned: totalXP,
        passed,
      };
      setAttempt(completedAttempt);

      // Unlock badge if passed
      if (passed) {
        const badgeId = MODULE_BADGES[moduleId];
        if (badgeId) unlockBadge(badgeId);
        if (score === 100) unlockBadge('perfect-score');
        if (totalTimeMs < 90000) unlockBadge('speed-demon');
      }

      recordQuizAttempt(completedAttempt);
    }
  }, [question, selectedOption, numericInput, answers, currentIndex, questionStartTime, startTime, moduleId, questions, bumpSessionStreak, resetSessionStreak, recordQuizAttempt, unlockBadge]);

  function nextQuestion() {
    if (currentIndex === questions.length - 1) {
      setState('summary');
    } else {
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
      setNumericInput('');
      setLastWasCorrect(null);
      setQuestionStartTime(Date.now());
      setState('in-progress');
    }
  }

  if (state === 'summary' && attempt) {
    return <QuizSummary attempt={attempt} questions={questions} onRetry={() => navigate(0)} onContinue={() => navigate('/learn')} />;
  }

  const streakBonus = currentStreak >= STREAK_MULTIPLIER_THRESHOLD;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-[#162b1a] rounded-full h-2">
          <div
            className="bg-[#c9a227] h-2 rounded-full transition-all"
            style={{ width: `${((currentIndex + (state === 'showing-feedback' ? 1 : 0)) / questions.length) * 100}%` }}
          />
        </div>
        <span className="text-[#9db89f] text-sm whitespace-nowrap">
          {currentIndex + 1} / {questions.length}
        </span>
        {streakBonus && (
          <span className="text-[#fb923c] text-sm font-bold">🔥 ×1.5</span>
        )}
      </div>

      {/* Question card */}
      <div className="bg-[#162b1a] border border-[#2a4a30] rounded-xl p-6 space-y-5">
        {/* Context cards */}
        {question.type === 'multi-choice' && question.context?.cards && (
          <div className="flex gap-2 items-center">
            <span className="text-[#9db89f] text-sm">Hand:</span>
            <HandDisplay cards={question.context.cards} size="md" />
          </div>
        )}
        {question.type === 'board-classify' && question.board && (
          <div className="flex gap-2 items-center">
            <span className="text-[#9db89f] text-sm">Board:</span>
            <HandDisplay cards={question.board} size="lg" />
          </div>
        )}

        {/* Prompt */}
        <div className="text-[#f0ebe0] text-lg font-medium leading-snug">
          {question.prompt}
        </div>

        {/* Hint for numeric */}
        {question.type === 'numeric-input' && state === 'in-progress' && (
          <div className="text-[#9db89f] text-xs font-mono bg-[#0d1f13] p-2 rounded">
            Hint: {question.hint}
          </div>
        )}

        {/* Answer inputs */}
        {state === 'in-progress' && (
          <>
            {question.type === 'multi-choice' && (
              <div className="grid grid-cols-1 gap-2">
                {question.options.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedOption(opt.id)}
                    className={`
                      text-left px-4 py-3 rounded-lg border text-sm transition-all
                      ${selectedOption === opt.id
                        ? 'border-[#c9a227] bg-[#c9a227]/15 text-[#f0ebe0]'
                        : 'border-[#2a4a30] bg-[#0d1f13] text-[#9db89f] hover:border-[#c9a227]/50 hover:text-[#f0ebe0]'
                      }
                    `}
                  >
                    <span className="font-bold mr-2 text-[#c9a227]">{opt.id.toUpperCase()}.</span>
                    {opt.text}
                  </button>
                ))}
              </div>
            )}

            {question.type === 'board-classify' && (
              <div className="flex gap-3">
                {(['static', 'dynamic'] as const).map(opt => (
                  <button
                    key={opt}
                    onClick={() => setSelectedOption(opt)}
                    className={`
                      flex-1 py-3 rounded-lg border font-bold capitalize text-sm transition-all
                      ${selectedOption === opt
                        ? 'border-[#c9a227] bg-[#c9a227]/15 text-[#c9a227]'
                        : 'border-[#2a4a30] bg-[#0d1f13] text-[#9db89f] hover:border-[#c9a227]/50'
                      }
                    `}
                  >
                    {opt === 'static' ? '🪨 Static' : '🌊 Dynamic'}
                  </button>
                ))}
              </div>
            )}

            {question.type === 'numeric-input' && (
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  value={numericInput}
                  onChange={e => setNumericInput(e.target.value)}
                  placeholder="Enter your answer"
                  className="flex-1 bg-[#0d1f13] border border-[#2a4a30] rounded-lg px-4 py-3 text-[#f0ebe0] text-lg font-mono focus:outline-none focus:border-[#c9a227]"
                  onKeyDown={e => e.key === 'Enter' && (selectedOption !== null || numericInput) && submitAnswer()}
                />
                <span className="text-[#9db89f] font-mono">{question.unit}</span>
              </div>
            )}

            <button
              onClick={submitAnswer}
              disabled={
                (question.type === 'multi-choice' && !selectedOption) ||
                (question.type === 'board-classify' && !selectedOption) ||
                (question.type === 'numeric-input' && !numericInput)
              }
              className="w-full py-3 bg-[#c9a227] hover:bg-[#e8c347] disabled:bg-[#2a4a30] disabled:text-[#9db89f] text-black font-bold rounded-lg transition-colors"
            >
              Submit Answer
            </button>
          </>
        )}

        {/* Feedback */}
        {state === 'showing-feedback' && (
          <div className="space-y-4">
            <div className={`p-4 rounded-lg border font-bold text-lg ${
              lastWasCorrect
                ? 'bg-green-900/30 border-green-600 text-green-400'
                : 'bg-red-900/30 border-red-600 text-red-400'
            }`}>
              {lastWasCorrect ? '✓ Correct!' : '✗ Incorrect'}
              {lastWasCorrect && streakBonus && <span className="ml-2 text-[#fb923c]">🔥 Streak bonus!</span>}
            </div>

            {/* Show correct answer for wrong answers */}
            {!lastWasCorrect && question.type === 'multi-choice' && (
              <div className="text-sm text-[#9db89f]">
                Correct answer: <span className="text-[#4ade80] font-bold">
                  {question.options.find(o => o.id === question.correctOptionId)?.text}
                </span>
              </div>
            )}
            {!lastWasCorrect && question.type === 'board-classify' && (
              <div className="text-sm text-[#9db89f]">
                This board is: <span className="text-[#4ade80] font-bold capitalize">{question.correctAnswer}</span>
                <br /><span className="text-[#9db89f]/70">{question.whyHint}</span>
              </div>
            )}
            {!lastWasCorrect && question.type === 'numeric-input' && (
              <div className="text-sm text-[#9db89f]">
                Correct answer: <span className="text-[#4ade80] font-bold">{question.correctAnswer}{question.unit}</span>
              </div>
            )}

            <div className="bg-[#0d1f13] rounded-lg p-4 border border-[#2a4a30] text-sm text-[#f0ebe0] leading-relaxed">
              <div className="text-[#9db89f] text-xs uppercase tracking-wider mb-2">Explanation</div>
              {question.explanation}
            </div>

            <button
              onClick={nextQuestion}
              className="w-full py-3 bg-[#162b1a] hover:bg-[#2a4a30] border border-[#2a4a30] text-[#f0ebe0] font-bold rounded-lg transition-colors"
            >
              {currentIndex === questions.length - 1 ? 'See Results →' : 'Next Question →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

interface SummaryProps {
  attempt: QuizAttempt;
  questions: QuizQuestion[];
  onRetry: () => void;
  onContinue: () => void;
}

function QuizSummary({ attempt, onRetry, onContinue }: SummaryProps) {
  const correctCount = attempt.answers.filter(a => a.correct).length;
  const total = attempt.answers.length;
  const passed = attempt.passed;

  return (
    <div className="max-w-md mx-auto space-y-6 text-center">
      <div className={`text-6xl mb-4 ${passed ? '' : 'grayscale'}`}>
        {attempt.score === 100 ? '🏆' : passed ? '🎉' : '📚'}
      </div>

      <div>
        <div className="text-4xl font-bold text-[#f0ebe0]">{attempt.score}%</div>
        <div className="text-[#9db89f]">{correctCount} / {total} correct</div>
      </div>

      {/* Score ring visualization */}
      <div className="relative w-32 h-32 mx-auto">
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
          <circle cx="60" cy="60" r="50" fill="none" stroke="#162b1a" strokeWidth="12" />
          <circle
            cx="60" cy="60" r="50" fill="none"
            stroke={attempt.score >= 70 ? '#4ade80' : '#f87171'}
            strokeWidth="12"
            strokeDasharray={`${(attempt.score / 100) * 314} 314`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-2xl font-bold ${attempt.score >= 70 ? 'text-[#4ade80]' : 'text-[#f87171]'}`}>
            {attempt.score}%
          </span>
        </div>
      </div>

      <div className={`p-4 rounded-xl border text-lg font-bold ${
        passed ? 'border-green-600 bg-green-900/20 text-green-400' : 'border-red-600 bg-red-900/20 text-red-400'
      }`}>
        {passed ? '✓ Quiz Passed!' : '✗ Not quite — keep studying!'}
        {passed && attempt.score === 100 && <div className="text-sm mt-1 text-[#c9a227]">🏆 Perfect Score!</div>}
      </div>

      <div className="bg-[#162b1a] border border-[#2a4a30] rounded-xl p-4">
        <div className="text-[#c9a227] text-2xl font-bold">+{attempt.xpEarned} XP</div>
        <div className="text-[#9db89f] text-sm">
          {passed ? `Includes +50 completion bonus${attempt.score === 100 ? ' + 100 perfect score bonus' : ''}` : 'Partial XP earned'}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onRetry}
          className="flex-1 py-3 bg-[#162b1a] border border-[#2a4a30] hover:border-[#c9a227] text-[#f0ebe0] font-bold rounded-lg transition-colors"
        >
          Retry Quiz
        </button>
        <button
          onClick={onContinue}
          className="flex-1 py-3 bg-[#c9a227] hover:bg-[#e8c347] text-black font-bold rounded-lg transition-colors"
        >
          Continue Learning
        </button>
      </div>
    </div>
  );
}
