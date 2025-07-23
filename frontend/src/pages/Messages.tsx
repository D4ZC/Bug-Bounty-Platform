import { t } from 'i18next';
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const MOCK_MESSAGES = [
  {
    id: 1,
    from: 'system',
    subject: 'Invitación a Team Duel: SQL Injection',
    content: 'Has sido invitado a un Team Duel para la vulnerabilidad SQL Injection. ¿Aceptas el reto?',
    type: 'duel',
    read: false,
    trashed: false,
    date: '2024-05-01 10:00',
  },
  {
    id: 2,
    from: 'alice',
    subject: '¡Bienvenido a la plataforma!',
    content: 'Recuerda revisar los duelos activos y las nuevas vulnerabilidades.',
    type: 'info',
    read: true,
    trashed: false,
    date: '2024-04-30 09:00',
  },
  {
    id: 3,
    from: 'system',
    subject: 'Invitación a Team Duel: RCE',
    content: 'Has sido invitado a un Team Duel para la vulnerabilidad Remote Code Execution. ¿Aceptas el reto?',
    type: 'duel',
    read: false,
    trashed: true,
    date: '2024-04-29 15:00',
  },
];

type Message = typeof MOCK_MESSAGES[0];
const getStoredMessages = (): Message[] => {
  const stored = localStorage.getItem('messages');
  if (stored) return JSON.parse(stored);
  return MOCK_MESSAGES;
};

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(getStoredMessages());
  const { user } = useAuth() || {};
  const [activeTab, setActiveTab] = useState<'score_team' | 'score_user' | 'gulag'>('score_team');
  const [search, setSearch] = useState('');
  const [selectedMsg, setSelectedMsg] = useState<typeof MOCK_MESSAGES[0] | null>(null);

  // Sync con localStorage
  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  // Filtrar mensajes según pestaña y búsqueda
  const filtered = messages.filter((m: Message) =>
    (activeTab === 'score_team' ? !m.trashed : m.trashed) &&
    (m.subject.toLowerCase().includes(search.toLowerCase()) || m.content.toLowerCase().includes(search.toLowerCase()))
  );

  // Acciones
  const handleTrash = (id: number) => {
    setMessages((msgs: Message[]) => msgs.map((m: Message) => m.id === id ? { ...m, trashed: true } : m));
    setSelectedMsg(null);
  };
  const handleRestore = (id: number) => {
    setMessages((msgs: Message[]) => msgs.map((m: Message) => m.id === id ? { ...m, trashed: false } : m));
    setSelectedMsg(null);
  };
  const handleMarkRead = (id: number) => {
    setMessages((msgs: Message[]) => msgs.map((m: Message) => m.id === id ? { ...m, read: true } : m));
  };
  const handleDelete = (id: number) => {
    setMessages((msgs: Message[]) => msgs.filter((m: Message) => m.id !== id));
    setSelectedMsg(null);
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">{user?.username ? `${user.username} Messages` : 'Messages'}</h2>
      {/* Buscador y tabs */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <input
          type="text"
          className="flex-1 px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
          placeholder="Buscar mensajes o usuarios..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded font-semibold ${activeTab === 'score_team' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`}
            onClick={() => setActiveTab('score_team')}
          >
            {t('messages.inbox')}
          </button>
          <button
            className={`px-4 py-2 rounded font-semibold ${activeTab === 'trash' ? 'bg-red-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`}
            onClick={() => setActiveTab('trash')}
          >
            {t('messages.trash')}
          </button>
        </div>
      </div>
      <div className="flex gap-6">
        {/* Bandeja de mensajes */}
        <div className="flex-1 max-w-xs border-r border-gray-200 dark:border-gray-700 pr-4 overflow-y-auto max-h-[600px]">
          <ul className="space-y-2">
            {filtered.length === 0 && <li className="text-gray-500 dark:text-gray-400">No messages found.</li>}
            {filtered.map((msg: Message) => (
              <li
                key={msg.id}
                className={`p-3 rounded-lg cursor-pointer transition border border-transparent hover:border-blue-400 ${msg.read ? 'bg-gray-100 dark:bg-gray-800' : 'bg-blue-50 dark:bg-blue-900'} ${selectedMsg?.id === msg.id ? 'ring-2 ring-blue-400' : ''}`}
                onClick={() => { setSelectedMsg(msg); handleMarkRead(msg.id); }}
              >

                <div className="font-semibold text-sm text-gray-800 dark:text-gray-100 truncate">{msg.subject}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{msg.content}</div>
                <div className="text-xs text-right text-gray-400 mt-1">{msg.date}</div>
              </li>
            ))}
          </ul>
        </div>
        {/* Vista de mensaje */}
        <div className="flex-1 min-w-0">
          {selectedMsg ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <div className="flex justify-between items-center mb-2">
                <div className="font-bold text-lg text-gray-800 dark:text-gray-100">{selectedMsg.subject}</div>
                <div className="text-xs text-gray-400">{selectedMsg.date}</div>
              </div>
              <div className="mb-4 text-gray-700 dark:text-gray-200 whitespace-pre-line">{selectedMsg.content}</div>
              {selectedMsg.type === 'duel' && activeTab === 'score_team' && (
                <div className="flex gap-2 mb-4">
                  <button className="px-4 py-2 rounded bg-green-600 text-white font-bold hover:bg-green-700">Aceptar</button>
                  <button className="px-4 py-2 rounded bg-red-600 text-white font-bold hover:bg-red-700">Rechazar</button>
                </div>
              )}
              <div className="flex gap-2">
                {activeTab === 'score_team' && (
                  <button className="px-3 py-1 rounded bg-red-500 text-white font-bold hover:bg-red-600" onClick={() => handleTrash(selectedMsg.id)}>Mover a papelera</button>
                )}
                {activeTab === 'trash' && (
                  <>
                    <button className="px-3 py-1 rounded bg-blue-500 text-white font-bold hover:bg-blue-600" onClick={() => handleRestore(selectedMsg.id)}>Restaurar</button>
                    <button className="px-3 py-1 rounded bg-gray-400 text-white font-bold hover:bg-gray-500" onClick={() => handleDelete(selectedMsg.id)}>Eliminar definitivamente</button>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="text-gray-500 dark:text-gray-400 flex items-center justify-center h-full">Selecciona un mensaje para ver el contenido.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages; 