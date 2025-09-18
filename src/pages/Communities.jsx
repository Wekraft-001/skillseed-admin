import React, { useState } from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Plus,
  Bell,
  UsersRound,
  Users,
  Clock,
  Flag,
  Shield,
  CheckCheck,
  Settings,
  Filter,
  Beaker,
  Calculator,
  Bot,
  Eye,
  Cog,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/formComponents/select";
import { Input } from "../components/ui/formComponents/input";
import { Textarea } from "../components/ui/formComponents/textarea";
import { Label } from "../components/ui/label";
import { toast, ToastContainer } from "react-toastify";

const Communities = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("adminToken");
  const queryClient = useQueryClient();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filters, setFilters] = useState({
    type: "",
    ageGroup: "",
    status: "",
    region: "",
  });

  // Form state for creating community
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    ageGroup: "",
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleFormChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      category: "",
      ageGroup: "",
    });
  };

  const fetchCategories = async () => {
    const res = await axios.get(`${apiURL}/dashboard/all-categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    // console.log(res.data);
    return res.data;
  };

  const fetchCommunities = async () => {
    try {
      const res = await axios.get(`${apiURL}/communities/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.error("Error fetching communities:", error);
      throw error;
    }
  };

  const createCommunity = async (communityData) => {
    const res = await axios.post(`${apiURL}/communities`, communityData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  };

  // Categories Query
  const {
    data: categories = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["categories-in-community"],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000,
  });

  // Communities Query
  const {
    data: communities = [],
    isLoading: communitiesLoading,
    isError: communitiesError,
    refetch: refetchCommunities,
  } = useQuery({
    queryKey: ["communities"],
    queryFn: fetchCommunities,
    staleTime: 5 * 60 * 1000,
  });

  const createCommunityMutation = useMutation({
    mutationFn: createCommunity,
    onSuccess: () => {
      // Reset form and close modal
      resetForm();
      setShowCreateModal(false);

      // You might want to refetch communities list here if you have that query
      queryClient.invalidateQueries(["communities"]);

      // Show success message (you can implement toast notifications)
      console.log("Community created successfully!");
      toast.success("Community created successfully!");
    },
    onError: (error) => {
      console.error("Error creating community:", error);
      // Show error message (you can implement toast notifications)
    },
  });

  const handleCreateCommunity = () => {
    // Validate form
    if (
      !formData.name ||
      !formData.description ||
      !formData.category ||
      !formData.ageGroup
    ) {
      console.error("Please fill in all required fields");
      return;
    }

    createCommunityMutation.mutate(formData);
  };

  // Helper function to get community icon based on category
  const getCommunityIcon = (categoryName) => {
    switch (categoryName?.toLowerCase()) {
      case "science":
        return <Beaker className="h-6 w-6 text-green-500" />;
      case "mathematics":
      case "math":
        return <Calculator className="h-6 w-6 text-yellow-500" />;
      case "technology":
      case "tech":
        return <Bot className="h-6 w-6 text-blue-600" />;
      default:
        return <Users className="h-6 w-6 text-purple-500" />;
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900">
              Community Management
            </h1>
            <p className="text-slate-500">
              Create and manage safe, engaging learning communities for kids
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Community
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md bg-white">
                <DialogHeader>
                  <DialogTitle>Create New Community</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Community Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleFormChange("name", e.target.value)}
                      placeholder="Enter community name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        handleFormChange("description", e.target.value)
                      }
                      placeholder="Describe your community"
                    />
                  </div>
                  <div>
                    <Label>Community Type</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        handleFormChange("category", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-0">
                        {isLoading ? (
                          <SelectItem value="" disabled>
                            Loading categories...
                          </SelectItem>
                        ) : isError ? (
                          <SelectItem value="" disabled>
                            Error loading categories
                          </SelectItem>
                        ) : (
                          categories.map((category) => (
                            <SelectItem
                              key={
                                category.id || category.value || category.name
                              }
                              value={
                                category.value || category.id || category.name
                              }
                            >
                              {category.name || category.label}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Age Group</Label>
                    <Select
                      value={formData.ageGroup}
                      onValueChange={(value) =>
                        handleFormChange("ageGroup", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select age group" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-0">
                        <SelectItem value="6-8">6-8 years</SelectItem>
                        <SelectItem value="9-12">9-12 years</SelectItem>
                        <SelectItem value="13-15">13-15 years</SelectItem>
                        <SelectItem value="16-18">16-18 years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        resetForm();
                        setShowCreateModal(false);
                      }}
                      className="flex-1"
                      disabled={createCommunityMutation.isPending}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleCreateCommunity}
                      className="flex-1"
                      disabled={createCommunityMutation.isPending}
                    >
                      {createCommunityMutation.isPending
                        ? "Creating..."
                        : "Create Community"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 relative overflow-hidden">
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-100 rounded-full opacity-20"></div>
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-600/10 p-3 rounded-full">
                <UsersRound className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-blue-600 text-sm font-semibold">Total</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">
              {communities?.length}
            </h3>
            <p className="text-slate-500 text-sm">Active Communities</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 relative overflow-hidden">
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-green-100 rounded-full opacity-20"></div>
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-500/10 p-3 rounded-full">
                <Users className="h-6 w-6 text-green-500" />
              </div>
              <span className="text-green-500 text-sm font-semibold">
                Members
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">3,456</h3>
            <p className="text-slate-500 text-sm">Young Learners</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 relative overflow-hidden">
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-100 rounded-full opacity-20"></div>
            <div className="flex items-center justify-between mb-4">
              <div className="bg-yellow-500/10 p-3 rounded-full">
                <Clock className="h-6 w-6 text-yellow-500" />
              </div>
              <span className="text-yellow-500 text-sm font-semibold">
                Pending
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">18</h3>
            <p className="text-slate-500 text-sm">Posts for Review</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 relative overflow-hidden">
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-pink-100 rounded-full opacity-20"></div>
            <div className="flex items-center justify-between mb-4">
              <div className="bg-red-500/10 p-3 rounded-full">
                <Flag className="h-6 w-6 text-red-500" />
              </div>
              <span className="text-red-500 text-sm font-semibold">
                Reports
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">3</h3>
            <p className="text-slate-500 text-sm">Need Attention</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 mb-8 hidden">
          <h3 className="text-xl font-bold text-slate-900 mb-6">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="bg-blue-600 text-white px-6 py-4 rounded-full font-semibold h-auto">
              <Plus className="h-5 w-5 mr-2" />
              New Community
            </Button>
            <Button className="bg-yellow-500 text-slate-900 px-6 py-4 rounded-full font-semibold h-auto">
              <Shield className="h-5 w-5 mr-2" />
              Review Reports
            </Button>
            <Button className="bg-green-500 text-white px-6 py-4 rounded-full font-semibold h-auto">
              <CheckCheck className="h-5 w-5 mr-2" />
              Approve Posts
            </Button>
            <Button className="bg-purple-500 text-white px-6 py-4 rounded-full font-semibold h-auto">
              <Settings className="h-5 w-5 mr-2" />
              Manage Settings
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 mb-8">
          <h3 className="text-xl font-bold text-slate-900 mb-6">
            Filter Communities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <Label className="block text-sm font-medium text-slate-700 mb-2">
                Community Type
              </Label>
              <Select
                value={filters.type}
                onValueChange={(value) => handleFilterChange("type", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.id || category.value || category.name}
                      value={category.value || category.id || category.name}
                    >
                      {category.name || category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="block text-sm font-medium text-slate-700 mb-2">
                Age Group
              </Label>
              <Select
                value={filters.ageGroup}
                onValueChange={(value) => handleFilterChange("ageGroup", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Ages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ages</SelectItem>
                  <SelectItem value="5-8">5-8 years</SelectItem>
                  <SelectItem value="9-12">9-12 years</SelectItem>
                  <SelectItem value="13-16">13-16 years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="block text-sm font-medium text-slate-700 mb-2">
                Status
              </Label>
              <Select
                value={filters.status}
                onValueChange={(value) => handleFilterChange("status", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="block text-sm font-medium text-slate-700 mb-2">
                Region
              </Label>
              <Select
                value={filters.region}
                onValueChange={(value) => handleFilterChange("region", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Regions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="nigeria">Nigeria</SelectItem>
                  <SelectItem value="ghana">Ghana</SelectItem>
                  <SelectItem value="kenya">Kenya</SelectItem>
                  <SelectItem value="south-africa">South Africa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold">
            <Filter className="h-4 w-4 mr-2" />
            Apply Filters
          </Button>
        </div>

        {/* Communities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 relative overflow-hidden hover:shadow-xl transition">
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-green-100 rounded-full opacity-20"></div>
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-500/10 p-3 rounded-full">
                <Beaker className="h-6 w-6 text-green-500" />
              </div>
              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium">
                Active
              </span>
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">
              Young Scientists Club
            </h4>
            <p className="text-slate-500 text-sm mb-4">
              Exploring the wonders of science through fun experiments
            </p>
            <div className="flex items-center justify-between mb-4">
              <div className="flex -space-x-2">
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
                  className="w-8 h-8 rounded-full border-2 border-white"
                  alt="Member"
                />
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg"
                  className="w-8 h-8 rounded-full border-2 border-white"
                  alt="Member"
                />
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg"
                  className="w-8 h-8 rounded-full border-2 border-white"
                  alt="Member"
                />
                <span className="w-8 h-8 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center border-2 border-white">
                  +42
                </span>
              </div>
              <span className="text-sm text-slate-500">45 members</span>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View
              </Button>
              <Button variant="outline" size="sm">
                <Cog className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 relative overflow-hidden hover:shadow-xl transition">
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-100 rounded-full opacity-20"></div>
            <div className="flex items-center justify-between mb-4">
              <div className="bg-yellow-500/10 p-3 rounded-full">
                <Calculator className="h-6 w-6 text-yellow-500" />
              </div>
              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium">
                Active
              </span>
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">
              Math Wizards
            </h4>
            <p className="text-slate-500 text-sm mb-4">
              Making math magical and fun for young minds
            </p>
            <div className="flex items-center justify-between mb-4">
              <div className="flex -space-x-2">
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
                  className="w-8 h-8 rounded-full border-2 border-white"
                  alt="Member"
                />
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
                  className="w-8 h-8 rounded-full border-2 border-white"
                  alt="Member"
                />
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg"
                  className="w-8 h-8 rounded-full border-2 border-white"
                  alt="Member"
                />
                <span className="w-8 h-8 rounded-full bg-yellow-500 text-slate-900 text-xs flex items-center justify-center border-2 border-white">
                  +28
                </span>
              </div>
              <span className="text-sm text-slate-500">31 members</span>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View
              </Button>
              <Button variant="outline" size="sm">
                <Cog className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 relative overflow-hidden hover:shadow-xl transition">
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-blue-100 rounded-full opacity-20"></div>
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-600/10 p-3 rounded-full">
                <Bot className="h-6 w-6 text-blue-600" />
              </div>
              <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-xs font-medium">
                Pending
              </span>
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">
              Tech Explorers
            </h4>
            <p className="text-slate-500 text-sm mb-4">
              Discovering the future of technology together
            </p>
            <div className="flex items-center justify-between mb-4">
              <div className="flex -space-x-2">
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg"
                  className="w-8 h-8 rounded-full border-2 border-white"
                  alt="Member"
                />
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg"
                  className="w-8 h-8 rounded-full border-2 border-white"
                  alt="Member"
                />
                <span className="w-8 h-8 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center border-2 border-white">
                  +15
                </span>
              </div>
              <span className="text-sm text-slate-500">17 members</span>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View
              </Button>
              <Button variant="outline" size="sm">
                <Cog className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Communities;
