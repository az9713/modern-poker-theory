import { useParams, Link } from 'react-router-dom';
import { getModule } from '../data/modules';
import { QUIZZES } from '../data/quizzes';
import { useProgressStore } from '../store/progressStore';
import { QuizEngine } from '../components/quiz/QuizEngine';

export function Quiz() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { completedLessons } = useProgressStore();

  const module = getModule(moduleId ?? '');
  const questions = QUIZZES[moduleId ?? ''] ?? [];

  if (!module) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">😕</div>
        <h1 className="text-[#f0ebe0] text-2xl font-bold mb-4">Module not found</h1>
        <Link to="/learn" className="text-[#c9a227] hover:underline">← Back to modules</Link>
      </div>
    );
  }

  const allLessonsComplete = module.lessons.every(l => completedLessons.includes(l.id));

  if (!allLessonsComplete) {
    const remaining = module.lessons.filter(l => !completedLessons.includes(l.id));
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">📚</div>
        <h1 className="text-[#f0ebe0] text-2xl font-bold mb-4">Finish the lessons first!</h1>
        <p className="text-[#9db89f] mb-6">
          Complete all {module.lessons.length} lessons before taking the quiz.
        </p>
        <div className="bg-[#162b1a] border border-[#2a4a30] rounded-xl p-4 mb-6">
          <p className="text-[#9db89f] text-sm mb-3">Remaining lessons:</p>
          <ul className="space-y-1">
            {remaining.map(l => (
              <li key={l.id} className="text-[#f0ebe0] text-sm">• {l.title}</li>
            ))}
          </ul>
        </div>
        <Link
          to={`/learn/${moduleId}`}
          className="px-6 py-3 bg-[#c9a227] hover:bg-[#e8c347] text-black font-bold rounded-xl transition-colors inline-block"
        >
          Continue Lessons →
        </Link>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🚧</div>
        <h1 className="text-[#f0ebe0] text-2xl font-bold mb-4">Quiz coming soon!</h1>
        <Link to="/learn" className="text-[#c9a227] hover:underline">← Back to modules</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Quiz header */}
      <div className="mb-8 text-center">
        <div className="text-4xl mb-2">{module.icon}</div>
        <h1 className="text-[#f0ebe0] text-2xl font-bold">{module.title} — Quiz</h1>
        <p className="text-[#9db89f] text-sm mt-1">
          {questions.length} questions · Pass with 70%+ to complete the module
        </p>
      </div>

      <QuizEngine moduleId={moduleId!} questions={questions} />
    </div>
  );
}
