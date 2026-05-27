// components/CommentManager.jsx
import { useState, useEffect } from "react";
import {
  MessageCircle,
  CheckCircle,
  XCircle,
  AlertCircle,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
  Clock,
  Mail,
  Calendar,
  RefreshCw,
} from "lucide-react";
import { commentAPI } from "../api/api";

const STATUS_COLORS = {
  approved: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  spam: "bg-red-100 text-red-700",
};

const STATUS_ICONS = {
  approved: <CheckCircle className="w-3.5 h-3.5" />,
  pending: <Clock className="w-3.5 h-3.5" />,
  spam: <AlertCircle className="w-3.5 h-3.5" />,
};

const STATUS_LABELS = {
  approved: "បានអនុម័ត",
  pending: "កំពុងរង់ចាំ",
  spam: "ស្ប៉ាម",
};

export default function CommentManager() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchComments();
  }, [currentPage, filterStatus]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await commentAPI.getAll(currentPage, 10, filterStatus);
      setComments(res.data.comments || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    setActionLoading(id);
    try {
      await commentAPI.updateStatus(id, status);
      fetchComments();
    } catch (error) {
      console.error("Error updating comment status:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("តើអ្នកពិតជាចង់លុបមតិយោបល់នេះ?")) {
      setActionLoading(id);
      try {
        await commentAPI.delete(id);
        fetchComments();
      } catch (error) {
        console.error("Error deleting comment:", error);
      } finally {
        setActionLoading(null);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("km-KH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredComments = comments.filter(
    (comment) =>
      comment.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.content?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    all: comments.length,
    pending: comments.filter(c => c.status === "pending").length,
    approved: comments.filter(c => c.status === "approved").length,
    spam: comments.filter(c => c.status === "spam").length,
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-md">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">គ្រប់គ្រងមតិយោបល់</h2>
              <p className="text-slate-500 text-sm mt-0.5">
                គ្រប់គ្រង អនុម័ត និងលុបមតិយោបល់
              </p>
            </div>
          </div>
          <button
            onClick={fetchComments}
            className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition"
            title="Refresh"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
        <div className="flex flex-wrap gap-3">
          <div className="bg-white rounded-xl px-4 py-2 shadow-sm">
            <div className="text-slate-600 font-bold">{stats.all}</div>
            <div className="text-xs text-slate-400">សរុប</div>
          </div>
          <div className="bg-yellow-50 rounded-xl px-4 py-2">
            <div className="text-yellow-600 font-bold">{stats.pending}</div>
            <div className="text-xs text-yellow-500">កំពុងរង់ចាំ</div>
          </div>
          <div className="bg-green-50 rounded-xl px-4 py-2">
            <div className="text-green-600 font-bold">{stats.approved}</div>
            <div className="text-xs text-green-500">បានអនុម័ត</div>
          </div>
          <div className="bg-red-50 rounded-xl px-4 py-2">
            <div className="text-red-600 font-bold">{stats.spam}</div>
            <div className="text-xs text-red-500">ស្ប៉ាម</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 border-b border-slate-100">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="ស្វែងរកមតិយោបល់..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
            />
          </div>
          <div className="flex gap-2">
            {["all", "pending", "approved", "spam"].map((status) => (
              <button
                key={status}
                onClick={() => {
                  setFilterStatus(status);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                  filterStatus === status
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {status === "all" && "ទាំងអស់"}
                {status === "pending" && "កំពុងរង់ចាំ"}
                {status === "approved" && "បានអនុម័ត"}
                {status === "spam" && "ស្ប៉ាម"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-pulse">
              <div className="w-12 h-12 bg-slate-200 rounded-full mx-auto mb-4"></div>
              <div className="h-4 bg-slate-200 rounded w-32 mx-auto"></div>
            </div>
          </div>
        ) : filteredComments.length === 0 ? (
          <div className="text-center py-12">
            <MessageCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">មិនមានមតិយោបល់</p>
          </div>
        ) : (
          filteredComments.map((comment) => (
            <div key={comment.id} className="p-5 hover:bg-slate-50/50 transition">
              <div className="flex flex-wrap gap-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    {comment.user_name?.charAt(0).toUpperCase() || "U"}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="font-semibold text-slate-800">
                      {comment.user_name}
                    </span>
                    {comment.user_email && (
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Mail className="w-3 h-3" /> {comment.user_email}
                      </span>
                    )}
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(comment.createdAt)}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[comment.status]}`}
                    >
                      {STATUS_ICONS[comment.status]}
                      {STATUS_LABELS[comment.status]}
                    </span>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                    {comment.content}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {comment.status !== "approved" && (
                      <button
                        onClick={() => handleUpdateStatus(comment.id, "approved")}
                        disabled={actionLoading === comment.id}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-green-50 text-green-600 hover:bg-green-100 transition disabled:opacity-50"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        អនុម័ត
                      </button>
                    )}
                    {comment.status !== "spam" && (
                      <button
                        onClick={() => handleUpdateStatus(comment.id, "spam")}
                        disabled={actionLoading === comment.id}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 transition disabled:opacity-50"
                      >
                        <AlertCircle className="w-3.5 h-3.5" />
                        សម្គាល់ជាស្ប៉ាម
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(comment.id)}
                      disabled={actionLoading === comment.id}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-600 hover:bg-red-100 hover:text-red-600 transition disabled:opacity-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      លុប
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-slate-100 flex justify-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-50 transition"
          >
            <ChevronLeft className="w-4 h-4 inline" /> មុន
          </button>
          <div className="flex gap-1">
            {[...Array(Math.min(totalPages, 5))].map((_, i) => {
              let pageNum = i + 1;
              if (totalPages > 5 && currentPage > 3) {
                pageNum = currentPage - 2 + i;
                if (pageNum > totalPages) return null;
              }
              return (
                <button
                  key={i}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-10 h-10 rounded-lg text-sm transition ${
                    currentPage === pageNum
                      ? "bg-blue-500 text-white shadow-md"
                      : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-50 transition"
          >
            បន្ទាប់ <ChevronRight className="w-4 h-4 inline" />
          </button>
        </div>
      )}
    </div>
  );
}