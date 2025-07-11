import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import {
  DollarSign,
  CreditCard,
  Users,
  Undo2,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";
import PaymentModal from "../components/modals/PaymentModal";

const Transactions = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const revenueChartRef = useRef(null);
  const paymentChartRef = useRef(null);

  useEffect(() => {
    // Clean up existing charts before creating new ones
    if (revenueChartRef.current) {
      revenueChartRef.current.destroy();
    }
    if (paymentChartRef.current) {
      paymentChartRef.current.destroy();
    }

    // Revenue Chart
    const revenueCtx = document.getElementById("revenueChart");
    if (revenueCtx) {
      revenueChartRef.current = new Chart(revenueCtx, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
          datasets: [
            {
              label: "Revenue ($)",
              data: [3200, 4100, 3800, 5200, 4800, 5600, 6200],
              borderColor: "#1A73E8",
              backgroundColor: "rgba(26, 115, 232, 0.1)",
              borderWidth: 3,
              fill: true,
              tension: 0.4,
              pointBackgroundColor: "#1A73E8",
              pointBorderColor: "#fff",
              pointBorderWidth: 2,
              pointRadius: 6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: "#f0f0f0" },
              ticks: { color: "#666" },
            },
            x: {
              grid: { display: false },
              ticks: { color: "#666" },
            },
          },
        },
      });
    }

    // Payment Methods Chart
    const paymentCtx = document.getElementById("paymentChart");
    if (paymentCtx) {
      paymentChartRef.current = new Chart(paymentCtx, {
        type: "doughnut",
        data: {
          labels: ["Credit Card", "Mobile Money", "Bank Transfer", "PayPal"],
          datasets: [
            {
              data: [45, 30, 15, 10],
              backgroundColor: ["#1A73E8", "#FFC107", "#10B981", "#F59E0B"],
              borderWidth: 0,
              cutout: "70%",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                padding: 20,
                usePointStyle: true,
                font: { size: 12 },
              },
            },
          },
        },
      });
    }

    // Cleanup function to destroy charts when component unmounts
    return () => {
      if (revenueChartRef.current) {
        revenueChartRef.current.destroy();
      }
      if (paymentChartRef.current) {
        paymentChartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="bg-[#F5F7FA] min-h-[calc(100vh-80px)]">
      <div id="main-content" className=" p-6 md:p-8 w-full max-w-[1800px]">
        <header id="header" className="flex justify-between items-center mb-8">
          <div className="md:flex-1">
            <h1 className="text-xl md:text-3xl font-bold text-deep-navy">
              Transaction Reporting
            </h1>
            <p className="text-sm md:text-base text-gray-500">
              Monitor payments, subscriptions and financial insights
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowPaymentModal(true)}
              className="text-white p-2 md:px-6 md:py-3 rounded-full font-medium text-sm md:text-base md:font-semibold flex items-center gap-2 bg-[#092043] transition"
            >
              <svg
                className="svg-inline--fa fa-plus"
                width="20"
                height="20"
                viewBox="0 0 448 512"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
              </svg>
              Add Payment
            </button>
          </div>
        </header>

        <div
          id="stats-overview"
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          {/* Revenue Card */}
          <div
            id="revenue-card"
            className="bg-white rounded-2xl p-6 shadow-lg relative overflow-hidden"
          >
            <div className="bubble bubble-yellow absolute -top-4 -right-4 w-16 h-16"></div>
            <div className="flex items-center justify-between mb-4">
              <div className="bg-[#3C91BA]/25 p-3 rounded-full">
                <DollarSign className="text-[#3C91BA] w-6 h-6" />
              </div>
              <span className="text-green-500 text-sm font-semibold">
                +12.5%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-deep-navy">$45,230</h3>
            <p className="text-gray-500 text-sm">Total Revenue</p>
          </div>
          {/* Transactions Card */}
          <div
            id="transactions-card"
            className="bg-white rounded-2xl p-6 shadow-lg relative overflow-hidden"
          >
            <div className="bubble bubble-pink absolute -top-4 -right-4 w-16 h-16"></div>
            <div className="flex items-center justify-between mb-4">
              <div className="bg-[#FAB548]/25 p-3 rounded-full">
                <CreditCard className="text-[#FAB548] w-6 h-6" />
              </div>
              <span className="text-green-500 text-sm font-semibold">
                +8.2%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-deep-navy">1,247</h3>
            <p className="text-gray-500 text-sm">Total Transactions</p>
          </div>
          {/* Subscriptions Card */}
          <div
            id="subscriptions-card"
            className="bg-white rounded-2xl p-6 shadow-lg relative overflow-hidden"
          >
            <div className="bubble absolute -top-4 -right-4 w-16 h-16"></div>
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-500/10 p-3 rounded-full">
                <Users className="text-green-500 w-6 h-6" />
              </div>
              <span className="text-green-500 text-sm font-semibold">
                +15.3%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-deep-navy">892</h3>
            <p className="text-gray-500 text-sm">Active Subscriptions</p>
          </div>
          {/* Refunds Card */}
          {/* <div
            id="refunds-card"
            className="bg-white rounded-2xl p-6 shadow-lg relative overflow-hidden"
          >
            <div className="bubble bubble-yellow absolute -top-4 -right-4 w-16 h-16"></div>
            <div className="flex items-center justify-between mb-4">
              <div className="bg-red-500/10 p-3 rounded-full">
                <Undo2 className="text-red-500 w-6 h-6" />
              </div>
              <span className="text-red-500 text-sm font-semibold">-2.1%</span>
            </div>
            <h3 className="text-2xl font-bold text-deep-navy">23</h3>
            <p className="text-gray-500 text-sm">Refunds</p>
          </div> */}
        </div>

        <div
          id="charts-section"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
        >
          {/* Revenue Chart */}
          <div
            id="revenue-chart-card"
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-deep-navy">
                Revenue Trends
              </h3>
              <select className="bg-soft-gray border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-primary-blue">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 3 months</option>
              </select>
            </div>
            <div style={{ height: 300 }}>
              <canvas id="revenueChart"></canvas>
            </div>
          </div>
          {/* Payment Methods Chart */}
          <div
            id="payment-methods-card"
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-bold text-deep-navy mb-6">
              Payment Methods
            </h3>
            <div style={{ height: 300 }}>
              <canvas id="paymentChart"></canvas>
            </div>
          </div>
        </div>

        <div
          id="filters-section"
          className="bg-white rounded-2xl p-6 shadow-lg mb-8"
        >
          <h3 className="text-xl font-bold text-deep-navy mb-6">
            Filters & Export
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Range
              </label>
              <input
                type="date"
                className="w-full bg-soft-gray border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:border-primary-blue"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transaction Type
              </label>
              <select className="w-full bg-soft-gray border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:border-primary-blue">
                <option>All Types</option>
                <option>Subscription</option>
                <option>One-time Payment</option>
                <option>Refund</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                School
              </label>
              <select className="w-full bg-soft-gray border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:border-primary-blue">
                <option>All Schools</option>
                <option>Bright Future Academy</option>
                <option>Starlight Secondary</option>
                <option>Unity Learning Center</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select className="w-full bg-soft-gray border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:border-primary-blue">
                <option>All Status</option>
                <option>Completed</option>
                <option>Pending</option>
                <option>Failed</option>
              </select>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="bg-[#3C91BA] text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-[#3C91BA]/35 transition">
              <i className="fa-solid fa-filter"></i>
              Apply Filters
            </button>
            <button className="bg-[#FAB548] text-indigo-950 px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-[#FAB548]/35 transition cursor-pointer">
              <i className="fa-solid fa-download"></i>
              Export CSV
            </button>
          </div>
        </div>

        <div
          id="transactions-table"
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="p-6">
            <h3 className="text-xl font-bold text-deep-navy">
              Recent Transactions
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="bg-[#3C91BA]/5 text-deep-navy text-sm font-semibold">
                  <th className="px-6 py-4">Transaction ID</th>
                  <th className="px-6 py-4">School</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className=" hover:bg-primary-blue/5 transition">
                  <td className="px-6 py-4 font-mono text-sm text-gray-600">
                    #TXN-001247
                  </td>
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
                      className="w-8 h-8 rounded-full border border-primary-blue object-cover"
                      alt="school avatar"
                    />
                    <span className="font-medium text-deep-navy">
                      Bright Future Academy
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-green-600">
                    $150.00
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-primary-blue/10 text-primary-blue px-3 py-1 rounded-full text-xs font-medium">
                      Subscription
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">Dec 15, 2024</td>
                  <td className="px-6 py-4">
                    <span className="bg-green-500/10 text-green-600 px-3 py-1 rounded-full text-xs font-medium">
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="rounded-full bg-[#3C91BA] text-white w-8 h-8 flex items-center justify-center shadow hover:bg-primary-blue/90 transition">
                      <Eye className="text-white w-5 h-5" />
                    </button>
                  </td>
                </tr>
                <tr className=" hover:bg-primary-blue/5 transition">
                  <td className="px-6 py-4 font-mono text-sm text-gray-600">
                    #TXN-001246
                  </td>
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
                      className="w-8 h-8 rounded-full border border-accent-yellow object-cover"
                      alt="school avatar"
                    />
                    <span className="font-medium text-deep-navy">
                      Starlight Secondary
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-green-600">
                    $299.00
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-accent-yellow/10 text-accent-yellow px-3 py-1 rounded-full text-xs font-medium">
                      One-time
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">Dec 14, 2024</td>
                  <td className="px-6 py-4">
                    <span className="bg-yellow-500/10 text-yellow-600 px-3 py-1 rounded-full text-xs font-medium">
                      Pending
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="rounded-full bg-[#3C91BA] text-white w-8 h-8 flex items-center justify-center shadow hover:bg-primary-blue/90 transition">
                      <Eye className="text-white w-5 h-5" />
                    </button>
                  </td>
                </tr>
                <tr className=" hover:bg-primary-blue/5 transition">
                  <td className="px-6 py-4 font-mono text-sm text-gray-600">
                    #TXN-001245
                  </td>
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
                      className="w-8 h-8 rounded-full border border-primary-blue object-cover"
                      alt="school avatar"
                    />
                    <span className="font-medium text-deep-navy">
                      Unity Learning Center
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-red-600">-$50.00</td>
                  <td className="px-6 py-4">
                    <span className="bg-red-500/10 text-red-600 px-3 py-1 rounded-full text-xs font-medium">
                      Refund
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">Dec 13, 2024</td>
                  <td className="px-6 py-4">
                    <span className="bg-green-500/10 text-green-600 px-3 py-1 rounded-full text-xs font-medium">
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="rounded-full bg-[#3C91BA] text-white w-8 h-8 flex items-center justify-center shadow hover:bg-primary-blue/90 transition">
                      <Eye className="text-white w-5 h-5" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-6 flex justify-between items-center">
            <span className="text-gray-600 text-sm">
              Showing 1-10 of 247 transactions
            </span>
            <div className="flex gap-2">
              <button className="rounded-full bg-white border border-gray-200 w-10 h-10 flex items-center justify-center hover:bg-primary-blue hover:text-white transition">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="rounded-full bg-primary-blue text-white w-10 h-10 flex items-center justify-center">
                1
              </button>
              <button className="rounded-full bg-white border border-gray-200 w-10 h-10 flex items-center justify-center hover:bg-primary-blue hover:text-white transition">
                2
              </button>
              <button className="rounded-full bg-white border border-gray-200 w-10 h-10 flex items-center justify-center hover:bg-primary-blue hover:text-white transition">
                3
              </button>
              <button className="rounded-full bg-white border border-gray-200 w-10 h-10 flex items-center justify-center hover:bg-primary-blue hover:text-white transition">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
      />
    </div>
  );
};

export default Transactions;
