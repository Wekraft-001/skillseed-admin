import React, { useState } from "react";
import {
  ArrowLeft,
  Bell,
  MapPin,
  GraduationCap,
  IdCard,
  Briefcase,
  Award,
  FileText,
  ClipboardList,
  Check,
  X,
  Clock,
  Download,
  Printer,
  Save,
  Eye,
} from "lucide-react";
import { Button } from "../../components/ui/button";

const MentorCredentialsDetails = () => {
  const [notes, setNotes] = useState("");

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Review Mentor Application
            </h1>
            <p className="text-slate-500">
              Detailed review of mentor credentials and documents
            </p>
          </div>
        </div>
        {/* <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1 right-1 bg-yellow-500 rounded-full w-2 h-2"></span>
          </Button>
          <img
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
            className="w-12 h-12 rounded-full border-2 border-blue-600"
            alt="Admin Avatar"
          />
        </div> */}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Mentor Profile */}
          <div className="bg-white rounded-3xl shadow-lg p-8 border border-slate-200 relative overflow-hidden">
            <div className="absolute top-[-30px] right-[-30px] w-24 h-24 bg-yellow-100 rounded-full opacity-20"></div>
            <div className="absolute bottom-[-20px] left-[-20px] w-20 h-20 bg-pink-100 rounded-full opacity-20"></div>

            <div className="flex flex-col md:flex-row gap-6 relative z-10">
              <div className="flex flex-col items-center text-center">
                <img
                  src="https://images.pexels.com/photos/459976/pexels-photo-459976.jpeg?auto=compress&w=150&q=80"
                  className="w-32 h-32 rounded-full border-4 border-blue-600 object-cover mb-4"
                  alt="Grace E. Mensah"
                />
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  Grace E. Mensah
                </h2>
                <p className="text-blue-600 font-semibold mb-2">
                  Science & Technology Expert
                </p>
                <div className="flex items-center gap-2 text-slate-600 mb-4">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <span>Kumasi, Ghana</span>
                </div>
                <div className="flex gap-2">
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                    Pending Review
                  </span>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50 rounded-2xl p-4">
                  <h3 className="font-bold text-slate-900 mb-3">
                    Personal Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Email:</span>
                      <span className="font-medium">
                        grace.mensah@email.com
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Phone:</span>
                      <span className="font-medium">+233 24 123 4567</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Age:</span>
                      <span className="font-medium">28 years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Gender:</span>
                      <span className="font-medium">Female</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4">
                  <h3 className="font-bold text-slate-900 mb-3">
                    Professional Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Education:</span>
                      <span className="font-medium">MSc Computer Science</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">University:</span>
                      <span className="font-medium">University of Ghana</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Experience:</span>
                      <span className="font-medium">3 Years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Specialization:</span>
                      <span className="font-medium">STEM Education</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Documents Section */}
          <div className="bg-white rounded-3xl shadow-lg p-8 border border-slate-200 relative overflow-hidden">
            <div className="absolute top-[-20px] right-[-30px] w-20 h-20 bg-green-100 rounded-full opacity-20"></div>

            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3 relative z-10">
              <FileText className="h-6 w-6 text-blue-600" />
              Submitted Documents
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
              <div className="bg-slate-50 rounded-2xl p-4 hover:shadow-md transition">
                <div className="flex items-center gap-3 mb-2">
                  <GraduationCap className="h-5 w-5 text-yellow-500" />
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      Academic Certificates
                    </h4>
                    <p className="text-xs text-slate-600">
                      MSc_Certificate.pdf
                    </p>
                  </div>
                </div>
                <Button className="w-full" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View Document
                </Button>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 hover:shadow-md transition">
                <div className="flex items-center gap-3 mb-2">
                  <IdCard className="h-5 w-5 text-green-500" />
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      ID Verification
                    </h4>
                    <p className="text-xs text-slate-600">National_ID.pdf</p>
                  </div>
                </div>
                <Button className="w-full" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View Document
                </Button>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 hover:shadow-md transition">
                <div className="flex items-center gap-3 mb-2">
                  <Briefcase className="h-5 w-5 text-purple-500" />
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      Work Experience
                    </h4>
                    <p className="text-xs text-slate-600">CV_Resume.pdf</p>
                  </div>
                </div>
                <Button className="w-full" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View Document
                </Button>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 hover:shadow-md transition">
                <div className="flex items-center gap-3 mb-2">
                  <Award className="h-5 w-5 text-red-500" />
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      Certifications
                    </h4>
                    <p className="text-xs text-slate-600">Teaching_Cert.pdf</p>
                  </div>
                </div>
                <Button className="w-full" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View Document
                </Button>
              </div>
            </div>
          </div>

          {/* Application Details */}
          <div className="bg-white rounded-3xl shadow-lg p-8 border border-slate-200 relative overflow-hidden">
            <div className="absolute bottom-[-30px] right-[-20px] w-24 h-24 bg-pink-100 rounded-full opacity-20"></div>

            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3 relative z-10">
              <ClipboardList className="h-6 w-6 text-blue-600" />
              Application Details
            </h3>

            <div className="space-y-4 relative z-10">
              <div className="bg-slate-50 rounded-2xl p-4">
                <h4 className="font-semibold text-slate-900 mb-2">
                  Why do you want to become a mentor?
                </h4>
                <p className="text-slate-700 text-sm leading-relaxed">
                  I am passionate about empowering young minds in Ghana through
                  STEM education. Having worked in the tech industry for 3
                  years, I've seen firsthand how technology can transform lives
                  and communities. I want to share this knowledge with children
                  and help them develop critical thinking skills that will serve
                  them throughout their lives.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4">
                <h4 className="font-semibold text-slate-900 mb-2">
                  Areas Of Expertise
                </h4>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                    Computer Science
                  </span>
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
                    Mathematics
                  </span>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                    Physics
                  </span>
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                    Robotics
                  </span>
                </div>
              </div>

              {/* <div className="bg-slate-50 rounded-2xl p-4">
                <h4 className="font-semibold text-slate-900 mb-2">
                  Previous Teaching Experience
                </h4>
                <p className="text-slate-700 text-sm leading-relaxed">
                  I have volunteered as a coding instructor at local community
                  centers for 2 years, teaching basic programming to children
                  aged 8-16. I also conducted weekend STEM workshops for
                  underprivileged children in Kumasi.
                </p>
              </div> */}
            </div>
          </div>
        </div>

        {/* Action Panel */}
        <div className="space-y-6">
          {/* Application Status */}
          <div className="bg-white rounded-3xl shadow-lg p-6 border border-slate-200 relative overflow-hidden">
            <div className="absolute top-[-15px] right-[-15px] w-16 h-16 bg-yellow-100 rounded-full opacity-20"></div>

            <h3 className="text-lg font-bold text-slate-900 mb-4 relative z-10">
              Application Status
            </h3>
            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-slate-600">
                  Submitted: March 15, 2024
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span className="text-sm text-slate-600">
                  Under Review: March 16, 2024
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-slate-300 rounded-full"></div>
                <span className="text-sm text-slate-400">Decision Pending</span>
              </div>
            </div>
          </div>

          {/* Review Actions */}
          <div className="bg-white rounded-3xl shadow-lg p-6 border border-slate-200 relative overflow-hidden">
            <div className="absolute bottom-[-15px] left-[-15px] w-16 h-16 bg-green-100 rounded-full opacity-20"></div>

            <h3 className="text-lg font-bold text-slate-900 mb-4 relative z-10">
              Review Actions
            </h3>
            <div className="space-y-3 relative z-10">
              <Button className="w-full bg-green-500 hover:bg-green-600">
                <Check className="h-4 w-4 mr-2" />
                Approve Application
              </Button>
              <Button className="w-full bg-red-500 hover:bg-red-600">
                <X className="h-4 w-4 mr-2" />
                Reject Application
              </Button>
              {/* <Button variant="outline" className="w-full">
                <Clock className="h-4 w-4 mr-2" />
                Request More Info
              </Button> */}
            </div>
          </div>

          {/* Review Notes */}
          <div className="bg-white rounded-3xl shadow-lg p-6 border border-slate-200 relative overflow-hidden">
            <div className="absolute top-[-10px] right-[-10px] w-12 h-12 bg-pink-100 rounded-full opacity-20"></div>

            <h3 className="text-lg font-bold text-slate-900 mb-4 relative z-10">
              Add Review Notes
            </h3>
            <textarea
              className="w-full h-32 bg-slate-50 rounded-2xl p-4 text-sm text-slate-900 placeholder-slate-500 border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 relative z-10"
              placeholder="Add your review comments here..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <Button className="w-full mt-3" size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save Notes
            </Button>
          </div>

          {/* Quick Actions */}
          {/* <div className="bg-white rounded-3xl shadow-lg p-6 border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download All Documents
              </Button>
              <Button variant="outline" className="w-full" size="sm">
                <Printer className="h-4 w-4 mr-2" />
                Print Application
              </Button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default MentorCredentialsDetails;
