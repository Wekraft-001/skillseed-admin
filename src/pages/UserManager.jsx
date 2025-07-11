import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { SkeletonList } from "../components/LoadingSkeleton";

const UserManagager = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("adminToken");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [selectedSchool, setSelectedSchool] = useState("All Schools");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const users1 = [
    {
      id: 1,
      name: "John Smith",
      email: "john@email.com",
      avatar:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg",
      role: "Student",
      school: "Green Valley School",
      status: "Active",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@email.com",
      avatar:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
      role: "Teacher",
      school: "Sunshine Academy",
      status: "Active",
    },
    {
      id: 3,
      name: "Emma Davis",
      email: "emma@email.com",
      avatar:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg",
      role: "Parent",
      school: "Green Valley School",
      status: "Pending",
    },
  ];

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "student":
        return "bg-blue-100 text-blue-600";
      case "super_admin":
        return "bg-yellow-100 text-yellow-600";
      case "parent":
        return "bg-purple-100 text-purple-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-600";
      case "Pending":
        return "bg-yellow-100 text-yellow-600";
      case "Inactive":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  useEffect(() => {
    const getUsers = () => {
      setLoading(true);
      axios
        .get(`${apiURL}/users/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        })
        .then((response) => {
          // console.log(response.data, "Users");
          setUsers(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching vendors:", error);
          setLoading(false);
        });
    };

    getUsers();
  }, []);

  // Calculate pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div className="bg-[#F5F7FA] min-h-[calc(100vh-80px)] relative">
      <div className="absolute left-[-120px] top-12 w-56 h-56 bg-[#1A73E8]/10 rounded-full z-0"></div>
      <div className="absolute right-[80px] top-[5px] w-40 h-40 bg-[#1A73E8]/10 rounded-full z-0"></div>
      <div className="absolute right-[30px] bottom-[20px] w-32 h-32 bg-[#FFC107]/20 rounded-full z-0"></div>
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-[#0F1419]">
              User Management
            </h1>
            <p className="text-gray-500 mt-1">
              Manage all users and their profiles
            </p>
          </div>
        </header>

        {/* Filters */}
        <div className="bg-white p-6 rounded-2xl shadow-sm mb-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-blue-600"
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              </div>
            </div>
            <div className="flex gap-2 md:gap-4">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="p-2 md:px-4 md:py-2 rounded-full border border-gray-200 focus:outline-none focus:border-blue-600"
              >
                <option>All Roles</option>
                <option>Students</option>
                <option>Parents</option>
                <option>Mentors</option>
              </select>
              {/* <select
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
                className="md:px-4 md:py-2 rounded-full border border-gray-200 focus:outline-none focus:border-blue-600"
              >
                <option>All Schools</option>
                <option>School A</option>
                <option>School B</option>
                <option>School C</option>
              </select> */}
              {/* <button className="bg-blue-600 text-white p-2 md:px-6 md:py-2 rounded-full hover:bg-blue-600/90 flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Add User
              </button> */}
            </div>
          </div>
        </div>

        {/* User List */}
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-xl font-semibold text-[#0F1419]">All Users</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F5F7FA]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                    Role
                  </th>
                  {/* <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                    School
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                    Status
                  </th> */}
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <SkeletonList key={i} />
                    ))}
                  </div>
                ) : (
                  <>
                    {currentUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <img
                              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg"
                              className="w-10 h-10 rounded-full object-cover"
                              alt={user.name}
                            />
                            <div>
                              <p className="font-medium text-[#0F1419]">
                                {user.firstName + " " + user.lastName}
                              </p>
                              <p className="text-sm text-gray-500">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleBadgeColor(
                              user.role
                            )}`}
                          >
                            {user.role}
                          </span>
                        </td>
                        {/* <td className="px-6 py-4 text-gray-700">{user.school}</td> */}
                        {/* <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(
                          user.status
                        )}`}
                      >
                        {user.status}
                      </span>
                    </td> */}
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-[#0F1419] p-1">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="text-red-500 hover:text-red-700 p-1">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
          <div className="p-3 md:p-6 flex flex-col-reverse md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500">
              {" "}
              Showing {indexOfFirstUser + 1} to{" "}
              {Math.min(indexOfLastUser, users.length)} of {users.length}{" "}
              entries
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="px-4 py-2 rounded-full border border-gray-200 hover:bg-blue-600 hover:text-white"
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded-full border ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white"
                      : "border-gray-200 hover:bg-blue-600 hover:text-white"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className="px-4 py-2 rounded-full border border-gray-200 hover:bg-blue-600 hover:text-white"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagager;
