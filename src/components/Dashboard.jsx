import { useState, useEffect } from "react";
import {
  FileText,
  FolderTree,
  Eye,
  TrendingUp,
  Calendar,
  Image as ImageIcon,
  ArrowRight,
} from "lucide-react";
import { postAPI, categoryAPI } from "../api/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalCategories: 0,
    recentPosts: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const [postsRes, catsRes] = await Promise.all([
        postAPI.getAll(),
        categoryAPI.getAll(),
      ]);

      setStats({
        totalPosts: postsRes.data.posts.length,
        totalCategories: catsRes.data.categories.length,
        recentPosts: postsRes.data.posts.slice(0, 5),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Gradient colors for cards
  const cards = [
    {
      title: "អត្ថបទសរុប",
      value: stats.totalPosts,
      icon: FileText,
      gradient: "from-blue-500 to-blue-600",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "ប្រភេទសរុប",
      value: stats.totalCategories,
      icon: FolderTree,
      gradient: "from-green-500 to-green-600",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "អ្នកមើលថ្ងៃនេះ",
      value: "128",
      icon: Eye,
      gradient: "from-purple-500 to-purple-600",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            ស្វាគមន៍មកកាន់ទំព័រដឹកនាំ
          </h1>
          <p className="text-gray-500 mt-2">
            សូមស្វាគមន៍! នេះជាស្ថិតិនៃប្រព័ន្ធរបស់អ្នក
          </p>
        </div>
        <div className="hidden md:block">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-3">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      {/* Statistics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div
                className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.gradient} opacity-10 rounded-bl-full`}
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${card.iconBg} p-3 rounded-xl`}>
                    <Icon className={`w-6 h-6 ${card.iconColor}`} />
                  </div>
                  <span className="text-4xl font-bold text-gray-300">
                    {String(card.value).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">
                  {card.value}
                </h3>
                <p className="text-gray-600 text-sm">{card.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Posts Section */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                អត្ថបទថ្មីៗ
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                អត្ថបទដែលបានបង្កើតថ្មីៗចំនួន 5
              </p>
            </div>
            <button
              onClick={() => (window.location.href = "#/posts")}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
            >
              មើលទាំងអស់
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {loading ? (
            // Loading skeletons
            [...Array(5)].map((_, i) => (
              <div key={i} className="p-4 animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))
          ) : stats.recentPosts.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">មិនទាន់មានអត្ថបទនៅឡើយទេ</p>
            </div>
          ) : (
            stats.recentPosts.map((post, index) => (
              <div
                key={post.id}
                className="group hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="p-4 flex items-center gap-4">
                  {/* Image */}
                  <div className="relative">
                    {post.images?.[0] ? (
                      <img
                        src={`https://api-ksapcelife.onrender.com${post.images[0]}`}
                        className="w-20 h-20 object-cover rounded-xl shadow-md group-hover:shadow-lg transition-shadow"
                        alt={post.title_kh}
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute -top-2 -left-2 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                      {index + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {post.title_kh}
                    </h3>
                    <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.createdAt).toLocaleDateString("km-KH", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      {post.category && (
                        <span className="flex items-center gap-1">
                          <FolderTree className="w-3 h-3" />
                          {post.category.name_kh}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* View button */}
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-5 h-5 text-blue-500" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-2">បង្កើតអត្ថបទថ្មី</h3>
          <p className="text-blue-100 mb-4">
            ចាប់ផ្តើមសរសេរអត្ថបទថ្មីបន្ថែមទៀត
          </p>
          <button
            onClick={() => (window.location.href = "#/posts")}
            className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            + បង្កើតថ្មី
          </button>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-2">គ្រប់គ្រងប្រភេទ</h3>
          <p className="text-purple-100 mb-4">បន្ថែម ឬកែប្រែប្រភេទអត្ថបទ</p>
          <button
            onClick={() => (window.location.href = "#/categories")}
            className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-purple-50 transition-colors"
          >
            📂 គ្រប់គ្រង
          </button>
        </div>
      </div>
    </div>
  );
}
