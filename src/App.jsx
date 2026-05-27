// import { useState } from "react";
// import Login from "./components/Login";
// import Dashboard from "./components/Dashboard";
// import PostManager from "./components/PostManager";
// import CategoryManager from "./components/CategoryManager";
// import Logo from "./logo.png";
// import {
//   LayoutDashboard,
//   StickyNote,
//   Tag,
//   LogOut,
//   Bell,
//   Settings,
//   ChevronRight,
//   Moon,
//   Sun,
//   Search,
// } from "lucide-react";

// const navItems = [
//   {
//     id: "dashboard",
//     label: "Dashboard",
//     icon: LayoutDashboard,
//     badge: null,
//   },
//   {
//     id: "posts",
//     label: "Posts",
//     icon: StickyNote,
//     badge: "12",
//   },
//   {
//     id: "categories",
//     label: "Categories",
//     icon: Tag,
//     badge: null,
//   },
// ];

// function App() {
//   const [token, setToken] = useState(localStorage.getItem("adminToken"));
//   const [currentView, setCurrentView] = useState("dashboard");
//   const [darkSidebar, setDarkSidebar] = useState(true);
//   const [collapsed, setCollapsed] = useState(false);

//   const handleLogout = () => {
//     localStorage.removeItem("adminToken");
//     setToken(null);
//   };

//   if (!token) return <Login setToken={setToken} />;

//   const currentItem = navItems.find((n) => n.id === currentView);

//   return (
//     <div className="flex h-screen bg-slate-50 overflow-hidden font-khmer">
//       {/* ── SIDEBAR ── */}
//       <aside
//         className={`
//           flex flex-col transition-all duration-300 ease-in-out
//           ${collapsed ? "w-20" : "w-72"}
//           relative z-20 shadow-2xl
//         `}
//         style={{ background: "linear-gradient(180deg,#0b2545 0%,#081c37 100%)" }}
//       >
//         {/* Decorative top glow */}
//         <div
//           className="absolute top-0 left-0 right-0 h-1 rounded-t"
//           style={{
//             background: "linear-gradient(90deg,#3b82f6,#06b6d4,#3b82f6)",
//           }}
//         />

//         {/* Logo row */}
//         <div
//           className={`flex items-center gap-3 px-5 pt-7 pb-6 ${collapsed ? "justify-center" : ""}`}
//         >
//           <div className="relative flex-shrink-0">
//             <img
//               src={Logo}
//               alt="KSP"
//               className="w-11 h-11 rounded-xl object-cover ring-2 ring-blue-400/40 shadow-lg"
//             />
//             {/* Online dot */}
//             <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#0b2545]" />
//           </div>
//           {!collapsed && (
//             <div>
//               <h1 className="text-white text-xl font-extrabold tracking-wide leading-none">
//                 KSP Admin
//               </h1>
//               <p className="text-blue-300 text-xs mt-0.5 font-medium tracking-wider uppercase">
//                 Control Panel
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Divider */}
//         <div className="mx-4 h-px bg-white/10 mb-4" />

//         {/* Search bar */}
//         {!collapsed && (
//           <div className="mx-4 mb-5">
//             <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2.5 ring-1 ring-white/10 focus-within:ring-blue-400/50 transition">
//               <Search className="w-4 h-4 text-blue-300 flex-shrink-0" />
//               <input
//                 className="bg-transparent text-sm text-white placeholder-blue-300/70 outline-none w-full font-khmer"
//                 placeholder="Quick search…"
//               />
//             </div>
//           </div>
//         )}

//         {/* Nav label */}
//         {!collapsed && (
//           <p className="text-blue-400/60 text-[10px] font-bold uppercase tracking-widest px-6 mb-2">
//             Navigation
//           </p>
//         )}

//         {/* Nav items */}
//         <nav className="flex-1 px-3 space-y-1">
//           {navItems.map(({ id, label, icon: Icon, badge }) => {
//             const active = currentView === id;
//             return (
//               <button
//                 key={id}
//                 onClick={() => setCurrentView(id)}
//                 className={`
//                   w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold
//                   transition-all duration-200 group relative overflow-hidden
//                   ${collapsed ? "justify-center" : ""}
//                   ${
//                     active
//                       ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
//                       : "text-blue-200/80 hover:text-white hover:bg-white/10"
//                   }
//                 `}
//               >
//                 {/* Active left-bar accent */}
//                 {active && (
//                   <span className="absolute left-0 top-2 bottom-2 w-1 bg-white rounded-r-full" />
//                 )}

//                 <Icon
//                   className={`w-5 h-5 flex-shrink-0 transition-transform duration-200
//                     ${active ? "" : "group-hover:scale-110"}`}
//                 />

//                 {!collapsed && (
//                   <>
//                     <span className="flex-1 text-left">{label}</span>
//                     {badge && (
//                       <span className="text-[10px] font-bold bg-white/20 text-white px-2 py-0.5 rounded-full">
//                         {badge}
//                       </span>
//                     )}
//                     {active && (
//                       <ChevronRight className="w-4 h-4 opacity-60 ml-auto" />
//                     )}
//                   </>
//                 )}
//               </button>
//             );
//           })}
//         </nav>

