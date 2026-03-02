import React, { useState } from 'react';
import type { Dispatch, SetStateAction, ReactNode } from 'react';
import type { DayKey, EventItem } from '../types';
import { DAYS_ORDER, PALETTE, mkId } from '../constants';

interface PlanningPageProps {
  events: EventItem[];
  setEvents: Dispatch<SetStateAction<EventItem[]>>;
}

function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: ReactNode }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(15,12,10,0.55)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#1C1712', borderRadius: 20, border: '1px solid rgba(255,255,255,0.1)', padding: '32px', width: '100%', maxWidth: 440, boxShadow: '0 32px 80px rgba(0,0,0,0.6)', animation: 'slideUp 0.25s cubic-bezier(.16,1,.3,1)' }}>
        {children}
      </div>
    </div>
  );
}

const HOURS: number[] = Array.from({ length: 14 }, (_, i) => 7 + i);

const PlanningPage: React.FC<PlanningPageProps> = ({ events, setEvents }) => {
  const [open,      setOpen]      = useState<boolean>(false);
  const [form,      setForm]      = useState<Omit<EventItem, 'id'>>({ title: '', day: 'Lundi', startHour: 9, durationHours: 1, color: '#A8C5A0' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const openCreate = () => { setEditingId(null); setForm({ title: '', day: 'Lundi', startHour: 9, durationHours: 1, color: '#A8C5A0' }); setOpen(true); };
  const openEdit   = (ev: EventItem) => { setEditingId(ev.id); setForm({ title: ev.title, day: ev.day, startHour: ev.startHour, durationHours: ev.durationHours, color: ev.color }); setOpen(true); };
  const remove     = (id: string) => setEvents(e => e.filter(x => x.id !== id));
  const save = () => {
    if (!form.title.trim()) return;
    if (editingId) setEvents(e => e.map(x => x.id === editingId ? { ...x, ...form } : x));
    else setEvents(e => [...e, { ...form, id: mkId() }]);
    setOpen(false);
  };

  const getEventsForCell = (day: DayKey, hour: number) =>
    events.filter(ev => ev.day === day && ev.startHour === hour);

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10,
    padding: '10px 14px', color: '#F5EFE7', fontSize: 15,
    fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box',
  };

  return (
    <div style={{ padding: '32px 0' }}>
      {/* En-tête */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <p style={{ color: '#B8956A', fontFamily: 'Georgia, serif', fontSize: 13, letterSpacing: 3, textTransform: 'uppercase', margin: '0 0 8px' }}>Semaine</p>
          <h1 style={{ margin: 0, fontSize: 'clamp(22px, 4vw, 36px)', fontFamily: '"Playfair Display", Georgia, serif', color: '#F5EFE7', fontWeight: 700 }}>📅 Emploi du temps</h1>
        </div>
        <button onClick={openCreate}
          onMouseEnter={e => { e.currentTarget.style.background = '#D4A875'; e.currentTarget.style.transform = 'scale(1.03)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#B8956A'; e.currentTarget.style.transform = 'none'; }}
          style={{ background: '#B8956A', color: '#1C1712', border: 'none', borderRadius: 12, padding: '12px 24px', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.2s, transform 0.15s' }}>
          + Ajouter
        </button>
      </div>

      {/* Grille */}
      <div style={{ overflowX: 'auto', borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ minWidth: 720, display: 'grid', gridTemplateColumns: '64px repeat(7, 1fr)' }}>
          <div style={{ height: 52, background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.08)' }} />
          {DAYS_ORDER.map(day => (
            <div key={day} style={{ height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.08)', borderLeft: '1px solid rgba(255,255,255,0.06)', fontWeight: 600, fontSize: 13, color: '#B8956A', letterSpacing: 1, textTransform: 'uppercase', fontFamily: 'Georgia, serif' }}>
              {day.slice(0, 3)}
            </div>
          ))}
          {HOURS.map((hour, hi) => (
            <React.Fragment key={hour}>
              <div style={{ height: 72, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 10, borderBottom: '1px solid rgba(255,255,255,0.05)', background: hi % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent' }}>
                <span style={{ fontSize: 11, color: '#5A5040', fontVariantNumeric: 'tabular-nums' }}>{hour}:00</span>
              </div>
              {DAYS_ORDER.map(day => {
                const cellEvents = getEventsForCell(day, hour);
                return (
                  <div key={`${day}${hour}`} style={{ height: 72, borderLeft: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: 4, position: 'relative', background: hi % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent' }}>
                    {cellEvents.map(ev => (
                      <div key={ev.id}
                        onMouseEnter={() => setHoveredId(ev.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        style={{ background: ev.color, borderRadius: 8, padding: '6px 10px', height: `${ev.durationHours * 72 - 8}px`, position: 'absolute', left: 4, right: 4, top: 4, overflow: 'hidden', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: hoveredId === ev.id ? `0 4px 20px ${ev.color}55` : 'none', transform: hoveredId === ev.id ? 'scale(1.02)' : 'none', transition: 'box-shadow 0.2s, transform 0.15s', zIndex: hoveredId === ev.id ? 10 : 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 4 }}>
                          <span style={{ fontWeight: 700, fontSize: 12, color: '#1C1712', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ev.title}</span>
                          <div style={{ display: 'flex', gap: 2, flexShrink: 0 }}>
                            <button onClick={() => openEdit(ev)} style={{ background: 'rgba(0,0,0,0.15)', border: 'none', borderRadius: 4, width: 20, height: 20, cursor: 'pointer', fontSize: 11, color: '#1C1712', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✎</button>
                            <button onClick={() => remove(ev.id)} style={{ background: 'rgba(0,0,0,0.15)', border: 'none', borderRadius: 4, width: 20, height: 20, cursor: 'pointer', fontSize: 11, color: '#1C1712', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
                          </div>
                        </div>
                        <span style={{ fontSize: 10, color: 'rgba(28,23,18,0.65)' }}>{ev.startHour}:00 – {ev.startHour + ev.durationHours}:00</span>
                      </div>
                    ))}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <h2 style={{ margin: '0 0 24px', fontFamily: '"Playfair Display", Georgia, serif', color: '#F5EFE7', fontSize: 22 }}>
          {editingId ? "Éditer l'évènement" : 'Nouvel évènement'}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', color: '#8A7968', fontSize: 12, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>Titre</label>
            <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Ex: Cours de maths" style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', color: '#8A7968', fontSize: 12, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>Jour</label>
            <select value={form.day} onChange={e => setForm(f => ({ ...f, day: e.target.value as DayKey }))} style={{ ...inputStyle, background: '#2A231C' }}>
              {DAYS_ORDER.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ display: 'block', color: '#8A7968', fontSize: 12, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>Heure début</label>
              <input type="number" min={7} max={20} value={form.startHour} onChange={e => setForm(f => ({ ...f, startHour: +e.target.value }))} style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#8A7968', fontSize: 12, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>Durée (h)</label>
              <input type="number" min={1} max={8} value={form.durationHours} onChange={e => setForm(f => ({ ...f, durationHours: +e.target.value }))} style={inputStyle} />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', color: '#8A7968', fontSize: 12, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>Couleur</label>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {PALETTE.map(p => (
                <button key={p.color} onClick={() => setForm(f => ({ ...f, color: p.color }))} title={p.label}
                  style={{ width: 36, height: 36, borderRadius: 8, border: form.color === p.color ? '3px solid #F5EFE7' : '3px solid transparent', background: p.color, cursor: 'pointer', transform: form.color === p.color ? 'scale(1.15)' : 'none', transition: 'transform 0.15s' }} />
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
          <button onClick={() => setOpen(false)} style={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '12px', color: '#8A7968', fontFamily: 'inherit', fontSize: 15, cursor: 'pointer' }}>Annuler</button>
          <button onClick={save} style={{ flex: 1, background: '#B8956A', border: 'none', borderRadius: 12, padding: '12px', color: '#1C1712', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Sauvegarder</button>
        </div>
      </Modal>
    </div>
  );
};

export default PlanningPage;