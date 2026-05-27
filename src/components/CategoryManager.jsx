
import { useState, useEffect, useMemo } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  X,
  Save,
  RefreshCw,
  FolderTree,
  Tag,
  Hash,
  Globe,
  Link,
  ChevronLeft,
  ChevronRight,
  Folder,
  Newspaper,
  GraduationCap,
  Monitor,
  Palette,
  Music,
  Gamepad2,
  Plane,
  Pizza,
  Home,
  Heart,
  Star,
  Flame,
  Lightbulb,
  Target,
  BookOpen,
  Video,
  Camera,
  Coffee,
  Dumbbell,
  Car,
  Train,
  Ship,
  Phone,
  Mail,
  MapPin,
  Clock,
  Calendar,
  Users,
  Shield,
  Gift,
  Award,
  Trophy,
  Sparkles,
  Zap,
  Sun,
  Moon,
  CloudRain,
  Snowflake,
  Leaf,
  TreePine,
  Mountain,
  Waves,
  Compass,
  Anchor,
  CheckCircle,
  AlertCircle,
  Layers,
} from "lucide-react";
import { categoryAPI } from "../api/api";

/* ── icon registry ─────────────────────────────────────────────── */
const ICONS = [
  { name: "Folder", Icon: Folder, color: "#f59e0b" },
  { name: "Newspaper", Icon: Newspaper, color: "#3b82f6" },
  { name: "GraduationCap", Icon: GraduationCap, color: "#8b5cf6" },
  { name: "Monitor", Icon: Monitor, color: "#06b6d4" },
  { name: "Palette", Icon: Palette, color: "#ec4899" },
  { name: "Music", Icon: Music, color: "#10b981" },
  { name: "Gamepad2", Icon: Gamepad2, color: "#f97316" },
  { name: "Plane", Icon: Plane, color: "#6366f1" },
  { name: "Pizza", Icon: Pizza, color: "#ef4444" },
  { name: "Home", Icon: Home, color: "#14b8a6" },
  { name: "Heart", Icon: Heart, color: "#f43f5e" },
  { name: "Star", Icon: Star, color: "#eab308" },
  { name: "Flame", Icon: Flame, color: "#f97316" },
  { name: "Lightbulb", Icon: Lightbulb, color: "#fbbf24" },
  { name: "Target", Icon: Target, color: "#dc2626" },
  { name: "BookOpen", Icon: BookOpen, color: "#7c3aed" },
  { name: "Video", Icon: Video, color: "#2563eb" },
  { name: "Camera", Icon: Camera, color: "#0891b2" },
  { name: "Coffee", Icon: Coffee, color: "#92400e" },
  { name: "Dumbbell", Icon: Dumbbell, color: "#16a34a" },
  { name: "Car", Icon: Car, color: "#475569" },
  { name: "Train", Icon: Train, color: "#0f172a" },
  { name: "Ship", Icon: Ship, color: "#1d4ed8" },
  { name: "Phone", Icon: Phone, color: "#059669" },
  { name: "Mail", Icon: Mail, color: "#7c3aed" },
  { name: "MapPin", Icon: MapPin, color: "#dc2626" },
  { name: "Clock", Icon: Clock, color: "#64748b" },
  { name: "Calendar", Icon: Calendar, color: "#2563eb" },
  { name: "Users", Icon: Users, color: "#0891b2" },
  { name: "Shield", Icon: Shield, color: "#1e40af" },
  { name: "Gift", Icon: Gift, color: "#db2777" },
  { name: "Award", Icon: Award, color: "#d97706" },
  { name: "Trophy", Icon: Trophy, color: "#b45309" },
  { name: "Sparkles", Icon: Sparkles, color: "#7c3aed" },
  { name: "Zap", Icon: Zap, color: "#ca8a04" },
  { name: "Sun", Icon: Sun, color: "#f59e0b" },
  { name: "Moon", Icon: Moon, color: "#4f46e5" },
  { name: "CloudRain", Icon: CloudRain, color: "#0284c7" },
  { name: "Snowflake", Icon: Snowflake, color: "#38bdf8" },
  { name: "Leaf", Icon: Leaf, color: "#16a34a" },
  { name: "TreePine", Icon: TreePine, color: "#15803d" },
  { name: "Mountain", Icon: Mountain, color: "#78716c" },
  { name: "Waves", Icon: Waves, color: "#0ea5e9" },
  { name: "Compass", Icon: Compass, color: "#92400e" },
  { name: "Anchor", Icon: Anchor, color: "#1e3a5f" },
];

