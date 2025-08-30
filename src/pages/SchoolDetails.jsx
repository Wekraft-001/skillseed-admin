import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  ArrowLeft,
  MapPin,
  Edit,
  Eye,
  Info,
  BarChart,
  Users,
  GraduationCap,
  Trophy,
  Phone,
  Mail,
  Calendar,
  Globe,
  UserCheck,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import SchoolEditModal from "../components/modals/SchoolEditModal";

const SchoolDetails = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("adminToken");
  const { schoolId } = useParams();
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Fetch individual school data
  const fetchSchoolDetails = async () => {
    const res = await axios.get(`${apiURL}/schools/${schoolId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    // console.log(res);
    return res.data;
  };

  const {
    data: school,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["school", schoolId],
    queryFn: fetchSchoolDetails,
    enabled: !!schoolId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleSchoolUpdated = () => {
    // Refetch the school data after successful update
    refetch();
  };

  const getSchoolTypeColor = (schoolType) => {
    switch (schoolType) {
      case "Primary":
        return "bg-yellow-400/90 text-slate-900";
      case "Secondary":
        return "bg-blue-600/90 text-white";
      case "Combined":
        return "bg-yellow-400/90 text-slate-900";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-green-600";
      case "pending":
        return "text-yellow-600";
      case "inactive":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Error Loading School
            </h2>
            <p className="text-gray-600">
              {error?.message || "Failed to load school details"}
            </p>
            <Button
              onClick={() => navigate("/schools")}
              className="mt-4 bg-blue-600 hover:bg-blue-700"
            >
              Back to Schools
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!school) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-600 mb-4">
              School Not Found
            </h2>
            <Button
              onClick={() => navigate("/schools")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Back to Schools
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-12 h-12"
            onClick={() => navigate("/schools")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              School Details
            </h1>
            <p className="text-slate-500">View and manage school information</p>
          </div>
        </div>
      </header>

      <div className="relative z-10">
        <Card className="mb-8 border-0 shadow-lg relative overflow-hidden">
          <div className="absolute top-[-20px] right-[-20px] w-16 h-16 bg-yellow-400/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-[-10px] left-[-10px] w-12 h-12 bg-blue-600/20 rounded-full animate-pulse"></div>

          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 relative z-10">
              <div className="flex items-center gap-6">
                <img
                  src={school.logoUrl}
                  className="w-24 h-24 rounded-full border-4 border-blue-600 ring-4 ring-yellow-400 object-cover shadow-lg bg-white"
                  alt={`${school.schoolName} Logo`}
                />
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">
                    {school.schoolName}
                  </h2>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    <span className="text-slate-600">
                      {school.address}, {school.city}, {school.country}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span
                      className={`text-xs px-4 py-2 rounded-full font-semibold ${getSchoolTypeColor(
                        school.schoolType
                      )}`}
                    >
                      {school.schoolType} School
                    </span>
                    <span
                      className={`flex items-center gap-1 ${getStatusColor(
                        school.status
                      )}`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          school.status === "completed"
                            ? "bg-green-600"
                            : school.status === "pending"
                            ? "bg-yellow-600"
                            : "bg-red-600"
                        }`}
                      ></div>
                      {school.status.charAt(0).toUpperCase() +
                        school.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="ml-auto flex gap-3">
                <Button
                  onClick={handleOpenEditModal}
                  className="bg-yellow-400 text-slate-900 hover:bg-yellow-400/90"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Details
                </Button>
                {/* <Button className="bg-blue-600 text-white hover:bg-blue-600/90">
                  <Eye className="h-4 w-4 mr-2" />
                  View Portal
                </Button> */}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <Info className="h-6 w-6 text-blue-600" />
                School Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                      School Name
                    </label>
                    <p className="text-lg font-medium text-slate-900 mt-1">
                      {school.schoolName}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </label>
                    <p className="text-lg text-slate-900 mt-1">
                      {school.email}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone
                    </label>
                    <p className="text-lg text-slate-900 mt-1">
                      {school.phoneNumber}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                      School Type
                    </label>
                    <p className="text-lg text-slate-900 mt-1">
                      {school.schoolType} School
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-2">
                      <UserCheck className="h-4 w-4" />
                      Contact Person
                    </label>
                    <p className="text-lg text-slate-900 mt-1">
                      {school.schoolContactPerson}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                      Student Limit
                    </label>
                    <p className="text-lg text-slate-900 mt-1">
                      {school.studentsLimit}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                      Account Status
                    </label>
                    <p
                      className={`text-lg mt-1 font-semibold ${getStatusColor(
                        school.status
                      )}`}
                    >
                      {school.status.charAt(0).toUpperCase() +
                        school.status.slice(1)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Joined SkillSeed
                    </label>
                    <p className="text-lg text-slate-900 mt-1">
                      {formatDate(school.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <label className="text-sm font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Full Address
                </label>
                <p className="text-lg text-slate-900 mt-1">
                  {school.address}, {school.city}, {school.country}
                </p>
              </div>
              {/* {school.superAdmin && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <label className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                    Created By
                  </label>
                  <p className="text-lg text-slate-900 mt-1">
                    {school.superAdmin.firstName} {school.superAdmin.lastName}
                  </p>
                  <p className="text-sm text-slate-600">
                    {school.superAdmin.email}
                  </p>
                </div>
              )} */}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-yellow-400" />
                  Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-600/5 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Students</p>
                      <p className="text-2xl font-bold text-slate-900">
                        {school.students?.length || 0}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-yellow-400/5 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-yellow-400/20 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Student Limit</p>
                      <p className="text-2xl font-bold text-slate-900">
                        {school.studentsLimit}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Trophy className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Transactions</p>
                      <p className="text-2xl font-bold text-slate-900">
                        {school.transactions?.length || 0}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Last Updated</p>
                      <p className="text-sm font-bold text-slate-900">
                        {formatDate(school.updatedAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* School Status Card */}
            {/* <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Info className="h-5 w-5 text-blue-600" />
                  Account Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Account Status</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      school.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : school.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {school.status.charAt(0).toUpperCase() +
                      school.status.slice(1)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-600">School Type</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getSchoolTypeColor(
                      school.schoolType
                    )}`}
                  >
                    {school.schoolType}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Role</span>
                  <span className="text-slate-900 font-medium capitalize">
                    {school.role?.replace("_", " ")}
                  </span>
                </div>

                {school.deletedAt && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Deleted At</span>
                    <span className="text-red-600 font-medium">
                      {formatDate(school.deletedAt)}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card> */}
          </div>
        </div>
      </div>

      <SchoolEditModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        school={school}
        onSchoolUpdated={handleSchoolUpdated}
      />
    </div>
  );
};

export default SchoolDetails;
