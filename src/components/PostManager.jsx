/* eslint-disable no-restricted-globals */
// /* eslint-disable no-unused-vars */
// /* eslint-disable no-restricted-globals */

// import { useState, useEffect, useMemo, useRef } from "react";
// import {
//   Plus,
//   Edit,
//   Trash2,
//   Search,
//   Filter,
//   ArrowUpDown,
//   ChevronLeft,
//   ChevronRight,
//   X,
//   Image as ImageIcon,
//   FileText,
//   Tag,
//   Calendar,
//   Eye,
//   Save,
//   RefreshCw,
//   Upload,
//   Type,
//   Globe,
//   AlignLeft,
//   FolderOpen,
//   CheckCircle,
//   AlertCircle,
//   Sparkles,
//   ImagePlus,
// } from "lucide-react";
// import { postAPI, categoryAPI } from "../api/api";
// import { getImageUrl } from "../api/api";
// /* ── styles ─────────────────────────────── */
// const INPUT =
//   "w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100";

// const LABEL =
//   "block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2";

// /* ── HTML helpers ───────────────────────── */
// const convertToHTML = (text) => {
//   if (!text || !text.trim()) return "";
//   if (/<[a-z][\s\S]*>/i.test(text)) return text;

//   const escaped = text
//     .replace(/&/g, "&amp;")
//     .replace(/</g, "&lt;")
//     .replace(/>/g, "&gt;");

//   const blocks = escaped.split(/\n{2,}/);

//   return blocks
//     .map((b) => (b.trim() ? `<p>${b.replace(/\n/g, "<br>")}</p>` : ""))
//     .join("");
// };

// const convertToPlainText = (html) => {
//   if (!html) return "";
//   return html
//     .replace(/<p>/gi, "")
//     .replace(/<\/p>/gi, "\n\n")
//     .replace(/<br\s*\/?>/gi, "\n")
//     .replace(/&lt;/g, "<")
//     .replace(/&gt;/g, ">")
//     .replace(/&amp;/g, "&")
//     .trim();
// };

// /* ── Field ─────────────────────────────── */
// function Field({ label, icon: Icon, required, children }) {
//   return (
//     <div>
//       <label className={LABEL}>
//         {label} {required && <span className="text-blue-500">*</span>}
//       </label>
//       <div className="relative">
//         {Icon && (
//           <Icon className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
//         )}
//         <div className={Icon ? "[&>*]:pl-10" : ""}>{children}</div>
//       </div>
//     </div>
//   );
// }

// /* ── DropZone ───────────────────────────── */
// function DropZone({ onFiles }) {
//   const ref = useRef();

//   const handle = (files) => {
//     onFiles(Array.from(files).filter((f) => f.type.startsWith("image/")));
//   };

//   return (
//     <div
//       onClick={() => ref.current.click()}
//       onDrop={(e) => {
//         e.preventDefault();
//         handle(e.dataTransfer.files);
//       }}
//       onDragOver={(e) => e.preventDefault()}
//       className="border-2 border-dashed p-6 rounded-xl text-center cursor-pointer"
//     >
//       <input
//         ref={ref}
//         type="file"
//         multiple
//         accept="image/*"
//         hidden
//         onChange={(e) => handle(e.target.files)}
//       />
//       <ImagePlus className="mx-auto w-6 h-6" />
//       <p className="text-sm mt-2">Upload images</p>
//     </div>
//   );
// }

// /* ── Image Card ─────────────────────────── */
// function ImageCard({ src, index, onRemove }) {
//   return (
//     <div className="border rounded-xl overflow-hidden">
//       <img src={src} className="w-full h-40 object-cover" alt="" />
//       <button
//         onClick={() => onRemove(index)}
//         className="absolute mt-2 ml-2 bg-red-500 text-white p-1 rounded"
//       >
//         <X className="w-4 h-4" />
//       </button>
//     </div>
//   );
// }

// /* ── MAIN COMPONENT ─────────────────────── */
// export default function PostManager() {
//   const [posts, setPosts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [form, setForm] = useState({
//     title: "",
//     title_kh: "",
//     content: "",
//     category_code: "",
//   });

//   const [images, setImages] = useState([]);
//   const [imagePreviews, setImagePreviews] = useState([]);
//   const [imageDescriptions, setImageDescriptions] = useState([]);
//   const [existingImages, setExistingImages] = useState([]);

//   const [editingId, setEditingId] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [selectedPost, setSelectedPost] = useState(null);

