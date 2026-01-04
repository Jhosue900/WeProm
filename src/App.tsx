import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustedCompanies from './components/TrustedCompanies';
import Campaigns from './components/Campaigns';
import Projects from './components/Projects';
import Features from './components/Features';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoginForm from './components/dashboard/login';
import Dashboard from './components/dashboard/Dashboard';
import SplashScreen from "./components/SplashScreen";
import AboutUs from './components/aboutUs';
import GoogleReviews from './components/reviews';
import Services from './components/services';
import PurchaseProcess from './components/purchaseProcess';
import FAQ from './components/frecuentQuestions';

function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-weprom-dark transition-colors duration-300">
      <Header />
      <Hero />
      <TrustedCompanies />
      <Campaigns />
      <Projects />
      <AboutUs />
      <GoogleReviews/>
      <Services />
      <PurchaseProcess />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  // Verificar preferencia de modo oscuro al cargar
  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark' ||
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}

      {!showSplash && (
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;