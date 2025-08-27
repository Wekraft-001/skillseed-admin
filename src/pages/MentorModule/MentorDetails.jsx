import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  ArrowLeft,
  Bell,
  Edit,
  MessageSquare,
  Ban,
  Star,
  MapPin,
  HelpCircle,
  User,
} from "lucide-react";

const MentorDetails = () => {
  const navigate = useNavigate();

  const mentorData = {
    name: "Grace Elizabeth Mensah",
    email: "grace@skillseed.com",
    phone: "+233 24 123 4567",
    location: "Kumasi, Ghana",
    expertise: "Science Expert",
    kidsmentored: 120,
    rating: 4.9,
    experience: 3,
    dateJoined: "March 15, 2021",
    status: "Active",
    image:
      "https://images.pexels.com/photos/459976/pexels-photo-459976.jpeg?auto=compress&w=200&q=80",
    education: "MSc. Computer Science, University of Ghana",
    certifications: "Certified STEM Educator, Google for Education",
    skills: ["Robotics", "Science Club", "STEM Education", "Innovation Labs"],
  };

  const recentActivity = [
    {
      activity: "Mentored Kwame in Robotics",
      time: "2 hours ago",
      avatar:
        "https://images.pexels.com/photos/459976/pexels-photo-459976.jpeg?auto=compress&w=40&q=80",
    },
    {
      activity: "Completed Science Challenge with Ama",
      time: "1 day ago",
      avatar:
        "https://images.pexels.com/photos/618158/pexels-photo-618158.jpeg?auto=compress&w=40&q=80",
    },
    {
      activity: "Led Innovation Workshop",
      time: "3 days ago",
      avatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&w=40&q=80",
    },
  ];

  const currentMentees = [
    {
      name: "Kwame Asante",
      age: 12,
      club: "Robotics Club",
      avatar:
        "https://images.pexels.com/photos/459976/pexels-photo-459976.jpeg?auto=compress&w=40&q=80",
    },
    {
      name: "Ama Osei",
      age: 11,
      club: "Science Club",
      avatar:
        "https://images.pexels.com/photos/618158/pexels-photo-618158.jpeg?auto=compress&w=40&q=80",
    },
    {
      name: "Kojo Mensah",
      age: 13,
      club: "Innovation Lab",
      avatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&w=40&q=80",
    },
  ];

  return (
    <div className="p-4 md:p-8 w-full max-w-[1800px] mx-auto">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full bg-white text-blue-600 border border-blue-600 w-10 h-10 hover:bg-blue-600 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Mentor Details
            </h1>
            <p className="text-gray-500">View and manage mentor information</p>
          </div>
        </div>
      </header>

      {/* Mentor Profile Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8 border border-gray-200 relative overflow-hidden">
        <div className="absolute right-[-40px] top-[-30px] w-32 h-32 bg-blue-600/10 rounded-full"></div>
        <div className="absolute left-[-30px] bottom-[-40px] w-28 h-28 bg-yellow-400/20 rounded-full"></div>
        <div className="flex flex-col lg:flex-row gap-8 relative z-10">
          <div className="flex flex-col items-center lg:items-start">
            <img
              src={mentorData.image}
              className="w-32 h-32 rounded-full border-4 border-blue-600 ring-4 ring-yellow-400 object-cover shadow-lg bg-white mb-4"
              alt={mentorData.name}
            />
            <div className="text-center lg:text-left">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                {mentorData.name}
              </h2>
              <div className="flex items-center gap-2 justify-center lg:justify-start mb-3">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span className="text-gray-500">{mentorData.location}</span>
              </div>
              <div className="flex gap-3 justify-center lg:justify-start mb-4 flex-wrap">
                <span className="bg-yellow-400/90 text-xs px-4 py-2 rounded-full font-semibold text-gray-800">
                  {mentorData.expertise}
                </span>
                <span className="bg-blue-600/10 text-blue-600 px-4 py-2 rounded-full text-xs font-medium">
                  {mentorData.status}
                </span>
              </div>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-600/5 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {mentorData.kidsmentored}
              </div>
              <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                <User className="w-4 h-4 text-yellow-400" />
                Kids Mentored
              </div>
            </div>
            <div className="bg-yellow-400/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1 flex items-center justify-center gap-1">
                <Star className="w-5 h-5 text-blue-600" />
                {mentorData.rating}
              </div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="bg-blue-600/5 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {mentorData.experience}
              </div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </div>

      {/* Information and Expertise Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Personal Information */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 relative overflow-hidden">
          <div className="absolute right-[-20px] bottom-[-20px] w-20 h-20 bg-blue-600/10 rounded-full"></div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              Personal Information
            </h3>
            <Button
              size="icon"
              className="rounded-full bg-yellow-400 text-gray-900 hover:bg-yellow-400/80"
            >
              <Edit className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-4 relative z-10">
            <div className="flex flex-col md:flex-row md:justify-between">
              <span className="text-gray-600">Full Name:</span>
              <span className="font-semibold text-gray-900">
                {mentorData.name}
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-semibold text-blue-600">
                {mentorData.email}
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between">
              <span className="text-gray-600">Phone:</span>
              <span className="font-semibold text-gray-900">
                {mentorData.phone}
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between">
              <span className="text-gray-600">Date Joined:</span>
              <span className="font-semibold text-gray-900">
                {mentorData.dateJoined}
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                {mentorData.status}
              </span>
            </div>
          </div>
        </div>

        {/* Expertise & Skills */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 relative overflow-hidden">
          <div className="absolute left-[-25px] top-[-25px] w-24 h-24 bg-yellow-400/20 rounded-full"></div>
          <h3 className="text-xl font-bold text-gray-900 mb-6 relative z-10">
            Expertise & Skills
          </h3>
          <div className="space-y-4 relative z-10">
            <div>
              <span className="text-gray-600 block mb-2">
                Primary Expertise:
              </span>
              <span className="bg-yellow-400/90 text-gray-900 px-4 py-2 rounded-full font-semibold">
                Science & Technology
              </span>
            </div>
            <div>
              <span className="text-gray-600 block mb-2">Skills:</span>
              <div className="flex flex-wrap gap-2">
                {mentorData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      index % 2 === 0
                        ? "bg-blue-600/10 text-blue-600"
                        : "bg-yellow-400/10 text-yellow-600"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="text-gray-600 block mb-2">Education:</span>
              <span className="font-semibold text-gray-900">
                {mentorData.education}
              </span>
            </div>
            <div>
              <span className="text-gray-600 block mb-2">Certifications:</span>
              <span className="font-semibold text-gray-900">
                {mentorData.certifications}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Activity and Mentees */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 relative overflow-hidden">
          <div className="absolute right-[-30px] bottom-[-30px] w-28 h-28 bg-blue-600/10 rounded-full"></div>
          <h3 className="text-xl font-bold text-gray-900 mb-6 relative z-10">
            Recent Activity
          </h3>
          <div className="space-y-4 relative z-10">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-3 bg-blue-600/5 rounded-xl"
              >
                <img
                  src={activity.avatar}
                  className="w-8 h-8 rounded-full border border-blue-600 object-cover"
                  alt="Activity"
                />
                <div className="flex-1">
                  <div className="text-sm font-semibold text-gray-900">
                    {activity.activity}
                  </div>
                  <div className="text-xs text-gray-500">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Mentees */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 relative overflow-hidden">
          <div className="absolute left-[-20px] top-[-20px] w-20 h-20 bg-yellow-400/20 rounded-full"></div>
          <h3 className="text-xl font-bold text-gray-900 mb-6 relative z-10">
            Kids Currently Mentoring
          </h3>
          <div className="space-y-3 relative z-10">
            {currentMentees.map((mentee, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-100 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={mentee.avatar}
                    className="w-10 h-10 rounded-full border-2 border-blue-600 object-cover"
                    alt={mentee.name}
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {mentee.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      Age {mentee.age} • {mentee.club}
                    </div>
                  </div>
                </div>
                <Button
                  size="icon"
                  className="rounded-full bg-blue-600 text-white w-8 h-8 hover:bg-blue-600/90"
                >
                  <MessageSquare className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
        <Button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-600/90 shadow-lg">
          <MessageSquare className="w-4 h-4 mr-2" />
          Send Message
        </Button>
        <Button className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-yellow-400/90 shadow-lg">
          <Edit className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
        <Button
          variant="outline"
          className="border-red-300 text-red-600 px-8 py-3 rounded-full font-semibold hover:bg-red-50 shadow-lg"
        >
          <Ban className="w-4 h-4 mr-2" />
          Suspend Mentor
        </Button>
      </div>

      {/* Floating Help Button */}
      <div className="fixed bottom-8 right-8 z-50 hidden">
        <Button className="bg-yellow-400 text-gray-900 p-4 rounded-full shadow-lg hover:bg-yellow-400/90 font-semibold">
          <HelpCircle className="w-5 h-5 mr-2" />
          Need Help?
        </Button>
      </div>
    </div>
  );
};

export default MentorDetails;
