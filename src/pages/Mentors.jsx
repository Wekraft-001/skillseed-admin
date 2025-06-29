import React, { useState } from "react";
import { Input } from "../components/ui/formComponents/input";
import {
  Plus,
  Grip,
  List,
  Eye,
  MessageSquare,
  MapPin,
  Star,
  Users,
} from "lucide-react";
import MentorOnboardingModal from "../components/modals/MentorOnboardingModal";

const Mentors = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mentors = [
    {
      id: 1,
      name: "Grace E. Mensah",
      email: "grace@skillseed.com",
      location: "Kumasi, Ghana",
      expertise: "Science",
      kidsmentored: 120,
      rating: 4.9,
      clubs: ["Robotics", "Science Club"],
      image:
        "https://images.pexels.com/photos/459976/pexels-photo-459976.jpeg?auto=compress&w=120&q=80",
      expertiseColor: "bg-yellow-400/90 text-gray-800",
    },
    {
      id: 2,
      name: "Kwame Agyei",
      email: "kwame@skillseed.com",
      location: "Lagos, Nigeria",
      expertise: "Entrepreneurship",
      kidsmentored: 87,
      rating: 4.8,
      clubs: ["Entrepreneurship Club", "Young Innovators"],
      image:
        "https://images.pexels.com/photos/618158/pexels-photo-618158.jpeg?auto=compress&w=120&q=80",
      expertiseColor: "bg-blue-600/90 text-white",
    },
    {
      id: 3,
      name: "Fatima Bello",
      email: "fatima@skillseed.com",
      location: "Abuja, Nigeria",
      expertise: "Mathematics",
      kidsmentored: 101,
      rating: 4.7,
      clubs: ["Math League", "STEM Stars"],
      image:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&w=120&q=80",
      expertiseColor: "bg-yellow-400/90 text-gray-800",
    },
  ];

  return (
    <div className="bg-[#F5F7FA] min-h-[calc(100vh-80px)] relative p-5 md:p-8 w-full">
      {/* Decorative Bubbles */}
      <div className="absolute left-[-120px] top-12 w-56 h-56 bg-[#1A73E8]/10 rounded-full z-0"></div>
      <div className="absolute right-[100px] top-[20px] w-40 h-40 bg-[#1A73E8]/10 rounded-full z-0"></div>
      <div className="absolute right-[30px] bottom-[120px] w-32 h-32 bg-[#FFC107]/20 rounded-full z-0"></div>
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">Mentors</h1>
          <p className="text-gray-500">
            Discover, manage and connect with SkillSeed mentors
          </p>
        </div>
      </header>

      {/* Mentors Section */}
      <div className="relative z-10">
        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <button
              className="flex items-center bg-yellow-400 text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-yellow-400/90"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Mentor
            </button>
            <Input
              type="text"
              placeholder="Search mentors..."
              className="bg-white border border-gray-200 rounded-full px-5 py-2 focus:outline-none focus:border-blue-600 md:w-64 shadow-sm text-gray-700 w-full"
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="ml-4 text-gray-500 font-medium">View:</span>
            <button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              className={`flex items-center justify-center rounded-full w-10 h-10 ${
                viewMode === "grid"
                  ? "bg-blue-600 text-white hover:bg-blue-600/90"
                  : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white"
              }`}
              onClick={() => setViewMode("grid")}
            >
              <Grip className="w-4 h-4" />
            </button>
            <button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              className={`flex items-center justify-center rounded-full w-10 h-10 ${
                viewMode === "list"
                  ? "bg-blue-600 text-white hover:bg-blue-600/90"
                  : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white"
              }`}
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mentors List */}
        <div className="relative">
          {/* Grid View */}
          {viewMode === "grid" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {mentors.map((mentor) => (
                <div
                  key={mentor.id}
                  className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 border border-gray-200 relative overflow-hidden"
                >
                  <div className="flex items-stretch justify-between">
                    <div className="flex gap-3 mb-3">
                      <img
                        src={mentor.image}
                        alt={mentor.name}
                        className="w-16 h-16 rounded-full border-4 border-blue-600 ring-2 ring-yellow-400 object-cover shadow-md bg-white"
                      />
                      <div>
                        <h2 className="text-sm md:text-lg 2xl:text-xl font-semibold text-gray-900">
                          {mentor.name}
                        </h2>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-blue-600" />
                          <span className="text-gray-500 text-sm">
                            {mentor.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="">
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-semibold ${mentor.expertiseColor}`}
                      >
                        {mentor.expertise}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3 text-gray-600 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-yellow-400" />
                      <span>Kids Mentored: {mentor.kidsmentored}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-blue-600" />
                      <span>Rating: {mentor.rating}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap mt-2">
                    {mentor.clubs.map((club, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          index === 0
                            ? "bg-blue-600/10 text-blue-600"
                            : "bg-yellow-400/10 text-yellow-600"
                        }`}
                      >
                        {club}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      size="icon"
                      className="flex items-center justify-center rounded-full bg-blue-600 text-white w-10 h-10 hover:bg-blue-600/90"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {/* <button
                      size="icon"
                      className="flex items-center justify-center rounded-full bg-yellow-400 text-gray-900 w-10 h-10 hover:bg-yellow-400/80"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button> */}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* List View */}
          {viewMode === "list" && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="bg-blue-600/5 text-gray-900 text-base font-semibold">
                    <th className="px-6 py-4 rounded-tl-2xl">Mentor</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Expertise</th>
                    <th className="px-6 py-4">Kids Mentored</th>
                    <th className="px-6 py-4">Rating</th>
                    <th className="px-6 py-4">Clubs</th>
                    <th className="px-6 py-4 rounded-tr-2xl">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mentors.map((mentor) => (
                    <tr
                      key={mentor.id}
                      className="border-t border-gray-200 hover:bg-blue-600/5 transition"
                    >
                      <td className="px-6 py-4 flex items-center gap-3">
                        <img
                          src={mentor.image}
                          alt={mentor.name}
                          className="w-10 h-10 rounded-full border-2 border-blue-600 object-cover"
                        />
                        <div>
                          <div className="font-bold text-gray-900">
                            {mentor.name}
                          </div>
                          <div className="text-xs text-gray-400">
                            {mentor.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {mentor.location}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-semibold ${mentor.expertiseColor}`}
                        >
                          {mentor.expertise}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {mentor.kidsmentored}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-blue-600" />
                          {mentor.rating}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {mentor.clubs.map((club, index) => (
                          <span
                            key={index}
                            className={`px-2 py-1 rounded-full text-xs font-medium mr-1 ${
                              index === 0
                                ? "bg-blue-600/10 text-blue-600"
                                : "bg-yellow-400/10 text-yellow-600"
                            }`}
                          >
                            {club}
                          </span>
                        ))}
                      </td>
                      <td className="px-6 py-4 flex items-center justify-center gap-2">
                        <button
                          size="icon"
                          className="rounded-full bg-blue-600 text-white w-8 h-8 hover:bg-blue-600/90 flex items-center justify-center"
                        >
                          <Eye className="w-3 h-3" />
                        </button>
                        {/* <button
                          size="icon"
                          className="rounded-full bg-yellow-400 text-gray-900 w-8 h-8 hover:bg-yellow-400/80"
                        >
                          <MessageSquare className="w-3 h-3" />
                        </button> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Mentor Onboarding Modal */}
      <MentorOnboardingModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
};

export default Mentors;
