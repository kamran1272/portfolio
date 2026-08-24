import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/common/scrollToTop/ScrollToTop";
import Loading from "../components/common/loading/Loading";

const MainLayout = () => (
  <div data-theme="dark" className="relative">
    <a href="#main-content" className="skip-link">
      Skip to content
    </a>
    <Navbar />
    <main id="main-content">
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </main>
    <Footer />
    <ScrollToTop />
  </div>
);

export default MainLayout;
