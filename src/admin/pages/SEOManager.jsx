import React, { useEffect, useState } from 'react';
import { Save, Search, ExternalLink, CheckCircle2 } from 'lucide-react';

export default function SEOManager({ authToken }) {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch('/api/settings');
        if (res.ok) {
          const json = await res.json();
          setSettings(json);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        setMsg('SEO Configuration Saved Successfully!');
        setTimeout(() => setMsg(''), 4000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="text-xs text-primary p-4">Loading SEO Settings...</div>;

  return (
    <div className="space-y-6">
      <div className="bg-surface-container-low p-5 rounded-2xl border border-outline-variant/30">
        <h2 className="text-xl font-bold text-primary">SEO & Search Engine Manager</h2>
        <p className="text-xs text-on-surface-variant">Non-coder controls for search titles, meta descriptions, and Google indexing</p>
      </div>

      {msg && (
        <div className="p-3 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2 border border-emerald-500/40">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{msg}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 space-y-5">
        <div>
          <label className="text-xs font-bold text-on-surface-variant block mb-1">GLOBAL META TITLE (BROWSER & GOOGLE TAB)</label>
          <input
            type="text"
            value={settings.meta_title || ''}
            onChange={(e) => setSettings({ ...settings, meta_title: e.target.value })}
            className="w-full bg-surface-container-high text-xs p-3 rounded-lg border border-outline-variant/30 text-on-surface font-semibold"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-on-surface-variant block mb-1">GLOBAL META DESCRIPTION (GOOGLE SEARCH SNIPPET)</label>
          <textarea
            rows={3}
            value={settings.meta_description || ''}
            onChange={(e) => setSettings({ ...settings, meta_description: e.target.value })}
            className="w-full bg-surface-container-high text-xs p-3 rounded-lg border border-outline-variant/30 text-on-surface"
          />
        </div>

        <div className="pt-4 border-t border-outline-variant/20 flex items-center gap-4">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-primary-container text-on-primary-container font-bold text-xs shadow-lg hover:shadow-cyan-500/40 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save SEO Settings</span>
          </button>

          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 rounded-xl bg-surface-container-high text-xs text-primary font-bold hover:bg-surface-container-highest flex items-center gap-1.5"
          >
            <span>View XML Sitemap</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <a
            href="/robots.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 rounded-xl bg-surface-container-high text-xs text-primary font-bold hover:bg-surface-container-highest flex items-center gap-1.5"
          >
            <span>View Robots.txt</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </form>
    </div>
  );
}