//         {/* Bottom section */}
//         <div className="px-3 pb-6 space-y-1">
//           <div className="mx-1 h-px bg-white/10 mb-3" />

//           {/* Settings */}
//           <button
//             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm
//               text-blue-200/70 hover:text-white hover:bg-white/10 transition-all group
//               ${collapsed ? "justify-center" : ""}`}
//           >
//             <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
//             {!collapsed && <span className="font-medium">Settings</span>}
//           </button>

//           {/* Toggle collapse */}
//           <button
//             onClick={() => setCollapsed(!collapsed)}
//             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm
//               text-blue-200/70 hover:text-white hover:bg-white/10 transition-all
//               ${collapsed ? "justify-center" : ""}`}
//           >
//             <Moon className="w-5 h-5" />
//             {!collapsed && <span className="font-medium">Collapse Sidebar</span>}
//           </button>

//           {/* User card */}
//           {!collapsed && (
//             <div className="mt-3 mx-1 bg-white/8 rounded-2xl p-3 flex items-center gap-3 ring-1 ring-white/10">
//               <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
//                 A
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="text-white text-sm font-semibold truncate">Admin</p>
//                 <p className="text-blue-300 text-xs truncate"></p>
//               </div>
//               <button
//                 onClick={handleLogout}
//                 title="Logout"
//                 className="w-8 h-8 rounded-lg bg-red-500/20 hover:bg-red-500/40 flex items-center justify-center text-red-300 hover:text-red-200 transition-all"
//               >
//                 <LogOut className="w-4 h-4" />
//               </button>
//             </div>
//           )}

//           {/* Collapsed logout */}
//           {collapsed && (
//             <button
//               onClick={handleLogout}
//               className="w-full flex items-center justify-center px-4 py-3 rounded-xl
//                 text-red-300 hover:text-red-200 hover:bg-red-500/20 transition-all"
//             >
//               <LogOut className="w-5 h-5" />
//             </button>
//           )}
//         </div>
//       </aside>

//       {/* ── MAIN AREA ── */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Top header bar */}
//         <header className="bg-white border-b border-slate-200/80 px-8 py-4 flex items-center gap-4 shadow-sm flex-shrink-0">
//           {/* Breadcrumb */}
//           <div className="flex items-center gap-2 flex-1">
//             <span className="text-slate-400 text-sm">KSP</span>
//             <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
//             <span className="text-slate-800 text-sm font-semibold">
//               {currentItem?.label}
//             </span>
//           </div>

//           {/* Right actions */}
//           <div className="flex items-center gap-3">
//             {/* Search */}
//             <div className="hidden md:flex items-center gap-2 bg-slate-100 rounded-xl px-3 py-2 ring-1 ring-slate-200 focus-within:ring-blue-400 transition w-56">
//               <Search className="w-4 h-4 text-slate-400" />
//               <input
//                 className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none w-full font-khmer"
//                 placeholder="Search…"
//               />
//             </div>

//             {/* Bell */}
//             <button className="relative w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition">
//               <Bell className="w-4.5 h-4.5 text-slate-500 w-5 h-5" />
//               <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full" />
//             </button>

//             {/* Avatar */}
//             <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow">
//               A
//             </div>
//           </div>
//         </header>

//         {/* Page content */}
//         <main className="flex-1 overflow-auto">
//           <div className="p-6 md:p-8 max-w-7xl mx-auto">
//             {currentView === "dashboard" && <Dashboard />}
//             {currentView === "posts" && <PostManager />}
//             {currentView === "categories" && <CategoryManager />}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// export default App;
import { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import PostManager from "./components/PostManager";
import CategoryManager from "./components/CategoryManager";
import CommentManager from "./components/CommentManager";
import Logo from "./logo.png";
import {
  LayoutDashboard,
  StickyNote,
  Tag,
  LogOut,
  Bell,
  Settings,
  ChevronRight,
  Moon,
  Search,
  MessageCircle,
} from "lucide-react";

const navItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    id: "posts",
    label: "Posts",
    icon: StickyNote,
    badge: null,
  },
  {
    id: "categories",
    label: "Categories",
    icon: Tag,
    badge: null,
  },
  {
    id: "comments",
    label: "មតិយោបល់",
    icon: MessageCircle,
    badge: null,
  },
];

