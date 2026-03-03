import React, { useState } from 'react';
import type { EventItem } from '../types';
import { DAYS_ORDER } from '../constants';

interface HomePageProps {
  onNavigate: (page: string) => void;
  events: EventItem[];
}

interface Article { title: string; category: string; desc: string; fallbackSeed: number; color: string; }
interface FunFact  { emoji: string; title: string; text: string; }

const ARTICLES: Article[] = [
  { title: 'La méthode Pomodoro',               category: 'Productivité', desc: "Travaille 25 min, pause 5 min. Répète. Une technique simple pour rester concentré et éviter l'épuisement.", fallbackSeed: 10, color: '#A8C5A0' },
  { title: 'Mieux dormir pour mieux apprendre',  category: 'Bien-être',   desc: 'Le sommeil consolide la mémoire. Réviser avant de dormir booste la rétention de 40%.', fallbackSeed: 20, color: '#A0B8C5' },
  { title: "L'importance des pauses actives",    category: 'Santé',       desc: 'Marcher 10 minutes entre les sessions améliore la concentration et réduit le stress cognitif.', fallbackSeed: 30, color: '#E8C5A0' },
];

const FUN_FACTS: FunFact[] = [
  { emoji: '🐱', title: 'Le saviez-vous ?', text: 'Les chats dorment en moyenne 70% de leur vie !' },
  { emoji: '🖱️', title: 'Fun Fact',         text: "La première souris d'ordinateur était en bois !" },
  { emoji: '🐝', title: 'Insolite',          text: 'Les abeilles peuvent reconnaître les visages humains.' },
  { emoji: '🎮', title: 'Culture Geek',      text: 'Mario est apparu pour la première fois en 1981 !' },
];

const TIPS = [
  { icon: '⏰', text: 'Commence ta journée tôt — les matins calmes sont les plus productifs.' },
  { icon: '🎯', text: 'Une tâche à la fois. La concentration bat le multitâche chaque fois.' },
  { icon: '💤', text: "7 à 9h de sommeil améliorent la mémoire et l'apprentissage." },
  { icon: '🚶', text: 'Une pause de 10 min toutes les 90 min booste ta concentration.' },
];

