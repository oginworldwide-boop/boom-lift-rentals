import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import FleetPage from './pages/FleetPage';
import WhyUsPage from './pages/WhyUsPage';
import { Phone } from 'lucide-react';
import { CONTACT_INFO } from './constants';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/fleet" element={<FleetPage />} />
              <Route path="/why-us" element={<WhyUsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>

        {/* Mobile Sticky Call Button */}
        <div className="fixed bottom-6 right-6 z-40 sm:hidden">
          <a
            href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
            aria-label={`Call us at ${CONTACT_INFO.phone}`}
            className="flex items-center justify-center w-16 h-16 bg-orange-600 text-white rounded-full shadow-2xl animate-bounce"
          >
            <Phone size={28} aria-hidden="true" />
          </a>
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
};

export default App;
