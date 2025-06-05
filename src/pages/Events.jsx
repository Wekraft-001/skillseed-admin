import React from "react";
import {
  Plus,
  Calendar,
  Clock,
  School,
  MoreVertical,
  Microscope,
  Bot,
  Megaphone,
} from "lucide-react";
import { Card } from "../components/ui/card";

const Events = () => {
  return (
    <div className="bg-[#F5F7FA] min-h-[calc(100vh-80px)]">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-8 max-w-[1800px]">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-[#0F1419]">
              Events & Announcements
            </h1>
            <p className="text-gray-500 text-sm md:text-base">
              Manage co-curricular activities and notifications
            </p>
          </div>
        </header>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-8">
          <button className="bg-[#1A73E8] text-white px-4 md:px-6 py-2 md:py-3 rounded-full flex items-center justify-center space-x-2 shadow-lg hover:bg-[#1A73E8]/90 text-sm md:text-base">
            <Plus className="w-4 h-4" />
            <span>New Event</span>
          </button>
          <button className="bg-[#FFC107] text-[#0F1419] px-4 md:px-6 py-2 md:py-3 rounded-full flex items-center justify-center space-x-2 shadow-lg hover:bg-[#FFC107]/90 text-sm md:text-base">
            <Megaphone className="w-4 h-4" />
            <span>New Announcement</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            <Card className="bg-white p-4 md:p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-3">
                <div className="flex items-center space-x-3 md:space-x-4 flex-1">
                  <div className="bg-blue-100 p-3 md:p-4 rounded-full flex-shrink-0">
                    <Microscope className="text-[#1A73E8] w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg md:text-xl font-semibold">
                      Science Fair 2024
                    </h3>
                    <p className="text-gray-500 text-sm md:text-base">
                      Inter-school Competition
                    </p>
                  </div>
                </div>
                <button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-gray-600 flex-shrink-0"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-xs md:text-sm text-gray-600">
                <span className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <span>Mar 15, 2024</span>
                </span>
                <span className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 flex-shrink-0" />
                  <span>9:00 AM - 4:00 PM</span>
                </span>
                <span className="flex items-center space-x-2">
                  <School className="w-4 h-4 flex-shrink-0" />
                  <span>15 Schools Participating</span>
                </span>
              </div>
            </Card>

            <Card className="bg-white p-4 md:p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-3">
                <div className="flex items-center space-x-3 md:space-x-4 flex-1">
                  <div className="bg-purple-100 p-3 md:p-4 rounded-full flex-shrink-0">
                    <Bot className="text-purple-600 w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg md:text-xl font-semibold">
                      Tech Workshop
                    </h3>
                    <p className="text-gray-500 text-sm md:text-base">
                      Robotics & Programming
                    </p>
                  </div>
                </div>
                <button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-gray-600 flex-shrink-0"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-xs md:text-sm text-gray-600">
                <span className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <span>Mar 20, 2024</span>
                </span>
                <span className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 flex-shrink-0" />
                  <span>10:00 AM - 2:00 PM</span>
                </span>
                <span className="flex items-center space-x-2">
                  <School className="w-4 h-4 flex-shrink-0" />
                  <span>8 Schools Participating</span>
                </span>
              </div>
            </Card>
          </div>

          <div className="space-y-4 md:space-y-6">
            <Card className="bg-white p-4 md:p-6 rounded-2xl shadow-sm">
              <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 flex items-center justify-between">
                <span>Recent Announcements</span>
                <button
                  variant="ghost"
                  className="text-xs md:text-sm text-[#1A73E8] p-0"
                >
                  View All
                </button>
              </h2>
              <div className="space-y-4 md:space-y-6">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-sm md:text-base">
                      Registration Deadline Extended
                    </h4>
                    <span className="text-xs text-gray-500 flex-shrink-0">
                      2h ago
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-600">
                    Science Fair registration deadline has been extended to
                    March 10th.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-sm md:text-base">
                      New Challenge Released
                    </h4>
                    <span className="text-xs text-gray-500 flex-shrink-0">
                      5h ago
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-600">
                    Check out our new Mathematics Challenge for Grade 6
                    students.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-sm md:text-base">
                      Workshop Materials Updated
                    </h4>
                    <span className="text-xs text-gray-500 flex-shrink-0">
                      1d ago
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-600">
                    Tech Workshop materials have been updated. Please review.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
