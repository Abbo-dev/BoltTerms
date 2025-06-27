import Navbar from "./Navbar";
import CardSection from "./CardSection";
function GeneratePage() {
  return (
    <>
      <Navbar />
      <div className="bg-[#181e2b] min-h-screen">
        <div className="">
          <h1>Generate</h1>
        </div>
        <CardSection />
      </div>
    </>
  );
}

export default GeneratePage;
