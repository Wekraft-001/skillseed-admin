import React from "react";
import { Trophy, School, Calendar, Star, Megaphone } from "lucide-react";
import { Card } from "../components/ui/card";

const Notifications = () => {
  return (
    <div className="bg-[#F5F7FA] min-h-[calc(100vh-80px)]">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-8 max-w-[1800px]">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-[#0F1419]">
              Notifications
            </h1>
            <p className="text-gray-500 text-sm md:text-base">
              Stay updated with latest activities
            </p>
          </div>
        </header>

        <div className="flex flex-wrap gap-2 md:gap-4 mb-4 md:mb-6">
          <button className="bg-[#1A73E8] text-white px-4 md:px-6 py-2 rounded-full text-sm md:text-base">
            All
          </button>
          <button className="bg-white text-gray-600 px-4 md:px-6 py-2 rounded-full hover:bg-gray-50 text-sm md:text-base">
            Challenges
          </button>
          <button className="bg-white text-gray-600 px-4 md:px-6 py-2 rounded-full hover:bg-gray-50 text-sm md:text-base">
            Events
          </button>
          <button className="bg-white text-gray-600 px-4 md:px-6 py-2 rounded-full hover:bg-gray-50 text-sm md:text-base">
            Schools
          </button>
        </div>

        <div className="space-y-3 md:space-y-4">
          <Card className="bg-white p-4 md:p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
              <Trophy className="text-[#1A73E8] w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                <h3 className="font-semibold text-base md:text-lg">
                  New Challenge Created
                </h3>
                <span className="text-xs md:text-sm text-gray-500 flex-shrink-0">
                  2 hours ago
                </span>
              </div>
              <p className="text-gray-600 text-sm md:text-base">
                "Science Innovation Challenge" has been created and is ready for
                students.
              </p>
            </div>
          </Card>

          <Card className="bg-white p-4 md:p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="bg-green-100 p-3 rounded-full flex-shrink-0">
              <School className="text-green-600 w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                <h3 className="font-semibold text-base md:text-lg">
                  New School Joined
                </h3>
                <span className="text-xs md:text-sm text-gray-500 flex-shrink-0">
                  5 hours ago
                </span>
              </div>
              <p className="text-gray-600 text-sm md:text-base">
                Sunshine Academy has successfully joined SkillSeed platform.
              </p>
            </div>
          </Card>

          <Card className="bg-white p-4 md:p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="bg-purple-100 p-3 rounded-full flex-shrink-0">
              <Calendar className="text-purple-600 w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                <h3 className="font-semibold text-base md:text-lg">
                  Upcoming Event Reminder
                </h3>
                <span className="text-xs md:text-sm text-gray-500 flex-shrink-0">
                  1 day ago
                </span>
              </div>
              <p className="text-gray-600 text-sm md:text-base">
                Tech Workshop scheduled for next week. 150 students registered.
              </p>
            </div>
          </Card>

          <Card className="bg-white p-4 md:p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="bg-orange-100 p-3 rounded-full flex-shrink-0">
              <Star className="text-orange-600 w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                <h3 className="font-semibold text-base md:text-lg">
                  Challenge Milestone Reached
                </h3>
                <span className="text-xs md:text-sm text-gray-500 flex-shrink-0">
                  2 days ago
                </span>
              </div>
              <p className="text-gray-600 text-sm md:text-base">
                1000+ students completed the Mathematics Challenge!
              </p>
            </div>
          </Card>

          <Card className="bg-white p-4 md:p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="bg-red-100 p-3 rounded-full flex-shrink-0">
              <Megaphone className="text-red-600 w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                <h3 className="font-semibold text-base md:text-lg">
                  System Announcement
                </h3>
                <span className="text-xs md:text-sm text-gray-500 flex-shrink-0">
                  3 days ago
                </span>
              </div>
              <p className="text-gray-600 text-sm md:text-base">
                New features added to the challenge creation system.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
