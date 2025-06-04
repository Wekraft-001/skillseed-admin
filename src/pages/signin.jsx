import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Star, Rocket } from "lucide-react";

const Signin = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent form reload
    navigate("/home");
  };

  return (
    <>
      <div className="min-h-[100vh] bg-[#F5F7FA] flex items-center justify-center p-6">
        <div
          id="signup-container"
          className="bg-white rounded-2xl shadow-lg w-full max-w-[500px] p-8 relative overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-[#FFC107] rounded-full opacity-10"></div>
          <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-[#1A73E8] rounded-full opacity-10"></div>

          {/* Header */}
          <div id="signup-header" className="text-center mb-8">
            <img
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
              alt="Welcome"
              className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-[#FFC107]"
            />
            <h1 className="text-2xl font-bold text-[#0A1F44]">
              Skillseed Super Admin Login
            </h1>
          </div>

          {/* Signup Form */}
          <form id="signup-form" className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#0A1F44]">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:border-[#1A73E8] focus:ring-2 focus:ring-[#1A73E8] focus:ring-opacity-20 outline-none transition"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#0A1F44]">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:border-[#1A73E8] focus:ring-2 focus:ring-[#1A73E8] focus:ring-opacity-20 outline-none transition"
                  placeholder="Create a password"
                />
              </div>
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-[#1A73E8] hover:bg-blue-600 text-white py-3 rounded-full transition duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Rocket className="w-5 h-5" />
              Signin
            </button>
          </form>

          {/* Floating Decorative Elements */}
          <div className="absolute top-20 right-4 text-[#FFC107] text-xl">
            <Star className="w-5 h-5" />
          </div>
          <div className="absolute bottom-12 left-4 text-[#1A73E8] text-xl">
            <Rocket className="w-5 h-5" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
