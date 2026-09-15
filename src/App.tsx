import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { PhotographyPreview } from './components/PhotographyPreview';
import { PhotographyPage } from './pages/PhotographyPage';
import { ProjectPage } from './pages/ProjectPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PageTransition } from './components/PageTransition';

// Helper to scroll to hash when navigating between pages
function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export function App() {
  return (
    <div className="min-h-screen bg-background text-accent font-sans selection:bg-white/20 selection:text-white">
      <CustomCursor />
      <ScrollToHash />
      <Navbar />
      <PageTransition>
        <Routes>
          <Route
            path="/"
            element={
              <main>
                <Hero />
                <Projects />
                <PhotographyPreview />
              </main>
            }
          />
          <Route
            path="/about"
            element={
              <main>
                <AboutPage />
              </main>
            }
          />
          <Route
            path="/photography"
            element={
              <main>
                <PhotographyPage />
              </main>
            }
          />
          <Route
            path="/project/:id"
            element={
              <main>
                <ProjectPage />
              </main>
            }
          />
          <Route
            path="/contact"
            element={
              <main>
                <ContactPage />
              </main>
            }
          />
        </Routes>
      </PageTransition>
      <Footer />
    </div>
  );
}