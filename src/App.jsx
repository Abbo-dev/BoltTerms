import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/Home.jsx";
import Features from "./component/Features.jsx";
import Templatess from "./component/TemplateSection.jsx";
import Pricing from "./component/Pricing.jsx";
import Support from "./component/Support.jsx";
import GeneratePage from "./component/GeneratePage.jsx";
import LogIn from "./component/LogIn.jsx";
import ScrollTop from "./component/ScrollTop.jsx";
import Profile from "./component/Profile.jsx";
import PrivacyPolicy from "./component/PolicyPage.jsx";
import TermsOfService from "./component/Tos.jsx";
import CookiesPolicy from "./component/CookiesPage.jsx";
import AboutPage from "./component/About.jsx";
import Success from "./component/Success.jsx";
import CancelPage from "./component/CancelPage.jsx";
import RefundPolicy from "./component/Refund.jsx";
const App = () => {
  return (
    <>
      <ScrollTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/templates" element={<Templatess />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/support" element={<Support />} />
        <Route path="/generate" element={<GeneratePage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/cookies" element={<CookiesPolicy />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<CancelPage />} />
        <Route path="/refund" element={<RefundPolicy />} />
      </Routes>
    </>
  );
};

export default App;
