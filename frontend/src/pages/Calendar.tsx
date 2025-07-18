import React, { useState } from 'react';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

// Evento simple
interface CalendarEvent {
  year: number;
  month: number;
  day: number;
  title: string;
  buff: number;
  difficulties?: string[]; // Added difficulties field
}

const Calendar: React.FC = () => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventBuff, setEventBuff] = useState(0);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'calendar' | 'events'>('calendar');
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);

  // Dificultades y colores
  const DIFFICULTIES = [
    { label: 'Critical', value: 'critical', color: 'bg-red-600 text-white' },
    { label: 'High', value: 'high', color: 'bg-orange-500 text-white' },
    { label: 'Medium', value: 'medium', color: 'bg-yellow-400 text-gray-900' },
    { label: 'Low', value: 'low', color: 'bg-blue-400 text-white' },
  ];
  const ALL_DIFFICULTIES = DIFFICULTIES.map(d => d.value);

  // Navegación de mes
  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  };
  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  };
  // Navegación de año
  const handlePrevYear = () => setYear((y) => y - 1);
  const handleNextYear = () => setYear((y) => y + 1);

  // Selección de día
  const handleDayClick = (day: number) => {
    setSelected(day);
    setEventTitle('');
    setEventBuff(0);
    setShowModal(true);
  };

  // Filtro de dificultades
  const handleDifficultyChange = (value: string) => {
    if (value === 'all') {
      if (selectedDifficulties.length === ALL_DIFFICULTIES.length) {
        setSelectedDifficulties([]);
      } else {
        setSelectedDifficulties(ALL_DIFFICULTIES);
      }
    } else {
      if (selectedDifficulties.includes(value)) {
        setSelectedDifficulties(selectedDifficulties.filter(d => d !== value));
      } else {
        setSelectedDifficulties([...selectedDifficulties, value]);
      }
    }
  };
  const isAllSelected = selectedDifficulties.length === ALL_DIFFICULTIES.length;

  // Guardar evento (modificado para guardar dificultades)
  const handleSaveEvent = () => {
    if (selected && eventTitle && eventBuff > 0 && selectedDifficulties.length > 0) {
      if (editIndex !== null) {
        setEvents((prev) => prev.map((ev, idx) => idx === editIndex ? { year, month, day: selected, title: eventTitle, buff: eventBuff, difficulties: selectedDifficulties } : ev));
        setEditIndex(null);
      } else {
        setEvents((prev) => [
          ...prev,
          { year, month, day: selected, title: eventTitle, buff: eventBuff, difficulties: selectedDifficulties }
        ]);
      }
      setShowModal(false);
      setSelected(null);
      setEditIndex(null);
      setSelectedDifficulties([]);
    }
  };

  // Editar evento (cargar dificultades)
  const handleEditEvent = (idx: number, event: CalendarEvent) => {
    setSelected(event.day);
    setEventTitle(event.title);
    setEventBuff(event.buff);
    setShowModal(true);
    setEditIndex(idx);
    setSelectedDifficulties(event.difficulties || []);
  };

  // Eliminar evento
  const handleDeleteEvent = (idx: number) => {
    setEvents((prev) => prev.filter((_, i) => i !== idx));
  };

  // Buscar evento para un día
  const getEvent = (day: number) =>
    events.find(e => e.year === year && e.month === month && e.day === day);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = new Date(year, month, 1).getDay();
  const blanks = Array.from({ length: firstDay });
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const calendarCells = [...blanks, ...days];

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-2 text-center text-gray-800 dark:text-gray-100">Events</h2>
      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-6">
        <button
          className={`px-4 py-2 rounded-t-lg font-semibold transition-colors duration-150 ${activeTab === 'calendar' ? 'bg-gray-200 dark:bg-gray-700 text-blue-700 dark:text-blue-300 shadow' : 'bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'}`}
          onClick={() => setActiveTab('calendar')}
        >
          Calendar
        </button>
        <button
          className={`px-4 py-2 rounded-t-lg font-semibold transition-colors duration-150 ${activeTab === 'events' ? 'bg-gray-200 dark:bg-gray-700 text-blue-700 dark:text-blue-300 shadow' : 'bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'}`}
          onClick={() => setActiveTab('events')}
        >
          Scheduled Events
        </button>
      </div>
      {/* Calendario */}
      {activeTab === 'calendar' && (
        <>
          <div className="flex justify-center items-center gap-4 mb-4">
            <button onClick={handlePrevYear} className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold hover:bg-gray-300 dark:hover:bg-gray-600 text-xl">‹</button>
            <span className="text-2xl font-bold text-gray-700 dark:text-gray-200">{year}</span>
            <button onClick={handleNextYear} className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold hover:bg-gray-300 dark:hover:bg-gray-600 text-xl">›</button>
          </div>
          <div className="flex justify-between items-center mb-4">
            <button onClick={handlePrevMonth} className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold hover:bg-gray-300 dark:hover:bg-gray-600">‹</button>
            <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {monthNames[month]}
            </span>
            <button onClick={handleNextMonth} className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold hover:bg-gray-300 dark:hover:bg-gray-600">›</button>
          </div>
          <div className="grid grid-cols-7 gap-2 mb-2">
            {daysOfWeek.map((day) => (
              <div key={day} className="text-center font-semibold text-blue-600 dark:text-blue-300">
                {day}
              </div>
            ))}
            {calendarCells.map((cell, idx) => {
              const day = typeof cell === 'number' ? cell : null;
              const event = day ? getEvent(day) : null;
              const isSelected = selected === day;
              return (
                <div
                  key={idx}
                  className={`h-10 flex items-center justify-center rounded-lg text-sm cursor-pointer transition
                    ${day ? 'bg-blue-100 dark:bg-blue-900 text-gray-800 dark:text-gray-100 font-medium hover:ring-2 hover:ring-blue-400' : ''}
                    ${isSelected ? 'ring-2 ring-pink-500 bg-pink-100 dark:bg-pink-900' : ''}
                  `}
                  onClick={day ? () => handleDayClick(day) : undefined}
                  title={event ? `${event.title} (+${event.buff} pts)\nDificultad: ${event.difficulties ? event.difficulties.map(d => DIFFICULTIES.find(df => df.value === d)?.label).join(', ') : ''}` : ''}
                >
                  {day}
                  {event && (
                    <span className="ml-1 inline-block w-2 h-2 rounded-full bg-pink-500" title={`Evento: ${event.title}`}></span>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
      {/* Modal para agregar evento */}
      {showModal && selected && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-xs">
            <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-100">Agregar evento</h3>
            <div className="mb-2 text-sm text-gray-600 dark:text-gray-300">
              {monthNames[month]} {selected}, {year}
            </div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Nombre del Evento:</label>
            <input
              type="text"
              className="w-full mb-2 px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              placeholder="Título del evento"
              value={eventTitle}
              onChange={e => setEventTitle(e.target.value)}
            />
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Buff del:</label>
            <input
              type="number"
              className="w-full mb-2 px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              placeholder="0"
              value={eventBuff === 0 ? '' : eventBuff}
              min={1}
              onChange={e => setEventBuff(Number(e.target.value))}
            />
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1 mt-2">Dificultades:</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {DIFFICULTIES.map(diff => {
                const selected = selectedDifficulties.includes(diff.value);
                return (
                  <span
                    key={diff.value}
                    className={`relative flex items-center gap-1 cursor-pointer border ${selected ? diff.color : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'} px-3 py-1 rounded-full text-xs font-semibold transition`}
                    onClick={() => !selected && handleDifficultyChange(diff.value)}
                    style={{ userSelect: 'none' }}
                  >
                    <span>{diff.label}</span>
                    {selected && (
                      <button
                        type="button"
                        className="ml-1 text-lg leading-none focus:outline-none"
                        onClick={e => { e.stopPropagation(); handleDifficultyChange(diff.value); }}
                        tabIndex={-1}
                        aria-label={`Remove ${diff.label}`}
                      >
                        ×
                      </button>
                    )}
                  </span>
                );
              })}
            </div>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={() => handleDifficultyChange('all')}
                id="all-difficulties"
              />
              <label htmlFor="all-difficulties" className="font-semibold cursor-pointer">All</label>
            </div>
            {selectedDifficulties.length === 0 && (
              <div className="text-xs text-red-500 mb-2">Selecciona al menos una dificultad.</div>
            )}
            <div className="flex gap-2 mt-4">
              <button
                className="flex-1 px-3 py-1 rounded bg-blue-600 text-white font-bold hover:bg-blue-700"
                onClick={handleSaveEvent}
                disabled={!eventTitle || eventBuff <= 0 || selectedDifficulties.length === 0}
              >
                Guardar
              </button>
              <button
                className="flex-1 px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-bold hover:bg-gray-400 dark:hover:bg-gray-600"
                onClick={() => { setShowModal(false); setSelectedDifficulties([]); }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Lista de eventos programados en pestaña */}
      {activeTab === 'events' && (
        <div className="mt-6">
          {events.length === 0 ? (
            <div className="text-gray-500 dark:text-gray-400">No hay eventos programados.</div>
          ) : (
            <ul className="space-y-2 max-h-96 overflow-y-auto pr-2">
              {events.map((event, idx) => (
                <li key={idx} className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 shadow flex flex-col md:flex-row md:items-center md:gap-4">
                  <span className="font-semibold text-blue-700 dark:text-blue-300">
                    {event.day} {monthNames[event.month]} {event.year}
                  </span>
                  <span className="flex-1 text-gray-800 dark:text-gray-100">{event.title}</span>
                  <span className="font-bold text-pink-600 dark:text-pink-400">Buff: +{event.buff}</span>
                  <span className="flex gap-1 flex-wrap">
                    {event.difficulties && event.difficulties.map((d: string) => {
                      const diff = DIFFICULTIES.find(df => df.value === d);
                      return diff ? (
                        <span key={d} className={`px-2 py-0.5 rounded text-xs font-bold ${diff.color}`}>{diff.label}</span>
                      ) : null;
                    })}
                  </span>
                  <div className="flex gap-2 mt-2 md:mt-0">
                    <button
                      className="px-2 py-1 rounded bg-yellow-400 text-white font-bold hover:bg-yellow-500 text-xs"
                      onClick={() => handleEditEvent(idx, event)}
                    >Editar</button>
                    <button
                      className="px-2 py-1 rounded bg-red-500 text-white font-bold hover:bg-red-600 text-xs"
                      onClick={() => handleDeleteEvent(idx)}
                    >Eliminar</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Calendar; 