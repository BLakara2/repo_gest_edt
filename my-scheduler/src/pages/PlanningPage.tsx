import React, { useState } from 'react'
import { Box, Container, Paper, Typography, IconButton, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Select, MenuItem, FormControl, InputLabel, Stack, Chip, CssBaseline } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

// Types
type DayKey = 'Lundi'|'Mardi'|'Mercredi'|'Jeudi'|'Vendredi'|'Samedi'|'Dimanche'
interface EventItem { id: string; title: string; day: DayKey; startHour: number; durationHours: number; color?: string }

const DAYS: DayKey[] = ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche']
const HOURS = Array.from({length: 12}, (_,i)=>8+i) // 8:00 - 19:00
const mkId = ()=>Math.random().toString(36).slice(2,9)

const PlanningPage: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([
    { id: mkId(), title: 'Algèbre', day: 'Lundi', startHour: 9, durationHours: 2, color: '#a1887f' },
    { id: mkId(), title: 'Travail', day: 'Mercredi', startHour: 14, durationHours: 3, color: '#bcaaa4' }
  ])

  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<Partial<EventItem>>({ title: '', day: 'Lundi', startHour: 8, durationHours: 1, color: '#d7ccc8' })
  const [editingId, setEditingId] = useState<string | null>(null)

  const openCreate = ()=> { setEditingId(null); setForm({ title: '', day:'Lundi', startHour:8, durationHours:1, color:'#d7ccc8' }); setOpen(true) }
  const openEdit = (ev: EventItem)=> { setEditingId(ev.id); setForm({...ev}); setOpen(true) }
  const save = () => {
    if(!form.title) return alert('Titre requis')
    if(editingId){ setEvents(e=>e.map(x=> x.id===editingId ? ({...x, ...(form as EventItem)}) : x)) }
    else { setEvents(e=>[...e, { ...(form as EventItem), id: mkId() } as EventItem]) }
    setOpen(false)
  }
  const remove = (id: string) => setEvents(e=>e.filter(x=>x.id!==id))
  const eventsByCell = (day: DayKey, hour: number) => events.filter(ev => ev.day===day && ev.startHour===hour)

  return (
    <Paper sx={{ p: 0 }}>
      <CssBaseline />
      <Container
        maxWidth={false}
        sx={{
          py: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          minHeight: '100vh',
          boxSizing: 'border-box',
          px: { xs: 2, sm: 4, md: 6 },
          bgcolor: '#6d4c41',
        }}
      >
        {/* Barre titre + bouton */}
        <Stack 
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          sx={{ mb: 3, width: '100%' }}
          spacing={{ xs: 1, sm: 0 }}
        >
          <Typography variant="h4" gutterBottom sx={{ color: '#fff' }}>📅 Mon Emploi du Temps</Typography>
          <Button startIcon={<AddIcon />} variant="contained" onClick={openCreate}>Ajouter</Button>
        </Stack>

        {/* Tableau planning */}<Paper sx={{ bgcolor: '#ffffff', p: 2, width: '100%', boxSizing: 'border-box', borderRadius: 2 }}>
  <Box
    sx={{
      width: '100%',
      overflowX: 'auto',
      overflowY: 'auto',
      maxHeight: '70vh',
    }}
  >
    <Box sx={{ display: 'flex', minWidth: 700 }}>
      {/* Colonne heures */}
      <Box sx={{ width: { xs: 60, sm: 180 }, flexShrink: 0, display: 'grid', gridTemplateRows: `50px repeat(${HOURS.length}, 100px)` }}>
        <Box sx={{ p:1 }} />
        {HOURS.map(h => (
          <Paper key={h} variant="outlined" sx={{ m:0.5, height:98, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Typography variant="caption">{h}:00</Typography>
          </Paper>
        ))}
      </Box>

      {/* Colonnes jours */}
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>
        {DAYS.map(day => (
          <Box key={day} sx={{ minWidth: { xs: 100, sm: 180 }, flexShrink: 0, display:'flex', flexDirection:'column', mr:0.5 }}>
            <Box sx={{ height:50, display:'flex', bgcolor: '#8d6e63', borderRadius: '4px', alignItems:'center', justifyContent:'center' }}>
              <Typography fontWeight={600} sx={{ color: '#fff' }}>{day}</Typography>
            </Box>
            {HOURS.map(h => (
              <Box key={h} sx={{ height:100, borderTop:'1px solid rgba(0,0,0,0.06)', p:0.5 }}>
                <Box sx={{ height:'100%', position:'relative' }}>
                  {eventsByCell(day as DayKey, h).map(ev => (
                    <Paper key={ev.id} onDoubleClick={()=>openEdit(ev)} sx={{
                      position:'absolute',
                      left:4,
                      right:4,
                      top:4,
                      bottom:4,
                      bgcolor:ev.color,
                      color:'rgba(0,0,0,0.87)',
                      p: { xs: 0.5, sm: 1 },
                      cursor:'pointer',
                      display:'flex',
                      flexDirection:'column',
                      justifyContent:'space-between',
                      fontSize: { xs: 10, sm: 12 },
                      boxSizing: 'border-box',
                    }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2" noWrap>{ev.title}</Typography>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <IconButton size="small" onClick={()=>openEdit(ev)}>✎</IconButton>
                          <IconButton size="small" onClick={()=>remove(ev.id)}>✕</IconButton>
                        </Stack>
                      </Stack>
                      <Typography variant="caption">{ev.startHour}:00 — {ev.startHour + ev.durationHours}:00</Typography>
                    </Paper>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  </Box>
</Paper>

        {/* Dialog ajout / édition */}
        <Dialog open={open} onClose={()=>setOpen(false)} fullWidth maxWidth="sm">
          <DialogTitle>{editingId ? 'Éditer l\'évènement' : 'Ajouter un évènement'}</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{mt:1}}>
              <TextField label="Titre" value={form.title || ''} onChange={e=>setForm(f=>({...f, title: e.target.value}))} fullWidth />
              <FormControl fullWidth>
                <InputLabel>Jour</InputLabel>
                <Select value={form.day || 'Lundi'} label="Jour" onChange={e=>setForm(f=>({...f, day: e.target.value as DayKey}))}>
                  {DAYS.map(d=> <MenuItem key={d} value={d}>{d}</MenuItem>)}
                </Select>
              </FormControl>

              <Stack direction="row" spacing={2}>
                <TextField label="Heure (h)" type="number" inputProps={{min:0, max:23}} value={form.startHour || 8} onChange={e=>setForm(f=>({...f, startHour: Number(e.target.value)}))} />
                <TextField label="Durée (h)" type="number" inputProps={{min:1, max:12}} value={form.durationHours || 1} onChange={e=>setForm(f=>({...f, durationHours: Number(e.target.value)}))} />
              </Stack>

              <TextField label="Couleur (hex)" value={form.color || '#d7ccc8'} onChange={e=>setForm(f=>({...f, color: e.target.value}))} />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>setOpen(false)}>Annuler</Button>
            <Button variant="contained" onClick={save}>Sauvegarder</Button>
          </DialogActions>
        </Dialog>

        <Box sx={{mt:3, display:'flex', gap:1, flexWrap:'wrap'}}>
          <Typography variant="subtitle1">Raccourcis couleurs :</Typography>
          {["#d7ccc8","#a1887f","#bcaaa4","#8d6e63","#5d4037"].map(c=> <Chip key={c} label={c} onClick={()=>navigator.clipboard?.writeText(c)} sx={{bgcolor:c, color:'#000', fontWeight:'bold', px:2, py:1}} />)}
        </Box>

      </Container>
    </Paper>
  )
}

export default PlanningPage;