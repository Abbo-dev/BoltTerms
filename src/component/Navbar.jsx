import { Image, Button } from "@heroui/react";
import Shield from "./../assets/shield.svg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Closex from "./../assets/closex.svg";
import { useAuth } from "./../AuthContext.jsx";
import { Avatar, AvatarIcon } from "@heroui/react";
import Bolt from "../assets/bolt.png";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@heroui/dropdown";
import {
  BoltIcon,
  DocumentTextIcon,
  CreditCardIcon,
  LifebuoyIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { auth } from "./../FirebaseConfig.js";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const handleSignout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  const handleClick = () => {
    navigate("/");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 h-16 flex items-center justify-between px-4 md:px-8 border-b border-[#3a4556]/40 bg-[#181e2b]/90 backdrop-blur-xl transition-all duration-300">
        {/* Logo Section */}
        <div onClick={() => handleClick()}>
          <Link to="/" className="flex items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#2962ea] rounded-lg flex items-center justify-center mr-2">
                <Image src={Bolt} alt="Bolt Icon" className="w-6 h-6" />
              </div>
              <p className="text-white text-lg font-bold">Bolt Terms</p>
            </div>
          </Link>
        </div>

        {/* Navigation Links - Hidden on mobile */}
        <div className="hidden md:flex items-center mx-2 ">
          <ul className="flex gap-6 lg:gap-8 xl:gap-12 ">
            <Link to="/features">
              <li className="text-[#9CA3AF] hover:text-blue-300 cursor-pointer ">
                Features
              </li>
            </Link>
            <Link to="/templates">
              <li className="text-[#9CA3AF] hover:text-blue-300 cursor-pointer">
                Templates
              </li>
            </Link>
            <Link to="/pricing">
              <li className="text-[#9CA3AF] hover:text-blue-300 cursor-pointer">
                Pricing
              </li>
            </Link>
            <Link to="/support">
              <li className="text-[#9CA3AF] hover:text-blue-300 cursor-pointer">
                Support
              </li>
            </Link>
          </ul>
        </div>

        {/* Mobile Menu Button and Auth Buttons  */}
        <div className="flex items-center gap-4">
          {/* Auth Buttons - Visible on mobile and desktop */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center">
                <Dropdown
                  showArrow
                  className="bg-[#374151] text-md"
                  classNames={{
                    base: "before:bg-[#374151] after:bg-[#374151]",
                  }}
                >
                  <DropdownTrigger>
                    <Button className="bg-transparent hover:bg-transparent active:bg-transparent focus:outline-none focus:ring-0 shadow-none  min-w-0 p-0 ">
                      <Avatar
                        classNames={{
                          base: "bg-gradient-to-br from-[#2962ea] to-[#1e40af] w-8 h-8",
                          icon: "text-[#374151] ",
                        }}
                        icon={<AvatarIcon />}
                      />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions" className="pt-0">
                    <DropdownItem key="welcome" disabled>
                      Welcome ,{" "}
                      {user.displayName[0].toUpperCase() +
                        user.displayName.slice(1)}
                    </DropdownItem>
                    <DropdownItem key="prfile" href="/profile">
                      {" "}
                      Profile
                    </DropdownItem>
                    <DropdownItem key="support" href="/support">
                      {" "}
                      Support
                    </DropdownItem>

                    <DropdownItem
                      key="delete"
                      className="text-danger"
                      color="danger"
                      onPress={handleSignout}
                    >
                      Log Out
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            ) : (
              <Link to="/login" className="text-[#9CA3AF] hover:text-blue-300">
                Log In
              </Link>
            )}

            <Button
              className="flex items-center justify-center gap-2 bg-[#2962ea] w-50 h-10 rounded-md 
                text-[#e4e6e8] font-semibold hover:bg-[#2962ea]/80 transition-colors duration-300"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button - Hidden on desktop */}
          <div className="md:hidden flex items-center ml-2 ">
            <Button
              onPress={() => setOpen(!open)}
              className="bg-transparent text-[#e4e6e8]  min-w-0 z-[90] "
            >
              {open ? (
                <Image
                  className="w-7 h-7 "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  src={Closex}
                ></Image>
              ) : (
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </Button>
          </div>
        </div>
      </nav>
      <div
        className={`md:hidden fixed inset-0 z-[70] bg-[#1e2530] transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0 opacity-100" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full justify-between">
          {/* Top Menu Content */}
          <div className="p-6 pt-10">
            {/* Menu Header */}
            <div className="flex items-center justify-between mb-8">
              <Link to="/" className="flex items-center">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-[#2962ea] rounded-lg flex items-center justify-center mr-2">
                    <Image src={Bolt} alt="Shield Icon" className="w-6 h-6" />
                  </div>
                  <p className="text-white text-lg font-bold">Bolt Terms</p>
                </div>
              </Link>
            </div>

            {/* Menu Items */}
            <ul className="flex flex-col space-y-4">
              {[
                {
                  name: "Features",
                  path: "/features",
                  icon: <BoltIcon className="w-5 h-5" />,
                },
                {
                  name: "Templates",
                  path: "/templates",
                  icon: <DocumentTextIcon className="w-5 h-5" />,
                },
                {
                  name: "Pricing",
                  path: "/pricing",
                  icon: <CreditCardIcon className="w-5 h-5" />,
                },
                {
                  name: "Support",
                  path: "/support",
                  icon: <LifebuoyIcon className="w-5 h-5" />,
                },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#232b38] text-[#e4e6e8] hover:text-[#2962ea] transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    <span className="text-[#2962ea]">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom Section */}
          <div className="p-6 border-t border-[#374151]">
            {user ? (
              <div className="flex flex-col items-center mb-6">
                <div className="w-14 h-14 rounded-full bg-[#2962ea]/20 flex items-center justify-center mb-3">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-xl font-bold text-[#e4e6e8]">
                      {user.displayName?.charAt(0).toUpperCase() || "U"}
                    </span>
                  )}
                </div>
                <Link to="/profile">
                  <p className="text-[#e4e6e8] font-medium hover:underline">
                    {user.displayName?.charAt(0).toUpperCase() +
                      user.displayName?.slice(1) || "User"}
                  </p>
                </Link>
                <p className="text-sm text-[#9CA3AF]">{user.email}</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4 mb-6">
                <Link
                  to="/login"
                  className="text-center py-2 px-4 border border-[#374151] rounded-md text-[#e4e6e8] hover:bg-[#232b38] transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/login"
                  className="text-center py-2 px-4 text-[#9CA3AF] hover:text-[#e4e6e8] text-sm"
                >
                  Don't have an account? Sign up
                </Link>
              </div>
            )}

            <Button
              className="w-full bg-[#2962ea] hover:bg-[#1e4bac] text-white font-semibold py-3 rounded-md transition-colors"
              onPress={() => {
                setOpen(false);
              }}
            >
              Start Generating
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
