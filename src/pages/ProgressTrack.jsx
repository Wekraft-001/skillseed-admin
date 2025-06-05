
import React from 'react';
import { Clock, Star, School, Trophy, Medal, Award, Users } from 'lucide-react';
import { Card } from '../components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const ProgressTracking = () => {
  const skillsData = [
    { name: 'Jan', value: 500 },
    { name: 'Feb', value: 1200 },
    { name: 'Mar', value: 1800 },
    { name: 'Apr', value: 2400 },
    { name: 'May', value: 3100 },
    { name: 'Jun', value: 3800 },
  ];

  const engagementData = [
    { name: 'Jan', value: 75 },
    { name: 'Feb', value: 82 },
    { name: 'Mar', value: 78 },
    { name: 'Apr', value: 85 },
    { name: 'May', value: 89 },
    { name: 'Jun', value: 92 },
  ];

  return (
    <div className="bg-[#F5F7FA] min-h-[calc(100vh-80px)]">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-8 max-w-[1800px]">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-[#0F1419]">Impact & Progress Dashboard</h1>
            <p className="text-gray-500 text-sm md:text-base">Track collective student and school performance</p>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          <Card className="bg-white p-4 md:p-6 rounded-2xl shadow-sm relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-16 h-16 md:w-20 md:h-20 bg-blue-100 rounded-full opacity-50"></div>
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <div className="p-2 md:p-3 bg-blue-100 rounded-full">
                <Clock className="text-[#1A73E8] w-5 h-5 md:w-6 md:h-6" />
              </div>
            </div>
            <h3 className="text-xl md:text-2xl font-bold">125,430</h3>
            <p className="text-gray-500 text-sm md:text-base">Total Learning Hours</p>
          </Card>
          
          <Card className="bg-white p-4 md:p-6 rounded-2xl shadow-sm relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full opacity-50"></div>
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <div className="p-2 md:p-3 bg-green-100 rounded-full">
                <Star className="text-green-600 w-5 h-5 md:w-6 md:h-6" />
              </div>
            </div>
            <h3 className="text-xl md:text-2xl font-bold">8,567</h3>
            <p className="text-gray-500 text-sm md:text-base">Skills Mastered</p>
          </Card>

          <Card className="bg-white p-4 md:p-6 rounded-2xl shadow-sm relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-16 h-16 md:w-20 md:h-20 bg-purple-100 rounded-full opacity-50"></div>
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <div className="p-2 md:p-3 bg-purple-100 rounded-full">
                <School className="text-purple-600 w-5 h-5 md:w-6 md:h-6" />
              </div>
            </div>
            <h3 className="text-xl md:text-2xl font-bold">234</h3>
            <p className="text-gray-500 text-sm md:text-base">Active Schools</p>
          </Card>

          <Card className="bg-white p-4 md:p-6 rounded-2xl shadow-sm relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-16 h-16 md:w-20 md:h-20 bg-red-100 rounded-full opacity-50"></div>
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <div className="p-2 md:p-3 bg-red-100 rounded-full">
                <Users className="text-red-600 w-5 h-5 md:w-6 md:h-6" />
              </div>
            </div>
            <h3 className="text-xl md:text-2xl font-bold">89%</h3>
            <p className="text-gray-500 text-sm md:text-base">Student Engagement</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          <Card className="bg-white p-4 md:p-6 rounded-2xl shadow-sm">
            <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Skills Progress</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={skillsData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#1A73E8" 
                  strokeWidth={2}
                  fill="rgba(26, 115, 232, 0.1)"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="bg-white p-4 md:p-6 rounded-2xl shadow-sm">
            <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Monthly Engagement</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={engagementData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#FFC107" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <Card className="bg-white p-4 md:p-6 rounded-2xl shadow-sm mb-6 md:mb-8">
          <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Top Performing Schools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <Card className="bg-[#F5F7FA] rounded-xl p-3 md:p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#FFC107] rounded-full flex items-center justify-center flex-shrink-0">
                  <Trophy className="text-white w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-sm md:text-base">Green Valley School</h4>
                  <p className="text-xs md:text-sm text-gray-500">98% Completion Rate</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-[#FFC107] h-2 rounded-full" style={{width: '98%'}}></div>
              </div>
            </Card>
            <Card className="bg-[#F5F7FA] rounded-xl p-3 md:p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#1A73E8] rounded-full flex items-center justify-center flex-shrink-0">
                  <Medal className="text-white w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-sm md:text-base">Sunshine Academy</h4>
                  <p className="text-xs md:text-sm text-gray-500">95% Completion Rate</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-[#1A73E8] h-2 rounded-full" style={{width: '95%'}}></div>
              </div>
            </Card>
            <Card className="bg-[#F5F7FA] rounded-xl p-3 md:p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Award className="text-white w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-sm md:text-base">Tech Prep School</h4>
                  <p className="text-xs md:text-sm text-gray-500">92% Completion Rate</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{width: '92%'}}></div>
              </div>
            </Card>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProgressTracking;
