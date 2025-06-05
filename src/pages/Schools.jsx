import React, { useState } from "react";
import {
  Plus,
  Search,
  Grid,
  List,
  Eye,
  Pen,
  MapPin,
  Users,
  User,
  HelpCircle,
} from "lucide-react";
import { Card } from "../components/ui/card";
import SchoolOnboardingModal from "../components/modals/SchoolOnboardingModal";

const Schools = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);

  const schools = [
    {
      id: 1,
      name: "Bright Future Academy",
      location: "Lagos, Nigeria",
      type: "Primary",
      students: 420,
      teachers: 30,
      image:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg",
      email: "info@brightfuture.com",
      clubs: ["Science Club", "Math League"],
      typeColor: "bg-[#FFC107]/90 text-[#0F1419]",
    },
    {
      id: 2,
      name: "Starlight Secondary School",
      location: "Accra, Ghana",
      type: "Secondary",
      students: 620,
      teachers: 45,
      image:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
      email: "contact@starlight.edu",
      clubs: ["Tech Innovators", "Young Entrepreneurs"],
      typeColor: "bg-[#1A73E8]/90 text-white",
    },
    {
      id: 3,
      name: "Unity Learning Center",
      location: "Nairobi, Kenya",
      type: "Combined",
      students: 880,
      teachers: 70,
      image:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
      email: "hello@unitycenter.org",
      clubs: ["Entrepreneurship", "Mathematics"],
      typeColor: "bg-[#FFC107]/90 text-[#0F1419]",
    },
  ];

  const handleOpenOnboardingModal = () => {
    setIsOnboardingModalOpen(true);
  };

  const handleCloseOnboardingModal = () => {
    setIsOnboardingModalOpen(false);
  };

  return (
    <div className="bg-[#F5F7FA] min-h-[calc(100vh-80px)] relative">
      {/* Decorative Bubbles */}
      <div className="absolute left-[-120px] top-12 w-56 h-56 bg-[#1A73E8]/10 rounded-full z-0"></div>
      <div className="absolute right-[100px] top-[20px] w-40 h-40 bg-[#1A73E8]/10 rounded-full z-0"></div>
      <div className="absolute right-[30px] bottom-[120px] w-32 h-32 bg-[#FFC107]/20 rounded-full z-0"></div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 w-full relative z-10">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-[#0F1419]">
              Schools
            </h1>
            <p className="text-gray-500 mt-1">
              View, manage and onboard schools on SkillSeed
            </p>
          </div>
        </header>

        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <span className="ml-4 text-gray-500 font-medium">View:</span>
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center justify-center rounded-full w-10 h-10 cursor-pointer ${
                viewMode === "grid"
                  ? "bg-[#1A73E8] text-white"
                  : "bg-white text-[#1A73E8] border border-[#1A73E8]"
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center justify-center rounded-full w-10 h-10 cursor-pointer ${
                viewMode === "list"
                  ? "bg-[#1A73E8] text-white"
                  : "bg-white text-[#1A73E8] border border-[#1A73E8]"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <button
              onClick={handleOpenOnboardingModal}
              className="flex items-center bg-[#FFC107] text-[#0F1419] px-6 py-3 rounded-full font-semibold hover:bg-[#FFC107]/90 cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-2" />
              Onboard New School
            </button>
            <div className="relative">
              <input
                type="text"
                placeholder="Search schools..."
                className="w-full bg-white border border-gray-200 rounded-full px-5 py-2 focus:outline-none focus:border-[#1A73E8]"
              />
              <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Schools Content */}
        {viewMode === "grid" ? (
          // Grid View
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {schools.map((school) => (
              <Card
                key={school.id}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 relative"
              >
                <div className="flex items-stretch justify-between">
                  <div className="flex gap-4 mb-4">
                    <img
                      src={school.image}
                      className="w-14 h-14 rounded-full border-4 border-[#1A73E8] ring-2 ring-[#FFC107] object-cover shadow-md bg-white"
                      alt={school.name}
                    />
                    <div>
                      <h2 className="text-sm 2xl:text-xl font-semibold text-[#0F1419]">
                        {school.name}
                      </h2>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#1A73E8]" />
                        <span className="text-gray-500 text-sm">
                          {school.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-semibold ${school.typeColor}`}
                    >
                      {school.type}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 text-gray-600 text-sm mb-4">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-[#FFC107]" />
                    <span>{school.students} Students</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4 text-[#1A73E8]" />
                    <span>{school.teachers} Teachers</span>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap mb-4">
                  {school.clubs.map((club, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        index % 2 === 0
                          ? "bg-[#1A73E8]/10 text-[#1A73E8]"
                          : "bg-[#FFC107]/10 text-[#FFC107]"
                      }`}
                    >
                      {club}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center justify-center rounded-full bg-[#1A73E8] text-white w-10 h-10 hover:bg-[#1A73E8]/90">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="flex items-center justify-center rounded-full bg-[#FFC107] text-[#0F1419] w-10 h-10 hover:bg-[#FFC107]/80">
                    <Pen className="w-4 h-4" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          // List View
          <Card className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="bg-[#1A73E8]/5 text-[#0F1419] text-base font-semibold">
                  <th className="px-6 py-4 rounded-tl-2xl">School</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Students</th>
                  <th className="px-6 py-4">Teachers</th>
                  <th className="px-6 py-4">Clubs</th>
                  <th className="px-6 py-4 rounded-tr-2xl">Actions</th>
                </tr>
              </thead>
              <tbody>
                {schools.map((school) => (
                  <tr
                    key={school.id}
                    className="border-t border-gray-100 hover:bg-[#1A73E8]/5 transition"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={school.image}
                          className="w-10 h-10 rounded-full border-2 border-[#1A73E8] object-cover"
                          alt={school.name}
                        />
                        <div>
                          <div className="font-semibold text-[#0F1419]">
                            {school.name}
                          </div>
                          <div className="text-xs text-gray-400">
                            {school.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {school.location}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-semibold ${school.typeColor}`}
                      >
                        {school.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {school.students}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {school.teachers}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {school.clubs.map((club, index) => (
                          <span
                            key={index}
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              index % 2 === 0
                                ? "bg-[#1A73E8]/10 text-[#1A73E8]"
                                : "bg-[#FFC107]/10 text-[#FFC107]"
                            }`}
                          >
                            {club}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="flex items-center justify-center rounded-full bg-[#1A73E8] text-white w-8 h-8 hover:bg-[#1A73E8]/90">
                          <Eye className="w-3 h-3" />
                        </button>
                        <button className="flex items-center justify-center rounded-full bg-[#FFC107] text-[#0F1419] w-8 h-8 hover:bg-[#FFC107]/80">
                          <Pen className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}

        {/* Floating Help Button */}
        {/* <div className="fixed bottom-8 right-8 z-50">
          <button className="flex items-center bg-[#FFC107] text-[#0F1419] p-4 rounded-full shadow-lg hover:bg-[#FFC107]/90 font-semibold text-lg">
            <HelpCircle className="w-5 h-5 mr-2" />
            Need Help?
          </button>
        </div> */}

        {/* School Onboarding Modal */}
        <SchoolOnboardingModal
          isOpen={isOnboardingModalOpen}
          onClose={handleCloseOnboardingModal}
        />
      </div>
    </div>
  );
};

export default Schools;
