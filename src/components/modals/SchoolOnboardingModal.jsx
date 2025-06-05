import React, { useState } from "react";
import { X, Upload, HelpCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/formComponents/input";
import { Textarea } from "../ui/formComponents/textarea";

const SchoolOnboardingModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    schoolName: "",
    schoolType: "Primary School",
    email: "",
    phone: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      schoolType: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  const handleSaveAsDraft = () => {
    console.log("Saved as draft:", formData);
    // Handle save as draft logic here
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#0F1419]">
            School Onboarding
          </DialogTitle>
          <p className="text-gray-500">Add a new school to SkillSeed</p>
        </DialogHeader>

        <div className="mt-6">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-[#1A73E8] font-semibold">
                Step 1 of 3: Basic Information
              </span>
              <span className="text-gray-500">33% Complete</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div className="w-1/3 h-2 bg-[#1A73E8] rounded-full"></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">
                  School Name
                </label>
                <Input
                  type="text"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleInputChange}
                  placeholder="Enter school name"
                  className="rounded-xl border-gray-200 focus:border-[#1A73E8]"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">
                  School Type
                </label>
                {/* <Select
                  value={formData.schoolType}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger className="rounded-xl border-gray-200 focus:border-[#1A73E8]">
                    <SelectValue placeholder="Select school type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border shadow-lg rounded-xl z-[100]">
                    <SelectItem value="Primary School">
                      Primary School
                    </SelectItem>
                    <SelectItem value="Secondary School">
                      Secondary School
                    </SelectItem>
                    <SelectItem value="Combined School">
                      Combined School
                    </SelectItem>
                  </SelectContent>
                </Select> */}
              </div>
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">
                  Email Address
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="school@example.com"
                  className="rounded-xl border-gray-200 focus:border-[#1A73E8]"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  className="rounded-xl border-gray-200 focus:border-[#1A73E8]"
                />
              </div>
            </div>

            {/* Address Section */}
            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">Address</label>
              <Textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter school address"
                className="rounded-xl border-gray-200 focus:border-[#1A73E8] min-h-[96px]"
              />
            </div>

            {/* Document Upload */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Required Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#1A73E8] transition-colors cursor-pointer">
                  <Upload className="w-10 h-10 text-gray-400 mb-2 mx-auto" />
                  <p className="text-gray-600">Upload School License</p>
                  <span className="text-sm text-gray-400">
                    PDF, JPG or PNG (Max 5MB)
                  </span>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#1A73E8] transition-colors cursor-pointer">
                  <Upload className="w-10 h-10 text-gray-400 mb-2 mx-auto" />
                  <p className="text-gray-600">Upload School Logo</p>
                  <span className="text-sm text-gray-400">
                    JPG or PNG (Max 2MB)
                  </span>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t">
              <button
                type="button"
                variant="outline"
                onClick={handleSaveAsDraft}
                className="rounded-full border border-gray-300 hover:bg-gray-50 p-2.5"
              >
                Save as Draft
              </button>
              <button
                type="submit"
                className="rounded-full bg-[#1A73E8] text-white hover:bg-[#1A73E8]/90 p-2.5"
              >
                Continue to Next Step
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SchoolOnboardingModal;
