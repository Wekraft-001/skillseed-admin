import React, { useState } from "react";
import { X, FileImage, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import Select from "react-select";

const categoryOptions = [
  { value: "Science", label: "Science" },
  { value: "Technology", label: "Technology" },
  { value: "Entrepreneurship", label: "Entrepreneurship" },
  { value: "Mathematics", label: "Mathematics" },
];

const ageGroupOptions = [
  { value: "6-8", label: "6-8" },
  { value: "9-12", label: "9-12" },
  { value: "13-15", label: "13-15" },
  { value: "16-17", label: "16-17" },
];

const ChallengeCreationModal = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Challenge created!");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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

        <DialogHeader className="p-8 pb-4 relative z-10">
          <DialogTitle className="text-3xl font-bold text-[#0F1419] mb-1">
            Create New Challenge
          </DialogTitle>
          <p className="text-gray-500">
            Design a new challenge for students to have fun and learn!
          </p>
        </DialogHeader>

        <div className="relative max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-10 border border-gray-200 overflow-visible mb-8">
          {/* <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
            <img
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg"
              className="w-24 h-24 rounded-full border-4 border-[#FFC107] bg-white object-cover shadow-xl"
              alt="Baby Avatar"
            />
          </div> */}

          <form onSubmit={handleSubmit} className=" space-y-8 relative z-10">
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
                  type="text"
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
                  onChange={setSelectedCategory}
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
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="duration"
                  className="font-semibold text-[#0F1419] mb-2"
                >
                  Duration (days)
                </label>
                <input
                  id="duration"
                  type="number"
                  min="1"
                  max="30"
                  placeholder="e.g. 7"
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
                  type="text"
                  placeholder="e.g. Space Exploration"
                  className="rounded-xl border border-gray-200 bg-gray-50 px-6 py-3 text-base focus:outline-none focus:border-[#1A73E8] font-medium"
                  required
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
                rows={4}
                placeholder="Describe the challenge and how to participate..."
                className="rounded-xl border border-gray-200 bg-gray-50 px-6 py-3 text-base focus:outline-none focus:border-[#1A73E8] font-medium"
                required
              />
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex flex-col w-full md:w-1/2">
                <label className="font-semibold text-[#0F1419] mb-2">
                  Upload Supporting Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="file:rounded-full file:bg-[#1A73E8] file:text-white file:px-5 file:py-2 file:border-none file:font-semibold file:cursor-pointer bg-gray-50 rounded-xl px-3 py-2 border border-gray-200"
                />
              </div>
              <div className="flex flex-col w-full md:w-1/2">
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
            </div>

            <div className="flex flex-col w-full">
                <label className="font-semibold text-[#0F1419] mb-2">
                  Add Url for Demo Video
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="file:rounded-full file:bg-[#1A73E8] file:text-white file:px-5 file:py-2 file:border-none file:font-semibold file:cursor-pointer bg-gray-50 rounded-xl px-3 py-2 border border-gray-200"
                />
              </div>

            <div className="flex justify-end items-center space-x-4 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full px-6 py-3 font-semibold border"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-full px-8 py-3 bg-[#1A73E8] text-white font-bold flex items-center space-x-2 shadow-lg hover:bg-[#1A73E8]/90"
              >
                <Send className="w-4 h-4" />
                <span>Create Challenge</span>
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChallengeCreationModal;
