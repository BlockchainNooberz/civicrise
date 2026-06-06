import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, Users, BookOpen, Clock, Award, 
  ShoppingBag, TrendingUp, Building2, ChevronLeft, 
  ChevronRight, Star, Zap, Menu, X, LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import NACLogo from '@/components/ui/NACLogo';

const adminNav = [
  { label: 'Command Center', icon: LayoutDashboard, path: '/admin' },
  { label: 'Facilities', icon: Building2, path: '/admin/camps' },
  { label: 'Residents', icon: Users, path: '/admin/residents' },
  { label: 'Curriculum', icon: BookOpen, path: '/admin/courses' },
  { label: 'Time Logs', icon: Clock, path: '/admin/timelogs' },
  { label: 'Reintegration', icon: TrendingUp, path: '/admin/reintegration' },
  { label: 'Partners', icon: Star, path: '/admin/partners' },
  { label: 'Marketplace', icon: ShoppingBag, path: '/admin/marketplace' },
];

const residentNav = [
  { label: 'Mission Control', icon: LayoutDashboard, path: '/resident' },
  { label: 'My Earnings', icon: Zap, path: '/resident/wallet' },
  { label: 'Courses', icon: BookOpen, path: '/resident/courses' },
  { label: 'Certifications', icon: Award, path: '/resident/certifications' },
  { label: 'Marketplace', icon: ShoppingBag, path: '/resident/marketplace' },
  { label: 'My Path', icon: TrendingUp, path: '/resident/path' },
];

export default function AppLayout({ role = 'admin' }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const nav = role === 'admin' ? adminNav : residentNav;

  const NavContent = () => (
    <div className="flex flex-col h-full">
      <div className={cn("flex items-center px-4 py-6 border-b border-border/50", collapsed ? "justify-center" : "gap-3")}>
        <NACLogo size={collapsed ? 32 : 28} />
        {!collapsed && (
          <div>
            <div className="font-display text-lg font-bold text-gradient-blue leading-tight">PROJECT</div>
            <div className="font-display text-lg font-black text-gradient-gold leading-tight -mt-1">RENAISSANCE</div>
          </div>
        )}
      </div>

      {!collapsed && (
        <div className="px-4 py-3 border-b border-border/50">
          <div className={cn("text-xs font-semibold uppercase tracking-widest px-2 py-1 rounded-full w-fit",
            role === 'admin' ? "bg-primary/20 text-primary" : "bg-accent/20 text-accent")}>
            {role === 'admin' ? 'Admin Portal' : 'Resident Portal'}
          </div>
        </div>
      )}

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {nav.map((item) => {
          const active = location.pathname === item.path || 
            (item.path !== '/admin' && item.path !== '/resident' && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
                active
                  ? "bg-primary/15 text-primary border border-primary/20 glow-btn"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              )}
            >
              <item.icon className={cn("flex-shrink-0", collapsed ? "w-5 h-5" : "w-4 h-4")} />
              {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
              {active && !collapsed && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 pb-4 space-y-1 border-t border-border/50 pt-4">
        {!collapsed && role === 'admin' && (
          <Link to="/resident" className="flex items-center gap-3 px-3 py-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/5 text-sm transition-all">
            <Users className="w-4 h-4" />
            <span>Resident View</span>
          </Link>
        )}
        {!collapsed && role === 'resident' && (
          <Link to="/admin" className="flex items-center gap-3 px-3 py-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/5 text-sm transition-all">
            <LayoutDashboard className="w-4 h-4" />
            <span>Admin View</span>
          </Link>
        )}
        <Link to="/" className="flex items-center gap-3 px-3 py-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/5 text-sm transition-all">
          <LogOut className="w-4 h-4" />
          {!collapsed && <span>Home</span>}
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop sidebar */}
      <aside className={cn(
        "hidden lg:flex flex-col flex-shrink-0 glass border-r border-border/50 transition-all duration-300",
        collapsed ? "w-16" : "w-60"
      )}>
        <NavContent />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute left-full top-1/2 -translate-y-1/2 w-5 h-10 bg-secondary border border-border/50 rounded-r-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors z-10"
          style={{ marginLeft: collapsed ? '64px' : '240px', position: 'fixed' }}
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-60 glass border-r border-border/50">
            <NavContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="lg:hidden flex items-center gap-4 px-4 py-3 border-b border-border/50 glass">
          <button onClick={() => setMobileOpen(true)} className="text-muted-foreground hover:text-foreground">
            <Menu className="w-5 h-5" />
          </button>
          <NACLogo size={24} />
          <span className="font-display font-bold text-gradient-blue">PROJECT RENAISSANCE</span>
        </header>
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}