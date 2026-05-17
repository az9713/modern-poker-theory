import { Link, useLocation } from 'react-router-dom';
import { useProgressStore } from '../../store/progressStore';
import { getLevelForXP } from '../../types';

export function Navbar() {
  const { xp, streakDays } = useProgressStore();
  const level = getLevelForXP(xp);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/learn', label: 'Learn' },
    { to: '/tools', label: 'Tools' },
    { to: '/progress', label: 'Progress' },
    { to: '/reference', label: '📖 Reference' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#0d1f13]/95 backdrop-blur border-b border-[#2a4a30]">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="text-xl">🃏</span>
          <span className="font-bold text-[#c9a227] hidden sm:block">MPT Academy</span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? 'bg-[#c9a227] text-black'
                  : 'text-[#9db89f] hover:text-[#f0ebe0] hover:bg-[#162b1a]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* XP + Streak */}
        <div className="flex items-center gap-3 shrink-0">
          {streakDays > 0 && (
            <div className="flex items-center gap-1 text-sm">
              <span>🔥</span>
              <span className="text-[#fb923c] font-bold">{streakDays}</span>
            </div>
          )}
          <Link to="/progress" className="flex items-center gap-1.5 bg-[#162b1a] border border-[#2a4a30] rounded-full px-3 py-1 hover:border-[#c9a227] transition-colors">
            <span className="text-[#c9a227] text-sm font-bold">{xp.toLocaleString()} XP</span>
            <span className="text-[#9db89f] text-xs hidden sm:block">· {level.name}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
