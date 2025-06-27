import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

export default function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#181e2b] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#374151] rounded-xl shadow-lg overflow-hidden">
        <div className="p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-[#1F2937] mb-6">
            <CheckCircleIcon className="h-10 w-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-[#e4e6e8] mb-2">
            Payment Successful!
          </h2>
          <p className="text-[#828a96] mb-8">
            Your transaction has been completed successfully. We've sent you an
            email with the details.
          </p>
          <div className="space-y-4">
            <button
              onClick={() => navigate("/profile")}
              className="w-full bg-[#2962ea] hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
            >
              Go to Dashboard
            </button>
            <button
              onClick={() => navigate("/orders")}
              className="w-full bg-[#4c5562] hover:bg-[#5a6474] text-white font-medium py-3 px-4 rounded-lg transition duration-200"
            >
              View Order Details
            </button>
          </div>
        </div>
        <div className="bg-[#1F2937] px-8 py-4 text-center">
          <p className="text-xs text-[#828a96]">
            Need help?{" "}
            <a href="#" className="text-[#2962ea] hover:underline">
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
