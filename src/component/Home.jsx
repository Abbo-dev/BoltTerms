import Navbar from "./Navbar.jsx";
import { Button, Image } from "@heroui/react";
import Arrow from "./../assets/arrow.png";
import Card from "./CardSection.jsx";
import Why from "./Why.jsx";
import FooterPart from "./FooterPart.jsx";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "./../FirebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";
const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <div className="w-full h-full  ">
        <Navbar />

        <div className="flex flex-col items-center justify-center gap-4 mt-10  w-full z-0">
          {/* Floating gradient elements */}
          <div className="fixed -top-20 -left-20 w-64 h-64 rounded-full bg-[#2962ea]/20 blur-3xl -z-0"></div>
          <div className="fixed -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#2962ea]/10 blur-3xl -z-0"></div>

          <div className="flex flex-col items-center justify-center mx-3">
            <div className="inline-flex items-center bg-[#2962ea]/10 text-[#2962ea] px-4 py-2 rounded-full mb-4">
              <span className="mr-2">⚡</span> The fastest way to generate legal
              docs
            </div>
            <h1 className="text-4xl font-bold text-center text-[#e4e6e8] pb-4 ">
              Generate Professional{" "}
              <span className="text-[#2962ea]">
                {" "}
                Terms
                <br /> <span className="text-[#e4e6e8]">&</span> Conditions{" "}
              </span>{" "}
              in Minutes
            </h1>
            <p className="text-center text-[#9CA3AF] text-sm md:text-base   ">
              Create legally compliant T&C documents for your business with our
              smart
              <br />
              generator . No legal knowledge required.
            </p>
          </div>
          <div className="  flex gap-8 items-center justify-center ">
            <div className=" relative flex items-center justify-center">
              <Link to="/generate">
                <Button
                  onPress={() => console.log("Start Generating")}
                  className="flex items-center justify-center gap-2 bg-[#2962ea] w-50 h-10 rounded-md 
                text-[#e4e6e8] font-semibold"
                >
                  Start Generating
                  <Image
                    src={Arrow}
                    width={30}
                    height={30}
                    alt=""
                    className="ml-1
                    transition-transform duration-300 group-hover:-translate-x-[-6px] "
                  />
                </Button>
              </Link>
            </div>
            <Link to="/templates">
              <Button className="bg-[#394251] px-6 h-10 rounded-md text-[#e4e6e8] ">
                View Templates
              </Button>
            </Link>
          </div>
        </div>

        <Card />
        <Why />
        <FooterPart />
      </div>
    </>
  );
};

export default Home;
