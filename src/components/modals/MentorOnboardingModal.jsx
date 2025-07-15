import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/formComponents/input";
import { Camera, Upload, ArrowRight, Star, Users } from "lucide-react";
import Select from "react-select";
import { ToastContainer } from "react-toastify";

const specialtyOptions = [
  { value: "Science", label: "Science" },
  { value: "Arts", label: "Arts" },
  { value: "Technology", label: "Technology" },
  { value: "Mathematics", label: "Mathematics" },
  { value: "Entrepreneurship", label: "Entrepreneurship" },
];

const MentorOnboardingModal = ({ open, onOpenChange }) => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("adminToken");
  const { handleSubmit } = useForm();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const initialValue = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    specialty: null,
    city: "",
    country: "",
  };

  const [createMentorDetails, setCreateMentorDetails] = useState(initialValue);

  const { firstName, lastName, email, phoneNumber, specialty, city, country } =
    createMentorDetails;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreateMentorDetails({ ...createMentorDetails, [name]: value });
  };

  const handleSelectChange = (value) => {
    setCreateMentorDetails((prev) => ({
      ...prev,
      specialty: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Image too large. Max size is 2MB.");
      return;
    }
    setImage(file);

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAddMentor = () => {
    if (!specialty) {
      alert("Specialty is required");
      return;
    }

    if (!image) {
      alert("Image is required");
      return;
    }

    setLoading(true);
    const url = `${apiURL}/mentors/onboard`;
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("specialty", specialty?.value);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);
    formData.append("city", city);
    formData.append("country", country);
    formData.append("image", image);

    setLoading(false);
    axios
      .post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response, "response from adding mentor");
        if (response.status === 201) {
          toast.success("Mentor Successfully Added");
          setCreateMentorDetails(initialValue);
          setImagePreview(null);
          setImage(null);
          onClose();
        }
      })
      .catch((error) => {
        const message =
          error?.response?.data?.message || "Something went wrong";
        alert(message);
      })

      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <ToastContainer />
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

          {/* <div className="mb-8 relative z-10">
            <div className="flex justify-between mb-2">
              <span className="text-blue-600 font-semibold">
                Step 1 of 2: Mentor Info
              </span>
              <span className="text-gray-500">50% Complete</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div className="w-1/2 h-2 bg-blue-600 rounded-full"></div>
            </div>
          </div> */}

          <form
            className="space-y-7 relative z-10"
            onSubmit={handleSubmit(handleAddMentor)}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">
                  First Name
                </label>
                <Input
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={handleInputChange}
                  placeholder="e.g. Jane"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">
                  Last Name
                </label>
                <Input
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={handleInputChange}
                  placeholder="e.g. Doe"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600"
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
                  placeholder="mentor@example.com"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">
                  Phone Number
                </label>
                <Input
                  type="text"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">
                  Speciality/Subject
                </label>
                <Select
                  options={specialtyOptions}
                  value={specialty}
                  onChange={handleSelectChange}
                  placeholder="Select Specialty"
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">City</label>
                <Input
                  type="text"
                  name="city"
                  value={city}
                  onChange={handleInputChange}
                  placeholder="Enter city of residence"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600"
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
                  placeholder="Enter phone number"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Profile Picture</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#1A73E8] transition-colors cursor-pointer relative"
                  onClick={() => document.getElementById("imageInput")?.click()}
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Profile Photo Preview"
                      className="mx-auto h-20 object-contain"
                    />
                  ) : (
                    <>
                      <Upload className="w-10 h-10 text-gray-400 mb-2 mx-auto" />
                      <p className="text-gray-600">
                        Upload Mentor Profile Picture
                      </p>
                      <span className="text-sm text-gray-400">
                        JPG or PNG (Max 2MB)
                      </span>
                    </>
                  )}

                  <input
                    type="file"
                    id="imageInput"
                    accept="image/png, image/jpeg"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>
            </div>
            {/* <div className="space-y-2">
              <label className="block text-gray-700 font-medium">
                Short Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 h-24"
                placeholder="Something fun about the mentor, hobbies, why they love helping kids..."
              />
            </div> */}

            {/* <div className="space-y-4">
              <h3 className="text-lg font-semibold">Verification Document</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center flex flex-col items-center">
                <Upload className="w-12 h-12 text-gray-400 mb-2" />
                <p className="text-gray-600">Upload ID / Certification</p>
                <span className="text-sm text-gray-400">
                  PDF, JPG or PNG (Max 5MB)
                </span>
              </div>
            </div> */}

            <div className="flex justify-end space-x-4 pt-7 border-t border-t-gray-100">
              {/* <button
                type="button"
                variant="outline"
                className="px-6 py-3 rounded-full font-semibold"
              >
                Save as Draft
              </button> */}
              <button
                type="submit"
                className="px-6 py-3 bg-[#092043] text-white rounded-full font-semibold hover:bg-[#092043]/90 flex items-center space-x-2"
                disabled={loading}
              >
                <span>
                  {" "}
                  {loading ? (
                    <svg
                      className="animate-spin h-6 w-6 text-white"
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
                  ) : (
                    "Submit"
                  )}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* <section className="mt-12">
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
          </section> */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MentorOnboardingModal;
