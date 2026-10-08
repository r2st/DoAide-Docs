import { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import InstallPrompt from "./components/InstallPrompt";
import ToolTracker from "./components/ToolTracker";
import SocialProofBar from "./components/SocialProofBar";
import ReferralBanner from "./components/ReferralBanner";
import BlogLayout, { BlogIndex } from "./pages/blog/BlogLayout";

const HomePage = lazy(() => import("./pages/HomePage"));
const RentReceiptGenerator = lazy(() => import("./pages/RentReceiptGenerator"));
const RentalAgreementGenerator = lazy(() => import("./pages/RentalAgreementGenerator"));
const SalarySlipGenerator = lazy(() => import("./pages/SalarySlipGenerator"));
const ExperienceLetterGenerator = lazy(() => import("./pages/ExperienceLetterGenerator"));
const RelievingLetterGenerator = lazy(() => import("./pages/RelievingLetterGenerator"));
const OfferLetterGenerator = lazy(() => import("./pages/OfferLetterGenerator"));
const NocLetterGenerator = lazy(() => import("./pages/NocLetterGenerator"));
const AppointmentLetterGenerator = lazy(() => import("./pages/AppointmentLetterGenerator"));
const InvoiceGenerator = lazy(() => import("./pages/InvoiceGenerator"));
const BonafideCertificateGenerator = lazy(() => import("./pages/BonafideCertificateGenerator"));
const PowerOfAttorneyGenerator = lazy(() => import("./pages/PowerOfAttorneyGenerator"));
const LeaveApplicationGenerator = lazy(() => import("./pages/LeaveApplicationGenerator"));
const ResignationLetterGenerator = lazy(() => import("./pages/ResignationLetterGenerator"));
const AuthorizationLetterGenerator = lazy(() => import("./pages/AuthorizationLetterGenerator"));
const SalaryCertificateGenerator = lazy(() => import("./pages/SalaryCertificateGenerator"));
const AffidavitGenerator = lazy(() => import("./pages/AffidavitGenerator"));
const PartnershipDeedGenerator = lazy(() => import("./pages/PartnershipDeedGenerator"));
const EmbedRentReceiptGenerator = lazy(() => import("./pages/EmbedRentReceiptGenerator"));
const FreeLegalDocTemplatesIndia = lazy(() => import("./pages/blog/FreeLegalDocTemplatesIndia"));
const HowToWriteRentAgreement = lazy(() => import("./pages/blog/HowToWriteRentAgreement"));
const VsCanvaTemplates = lazy(() => import("./pages/compare/VsCanvaTemplates"));

function Loading() {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "4rem" }}>
      <div style={{ color: "var(--text-muted)" }}>Loading...</div>
    </div>
  );
}

export default function App() {
  const { pathname } = useLocation();
  if (pathname.startsWith("/embed/")) {
    return (
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/embed/rent-receipt-generator" element={<EmbedRentReceiptGenerator />} />
        </Routes>
      </Suspense>
    );
  }

  return (
    <>
      <Header />
      <ToolTracker />
      <Suspense fallback={<Loading />}>
        <SocialProofBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rent-receipt-generator" element={<RentReceiptGenerator />} />
          <Route path="/rental-agreement-generator" element={<RentalAgreementGenerator />} />
          <Route path="/salary-slip-generator" element={<SalarySlipGenerator />} />
          <Route path="/experience-letter-generator" element={<ExperienceLetterGenerator />} />
          <Route path="/relieving-letter-generator" element={<RelievingLetterGenerator />} />
          <Route path="/offer-letter-generator" element={<OfferLetterGenerator />} />
          <Route path="/noc-letter-generator" element={<NocLetterGenerator />} />
          <Route path="/appointment-letter-generator" element={<AppointmentLetterGenerator />} />
          <Route path="/invoice-generator" element={<InvoiceGenerator />} />
          <Route path="/bonafide-certificate-generator" element={<BonafideCertificateGenerator />} />
          <Route path="/power-of-attorney-generator" element={<PowerOfAttorneyGenerator />} />
          <Route path="/leave-application-generator" element={<LeaveApplicationGenerator />} />
          <Route path="/resignation-letter-generator" element={<ResignationLetterGenerator />} />
          <Route path="/authorization-letter-generator" element={<AuthorizationLetterGenerator />} />
          <Route path="/salary-certificate-generator" element={<SalaryCertificateGenerator />} />
          <Route path="/affidavit-generator" element={<AffidavitGenerator />} />
          <Route path="/partnership-deed-generator" element={<PartnershipDeedGenerator />} />
          <Route path="/blog" element={<BlogLayout />}>
            <Route index element={<BlogIndex />} />
            <Route path="free-legal-document-templates-india" element={<FreeLegalDocTemplatesIndia />} />
            <Route path="how-to-write-rent-agreement" element={<HowToWriteRentAgreement />} />
          </Route>
          <Route path="/compare/canva-templates" element={<VsCanvaTemplates />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <Footer />
      <InstallPrompt />
      <ReferralBanner />
    </>
  );
}
