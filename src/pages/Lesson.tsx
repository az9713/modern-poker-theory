import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MODULES, getModule } from '../data/modules';
import { useProgressStore } from '../store/progressStore';
import { LessonContent } from '../components/lessons/LessonContent';

export function Lesson() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const { completedLessons, completeLesson, isModuleComplete } = useProgressStore();

  const module = getModule(moduleId ?? '');
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);

  if (!module) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">😕</div>
        <h1 className="text-[#f0ebe0] text-2xl font-bold mb-4">Module not found</h1>
        <Link to="/learn" className="text-[#c9a227] hover:underline">← Back to modules</Link>
      </div>
    );
  }

  const lesson = module.lessons[activeLessonIndex];
  const isComplete = completedLessons.includes(lesson.id);
  const allLessonsComplete = module.lessons.every(l => completedLessons.includes(l.id));
  const moduleComplete = isModuleComplete(moduleId ?? '');

  function markComplete() {
    if (!isComplete) {
      completeLesson(lesson.id, lesson.xpReward);
    }
  }

  function goToLesson(index: number) {
    setActiveLessonIndex(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[#9db89f] mb-6">
        <Link to="/learn" className="hover:text-[#c9a227]">Modules</Link>
        <span>›</span>
        <span>{module.icon} {module.title}</span>
        <span>›</span>
        <span className="text-[#f0ebe0]">{lesson.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar: lesson list */}
        <aside className="lg:col-span-1">
          <div className="bg-[#162b1a] border border-[#2a4a30] rounded-xl p-4 sticky top-20">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">{module.icon}</span>
              <h3 className="text-[#f0ebe0] font-bold text-sm">{module.title}</h3>
            </div>

            <div className="space-y-1">
              {module.lessons.map((l, i) => {
                const done = completedLessons.includes(l.id);
                const active = i === activeLessonIndex;
                return (
                  <button
                    key={l.id}
                    onClick={() => goToLesson(i)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                      active
                        ? 'bg-[#c9a227] text-black font-semibold'
                        : 'text-[#9db89f] hover:text-[#f0ebe0] hover:bg-[#0d1f13]'
                    }`}
                  >
                    <span className="shrink-0">
                      {done ? '✓' : active ? '►' : `${i + 1}.`}
                    </span>
                    <span className="truncate">{l.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Quiz link */}
            <div className="mt-4 pt-4 border-t border-[#2a4a30]">
              {allLessonsComplete ? (
                <Link
                  to={`/quiz/${module.id}`}
                  className={`block w-full py-2 text-center text-sm font-bold rounded-lg transition-colors ${
                    moduleComplete
                      ? 'bg-[#4ade80]/10 text-[#4ade80] border border-[#4ade80]/30 hover:bg-[#4ade80]/20'
                      : 'bg-[#c9a227] hover:bg-[#e8c347] text-black'
                  }`}
                >
                  {moduleComplete ? '✓ Quiz Passed' : 'Take Module Quiz →'}
                </Link>
              ) : (
                <div className="text-xs text-[#9db89f] text-center bg-[#0d1f13] rounded-lg px-2 py-2 border border-[#2a4a30]">
                  Complete all {module.lessons.length} lessons to unlock quiz
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main lesson content */}
        <main className="lg:col-span-3 space-y-6">
          {/* Lesson header */}
          <div className="bg-[#162b1a] border border-[#2a4a30] rounded-xl p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h1 className="text-[#f0ebe0] text-2xl font-bold mb-1">{lesson.title}</h1>
                <div className="flex items-center gap-3 text-sm text-[#9db89f]">
                  <span>~{lesson.estimatedMinutes} min</span>
                  <span>·</span>
                  <span>{lesson.xpReward} XP</span>
                  {isComplete && <span className="text-[#4ade80]">✓ Completed</span>}
                </div>
              </div>
              <div className="text-3xl shrink-0">{module.icon}</div>
            </div>
          </div>

          {/* Lesson body */}
          <div className="bg-[#162b1a] border border-[#2a4a30] rounded-xl p-6">
            <LessonContent sections={lesson.sections} />
          </div>

          {/* Key terms */}
          {lesson.keyTerms.length > 0 && (
            <div className="bg-[#162b1a] border border-[#2a4a30] rounded-xl p-6">
              <h3 className="text-[#c9a227] font-bold mb-4">📖 Key Terms</h3>
              <div className="space-y-3">
                {lesson.keyTerms.map(({ term, definition }) => (
                  <div key={term} className="flex gap-3">
                    <span className="text-[#c9a227] font-bold text-sm shrink-0 w-36 truncate">{term}</span>
                    <span className="text-[#9db89f] text-sm leading-relaxed">{definition}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation + completion */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Previous */}
            {activeLessonIndex > 0 && (
              <button
                onClick={() => goToLesson(activeLessonIndex - 1)}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#162b1a] border border-[#2a4a30] hover:border-[#c9a227]/50 text-[#f0ebe0] rounded-lg text-sm font-medium transition-colors"
              >
                ← {module.lessons[activeLessonIndex - 1].title}
              </button>
            )}

            <div className="flex-1" />

            {/* Complete + Next */}
            {!isComplete ? (
              <button
                onClick={markComplete}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#c9a227] hover:bg-[#e8c347] text-black font-bold rounded-lg transition-colors"
              >
                ✓ Mark Complete (+{lesson.xpReward} XP)
              </button>
            ) : activeLessonIndex < module.lessons.length - 1 ? (
              <button
                onClick={() => goToLesson(activeLessonIndex + 1)}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#c9a227] hover:bg-[#e8c347] text-black font-bold rounded-lg transition-colors"
              >
                Next: {module.lessons[activeLessonIndex + 1].title} →
              </button>
            ) : allLessonsComplete ? (
              <Link
                to={`/quiz/${module.id}`}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#c9a227] hover:bg-[#e8c347] text-black font-bold rounded-lg transition-colors text-center"
              >
                Take Module Quiz →
              </Link>
            ) : null}
          </div>

          {/* Module navigation */}
          <div className="flex gap-3 pt-2">
            {MODULES.findIndex(m => m.id === module.id) > 0 && (
              <Link
                to={`/learn/${MODULES[MODULES.findIndex(m => m.id === module.id) - 1].id}`}
                className="text-sm text-[#9db89f] hover:text-[#c9a227] transition-colors"
                onClick={() => { setActiveLessonIndex(0); navigate(`/learn/${MODULES[MODULES.findIndex(m => m.id === module.id) - 1].id}`); }}
              >
                ← Previous module
              </Link>
            )}
            <div className="flex-1" />
            <Link to="/learn" className="text-sm text-[#9db89f] hover:text-[#c9a227] transition-colors">
              All modules
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
