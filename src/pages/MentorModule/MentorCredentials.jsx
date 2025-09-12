import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  XCircle,
  UserCheck,
  Filter,
  Download,
  Eye,
  FileText,
  Phone,
  AlertTriangle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const MentorCredentials = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();
  const [pendingApprovals, setPendingApprovals] = useState(24);
  const [totalApproved, setTotalApproved] = useState(156);
  const [totalRejected, setTotalRejected] = useState(12);
  const [totalMentors, setTotalMentors] = useState(192);

  const handleApprove = () => {
    setPendingApprovals(pendingApprovals - 1);
    setTotalApproved(totalApproved + 1);
  };

  const handleReject = () => {
    setPendingApprovals(pendingApprovals - 1);
    setTotalRejected(totalRejected + 1);
  };

  const handleReview = () => {
    navigate("/mentors/review-mentor-application");
  };
  const fetchCategories = async () => {
    const res = await axios.get(`${apiURL}/admin/mentor-credentials`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("Credentials from API:", res.data);
    return res.data;
  };

  const { data: credentials = [] } = useQuery({
    queryKey: ["credentials"],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="outline"
          size="icon"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Mentor Credential Approval
          </h1>
          <p className="text-slate-500">
            Review and approve mentor credentials
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="relative overflow-hidden">
          <div className="absolute top-[-20px] right-[-20px] w-16 h-16 bg-yellow-100 rounded-full opacity-20"></div>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <Clock className="h-8 w-8 text-yellow-500" />
              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
                Pending
              </span>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">
              {pendingApprovals}
            </div>
            <div className="text-sm text-slate-500">Pending Approvals</div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-[-20px] right-[-20px] w-16 h-16 bg-green-100 rounded-full opacity-20"></div>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                Approved
              </span>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">
              {totalApproved}
            </div>
            <div className="text-sm text-slate-500">Total Approved</div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-[-20px] right-[-20px] w-16 h-16 bg-red-100 rounded-full opacity-20"></div>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <XCircle className="h-8 w-8 text-red-500" />
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium">
                Rejected
              </span>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">
              {totalRejected}
            </div>
            <div className="text-sm text-slate-500">Total Rejected</div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-[-20px] right-[-20px] w-16 h-16 bg-blue-100 rounded-full opacity-20"></div>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <UserCheck className="h-8 w-8 text-blue-600" />
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                Active
              </span>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">
              {totalMentors}
            </div>
            <div className="text-sm text-slate-500">Total Mentors</div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Approvals Section */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3">
              <Clock className="h-6 w-6 text-yellow-500" />
              Pending Mentor Approvals
            </CardTitle>
            {/* <div className="flex gap-3">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div> */}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Mentor Application 1 */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:shadow-md transition">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex items-center gap-4">
                  <img
                    src="https://images.pexels.com/photos/459976/pexels-photo-459976.jpeg?auto=compress&w=80&q=80"
                    className="w-16 h-16 rounded-full border-3 border-blue-600 object-cover"
                    alt="Grace E. Mensah"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Grace E. Mensah
                    </h3>
                    <p className="text-sm text-slate-600">
                      Science & Technology Expert
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-500">
                        Kumasi, Ghana
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-sm text-slate-600 mb-1">Education</div>
                    <div className="text-sm font-semibold text-slate-900">
                      MSc Computer Science
                    </div>
                    <div className="text-xs text-slate-500">
                      University of Ghana
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-slate-600 mb-1">
                      Experience
                    </div>
                    <div className="text-sm font-semibold text-slate-900">
                      3 Years
                    </div>
                    <div className="text-xs text-slate-500">STEM Education</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-slate-600 mb-1">Applied</div>
                    <div className="text-sm font-semibold text-slate-900">
                      2 days ago
                    </div>
                    <div className="text-xs text-slate-500">March 15, 2024</div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button size="sm" onClick={handleReview}>
                    <Eye className="h-4 w-4 mr-2" />
                    Review
                  </Button>
                  {/* <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Documents
                  </Button> */}
                </div>
              </div>
            </div>

            {/* Mentor Application 2 */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:shadow-md transition">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex items-center gap-4">
                  <img
                    src="https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&w=80&q=80"
                    className="w-16 h-16 rounded-full border-3 border-yellow-500 object-cover"
                    alt="Michael K. Asante"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Michael K. Asante
                    </h3>
                    <p className="text-sm text-slate-600">
                      Mathematics & Engineering
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-500">
                        Accra, Ghana
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-sm text-slate-600 mb-1">Education</div>
                    <div className="text-sm font-semibold text-slate-900">
                      PhD Mathematics
                    </div>
                    <div className="text-xs text-slate-500">KNUST</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-slate-600 mb-1">
                      Experience
                    </div>
                    <div className="text-sm font-semibold text-slate-900">
                      5 Years
                    </div>
                    <div className="text-xs text-slate-500">
                      Engineering Education
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-slate-600 mb-1">Applied</div>
                    <div className="text-sm font-semibold text-slate-900">
                      1 day ago
                    </div>
                    <div className="text-xs text-slate-500">March 16, 2024</div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button size="sm" onClick={handleReview}>
                    <Eye className="h-4 w-4 mr-2" />
                    Review
                  </Button>
                  {/* <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Documents
                  </Button> */}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MentorCredentials;
