import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import { useAppStore } from './store/useAppStore';

// Lazy-loaded Pages for optimum performance and code-splitting
const OnboardingScreen = lazy(() => import('./pages/OnboardingScreen'));
const HomeScreen = lazy(() => import('./pages/HomeScreen'));
const ServicesScreen = lazy(() => import('./pages/ServicesScreen'));
const ServiceDetailScreen = lazy(() => import('./pages/ServiceDetailScreen'));
const CasesScreen = lazy(() => import('./pages/CasesScreen'));
const CaseDetailScreen = lazy(() => import('./pages/CaseDetailScreen'));
const FreeQuoteScreen = lazy(() => import('./pages/FreeQuoteScreen'));
const ZoningLookupScreen = lazy(() => import('./pages/ZoningLookupScreen'));
const BookConsultationScreen = lazy(() => import('./pages/BookConsultationScreen'));
const DocumentsVaultScreen = lazy(() => import('./pages/DocumentsVaultScreen'));
const ChatScreen = lazy(() => import('./pages/ChatScreen'));
const NewsScreen = lazy(() => import('./pages/NewsScreen'));
const NewsDetailScreen = lazy(() => import('./pages/NewsDetailScreen'));
const NotificationsScreen = lazy(() => import('./pages/NotificationsScreen'));
const PortfolioScreen = lazy(() => import('./pages/PortfolioScreen'));
const ProjectDetailScreen = lazy(() => import('./pages/ProjectDetailScreen'));
const AboutScreen = lazy(() => import('./pages/AboutScreen'));
const FAQScreen = lazy(() => import('./pages/FAQScreen'));
const ContactScreen = lazy(() => import('./pages/ContactScreen'));
const ProfileScreen = lazy(() => import('./pages/ProfileScreen'));
const ChecklistScreen = lazy(() => import('./pages/ChecklistScreen'));
const ReviewsScreen = lazy(() => import('./pages/ReviewsScreen'));

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Loading Skeleton Fallback
const PageSkeleton = () => (
  <div className="min-h-screen bg-[#F2F3F5] p-4 space-y-4 animate-pulse">
    <div className="h-12 w-full bg-slate-200 rounded-full" />
    <div className="h-60 w-full bg-slate-200 rounded-card-lg" />
    <div className="grid grid-cols-4 gap-2">
      <div className="h-14 bg-slate-200 rounded-2xl" />
      <div className="h-14 bg-slate-200 rounded-2xl" />
      <div className="h-14 bg-slate-200 rounded-2xl" />
      <div className="h-14 bg-slate-200 rounded-2xl" />
    </div>
    <div className="h-36 w-full bg-slate-200 rounded-card" />
  </div>
);

export function App() {
  const { hasSeenOnboarding } = useAppStore();

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageSkeleton />}>
        <Routes>
          {/* Onboarding redirects straight to Home */}
          <Route path="/onboarding" element={<Navigate to="/" replace />} />

          {/* App Shell Routes with Floating Glass Bottom Navigation */}
          <Route element={<AppShell />}>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/services" element={<ServicesScreen />} />
            <Route path="/services/:slug" element={<ServiceDetailScreen />} />
            <Route path="/cases" element={<CasesScreen />} />
            <Route path="/cases/:id" element={<CaseDetailScreen />} />
            <Route path="/quote" element={<FreeQuoteScreen />} />
            <Route path="/zoning-lookup" element={<ZoningLookupScreen />} />
            <Route path="/book-consultation" element={<BookConsultationScreen />} />
            <Route path="/vault" element={<DocumentsVaultScreen />} />
            <Route path="/chat" element={<ChatScreen />} />
            <Route path="/news" element={<NewsScreen />} />
            <Route path="/news/:slug" element={<NewsDetailScreen />} />
            <Route path="/notifications" element={<NotificationsScreen />} />
            <Route path="/portfolio" element={<PortfolioScreen />} />
            <Route path="/portfolio/:id" element={<ProjectDetailScreen />} />
            <Route path="/construction" element={<PortfolioScreen />} />
            <Route path="/construction/:id" element={<ProjectDetailScreen />} />
            <Route path="/projects" element={<PortfolioScreen />} />
            <Route path="/about" element={<AboutScreen />} />
            <Route path="/faq" element={<FAQScreen />} />
            <Route path="/contact" element={<ContactScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/checklist" element={<ChecklistScreen />} />
            <Route path="/reviews" element={<ReviewsScreen />} />

            {/* Catch-all redirect to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

