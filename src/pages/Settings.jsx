import React from "react";
import {
  Plus,
  Shield,
  Users,
  Smartphone,
  Mail,
  Settings as SettingsIcon,
} from "lucide-react";
import { Card } from "../components/ui/card";

const Settings = () => {
  return (
    <div className="bg-[#F5F7FA] min-h-[calc(100vh-80px)] relative">
      {/* Decorative Bubbles */}
      <div className="absolute left-[-120px] top-12 w-56 h-56 bg-[#1A73E8]/10 rounded-full z-0"></div>
      <div className="absolute right-[100px] top-[20px] w-40 h-40 bg-[#1A73E8]/10 rounded-full z-0"></div>
      <div className="absolute right-[30px] bottom-[120px] w-32 h-32 bg-[#FFC107]/20 rounded-full z-0"></div>
      {/* Header */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-8 max-w-[1800px]">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-[#0F1419]">
              Configuration
            </h1>
            <p className="text-gray-500 text-sm md:text-base">
              Manage system settings and permissions
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <Card className="bg-white p-4 md:p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h2 className="text-lg md:text-xl font-semibold">
                User Permissions
              </h2>
              <button
                size="icon"
                className="p-2 bg-[#1A73E8]/10 text-[#1A73E8] rounded-full hover:bg-[#1A73E8]/20"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center justify-between p-3 bg-[#F5F7FA] rounded-xl">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[#1A73E8]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="text-[#1A73E8] w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-sm md:text-base">
                      School Admin
                    </h4>
                    <p className="text-xs md:text-sm text-gray-500">
                      Manage school data
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-9 h-5 md:w-11 md:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#1A73E8]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 md:after:h-5 md:after:w-5 after:transition-all peer-checked:bg-[#1A73E8]"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#F5F7FA] rounded-xl">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[#1A73E8]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="text-[#1A73E8] w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-sm md:text-base">
                      Teacher
                    </h4>
                    <p className="text-xs md:text-sm text-gray-500">
                      Manage class activities
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-9 h-5 md:w-11 md:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#1A73E8]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 md:after:h-5 md:after:w-5 after:transition-all peer-checked:bg-[#1A73E8]"></div>
                </label>
              </div>
            </div>
          </Card>

          <Card className="bg-white p-4 md:p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h2 className="text-lg md:text-xl font-semibold">Integrations</h2>
              <button
                size="icon"
                className="p-2 bg-[#1A73E8]/10 text-[#1A73E8] rounded-full hover:bg-[#1A73E8]/20"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center justify-between p-3 bg-[#F5F7FA] rounded-xl">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[#1A73E8]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-[#1A73E8] font-bold text-xs md:text-sm">
                      G
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-sm md:text-base">
                      Google Classroom
                    </h4>
                    <p className="text-xs md:text-sm text-gray-500">
                      Connected
                    </p>
                  </div>
                </div>
                <button
                  variant="ghost"
                  className="text-xs md:text-sm text-[#1A73E8] font-medium flex-shrink-0"
                >
                  Configure
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#F5F7FA] rounded-xl">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[#1A73E8]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-[#1A73E8] font-bold text-xs md:text-sm">
                      M
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-sm md:text-base">
                      Microsoft Teams
                    </h4>
                    <p className="text-xs md:text-sm text-gray-500">
                      Not connected
                    </p>
                  </div>
                </div>
                <button
                  variant="ghost"
                  className="text-xs md:text-sm text-[#1A73E8] font-medium flex-shrink-0"
                >
                  Connect
                </button>
              </div>
            </div>
          </Card>

          <Card className="bg-white p-4 md:p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h2 className="text-lg md:text-xl font-semibold">
                Notification Settings
              </h2>
              <button
                size="icon"
                className="p-2 bg-[#1A73E8]/10 text-[#1A73E8] rounded-full hover:bg-[#1A73E8]/20"
              >
                <SettingsIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center justify-between p-3 bg-[#F5F7FA] rounded-xl">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[#1A73E8]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="text-[#1A73E8] w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-sm md:text-base">
                      Email Notifications
                    </h4>
                    <p className="text-xs md:text-sm text-gray-500">
                      Daily digest
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-9 h-5 md:w-11 md:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#1A73E8]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 md:after:h-5 md:after:w-5 after:transition-all peer-checked:bg-[#1A73E8]"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#F5F7FA] rounded-xl">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[#1A73E8]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Smartphone className="text-[#1A73E8] w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-sm md:text-base">
                      Push Notifications
                    </h4>
                    <p className="text-xs md:text-sm text-gray-500">
                      Real-time alerts
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-9 h-5 md:w-11 md:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#1A73E8]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 md:after:h-5 md:after:w-5 after:transition-all peer-checked:bg-[#1A73E8]"></div>
                </label>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
