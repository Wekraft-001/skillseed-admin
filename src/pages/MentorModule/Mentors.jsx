import React, { useState } from "react";
import { Input } from "../../components/ui/formComponents/input";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
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
import MentorOnboardingModal from "../../components/modals/MentorOnboardingModal";
import { SkeletonCard, SkeletonList } from "../../components/LoadingSkeleton";
import { Card } from "../../components/ui/card";
import { useNavigate } from "react-router-dom";

const Mentors = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("adminToken");
  const [viewMode, setViewMode] = useState("grid");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();

  const mentors1 = [
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

  const getSpecialtyColor = (specialty) => {
    switch (specialty) {
      case "Entrepreneur":
        return "bg-[#FFC107]/90 text-gray-800";
      case "Technology":
        return "bg-[#1A73E8]/90 text-white";
      case "Science":
        return "bg-[#FFC107]/90 text-gray-800";
      default:
        return "bg-[#FFC107] text-gray-800";
    }
  };

  const fetchMentors = async () => {
    const res = await axios.get(`${apiURL}/mentors/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log(res.data);
    return res.data;
  };

  const {
    data: mentors = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["mentors"],
    queryFn: fetchMentors,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentMentors = mentors.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(mentors.length / itemsPerPage);

  const handleViewMentor = (mentorId) => {
    navigate(`/mentors/mentor-details/${mentorId}`);
  };
  const handleViewCredentails = (mentorId) => {
    navigate("/mentors/credentials");
  };
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
          <button
            className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-400/90"
            onClick={handleViewCredentails}
          >
            <Eye className="w-4 h-4 mr-2" />
            View Credentials
          </button>
          {/* <div className="flex items-center gap-3">
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
          </div> */}
        </div>

        {/* Mentors List */}
        <div className="relative hidden">
          {isLoading ? (
            viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow p-4">
                <table className="min-w-full">
                  <tbody>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <SkeletonList key={i} />
                    ))}
                  </tbody>
                </table>
              </div>
            )
          ) : isError ? (
            <div className="text-red-500">Error: {error?.message}</div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {currentMentors.map((mentor) => (
                <div key={mentor.id} className="bg-white rounded-xl shadow p-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={mentor.image}
                      alt={mentor.firstName}
                      className="w-16 h-16 rounded-full object-cover border-2 border-blue-600"
                    />
                    <div>
                      <h2 className="font-semibold text-gray-900">
                        {mentor.firstName + " " + mentor.lastName}
                      </h2>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <MapPin className="w-4 h-4" />{" "}
                        {mentor?.city + ", " + mentor?.country}
                      </p>
                    </div>
                  </div>
                  {/* <div className="mt-3 text-sm text-gray-600">
                    <p className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-yellow-400" /> Kids
                      Mentored: {mentor.kidsmentored}
                    </p>
                    <p className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-blue-600" /> Rating:{" "}
                      {mentor.rating}
                    </p>
                  </div> */}
                </div>
              ))}
            </div>
          ) : (
            <Card className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="bg-blue-600/5 text-gray-900 text-base font-semibold">
                    <th className="px-6 py-4 rounded-tl-2xl">Mentor</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Expertise</th>
                    <th className="px-6 py-4">Kids Mentored</th>
                    <th className="px-6 py-4">Rating</th>
                    {/* <th className="px-6 py-4">Clubs</th> */}
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
                          src={mentor?.image}
                          alt={mentor.firstName}
                          className="w-10 h-10 rounded-full border-2 border-blue-600 object-cover"
                        />
                        <div>
                          <div className="font-bold text-gray-900">
                            {mentor?.firstName + " " + mentor?.lastName}
                          </div>
                          <div className="text-xs text-gray-400">
                            {mentor.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {mentor.city + ", " + mentor.country}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-semibold ${getSpecialtyColor(
                            mentor?.specialty
                          )}`}
                        >
                          {mentor?.specialty}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {/* {mentor.kidsmentored} */} 4
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-blue-600" />
                          {/* {mentor.rating} */}5
                        </span>
                      </td>
                      {/* <td className="px-6 py-4">
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
                      </td> */}
                      <td className="px-6 py-4 flex items-center justify-center gap-2">
                        <button
                          size="icon"
                          onClick={() => handleViewMentor(mentor.id)}
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
              {/* Pagination */}
              <div className="p-3 md:p-6 flex flex-col-reverse md:flex-row justify-between items-center gap-4">
                <p className="text-gray-500">
                  {" "}
                  Showing {indexOfFirstUser + 1} to{" "}
                  {Math.min(indexOfLastUser, mentors.length)} of{" "}
                  {mentors.length} entries
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    className="px-4 py-2 rounded-full border border-gray-200 hover:bg-blue-600 hover:text-white"
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-4 py-2 rounded-full border ${
                        currentPage === i + 1
                          ? "bg-blue-600 text-white"
                          : "border-gray-200 hover:bg-blue-600 hover:text-white"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    className="px-4 py-2 rounded-full border border-gray-200 hover:bg-blue-600 hover:text-white"
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Main table showing */}
        <div className="relative z-10">
          {isLoading ? (
            <div className="bg-white rounded-xl shadow p-4">
              <table className="min-w-full">
                <tbody>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <SkeletonList key={i} />
                  ))}
                </tbody>
              </table>
            </div>
          ) : isError ? (
            <div className="text-red-500">Error: {error?.message}</div>
          ) : mentors.length === 0 ? (
            // Empty State Component
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Users className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Mentors Found
              </h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                There are currently no mentors in the system. Start building
                your mentorship program by adding your first mentor.
              </p>
              <button
                className="flex items-center mx-auto bg-yellow-400 text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-yellow-400/90 transition-colors"
                onClick={() => setIsModalOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add First Mentor
              </button>
            </div>
          ) : (
            // Existing table display logic
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="bg-blue-600/5 text-gray-900 text-base font-semibold">
                    <th className="px-6 py-4 rounded-tl-2xl">Mentor</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Expertise</th>
                    <th className="px-6 py-4">Kids Mentored</th>
                    <th className="px-6 py-4">Rating</th>
                    <th className="px-6 py-4 rounded-tr-2xl">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentMentors.map((mentor) => (
                    <tr
                      key={mentor.id}
                      className="border-t border-gray-200 hover:bg-blue-600/5 transition"
                    >
                      <td className="px-6 py-4 flex items-center gap-3">
                        <img
                          src={mentor?.image}
                          alt={mentor.firstName}
                          className="w-10 h-10 rounded-full border-2 border-blue-600 object-cover"
                        />
                        <div>
                          <div className="font-bold text-gray-900">
                            {mentor?.firstName + " " + mentor?.lastName}
                          </div>
                          <div className="text-xs text-gray-400">
                            {mentor.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {mentor.city + ", " + mentor.country}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-semibold ${getSpecialtyColor(
                            mentor?.specialty
                          )}`}
                        >
                          {mentor?.specialty}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {mentor?.students.length}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-blue-600" />5
                        </span>
                      </td>
                      <td className="px-6 py-4 flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleViewMentor(mentor._id)}
                          className="rounded-full bg-blue-600 text-white w-8 h-8 hover:bg-blue-600/90 flex items-center justify-center"
                        >
                          <Eye className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination - only show if there are mentors */}
              <div className="p-3 md:p-6 flex flex-col-reverse md:flex-row justify-between items-center gap-4">
                <p className="text-gray-500">
                  Showing {indexOfFirstUser + 1} to{" "}
                  {Math.min(indexOfLastUser, mentors.length)} of{" "}
                  {mentors.length} entries
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    className="px-4 py-2 rounded-full border border-gray-200 hover:bg-blue-600 hover:text-white"
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-4 py-2 rounded-full border ${
                        currentPage === i + 1
                          ? "bg-blue-600 text-white"
                          : "border-gray-200 hover:bg-blue-600 hover:text-white"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    className="px-4 py-2 rounded-full border border-gray-200 hover:bg-blue-600 hover:text-white"
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
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
