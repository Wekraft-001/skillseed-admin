import React, { useState } from "react";
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
  Search,
  BookOpen,
  Palette,
  Globe,
  Heart,
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
import { useNavigate } from "react-router-dom";

// Empty State Component
const EmptyCommunitiesState = ({ onCreateCommunity }) => (
  <div className="flex flex-col items-center justify-center py-16 px-6">
    <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
      <Users className="h-16 w-16 text-blue-500" />
    </div>
    <h3 className="text-2xl font-bold text-slate-900 mb-3">
      No Communities Yet
    </h3>
    <p className="text-slate-500 text-center max-w-md mb-8">
      Get started by creating your first community for young learners. Build
      safe, engaging spaces where kids can learn and grow together.
    </p>
    <Button
      onClick={onCreateCommunity}
      className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold"
    >
      <Plus className="h-5 w-5 mr-2" />
      Create Your First Community
    </Button>
    <div className="mt-12 grid grid-cols-3 gap-8 opacity-60">
      <div className="text-center">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
          <Beaker className="h-6 w-6 text-green-500" />
        </div>
        <p className="text-sm text-slate-500">Science</p>
      </div>
      <div className="text-center">
        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
          <Calculator className="h-6 w-6 text-yellow-500" />
        </div>
        <p className="text-sm text-slate-500">Math</p>
      </div>
      <div className="text-center">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
          <Bot className="h-6 w-6 text-blue-600" />
        </div>
        <p className="text-sm text-slate-500">Tech</p>
      </div>
    </div>
  </div>
);

