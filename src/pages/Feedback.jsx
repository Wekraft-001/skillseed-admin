import React from "react";
import { Star, MessageCircle, CheckCircle, Flag, Filter } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

const Feedback = () => {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Feedback Management
          </h1>
          <p className="text-slate-500">Monitor and respond to user feedback</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-4 rounded-full">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-slate-500">Average Rating</p>
                <h3 className="text-2xl font-semibold text-slate-900">
                  4.8/5.0
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-yellow-100 p-4 rounded-full">
                <MessageCircle className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-slate-500">Total Feedback</p>
                <h3 className="text-2xl font-semibold text-slate-900">1,234</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-4 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-slate-500">Positive</p>
                <h3 className="text-2xl font-semibold text-slate-900">89%</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-red-100 p-4 rounded-full">
                <Flag className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-slate-500">Needs Attention</p>
                <h3 className="text-2xl font-semibold text-slate-900">23</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feedback List */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-slate-900">
              Recent Feedback
            </h3>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Feedback Item 1 */}
            <div className="bg-slate-50 p-6 rounded-2xl">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-4">
                  <img
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
                    className="w-12 h-12 rounded-full"
                    alt="Sarah Johnson"
                  />
                  <div>
                    <h4 className="font-medium text-slate-900">
                      Mentor Feedback
                    </h4>
                    <p className="text-sm text-slate-500">
                      Sarah Johnson → David's Parent
                    </p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-4 h-4 text-yellow-500 fill-current"
                    />
                  ))}
                </div>
              </div>
              <p className="text-slate-600 mb-4">
                David has shown remarkable progress in problem-solving skills.
                He actively participates in all activities and shows great
                enthusiasm for learning.
              </p>
              <div className="text-sm text-slate-500">2 hours ago</div>
            </div>

            {/* Feedback Item 2 */}
            <div className="bg-slate-50 p-6 rounded-2xl">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-4">
                  <img
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg"
                    className="w-12 h-12 rounded-full"
                    alt="Emma"
                  />
                  <div>
                    <h4 className="font-medium text-slate-900">
                      Student Feedback
                    </h4>
                    <p className="text-sm text-slate-500">
                      Emma → Mentor Michael
                    </p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4].map((star) => (
                    <Star
                      key={star}
                      className="w-4 h-4 text-yellow-500 fill-current"
                    />
                  ))}
                  <Star className="w-4 h-4 text-yellow-500" />
                </div>
              </div>
              <p className="text-slate-600 mb-4">
                I really enjoy the coding challenges! The way you explain things
                makes it easy to understand. Thank you for being patient with
                me.
              </p>
              <div className="text-sm text-slate-500">5 hours ago</div>
            </div>

            {/* Feedback Item 3 */}
            <div className="bg-slate-50 p-6 rounded-2xl">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-4">
                  <img
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
                    className="w-12 h-12 rounded-full"
                    alt="Parent"
                  />
                  <div>
                    <h4 className="font-medium text-slate-900">
                      Parent Feedback
                    </h4>
                    <p className="text-sm text-slate-500">
                      Maria Rodriguez → School Admin
                    </p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-4 h-4 text-yellow-500 fill-current"
                    />
                  ))}
                </div>
              </div>
              <p className="text-slate-600 mb-4">
                The platform has been incredible for my daughter's learning
                journey. The mentors are professional and caring, and the
                progress tracking helps me stay involved.
              </p>
              <div className="text-sm text-slate-500">1 day ago</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Feedback;
