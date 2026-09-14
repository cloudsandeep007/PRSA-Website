import React, { useEffect, useState } from 'react';
import { Save, Download, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function SettingsManager({ authToken }) {
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

  const handleSaveSettings = async (e) => {
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
        setMsg('Academy Settings Updated Successfully!');
        setTimeout(() => setMsg(''), 4000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownloadBackup = () => {
    window.open(`/api/admin/backup?token=${authToken}`, '_blank');
  };

  if (loading) return <div className="text-xs text-primary p-4">Loading Settings...</div>;

  return (
    <div className="space-y-6">
      <div className="bg-surface-container-low p-5 rounded-2xl border border-outline-variant/30 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-primary">Academy Settings & System Backup</h2>
          <p className="text-xs text-on-surface-variant">Update contact details, phone numbers, WhatsApp, and create instant database backups</p>
        </div>

        <button
          onClick={handleDownloadBackup}
          className="px-4 py-2.5 rounded-xl bg-emerald-500 text-black font-bold text-xs shadow-md hover:bg-emerald-400 transition-all flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span>CREATE & DOWNLOAD BACKUP</span>
        </button>
      </div>

      {msg && (
        <div className="p-3 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2 border border-emerald-500/40">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{msg}</span>
        </div>
      )}

      <form onSubmit={handleSaveSettings} className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-on-surface-variant block mb-1">ACADEMY NAME</label>
            <input
              type="text"
              value={settings.academy_name || ''}
              onChange={(e) => setSettings({ ...settings, academy_name: e.target.value })}
              className="w-full bg-surface-container-high text-xs p-3 rounded-lg border border-outline-variant/30 text-on-surface font-semibold"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-on-surface-variant block mb-1">PHONE NUMBER</label>
            <input
              type="text"
              value={settings.phone || ''}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              className="w-full bg-surface-container-high text-xs p-3 rounded-lg border border-outline-variant/30 text-on-surface"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-on-surface-variant block mb-1">WHATSAPP NUMBER (WITH COUNTRY CODE, NO SPACES)</label>
            <input
              type="text"
              value={settings.whatsapp || ''}
              onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
              className="w-full bg-surface-container-high text-xs p-3 rounded-lg border border-outline-variant/30 text-on-surface"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-on-surface-variant block mb-1">ADMIN NOTIFICATION EMAIL</label>
            <input
              type="email"
              value={settings.admin_notify_email || ''}
              onChange={(e) => setSettings({ ...settings, admin_notify_email: e.target.value })}
              className="w-full bg-surface-container-high text-xs p-3 rounded-lg border border-outline-variant/30 text-on-surface"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-on-surface-variant block mb-1">FULL HEADQUARTERS ADDRESS</label>
          <input
            type="text"
            value={settings.address || ''}
            onChange={(e) => setSettings({ ...settings, address: e.target.value })}
            className="w-full bg-surface-container-high text-xs p-3 rounded-lg border border-outline-variant/30 text-on-surface"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-on-surface-variant block mb-1">BUSINESS & TRAINING HOURS</label>
          <input
            type="text"
            value={settings.business_hours || ''}
            onChange={(e) => setSettings({ ...settings, business_hours: e.target.value })}
            className="w-full bg-surface-container-high text-xs p-3 rounded-lg border border-outline-variant/30 text-on-surface"
          />
        </div>

        <div className="pt-4 border-t border-outline-variant/20">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-primary-container text-on-primary-container font-bold text-xs shadow-lg hover:shadow-cyan-500/40 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Academy Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