//   /* ── fetch ── */
//   useEffect(() => {
//     (async () => {
//       const [p, c] = await Promise.all([
//         postAPI.getAll(),
//         categoryAPI.getAll(),
//       ]);
//       setPosts(p.data.posts || []);
//       setCategories(c.data.categories || []);
//     })();
//   }, []);

//   /* ── IMAGE HANDLER ── */
//   const handleImageFiles = (files) => {
//     const arr = Array.from(files);
//     setImages(arr);

//     const previews = arr.map((f) => URL.createObjectURL(f));
//     setImagePreviews(previews);
//     setImageDescriptions(arr.map(() => ""));
//   };

//   const removeImage = (index) => {
//     setImages((p) => p.filter((_, i) => i !== index));
//     setImagePreviews((p) => p.filter((_, i) => i !== index));
//     setImageDescriptions((p) => p.filter((_, i) => i !== index));
//   };

//   /* ── SAVE ── */
//   const savePost = async () => {
//     const fd = new FormData();
//     fd.append("title", form.title);
//     fd.append("title_kh", form.title_kh);
//     fd.append("content", convertToHTML(form.content));
//     fd.append("category_code", form.category_code);

//     images.forEach((img) => fd.append("images", img));
//     fd.append("image_descriptions", JSON.stringify(imageDescriptions));

//     if (editingId) {
//       await postAPI.update(editingId, fd);
//     } else {
//       await postAPI.create(fd);
//     }

//     setShowForm(false);
//   };

//   /* ── EDIT ── */
//   const handleEdit = (post) => {
//     setForm({
//       title: post.title || "",
//       title_kh: post.title_kh || "",
//       content: convertToPlainText(post.content || ""),
//       category_code: post.category_code || "",
//     });

//     setEditingId(post.id);

//     // ❌ NO PREFIX HERE (IMPORTANT FIX)
//     const imgs = (post.images || []).map((img) => ({
//       url: img,
//     }));

//     setExistingImages(imgs);
//     setImagePreviews(imgs.map((i) => i.url));
//     setImageDescriptions(post.image_descriptions || []);
//     setImages([]);
//     setShowForm(true);
//   };

//   /* ── DELETE ── */
//   const handleDelete = async (id) => {
//     if (confirm("Delete this post?")) {
//       await postAPI.delete(id);
//       setPosts((p) => p.filter((x) => x.id !== id));
//     }
//   };

//   return (
//     <div className="p-6">
//       {/* CREATE BUTTON */}
//       <button
//         onClick={() => setShowForm(true)}
//         className="bg-blue-600 text-white px-4 py-2 rounded"
//       >
//         Create Post
//       </button>

//       {/* POSTS */}
//       <div className="grid grid-cols-3 gap-4 mt-6">
//         {posts.map((post) => (
//           <div
//             key={post.id}
//             className="border rounded-xl overflow-hidden shadow"
//           >
//             {/* ✅ FIXED IMAGE LOGIC */}
//             {post.images?.length > 0 ? (
//               <img
//                 src={post.images[0]}
//                 className="w-full h-40 object-cover"
//                 alt=""
//               />
//             ) : (
//               <div className="h-40 flex items-center justify-center">
//                 <ImageIcon />
//               </div>
//             )}

//             <div className="p-3">
//               <h3 className="font-bold">{post.title_kh}</h3>

//               <div className="flex gap-2 mt-2">
//                 <button
//                   onClick={() => handleEdit(post)}
//                   className="bg-yellow-500 px-2 py-1 text-white rounded"
//                 >
//                   Edit
//                 </button>

//                 <button
//                   onClick={() => handleDelete(post.id)}
//                   className="bg-red-500 px-2 py-1 text-white rounded"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* DETAIL MODAL */}
//       {selectedPost && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
//           <div className="bg-white p-6 w-[600px]">
//             <button onClick={() => setSelectedPost(null)}>
//               <X />
//             </button>

//             {selectedPost.images?.map((img, i) => (
//               <img key={i} src={img} className="w-full mb-2" alt="" />
//             ))}

//             <div
//               dangerouslySetInnerHTML={{
//                 __html: selectedPost.content,
//               }}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import { useState, useEffect, useRef } from "react";
import {
  Plus,
  Edit,
  Trash2,
  X,
  Image as ImageIcon,
  ImagePlus,
} from "lucide-react";

import { postAPI, categoryAPI, getImageUrl } from "../api/api";

