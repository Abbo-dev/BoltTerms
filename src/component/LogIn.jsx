import { useState } from "react";
import { Input, Button, Card, Image } from "@heroui/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import BackHome from "./BackHome.jsx";
import { auth, db } from "../FirebaseConfig.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Bolt from "../assets/bolt.png";
import GoogleIcon from "../assets/google.svg";
import { Link } from "react-router-dom";
export default function AuthPage() {
  const [tab, setTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const isLogin = tab === "login";
  let navigate = useNavigate();

  const ensureUserDoc = async (user) => {
    if (!user) return;
    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          username:
            user.displayName ||
            user.email?.split("@")[0] ||
            "User",
          email: user.email || "",
          uid: user.uid,
          isPaidUser: false,
          aiQueriesToday: 0,
          createdAt: new Date(),
        });
        return;
      }
      if (!userSnap.data()?.uid) {
        await setDoc(userRef, { uid: user.uid }, { merge: true });
      }
    } catch (error) {
      void error;
    }
  };

  const handleGoogleAuth = async () => {
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      await ensureUserDoc(user);

      navigate("/");
    } catch (error) {
      switch (error.code) {
        case "auth/popup-closed-by-user":
          setError("Google sign-in was closed. Please try again.");
          break;
        case "auth/popup-blocked":
          setError("Popup blocked. Please allow popups and try again.");
          break;
        default:
          setError("Google sign-in failed. Please try again.");
      }
      void error;
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        username,
        email,
        uid: user.uid,
        isPaidUser: false,
        aiQueriesToday: 0,
        createdAt: new Date(),
      }).catch((error) => {
        void error;
      });
      await updateProfile(user, { displayName: username });

      navigate("/");
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-credential":
          // Handle generic error when Email Enumeration Protection is enabled
          setError(
            "Invalid credentials. Please check your email and password."
          );
          break;
        case "auth/user-disabled":
          setError("This user account has been disabled.");
          break;
        case "auth/user-not-found":
          setError("No user found with this email.");
          break;
        case "auth/wrong-password":
          setError("Incorrect password.");
          break;
        case "auth/too-many-requests":
          setError("Too many attempts. Please try again later.");
          break;
        default:
          setError("An error occurred. Please try again.");
      }
      void error;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      await ensureUserDoc(userCredential.user);

      navigate("/");
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-credential":
          // Handle generic error when Email Enumeration Protection is enabled
          setError(
            "Invalid credentials. Please check your email and password."
          );
          break;
        case "auth/user-disabled":
          setError("This user account has been disabled.");
          break;
        case "auth/user-not-found":
          setError("No user found with this email.");
          break;
        case "auth/wrong-password":
          setError("Incorrect password.");
          break;
        case "auth/too-many-requests":
          setError("Too many attempts. Please try again later.");
          break;
        default:
          setError("An error occurred. Please try again.");
      }

      void error;
    }
  };

  return (
    <div className="min-h-screen bg-[#181e2b]  items-center justify-center p-4  flex flex-col">
      <Card className="bg-[#242d39] p-8 rounded-2xl  max-w-md w-full space-y-6 shadow-xl shadow-black/25  ">
        <Link to="/" className=" flex items-center justify-center ">
          <div className="w-12 h-12 bg-[#2962ea] rounded-lg flex items-center justify-center  mr-2">
            <Image src={Bolt} alt="Shield Icon" className="w-8 h-8 " />
          </div>
          <p className="text-white text-xl font-bold">Bolt Terms</p>
        </Link>

        {/* Tabs */}
        <div className="flex justify-center mb-4">
          {["login", "register"].map((type) => (
            <button
              key={type}
              onClick={() => {
                setTab(type);
                setError("");
              }}
              className={`btn px-4 py-2 text-sm font-medium rounded-full mx-1 transition-all ${
                tab === type
                  ? "bg-[#2962ea] text-white shadow-md"
                  : "text-[#828a96] hover:bg-[#1F2937]"
              }`}
            >
              {type === "login" ? "Log In" : "Register"}
            </button>
          ))}
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-extrabold text-[#e4e6e8] text-center">
          {isLogin ? "Welcome Back" : "Create an Account"}
        </h2>

        {/* Form */}
        <motion.form
          onSubmit={isLogin ? handleLogin : handleRegister}
          key={tab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-5"
        >
          {!isLogin && (
            <Input
              label="Username"
              type="text"
              name="username"
              size="sm"
              placeholder="Your username"
              isRequired
              className=" text-[#e4e6e8]"
              onChange={(e) => setUsername(e.target.value)}
            />
          )}

          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="you@example.com"
            size="sm"
            isRequired
            className=" text-[#e4e6e8]"
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password with toggle */}
          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              size="sm"
              isRequired
              className="text-[#e4e6e8]"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              onClick={() => setShowPassword((show) => !show)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-[#828a96] cursor-pointer z-10"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </div>
          </div>
          {error && <p className="text-red-500 text-xs text-center">{error}</p>}
          <Button
            type="submit"
            className="btn-primary w-full py-3"
          >
            {isLogin ? "Log In" : "Register"}
          </Button>
        </motion.form>

        <div className="space-y-4">
          <div className="flex items-center gap-3 text-xs text-[#828a96]">
            <span className="h-px flex-1 bg-[#3a4556]" />
            <span>or</span>
            <span className="h-px flex-1 bg-[#3a4556]" />
          </div>
          <Button
            type="button"
            onPress={handleGoogleAuth}
            className="btn-outline w-full py-3 flex items-center justify-center gap-2"
          >
            <Image src={GoogleIcon} alt="Google" className="w-5 h-5" />
            Continue with Google
          </Button>
        </div>
        <div>
          <p className="text-center text-xs text-[#828a96] mb-3">
            Forgot Password?{" "}
            <button
              onClick={() => navigate("/forgot-password")}
              className="text-[#2962ea] hover:underline"
            >
              Reset Password
            </button>
          </p>
          <p className="text-center text-sm text-[#828a96]  ">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setTab(isLogin ? "register" : "login")}
              className="text-[#2962ea] hover:underline"
            >
              {isLogin ? "Register" : "Log In"}
            </button>
          </p>
        </div>
      </Card>
      <BackHome />
    </div>
  );
}
