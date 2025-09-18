import React, { useMemo, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { X, FileImage, Send, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import Select from "react-select";
import { CategoriesDropdown } from "../Dropdown";
import { toast, ToastContainer } from "react-toastify";

const ageGroupOptions = [
  { value: "6-8", label: "6-8" },
  { value: "9-12", label: "9-12" },
  { value: "13-15", label: "13-15" },
  { value: "16-18", label: "16-18" },
];

const levelOptions = [
  { value: "Beginner", label: "Beginner" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Advanced", label: "Advanced" },
];

const ChallengeCreationModal = ({ isOpen, onClose }) => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("adminToken");

  // Form states
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    duration: "",
    theme: "",
    description: "",
    imageUrl: "",
    videoUrl: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchCategories = async () => {
    const res = await axios.get(`${apiURL}/dashboard/all-categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    // console.log("Categories from API:", res.data);
    return res.data;
  };

  const { data: categories = [] } = useQuery({
    queryKey: ["categories-for-modal"],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Format categories for react-select
  const categoryOptions = useMemo(() => {
    return categories.map((category) => ({
      value: category._id,
      label: category.name,
      ...category,
    }));
  }, [categories]);

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    // Validation
    if (!selectedCategory) {
      setSubmitError("Please select a category");
      setIsSubmitting(false);
      return;
    }
    if (!selectedAgeGroup) {
      setSubmitError("Please select an age group");
      setIsSubmitting(false);
      return;
    }
    if (!selectedLevel) {
      setSubmitError("Please select a difficulty level");
      setIsSubmitting(false);
      return;
    }

    const payload = {
      title: formData.title,
      description: formData.description,
      type: "project",
      categoryId: selectedCategory.value,
      difficultyLevel: selectedLevel.value,
      estimatedTime: formData.duration,
      theme: formData.theme,
      ageRange: selectedAgeGroup.value,
      imageUrl: formData.imageUrl || "",
      videoTutorialUrl: formData.videoUrl || "",
    };
    console.log(payload);
    try {
      const response = await axios.post(
        `${apiURL}/content/challenge`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Challenge created successfully:", response.data);

      // Reset form
      setFormData({
        title: "",
        duration: "",
        theme: "",
        description: "",
        imageUrl: "",
        videoUrl: "",
      });
      setSelectedCategory(null);
      setSelectedAgeGroup(null);
      setSelectedLevel(null);

      // Close modal
      onClose();

      // You can add a success notification here if you have a toast system
      toast.success("Challenge created successfully!");
    } catch (error) {
      console.error("Error creating challenge:", error);
      setSubmitError(
        error.response?.data?.message ||
          error.message ||
          "Failed to create challenge. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <ToastContainer />
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 bg-[#F5F7FA]">
        {/* Decorative bubbles */}
        <div
          className="absolute w-40 h-40 bg-[#1A73E8]/10 rounded-full"
          style={{ top: "-40px", left: "55%" }}
        ></div>
        <div
          className="absolute w-24 h-24 bg-pink-200/50 rounded-full"
          style={{ top: "150px", right: "60px" }}
        ></div>
        <div
          className="absolute w-32 h-32 bg-[#FFC107]/20 rounded-full"
          style={{ bottom: "40px", left: "60%" }}
        ></div>
        <div
          className="absolute w-20 h-20 bg-green-200/50 rounded-full"
          style={{ bottom: "60px", right: "80px" }}
        ></div>

        <DialogHeader className="px-6 py-3 relative z-10">
          <DialogTitle className="text-2xl font-bold text-[#0F1419]">
            Create New Challenge
          </DialogTitle>
          <p className="text-gray-500">
            Design a new challenge for students to have fun and learn!
          </p>
        </DialogHeader>

        <div className="relative max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-10 border border-gray-200 overflow-visible mb-6">
          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            {/* Error message */}
            {submitError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">
                {submitError}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col">
                <label
                  htmlFor="title"
                  className="font-semibold text-[#0F1419] mb-2"
                >
                  Challenge Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Build a Rocket from Paper"
                  className="rounded-xl border border-gray-200 bg-gray-50 px-6 py-3 text-base focus:outline-none focus:border-[#1A73E8] font-medium"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="category"
                  className="font-semibold text-[#0F1419] mb-2"
                >
                  Category
                </label>
                <Select
                  options={categoryOptions}
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  placeholder="Select Category"
                  className="w-full"
                  classNames={{
                    control: (state) =>
                      `rounded-xl border px-2 py-1 h-12 text-base font-medium ${
                        state.isFocused
                          ? "border-[#1A73E8] shadow-md"
                          : "border-gray-200"
                      }`,
                    menu: () =>
                      "bg-white border border-gray-200 rounded-xl shadow-lg",
                    option: (state) =>
                      `px-4 py-2 cursor-pointer ${
                        state.isFocused ? "bg-blue-100 text-blue-700" : ""
                      }`,
                  }}
                  isLoading={!categories.length}
                  loadingMessage={() => "Loading categories..."}
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="duration"
                  className="font-semibold text-[#0F1419] mb-2"
                >
                  Duration (minutes)
                </label>
                <input
                  id="duration"
                  name="duration"
                  type="number"
                  min="1"
                  value={formData.duration}
                  onChange={handleInputChange}
                  placeholder="e.g. 30"
                  className="rounded-xl border border-gray-200 bg-gray-50 px-6 py-3 text-base focus:outline-none focus:border-[#1A73E8] font-medium"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="theme"
                  className="font-semibold text-[#0F1419] mb-2"
                >
                  Theme
                </label>
                <input
                  id="theme"
                  name="theme"
                  type="text"
                  value={formData.theme}
                  onChange={handleInputChange}
                  placeholder="e.g. Space Exploration"
                  className="rounded-xl border border-gray-200 bg-gray-50 px-6 py-3 text-base focus:outline-none focus:border-[#1A73E8] font-medium"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold text-[#0F1419] mb-2">
                  Age Group
                </label>
                <Select
                  options={ageGroupOptions}
                  value={selectedAgeGroup}
                  onChange={setSelectedAgeGroup}
                  placeholder="Select Age Group"
                  className="w-full"
                  classNames={{
                    control: (state) =>
                      `rounded-xl border px-2 py-1 h-12 text-base font-medium ${
                        state.isFocused
                          ? "border-[#1A73E8] shadow-md"
                          : "border-gray-200"
                      }`,
                    menu: () =>
                      "bg-white border border-gray-200 rounded-xl shadow-lg",
                    option: (state) =>
                      `px-4 py-2 cursor-pointer ${
                        state.isFocused ? "bg-blue-100 text-blue-700" : ""
                      }`,
                  }}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold text-[#0F1419] mb-2">
                  Level
                </label>
                <Select
                  options={levelOptions}
                  value={selectedLevel}
                  onChange={setSelectedLevel}
                  placeholder="Select Difficulty Level"
                  className="w-full"
                  classNames={{
                    control: (state) =>
                      `rounded-xl border px-2 py-1 h-12 text-base font-medium ${
                        state.isFocused
                          ? "border-[#1A73E8] shadow-md"
                          : "border-gray-200"
                      }`,
                    menu: () =>
                      "bg-white border border-gray-200 rounded-xl shadow-lg",
                    option: (state) =>
                      `px-4 py-2 cursor-pointer ${
                        state.isFocused ? "bg-blue-100 text-blue-700" : ""
                      }`,
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="description"
                className="font-semibold text-[#0F1419] mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the challenge and how to participate..."
                className="rounded-xl border border-gray-200 bg-gray-50 px-6 py-3 text-base focus:outline-none focus:border-[#1A73E8] font-medium"
                required
              />
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex flex-col w-full md:w-1/2">
                <label className="font-semibold text-[#0F1419] mb-2">
                  Image Link
                </label>
                <input
                  name="imageUrl"
                  type="url"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  className="bg-gray-50 rounded-xl px-6 py-3 border border-gray-200 text-base focus:outline-none focus:border-[#1A73E8] font-medium"
                />
              </div>
              <div className="flex flex-col w-full md:w-1/2">
                <label className="font-semibold text-[#0F1419] mb-2">
                  Video Link
                </label>
                <input
                  name="videoUrl"
                  type="url"
                  value={formData.videoUrl}
                  onChange={handleInputChange}
                  placeholder="https://www.youtube.com/watch?v=example"
                  className="bg-gray-50 rounded-xl px-6 py-3 border border-gray-200 text-base focus:outline-none focus:border-[#1A73E8] font-medium"
                />
              </div>
            </div>

            <div className="flex justify-end items-center space-x-4 pt-6">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="rounded-full px-6 py-3 font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full px-8 py-3 bg-[#1A73E8] text-white font-bold flex items-center space-x-2 shadow-lg hover:bg-[#1A73E8]/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>{isSubmitting ? "Creating..." : "Create Challenge"}</span>
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChallengeCreationModal;
