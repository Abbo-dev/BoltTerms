import React from "react";
import { useAuth } from "./../AuthContext.jsx";
import { signOut } from "firebase/auth";
import { auth } from "./../FirebaseConfig.js";
import { useNavigate } from "react-router-dom";
import { Button } from "@heroui/react";
import { Avatar, AvatarIcon } from "@heroui/react";
import BackHome from "./BackHome.jsx";
import useStatus from "./userStatus.jsx";
function Profile() {
  const { user } = useAuth();
  const { metadata } = user;
  const { creationTime } = metadata;
  const dateOnly = creationTime.split(" ").slice(1, 4).join(" ");
  const navigate = useNavigate();

  const { userStatus } = useStatus();
  const handleSignout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      void error;
    }
  };

  return (
    <>
      <BackHome />
      <div className="min-h-screen bg-[#181e2b] text-[#e4e6e8] p-4 flex items-center justify-center">
        <div className="bg-[#374151] rounded-xl p-6 w-full max-w-sm">
          {/* Profile Header */}
          <div className="flex flex-col items-center mb-6">
            <div className="bg-[#1F2937] w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-3">
              <Avatar
                classNames={{
                  base: "bg-gradient-to-br from-[#2962ea] to-[#1e40af] w-16 h-16",
                  icon: "text-[#374151] ",
                }}
                icon={<AvatarIcon />}
              />
            </div>
            <h1 className="text-xl font-bold">
              {user.displayName.charAt(0).toUpperCase() +
                user.displayName.slice(1)}
            </h1>
            <p className="text-[#828a96]">{user.email}</p>
          </div>

          {/* User Info */}
          <div className="space-y-4">
            <div className="bg-[#1F2937] rounded-lg p-4">
              <p className="text-sm text-[#828a96]">Subscription Plan</p>
              <p>{userStatus?.isPaidUser ? "Paid User" : "Free User"}</p>
            </div>
            <div className="bg-[#1F2937] rounded-lg p-4">
              <p className="text-sm text-[#828a96]">Email</p>
              <p>{user.email}</p>
            </div>
            <div className="bg-[#1F2937] rounded-lg p-4">
              <p className="text-sm text-[#828a96]">Member Since</p>
              <p>{dateOnly}</p>
            </div>

            <Button
              onPress={handleSignout}
              className="btn-danger w-full py-2 mt-4"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
