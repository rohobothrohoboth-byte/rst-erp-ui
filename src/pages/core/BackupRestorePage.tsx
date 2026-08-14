import { useState } from "react";
import { motion } from "framer-motion";
import { Archive, CalendarClock, CheckCircle2, Clock3, DatabaseBackup, Download, HardDrive, MoreVertical, RefreshCw, ShieldCheck, Upload, AlertTriangle } from "lucide-react";

const backups = [
  { date: "14 Aug 2026, 02:00 AM", type: "Scheduled", size: "842 MB", status: "Completed" },
  { date: "13 Aug 2026, 02:00 AM", type: "Scheduled", size: "836 MB", status: "Completed" },
  { date: "12 Aug 2026, 06:42 PM", type: "Manual", size: "831 MB", status: "Completed" },
  { date: "12 Aug 2026, 02:00 AM", type: "Scheduled", size: "829 MB", status: "Completed" },
];

export default function BackupRestorePage() {
  const [showRestore, setShowRestore] = useState(false);

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="w-full space-y-6 p-1">
      <header className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4"><div className="rounded-xl bg-sky-50 p-3 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400"><DatabaseBackup size={28} /></div><div><h1 className="text-2xl font-bold text-slate-900 dark:text-white">Backup & Restore</h1><p className="mt-1 text-sm text-slate-500">Protect your ERP data with reliable backups and controlled recovery.</p></div></div>
        <div className="flex gap-2"><button onClick={() => setShowRestore(true)} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold dark:border-slate-700"><Upload size={17} /> Restore</button><button className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-700"><DatabaseBackup size={17} /> Create backup</button></div>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[{ label: "Last Backup", value: "Today, 02:00 AM", icon: CheckCircle2 }, { label: "Backup Size", value: "842 MB", icon: HardDrive }, { label: "Next Scheduled", value: "Tomorrow, 02:00 AM", icon: CalendarClock }, { label: "Retention", value: "30 days", icon: ShieldCheck }].map(({ label, value, icon: Icon }) => <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"><div className="flex items-center gap-2 text-sm text-slate-500"><Icon size={18} />{label}</div><div className="mt-2 font-semibold text-slate-900 dark:text-white">{value}</div></div>)}
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex flex-col gap-3 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between dark:border-slate-700"><div><h2 className="font-semibold text-slate-900 dark:text-white">Backup history</h2><p className="text-sm text-slate-500">Review and manage recent database backups.</p></div><button className="inline-flex items-center gap-2 self-start rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700"><RefreshCw size={15} /> Refresh</button></div>
        <div className="overflow-x-auto"><table className="w-full min-w-[700px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-800/50"><tr><th className="px-5 py-3">Date & time</th><th className="px-5 py-3">Type</th><th className="px-5 py-3">Size</th><th className="px-5 py-3">Status</th><th className="px-5 py-3 text-right">Actions</th></tr></thead><tbody className="divide-y divide-slate-100 dark:divide-slate-800">{backups.map((backup) => <tr key={backup.date} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40"><td className="px-5 py-4 font-medium text-slate-800 dark:text-slate-200">{backup.date}</td><td className="px-5 py-4 text-slate-500">{backup.type}</td><td className="px-5 py-4 text-slate-500">{backup.size}</td><td className="px-5 py-4"><span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700"><CheckCircle2 size={13} />{backup.status}</span></td><td className="px-5 py-4"><div className="flex justify-end gap-2"><button title="Download" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-sky-600 dark:hover:bg-slate-800"><Download size={17} /></button><button title="More actions" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"><MoreVertical size={17} /></button></div></td></tr>)}</tbody></table></div>
      </section>

      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-900/50 dark:bg-amber-950/20"><div className="flex gap-3"><AlertTriangle className="mt-0.5 shrink-0 text-amber-600" size={20} /><div><h3 className="font-semibold text-amber-900 dark:text-amber-300">Restore is a destructive operation</h3><p className="mt-1 text-sm leading-6 text-amber-800 dark:text-amber-400">Restoring a backup can replace current database data. Always verify the backup and confirm the target environment before proceeding.</p></div></div></section>

      {showRestore && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"><div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900"><div className="flex items-start justify-between"><div><h2 className="text-lg font-bold text-slate-900 dark:text-white">Restore backup</h2><p className="mt-1 text-sm text-slate-500">Choose a verified backup file to restore.</p></div><button onClick={() => setShowRestore(false)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">×</button></div><div className="mt-5 rounded-xl border-2 border-dashed border-slate-200 p-8 text-center dark:border-slate-700"><Archive className="mx-auto text-slate-400" size={30} /><p className="mt-3 text-sm font-medium text-slate-700 dark:text-slate-300">Select a backup file</p><p className="mt-1 text-xs text-slate-500">Database backup files only</p><button className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-slate-900">Browse files</button></div><div className="mt-4 flex gap-2 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-800 dark:bg-amber-950/30 dark:text-amber-400"><Clock3 size={16} className="shrink-0" />Confirm that no critical transactions are running before restoration.</div><div className="mt-6 flex justify-end gap-3"><button onClick={() => setShowRestore(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium dark:border-slate-700">Cancel</button><button disabled className="rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white opacity-50">Restore backup</button></div></div></div>}
    </motion.div>
  );
}
