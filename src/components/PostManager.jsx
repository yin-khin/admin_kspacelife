import { useState, useEffect, useMemo, useRef } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  X,
  Image as ImageIcon,
  FileText,
  Tag,
  Calendar,
  Eye,
  Save,
  RefreshCw,
  Upload,
  Type,
  Globe,
  AlignLeft,
  FolderOpen,
  CheckCircle,
  AlertCircle,
  Sparkles,
  ImagePlus,
} from "lucide-react";
import { postAPI, categoryAPI } from "../api/api";

/* ── shared styles ─────────────────────────────── */
const INPUT =
  "w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 " +
  "placeholder-slate-400 text-sm outline-none transition-all " +
  "focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100";

const LABEL =
  "block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2";

/* ── Convert plain text (with \n) → HTML ───────── */
const convertToHTML = (text) => {
  if (!text || !text.trim()) return "";

  // Already HTML → return as-is
  if (/<[a-z][\s\S]*>/i.test(text)) return text;

  // Escape HTML special chars
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Double newlines → separate <p> blocks
  const blocks = escaped.split(/\n{2,}/);
  if (blocks.length > 1) {
    return blocks
      .map((b) => (b.trim() ? `<p>${b.replace(/\n/g, "<br>")}</p>` : ""))
      .filter(Boolean)
      .join("");
  }
  return `<p>${escaped.replace(/\n/g, "<br>")}</p>`;
};

/* ── Convert HTML → plain text (for editing) ───── */
const convertToPlainText = (html) => {
  if (!html) return "";
  return html
    .replace(/<p>/gi, "")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};

/* ── Field wrapper ─────────────────────────────── */
function Field({ label, icon: Icon, required, children }) {
  return (
    <div className="group">
      <label className={LABEL}>
        {label}
        {required && <span className="text-blue-500 ml-1">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors pointer-events-none">
            <Icon className="w-4 h-4" />
          </span>
        )}
        <div className={Icon ? "[&>*]:pl-10" : ""}>{children}</div>
      </div>
    </div>
  );
}

