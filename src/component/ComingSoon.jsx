import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function ComingSoon() {
  useEffect(() => {
    // disable scroll when this page mounts
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto"; // restore on unmount
    };
  }, []);

  return (
    <section className="fixed inset-0 w-full h-full flex flex-col items-center justify-center text-center bg-[#181e2b] px-6 z-20">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
        🚀 BoltTerms – Coming Soon
      </h1>

      <p className="text-[#9CA3AF] max-w-lg mb-6 text-base md:text-lg">
        Generate professional Terms & Conditions and Privacy Policies in
        minutes. Lifetime access for just{" "}
        <span className="text-[#2962ea] font-semibold">$19</span>.
      </p>

      <div className="flex flex-wrap justify-center gap-6 text-sm text-[#9CA3AF]">
        <Link to="/pricing" className="hover:text-white">
          Pricing
        </Link>
        <Link to="/terms" className="hover:text-white">
          Terms
        </Link>
        <Link to="/policy" className="hover:text-white">
          Privacy
        </Link>
        <Link to="/refund" className="hover:text-white">
          Refund
        </Link>
      </div>
    </section>
  );
}
