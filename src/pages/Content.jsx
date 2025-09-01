import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  BookOpen,
  Eye,
  Pen,
  Play,
  Plus,
  Tags,
  Download as DownloadIcon,
} from "lucide-react";
import AddContentModal from "../components/modals/AddContentModal";
import { SkeletonList } from "../components/LoadingSkeleton";

const Content = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("adminToken");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const fetchContent = async () => {
    const res = await axios.get(`${apiURL}/content`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log(res.data);
    return res.data;
  };

  const { data: contents = [], isLoading } = useQuery({
    queryKey: ["contents"],
    queryFn: fetchContent,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Paginated contents
  const startIndex = (page - 1) * pageSize;
  const paginatedContents = contents.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(contents.length / pageSize);

  const videoCount = contents.filter((c) => c.type === "video").length;
  const bookCount = contents.filter((c) => c.type === "book").length;
  const totalCount = contents.length;
  return (
    <div id="main-content" className="p-8 w-full max-w-[1800px]">
      <header id="header" className="flex justify-between items-center mb-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-deep-navy">
            Content Management
          </h1>
          <p className="text-gray-500">
            Upload and manage learning resources for parents, mentors, and
            schools
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#FFC107] text-[#0F1419] px-6 py-3 rounded-full font-semibold hover:bg-[#FFC107]/60 transition flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          Add Content
        </button>
      </header>
      {/* CONTENT STATS */}
      {/* <div
        id="stats-overview"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      > */}
      <div
        id="stats-overview"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        <div
          id="videos-card"
          className="bg-white rounded-2xl p-6 shadow-lg border border-soft-gray relative overflow-hidden"
        >
          <div className="bubble bubble-yellow absolute -top-4 -right-4 w-16 h-16"></div>
          <div className="flex items-center justify-between mb-4">
            <div className="bg-primary-blue/10 p-3 rounded-full">
              <Play className="w-6 h-6 text-primary-blue text-xl" />
            </div>
            {/* <span className="text-green-500 text-sm font-semibold">+18</span> */}
          </div>
          <h3 className="text-2xl font-bold text-deep-navy">{videoCount}</h3>
          <p className="text-gray-500 text-sm">Video Content</p>
        </div>

        <div
          id="books-card"
          className="bg-white rounded-2xl p-6 shadow-lg border border-soft-gray relative overflow-hidden"
        >
          <div className="bubble bubble-pink absolute -top-4 -right-4 w-16 h-16"></div>
          <div className="flex items-center justify-between mb-4">
            <div className="bg-accent-yellow/10 p-3 rounded-full">
              <BookOpen className="text-accent-yellow w-6 h-6" />
            </div>
            {/* <span className="text-green-500 text-sm font-semibold">+12</span> */}
          </div>
          <h3 className="text-2xl font-bold text-deep-navy">{bookCount}</h3>
          <p className="text-gray-500 text-sm">Books &amp; PDFs</p>
        </div>

        <div
          id="categories-card"
          className="bg-white rounded-2xl p-6 shadow-lg border border-soft-gray relative overflow-hidden"
        >
          <div className="bubble absolute -top-4 -right-4 w-16 h-16"></div>
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-500/10 p-3 rounded-full">
              <Eye className="text-green-500 w-6 h-6" />
            </div>
            {/* <span className="text-green-500 text-sm font-semibold">+2</span> */}
          </div>
          <h3 className="text-2xl font-bold text-deep-navy">8</h3>
          <p className="text-gray-500 text-sm">Total Views</p>
        </div>

        {/* <div
          id="downloads-card"
          className="bg-white rounded-2xl p-6 shadow-lg border border-soft-gray relative overflow-hidden"
        >
          <div className="bubble bubble-yellow absolute -top-4 -right-4 w-16 h-16"></div>
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-500/10 p-3 rounded-full">
              <Download className="text-purple-500 w-6 h-6" />
            </div>
            <span className="text-green-500 text-sm font-semibold">+324</span>
          </div>
          <h3 className="text-2xl font-bold text-deep-navy">12.4K</h3>
          <p className="text-gray-500 text-sm">Total Downloads</p>
        </div> */}
      </div>

      <div
        id="content-table"
        className="bg-white rounded-2xl shadow-lg border border-soft-gray overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="bg-primary-blue/5 text-deep-navy text-sm font-semibold">
                <th className="px-6 py-4">Content</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Views/Downloads</th>
                <th className="px-6 py-4">Upload Date</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? Array.from({ length: pageSize }).map((_, i) => (
                    <SkeletonList key={i} />
                  ))
                : paginatedContents.map((content, index) => {
                    const Icon =
                      content?.type === "video"
                        ? Play
                        : content?.type === "book"
                        ? BookOpen
                        : Play;

                    return (
                      <tr
                        key={index}
                        className="border-t border-soft-gray hover:bg-primary-blue/5 transition"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="bg-primary-blue/10 p-2 rounded-full">
                              <Icon className="w-5 h-5 text-primary-blue" />
                            </div>
                            <div>
                              <h4 className="font-medium text-deep-navy">
                                {content?.title}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {content?.author}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                            {content?.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4 text-gray-500" />
                            <span>{content?.views || "—"}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(content?.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="p-1.5 text-gray-500 hover:text-primary-blue transition">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 text-gray-500 hover:text-accent-yellow transition">
                              <Pen className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 text-gray-500 hover:text-red-500 transition">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
          {/* Pagination Controls */}
          <div className="flex justify-end items-center m-5 gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1 rounded border disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Page {page} of {totalPages || 1}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 rounded border disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Add Content Modal */}
      <AddContentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

export default Content;
