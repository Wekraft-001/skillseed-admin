import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  School,
  User,
  Users,
  Award,
  BookOpen,
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
  Shield,
} from "lucide-react";

const UserDetailsPage = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("adminToken");
  const { userId } = useParams();
  const navigate = useNavigate();

  const fetchUserDetails = async () => {
    try {
      const res = await axios.get(`${apiURL}/dashboard/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    //   console.log("User details response:", res.data);
      return res.data;
    } catch (error) {
      console.error("Error fetching user details:", error);
      throw error;
    }
  };

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: fetchUserDetails,
    enabled: !!userId,
  });

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ""}${
      lastName?.charAt(0) || ""
    }`.toUpperCase();
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getRoleBadgeColor = (role) => {
    const colors = {
      student: "bg-blue-50 text-blue-700 border-blue-200",
      parent: "bg-purple-50 text-purple-700 border-purple-200",
      super_admin: "bg-amber-50 text-amber-700 border-amber-200",
      school_admin: "bg-green-50 text-green-700 border-green-200",
    };
    return colors[role] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  const getStatusBadge = (status) => {
    if (status === "completed" || status === "active") {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700 border border-green-200">
          <CheckCircle className="w-4 h-4" />
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      );
    } else if (status === "failed" || status === "inactive") {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-red-50 text-red-700 border border-red-200">
          <XCircle className="w-4 h-4" />
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-yellow-50 text-yellow-700 border border-yellow-200">
          <Clock className="w-4 h-4" />
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      );
    }
  };

  // Determine user type
  const isParent = user?.role === "parent";
  const isStudent = user?.role === "student";
  const isStudentAddedByParent = isStudent && user?.createdBy !== null;
  const isStudentAddedBySchool =
    isStudent && user?.school !== null && user?.createdBy === null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading user details...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Error Loading User
          </h2>
          <p className="text-gray-600 mb-4">
            {error?.response?.data?.message || "Failed to load user details"}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No user data available</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Users
          </button>
          <div className="flex items-center gap-4">
            <div className="relative">
              {user.image ? (
                <img
                  src={user.image}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl border-4 border-white shadow-lg">
                  {getInitials(user.firstName, user.lastName)}
                </div>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {user.firstName} {user.lastName}
              </h1>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getRoleBadgeColor(
                    user.role
                  )}`}
                >
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
                {user.isOAuth && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">
                    <Shield className="w-4 h-4" />
                    OAuth Account
                  </span>
                )}
                {isStudentAddedByParent && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-pink-50 text-pink-700 border border-pink-200">
                    <Users className="w-4 h-4" />
                    Added by Parent
                  </span>
                )}
                {isStudentAddedBySchool && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-teal-50 text-teal-700 border border-teal-200">
                    <School className="w-4 h-4" />
                    Added by School
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Basic Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium text-gray-900 break-words">
                      {user.email}
                    </p>
                  </div>
                </div>

                {user.phoneNumber && user.phoneNumber !== 0 && (
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600">Phone Number</p>
                      <p className="font-medium text-gray-900">
                        {user.phoneNumber}
                      </p>
                    </div>
                  </div>
                )}

                {user.parentEmail && (
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-600">Parent Email</p>
                      <p className="font-medium text-gray-900 break-words">
                        {user.parentEmail}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Student Specific Info */}
            {isStudent && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Student Information
                </h2>
                <div className="space-y-4">
                  {user.grade && (
                    <div className="flex items-start gap-3">
                      <BookOpen className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Grade</p>
                        <p className="font-medium text-gray-900">
                          Grade {user.grade}
                        </p>
                      </div>
                    </div>
                  )}

                  {user.age && (
                    <div className="flex items-start gap-3">
                      <User className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Age</p>
                        <p className="font-medium text-gray-900">
                          {user.age} years old
                        </p>
                      </div>
                    </div>
                  )}

                  {user.quizzes && user.quizzes.length > 0 && (
                    <div className="flex items-start gap-3">
                      <Award className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Quizzes Taken</p>
                        <p className="font-medium text-gray-900">
                          {user.quizzes.length} quizzes
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Account Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Account Details
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Created At</p>
                    <p className="font-medium text-gray-900">
                      {formatDate(user.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Last Updated</p>
                    <p className="font-medium text-gray-900">
                      {formatDate(user.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Additional Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* PARENT SPECIFIC - Show nothing extra for basic parent */}
            {isParent && !user.subscription && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Parent Account
                  </h3>
                  <p className="text-gray-600">
                    This is a parent account with no additional details
                    available.
                  </p>
                </div>
              </div>
            )}

            {/* School Information - Only for students added by school */}
            {isStudentAddedBySchool && user.school && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <School className="w-5 h-5 text-blue-600" />
                  School Information
                </h2>
                <div className="flex items-start gap-4">
                  {user.school.logoUrl && (
                    <img
                      src={user.school.logoUrl}
                      alt={user.school.schoolName}
                      className="w-16 h-16 rounded-lg object-cover border border-gray-200 flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {user.school.schoolName}
                    </h3>
                    <p className="text-gray-600 mt-1 break-words">
                      {user.school.email}
                    </p>
                    {user.school.schoolContactPerson && (
                      <p className="text-sm text-gray-500 mt-1">
                        Contact: {user.school.schoolContactPerson}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Created By Information - Only for students added by parent */}
            {isStudentAddedByParent && user.createdBy && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  Created By (Parent)
                </h2>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                    {getInitials(
                      user.createdBy.firstName,
                      user.createdBy.lastName
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-900">
                      {user.createdBy.firstName} {user.createdBy.lastName}
                    </p>
                    <p className="text-sm text-gray-600 break-words">
                      {user.createdBy.email}
                    </p>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 border ${getRoleBadgeColor(
                        user.createdBy.role
                      )}`}
                    >
                      {user.createdBy.role.charAt(0).toUpperCase() +
                        user.createdBy.role.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Subscription Information - For students added by parents */}
            {isStudentAddedByParent && user.subscription && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-green-600" />
                  Subscription Details
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Amount</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {user.subscription.currency} {user.subscription.amount}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Max Children</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {user.subscription.maxChildren}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <div className="mt-1">
                        {getStatusBadge(user.subscription.status)}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Payment Status</p>
                      <div className="mt-1">
                        {getStatusBadge(user.subscription.paymentStatus)}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Start Date</p>
                      <p className="font-medium text-gray-900">
                        {formatDate(user.subscription.startDate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">End Date</p>
                      <p className="font-medium text-gray-900">
                        {formatDate(user.subscription.endDate)}
                      </p>
                    </div>
                  </div>

                  {user.subscription.payment_options && (
                    <div>
                      <p className="text-sm text-gray-600">Payment Method</p>
                      <p className="font-medium text-gray-900 capitalize">
                        {user.subscription.payment_options}
                      </p>
                    </div>
                  )}

                  {user.subscription.transactionRef && (
                    <div>
                      <p className="text-sm text-gray-600">
                        Transaction Reference
                      </p>
                      <p className="font-mono text-sm text-gray-900 bg-gray-50 p-2 rounded break-all">
                        {user.subscription.transactionRef}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Quiz Information - For all students */}
            {isStudent && user.quizzes && user.quizzes.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-600" />
                  Quiz History
                </h2>
                <div className="space-y-3">
                  {user.quizzes.map((quizId, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <BookOpen className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900">
                            Quiz {index + 1}
                          </p>
                          <p className="text-sm text-gray-600 font-mono break-all">
                            {quizId}
                          </p>
                        </div>
                      </div>
                      {user.initialQuizId === quizId && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded whitespace-nowrap ml-2">
                          Initial Quiz
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
