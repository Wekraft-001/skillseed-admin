import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/formComponents/input";
import { Camera, Upload, ArrowRight, Star, Users } from "lucide-react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

const MentorOnboardingModal = ({ open, onOpenChange }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    specialty: "Science",
    email: "",
    phone: "",
    bio: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 bg-white">
        <div className="bg-white rounded-3xl shadow-md p-8 relative overflow-hidden">
          <span className="absolute left-0 top-0 w-24 h-24 bg-blue-600 opacity-10 rounded-full z-0"></span>
          <span className="absolute right-0 bottom-0 w-32 h-32 bg-yellow-400 opacity-10 rounded-full z-0"></span>

          <DialogHeader className="relative z-10 mb-8">
            <DialogTitle className="text-3xl font-bold text-gray-900">
              Mentor Onboarding
            </DialogTitle>
            <p className="text-gray-500">Add a new mentor to SkillSeed</p>
          </DialogHeader>

          <div className="mb-8 relative z-10">
            <div className="flex justify-between mb-2">
              <span className="text-blue-600 font-semibold">
                Step 1 of 2: Mentor Info
              </span>
              <span className="text-gray-500">50% Complete</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div className="w-1/2 h-2 bg-blue-600 rounded-full"></div>
            </div>
          </div>

          <form className="space-y-7 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">
                  Mentor Full Name
                </label>
                <Input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
                  placeholder="e.g. Jane Doe"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">
                  Speciality/Subject
                </label>
                {/* <Select
                  value={formData.specialty}
                  onValueChange={(value) =>
                    handleInputChange("specialty", value)
                  }
                >
                  <SelectTrigger className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <SelectValue placeholder="Select speciality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Science">Science</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Entrepreneurship">
                      Entrepreneurship
                    </SelectItem>
                    <SelectItem value="Arts">Arts</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select> */}
              </div>
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">
                  Email Address
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="mentor@example.com"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Enter phone number"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Profile Picture</h3>
              <div className="flex items-center space-x-6">
                <div className="relative group">
                  <img
                    src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=96&h=96&facepad=2&q=80"
                    className="w-24 h-24 rounded-full border-4 border-blue-600 object-cover shadow-lg bg-gray-100"
                    alt="Profile"
                  />
                  <button
                    type="button"
                    size="icon"
                    className="absolute bottom-0 right-0 bg-yellow-400 p-2 rounded-full border-2 border-white hover:bg-yellow-400/90 text-gray-900"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-gray-500 text-sm">
                  Use a cute photo! (JPG or PNG, Max 2MB)
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">
                Short Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 h-24"
                placeholder="Something fun about the mentor, hobbies, why they love helping kids..."
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Verification Document</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center flex flex-col items-center">
                <Upload className="w-12 h-12 text-gray-400 mb-2" />
                <p className="text-gray-600">Upload ID / Certification</p>
                <span className="text-sm text-gray-400">
                  PDF, JPG or PNG (Max 5MB)
                </span>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-7 border-t">
              <button
                type="button"
                variant="outline"
                className="px-6 py-3 rounded-full font-semibold"
              >
                Save as Draft
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-600/90 flex items-center space-x-2"
              >
                <span>Continue to Next Step</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <section className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <Users className="w-6 h-6 text-yellow-400" />
              <span>Our Fun Mentors!</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center space-y-3 relative">
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
                  className="w-20 h-20 rounded-full border-4 border-yellow-400 object-cover bg-gray-100"
                  alt="Mr. James"
                />
                <div className="text-center">
                  <div className="font-semibold text-lg text-gray-800">
                    Mr. James
                  </div>
                  <div className="text-sm text-gray-500">Science Mentor</div>
                </div>
                <span className="absolute -top-3 -right-3 bg-blue-600 text-white p-2 rounded-full shadow-lg">
                  <Star className="w-4 h-4" />
                </span>
              </div>
              <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center space-y-3 relative">
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg"
                  className="w-20 h-20 rounded-full border-4 border-blue-600 object-cover bg-gray-100"
                  alt="Ms. Zainab"
                />
                <div className="text-center">
                  <div className="font-semibold text-lg text-gray-800">
                    Ms. Zainab
                  </div>
                  <div className="text-sm text-gray-500">Maths Mentor</div>
                </div>
                <span className="absolute -top-3 -right-3 bg-yellow-400 text-gray-900 p-2 rounded-full shadow-lg">
                  <Star className="w-4 h-4" />
                </span>
              </div>
              <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center space-y-3 relative">
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
                  className="w-20 h-20 rounded-full border-4 border-yellow-400 object-cover bg-gray-100"
                  alt="Mr. David"
                />
                <div className="text-center">
                  <div className="font-semibold text-lg text-gray-800">
                    Mr. David
                  </div>
                  <div className="text-sm text-gray-500">Tech Mentor</div>
                </div>
                <span className="absolute -top-3 -right-3 bg-blue-600 text-white p-2 rounded-full shadow-lg">
                  <Star className="w-4 h-4" />
                </span>
              </div>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MentorOnboardingModal;
