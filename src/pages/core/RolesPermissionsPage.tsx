import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronDown, LockKeyhole, Search, ShieldCheck, Users } from "lucide-react";

const permissionGroups = [
  { name: "Core", permissions: ["View dashboard", "Manage users", "Manage roles", "Manage company structure"] },
  { name: "Finance", permissions: ["View accounts", "Manage budgets", "Post journals", "View reports"] },
  { name: "Human Resources", permissions: ["View employees", "Manage employees", "Manage leave", "Manage recruitment"] },
  { name: "Procurement", permissions: ["View procurement", "Create purchase requests", "Approve purchases"] },
];

const roles = [
  { name: "System Administrator", description: "Full access to all modules and system configuration.", users: 3, status: "Active", permissions: "All permissions" },
  { name: "Finance Manager", description: "Finance operations, approvals and financial reporting.", users: 5, status: "Active", permissions: "24 permissions" },
  { name: "HR Manager", description: "Employee, leave and recruitment administration.", users: 4, status: "Active", permissions: "21 permissions" },
  { name: "Employee", description: "Standard employee self-service access.", users: 86, status: "Active", permissions: "8 permissions" },
];

export default function RolesPermissionsPage() {
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState(roles[0].name);
  const [openGroup, setOpenGroup] = useState("Core");

  const filteredRoles = useMemo(
    () => roles.filter((role) => `${role.name} ${role.description}`.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="w-full space-y-6 p-1">
      <header className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"><ShieldCheck size={28} /></div>
          <div><h1 className="text-2xl font-bold text-slate-900 dark:text-white">Roles & Permissions</h1><p className="mt-1 text-sm text-slate-500">Control access to ERP modules, features and sensitive operations.</p></div>
        </div>
        <button className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700">+ Create Role</button>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        {[{ label: "Total Roles", value: "12", icon: ShieldCheck }, { label: "Active Users", value: "98", icon: Users }, { label: "Protected Permissions", value: "64", icon: LockKeyhole }].map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"><div className="flex items-center justify-between"><span className="text-sm text-slate-500">{label}</span><Icon size={19} className="text-slate-400" /></div><div className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{value}</div></div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(280px,360px)_1fr]">
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="border-b border-slate-200 p-4 dark:border-slate-700"><div className="relative"><Search size={17} className="absolute left-3 top-3 text-slate-400" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search roles..." className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800" /></div></div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">{filteredRoles.map((role) => <button key={role.name} onClick={() => setSelectedRole(role.name)} className={`w-full p-4 text-left transition ${selectedRole === role.name ? "bg-indigo-50 dark:bg-indigo-500/10" : "hover:bg-slate-50 dark:hover:bg-slate-800/60"}`}><div className="flex items-start justify-between gap-3"><div><div className="font-semibold text-slate-900 dark:text-white">{role.name}</div><p className="mt-1 text-xs leading-5 text-slate-500">{role.description}</p></div><span className="rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-medium text-emerald-700">{role.status}</span></div><div className="mt-3 flex gap-4 text-xs text-slate-500"><span>{role.users} users</span><span>{role.permissions}</span></div></button>)}</div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="flex flex-col gap-3 border-b border-slate-200 p-5 dark:border-slate-700 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-semibold text-slate-900 dark:text-white">{selectedRole}</h2><p className="text-sm text-slate-500">Configure permissions granted to this role.</p></div><button className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200">Edit role</button></div>
          <div className="p-5 space-y-3">{permissionGroups.map((group) => <div key={group.name} className="rounded-xl border border-slate-200 dark:border-slate-700"><button onClick={() => setOpenGroup(openGroup === group.name ? "" : group.name)} className="flex w-full items-center justify-between p-4 text-left"><span className="font-medium text-slate-900 dark:text-white">{group.name}</span><ChevronDown size={18} className={`text-slate-400 transition ${openGroup === group.name ? "rotate-180" : ""}`} /></button>{openGroup === group.name && <div className="grid gap-2 border-t border-slate-200 p-4 sm:grid-cols-2 dark:border-slate-700">{group.permissions.map((permission) => <label key={permission} className="flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-slate-50 dark:hover:bg-slate-800"><input type="checkbox" defaultChecked={selectedRole === "System Administrator" || permission === "View dashboard"} className="h-4 w-4 rounded border-slate-300 text-indigo-600" /><span className="text-sm text-slate-700 dark:text-slate-300">{permission}</span><Check size={15} className="ml-auto text-indigo-500" /></label>)}</div>}</div>)}</div>
          <div className="flex justify-end gap-3 border-t border-slate-200 p-5 dark:border-slate-700"><button className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium dark:border-slate-700">Cancel</button><button className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">Save permissions</button></div>
        </section>
      </div>
    </motion.div>
  );
}
