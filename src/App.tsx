import React, { useState } from 'react';
import type { EventItem } from './types';
import { INITIAL_EVENTS } from './constants';
import HomePage from './pages/HomePage';
import PlanningPage from './pages/PlanningPage';
import AboutPage from './pages/AboutPage';

type Page = 'Accueil' | 'Planning' | 'À propos';
const PAGES: Page[] = ['Accueil', 'Planning', 'À propos'];

const App: React.FC = () => {
  const [page,   setPage]   = useState<Page>('Accueil');
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);

  return (
    <div style={{ minHeight: '100vh', background: '#0F0C0A', fontFamily: '"Inter", system-ui, sans-serif', color: '#F5EFE7' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: rgba(255,255,255,0.03); }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 3px; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Ambient glow */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, background: `radial-gradient(ellipse 80% 60% at 20% 0%, rgba(184,149,106,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 100%, rgba(160,184,197,0.06) 0%, transparent 60%)` }} />

      {/* Nav */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: 64, display: 'flex', alignItems: 'center', padding: '0 clamp(16px, 4vw, 40px)', gap: 8, background: 'rgba(15,12,10,0.88)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, fontSize: 20, color: '#B8956A', letterSpacing: 0.5, marginRight: 20, flexShrink: 0 }}>
          Tempo
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {PAGES.map(p => (
            <button key={p} onClick={() => setPage(p)}
              onMouseEnter={e => { if (page !== p) e.currentTarget.style.color = '#A08060'; }}
              onMouseLeave={e => { if (page !== p) e.currentTarget.style.color = '#6A5E52'; }}
              style={{ background: page === p ? 'rgba(184,149,106,0.15)' : 'transparent', border: 'none', borderRadius: 10, color: page === p ? '#B8956A' : '#6A5E52', padding: '8px 18px', fontFamily: 'inherit', fontSize: 14, fontWeight: page === p ? 600 : 400, cursor: 'pointer', transition: 'all 0.2s', letterSpacing: 0.3 }}>
              {p}
            </button>
          ))}
        </div>
      </nav>

      {/* Contenu */}
      <main style={{ paddingTop: 64, paddingBottom: 80, minHeight: 'calc(100vh - 64px)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px)' }}>
          {page === 'Accueil'  && <HomePage  onNavigate={(p) => setPage(p as Page)} events={events} />}
          {page === 'Planning' && <PlanningPage events={events} setEvents={setEvents} />}
          {page === 'À propos' && <AboutPage />}
        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '16px 24px', textAlign: 'center', color: '#4A4034', fontSize: 13, background: '#0A0806' }}>
        © 2025 Mon Emploi du Temps — Créé par BLakara2 + du café ☕
      </footer>
    </div>
  );
};

export default App;