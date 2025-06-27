import Shield from "./../assets/shield.svg";
import { Image } from "@heroui/react";
import { Link } from "react-router-dom";
import { Divider } from "@heroui/divider";

function FooterPart() {
  return (
    <>
      <div className="flex flex-col md:flex-row items-start justify-center w-full bg-[#242d39] gap-y-10 md:gap-y-0 gap-x-10 md:gap-x-20 lg:gap-x-32 py-10 px-6  mx-auto mt-10 ">
        <div className="flex flex-col md:flex-row items-start justify-center gap-y-10 md:gap-y-0 gap-x-10 md:gap-x-20 lg:gap-x-32 mx-auto">
          <div className=" mx-auto  max-w-m ">
            <div className="flex items-center mx-auto gap-1 pb-3 ">
              <Image src={Shield} width={25} height={25} />
              <p className="text-white text-lg  font-bold">T&C Generator</p>
            </div>
            <p className=" text-[#9CA3AF] text-sm max-w-[300px] md:max-w-[240px]">
              Generate professional terms and condition for your business
              instantly.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-10 md:gap-x-20 lg:gap-x-32 text-sm text-[#9CA3AF] justify-around">
            {/* Product */}
            <div className="space-y-3">
              <p className="font-extrabold text-[#e4e6e8]">Product</p>
              <ul className="space-y-2">
                <li>
                  <Link to="/features" className="hover:text-white transition">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/templates" className="hover:text-white transition">
                    Templates
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="hover:text-white transition">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-3">
              <p className="font-extrabold text-[#e4e6e8]">Company</p>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="hover:text-white transition">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white transition">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/support" className="hover:text-white transition">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-3">
              <p className="font-extrabold text-[#e4e6e8]">Legal</p>
              <ul className="space-y-2">
                <li>
                  <Link to="/policy" className="hover:text-white transition">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-white transition">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/cookies" className="hover:text-white transition">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-full bg-[#242d39] gap-y-10 md:gap-y-0 gap-x-10 md:gap-x-20 lg:gap-x-32 py-10 px-6  mx-auto">
        <Divider className="h-[2px] bg-[#3c4654] w-[400px] md:w-[800px] flex items-center transtion-all" />
        <div className="flex items-center justify-center mt-10">
          <footer className="text-[#9CA3AF] text-sm ">
            &copy; 2025 T&C Generator. All rights reserved.
          </footer>
        </div>
      </div>
    </>
  );
}

export default FooterPart;
