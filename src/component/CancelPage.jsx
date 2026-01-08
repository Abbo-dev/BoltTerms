import { XCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { Button } from "@heroui/react";
export default function CancelPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#181e2b] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#374151] rounded-xl shadow-lg overflow-hidden">
        <div className="p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-[#1F2937] mb-6">
            <XCircleIcon className="h-10 w-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-[#e4e6e8] mb-2">
            Payment Cancelled
          </h2>
          <p className="text-[#828a96] mb-8">
            Your transaction was not completed. You can try again or contact
            support if you need help.
          </p>
          <div className="space-y-4">
            <Button
              onPress={() => navigate("/pricing")}
              className="btn-primary w-full py-3 px-4"
            >
              Back to Pricing
            </Button>
            <Button
              onPress={() => navigate("/")}
              className="btn-muted w-full py-3 px-4"
            >
              Return Home
            </Button>
          </div>
        </div>
        <div className="bg-[#1F2937] px-8 py-4 text-center">
          <p className="text-xs text-[#828a96]">
            Need help?{" "}
            <a href="/support" className="text-[#2962ea] hover:underline">
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
