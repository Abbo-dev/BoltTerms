import { Link } from "react-router-dom";
import { FaUserAlt, FaFileAlt, FaClock } from "react-icons/fa";
import { Button, Card } from "@heroui/react";
function HowItWorks() {
  return (
    <>
      <section className="w-full flex flex-col items-center justify-center py-20 px-4 mt-16">
        <div className="flex items-center justify-between w-full max-w-4xl mb-8 ">
          <h2 className="text-2xl font-bold text-[#e4e6e8] flex items-center gap-2 mx-auto ">
            How It Works
          </h2>
        </div>

        {/* Steps */}
        <section className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-5   bg-transparent  p-11 hover:border-[#2962ea]/50  relative ">
          <p className="text-xs text-[#9CA3AF] absolute top-[189px] right-[60px]  ">
            ✔ No credit card required
          </p>

          {/* Step 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-[#2962ea]/10 text-[#2962ea] text-2xl mb-3">
              <FaUserAlt />
            </div>
            <p className="text-[#e4e6e8] font-medium">Enter Business Info</p>
          </div>

          <div className="block md:hidden w-[2px] h-[50px] bg-gradient-to-b from-[#394251] to-[#6b7280] rounded-lg mb-2"></div>
          <div className="hidden md:block w-[120px] h-[2px] bg-gradient-to-b from-[#394251] to-[#6b7280] rounded-lg"></div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-[#2962ea]/10 text-[#2962ea] text-2xl mb-3">
              <FaFileAlt />
            </div>
            <p className="text-[#e4e6e8] font-medium">Choose a Template</p>
          </div>

          <div className="block md:hidden w-[2px] h-[50px] bg-gradient-to-b from-[#394251] to-[#6b7280] rounded-lg"></div>
          <div className="hidden md:block w-[120px] h-[2px] bg-gradient-to-b from-[#394251] to-[#6b7280] rounded-lg"></div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-[#2962ea]/10 text-[#2962ea] text-2xl mb-3">
              <FaClock />
            </div>
            <p className="text-[#e4e6e8] font-medium">
              Get Your T&Cs in Minutes
            </p>
          </div>
        </section>
        <div className="mt-8">
          <Link to="/generate">
            <Button className="bg-transparent border border-[#2962ea] px-8 h-12 rounded-md text-[#2962ea] font-semibold hover:bg-[#2962ea] hover:text-white transition">
              Try It Now
            </Button>
          </Link>
        </div>

        {/* CTA button under the card */}
      </section>
    </>
  );
}

export default HowItWorks;
