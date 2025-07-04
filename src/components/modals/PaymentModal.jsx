import React, { useEffect, useRef } from "react";

const PaymentModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert("Payment recorded successfully!");
    onClose();
  };

  return (
    <div
      id="paymentModal"
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
            <div className="bg-[#3C91BA]/25 p-3 rounded-full">
              {/* Credit Card SVG */}
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
            </div>
            <div>
              <h2 className="md:text-2xl font-bold text-deep-navy">
                Add New Payment
              </h2>
              <p className="text-gray-500">
                Record a new transaction for SkillSeed
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            {/* Xmark SVG */}
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

        <form id="paymentForm" className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-deep-navy mb-3">
                School Name
              </label>
              <select className="w-full bg-soft-gray border-2 border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:border-primary-blue transition">
                <option value="">Select School</option>
                <option value="bright-future">Bright Future Academy</option>
                <option value="starlight">Starlight Secondary</option>
                <option value="unity">Unity Learning Center</option>
                <option value="sunshine">Sunshine Primary School</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-deep-navy mb-3">
                Amount ($)
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
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
                className="w-full bg-soft-gray border-2 border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:border-primary-blue transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-deep-navy mb-3">
                Payment Method
              </label>
              <select className="w-full bg-soft-gray border-2 border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:border-primary-blue transition">
                <option value="">Select Method</option>
                <option value="credit-card">Credit Card</option>
                <option value="mobile-money">Mobile Money</option>
                <option value="bank-transfer">Bank Transfer</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-deep-navy mb-3">
                Transaction Type
              </label>
              <select className="w-full bg-soft-gray border-2 border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:border-primary-blue transition">
                <option value="">Select Type</option>
                <option value="subscription">Subscription</option>
                <option value="one-time">Tier One</option>
                <option value="refund">Tier Two</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-deep-navy mb-3">
                Transaction Date
              </label>
              <input
                type="date"
                className="w-full bg-soft-gray border-2 border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:border-primary-blue transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-deep-navy mb-3">
              Notes (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="Add any additional notes..."
              className="w-full bg-soft-gray border-2 border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:border-primary-blue transition resize-none"
            ></textarea>
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
              className="flex-1 bg-[#092043] text-white px-6 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-primary-blue/90 transition"
            >
              {/* Plus SVG */}
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
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;
