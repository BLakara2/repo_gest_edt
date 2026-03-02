import React from 'react';


const AboutPage: React.FC = () => (
  <div style={{ padding: '40px 0', maxWidth: 720 }}>

    {/* En-tête */}
    <p style={{ color: '#B8956A', fontFamily: 'Georgia, serif', fontSize: 13, letterSpacing: 3, textTransform: 'uppercase', margin: '0 0 12px' }}>
      À propos
    </p>
    <h1 style={{ margin: '0 0 48px', fontSize: 'clamp(28px, 4vw, 44px)', fontFamily: '"Playfair Display", Georgia, serif', color: '#F5EFE7', fontWeight: 700, lineHeight: 1.15 }}>
      Salut, je suis <span style={{ color: '#B8956A' }}>Lakara</span>
    </h1>

    {/* Carte principale */}
    <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)', padding: '36px 40px', marginBottom: 24 }}>

      {/* Avatar + identité */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32, flexWrap: 'wrap' }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%', flexShrink: 0,
          background: 'linear-gradient(135deg, #B8956A, #A0B8C5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 28, fontWeight: 700, color: '#1C1712',
          fontFamily: '"Playfair Display", Georgia, serif',
          boxShadow: '0 0 0 3px rgba(184,149,106,0.2)',
        }}>
          L
        </div>
        <div>
          <div style={{ color: '#F5EFE7', fontWeight: 700, fontSize: 18, fontFamily: '"Playfair Display", Georgia, serif' }}>Lakara</div>
          <div style={{ color: '#6A5E52', fontSize: 13, marginTop: 3 }}>Créateur de contenu · Développeur</div>
        </div>
      </div>

      {/* Textes */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {[
          { text: "Passionné par le contenu créatif et l'influence digitale. Ici, je partage chaque jour des moments fun et exclusifs." },
          { text: 'Cette application React + Vite est conçue pour gérer ton emploi du temps avec style, rapidité et fluidité — sans dépendance MUI.' },
          { text: "Mon objectif ? Te fournir un espace simple et agréable pour organiser tes journées et suivre tes événements sans stress." },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 18, flexShrink: 0, marginTop: 2 }}></span>
            <p style={{ margin: 0, color: '#C8BCB0', fontSize: 15, lineHeight: 1.7 }}>{item.text}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Stack technique */}
    <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)', padding: '24px 32px', marginBottom: 24 }}>
      <p style={{ color: '#B8956A', fontFamily: 'Georgia, serif', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', margin: '0 0 16px' }}>Stack technique</p>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {['React 18', 'TypeScript', 'Vite', 'CSS-in-JS', 'picsum.photos'].map(tag => (
          <span key={tag} style={{
            background: 'rgba(184,149,106,0.1)', border: '1px solid rgba(184,149,106,0.2)',
            color: '#B8956A', fontSize: 13, fontWeight: 600,
            padding: '6px 14px', borderRadius: 20, letterSpacing: 0.3,
          }}>{tag}</span>
        ))}
      </div>
    </div>

    {/* Boutons */}
    <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
      <a href="https://facebook.com/BryanLakara" target="_blank" rel="noreferrer"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: '#1877F2', color: '#fff', border: 'none', borderRadius: 12,
          padding: '12px 24px', fontWeight: 700, fontSize: 14,
          fontFamily: '"Inter", system-ui, sans-serif',
          textDecoration: 'none', transition: 'opacity 0.2s, transform 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'scale(1.03)'; }}
        onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'none'; }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
        Suivre sur Facebook
      </a>

      <a href="#" target="_blank" rel="noreferrer"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(184,149,106,0.12)', color: '#B8956A',
          border: '1px solid rgba(184,149,106,0.3)', borderRadius: 12,
          padding: '12px 24px', fontWeight: 700, fontSize: 14,
          fontFamily: '"Inter", system-ui, sans-serif',
          textDecoration: 'none', transition: 'all 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(184,149,106,0.2)'; e.currentTarget.style.transform = 'scale(1.03)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(184,149,106,0.12)'; e.currentTarget.style.transform = 'none'; }}
      >
        ✨ Contenu exclusif
      </a>
    </div>

  </div>
);

export default AboutPage;