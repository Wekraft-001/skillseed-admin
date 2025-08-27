import React from "react";
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
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";

const SchoolDetails = () => {
  return (
    <div className="container mx-auto px-6 py-8">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-12 h-12"
            onClick={() => window.history.back()}
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
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
                  className="w-24 h-24 rounded-full border-4 border-blue-600 ring-4 ring-yellow-400 object-cover shadow-lg bg-white"
                  alt="School Logo"
                />
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">
                    Bright Future Academy
                  </h2>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    <span className="text-slate-600">
                      123 Education Street, Lagos, Nigeria
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="bg-yellow-400/90 text-xs px-4 py-2 rounded-full font-semibold text-slate-900">
                      Primary School
                    </span>
                    <span className="flex items-center gap-1 text-green-600">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      Active
                    </span>
                  </div>
                </div>
              </div>
              <div className="ml-auto flex gap-3">
                <Button className="bg-yellow-400 text-slate-900 hover:bg-yellow-400/90">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Details
                </Button>
                <Button className="bg-blue-600 text-white hover:bg-blue-600/90">
                  <Eye className="h-4 w-4 mr-2" />
                  View Portal
                </Button>
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
                      Bright Future Academy
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                      Email
                    </label>
                    <p className="text-lg text-slate-900 mt-1">
                      info@brightfuture.edu.ng
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                      Phone
                    </label>
                    <p className="text-lg text-slate-900 mt-1">
                      +234 801 234 5678
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                      School Type
                    </label>
                    <p className="text-lg text-slate-900 mt-1">
                      Primary School
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                      Principal
                    </label>
                    <p className="text-lg text-slate-900 mt-1">
                      Mrs. Adunni Okafor
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                      Founded
                    </label>
                    <p className="text-lg text-slate-900 mt-1">2015</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                      Website
                    </label>
                    <p className="text-lg text-blue-600 mt-1">
                      www.brightfuture.edu.ng
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                      Joined SkillSeed
                    </label>
                    <p className="text-lg text-slate-900 mt-1">March 2024</p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <label className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                  Address
                </label>
                <p className="text-lg text-slate-900 mt-1">
                  123 Education Street, Victoria Island, Lagos State, Nigeria
                </p>
              </div>
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
                      <p className="text-2xl font-bold text-slate-900">420</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-yellow-400/5 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-yellow-400/20 rounded-full flex items-center justify-center">
                      <GraduationCap className="h-6 w-6 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Teachers</p>
                      <p className="text-2xl font-bold text-slate-900">30</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Trophy className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Active Clubs</p>
                      <p className="text-2xl font-bold text-slate-900">8</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolDetails;
