import React from "react";
import { PageMetadata } from "../components/PageMetadata";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Card } from "../components/ui/card";
import {
  School,
  GraduationCap,
  Trophy,
  Calendar,
  Plus,
  Megaphone,
  CalendarPlus,
  RotateCcw,
  Star,
  TrendingUp,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Home = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("adminToken");

  const engagementData = [
    { name: "Jan", engagement: 65, signups: 30 },
    { name: "Feb", engagement: 59, signups: 45 },
    { name: "Mar", engagement: 80, signups: 60 },
    { name: "Apr", engagement: 81, signups: 55 },
    { name: "May", engagement: 56, signups: 70 },
    { name: "Jun", engagement: 75, signups: 65 },
    { name: "Jul", engagement: 70, signups: 80 },
  ];

  const getDashboardData = async () => {
    const res = await axios.get(`${apiURL}/dashboard/get-data`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log(res.data);
    return res.data.dashboardResponse;
  };

  const {
    data: dashboardData = {},
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["dashboard-data"],
    queryFn: getDashboardData,
    staleTime: 5 * 60 * 1000,
  });
  return (
    <>
      <PageMetadata
        title="Dashboard | SkillSeed"
        description="Your SkillSeed dashboard - Track your learning progress and access your courses"
      />
      <div className="bg-[#F5F7FA] min-h-[calc(100vh-80px)]">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
          {/* Header */}
          <header
            id="header"
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
          >
            <div className="flex items-center">
              <h2 className="text-xl md:text-2xl font-bold text-[#0F1419]">
                Dashboard
              </h2>
            </div>
          </header>

          {/* Stats Cards */}
          <div
            id="stats-section"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8"
          >
            <Card
              id="stats-schools"
              className="bg-white p-4 md:p-6 rounded-2xl shadow-sm"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm md:text-base">
                    Total Schools
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#0F1419]">
                    {dashboardData?.analytics?.totalSchools}
                  </h3>
                </div>
                <div className="bg-[#1A73E8]/10 p-3 md:p-4 rounded-full">
                  <School className="text-xl md:text-2xl text-[#1A73E8] w-6 h-6 md:w-8 md:h-8" />
                </div>
              </div>
            </Card>

            <Card
              id="stats-students"
              className="bg-white p-4 md:p-6 rounded-2xl shadow-sm"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm md:text-base">
                    Total Students
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#0F1419]">
                    {dashboardData?.analytics?.totalStudents}
                  </h3>
                </div>
                <div className="bg-[#FFC107]/10 p-3 md:p-4 rounded-full">
                  <GraduationCap className="text-xl md:text-2xl text-[#FFC107] w-6 h-6 md:w-8 md:h-8" />
                </div>
              </div>
            </Card>

            <Card
              id="stats-challenges"
              className="bg-white p-4 md:p-6 rounded-2xl shadow-sm"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm md:text-base">
                    Active Challenges
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#0F1419]">
                    18
                  </h3>
                </div>
                <div className="bg-[#1A73E8]/10 p-3 md:p-4 rounded-full">
                  <Trophy className="text-xl md:text-2xl text-[#1A73E8] w-6 h-6 md:w-8 md:h-8" />
                </div>
              </div>
            </Card>

            <Card
              id="stats-events"
              className="bg-white p-4 md:p-6 rounded-2xl shadow-sm"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm md:text-base">
                    Upcoming Events
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#0F1419]">
                    7
                  </h3>
                </div>
                <div className="bg-[#FFC107]/10 p-3 md:p-4 rounded-full">
                  <Calendar className="text-xl md:text-2xl text-[#FFC107] w-6 h-6 md:w-8 md:h-8" />
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Chart Section */}
            <Card
              id="chart-section"
              className="bg-white p-4 md:p-6 rounded-2xl shadow-sm"
            >
              <div
                id="engagementChart"
                className="bg-white rounded-2xl relative overflow-hidden h-[300px] md:h-[380px] flex flex-col"
              >
                {/* Decorative Bubbles - kept for background styling */}
                <div className="absolute -top-8 md:-top-12 -left-8 md:-left-12 w-24 md:w-32 h-24 md:h-32 bg-[#1A73E8]/10 rounded-full z-0"></div>
                <div className="absolute top-6 md:top-10 right-0 w-16 md:w-20 h-16 md:h-20 bg-[#FFC107]/20 rounded-full z-0"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 md:w-24 h-20 md:h-24 bg-[#1A73E8]/10 rounded-full z-0"></div>

                <div className="relative z-10 p-2 flex-none">
                  <h3 className="text-lg md:text-xl font-semibold mb-2 text-[#0F1419] flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                    <span>Student Engagement</span>
                    <span className="flex items-center">
                      <img
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg"
                        className="w-6 md:w-7 h-6 md:h-7 rounded-full border-2 border-white shadow-md"
                        alt="Avatar 1"
                      />
                      <img
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg"
                        className="w-6 md:w-7 h-6 md:h-7 rounded-full border-2 border-white shadow-md -ml-2"
                        alt="Avatar 2"
                      />
                      <img
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg"
                        className="w-6 md:w-7 h-6 md:h-7 rounded-full border-2 border-white shadow-md -ml-2"
                        alt="Avatar 3"
                      />
                    </span>
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="bg-[#FFC107]/60 text-white px-2 py-0.5 rounded-full text-xs font-medium flex items-center">
                      <Star className="text-white mr-1 w-3 h-3" />
                      Kids' Activity
                    </span>
                    <span className="bg-[#1A73E8]/60 text-white px-2 py-0.5 rounded-full text-xs font-medium flex items-center">
                      <TrendingUp className="text-white mr-1 w-3 h-3" />
                      +15% This Month
                    </span>
                  </div>
                </div>

                <div className="flex-grow relative z-10 w-full h-full pt-2 pr-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={engagementData}
                      margin={{ top: 5, right: 0, left: -25, bottom: 5 }} // Adjusted left margin for YAxis labels
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 12, fill: "#6B7280" }}
                        axisLine={{ stroke: "#e0e0e0" }}
                        tickLine={{ stroke: "#e0e0e0" }}
                      />
                      <YAxis
                        tick={{ fontSize: 12, fill: "#6B7280" }}
                        axisLine={{ stroke: "#e0e0e0" }}
                        tickLine={{ stroke: "#e0e0e0" }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          borderRadius: "8px",
                          borderColor: "#e0e0e0",
                        }}
                        labelStyle={{ fontWeight: "bold", color: "#0F1419" }}
                      />
                      <Legend
                        wrapperStyle={{ fontSize: "14px", paddingTop: "10px" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="engagement"
                        stroke="#1A73E8"
                        strokeWidth={2}
                        activeDot={{ r: 6 }}
                        name="Engagement Rate"
                      />
                      <Line
                        type="monotone"
                        dataKey="signups"
                        stroke="#FFC107"
                        strokeWidth={2}
                        activeDot={{ r: 6 }}
                        name="New Signups"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                {/* Round Floating Button, bottom right */}
                <button className="absolute bottom-4 md:bottom-6 right-4 md:right-6 z-20 bg-[#1A73E8] text-white w-10 md:w-12 h-10 md:h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-[#1A73E8]/90 transition-all p-0">
                  <RotateCcw className="w-4 md:w-5 h-4 md:h-5" />
                </button>
              </div>
            </Card>

            {/* Recent Activities */}
            <Card
              id="activities-section"
              className="bg-white p-4 md:p-6 rounded-2xl shadow-sm"
            >
              <h3 className="text-lg md:text-xl font-semibold mb-4 text-[#0F1419]">
                Recent Activities
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 md:space-x-4 p-3 hover:bg-[#F8F9FA] rounded-lg transition-colors">
                  <div className="bg-[#1A73E8]/10 p-2 md:p-3 rounded-full">
                    <School className="text-[#1A73E8] w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm md:text-base">
                      New School Onboarded
                    </p>
                    <p className="text-xs md:text-sm text-gray-500 truncate">
                      Green Valley International School
                    </p>
                  </div>
                  <span className="text-xs md:text-sm text-gray-500 flex-shrink-0">
                    2h ago
                  </span>
                </div>

                <div className="flex items-center space-x-3 md:space-x-4 p-3 hover:bg-[#F8F9FA] rounded-lg transition-colors">
                  <div className="bg-[#FFC107]/10 p-2 md:p-3 rounded-full">
                    <Trophy className="text-[#FFC107] w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm md:text-base">
                      New Challenge Created
                    </p>
                    <p className="text-xs md:text-sm text-gray-500 truncate">
                      Science Innovation Challenge
                    </p>
                  </div>
                  <span className="text-xs md:text-sm text-gray-500 flex-shrink-0">
                    5h ago
                  </span>
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div
            id="quick-actions"
            className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            <button className="bg-[#1A73E8] text-white p-3 md:p-4 rounded-full flex items-center justify-center space-x-2 hover:bg-[#1A73E8]/90 text-sm md:text-base">
              <Plus className="w-4 h-4 md:w-5 md:h-5" />
              <span>Onboard School</span>
            </button>

            <button className="bg-[#1A73E8] text-white p-3 md:p-4 rounded-full flex items-center justify-center space-x-2 hover:bg-[#1A73E8]/90 text-sm md:text-base">
              <Trophy className="w-4 h-4 md:w-5 md:h-5" />
              <span>Create Challenge</span>
            </button>

            <button className="bg-[#1A73E8] text-white p-3 md:p-4 rounded-full flex items-center justify-center space-x-2 hover:bg-[#1A73E8]/90 text-sm md:text-base">
              <Megaphone className="w-4 h-4 md:w-5 md:h-5" />
              <span>Make Announcement</span>
            </button>

            <button className="bg-[#1A73E8] text-white p-3 md:p-4 rounded-full flex items-center justify-center space-x-2 hover:bg-[#1A73E8]/90 text-sm md:text-base">
              <CalendarPlus className="w-4 h-4 md:w-5 md:h-5" />
              <span>Schedule Event</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
