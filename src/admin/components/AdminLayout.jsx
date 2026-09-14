import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  FileText,
  Image,
  Search,
  Settings,
  LogOut,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
  Shield,
  Layers,
  Sparkles,
  Terminal,
  ShieldCheck,
  Building
} from 'lucide-react';

export default function AdminLayout({ children, authToken, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem('prsa_admin_user') || '{"email":"client@prsaroller.com","role":"Client Admin"}');
  const isSuperAdmin = user.role === 'Super Admin';

  // Navigation Items split by Role
  const clientNavItems = [
    { name: 'Dashboard (Leads Overview)', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Trial Bookings (Leads)', path: '/admin/trial-bookings', icon: Users },
    { name: 'Contact Enquiries', path: '/admin/contact-enquiries', icon: MessageSquare },
  ];


  const superAdminNavItems = [
    { name: 'Website CMS Manager', path: '/admin/content', icon: FileText },
    { name: 'SEO Management', path: '/admin/seo', icon: Search },
    { name: 'Settings & Backup', path: '/admin/settings', icon: Settings },
    { name: 'Developer Portal', path: '/admin/developer', icon: Terminal },
    { name: 'Dashboard (Leads Overview)', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Trial Bookings (Leads)', path: '/admin/trial-bookings', icon: Users },
    { name: 'Contact Enquiries', path: '/admin/contact-enquiries', icon: MessageSquare },
    { name: 'Media Library', path: '/admin/media', icon: Image },
  ];

  const navItems = isSuperAdmin ? superAdminNavItems : clientNavItems;

  return (
    <div className="min-h-screen bg-surface flex font-body-md text-on-surface">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-surface-container-lowest border-r border-outline-variant/30 shrink-0">
        {/* Header Branding */}
        <div className="p-5 border-b border-outline-variant/20 flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-lg shadow-md ${
            isSuperAdmin ? 'bg-amber-400 text-black shadow-amber-500/20' : 'bg-primary-container text-on-primary-container shadow-cyan-500/20'
          }`}>
            {isSuperAdmin ? <ShieldCheck className="w-5 h-5" /> : <Building className="w-5 h-5" />}
          </div>
          <div className="min-w-0">
            <span className="font-bold text-primary text-xs block leading-tight truncate">
              {isSuperAdmin ? 'SUPER ADMIN PORTAL' : 'CLIENT ADMIN PORTAL'}
            </span>
            <span className={`text-[10px] tracking-wider font-extrabold uppercase ${
              isSuperAdmin ? 'text-amber-400' : 'text-cyan-400'
            }`}>
              {isSuperAdmin ? 'DEVELOPER CONTROLS' : 'ACADEMY OWNER'}
            </span>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="px-4 pt-3 pb-1 text-[10px] font-bold text-outline tracking-wider uppercase">
          {isSuperAdmin ? 'SUPER ADMIN & DEVELOPER TOOLS' : 'CLIENT OPERATIONAL MANAGEMENT'}
        </div>

        <nav className="flex-1 px-3 py-1 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  active
                    ? isSuperAdmin
                      ? 'bg-amber-400 text-black font-extrabold shadow-md shadow-amber-500/20'
                      : 'bg-primary-container text-on-primary-container shadow-md shadow-cyan-500/20'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer info & Logout */}
        <div className="p-4 border-t border-outline-variant/20 space-y-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-high text-xs text-primary font-semibold hover:bg-surface-container-highest transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-primary-container" />
              <span>Preview Public Website</span>
            </span>
          </a>

          <div className="flex items-center justify-between pt-1">
            <div className="truncate pr-2">
              <span className="text-xs font-bold text-on-surface block truncate">{user.email}</span>
              <span className={`text-[10px] font-bold ${isSuperAdmin ? 'text-amber-400' : 'text-emerald-400'}`}>
                {user.role}
              </span>
            </div>
            <button
              onClick={onLogout}
              className="p-2 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Mobile Drawer */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-surface-container-lowest border-r border-outline-variant/30 flex flex-col transition-transform duration-300 lg:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-5 border-b border-outline-variant/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-base">
              P
            </div>
            <span className="font-bold text-primary text-xs uppercase">
              {isSuperAdmin ? 'Super Admin' : 'Client Portal'}
            </span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="p-1 rounded bg-surface-container-high text-on-surface">
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  active
                    ? 'bg-primary-container text-on-primary-container'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-outline-variant/20">
          <button
            onClick={onLogout}
            className="w-full py-2 rounded bg-red-500/20 text-red-300 text-xs font-bold flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-surface-container-lowest border-b border-outline-variant/30 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg bg-surface-container-high text-on-surface"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-primary">
                {navItems.find(i => i.path === location.pathname)?.name || 'Admin Portal'}
              </h1>
              <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                isSuperAdmin ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30' : 'bg-primary-container/20 text-primary-container border border-primary-container/30'
              }`}>
                {isSuperAdmin ? 'SUPER ADMIN' : 'CLIENT PORTAL'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high text-xs text-primary font-bold hover:bg-surface-container-highest transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-primary-container" />
              <span>Public Website</span>
            </a>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
