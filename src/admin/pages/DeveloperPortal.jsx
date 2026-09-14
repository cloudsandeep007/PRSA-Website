import React, { useEffect, useState } from 'react';
import { Terminal, Cpu, HardDrive, Database, Server, RefreshCw, Download, Globe, Shield, Activity, CheckCircle2, Zap } from 'lucide-react';

export default function DeveloperPortal({ authToken }) {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiTests, setApiTests] = useState({});
  const [testingApi, setTestingApi] = useState(false);
  const [logs, setLogs] = useState([]);

  async function fetchDeveloperStatus() {
    setLoading(true);
    try {
      const [resStatus, resLogs] = await Promise.all([
        fetch('/api/admin/developer/status', {
          headers: { 'Authorization': `Bearer ${authToken}` }
        }).then(r => r.json()),
        fetch('/api/admin/activity-logs', {
          headers: { 'Authorization': `Bearer ${authToken}` }
        }).then(r => r.json())
      ]);

      if (resStatus.success) setStatus(resStatus);
      if (Array.isArray(resLogs)) setLogs(resLogs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDeveloperStatus();
  }, [authToken]);

  const runApiDiagnostics = async () => {
    setTestingApi(true);
    const endpoints = [
      { name: 'Public Content API', url: '/api/content' },
      { name: 'Academy Settings API', url: '/api/settings' },
      { name: 'Programs List API', url: '/api/programs' },
      { name: 'Coaches List API', url: '/api/coaches' },
      { name: 'Events List API', url: '/api/events' },
      { name: 'Gallery Media API', url: '/api/gallery' },
      { name: 'Locations API', url: '/api/locations' },
    ];

    const results = {};
    for (const ep of endpoints) {
      const start = performance.now();
      try {
        const res = await fetch(ep.url);
        const latency = Math.round(performance.now() - start);
        results[ep.name] = { status: res.status, ok: res.ok, latency };
      } catch (err) {
        results[ep.name] = { status: 'ERR', ok: false, latency: 0 };
      }
    }
    setApiTests(results);
    setTestingApi(false);
  };

  function formatUptime(totalSeconds) {
    if (!totalSeconds) return '0s';
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hours}h ${mins}m ${secs}s`;
  }

  if (loading) return <div className="text-xs text-primary p-4">Loading Developer System Diagnostics...</div>;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/20 text-primary-container text-xs font-bold">
            <Terminal className="w-3.5 h-3.5" />
            <span>DEVELOPER MAINTENANCE & DIAGNOSTICS HUB</span>
          </div>
          <h2 className="text-2xl font-bold text-primary">Developer Operations Portal</h2>
          <p className="text-xs text-on-surface-variant">
            Real-time server metrics, database table row statistics, API ping health check, and system activity logs
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchDeveloperStatus}
            className="px-4 py-2.5 rounded-xl bg-surface-container-high hover:bg-primary hover:text-on-primary text-xs font-bold text-primary transition-all flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh Diagnostics</span>
          </button>
        </div>
      </div>

      {/* 1. SERVER & SYSTEM METRICS */}
      {status && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Server Status */}
          <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/30 space-y-1">
            <div className="flex items-center justify-between text-on-surface-variant text-xs font-bold">
              <span>EXPRESS NODE SERVER</span>
              <Server className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-lg font-bold text-emerald-400 flex items-center gap-1.5 pt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Online (200 OK)</span>
            </div>
            <div className="text-[11px] text-outline pt-1">Node {status.nodeVersion} • OS: {status.platform}</div>
          </div>

          {/* Process Uptime */}
          <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/30 space-y-1">
            <div className="flex items-center justify-between text-on-surface-variant text-xs font-bold">
              <span>PROCESS UPTIME</span>
              <Cpu className="w-4 h-4 text-primary-container" />
            </div>
            <div className="text-lg font-bold text-primary pt-1">{formatUptime(status.uptimeSeconds)}</div>
            <div className="text-[11px] text-outline pt-1">Server Time: {new Date(status.serverTime).toLocaleTimeString()}</div>
          </div>

          {/* RAM Memory Usage */}
          <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/30 space-y-1">
            <div className="flex items-center justify-between text-on-surface-variant text-xs font-bold">
              <span>RAM MEMORY (RSS)</span>
              <HardDrive className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-lg font-bold text-cyan-300 pt-1">{status.memory.rssMB} MB</div>
            <div className="text-[11px] text-outline pt-1">Heap: {status.memory.heapUsedMB} MB / {status.memory.heapTotalMB} MB</div>
          </div>

          {/* Uploaded Media Storage */}
          <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/30 space-y-1">
            <div className="flex items-center justify-between text-on-surface-variant text-xs font-bold">
              <span>MEDIA DISK STORAGE</span>
              <Database className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-lg font-bold text-amber-400 pt-1">{status.mediaSizeMB} MB</div>
            <div className="text-[11px] text-outline pt-1">{status.mediaCount} uploaded files in /public/uploads</div>
          </div>
        </div>
      )}

      {/* 2. SQLITE DATABASE TABLES METRICS */}
      {status && status.tableCounts && (
        <div className="bg-surface-container-low p-5 rounded-2xl border border-outline-variant/30 space-y-4">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-primary-container" />
              <h3 className="text-base font-bold text-primary">SQLite Database Table Metrics</h3>
            </div>
            <span className="text-xs text-on-surface-variant">Embedded SQL database file (`server/database.sqlite`)</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {Object.entries(status.tableCounts).map(([tableName, count]) => (
              <div key={tableName} className="bg-surface-container-high/60 p-3 rounded-xl border border-outline-variant/20 space-y-1">
                <div className="text-[10px] font-bold text-outline uppercase truncate">{tableName}</div>
                <div className="text-xl font-black text-primary">{count}</div>
                <div className="text-[9px] text-on-surface-variant font-medium">records</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. API ENDPOINT HEALTH CHECK TESTER */}
      <div className="bg-surface-container-low p-5 rounded-2xl border border-outline-variant/30 space-y-4">
        <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-primary">API Endpoint Health Pinger</h3>
          </div>
          <button
            onClick={runApiDiagnostics}
            disabled={testingApi}
            className="px-4 py-2 rounded-xl bg-primary-container text-on-primary-container text-xs font-bold shadow-md hover:bg-cyan-400 transition-all flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{testingApi ? 'Pinging APIs...' : 'Run API Latency Test'}</span>
          </button>
        </div>

        {Object.keys(apiTests).length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(apiTests).map(([name, res]) => (
              <div key={name} className="bg-surface-container-high/60 p-3 rounded-xl border border-outline-variant/20 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-primary">{name}</div>
                  <div className="text-[10px] text-outline">HTTP Status: {res.status}</div>
                </div>
                <div className={`px-2 py-1 rounded text-[10px] font-bold ${res.ok ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'}`}>
                  {res.ok ? `${res.latency} ms` : 'FAILED'}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-xs text-on-surface-variant py-2">
            Click <strong>"Run API Latency Test"</strong> above to measure REST API endpoint response times.
          </div>
        )}
      </div>

      {/* 4. SYSTEM ACTIVITY & EVENT LOGS */}
      <div className="bg-surface-container-low p-5 rounded-2xl border border-outline-variant/30 space-y-4">
        <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-primary">System Activity Audit Trail ({logs.length})</h3>
          </div>
          <a
            href={`/api/admin/backup?token=${authToken}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-lg bg-surface-container-high text-xs font-bold text-primary hover:bg-primary hover:text-on-primary transition-all flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Database SQL File</span>
          </a>
        </div>

        <div className="max-h-72 overflow-y-auto space-y-2">
          {logs.map((log) => (
            <div key={log.id} className="p-2.5 rounded-lg bg-surface-container-high/40 text-xs flex items-center justify-between gap-4 border border-outline-variant/10">
              <div className="space-y-0.5 min-w-0">
                <div className="font-bold text-primary truncate">{log.action}</div>
                <div className="text-[11px] text-on-surface-variant truncate">{log.details || 'System operation'}</div>
              </div>
              <div className="text-[10px] text-outline text-right shrink-0">
                <div>{log.user_email}</div>
                <div>{new Date(log.created_at).toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
