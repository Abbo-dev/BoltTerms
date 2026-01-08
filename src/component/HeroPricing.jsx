import { CurrencyDollarIcon } from "@heroicons/react/24/outline";

function HeroPricing() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative pt-16 mx-auto">
        <div className="bg-[#2962ea] text-white text-center py-3 text-sm font-medium animate-fade-in-down mx-auto">
          💡 Subscriptions launching soon — grab lifetime access for $19 before
          it's gone!
        </div>
        <div className="relative max-w-7xl pt-12 pb-24 px-4 sm:pt-20 sm:pb-32 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-[#2962ea]/10 text-[#2962ea] px-4 py-2 rounded-full mb-2 text-sm font-medium">
            <CurrencyDollarIcon className="w-5 h-5 mr-2" />
            We're here to help
          </div>

          <h1 className="text-4xl font-bold text-center text-[#e4e6e8] pb-2">
            Simple, transparent pricing
          </h1>

          <p className="text-center text-[#828a96] text-md">
            One-time lifetime access — with optional subscriptions coming soon.
          </p>
        </div>

        <div className="fixed bottom-8 right-8 z-50 animate-fade-in-up">
          <div className="bg-[#232b38] border border-[#3a4556] p-3 rounded-lg shadow-2xl flex items-center gap-3">
            <div className="h-8 w-8 bg-green-500/20 rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-green-500 animate-pulse duration-150"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-white">100% Compliant</p>
              <p className="text-[10px] text-[#828a96]">Or your money back</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroPricing;
