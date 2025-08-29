import React, { useRef, useState } from "react";
import {
  BookOpen,
  Download,
  Eye,
  FileText,
  Filter,
  GraduationCap,
  Handshake,
  Heart,
  MapPin,
  Pen,
  Play,
  Plus,
  Tags,
  Video,
  Upload,
  Hash,
  Clock,
  File,
  User,
  Calendar,
  BarChart2,
  Download as DownloadIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "../components/ui/dialog";
import { Input } from "../components/ui/formComponents/input";
import AddContentModal from "../components/modals/AddContentModal";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";

const ContentDetailsModal = ({ content, isOpen, onClose }) => {
  if (!content || !isOpen) return null;

  const getTypeDetails = () => {
    switch (content.type) {
      case "video":
        return {
          icon: <Play className="w-6 h-6 text-primary-blue" />,
          stats: [
            {
              icon: <Clock className="w-4 h-4 text-gray-500" />,
              text: content.duration || "N/A",
            },
            {
              icon: <BarChart2 className="w-4 h-4 text-gray-500" />,
              text: `${content.views} views`,
            },
          ],
        };
      case "pdf":
        return {
          icon: <FileText className="w-6 h-6 text-accent-yellow" />,
          stats: [
            {
              icon: <File className="w-4 h-4 text-gray-500" />,
              text: content.pages || "N/A",
            },
            {
              icon: <DownloadIcon className="w-4 h-4 text-gray-500" />,
              text: `${content.views} downloads`,
            },
          ],
        };
      case "article":
        return {
          icon: <BookOpen className="w-6 h-6 text-green-500" />,
          stats: [
            {
              icon: <User className="w-4 h-4 text-gray-500" />,
              text: content.author,
            },
            {
              icon: <Calendar className="w-4 h-4 text-gray-500" />,
              text: content.uploadDate,
            },
          ],
        };
      default:
        return { icon: null, stats: [] };
    }
  };

  const { icon, stats } = getTypeDetails();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary-blue/10">{icon}</div>
            <div>
              <DialogTitle className="text-xl">{content.title}</DialogTitle>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs">
                  {content.category}
                </span>
                <span>•</span>
                <span>
                  {content.type.charAt(0).toUpperCase() + content.type.slice(1)}
                </span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {content.thumbnail && (
            <div className="relative rounded-xl overflow-hidden bg-gray-100 aspect-video">
              <img
                src={content.thumbnail}
                alt={content.title}
                className="w-full h-full object-cover"
              />
              {content.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="bg-white/80 hover:bg-white transition p-4 rounded-full">
                    <Play
                      className="w-6 h-6 text-primary-blue"
                      fill="currentColor"
                    />
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                {stat.icon}
                <span className="text-gray-600">{stat.text}</span>
              </div>
            ))}
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">
                Uploaded: {content.uploadDate}
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Description</h4>
            <p className="text-gray-600 text-sm">{content.description}</p>
          </div>

          {content.tags && content.tags.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {content.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="sm:justify-between mt-6">
          <button variant="outline" onClick={onClose}>
            Close
          </button>
          <div className="flex gap-2">
            <button variant="outline" className="gap-2">
              <Pen className="w-4 h-4" />
              Edit
            </button>
            <button className="gap-2">
              {content.type === "pdf" ? (
                <>
                  <DownloadIcon className="w-4 h-4" />
                  Download
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  {content.type === "video" ? "Play Video" : "Read Article"}
                </>
              )}
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const AddCategoryModal = ({ isOpen, onClose, onAddCategory }) => {
  const [categoryName, setCategoryName] = useState("");
  const [color, setColor] = useState("#3b82f6");
  const [isLoading, setIsLoading] = useState(false);

  const colors = [
    { value: "#3b82f6", label: "Blue" },
    { value: "#10b981", label: "Green" },
    { value: "#8b5cf6", label: "Purple" },
    { value: "#f59e0b", label: "Amber" },
    { value: "#ef4444", label: "Red" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      onAddCategory({
        name: categoryName.trim(),
        color,
        count: 0,
      });
      setCategoryName("");
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] bg-slate-200">
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription>
            Create a new content category to organize your resources
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category-name">Category Name</Label>
            <div className="relative mt-2">
              <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="category-name"
                placeholder="e.g., Mathematics, Science, etc."
                className="pl-10"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Color</Label>
            <div className="flex gap-2 mt-2">
              {colors.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    color === c.value ? "ring-2 ring-offset-2 ring-primary" : ""
                  }`}
                  style={{
                    backgroundColor: c.value,
                    borderColor:
                      color === c.value ? "var(--primary)" : "transparent",
                  }}
                  onClick={() => setColor(c.value)}
                  aria-label={`Select ${c.label} color`}
                />
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Adding...
                </>
              ) : (
                "Add Category"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const Content = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadType, setUploadType] = useState();
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type and size
    const validVideoTypes = ["video/mp4", "video/webm", "video/quicktime"];
    const validPdfTypes = ["application/pdf"];
    const maxVideoSize = 500 * 1024 * 1024; // 500MB
    const maxPdfSize = 50 * 1024 * 1024; // 50MB

    if (uploadType === "video") {
      if (!validVideoTypes.includes(file.type)) {
        alert("Please upload a valid video file (MP4, WebM, or QuickTime)");
        return;
      }
      if (file.size > maxVideoSize) {
        alert("Video file is too large. Maximum size is 500MB");
        return;
      }
    } else if (uploadType === "pdf") {
      if (!validPdfTypes.includes(file.type)) {
        alert("Please upload a valid PDF file");
        return;
      }
      if (file.size > maxPdfSize) {
        alert("PDF file is too large. Maximum size is 50MB");
        return;
      }
    }

    setSelectedFile(file);
    startFileUpload(file);
  };

  const startFileUpload = (file) => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const newProgress = prev + Math.floor(Math.random() * 10) + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            setUploadProgress(0);
            setSelectedFile(null);
            // In a real app, you would handle the uploaded file here
            alert(
              `${
                uploadType === "video" ? "Video" : "PDF"
              } uploaded successfully!`
            );
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 200);
  };

  const triggerFileInput = (type) => {
    setUploadType(type);
    fileInputRef.current?.click();
  };
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const [categories, setCategories] = useState([
    { name: "Learning", color: "bg-blue-500", count: 42 },
    { name: "Mentorship", color: "bg-green-500", count: 34 },
    { name: "Parenting", color: "bg-purple-500", count: 90 },
  ]);

  const recentContent = [
    {
      id: "1",
      title: "Introduction to Mathematics",
      type: "video",
      category: "Learning",
      duration: "12 min",
      views: 1245,
      uploadDate: "2023-06-15",
      description:
        "An introductory course covering basic mathematical concepts including algebra, geometry, and arithmetic. Perfect for beginners looking to build a strong foundation in mathematics.",
      thumbnail:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      fileUrl: "#",
      author: "Dr. Sarah Johnson",
      tags: ["mathematics", "beginner", "education"],
    },
    {
      id: "2",
      title: "Parenting Guide for Digital Age",
      type: "pdf",
      category: "Parenting",
      pages: "45 pages",
      views: 892,
      uploadDate: "2023-07-01",
      description:
        "A comprehensive guide for parents navigating the challenges of raising children in the digital era. Learn about screen time management, online safety, and fostering healthy digital habits.",
      fileUrl: "#",
      author: "Michael Chen",
      tags: ["parenting", "digital", "guide"],
    },
    {
      id: "3",
      title: "Virtual Science Museum Tour",
      type: "video",
      category: "Excursions",
      duration: "25 min",
      views: 1567,
      uploadDate: "2023-07-10",
      description:
        "Take a virtual tour of the National Science Museum, exploring fascinating exhibits on physics, biology, and space exploration. Perfect for curious minds of all ages.",
      thumbnail:
        "https://images.unsplash.com/photo-1575505586569-646b2ca898fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      fileUrl: "#",
      author: "Science Explorers Team",
      tags: ["science", "virtual tour", "education"],
    },
    {
      id: "4",
      title: "Advanced Mentorship Techniques",
      type: "article",
      category: "Mentorship",
      views: 783,
      uploadDate: "2023-07-20",
      description:
        "Learn advanced techniques for effective mentorship, including active listening, goal setting, and providing constructive feedback. This article is based on the latest research in educational psychology.",
      fileUrl: "#",
      author: "Dr. Emily Rodriguez",
      tags: ["mentorship", "leadership", "education"],
    },
  ];

  const handleViewContent = (content) => {
    setSelectedContent(content);
    setIsDetailsModalOpen(true);
  };

  const handleAddCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
  };
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
            <span className="text-green-500 text-sm font-semibold">+18</span>
          </div>
          <h3 className="text-2xl font-bold text-deep-navy">247</h3>
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
            <span className="text-green-500 text-sm font-semibold">+12</span>
          </div>
          <h3 className="text-2xl font-bold text-deep-navy">89</h3>
          <p className="text-gray-500 text-sm">Books &amp; PDFs</p>
        </div>

        <div
          id="categories-card"
          className="bg-white rounded-2xl p-6 shadow-lg border border-soft-gray relative overflow-hidden"
        >
          <div className="bubble absolute -top-4 -right-4 w-16 h-16"></div>
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-500/10 p-3 rounded-full">
              <Tags className="text-green-500 w-6 h-6" />
            </div>
            <span className="text-green-500 text-sm font-semibold">+2</span>
          </div>
          <h3 className="text-2xl font-bold text-deep-navy">8</h3>
          <p className="text-gray-500 text-sm">Categories</p>
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
        {/* <div className="p-6 border-b border-soft-gray flex justify-between items-center">
          <h3 className="text-xl font-bold text-deep-navy">All Content</h3>
          <div className="flex gap-2">
            <button className="bg-soft-gray text-deep-navy px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-gray-300 transition">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="bg-accent-yellow text-deep-navy px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-accent-yellow/90 transition">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div> */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="bg-primary-blue/5 text-deep-navy text-sm font-semibold">
                <th className="px-6 py-4">Content</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Views/Downloads</th>
                <th className="px-6 py-4">Upload Date</th>
                {/* <th className="px-6 py-4">Status</th> */}
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-soft-gray hover:bg-primary-blue/5 transition">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-blue/10 p-2 rounded-full">
                      <Play
                        className="text-primary-blue w-5 h-5"
                        fill="currentColor"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-deep-navy">
                        Introduction to Science
                      </h4>
                      <p className="text-sm text-gray-500">15 minutes</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    Science
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                    Video
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-gray-500" />
                    <span>1,234</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  May 15, 2023
                </td>
                {/* <td className="px-6 py-4">
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    Published
                  </span>
                </td> */}
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
            </tbody>
          </table>
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
