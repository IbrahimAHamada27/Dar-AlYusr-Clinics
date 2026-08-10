import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Education } from './pages/Education';
import { Certificates } from './pages/Certificates';
import { Research } from './pages/Research';
import { Publications } from './pages/Publications';
import { Conferences } from './pages/Conferences';
import { Articles } from './pages/Articles';
import { Clinics } from './pages/Clinics';
import { Appointments } from './pages/Appointments';
import { SocialMedia } from './pages/SocialMedia';
import { Contact } from './pages/Contact';
import { AdminDashboard } from './pages/AdminDashboard';

export const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | undefined>();
  const [preselectedClinicId, setPreselectedClinicId] = useState<string | undefined>();

  // Scroll to top when active tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
      />

      <main style={{ flex: 1 }}>
        {activeTab === 'home' && (
          <Home
            setActiveTab={setActiveTab}
            onSelectArticle={(slug) => {
              setSelectedArticleSlug(slug);
              setActiveTab('articles');
            }}
          />
        )}

        {activeTab === 'about' && <About />}

        {activeTab === 'education' && <Education />}

        {activeTab === 'certificates' && <Certificates />}

        {activeTab === 'research' && <Research />}

        {activeTab === 'publications' && <Publications />}

        {activeTab === 'conferences' && <Conferences />}

        {activeTab === 'articles' && <Articles selectedSlug={selectedArticleSlug} />}

        {activeTab === 'clinics' && (
          <Clinics
            setActiveTab={setActiveTab}
            onSelectClinic={(clinicId) => {
              setPreselectedClinicId(clinicId);
              setActiveTab('appointments');
            }}
          />
        )}

        {activeTab === 'appointments' && (
          <Appointments
            preselectedClinicId={preselectedClinicId}
          />
        )}

        {activeTab === 'socialMedia' && <SocialMedia />}

        {activeTab === 'contact' && <Contact setActiveTab={setActiveTab} />}

        {activeTab === 'admin' && (
          <AdminDashboard
            setIsAdmin={setIsAdmin}
            setActiveTab={setActiveTab}
          />
        )}
      </main>

      <Footer setActiveTab={setActiveTab} />
    </div>
  );
};

export function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
