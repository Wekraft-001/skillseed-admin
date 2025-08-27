import React, { useState } from "react";
import {
  Camera,
  Edit,
  Key,
  Save,
  Shield,
  Bell,
  Smartphone,
  CheckCircle,
  LogIn,
  GraduationCap,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";

const Profile = () => {
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  return (
    <div className="container mx-auto px-6 py-8">
      <header className="flex justify-between items-center mb-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-slate-900">Admin Profile</h1>
          <p className="text-slate-500">
            Manage your account settings and preferences
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 text-center relative overflow-hidden">
          <div className="absolute -top-8 -right-8 w-24 h-24 bg-yellow-400/20 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-pink-500/20 rounded-full animate-pulse"></div>

          <CardContent className="p-8">
            <div className="relative mb-6">
              <img
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg"
                className="w-32 h-32 rounded-full mx-auto border-4 border-blue-600/20 mb-4 object-cover"
                alt="Admin Avatar"
              />
              <button className="absolute bottom-4 right-[calc(50%-80px)] bg-yellow-400 text-slate-900 p-2 rounded-full hover:bg-yellow-400/90 transition">
                <Camera className="h-4 w-4" />
              </button>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Sarah Johnson
            </h2>
            <p className="text-slate-500 mb-1">Super Administrator</p>
            <p className="text-sm text-blue-600 mb-6">
              sarah.johnson@skillseed.com
            </p>

            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <h4 className="text-2xl font-bold text-slate-900">47</h4>
                    <p className="text-xs text-slate-500">Schools Managed</p>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-slate-900">1,250</h4>
                    <p className="text-xs text-slate-500">Active Users</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full bg-blue-600 text-white hover:bg-blue-600/90 mb-3">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
            <Button variant="outline" className="w-full">
              <Key className="h-4 w-4 mr-2" />
              Change Password
            </Button>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-8">
          <Card className="relative overflow-hidden">
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-green-500/20 rounded-full animate-pulse"></div>

            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-bold text-slate-900">
                  Personal Information
                </CardTitle>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value="Sarah"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-600 transition"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value="Johnson"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-600 transition"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value="sarah.johnson@skillseed.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-600 transition"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value="+234 803 123 4567"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-600 transition"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Role
                  </label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-600 transition">
                    <option>Super Administrator</option>
                    <option>Administrator</option>
                    <option>Content Manager</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Join Date
                  </label>
                  <input
                    type="text"
                    value="January 15, 2023"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-600 transition"
                    readOnly
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <div className="absolute -top-6 -left-6 w-16 h-16 bg-pink-500/20 rounded-full animate-pulse"></div>

            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-900">
                Security & Privacy
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-500/10 p-3 rounded-full">
                      <Shield className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        Two-Factor Authentication
                      </h4>
                      <p className="text-sm text-slate-500">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={twoFactorAuth}
                      onChange={(e) => setTwoFactorAuth(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="bg-yellow-400/10 p-3 rounded-full">
                      <Bell className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        Email Notifications
                      </h4>
                      <p className="text-sm text-slate-500">
                        Receive updates about system activities
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={emailNotifications}
                      onChange={(e) => setEmailNotifications(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-600/10 p-3 rounded-full">
                      <Smartphone className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        SMS Notifications
                      </h4>
                      <p className="text-sm text-slate-500">
                        Get important alerts via text message
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={smsNotifications}
                      onChange={(e) => setSmsNotifications(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <Button className="bg-blue-600 text-white hover:bg-blue-600/90">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <div className="absolute -bottom-4 -right-4 w-18 h-18 bg-yellow-400/20 rounded-full animate-pulse"></div>

            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-900">
                Recent Activity
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-slate-50/50 rounded-2xl">
                  <div className="bg-green-500/10 p-2 rounded-full">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-900">
                      Profile updated successfully
                    </h4>
                    <p className="text-sm text-slate-500">2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-slate-50/50 rounded-2xl">
                  <div className="bg-blue-600/10 p-2 rounded-full">
                    <LogIn className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-900">
                      Logged in from Lagos, Nigeria
                    </h4>
                    <p className="text-sm text-slate-500">5 hours ago</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-slate-50/50 rounded-2xl">
                  <div className="bg-yellow-400/10 p-2 rounded-full">
                    <GraduationCap className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-900">
                      Added new school: Lagos Primary
                    </h4>
                    <p className="text-sm text-slate-500">1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
