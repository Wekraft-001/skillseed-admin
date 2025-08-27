import React, { useState } from "react";
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

const Communities = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filters, setFilters] = useState({
    type: "",
    ageGroup: "",
    status: "",
    region: "",
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
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
                  <Input id="name" placeholder="Enter community name" />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your community"
                  />
                </div>
                <div>
                  <Label>Community Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="science">Science Club</SelectItem>
                      <SelectItem value="math">Math Wizards</SelectItem>
                      <SelectItem value="tech">Tech Explorers</SelectItem>
                      <SelectItem value="art">Art & Creativity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Age Group</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select age group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5-8">5-8 years</SelectItem>
                      <SelectItem value="9-12">9-12 years</SelectItem>
                      <SelectItem value="13-16">13-16 years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1"
                  >
                    Create Community
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
          <h3 className="text-2xl font-bold text-slate-900">24</h3>
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
            <span className="text-red-500 text-sm font-semibold">Reports</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900">3</h3>
          <p className="text-slate-500 text-sm">Need Attention</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 mb-8">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Quick Actions</h3>
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
                <SelectItem value="science">Science Club</SelectItem>
                <SelectItem value="math">Math Wizards</SelectItem>
                <SelectItem value="tech">Tech Explorers</SelectItem>
                <SelectItem value="art">Art & Creativity</SelectItem>
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
  );
};

export default Communities;
