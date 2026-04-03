import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ArrowLeftRight, Lightbulb, BarChart3, X } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useRoleStore } from '../../store/roleStore';
import type { Role } from '../../types/finance';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { to: '/insights', label: 'Insights', icon: Lightbulb },
];

interface AppSidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

/** Fixed left sidebar with dark gradient theme, navigation, and embedded role switcher */
const AppSidebar = ({ mobileOpen, onClose }: AppSidebarProps) => {
  const { activeRole, switchRole } = useRoleStore();
  const navigate = useNavigate();

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switchRole(e.target.value as Role);
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden animate-fade-in"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-screen flex flex-col transition-transform duration-300 ease-in-out',
          'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800',
          'border-r border-slate-700/50',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
          'w-64 md:translate-x-0',
          'md:w-16 lg:w-64'
        )}
      >
        {/* Branding */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-slate-700/50">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2.5 group"
            aria-label="Go to dashboard"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-violet-600 shadow-lg shadow-violet-900/40 group-hover:bg-violet-500 transition-colors">
              <BarChart3 size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold text-white md:hidden lg:block tracking-tight">
              WealthLens
            </span>
          </button>
          <button
            onClick={onClose}
            className="md:hidden rounded-lg p-1 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  isActive ? 'sidebar-link-active' : 'sidebar-link',
                  'md:justify-center lg:justify-start'
                )
              }
            >
              <Icon size={20} />
              <span className="md:hidden lg:inline">{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Role switcher + indicator */}
        <div className="px-3 py-4 border-t border-slate-700/50 space-y-3">
          <div className="md:hidden lg:block">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 px-1">
              View As
            </p>
            <select
              value={activeRole}
              onChange={handleRoleChange}
              className="w-full rounded-xl border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-colors cursor-pointer"
              aria-label="Switch role"
            >
              <option value="admin">Admin</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>

          {/* Compact icon-only role indicator at tablet width */}
          <div className="hidden md:flex lg:hidden justify-center">
            <div className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold',
              activeRole === 'admin'
                ? 'bg-violet-600/20 text-violet-300 border border-violet-500/30'
                : 'bg-amber-600/20 text-amber-300 border border-amber-500/30'
            )}>
              {activeRole === 'admin' ? 'A' : 'V'}
            </div>
          </div>

          {/* Role status indicator */}
          <div className="flex items-center gap-2 px-1 md:justify-center lg:justify-start">
            <div className={cn(
              'w-2 h-2 rounded-full shrink-0',
              activeRole === 'admin' ? 'bg-violet-400' : 'bg-amber-400'
            )} />
            <span className="text-xs text-slate-400 md:hidden lg:inline">
              {activeRole === 'admin' ? 'Admin access' : 'View only'}
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AppSidebar;