function App() {
  const [token, setToken] = useState(localStorage.getItem("adminToken"));
  const [currentView, setCurrentView] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
  };

  if (!token) return <Login setToken={setToken} />;

  const currentItem = navItems.find((n) => n.id === currentView);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-khmer">
      {/* ── SIDEBAR ── */}
      <aside
        className={`
          flex flex-col transition-all duration-300 ease-in-out
          ${collapsed ? "w-20" : "w-72"}
          relative z-20 shadow-2xl
        `}
        style={{
          background: "linear-gradient(180deg,#0b2545 0%,#081c37 100%)",
        }}
      >
        {/* Decorative top glow */}
        <div
          className="absolute top-0 left-0 right-0 h-1 rounded-t"
          style={{
            background: "linear-gradient(90deg,#3b82f6,#06b6d4,#3b82f6)",
          }}
        />

        {/* Logo row */}
        <div
          className={`flex items-center gap-3 px-5 pt-7 pb-6 ${collapsed ? "justify-center" : ""}`}
        >
          <div className="relative flex-shrink-0">
            <img
              src={Logo}
              alt="KSP"
              className="w-11 h-11 rounded-xl object-cover ring-2 ring-blue-400/40 shadow-lg"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#0b2545]" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-white text-xl font-extrabold tracking-wide leading-none">
                KSP Admin
              </h1>
              <p className="text-blue-300 text-xs mt-0.5 font-medium tracking-wider uppercase">
                Control Panel
              </p>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="mx-4 h-px bg-white/10 mb-4" />

        {/* Search bar */}
        {!collapsed && (
          <div className="mx-4 mb-5">
            <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2.5 ring-1 ring-white/10 focus-within:ring-blue-400/50 transition">
              <Search className="w-4 h-4 text-blue-300 flex-shrink-0" />
              <input
                className="bg-transparent text-sm text-white placeholder-blue-300/70 outline-none w-full font-khmer"
                placeholder="Quick search…"
              />
            </div>
          </div>
        )}

        {/* Nav label */}
        {!collapsed && (
          <p className="text-blue-400/60 text-[10px] font-bold uppercase tracking-widest px-6 mb-2">
            Navigation
          </p>
        )}

        {/* Nav items */}
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map(({ id, label, icon: Icon, badge }) => {
            const active = currentView === id;
            return (
              <button
                key={id}
                onClick={() => setCurrentView(id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold
                  transition-all duration-200 group relative overflow-hidden
                  ${collapsed ? "justify-center" : ""}
                  ${
                    active
                      ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                      : "text-blue-200/80 hover:text-white hover:bg-white/10"
                  }
                `}
              >
                {active && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 bg-white rounded-r-full" />
                )}

                <Icon
                  className={`w-5 h-5 flex-shrink-0 transition-transform duration-200
                    ${active ? "" : "group-hover:scale-110"}`}
                />

                {!collapsed && (
                  <>
                    <span className="flex-1 text-left">{label}</span>
                    {badge && (
                      <span className="text-[10px] font-bold bg-white/20 text-white px-2 py-0.5 rounded-full">
                        {badge}
                      </span>
                    )}
                    {active && (
                      <ChevronRight className="w-4 h-4 opacity-60 ml-auto" />
                    )}
                  </>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="px-3 pb-6 space-y-1">
          <div className="mx-1 h-px bg-white/10 mb-3" />

          {/* Settings */}
          <button
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm
              text-blue-200/70 hover:text-white hover:bg-white/10 transition-all group
              ${collapsed ? "justify-center" : ""}`}
          >
            <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
            {!collapsed && <span className="font-medium">Settings</span>}
          </button>

          {/* Toggle collapse */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm
              text-blue-200/70 hover:text-white hover:bg-white/10 transition-all
              ${collapsed ? "justify-center" : ""}`}
          >
            <Moon className="w-5 h-5" />
            {!collapsed && (
              <span className="font-medium">Collapse Sidebar</span>
            )}
          </button>

          {/* User card */}
          {!collapsed && (
            <div className="mt-3 mx-1 bg-white/8 rounded-2xl p-3 flex items-center gap-3 ring-1 ring-white/10">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                A
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-semibold truncate">
                  Admin
                </p>
                <p className="text-blue-300 text-xs truncate"></p>
              </div>
              <button
                onClick={handleLogout}
                title="Logout"
                className="w-8 h-8 rounded-lg bg-red-500/20 hover:bg-red-500/40 flex items-center justify-center text-red-300 hover:text-red-200 transition-all"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Collapsed logout */}
          {collapsed && (
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center px-4 py-3 rounded-xl
                text-red-300 hover:text-red-200 hover:bg-red-500/20 transition-all"
            >
              <LogOut className="w-5 h-5" />
            </button>
          )}
        </div>
      </aside>

      {/* ── MAIN AREA ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header bar */}
        <header className="bg-white border-b border-slate-200/80 px-8 py-4 flex items-center gap-4 shadow-sm flex-shrink-0">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 flex-1">
            <span className="text-slate-400 text-sm">KSP</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-slate-800 text-sm font-semibold">
              {currentItem?.label}
            </span>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="hidden md:flex items-center gap-2 bg-slate-100 rounded-xl px-3 py-2 ring-1 ring-slate-200 focus-within:ring-blue-400 transition w-56">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none w-full font-khmer"
                placeholder="Search…"
              />
            </div>

            {/* Bell */}
            <button className="relative w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition">
              <Bell className="w-5 h-5 text-slate-500" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full" />
            </button>

            {/* Avatar */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow">
              A
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6 md:p-8 max-w-7xl mx-auto">
            {currentView === "dashboard" && <Dashboard />}
            {currentView === "posts" && <PostManager />}
            {currentView === "categories" && <CategoryManager />}
            {currentView === "comments" && <CommentManager />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
