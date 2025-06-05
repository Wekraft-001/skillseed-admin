import React, { useState } from "react";
import {
  Trophy,
  Target,
  Clock,
  Users,
  Plus,
  Search,
  Filter,
} from "lucide-react";
import { Card } from "../components/ui/card";
import ChallengeCreationModal from "../components/modals/ChallengeCreationModal";

const Challenges = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const challenges = [
    {
      id: 1,
      title: "Mathematics Challenge 2024",
      description:
        "Test your mathematical skills in this comprehensive challenge covering algebra, geometry, and calculus.",
      participants: 245,
      duration: "2 hours",
      difficulty: "Advanced",
      status: "Active",
      prize: "$500",
      category: "Mathematics",
      endDate: "2024-12-15",
    },
    {
      id: 2,
      title: "Science Innovation Contest",
      description:
        "Showcase your scientific knowledge and innovation in this exciting multi-disciplinary challenge.",
      participants: 189,
      duration: "3 hours",
      difficulty: "Intermediate",
      status: "Coming Soon",
      prize: "$750",
      category: "Science",
      endDate: "2024-12-20",
    },
    {
      id: 3,
      title: "Creative Writing Challenge",
      description:
        "Express your creativity through storytelling and win amazing prizes in this writing competition.",
      participants: 312,
      duration: "1.5 hours",
      difficulty: "Beginner",
      status: "Active",
      prize: "$300",
      category: "Literature",
      endDate: "2024-12-10",
    },
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-700";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-700";
      case "Advanced":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-[#1A73E8] text-white";
      case "Coming Soon":
        return "bg-[#FFC107] text-[#0F1419]";
      case "Completed":
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-[#F5F7FA] min-h-[calc(100vh-80px)] relative">
      {/* Decorative Elements */}
      <div className="absolute left-[-120px] top-12 w-56 h-56 bg-[#1A73E8]/10 rounded-full z-0"></div>
      <div className="absolute right-[100px] top-[20px] w-40 h-40 bg-[#1A73E8]/10 rounded-full z-0"></div>
      <div className="absolute right-[30px] bottom-[120px] w-32 h-32 bg-[#FFC107]/20 rounded-full z-0"></div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 relative z-10">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-[#0F1419]">
              Challenges
            </h1>
            <p className="text-gray-500 mt-1">
              Discover and participate in exciting educational challenges
            </p>
          </div>
        </header>

        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <button
              className="flex items-center bg-[#FFC107] text-[#0F1419] px-6 py-3 rounded-full font-semibold hover:bg-[#FFC107]/90 cursor-pointer"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Challenge
            </button>
            <button className="flex items-center bg-white text-[#1A73E8] border border-[#1A73E8] px-6 py-3 rounded-full font-semibold hover:bg-[#1A73E8]/10 cursor-pointer">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search challenges..."
              className="bg-white border border-gray-200 rounded-full px-5 py-2 focus:outline-none focus:border-[#1A73E8] w-full"
            />
            <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {challenges.map((challenge) => (
            <Card
              key={challenge.id}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-[#FFC107]" />
                  <span className="text-sm font-medium text-gray-600">
                    {challenge.category}
                  </span>
                </div>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${getStatusColor(
                    challenge.status
                  )}`}
                >
                  {challenge.status}
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#0F1419] mb-3">
                {challenge.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {challenge.description}
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4 text-[#1A73E8]" />
                  <span>{challenge.participants} participants</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-[#1A73E8]" />
                  <span>{challenge.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Target className="w-4 h-4 text-[#1A73E8]" />
                  <span>Prize: {challenge.prize}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${getDifficultyColor(
                    challenge.difficulty
                  )}`}
                >
                  {challenge.difficulty}
                </span>
                <span className="text-xs text-gray-500">
                  Ends: {challenge.endDate}
                </span>
              </div>

              <button
                className={`w-full rounded-full font-semibold h-10 cursor-pointer ${
                  challenge.status === "Active"
                    ? "bg-[#1A73E8] text-white hover:bg-[#1A73E8]/90"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
                disabled={challenge.status !== "Active"}
              >
                {challenge.status === "Active"
                  ? "Join Challenge"
                  : "Coming Soon"}
              </button>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-[#1A73E8] to-[#1A73E8]/80 text-white p-6 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-full">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">24</h3>
                <p className="text-white/80">Active Challenges</p>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-[#FFC107] to-[#FFC107]/80 text-[#0F1419] p-6 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-full">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">1,246</h3>
                <p className="text-[#0F1419]/80">Total Participants</p>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-full">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">$5,200</h3>
                <p className="text-white/80">Total Prizes</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <ChallengeCreationModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default Challenges;
