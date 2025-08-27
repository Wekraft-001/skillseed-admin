import React, { useEffect, useRef, useState } from "react";
import SchoolDropdown from "../SchoolDrodwon";
import axios from "axios";
import { useForm } from "react-hook-form";

const PaymentModal = ({ isOpen, onClose, transaction = null }) => {
  const apiUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("adminToken");
  const { handleSubmit } = useForm();
  const modalRef = useRef(null);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const [amount, setAmount] = useState("");
  const [numberOfKids, setNumberOfKids] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  // Populate form when transaction data is provided (for renewal/edit)
  useEffect(() => {
    if (transaction) {
      setSelectedSchool(
        transaction?.school?.schoolName || transaction?.schoolName || ""
      );
      setSchoolId(transaction?.school?._id || "");
      setAmount(transaction?.amount?.toString() || "");
      setNumberOfKids(transaction?.numberOfKids?.toString() || "");
      setPaymentMethod(transaction?.paymentMethod || "");
      setTransactionType(transaction?.transactionType || "subscription");
      setNotes(
        transaction?.notes ||
          `Renewal payment for academic ${new Date().getFullYear()}-${
            new Date().getFullYear() + 1
          }`
      );
    } else {
      // Clear form for new transaction
      setSelectedSchool("");
      setSchoolId("");
      setAmount("");
      setNumberOfKids("");
      setPaymentMethod("");
      setTransactionType("");
      setNotes("");
    }
  }, [transaction, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        event.target instanceof Node &&
        modalRef.current === event.target
      ) {
        onClose();
      }
    };
    if (isOpen) {
      modalRef.current?.addEventListener("click", handleClickOutside);
    }
    return () => {
      modalRef.current?.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleTransaction = async () => {
    if (!schoolId || !amount || !paymentMethod || !transactionType) {
      alert("Please fill all required fields.");
      return;
    }

    const payload = {
      schoolId,
      amount: parseFloat(amount),
      numberOfKids: parseInt(numberOfKids, 10) || 0,
      paymentMethod,
      transactionType,
      notes,
    };

    try {
      setLoading(true);

      const isRenew = Boolean(transaction);
      const endpoint = transaction
        ? `${apiUrl}/transactions/renew`
        : `${apiUrl}/transactions/add-transaction`;

      const method = isRenew ? "put" : "post";
      const res = await axios({
        method,
        url: endpoint,
        data: payload,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Transaction processed:", res.data);
      alert(
        transaction
          ? "Payment renewed successfully!"
          : "Payment recorded successfully!"
      );
      onClose();

      // Optionally trigger a refresh of the transactions list
      // window.location.reload(); // or use a callback prop to refresh data
    } catch (error) {
      const msg =
        error.response?.data?.message || error.message || "Unknown error";
      console.error("Transaction error:", msg);
      alert(`Error: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  const isRenewal = !!transaction;

  return (
    <div
      id="renewalPaymentModal"
      ref={modalRef}
      className={`modal fixed inset-0 z-50 flex items-center justify-center bg-black/40 transition-opacity duration-300 ${
        isOpen
          ? "active opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-white rounded-3xl p-8 max-w-2xl w-full mx-4 relative overflow-hidden shadow-2xl">
        <div className="bubble bubble-yellow absolute -top-6 -right-6 w-20 h-20"></div>
        <div className="bubble bubble-pink absolute -bottom-4 -left-4 w-16 h-16"></div>

        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div
              className={`${
                isRenewal ? "bg-green-500/25" : "bg-[#3C91BA]/25"
              } p-3 rounded-full`}
            >
              {isRenewal ? (
                // Renewal/Refresh Icon
                <svg
                  className="text-green-500 text-xl"
                  width="24"
                  height="24"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2L98.6 415.4c87.6 86.5 228.7 86.2 315.8-1C438.8 390 456.4 361.3 467.2 330.6c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z" />
                </svg>
              ) : (
                // Credit Card Icon
                <svg
                  className="text-[#3C91BA] text-xl"
                  width="24"
                  height="24"
                  viewBox="0 0 576 512"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M64 32C28.7 32 0 60.7 0 96v32H576V96c0-35.3-28.7-64-64-64H64zM576 224H0V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V224zM112 352h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm112 16c0-8.8 7.2-16 16-16H368c8.8 0 16 7.2 16 16s-7.2 16-16 16H240c-8.8 0-16-7.2-16-16z" />
                </svg>
              )}
            </div>
            <div>
              <h2 className="md:text-2xl font-semibold text-deep-navy">
                {isRenewal ? "Renew School Subscription" : "Add New Payment"}
              </h2>
              <p className="text-sm text-gray-500">
                {isRenewal
                  ? `Renew subscription for ${selectedSchool}`
                  : "Record a transaction for a SkillSeed School"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            <svg
              className="svg-inline--fa fa-xmark"
              width="24"
              height="24"
              viewBox="0 0 384 512"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </svg>
          </button>
        </div>

        <form
          id="renewalPaymentForm"
          className="space-y-6"
          onSubmit={handleSubmit(handleTransaction)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {isRenewal ? (
              // Display school name as readonly for renewal
              <div>
                <label className="block text-sm font-semibold text-deep-navy mb-3">
                  School
                </label>
                <input
                  type="text"
                  value={selectedSchool}
                  readOnly
                  className="w-full bg-gray-100 border-2 border-gray-200 rounded-2xl px-4 py-3 text-gray-600 cursor-not-allowed"
                />
              </div>
            ) : (
              // Use dropdown for new transaction
              <SchoolDropdown
                value={selectedSchool}
                onChange={(val, id) => {
                  setSelectedSchool(val);
                  setSchoolId(id);
                }}
              />
            )}

            <div>
              <label className="block text-sm font-semibold text-deep-navy mb-3">
                Amount ($)
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-soft-gray border-2 border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:border-primary-blue transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-deep-navy mb-3">
                Number of Kids
              </label>
              <input
                type="number"
                min="0"
                placeholder="0"
                value={numberOfKids}
                onChange={(e) => setNumberOfKids(e.target.value)}
                className="w-full bg-soft-gray border-2 border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:border-primary-blue transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-deep-navy mb-3">
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full bg-soft-gray border-2 border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:border-primary-blue transition"
              >
                <option value="">Select Method</option>
                <option value="card">Credit Card</option>
                <option value="mobilemoneyrwanda">Mobile Money Rwanda</option>
                <option value="mobile-money">Mobile Money</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-deep-navy mb-3">
                Transaction Type
              </label>
              <select
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}
                className="w-full bg-soft-gray border-2 border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:border-primary-blue transition"
              >
                <option value="">Select Type</option>
                <option value="subscription">Subscription</option>
                <option value="One-time">One-time Payment</option>
                <option value="Refund">Refund</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-deep-navy mb-3">
                Notes
              </label>
              <textarea
                rows={2}
                placeholder="Add any additional notes..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-soft-gray border-2 border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:border-primary-blue transition resize-none"
              ></textarea>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-deep-navy px-6 py-4 rounded-2xl font-semibold hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 ${
                isRenewal
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-[#092043] hover:bg-primary-blue/90"
              } text-white px-6 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 018 8h-4l3 3 3-3h-4a8 8 0 01-8 8v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  {isRenewal ? (
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 512 512"
                    >
                      <path d="M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2L98.6 415.4c87.6 86.5 228.7 86.2 315.8-1C438.8 390 456.4 361.3 467.2 330.6c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z" />
                    </svg>
                  ) : (
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
                  )}
                  {isRenewal ? "Renew Subscription" : "Add Payment"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default PaymentModal;