function SmartImage({ src, fallbackSeed, alt, style }: { src?: string; fallbackSeed: number; alt: string; style?: React.CSSProperties }) {
  const [imgSrc, setImgSrc] = useState<string>(src || `https://picsum.photos/seed/${fallbackSeed}/600/300`);
  return (
    <img src={imgSrc} alt={alt}
      onError={() => setImgSrc(`https://picsum.photos/seed/${fallbackSeed}/600/300`)}
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', ...style }}
    />
  );
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, events }) => {
  const now = new Date();
  const DAY_NAMES   = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
  const MONTH_NAMES = ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
  const greeting    = now.getHours() < 12 ? 'Bonjour' : now.getHours() < 18 ? 'Bon après-midi' : 'Bonsoir';

  // ── Stats calculées depuis les vrais events ──
  const totalHours  = events.reduce((sum, ev) => sum + ev.durationHours, 0);
  const totalEvents = events.length;

  const hoursByDay = DAYS_ORDER.map(day => ({
    day,
    hours: events.filter(ev => ev.day === day).reduce((s, ev) => s + ev.durationHours, 0),
  }));
  const busiestDay = hoursByDay.reduce((a, b) => b.hours > a.hours ? b : a, { day: '—', hours: 0 });

  const AVAILABLE_HOURS = 91; // 13h/jour × 7 jours
  const freeHours = Math.max(0, AVAILABLE_HOURS - totalHours);

  const STATS = [
    { value: `${totalHours}h`, label: 'planifiées cette semaine', icon: '📅' },
    { value: `${totalEvents}`, label: `événement${totalEvents > 1 ? 's' : ''} au total`, icon: '📌' },
    { value: busiestDay.hours > 0 ? busiestDay.day : '—', label: busiestDay.hours > 0 ? `jour le + chargé (${busiestDay.hours}h)` : 'aucun événement', icon: '🔥' },
    { value: `${freeHours}h`, label: 'encore libres (7h–20h)', icon: '🌟' },
  ];

  // ── Graphique par jour ──
  const activityData = DAYS_ORDER.map(day => ({
    day: day.slice(0, 1),
    fullDay: day,
    value: events.filter(ev => ev.day === day).reduce((s, ev) => s + ev.durationHours, 0),
  }));
  const maxActivity = Math.max(...activityData.map(a => a.value), 1);

  // ── Événements d'aujourd'hui ──
  const todayName   = DAY_NAMES[now.getDay()];
  const todayEvents = events.filter(ev => ev.day === todayName).sort((a, b) => a.startHour - b.startHour);
  const nextEvent   = todayEvents.find(ev => ev.startHour > now.getHours()) ?? null;

  return (
    <div style={{ padding: '40px 0', display: 'flex', flexDirection: 'column', gap: 56 }}>

      {/* ── HERO ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 24 }}>
        <div style={{ flex: 1, minWidth: 280 }}>
          <p style={{ color: '#B8956A', fontFamily: 'Georgia, serif', fontSize: 13, letterSpacing: 3, textTransform: 'uppercase', margin: '0 0 12px' }}>
            {DAY_NAMES[now.getDay()]} {now.getDate()} {MONTH_NAMES[now.getMonth()]}
          </p>
          <h1 style={{ margin: 0, fontSize: 'clamp(30px, 5vw, 56px)', fontFamily: '"Playfair Display", Georgia, serif', color: '#F5EFE7', fontWeight: 700, lineHeight: 1.1 }}>
            {greeting} 👋
          </h1>
          <p style={{ color: '#8A7968', marginTop: 16, fontSize: 16, maxWidth: 480, lineHeight: 1.7 }}>
            Bienvenue sur <span style={{ color: '#B8956A', fontWeight: 600 }}>Tempo</span>. Organise ta semaine, reste focus, et prends soin de toi.
          </p>

          {/* Prochain événement */}
          <div style={{ marginTop: 20, display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 12, padding: '10px 16px' }}>
            {nextEvent ? (
              <>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: nextEvent.color, flexShrink: 0 }} />
                <span style={{ color: '#C8BCB0', fontSize: 13 }}>
                  Prochain : <span style={{ color: '#F5EFE7', fontWeight: 600 }}>{nextEvent.title}</span>
                  {' '}à <span style={{ color: '#B8956A' }}>{nextEvent.startHour}h00</span>
                </span>
              </>
            ) : (
              <span style={{ color: '#5A5040', fontSize: 13 }}>Aucun événement restant aujourd'hui ✓</span>
            )}
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
            <button onClick={() => onNavigate('Planning')}
              onMouseEnter={e => { e.currentTarget.style.background = '#D4A875'; e.currentTarget.style.transform = 'scale(1.03)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#B8956A'; e.currentTarget.style.transform = 'none'; }}
              style={{ background: '#B8956A', color: '#1C1712', border: 'none', borderRadius: 12, padding: '12px 28px', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.2s, transform 0.15s' }}>
              📅 Mon planning →
            </button>
            <button onClick={() => onNavigate('À propos')}
              onMouseEnter={e => { e.currentTarget.style.color = '#B8956A'; e.currentTarget.style.borderColor = 'rgba(184,149,106,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#8A7968'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
              style={{ background: 'transparent', color: '#8A7968', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '12px 24px', fontWeight: 500, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}>
              À propos
            </button>
          </div>
        </div>

        {/* Citation */}
        <div style={{ background: 'linear-gradient(135deg, rgba(184,149,106,0.12), rgba(160,184,197,0.06))', border: '1px solid rgba(184,149,106,0.2)', borderRadius: 20, padding: '28px 32px', maxWidth: 300, flexShrink: 0 }}>
          <div style={{ fontSize: 48, lineHeight: 1, color: '#B8956A', opacity: 0.4, marginBottom: 8, fontFamily: 'Georgia, serif' }}></div>
          <p style={{ fontFamily: '"Playfair Display", Georgia, serif', color: '#F5EFE7', fontSize: 15, lineHeight: 1.8, margin: '0 0 14px', fontStyle: 'italic' }}>
            `Le secret pour avancer est de commencer.`
          </p>
          <span style={{ color: '#B8956A', fontSize: 12, fontWeight: 600, letterSpacing: 1 }}>— MARK TWAIN</span>
        </div>
      </div>

      {/* ── STATS RÉELLES ── */}
      <div>
        <p style={{ color: '#B8956A', fontFamily: 'Georgia, serif', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', margin: '0 0 20px' }}>
          Ta semaine en chiffres{' '}
          <span style={{ color: '#4A4034', fontFamily: 'inherit', letterSpacing: 0, textTransform: 'none', fontSize: 11 }}>— mis à jour en temps réel</span>
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16 }}>
          {STATS.map((s, i) => (
            <div key={i}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.transform = 'none'; }}
              style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.07)', padding: '24px 20px', textAlign: 'center', transition: 'background 0.2s, transform 0.2s' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(18px, 2.5vw, 26px)', color: '#B8956A', fontWeight: 700, lineHeight: 1 }}>{s.value}</div>
              <div style={{ color: '#6A5E52', fontSize: 12, marginTop: 6, lineHeight: 1.4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ACTIVITÉ + TIPS ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28 }}>
        {/* Graphique */}
        <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 18, border: '1px solid rgba(255,255,255,0.07)', padding: '28px 24px' }}>
          <p style={{ color: '#B8956A', fontFamily: 'Georgia, serif', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', margin: '0 0 4px' }}>Charge par jour</p>
          <p style={{ color: '#5A5040', fontSize: 12, margin: '0 0 24px' }}>Heures d'événements planifiés</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 80 }}>
            {activityData.map((a, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div title={`${a.fullDay} : ${a.value}h`} style={{
                  width: '100%', borderRadius: 6,
                  background: a.value > 0 ? `rgba(184,149,106,${0.25 + (a.value / maxActivity) * 0.65})` : 'rgba(255,255,255,0.04)',
                  height: `${Math.max(4, (a.value / maxActivity) * 64)}px`,
                  border: a.value > 0 ? '1px solid rgba(184,149,106,0.35)' : '1px solid rgba(255,255,255,0.06)',
                  transition: 'height 0.4s cubic-bezier(.16,1,.3,1)',
                }} />
                <span style={{ fontSize: 10, color: a.value > 0 ? '#8A7968' : '#4A4034' }}>{a.day}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#6A5E52', fontSize: 12 }}>Total planifié</span>
            <span style={{ color: '#B8956A', fontWeight: 700, fontSize: 16 }}>{totalHours}h</span>
          </div>
          {todayEvents.length > 0 && (
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <p style={{ color: '#6A5E52', fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', margin: '0 0 10px' }}>Aujourd'hui — {todayName}</p>
              {todayEvents.map(ev => (
                <div key={ev.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: ev.color, flexShrink: 0 }} />
                  <span style={{ color: '#C8BCB0', fontSize: 13, flex: 1 }}>{ev.title}</span>
                  <span style={{ color: '#5A5040', fontSize: 12 }}>{ev.startHour}h–{ev.startHour + ev.durationHours}h</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tips */}
        <div>
          <p style={{ color: '#B8956A', fontFamily: 'Georgia, serif', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', margin: '0 0 16px' }}>Conseils productivité</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {TIPS.map((t, i) => (
              <div key={i}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.transform = 'none'; }}
                style={{ display: 'flex', gap: 14, alignItems: 'flex-start', background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)', padding: '14px 16px', transition: 'background 0.2s, transform 0.15s' }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{t.icon}</span>
                <span style={{ color: '#C8BCB0', fontSize: 14, lineHeight: 1.6 }}>{t.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ARTICLES ── */}
      <div>
        <p style={{ color: '#B8956A', fontFamily: 'Georgia, serif', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', margin: '0 0 20px' }}>À lire aujourd'hui</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {ARTICLES.map((a, i) => (
            <div key={i}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.07)', overflow: 'hidden', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}>
              <div style={{ height: 160, overflow: 'hidden', position: 'relative' }}>
                <SmartImage fallbackSeed={a.fallbackSeed} alt={a.title} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(15,12,10,0.7) 100%)' }} />
                <span style={{ position: 'absolute', top: 12, left: 12, background: a.color, color: '#1C1712', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20, letterSpacing: 0.5 }}>{a.category}</span>
              </div>
              <div style={{ padding: '18px 20px 22px' }}>
                <h3 style={{ margin: '0 0 10px', fontFamily: '"Playfair Display", Georgia, serif', color: '#F5EFE7', fontSize: 16, fontWeight: 700, lineHeight: 1.3 }}>{a.title}</h3>
                <p style={{ margin: 0, color: '#7A6E62', fontSize: 13, lineHeight: 1.6 }}>{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FUN FACTS ── */}
      <div>
        <p style={{ color: '#B8956A', fontFamily: 'Georgia, serif', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', margin: '0 0 20px' }}>Le saviez-vous ?</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
          {FUN_FACTS.map((f, i) => (
            <div key={i}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
              style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 14, border: '1px solid rgba(255,255,255,0.07)', overflow: 'hidden', transition: 'transform 0.2s, background 0.2s' }}>
              <div style={{ height: 100, overflow: 'hidden', position: 'relative' }}>
                <SmartImage fallbackSeed={40 + i * 7} alt={f.title} />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,12,10,0.35)' }} />
                <span style={{ position: 'absolute', bottom: 10, left: 12, fontSize: 28 }}>{f.emoji}</span>
              </div>
              <div style={{ padding: '14px 16px 18px' }}>
                <div style={{ fontFamily: '"Playfair Display", Georgia, serif', color: '#B8956A', fontSize: 12, marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>{f.title}</div>
                <div style={{ color: '#C8BCB0', fontSize: 13, lineHeight: 1.6 }}>{f.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default HomePage;