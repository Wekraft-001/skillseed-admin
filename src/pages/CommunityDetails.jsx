import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  Users,
  Calendar,
  MessageSquare,
  Settings,
  UserPlus,
  MoreVertical,
  Edit,
  Trash2,
  Shield,
  Star,
  Activity,
  TrendingUp,
  Award,
  Clock,
  MapPin,
  Globe,
  Mail,
  Phone,
  Share2,
  Bookmark,
  Flag,
  Eye,
  Heart,
  ThumbsUp,
  MessageCircle,
  Send,
  Search,
  Filter,
  SortDesc,
  ImageIcon,
  Video,
  FileText,
  Download,
  ExternalLink,
  Beaker,
  Calculator,
  Bot,
  BookOpen,
  Palette,
  Music,
  Camera,
  Gamepad2,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Avatar } from "../components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Input } from "../components/ui/formComponents/input";
import { Textarea } from "../components/ui/formComponents/textarea";

const CommunityDetails = () => {
  const navigate = useNavigate();
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("adminToken");
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  const getCommunityDetails = async () => {
    const res = await fetch(`${apiURL}/communities/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    return data;
  };

  const {
    data: community = {},
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["community-details", id],
    queryFn: getCommunityDetails,
    staleTime: 5 * 60 * 1000,
  });

  // Default fallback data for missing fields
  const getDefaultCoverImage = (category) => {
    const images = {
      science:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&h=400&fit=crop",
      mathematics:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&h=400&fit=crop",
      technology:
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=400&fit=crop",
      art: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200&h=400&fit=crop",
      default:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=400&fit=crop",
    };
    return images[category?.toLowerCase()] || images.default;
  };

  const getDefaultAvatar = (name) => {
    const initial = name?.charAt(0)?.toUpperCase() || "C";
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name || "Community"
    )}&background=3b82f6&color=fff&size=100`;
  };

  // Mock data for features not available in API yet
  const mockData = {
    stats: {
      totalPosts: Math.floor(Math.random() * 200) + 50,
      weeklyActive: Math.floor((community.memberCount || 0) * 0.4),
      totalViews: Math.floor(Math.random() * 15000) + 5000,
      averageRating: (4.2 + Math.random() * 0.8).toFixed(1),
    },
    moderators: [
      {
        id: 1,
        name: "Community Admin",
        avatar:
          "https://ui-avatars.com/api/?name=Admin&background=059669&color=fff&size=40",
        role: "Lead Moderator",
      },
    ],
    recentMembers: community.members
      ? community.members.slice(-4).map((member, index) => ({
          id: member._id || index,
          name: member.name || `Member ${index + 1}`,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
            member.name || `Member ${index + 1}`
          )}&background=random&size=40`,
          joinedAt: member.joinedAt || new Date().toISOString(),
        }))
      : [],
    recentActivity: [
      {
        id: 1,
        type: "join",
        user: "New Member",
        action: "joined the community",
        time: "1 day ago",
      },
      {
        id: 2,
        type: "post",
        user: "Community Member",
        action: "shared something interesting",
        time: "2 days ago",
        likes: 5,
      },
      {
        id: 3,
        type: "achievement",
        user: "Active Member",
        action: "became more active",
        time: "3 days ago",
      },
    ],
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading community details...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Flag className="h-8 w-8 text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            Error Loading Community
          </h3>
          <p className="text-slate-500 mb-4">
            We couldn't load the community details. Please try again.
          </p>
          <div className="flex gap-2 justify-center">
            <Button onClick={refetch} className="bg-blue-600 text-white">
              Retry
            </Button>
            <Button variant="outline" onClick={() => navigate("/communities")}>
              Back to Communities
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case "science":
        return <Beaker className="h-5 w-5" />;
      case "mathematics":
      case "math":
        return <Calculator className="h-5 w-5" />;
      case "technology":
      case "tech":
        return <Bot className="h-5 w-5" />;
      case "literature":
      case "reading":
        return <BookOpen className="h-5 w-5" />;
      case "art":
      case "arts":
        return <Palette className="h-5 w-5" />;
      case "music":
        return <Music className="h-5 w-5" />;
      case "photography":
        return <Camera className="h-5 w-5" />;
      case "gaming":
        return <Gamepad2 className="h-5 w-5" />;
      default:
        return <Users className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case "science":
        return "bg-green-500";
      case "mathematics":
      case "math":
        return "bg-yellow-500";
      case "technology":
      case "tech":
        return "bg-blue-500";
      case "literature":
      case "reading":
        return "bg-indigo-500";
      case "art":
      case "arts":
        return "bg-pink-500";
      case "music":
        return "bg-purple-500";
      case "photography":
        return "bg-orange-500";
      case "gaming":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header with Cover Image */}
      <div className="relative">
        <div
          className="h-80 bg-cover bg-center relative"
          style={{
            backgroundImage: `url(${
              community.coverImage || getDefaultCoverImage(community.category)
            })`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

          {/* Navigation */}
          <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate("/communities")}
              className="bg-white/20 backdrop-blur-sm border-white/20 text-white hover:bg-white/30"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Communities
            </Button>

            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                className="bg-white/20 backdrop-blur-sm border-white/20 text-white hover:bg-white/30"
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="bg-white/20 backdrop-blur-sm border-white/20 text-white hover:bg-white/30"
              >
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="bg-white/20 backdrop-blur-sm border-white/20 text-white hover:bg-white/30"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Community Info Overlay */}
          <div className="absolute bottom-6 left-6 right-6 text-white z-10">
            <div className="flex items-end gap-6">
              <img
                src={community.avatar || getDefaultAvatar(community.name)}
                alt={community.name}
                className="w-24 h-24 rounded-2xl border-4 border-white shadow-xl"
              />
              <div className="flex-1 pb-2">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">{community.name}</h1>
                  <Badge
                    className={`${getCategoryColor(
                      community.category
                    )} text-white border-none`}
                  >
                    {getCategoryIcon(community.category)}
                    <span className="ml-1">{community.category}</span>
                  </Badge>
                </div>
                <p className="text-white/90 text-lg max-w-2xl mb-3">
                  {community.description}
                </p>
                <div className="flex items-center gap-6 text-sm text-white/80">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{community.memberCount || 0} members</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Created {formatDate(community.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="h-4 w-4" />
                    <span>Ages {community.ageGroup}</span>
                  </div>
                </div>
              </div>
              {/* <div className="flex gap-2">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Join Community
                </Button>
                <Button
                  variant="secondary"
                  className="bg-white/20 backdrop-blur-sm border-white/20 text-white hover:bg-white/30"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="members">Members</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-none">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100 text-sm">Total Posts</p>
                          <p className="text-2xl font-bold">
                            {mockData.stats.totalPosts}
                          </p>
                        </div>
                        <MessageSquare className="h-8 w-8 text-blue-200" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-none">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-100 text-sm">
                            Weekly Active
                          </p>
                          <p className="text-2xl font-bold">
                            {mockData.stats.weeklyActive}
                          </p>
                        </div>
                        <Activity className="h-8 w-8 text-green-200" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-none">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-100 text-sm">Total Views</p>
                          <p className="text-2xl font-bold">
                            {mockData.stats.totalViews.toLocaleString()}
                          </p>
                        </div>
                        <Eye className="h-8 w-8 text-purple-200" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white border-none">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-yellow-100 text-sm">Rating</p>
                          <div className="flex items-center gap-1">
                            <p className="text-2xl font-bold">
                              {mockData.stats.averageRating}
                            </p>
                            <Star className="h-5 w-5 text-yellow-200 fill-current" />
                          </div>
                        </div>
                        <Award className="h-8 w-8 text-yellow-200" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity Feed */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockData.recentActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg"
                      >
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          {activity.type === "post" && (
                            <MessageSquare className="h-4 w-4 text-blue-600" />
                          )}
                          {activity.type === "join" && (
                            <UserPlus className="h-4 w-4 text-green-600" />
                          )}
                          {activity.type === "achievement" && (
                            <Award className="h-4 w-4 text-yellow-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-semibold">
                              {activity.user}
                            </span>{" "}
                            {activity.action}
                            {activity.content && (
                              <span className="text-blue-600">
                                {" "}
                                "{activity.content}"
                              </span>
                            )}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                            <span>{activity.time}</span>
                            {activity.likes && (
                              <div className="flex items-center gap-1">
                                <ThumbsUp className="h-3 w-3" />
                                <span>{activity.likes}</span>
                              </div>
                            )}
                            {activity.replies && (
                              <div className="flex items-center gap-1">
                                <MessageCircle className="h-3 w-3" />
                                <span>{activity.replies} replies</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Members Tab */}
              <TabsContent value="members" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>
                        Community Members ({community.memberCount || 0})
                      </CardTitle>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Filter className="h-4 w-4 mr-2" />
                          Filter
                        </Button>
                        <Button size="sm">
                          <UserPlus className="h-4 w-4 mr-2" />
                          Invite Members
                        </Button>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Search members..."
                        className="max-w-sm"
                      />
                      <Button variant="outline" size="sm">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {mockData.recentMembers.length > 0 ? (
                      <div className="space-y-3">
                        {mockData.recentMembers.map((member) => (
                          <div
                            key={member.id}
                            className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={member.avatar}
                                alt={member.name}
                                className="w-10 h-10 rounded-full"
                              />
                              <div>
                                <p className="font-medium">{member.name}</p>
                                <p className="text-sm text-slate-500">
                                  Joined {formatDate(member.joinedAt)}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <MessageSquare className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Users className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-500">
                          No members to display yet.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Activity Tab */}
              <TabsContent value="activity" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Community Activity Feed</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <SortDesc className="h-4 w-4 mr-2" />
                        Sort by Latest
                      </Button>
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter Activity
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Post Creation */}
                    <div className="border rounded-lg p-4 bg-slate-50">
                      <div className="flex gap-3">
                        <img
                          src="https://images.unsplash.com/photo-1494790108755-2616b2a81e63?w=40&h=40&fit=crop&crop=face"
                          alt="Your avatar"
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1 space-y-3">
                          <Textarea placeholder="Share something with the community..." />
                          <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <ImageIcon className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Video className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <FileText className="h-4 w-4" />
                              </Button>
                            </div>
                            <Button size="sm">
                              <Send className="h-4 w-4 mr-2" />
                              Post
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Activity Items */}
                    {mockData.recentActivity.map((activity) => (
                      <Card
                        key={activity.id}
                        className="border-l-4 border-l-blue-500"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <img
                              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
                              alt={activity.user}
                              className="w-10 h-10 rounded-full"
                            />
                            <div className="flex-1">
                              <p className="font-medium">{activity.user}</p>
                              <p className="text-sm text-slate-600 mb-2">
                                {activity.action}
                              </p>
                              {activity.content && (
                                <div className="bg-white p-3 rounded border mb-3">
                                  <p className="font-medium">
                                    {activity.content}
                                  </p>
                                </div>
                              )}
                              <div className="flex items-center gap-4 text-sm text-slate-500">
                                <span>{activity.time}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-auto p-0 text-slate-500"
                                >
                                  <ThumbsUp className="h-4 w-4 mr-1" />
                                  {activity.likes || 0}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-auto p-0 text-slate-500"
                                >
                                  <MessageCircle className="h-4 w-4 mr-1" />
                                  {activity.replies || 0}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-auto p-0 text-slate-500"
                                >
                                  <Share2 className="h-4 w-4 mr-1" />
                                  Share
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Community Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button
                        className="w-full justify-start"
                        variant="outline"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Community Info
                      </Button>
                      <Button
                        className="w-full justify-start"
                        variant="outline"
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        Moderation Settings
                      </Button>
                      <Button
                        className="w-full justify-start"
                        variant="outline"
                      >
                        <Users className="h-4 w-4 mr-2" />
                        Member Permissions
                      </Button>
                      <Button
                        className="w-full justify-start"
                        variant="outline"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Privacy Settings
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Danger Zone</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button
                        variant="outline"
                        className="w-full justify-start text-orange-600 hover:text-orange-700"
                      >
                        <Flag className="h-4 w-4 mr-2" />
                        Archive Community
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Community
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Community Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">Growth Rate</p>
                    <p className="text-sm text-slate-500">+12% this month</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Activity className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">Engagement</p>
                    <p className="text-sm text-slate-500">Very High</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="font-medium">Avg. Response Time</p>
                    <p className="text-sm text-slate-500">2.5 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Moderators */}
            {/* <Card>
              <CardHeader>
                <CardTitle className="text-lg">Moderators</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockData.moderators.map((mod) => (
                  <div key={mod.id} className="flex items-center gap-3">
                    <img
                      src={mod.avatar}
                      alt={mod.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-sm">{mod.name}</p>
                      <p className="text-xs text-slate-500">{mod.role}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card> */}

            {/* Recent Members */}
            {/* <Card>
              <CardHeader>
                <CardTitle className="text-lg">New Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex -space-x-2">
                  {community.members.slice(0, 4).map((member) => (
                    <img
                      key={member.id}
                      src={member.avatar}
                      alt={member.name}
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                  ))}
                  {community.memberCount > 4 && (
                    <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center">
                      <span className="text-xs font-medium">
                        +{community.memberCount - 4}
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-slate-500 mt-2">
                  {community.recentMembers.length} joined this week
                </p>
              </CardContent>
            </Card> */}

            {/* Quick Actions */}
            {/* <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start" size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Create Post
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  size="sm"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite Members
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  size="sm"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  size="sm"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Community
                </Button>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetails;