/* =========================
   MAIN COMPONENT
========================= */

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
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageDescriptions, setImageDescriptions] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  /* =========================
     FETCH POSTS
  ========================= */

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [p, c] = await Promise.all([
        postAPI.getAll(),
        categoryAPI.getAll(),
      ]);

      setPosts(p.data.posts || []);
      setCategories(c.data.categories || []);
    } catch (err) {
      console.log(err);
    }
  };

  /* =========================
     HTML HELPERS
  ========================= */

  const convertToHTML = (text) => {
    if (!text || !text.trim()) return "";

    return text
      .split("\n\n")
      .map((p) => `<p>${p.replace(/\n/g, "<br>")}</p>`)
      .join("");
  };

  const convertToPlainText = (html) => {
    if (!html) return "";

    return html
      .replace(/<p>/gi, "")
      .replace(/<\/p>/gi, "\n\n")
      .replace(/<br\s*\/?>/gi, "\n");
  };

  /* =========================
     IMAGE HANDLER
  ========================= */

  const handleImageFiles = (files) => {
    const arr = Array.from(files);

    setImages(arr);

    const previews = arr.map((file) => URL.createObjectURL(file));

    setImagePreviews(previews);

    setImageDescriptions(arr.map(() => ""));
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));

    setImagePreviews((prev) => prev.filter((_, i) => i !== index));

    setImageDescriptions((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  /* =========================
     SAVE POST
  ========================= */

  const savePost = async () => {
    try {
      const fd = new FormData();

      fd.append("title", form.title);
      fd.append("title_kh", form.title_kh);
      fd.append("content", convertToHTML(form.content));
      fd.append("category_code", form.category_code);

      images.forEach((img) => {
        fd.append("images", img);
      });

      fd.append(
        "image_descriptions",
        JSON.stringify(imageDescriptions)
      );

      if (editingId) {
        await postAPI.update(editingId, fd);
      } else {
        await postAPI.create(fd);
      }

      resetForm();

      fetchData();

      setShowForm(false);
    } catch (err) {
      console.log(err);
    }
  };

  /* =========================
     EDIT
  ========================= */

  const handleEdit = (post) => {
    setForm({
      title: post.title || "",
      title_kh: post.title_kh || "",
      content: convertToPlainText(post.content || ""),
      category_code: post.category_code || "",
    });

    setEditingId(post.id);

    const imgs = (post.images || []).map((img) => ({
      url: getImageUrl(img),
    }));

    setImagePreviews(imgs.map((i) => i.url));

    setImageDescriptions(post.image_descriptions || []);

    setImages([]);

    setShowForm(true);
  };

  /* =========================
     DELETE
  ========================= */

  const handleDelete = async (id) => {
    if (confirm("Delete this post?")) {
      await postAPI.delete(id);

      setPosts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  /* =========================
     RESET
  ========================= */

  const resetForm = () => {
    setForm({
      title: "",
      title_kh: "",
      content: "",
      category_code: "",
    });

    setImages([]);
    setImagePreviews([]);
    setImageDescriptions([]);
    setEditingId(null);
  };

  return (
    <div className="p-6">
      {/* CREATE BUTTON */}

      <button
        onClick={() => {
          resetForm();
          setShowForm(true);
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        <Plus className="w-4 h-4 inline mr-1" />
        Create Post
      </button>

      {/* POSTS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border rounded-xl overflow-hidden shadow bg-white"
          >
            {/* IMAGE */}

            {post.images?.length > 0 ? (
              <img
                src={getImageUrl(post.images[0])}
                onError={(e) => {
                  e.target.src = "/no-image.png";
                }}
                className="w-full h-48 object-cover"
                alt=""
              />
            ) : (
              <div className="h-48 flex items-center justify-center bg-gray-100">
                <ImageIcon className="w-10 h-10 text-gray-400" />
              </div>
            )}

            {/* CONTENT */}

            <div className="p-4">
              <h3 className="font-bold text-lg">
                {post.title_kh}
              </h3>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEdit(post)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  <Edit className="w-4 h-4 inline mr-1" />
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(post.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  <Trash2 className="w-4 h-4 inline mr-1" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}

      {selectedPost && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-6">
          <div className="bg-white max-w-2xl w-full p-6 rounded-xl overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedPost(null)}
              className="mb-4"
            >
              <X />
            </button>

            {selectedPost.images?.map((img, i) => (
              <img
                key={i}
                src={getImageUrl(img)}
                className="w-full rounded mb-3"
                alt=""
              />
            ))}

            <div
              dangerouslySetInnerHTML={{
                __html: selectedPost.content,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}


