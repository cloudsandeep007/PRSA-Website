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
  Sparkles
} from 'lucide-react';

export default function AdminLayout({ children, authToken, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem('prsa_admin_user') || '{"email":"admin@prsaroller.com","role":"Super Admin"}');

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Trial Bookings (Leads)', path: '/admin/trial-bookings', icon: Users },
    { name: 'Contact Enquiries', path: '/admin/contact-enquiries', icon: MessageSquare },
    { name: 'Website CMS Manager', path: '/admin/content', icon: FileText },
    { name: 'Media Library', path: '/admin/media', icon: Image },
    { name: 'SEO Management', path: '/admin/seo', icon: Search },
    { name: 'Settings & Backup', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-surface flex font-body-md text-on-surface">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-surface-container-lowest border-r border-outline-variant/30 shrink-0">
        <div className="p-6 border-b border-outline-variant/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-lg">
              P
            </div>
            <div>
              <span className="font-bold text-primary text-sm block leading-none">PRSA ADMIN</span>
              <span className="text-[10px] text-outline tracking-wider font-semibold">SAAS PORTAL</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  active
                    ? 'bg-primary-container text-on-primary-container shadow-md shadow-cyan-500/20'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-outline-variant/20 space-y-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-high text-xs text-primary font-semibold hover:bg-surface-container-highest transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-primary-container" />
              <span>View Live Website</span>
            </span>
          </a>

          <div className="flex items-center justify-between pt-2">
            <div className="truncate pr-2">
              <span className="text-xs font-bold text-on-surface block truncate">{user.email}</span>
              <span className="text-[10px] text-emerald-400 font-semibold">{user.role}</span>
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
            <h1 className="text-base font-bold text-primary">
              {navItems.find(i => i.path === location.pathname)?.name || 'Admin Management'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
              ● System Active & Online
            </span>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-surface-container-high text-on-surface hover:text-primary text-xs font-bold flex items-center gap-1"
            >
              <span>Public Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-6 overflow-y-auto bg-surface">
          {children}
        </main>
      </div>

      {/* Mobile Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/80" onClick={() => setSidebarOpen(false)}></div>
          <aside className="relative w-64 bg-surface-container-lowest border-r border-outline-variant/30 flex flex-col z-10">
            <div className="p-4 border-b border-outline-variant/20 flex items-center justify-between">
              <span className="font-bold text-primary text-sm">PRSA ADMIN MENU</span>
              <button onClick={() => setSidebarOpen(false)} className="text-on-surface">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="p-4 space-y-1 flex-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      active
                        ? 'bg-primary-container text-on-primary-container'
                        : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="p-4 border-t border-outline-variant/20">
              <button
                onClick={onLogout}
                className="w-full py-2.5 rounded-xl bg-red-500/20 text-red-300 text-xs font-bold flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