/* ── Image drop zone ───────────────────────────── */
function DropZone({ onFiles }) {
  const [dragging, setDragging] = useState(false);
  const ref = useRef();

  const handle = (files) => {
    onFiles(Array.from(files).filter((f) => f.type.startsWith("image/")));
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        handle(e.dataTransfer.files);
      }}
      onClick={() => ref.current.click()}
      className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-200
        ${
          dragging
            ? "border-blue-500 bg-blue-50 scale-[1.01]"
            : "border-slate-200 hover:border-blue-400 hover:bg-slate-50"
        }`}
    >
      <input
        ref={ref}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={(e) => handle(e.target.files)}
      />
      <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-200">
        <ImagePlus className="w-7 h-7 text-white" />
      </div>
      <p className="font-semibold text-slate-700 text-sm">
        {dragging ? "ទម្លាក់រូបភាពនៅទីនេះ" : "ចុចដើម្បីជ្រើស ឬអូសរូបភាពមកទីនេះ"}
      </p>
      <p className="text-slate-400 text-xs mt-1">
        PNG, JPG, WEBP • អាចជ្រើសរើសបានច្រើន
      </p>
    </div>
  );
}

/* ── Image preview card with Textarea for description (multi-line) ── */
function ImageCard({ src, description, index, onRemove, onDescChange }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
      <div className="relative">
        <img src={src} className="w-full h-44 object-cover" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <button
          onClick={() => onRemove(index)}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-lg transition"
        >
          <X className="w-4 h-4" />
        </button>
        <span className="absolute bottom-2.5 left-3 text-white text-xs font-bold bg-black/30 rounded-full px-2 py-0.5">
          #{index + 1}
        </span>
      </div>
      <div className="p-3">
        <textarea
          value={description || ""}
          onChange={(e) => onDescChange(index, e.target.value)}
          placeholder="ការពណ៌នារូបភាព..."
          rows={3}
          className={INPUT + " resize-none text-sm"}
          style={{
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            overflowWrap: "break-word",
            lineHeight: "1.6",
            fontFamily:
              "'Noto Sans Khmer','Khmer OS Battambang','Khmer OS',sans-serif",
          }}
        />
        <p className="text-xs text-slate-400 mt-1">
          💡 ចុច <kbd>Enter</kbd> = បន្ទាត់ថ្មី
        </p>
      </div>
    </div>
  );
}

/* ── Main Component ─────────────────────────────── */
export default function PostManager() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: "",
    title_kh: "",
    content: "",
    category_code: "",
  });
  const [images, setImages] = useState([]);
  const [imageDescriptions, setImageDescriptions] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [existingDescriptions, setExistingDescriptions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState("idle");
  const [showForm, setShowForm] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);
  const itemsPerPage = 9;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [pRes, cRes] = await Promise.all([
        postAPI.getAll(),
        categoryAPI.getAll(),
      ]);
      setPosts(pRes.data.posts || []);
      setCategories(cRes.data.categories || []);
    } catch (e) {
      console.error(e);
    }
  };

  /* ── Filter / Sort / Paginate ── */
  const processedPosts = useMemo(() => {
    let r = [...posts];
    if (searchTerm) {
      const t = searchTerm.toLowerCase();
      r = r.filter(
        (p) =>
          p.title_kh?.toLowerCase().includes(t) ||
          p.title?.toLowerCase().includes(t),
      );
    }
    if (filterCategory) r = r.filter((p) => p.category_code === filterCategory);
    if (sortBy === "newest")
      r.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    else if (sortBy === "oldest")
      r.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    else if (sortBy === "title")
      r.sort((a, b) => a.title_kh?.localeCompare(b.title_kh));
    else if (sortBy === "views")
      r.sort((a, b) => (b.views || 0) - (a.views || 0));
    return r;
  }, [posts, searchTerm, filterCategory, sortBy]);

  const totalPages = Math.ceil(processedPosts.length / itemsPerPage);
  const currentPosts = processedPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  /* ── Image handlers ── */
  const handleImageFiles = (files) => {
    setImages(files);
    const previews = files.map((f) => URL.createObjectURL(f));
    setImagePreviews([...existingImages.map((i) => i.url), ...previews]);
    setImageDescriptions([...existingDescriptions, ...files.map(() => "")]);
  };

  const removeImage = (index) => {
    if (index < existingImages.length) {
      setExistingImages((p) => p.filter((_, i) => i !== index));
      setExistingDescriptions((p) => p.filter((_, i) => i !== index));
    } else {
      const ni = index - existingImages.length;
      setImages((p) => p.filter((_, i) => i !== ni));
    }
    setImagePreviews((p) => p.filter((_, i) => i !== index));
    setImageDescriptions((p) => p.filter((_, i) => i !== index));
  };

  /* ── Save post with HTML conversion ── */
  const savePost = async () => {
    if (!form.title_kh || !form.category_code) {
      alert("សូមបំពេញចំណងជើងខ្មែរ និងជ្រើសរើសប្រភេទ");
      return;
    }
    setSaveStatus("saving");
    setLoading(true);
    try {
      const htmlContent = convertToHTML(form.content);

      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("title_kh", form.title_kh);
      fd.append("content", htmlContent);
      fd.append("category_code", form.category_code);
      images.forEach((img) => fd.append("images", img));
      fd.append("image_descriptions", JSON.stringify(imageDescriptions));

      if (editingId) {
        if (images.length > 0) {
          await postAPI.update(editingId, fd);
        } else {
          await postAPI.update(editingId, {
            title: form.title,
            title_kh: form.title_kh,
            content: htmlContent,
            category_code: form.category_code,
          });
        }
      } else {
        await postAPI.create(fd);
      }

      setSaveStatus("success");
      setTimeout(() => {
        setSaveStatus("idle");
        fetchData();
        resetForm();
        setShowForm(false);
      }, 1200);
    } catch (err) {
      console.error(err);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 2500);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ title: "", title_kh: "", content: "", category_code: "" });
    setImages([]);
    setImagePreviews([]);
    setImageDescriptions([]);
    setExistingImages([]);
    setExistingDescriptions([]);
    setEditingId(null);
  };

  /* ── Edit: HTML → plain text for textarea ── */
  const handleEdit = (post) => {
    const plainContent = convertToPlainText(post.content || "");

    setForm({
      title: post.title || "",
      title_kh: post.title_kh || "",
      content: plainContent,
      category_code: post.category_code || "",
    });
    setEditingId(post.id);
    const imgs = (post.images || []).map((img) => ({
      url: `https://api-ksapcelife.onrender.com${img}`,
      path: img,
    }));
    setExistingImages(imgs);
    const descs = post.image_descriptions || [];
    setExistingDescriptions(descs);
    setImagePreviews(imgs.map((i) => i.url));
    setImageDescriptions(descs);
    setImages([]);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("តើអ្នកពិតជាចង់លុប Post នេះ?")) {
      await postAPI.delete(id);
      fetchData();
    }
  };

  /* ── Save button states ── */
  const SaveBtn = () => {
    const states = {
      idle: {
        icon: <Save className="w-4 h-4" />,
        label: editingId ? "រក្សាទុកការកែ" : "បង្កើតអត្ថបទ",
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
        onClick={savePost}
        disabled={loading}
        className={`flex-1 bg-gradient-to-r ${s.cls} text-white py-3.5 rounded-xl font-bold text-sm
          flex items-center justify-center gap-2 shadow-lg transition-all duration-300
          disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-xl hover:-translate-y-0.5`}
      >
        {s.icon}
        {s.label}
      </button>
    );
  };

  return (
    <>
      <style>{`
        textarea, input[type="text"], input[type="search"] {
          word-break: break-word !important;
          overflow-wrap: break-word !important;
        }
        textarea {
          white-space: pre-wrap !important;
          line-height: 1.8 !important;
        }
        .content-display p {
          margin-bottom: 1rem;
          word-break: break-word;
          overflow-wrap: break-word;
          white-space: normal;
          line-height: 1.9;
        }
        .content-display br {
          display: block;
          content: "";
          margin-top: 0.2rem;
        }
        .content-display p:last-child { margin-bottom: 0; }
        kbd {
          display: inline-block;
          padding: 1px 6px;
          font-size: 11px;
          font-weight: 600;
          border: 0.5px solid #e2e8f0;
          border-radius: 4px;
          background: #f8fafc;
          color: #1e293b;
          font-family: monospace;
        }
      `}</style>

      <div>
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
              គ្រប់គ្រងអត្ថបទ
            </h1>
            <p className="text-slate-500 text-sm mt-0.5">
              គ្រប់គ្រង • កែប្រែ • និងបង្កើតអត្ថបទ
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
            {showForm ? "បិទទម្រង់" : "បង្កើតអត្ថបទ"}
          </button>
        </div>

        {/* FORM MODAL */}
        {showForm && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
              background: "rgba(8,28,55,0.7)",
              backdropFilter: "blur(8px)",
            }}
            onClick={(e) => e.target === e.currentTarget && setShowForm(false)}
          >
            <div
              className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden flex flex-col"
              style={{ maxHeight: "92vh" }}
            >
              <div
                className="h-1 flex-shrink-0"
                style={{
                  background: "linear-gradient(90deg,#3b82f6,#06b6d4,#8b5cf6)",
                }}
              />

              {/* Modal header */}
              <div className="flex items-center justify-between px-7 pt-6 pb-5 flex-shrink-0 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-md">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-800 leading-none">
                      {editingId ? "កែប្រែអត្ថបទ" : "បង្កើតអត្ថបទថ្មី"}
                    </h2>
                    <p className="text-slate-400 text-xs mt-0.5">
                      {editingId
                        ? "កែប្រែព័ត៌មានអត្ថបទរបស់អ្នក"
                        : "បំពេញព័ត៌មានដើម្បីបោះពុម្ព"}
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

              {/* Scrollable body */}
              <div className="flex-1 overflow-y-auto px-7 py-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="ចំណងជើង (ខ្មែរ)" icon={Type} required>
                    <input
                      type="text"
                      value={form.title_kh}
                      placeholder="ចំណងជើងជាភាសាខ្មែរ..."
                      onChange={(e) =>
                        setForm({ ...form, title_kh: e.target.value })
                      }
                      className={INPUT}
                    />
                  </Field>
                  <Field label="Title (English)" icon={Globe}>
                    <input
                      type="text"
                      value={form.title}
                      placeholder="English title..."
                      onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                      }
                      className={INPUT}
                    />
                  </Field>
                </div>

                <Field label="ប្រភេទ" icon={FolderOpen} required>
                  <select
                    value={form.category_code}
                    onChange={(e) =>
                      setForm({ ...form, category_code: e.target.value })
                    }
                    className={INPUT + " appearance-none cursor-pointer"}
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 14px center",
                    }}
                  >
                    <option value="">-- ជ្រើសរើសប្រភេទ --</option>
                    {categories.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.name_kh}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="មាតិកា" icon={AlignLeft}>
                  <textarea
                    value={form.content}
                    rows={12}
                    placeholder={
                      "សរសេរមាតិការបស់អ្នកនៅទីនេះ...\n\n" +
                      "ឧទាហរណ៍:\n" +
                      "នេះជាកថាខណ្ឌទីមួយ\n" +
                      "ចុច Enter ម្តង = បន្ទាត់ថ្មីក្នុងកថាខណ្ឌដដែល\n\n" +
                      "ចុច Enter ពីរដង = កថាខណ្ឌថ្មី"
                    }
                    onChange={(e) =>
                      setForm({ ...form, content: e.target.value })
                    }
                    className={INPUT + " resize-y"}
                    style={{
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                      overflowWrap: "break-word",
                      lineHeight: "1.8",
                      fontFamily:
                        "'Noto Sans Khmer','Khmer OS Battambang','Khmer OS',sans-serif",
                      fontSize: "15px",
                      minHeight: "280px",
                    }}
                  />
                  <p className="text-xs text-slate-400 mt-2">
                    <kbd>Enter</kbd> = បន្ទាត់ថ្មី &nbsp;|&nbsp;
                    <kbd>Enter</kbd> <kbd>Enter</kbd> = កថាខណ្ឌថ្មី
                  </p>
                </Field>

                <div>
                  <label className={LABEL}>រូបភាព</label>
                  <DropZone onFiles={handleImageFiles} />
                </div>

                {imagePreviews.length > 0 && (
                  <div>
                    <label className={LABEL}>
                      រូបភាព ({imagePreviews.length})
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {imagePreviews.map((src, i) => (
                        <ImageCard
                          key={i}
                          src={src}
                          description={imageDescriptions[i]}
                          index={i}
                          onRemove={removeImage}
                          onDescChange={(idx, val) => {
                            setImageDescriptions((d) => {
                              const n = [...d];
                              n[idx] = val;
                              return n;
                            });
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3 px-7 py-5 border-t border-slate-100 bg-slate-50/80 flex-shrink-0">
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-3.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-white transition-all"
                >
                  បោះបង់
                </button>
                <SaveBtn />
              </div>
            </div>
          </div>
        )}

        {/* Search / Filter Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ស្វែងរកអត្ថបទ..."
                className={INPUT + " pl-10"}
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className={INPUT + " pl-10 appearance-none"}
              >
                <option value="">ប្រភេទទាំងអស់</option>
                {categories.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name_kh}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <ArrowUpDown className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={INPUT + " pl-10 appearance-none"}
              >
                <option value="newest">ថ្មីបំផុត</option>
                <option value="oldest">ចាស់បំផុត</option>
                <option value="title">តាមអក្ខរក្រម</option>
                <option value="views">ការមើលច្រើន</option>
              </select>
            </div>
            <div className="flex items-center justify-end">
              <span className="text-sm text-slate-500">
                សរុប:{" "}
                <strong className="text-slate-800">
                  {processedPosts.length}
                </strong>{" "}
                អត្ថបទ
              </span>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        {currentPosts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-10 h-10 text-slate-300" />
            </div>
            <p className="text-slate-400">មិនមានអត្ថបទ</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-3 text-blue-500 hover:text-blue-600 text-sm"
            >
              + បង្កើតអត្ថបទថ្មី
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {currentPosts.map((post) => (
              <div
                key={post.id}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  {post.images?.[0] ? (
                    <img
                      src={`https://api-ksapcelife.onrender.com${post.images[0]}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      alt=""
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-slate-300" />
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full px-2.5 py-1 text-xs text-white flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {post.views || 0}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Tag className="w-3.5 h-3.5 text-blue-500" />
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                      {post.category?.name_kh || post.category_code}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-800 line-clamp-2 mb-2 text-sm leading-snug group-hover:text-blue-600 transition">
                    {post.title_kh}
                  </h3>
                  <div className="flex items-center text-xs text-slate-400 mb-4">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(post.createdAt).toLocaleDateString("km-KH")}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(post);
                      }}
                      className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      កែប្រែ
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(post.id);
                      }}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      លុប
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> មុន
            </button>
            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-xl text-sm font-bold transition ${
                    currentPage === i + 1
                      ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md"
                      : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition flex items-center gap-1"
            >
              បន្ទាប់ <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Detail Modal */}
        {selectedPost && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
              background: "rgba(8,28,55,0.8)",
              backdropFilter: "blur(8px)",
            }}
            onClick={(e) =>
              e.target === e.currentTarget && setSelectedPost(null)
            }
          >
            <div
              className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden flex flex-col"
              style={{ maxHeight: "90vh" }}
            >
              <div
                className="h-1"
                style={{
                  background: "linear-gradient(90deg,#3b82f6,#06b6d4,#8b5cf6)",
                }}
              />
              <div className="sticky top-0 bg-white border-b border-slate-100 px-7 py-4 flex items-center justify-between">
                <h2 className="font-extrabold text-slate-800 text-lg line-clamp-1">
                  {selectedPost.title_kh}
                </h2>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-red-100 hover:text-red-500 text-slate-400 flex items-center justify-center transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-7">
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    {new Date(selectedPost.createdAt).toLocaleDateString(
                      "km-KH",
                    )}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-4 h-4 text-purple-400" />
                    {selectedPost.views || 0} ការមើល
                  </span>
                  <span className="flex items-center gap-1.5 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
                    <Tag className="w-3 h-3" />
                    {selectedPost.category?.name_kh}
                  </span>
                </div>

                {selectedPost.images?.length > 0 && (
                  <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedPost.images.map((img, i) => (
                      <div
                        key={i}
                        className="rounded-xl overflow-hidden border border-slate-100"
                      >
                        <img
                          src={`https://api-ksapcelife.onrender.com${img}`}
                          className="w-full h-auto"
                          alt=""
                        />
                        {selectedPost.image_descriptions?.[i] && (
                          <div className="px-3 py-2 bg-slate-50 text-xs text-slate-500 border-t border-slate-100 whitespace-pre-wrap">
                            📝 {selectedPost.image_descriptions[i]}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div
                  className="content-display"
                  style={{
                    fontSize: "16px",
                    color: "#374151",
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: selectedPost.content || "<p>មិនមានមាតិកា</p>",
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