// Community Card Component
const CommunityCard = ({ community, onViewCommunity }) => {
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
      case "art":
      case "arts":
        return <Palette className="h-6 w-6 text-pink-500" />;
      case "literature":
      case "reading":
        return <BookOpen className="h-6 w-6 text-indigo-500" />;
      case "social studies":
      case "geography":
        return <Globe className="h-6 w-6 text-teal-500" />;
      case "health":
      case "wellness":
        return <Heart className="h-6 w-6 text-red-500" />;
      default:
        return <Users className="h-6 w-6 text-purple-500" />;
    }
  };

  const getIconBackgroundColor = (categoryName) => {
    switch (categoryName?.toLowerCase()) {
      case "science":
        return "bg-green-500/10";
      case "mathematics":
      case "math":
        return "bg-yellow-500/10";
      case "technology":
      case "tech":
        return "bg-blue-600/10";
      case "art":
      case "arts":
        return "bg-pink-500/10";
      case "literature":
      case "reading":
        return "bg-indigo-500/10";
      case "social studies":
      case "geography":
        return "bg-teal-500/10";
      case "health":
      case "wellness":
        return "bg-red-500/10";
      default:
        return "bg-purple-500/10";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 relative overflow-hidden hover:shadow-xl transition">
      <div className="absolute -top-4 -right-4 w-12 h-12 bg-blue-100 rounded-full opacity-20"></div>

      <div className="flex items-center justify-between mb-4">
        <div
          className={`${getIconBackgroundColor(
            community.category
          )} p-3 rounded-full`}
        >
          {getCommunityIcon(community.category)}
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs text-slate-400 mb-1">Created</span>
          <span className="text-xs text-slate-600">
            {formatDate(community.createdAt)}
          </span>
        </div>
      </div>

      <h4 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1">
        {community.name}
      </h4>

      <p className="text-slate-500 text-sm mb-4 line-clamp-2 min-h-[40px]">
        {community.description}
      </p>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="bg-slate-100 rounded-full px-3 py-1">
            <span className="text-xs font-medium text-slate-600">
              {community.ageGroup} years
            </span>
          </div>
          <div className="bg-blue-50 rounded-full px-3 py-1">
            <span className="text-xs font-medium text-blue-600">
              {community.category}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <UsersRound className="h-4 w-4 text-slate-400 mr-2" />
          <span className="text-sm text-slate-600">
            {community.memberCount} member
            {community.memberCount !== 1 ? "s" : ""}
          </span>
        </div>
        {community.memberCount > 0 && (
          <div className="flex -space-x-2">
            {/* Placeholder avatars for members - you can replace with actual member avatars */}
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center border-2 border-white">
              <span className="text-xs text-white font-medium">
                {community.memberCount > 99 ? "99+" : community.memberCount}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Button
          className="flex-1"
          size="sm"
          onClick={() => onViewCommunity(community._id)}
        >
          <Eye className="h-4 w-4 mr-2" />
          View
        </Button>
        <Button variant="outline" size="sm">
          <Cog className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const Communities = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("adminToken");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filters, setFilters] = useState({
    type: "",
    ageGroup: "",
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
    const res = await fetch(`${apiURL}/dashboard/all-categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
  };

  const fetchCommunities = async () => {
    try {
      const res = await fetch(`${apiURL}/communities/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Failed to fetch communities");
      const data = await res.json();
      // console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching communities:", error);
      throw error;
    }
  };

  const createCommunity = async (communityData) => {
    const res = await fetch(`${apiURL}/communities`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(communityData),
    });
    if (!res.ok) throw new Error("Failed to create community");
    return res.json();
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
      resetForm();
      setShowCreateModal(false);
      queryClient.invalidateQueries(["communities"]);
      toast.success("Community created successfully!");
    },
    onError: (error) => {
      console.error("Error creating community:", error);
      toast.error("Failed to create community. Please try again.");
    },
  });

  const handleCreateCommunity = () => {
    if (
      !formData.name ||
      !formData.description ||
      !formData.category ||
      !formData.ageGroup
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    createCommunityMutation.mutate(formData);
  };

  // Filter communities based on selected filters
  const filteredCommunities = communities.filter((community) => {
    if (
      filters.type &&
      filters.type !== "all" &&
      community.category !== filters.type
    ) {
      return false;
    }
    if (
      filters.ageGroup &&
      filters.ageGroup !== "all" &&
      community.ageGroup !== filters.ageGroup
    ) {
      return false;
    }
    return true;
  });

  const totalMembers = communities.reduce(
    (sum, community) => sum + community.memberCount,
    0
  );

  const handleViewCommunity = (communityId) => {
    navigate(`/communities/${communityId}`);
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
            <h3 className="text-2xl font-bold text-slate-900">
              {totalMembers}
            </h3>
            <p className="text-slate-500 text-sm">Young Learners</p>
          </div>

          {/* <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 relative overflow-hidden">
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-purple-100 rounded-full opacity-20"></div>
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-500/10 p-3 rounded-full">
                <Settings className="h-6 w-6 text-purple-500" />
              </div>
              <span className="text-purple-500 text-sm font-semibold">
                Categories
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">
              {categories?.length}
            </h3>
            <p className="text-slate-500 text-sm">Available Types</p>
          </div> */}
        </div>

        {/* Filters - Only show if there are communities */}
        {communities.length > 0 && (
          <div className="hidden bg-white rounded-2xl p-6 shadow-lg border border-slate-200 mb-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6">
              Filter Communities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
                  onValueChange={(value) =>
                    handleFilterChange("ageGroup", value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Ages" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ages</SelectItem>
                    <SelectItem value="6-8">6-8 years</SelectItem>
                    <SelectItem value="9-12">9-12 years</SelectItem>
                    <SelectItem value="13-15">13-15 years</SelectItem>
                    <SelectItem value="16-18">16-18 years</SelectItem>
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
        )}

        {/* Communities Grid or Empty State */}
        {communitiesLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-slate-500">Loading communities...</p>
            </div>
          </div>
        ) : communitiesError ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Flag className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Error Loading Communities
              </h3>
              <p className="text-slate-500 mb-4">
                We couldn't load your communities. Please try again.
              </p>
              <Button
                onClick={refetchCommunities}
                className="bg-blue-600 text-white"
              >
                Retry
              </Button>
            </div>
          </div>
        ) : filteredCommunities.length === 0 && communities.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200">
            <EmptyCommunitiesState
              onCreateCommunity={() => setShowCreateModal(true)}
            />
          </div>
        ) : filteredCommunities.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 shadow-lg border border-slate-200">
            <div className="text-center">
              <Search className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                No Communities Match Your Filters
              </h3>
              <p className="text-slate-500 mb-6">
                Try adjusting your filters to see more communities.
              </p>
              <Button
                onClick={() =>
                  setFilters({ type: "", ageGroup: "", region: "" })
                }
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredCommunities.map((community) => (
              <CommunityCard
                key={community._id}
                community={community}
                onViewCommunity={handleViewCommunity}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Communities;
