import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { X, Upload, HelpCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/formComponents/input";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const schoolOptions = [
  { value: "Primary", label: "Primary School" },
  { value: "Secondary", label: "Secondary School" },
  { value: "Combined", label: "Combined School" },
];

const SchoolEditModal = ({ isOpen, onClose, school, onSchoolUpdated }) => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("adminToken");
  const { handleSubmit } = useForm();

  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const initialValue = {
    schoolName: "",
    schoolType: null,
    schoolContactPerson: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    country: "",
  };

  const [formData, setFormData] = useState(initialValue);

  const {
    schoolName,
    schoolType,
    schoolContactPerson,
    email,
    phoneNumber,
    address,
    city,
    country,
  } = formData;

  // Populate form with existing school data when modal opens
  useEffect(() => {
    if (school && isOpen) {
      const schoolTypeOption = schoolOptions.find(
        (option) => option.value === school.schoolType
      );

      setFormData({
        schoolName: school.schoolName || "",
        schoolType: schoolTypeOption || null,
        schoolContactPerson: school.schoolContactPerson || "",
        email: school.email || "",
        phoneNumber: school.phoneNumber || "",
        address: school.address || "",
        city: school.city || "",
        country: school.country || "",
      });

      // Set existing logo as preview
      setLogoPreview(school.logoUrl || null);
      setLogo(null); // Reset file input
    }
  }, [school, isOpen]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData(initialValue);
      setLogoPreview(null);
      setLogo(null);
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      schoolType: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image too large. Max size is 2MB.");
      return;
    }
    setLogo(file);

    const reader = new FileReader();
    reader.onload = () => {
      setLogoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateSchool = () => {
    if (!schoolType) {
      toast.error("School type is required");
      return;
    }

    if (!school?._id) {
      toast.error("School ID is missing");
      return;
    }

    setLoading(true);
    const url = `${apiURL}/schools/update/${school._id}`;
    const updateFormData = new FormData();

    updateFormData.append("schoolName", schoolName);
    updateFormData.append("schoolType", schoolType?.value);
    updateFormData.append("schoolContactPerson", schoolContactPerson);
    updateFormData.append("email", email);
    updateFormData.append("phoneNumber", phoneNumber);
    updateFormData.append("address", address);
    updateFormData.append("city", city);
    updateFormData.append("country", country);

    // Only append logo if a new one was selected
    if (logo) {
      updateFormData.append("logo", logo);
    }

    axios
      .patch(url, updateFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response, "response from updating school");
        if (response.status === 200) {
          toast.success("School Successfully Updated");

          // Call the callback to refresh the school data
          if (onSchoolUpdated) {
            onSchoolUpdated();
          }

          onClose();
        }
      })
      .catch((error) => {
        const message =
          error?.response?.data?.message ||
          "Something went wrong while updating";
        toast.error(message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCancel = () => {
    setFormData(initialValue);
    setLogoPreview(null);
    setLogo(null);
    onClose();
  };

  return (
    <>
      <ToastContainer />
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white no-scrollbar">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#0F1419]">
              Edit School Details
            </DialogTitle>
            <p className="text-gray-500">Update school information</p>
          </DialogHeader>

          <div className="mt-3">
            <form
              onSubmit={handleSubmit(handleUpdateSchool)}
              className="space-y-6"
            >
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">
                    School Name
                  </label>
                  <Input
                    type="text"
                    name="schoolName"
                    value={schoolName}
                    onChange={handleInputChange}
                    placeholder="Enter school name"
                    className="rounded-xl border-gray-200 focus:border-[#1A73E8]"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">
                    School Type
                  </label>
                  <Select
                    options={schoolOptions}
                    value={schoolType}
                    onChange={handleSelectChange}
                    placeholder="Select school type"
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">
                    School Contact Person
                  </label>
                  <Input
                    type="text"
                    name="schoolContactPerson"
                    value={schoolContactPerson}
                    onChange={handleInputChange}
                    placeholder="Enter full name of contact person"
                    className="rounded-xl border-gray-200 focus:border-[#1A73E8]"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                    placeholder="school@example.com"
                    className="rounded-xl border-gray-200 focus:border-[#1A73E8]"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    className="rounded-xl border-gray-200 focus:border-[#1A73E8]"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">
                    Address
                  </label>
                  <Input
                    type="text"
                    name="address"
                    value={address}
                    onChange={handleInputChange}
                    placeholder="Enter school address"
                    className="rounded-xl border-gray-200 focus:border-[#1A73E8]"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">
                    City
                  </label>
                  <Input
                    type="text"
                    name="city"
                    value={city}
                    onChange={handleInputChange}
                    placeholder="Enter City"
                    className="rounded-xl border-gray-200 focus:border-[#1A73E8]"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">
                    Country
                  </label>
                  <Input
                    type="text"
                    name="country"
                    value={country}
                    onChange={handleInputChange}
                    placeholder="Enter Country"
                    className="rounded-xl border-gray-200 focus:border-[#1A73E8]"
                    required
                  />
                </div>
              </div>

              {/* Document Upload */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">School Logo</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#1A73E8] transition-colors cursor-pointer relative"
                    onClick={() =>
                      document.getElementById("schoolLogoEditInput")?.click()
                    }
                  >
                    {logoPreview ? (
                      <div className="relative">
                        <img
                          src={logoPreview}
                          alt="School Logo Preview"
                          className="mx-auto h-20 object-contain"
                        />
                        <p className="text-xs text-gray-500 mt-2">
                          {logo ? "New logo selected" : "Current logo"}
                        </p>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-10 h-10 text-gray-400 mb-2 mx-auto" />
                        <p className="text-gray-600">Upload New School Logo</p>
                        <span className="text-sm text-gray-400">
                          JPG or PNG (Max 2MB) - Optional
                        </span>
                      </>
                    )}

                    <input
                      type="file"
                      id="schoolLogoEditInput"
                      accept="image/png, image/jpeg"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  Leave empty to keep the current logo unchanged
                </p>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-2xl bg-gray-200 text-gray-700 font-semibold p-3 cursor-pointer hover:bg-gray-300 transition-colors"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-2xl bg-[#092043] text-white font-semibold p-3 cursor-pointer hover:bg-[#092043]/90 transition-colors disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Updating...
                    </div>
                  ) : (
                    "Update School"
                  )}
                </button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SchoolEditModal;
