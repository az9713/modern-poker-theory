import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UnlockedBadge, XPEvent, QuizAttempt } from '../types';

const SCHEMA_VERSION = 1;

interface ProgressState {
  schemaVersion: number;
  completedLessons: string[];      // ["module1-lesson1", ...]
  quizAttempts: QuizAttempt[];
  xp: number;
  xpHistory: XPEvent[];
  unlockedBadges: UnlockedBadge[];
  lastActiveDate: string;
  streakDays: number;
  correctAnswerCount: number;      // total correct across all quizzes (for Combo Crusher badge)
  currentStreak: number;           // current consecutive correct answers in a session

  // Actions
  completeLesson: (lessonId: string, xp: number) => void;
  recordQuizAttempt: (attempt: QuizAttempt) => void;
  unlockBadge: (badgeId: string) => void;
  addXP: (amount: number, reason: string) => void;
  updateStreak: () => void;
  incrementCorrectAnswers: (count: number) => void;
  resetSessionStreak: () => void;
  bumpSessionStreak: () => void;
  isLessonComplete: (lessonId: string) => boolean;
  isModuleComplete: (moduleId: string) => boolean;
  getBestQuizScore: (moduleId: string) => number;
  hasPassedQuiz: (moduleId: string) => boolean;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      schemaVersion: SCHEMA_VERSION,
      completedLessons: [],
      quizAttempts: [],
      xp: 0,
      xpHistory: [],
      unlockedBadges: [],
      lastActiveDate: '',
      streakDays: 0,
      correctAnswerCount: 0,
      currentStreak: 0,

      completeLesson: (lessonId, xp) => {
        const state = get();
        if (state.completedLessons.includes(lessonId)) return;
        const event: XPEvent = {
          amount: xp,
          reason: `Completed lesson`,
          timestamp: new Date().toISOString(),
        };
        set(s => ({
          completedLessons: [...s.completedLessons, lessonId],
          xp: s.xp + xp,
          xpHistory: [event, ...s.xpHistory].slice(0, 50),
        }));
        get().updateStreak();
      },

      recordQuizAttempt: (attempt) => {
        set(s => ({
          quizAttempts: [attempt, ...s.quizAttempts].slice(0, 100),
          xp: s.xp + attempt.xpEarned,
          xpHistory: [{
            amount: attempt.xpEarned,
            reason: `Quiz: ${attempt.moduleId}`,
            timestamp: new Date().toISOString(),
          }, ...s.xpHistory].slice(0, 50),
          correctAnswerCount: s.correctAnswerCount + attempt.answers.filter(a => a.correct).length,
        }));
        get().updateStreak();
      },

      unlockBadge: (badgeId) => {
        const state = get();
        if (state.unlockedBadges.some(b => b.badgeId === badgeId)) return;
        set(s => ({
          unlockedBadges: [...s.unlockedBadges, {
            badgeId,
            unlockedAt: new Date().toISOString(),
          }],
        }));
      },

      addXP: (amount, reason) => {
        const event: XPEvent = { amount, reason, timestamp: new Date().toISOString() };
        set(s => ({
          xp: s.xp + amount,
          xpHistory: [event, ...s.xpHistory].slice(0, 50),
        }));
      },

      updateStreak: () => {
        const today = new Date().toISOString().split('T')[0];
        const state = get();
        if (state.lastActiveDate === today) return;
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        const newStreak = state.lastActiveDate === yesterday ? state.streakDays + 1 : 1;
        set({ lastActiveDate: today, streakDays: newStreak });
      },

      incrementCorrectAnswers: (count) => {
        set(s => ({ correctAnswerCount: s.correctAnswerCount + count }));
      },

      resetSessionStreak: () => set({ currentStreak: 0 }),

      bumpSessionStreak: () => set(s => ({ currentStreak: s.currentStreak + 1 })),

      isLessonComplete: (lessonId) => {
        return get().completedLessons.includes(lessonId);
      },

      isModuleComplete: (moduleId) => {
        return get().hasPassedQuiz(moduleId);
      },

      getBestQuizScore: (moduleId) => {
        const attempts = get().quizAttempts.filter(a => a.moduleId === moduleId);
        if (attempts.length === 0) return 0;
        return Math.max(...attempts.map(a => a.score));
      },

      hasPassedQuiz: (moduleId) => {
        return get().quizAttempts.some(a => a.moduleId === moduleId && a.passed);
      },
    }),
    {
      name: 'mpt-poker-progress',
      version: SCHEMA_VERSION,
      migrate: (state: unknown, fromVersion: number) => {
        // Future: handle schema migrations here
        void fromVersion;
        return state as ProgressState;
      },
    }
  )
);