const iconMap = Object.fromEntries(ICONS.map(({ name, Icon }) => [name, Icon]));
const colorMap = Object.fromEntries(
  ICONS.map(({ name, color }) => [name, color]),
);

function renderIcon(name, cls = "w-6 h-6") {
  const I = iconMap[name] || Folder;
  return <I className={cls} />;
}

/* ── shared input style ─────────────────────────────────────────── */
const INPUT =
  "w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 " +
  "placeholder-slate-400 text-sm font-khmer outline-none transition-all " +
  "focus:border-blue-500 focus:bg-white focus:ring-3 focus:ring-blue-100";

const LABEL =
  "block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2";

/* ── Icon Picker ─────────────────────────────────────────────────── */
function IconPicker({ value, onChange }) {
  const [search, setSearch] = useState("");
  const filtered = ICONS.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase()),
  );
  const selected = colorMap[value] || "#3b82f6";

  return (
    <div>
      <label className={LABEL}>Icon</label>

      {/* Preview */}
      <div className="flex items-center gap-3 mb-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
          style={{ background: selected + "20", color: selected }}
        >
          {renderIcon(value, "w-6 h-6")}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-700">{value}</p>
          <p className="text-xs text-slate-400">ជ្រើសរើស icon ខាងក្រោម</p>
        </div>
      </div>

      {/* Search icons */}
      <div className="relative mb-2">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search icons..."
          className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg bg-white outline-none focus:border-blue-400 transition"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-8 gap-1.5 max-h-44 overflow-y-auto p-2 border border-slate-200 rounded-xl bg-slate-50">
        {filtered.map(({ name, Icon, color }) => (
          <button
            key={name}
            type="button"
            title={name}
            onClick={() => onChange(name)}
            className={`relative w-9 h-9 rounded-lg flex items-center justify-center transition-all
              ${value === name ? "ring-2 ring-offset-1 scale-110 shadow-md" : "hover:scale-110 hover:shadow-sm bg-white"}`}
            style={
              value === name
                ? { background: color + "20", color, ringColor: color }
                : { color }
            }
          >
            <Icon className="w-4 h-4" />
            {value === name && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-2 h-2 text-white" />
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Main Component ─────────────────────────────────────────────── */
export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    code: "",
    name: "",
    name_kh: "",
    icon: "Folder",
    slug: "",
  });
  const [editingCode, setEditingCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState("idle");
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await categoryAPI.getAll();
      setCategories(res.data.categories || []);
    } catch (e) {
      console.error(e);
    }
  };

  const filteredCategories = useMemo(
    () =>
      categories.filter(
        (c) =>
          c.name_kh?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.code?.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [categories, searchTerm],
  );

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const currentCategories = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveStatus("saving");
    setLoading(true);
    try {
      if (editingCode) await categoryAPI.update(editingCode, form);
      else await categoryAPI.create(form);
      setSaveStatus("success");
      setTimeout(() => {
        setSaveStatus("idle");
        fetchCategories();
        resetForm();
        setShowForm(false);
      }, 1200);
    } catch (err) {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 2500);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (cat) => {
    setForm({
      code: cat.code,
      name: cat.name,
      name_kh: cat.name_kh,
      icon: cat.icon || "Folder",
      slug: cat.slug || "",
    });
    setEditingCode(cat.code);
    setShowForm(true);
  };

  const handleDelete = async (code) => {
    if (!window.confirm("តើអ្នកពិតជាចង់លុប Category នេះ?")) return;
    try {
      await categoryAPI.delete(code);
      fetchCategories();
    } catch {
      alert("មិនអាចលុបបានទេ។ ប្រហែលជាមាន Post កំពុងប្រើ Category នេះ។");
    }
  };

  const resetForm = () => {
    setForm({ code: "", name: "", name_kh: "", icon: "Folder", slug: "" });
    setEditingCode(null);
  };

  const SaveBtn = () => {
    const states = {
      idle: {
        icon: <Save className="w-4 h-4" />,
        label: editingCode ? "រក្សាទុកការកែ" : "បង្កើតប្រភេទ",
        cls: "from-emerald-500 to-teal-500 shadow-emerald-200",
      },
      saving: {
        icon: <RefreshCw className="w-4 h-4 animate-spin" />,
        label: "កំពុងរក្សា...",
        cls: "from-blue-500 to-cyan-500 shadow-blue-200",
      },
      success: {
        icon: <CheckCircle className="w-4 h-4" />,
        label: "រក្សាទុកបានជោគជ័យ!",
        cls: "from-emerald-500 to-green-500 shadow-emerald-200",
      },
      error: {
        icon: <AlertCircle className="w-4 h-4" />,
        label: "មានបញ្ហា! ព្យាយាមម្តងទៀត",
        cls: "from-red-500 to-rose-500 shadow-red-200",
      },
    };
    const s = states[saveStatus];
    return (
      <button
        type="submit"
        disabled={loading}
        className={`flex-1 bg-gradient-to-r ${s.cls} text-white py-3.5 rounded-xl font-bold text-sm
          flex items-center justify-center gap-2 shadow-lg transition-all font-khmer
          disabled:opacity-70 hover:shadow-xl hover:-translate-y-0.5`}
      >
        {s.icon}
        {s.label}
      </button>
    );
  };

  return (
    <div className="font-khmer">
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
            គ្រប់គ្រងប្រភេទ
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            គ្រប់គ្រង • កែប្រែ • និងបង្កើតប្រភេទ
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
          className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white shadow-lg shadow-blue-200
            bg-gradient-to-r from-[#0b2545] to-blue-600 hover:shadow-blue-300 hover:-translate-y-0.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          {showForm ? "បិទទម្រង់" : "បង្កើតប្រភេទ"}
        </button>
      </div>

      {/* ── FORM MODAL ── */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: "rgba(8,28,55,0.75)",
            backdropFilter: "blur(8px)",
          }}
          onClick={(e) => e.target === e.currentTarget && setShowForm(false)}
        >
          <div
            className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            style={{ maxHeight: "92vh" }}
          >
            {/* Stripe */}
            <div
              className="h-1 flex-shrink-0"
              style={{
                background:
                  "linear-gradient(90deg,#f59e0b,#ef4444,#8b5cf6,#06b6d4)",
              }}
            />

            {/* Header */}
            <div className="flex items-center justify-between px-7 pt-6 pb-5 border-b border-slate-100 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
                  <Layers className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-slate-800 leading-none">
                    {editingCode ? "កែប្រែប្រភេទ" : "បង្កើតប្រភេទថ្មី"}
                  </h2>
                  <p className="text-slate-400 text-xs mt-0.5">
                    {editingCode
                      ? "Update category details"
                      : "Add a new content category"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowForm(false)}
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-red-100 hover:text-red-500 text-slate-400 flex items-center justify-center transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
              <div className="px-7 py-6 space-y-5">
                {/* Code + English Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={LABEL}>
                      <span className="flex items-center gap-1.5">
                        <Hash className="w-3 h-3" />
                        Code <span className="text-blue-500">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      value={form.code}
                      required
                      disabled={!!editingCode}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          code: e.target.value
                            .toUpperCase()
                            .replace(/\s/g, "_"),
                        })
                      }
                      placeholder="TECHNOLOGY"
                      className={
                        INPUT +
                        " font-mono " +
                        (editingCode ? "opacity-60 cursor-not-allowed" : "")
                      }
                    />
                    <p className="text-xs text-slate-400 mt-1 font-khmer">
                      ត្រូវតែមានតែមួយ • មិនអាចកែបាន
                    </p>
                  </div>
                  <div>
                    <label className={LABEL}>
                      <span className="flex items-center gap-1.5">
                        <Globe className="w-3 h-3" />
                        Name (English) <span className="text-blue-500">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      required
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="Technology"
                      className={INPUT}
                    />
                  </div>
                </div>

                {/* Khmer name */}
                <div>
                  <label className={LABEL}>
                    <span className="flex items-center gap-1.5">
                      <Tag className="w-3 h-3" />
                      ឈ្មោះ (ខ្មែរ) <span className="text-blue-500">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    value={form.name_kh}
                    required
                    onChange={(e) =>
                      setForm({ ...form, name_kh: e.target.value })
                    }
                    placeholder="ឧទាហរណ៍៖ បច្ចេកវិទ្យា"
                    className={INPUT}
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className={LABEL}>
                    <span className="flex items-center gap-1.5">
                      <Link className="w-3 h-3" />
                      Slug
                    </span>
                  </label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        slug: e.target.value.toLowerCase().replace(/\s/g, "-"),
                      })
                    }
                    placeholder="technology"
                    className={INPUT + " font-mono"}
                  />
                  <p className="text-xs text-slate-400 mt-1">
                    URL friendly version e.g. /category/technology
                  </p>
                </div>

                {/* Icon picker */}
                <IconPicker
                  value={form.icon}
                  onChange={(val) => setForm({ ...form, icon: val })}
                />
              </div>

              {/* Footer */}
              <div className="flex gap-3 px-7 py-5 border-t border-slate-100 bg-slate-50/80 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setShowForm(false);
                  }}
                  className="flex-1 py-3.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-white transition-all font-khmer"
                >
                  បោះបង់
                </button>
                <SaveBtn />
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Search ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="ស្វែងរកប្រភេទតាមឈ្មោះ ឬកូដ..."
            className={INPUT + " pl-10"}
          />
        </div>
      </div>

      {/* ── Grid ── */}
      {currentCategories.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center">
          <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FolderTree className="w-10 h-10 text-slate-300" />
          </div>
          <p className="text-slate-400 font-khmer">មិនមានប្រភេទ</p>
          <button
            onClick={() => setShowForm(true)}
            className="mt-3 text-blue-500 hover:text-blue-600 text-sm font-khmer"
          >
            + បង្កើតប្រភេទថ្មី
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {currentCategories.map((cat) => {
              const accent = colorMap[cat.icon] || "#3b82f6";
              return (
                <div
                  key={cat.code}
                  className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  {/* Top colored band */}
                  <div
                    className="h-1.5"
                    style={{
                      background: `linear-gradient(90deg,${accent},${accent}80)`,
                    }}
                  />

                  <div className="p-5 text-center border-b border-slate-50">
                    {/* Icon circle */}
                    <div
                      className="w-16 h-16 mx-auto mb-3 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                      style={{
                        background: accent + "18",
                        color: accent,
                        boxShadow: `0 8px 24px ${accent}30`,
                      }}
                    >
                      {renderIcon(cat.icon || "Folder", "w-8 h-8")}
                    </div>
                    <h3 className="font-extrabold text-slate-800 text-base">
                      {cat.name_kh}
                    </h3>
                    <p className="text-slate-400 text-xs mt-0.5">{cat.name}</p>
                  </div>

                  <div className="p-4 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Hash className="w-3 h-3" />
                        Code
                      </span>
                      <span className="font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                        {cat.code}
                      </span>
                    </div>
                    {cat.slug && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 flex items-center gap-1">
                          <Link className="w-3 h-3" />
                          Slug
                        </span>
                        <span className="text-slate-600 font-mono truncate max-w-[100px]">
                          {cat.slug}
                        </span>
                      </div>
                    )}
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => handleEdit(cat)}
                        className="flex-1 py-2 rounded-lg text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 flex items-center justify-center gap-1.5 transition"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        កែប្រែ
                      </button>
                      <button
                        onClick={() => handleDelete(cat.code)}
                        className="flex-1 py-2 rounded-lg text-xs font-bold text-white bg-red-500 hover:bg-red-600 flex items-center justify-center gap-1.5 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        លុប
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                មុន
              </button>
              <div className="flex gap-1">
                {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                  let p =
                    totalPages <= 5
                      ? i + 1
                      : currentPage <= 3
                        ? i + 1
                        : currentPage >= totalPages - 2
                          ? totalPages - 4 + i
                          : currentPage - 2 + i;
                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(p)}
                      className={`w-10 h-10 rounded-xl text-sm font-bold transition ${currentPage === p ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition flex items-center gap-1"
              >
                បន្ទាប់
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      )}

      {/* Footer */}
      <div className="mt-6 text-center text-xs text-slate-400 font-khmer">
        សរុបចំនួន {filteredCategories.length} ប្រភេទ
        {searchTerm &&
          ` • (លទ្ធផល ${filteredCategories.length} ពី ${categories.length})`}
      </div>
    </div>
  );
}
