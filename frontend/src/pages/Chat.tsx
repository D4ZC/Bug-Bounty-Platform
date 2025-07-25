import React, { useState } from 'react';
import Modal from '../components/ui/Modal';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

const exampleChats = [
  { id: 1, name: 'Alpha Team', avatar: 'https://www.pngmart.com/files/22/CF-Pachuca-PNG-HD.png', lastMessage: 'typing...', unread: 2, online: true, pinned: true, timestamp: '10:30' },
  { id: 2, name: 'Global Team', avatar: 'https://tse1.mm.bing.net/th/id/OIP.0QxhCr3G6qDcdjk3QcMlZQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3', lastMessage: '¿Alguien va al CTF?', unread: 5, online: true, pinned: true, timestamp: '08:45' },
  { id: 4, name: 'CTF Team', avatar: 'https://i.pinimg.com/originals/a4/d2/94/a4d2945382145c603b05648d3434bdd0.jpg', lastMessage: '¡Sí, ya tengo todo preparado!', unread: 1, online: false, pinned: true, timestamp: 'Ayer' },
  { id: 3, name: 'Soporte', avatar: 'https://tse1.mm.bing.net/th/id/OIP.2BJ036gvA9VDV2GV5z9BzwAAAA?rs=1&pid=ImgDetMain&o=7&rm=3', lastMessage: 'Por favor, describe el problema.', unread: 0, online: false, pinned: false, timestamp: '09:15' },
  { id: 5, name: 'Ana Torres', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', lastMessage: 'No, todo claro. ¡Gracias!', unread: 0, online: true, pinned: false, timestamp: 'Ayer' },
  { id: 6, name: 'Carlos Pérez', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', lastMessage: 'Ya lo estoy revisando', unread: 0, online: false, pinned: false, timestamp: '20/07' },
  { id: 7, name: 'Laura Gómez', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', lastMessage: '¡Gracias!', unread: 0, online: true, pinned: false, timestamp: '19/07' },
];

const archivedChats = [
  { id: 8, name: 'Chat Antiguo', avatar: 'https://randomuser.me/api/portraits/men/75.jpg', lastMessage: 'Este chat está archivado', unread: 0, online: false, pinned: false, timestamp: '15/07' },
];

const allMessages: Record<number, Array<{ id: number; sender: string; avatar: string; content: string; time: string }>> = {
  1: [
    { id: 1, sender: 'Tú', avatar: 'https://randomuser.me/api/portraits/men/45.jpg', content: '¡Hola equipo!', time: '10:00' },
    { id: 2, sender: 'Ana', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', content: '¡Hola! ¿Listos para el reto?', time: '10:01' },
    { id: 3, sender: 'Carlos', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', content: 'Sí, vamos a ganar.', time: '10:02' },
    { id: 4, sender: 'Lucía', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', content: '¡Confío en ustedes!', time: '10:03' },
    { id: 5, sender: 'Tú', avatar: 'https://randomuser.me/api/portraits/men/45.jpg', content: '¡A darlo todo!', time: '10:04' },
  ],
  2: [
    { id: 1, sender: 'Soporte', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', content: '¿En qué puedo ayudarte?', time: '09:00' },
    { id: 2, sender: 'Tú', avatar: 'https://randomuser.me/api/portraits/men/45.jpg', content: 'Tengo un problema con mi cuenta.', time: '09:01' },
    { id: 3, sender: 'Soporte', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', content: 'Por favor, describe el problema.', time: '09:02' },
  ],
  3: [
    { id: 1, sender: 'Admin', avatar: 'https://cdn-icons-png.flaticon.com/512/1946/1946436.png', content: 'Bienvenidos al chat global.', time: '08:00' },
    { id: 2, sender: 'Pedro', avatar: 'https://randomuser.me/api/portraits/men/45.jpg', content: '¡Hola a todos!', time: '08:01' },
    { id: 3, sender: 'Ana', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', content: '¡Éxito en los retos!', time: '08:02' },
    { id: 4, sender: 'Carlos', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', content: '¿Alguien va al CTF?', time: '08:03' },
  ],
  4: [
    { id: 1, sender: 'Tú', avatar: 'https://randomuser.me/api/portraits/men/45.jpg', content: '¿Listos para la competencia?', time: '11:00' },
    { id: 2, sender: 'Lucía', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', content: '¡Sí, ya tengo todo preparado!', time: '11:01' },
  ],
  5: [
    { id: 1, sender: 'Ana Torres', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', content: '¿Tienes dudas?', time: '12:00' },
    { id: 2, sender: 'Tú', avatar: 'https://randomuser.me/api/portraits/men/45.jpg', content: 'No, todo claro. ¡Gracias!', time: '12:01' },
  ],
  6: [
    { id: 1, sender: 'Carlos Pérez', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', content: 'Revisa el nuevo reto', time: '14:00' },
    { id: 2, sender: 'Tú', avatar: 'https://randomuser.me/api/portraits/men/45.jpg', content: 'Ya lo estoy revisando', time: '14:01' },
  ],
  7: [
    { id: 1, sender: 'Laura Gómez', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', content: '¡Excelente trabajo!', time: '16:00' },
    { id: 2, sender: 'Tú', avatar: 'https://randomuser.me/api/portraits/men/45.jpg', content: '¡Gracias!', time: '16:01' },
  ],
  8: [
    { id: 1, sender: 'Chat Antiguo', avatar: 'https://randomuser.me/api/portraits/men/75.jpg', content: 'Este chat está archivado', time: '15:00' },
  ],
};

const Chat: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<number>(1);
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'favorites' | 'groups'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [messagesByChat, setMessagesByChat] = useState(() => ({ ...allMessages }));
  const messages = messagesByChat[selectedChat] || [];
  const chat = exampleChats.find(c => c.id === selectedChat);
  const isTyping = selectedChat === 1 && true; // Simulación: alguien está escribiendo en Equipo Alpha
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [newChatName, setNewChatName] = useState('');
  const [newChatAvatar, setNewChatAvatar] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showGroupInfo, setShowGroupInfo] = useState(false);
  const [showCallModal, setShowCallModal] = useState<null | 'call' | 'video'>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);

  const handleCreateChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChatName.trim()) return;
    // Simula agregar un nuevo chat
    const newId = Date.now();
    exampleChats.push({
      id: newId,
      name: newChatName,
      avatar: newChatAvatar || 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png',
      lastMessage: '',
      unread: 0,
      online: false,
      pinned: false,
      timestamp: 'Ahora'
    });
    setShowNewChatModal(false);
    setNewChatName('');
    setNewChatAvatar('');
    setSelectedChat(newId);
  };

  const handleLogout = () => {
    // Simula logout
    window.location.href = '/login';
  };

  const filteredChats = exampleChats.filter(chat => {
    const matchesSearch = chat.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || 
                         (activeFilter === 'unread' && chat.unread > 0) ||
                         (activeFilter === 'favorites' && chat.pinned) ||
                         (activeFilter === 'groups' && chat.name.includes('Team'));
    return matchesSearch && matchesFilter;
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    setMessagesByChat(prev => ({
      ...prev,
      [selectedChat]: [
        ...(prev[selectedChat] || []),
        {
          id: Date.now(),
          sender: 'Tú',
          avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
          content: messageInput,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    }));
    setMessageInput('');
  };

  const handleSelectEmoji = (emoji: any) => {
    if (!inputRef.current) return;
    const input = inputRef.current;
    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;
    const newValue = messageInput.slice(0, start) + (emoji.native || emoji?.emojis?.[0]?.native || '') + messageInput.slice(end);
    setMessageInput(newValue);
    setShowEmojiPicker(false);
    setTimeout(() => {
      input.focus();
      input.setSelectionRange(start + (emoji.native ? emoji.native.length : 2), start + (emoji.native ? emoji.native.length : 2));
    }, 0);
  };

  return (
    <div className="flex h-full min-h-[500px] bg-gray-50">
      {/* Lista de chats */}
      <aside className="w-80 bg-white border-r flex flex-col">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Chat</h2>
            <div className="flex gap-2">
              <button className="p-2 rounded-lg hover:bg-gray-100" onClick={() => setShowNewChatModal(true)}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
              <div className="relative">
                <button className="p-2 rounded-lg hover:bg-gray-100" onClick={() => setShowMenu(v => !v)}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
                {showMenu && (
                  <div className="absolute right-0 mt-2 w-52 bg-gray-900 rounded-lg shadow-lg border z-50 p-2 animate-in fade-in slide-in-from-top-2 duration-200 text-gray-100">
                    <button className="w-full flex items-center gap-3 text-left px-4 py-2 rounded hover:bg-gray-800 transition-colors duration-200" onClick={() => { setShowMenu(false); setShowNewChatModal(true); }}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m5-7a4 4 0 11-8 0 4 4 0 018 0zm6 4v5m0 0h-3m3 0h3" /></svg>
                      New group
                    </button>
                    <button className="w-full flex items-center gap-3 text-left px-4 py-2 rounded hover:bg-gray-800 transition-colors duration-200">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.036 6.29a1 1 0 00.95.69h6.631c.969 0 1.371 1.24.588 1.81l-5.37 3.905a1 1 0 00-.364 1.118l2.036 6.29c.3.921-.755 1.688-1.54 1.118l-5.37-3.905a1 1 0 00-1.176 0l-5.37 3.905c-.784.57-1.838-.197-1.54-1.118l2.036-6.29a1 1 0 00-.364-1.118L2.342 11.717c-.783-.57-.38-1.81.588-1.81h6.631a1 1 0 00.95-.69l2.036-6.29z" /></svg>
                      Starred messages
                    </button>
                    <button className="w-full flex items-center gap-3 text-left px-4 py-2 rounded hover:bg-gray-800 transition-colors duration-200">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /><path d="M9 9h6v6H9z" /></svg>
                      Select chats
                    </button>
                    <div className="border-t border-gray-700 my-2"></div>
                    <button className="w-full flex items-center gap-3 text-left px-4 py-2 rounded hover:bg-gray-800 transition-colors duration-200" onClick={handleLogout}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" /></svg>
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Barra de búsqueda */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search or start new chat"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Filtros */}
        <div className="px-4 py-2 border-b">
          <div className="flex gap-1">
            {[
              { key: 'all', label: 'All' },
              { key: 'unread', label: 'Unread' },
              { key: 'favorites', label: 'Favorites' },
              { key: 'groups', label: 'Groups' }
            ].map(filter => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key as any)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === filter.key
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de chats */}
        <div className="flex-1 overflow-y-auto">
      
          {/* Chats principales */}
          <ul className="space-y-1">
            {filteredChats.map(chat => (
              <li
                key={chat.id}
                className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 ${
                  selectedChat === chat.id ? 'bg-blue-50' : ''
                }`}
                onClick={() => setSelectedChat(chat.id)}
              >
                <div className="relative">
                  <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full" />
                  {chat.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900 truncate">{chat.name}</h3>
                    <div className="flex items-center gap-1">
                      {chat.pinned && (
                        <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                        </svg>
                      )}
                      <span className="text-xs text-gray-500">{chat.timestamp}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
              {chat.unread > 0 && (
                      <span className="bg-green-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                        {chat.unread}
                      </span>
              )}
                  </div>
                </div>
            </li>
          ))}
        </ul>
        </div>
      </aside>

      {/* Mensajes del chat seleccionado */}
      <main className="flex-1 flex flex-col bg-white">
        {/* Header del chat */}
        <div className="p-4 border-b flex items-center justify-between cursor-pointer hover:bg-gray-50" onClick={() => setShowGroupInfo(true)}>
          <div className="flex items-center gap-3">
            <div className="relative">
              {chat && <img src={chat.avatar} alt={chat.name} className="w-10 h-10 rounded-full" />}
              {chat?.online && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{chat?.name}</h3>
              <p className="text-sm text-gray-500">
                {chat?.online ? 'online' : 'last seen recently'}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg hover:bg-gray-100" type="button" onClick={e => { e.stopPropagation(); setShowCallModal('call'); }}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100" type="button" onClick={e => { e.stopPropagation(); setShowCallModal('video'); }}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Área de mensajes */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg: any) => (
            <div key={msg.id} className={`flex gap-3 ${msg.sender === 'Tú' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender !== 'Tú' && (
                <img src={msg.avatar} alt={msg.sender} className="w-8 h-8 rounded-full flex-shrink-0" />
              )}
              <div className={`max-w-xs lg:max-w-md ${msg.sender === 'Tú' ? 'order-1' : 'order-2'}`}>
                <div className={`rounded-lg px-4 py-2 ${
                  msg.sender === 'Tú' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white text-gray-900 border'
                }`}>
                  <p className="text-sm">{msg.content}</p>
                </div>
                <div className={`text-xs text-gray-500 mt-1 ${msg.sender === 'Tú' ? 'text-right' : 'text-left'}`}>
                  {msg.time}
                </div>
              </div>
              {msg.sender === 'Tú' && (
                <img src={msg.avatar} alt={msg.sender} className="w-8 h-8 rounded-full flex-shrink-0" />
              )}
                  </div>
                ))}
          {isTyping && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              </div>
              <span>typing...</span>
            </div>
          )}
        </div>

        {/* Input de mensaje */}
        <div className="p-4 border-t bg-white">
          <form className="flex items-center gap-2 relative" onSubmit={handleSendMessage}>
            <div className="relative">
              <button className="p-2 rounded-lg hover:bg-gray-100" type="button" onClick={() => setShowEmojiPicker(v => !v)}>
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              {showEmojiPicker && (
                <div className="absolute bottom-12 left-0 z-50">
                  <Picker data={data} onEmojiSelect={handleSelectEmoji} theme="light" />
                </div>
              )}
            </div>
            <input
              type="text"
              placeholder="Type a message"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={messageInput}
              onChange={e => setMessageInput(e.target.value)}
              ref={inputRef}
            />
            <button
              className="ml-2 p-0 w-10 h-10 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600 transition-colors duration-200 shadow-lg"
              type="submit"
            >
              <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </form>
        </div>
      </main>
      <Modal open={showNewChatModal} onClose={() => setShowNewChatModal(false)}>
        <div className="bg-gray-900 rounded-lg p-0 w-96 max-w-full">
          {/* Header */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-800">
            <button onClick={() => setShowNewChatModal(false)} className="text-gray-300 hover:text-white focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <span className="text-lg font-semibold text-white">New chat</span>
          </div>
          {/* Search */}
          <div className="px-6 py-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search name or number"
                className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-green-500 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <svg className="absolute left-3 top-2.5 w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          {/* Opciones */}
          <div className="flex flex-col gap-4 px-6 pb-6">
            <button className="flex items-center gap-4 bg-green-600 hover:bg-green-700 text-white rounded-full px-5 py-3 text-lg font-medium transition-colors">
              <span className="bg-green-700 rounded-full p-2"><svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m5-7a4 4 0 11-8 0 4 4 0 018 0zm6 4v5m0 0h-3m3 0h3" /></svg></span>
              New group
            </button>
            <button className="flex items-center gap-4 bg-green-600 hover:bg-green-700 text-white rounded-full px-5 py-3 text-lg font-medium transition-colors">
              <span className="bg-green-700 rounded-full p-2"><svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg></span>
              New contact
            </button>
            <button className="flex items-center gap-4 bg-green-600 hover:bg-green-700 text-white rounded-full px-5 py-3 text-lg font-medium transition-colors">
              <span className="bg-green-700 rounded-full p-2"><svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m5-7a4 4 0 11-8 0 4 4 0 018 0zm6 4v5m0 0h-3m3 0h3M12 4v16" /></svg></span>
              New community
            </button>
          </div>
        </div>
      </Modal>
      <Modal open={showGroupInfo} onClose={() => setShowGroupInfo(false)}>
        <div className="bg-gray-900 rounded-lg w-[420px] max-w-full max-h-[90vh] overflow-y-auto text-white p-0">
          {/* Header */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-800">
            <button onClick={() => setShowGroupInfo(false)} className="text-gray-300 hover:text-white focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <span className="text-lg font-semibold text-white">Group info</span>
          </div>
          {/* Avatar grande y nombre */}
          <div className="flex flex-col items-center gap-2 py-6">
            <img src={chat?.avatar} alt={chat?.name} className="w-24 h-24 rounded-full border-4 border-green-500 shadow mb-2" />
            <div className="text-2xl font-bold mb-1">{chat?.name}</div>
            <div className="text-gray-400 text-sm mb-2">Group · 20 members</div>
          </div>
          {/* Info adicional */}
          <div className="px-8 pb-4">
            <div className="mb-3">
              <div className="text-green-400 font-bold text-sm mb-1">Descripción:</div>
              <a target="_blank" rel="noopener noreferrer" className="text-green-300 break-all hover:underline text-sm"></a>
            </div>
            <div className="text-xs text-gray-400 mb-2">Group created by +52 1 33 1427 7504, on 20/07/2023 at 16:21</div>
          </div>
          {/* Secciones */}
          <div className="px-8 flex flex-col gap-2">
            <div className="flex items-center gap-3 py-2 border-b border-gray-800">
              <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="M8 12h8" /></svg>
              <span>Media, links and docs</span>
              <span className="ml-auto text-xs text-gray-400">0</span>
            </div>
            <div className="flex items-center gap-3 py-2 border-b border-gray-800">
              <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.036 6.29a1 1 0 00.95.69h6.631c.969 0 1.371 1.24.588 1.81l-5.37 3.905a1 1 0 00-.364 1.118l2.036 6.29c.3.921-.755 1.688-1.54 1.118l-5.37-3.905a1 1 0 00-1.176 0l-5.37 3.905c-.784.57-1.838-.197-1.54-1.118l2.036-6.29a1 1 0 00-.364-1.118L2.342 11.717c-.783-.57-.38-1.81.588-1.81h6.631a1 1 0 00.95-.69l2.036-6.29z" /></svg>
              <span>Starred messages</span>
            </div>
            <div className="flex items-center gap-3 py-2 border-b border-gray-800">
              <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" /><path d="M8 12h8" /></svg>
              <span>Mute notifications</span>
              <input type="checkbox" className="ml-auto form-checkbox h-4 w-4 text-green-500" />
            </div>
            <div className="flex items-center gap-3 py-2 border-b border-gray-800">
              <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /><path d="M9 9h6v6H9z" /></svg>
              <span>Encryption</span>
              <span className="ml-auto text-xs text-gray-400">Messages are end-to-end encrypted.</span>
            </div>
            <div className="flex items-center gap-3 py-2 border-b border-gray-800">
              <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12l8-4-8-4-8 4 8 4zm0 0v8" /></svg>
              <span>Advanced chat privacy</span>
              <span className="ml-auto text-xs text-gray-400">Off</span>
            </div>
          </div>
          {/* Miembros */}
          <div className="px-8 py-4">
            <div className="text-gray-400 text-xs mb-2">3 members</div>
            <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
              <div className="flex items-center gap-3">
                <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="You" className="w-8 h-8 rounded-full" />
                <div>
                  <div className="font-semibold text-white">You</div>
                  <div className="text-xs text-gray-400">echte liebe 🖤💛</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Ana Torres" className="w-8 h-8 rounded-full" />
                <div>
                  <div className="font-semibold text-white">Ana Torres</div>
                  <div className="text-xs text-gray-400">Estoy durmiendo</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Carlos Pérez" className="w-8 h-8 rounded-full" />
                <div>
                  <div className="font-semibold text-white">Jorge Nuela</div>
                  <div className="text-xs text-gray-400">Suavicremas</div>
                </div>
              </div>
              {/* ...más miembros mock... */}
            </div>
          </div>
        </div>
      </Modal>
      <Modal open={!!showCallModal} onClose={() => setShowCallModal(null)}>
        <div className="bg-gray-900 rounded-lg w-80 max-w-full p-8 flex flex-col items-center justify-center text-white">
          <div className="mb-4 text-2xl font-bold">
            {showCallModal === 'call' ? 'Llamando...' : 'Videollamando...'}
          </div>
          <div className="flex gap-6 mt-6 mb-4">
            {/* Mute */}
            <button
              className={`w-12 h-12 flex items-center justify-center rounded-full ${isMuted ? 'bg-red-600' : 'bg-gray-700'} hover:bg-red-700 transition-colors`}
              onClick={() => setIsMuted(v => !v)}
              title="Mute"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMuted ? (
                  // Micrófono muteado
                  <>
                    <path d="M9 19a3 3 0 006 0v-1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 5v6a3 3 0 003 3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M19 19L5 5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15 9.34V5a3 3 0 00-6 0v4.34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </>
                ) : (
                  // Micrófono normal
                  <>
                    <rect x="9" y="2" width="6" height="11" rx="3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5 10v2a7 7 0 0014 0v-2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 19v3m-4 0h8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </>
                )}
              </svg>
            </button>
            {/* Speaker */}
            <button
              className={`w-12 h-12 flex items-center justify-center rounded-full ${isSpeakerOn ? 'bg-green-600' : 'bg-gray-700'} hover:bg-green-700 transition-colors`}
              onClick={() => setIsSpeakerOn(v => !v)}
              title="Altavoz"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 8a6 6 0 010 8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {/* Video (solo en videollamada) */}
            {showCallModal === 'video' && (
              <button
                className={`w-12 h-12 flex items-center justify-center rounded-full ${isVideoOn ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-700 transition-colors`}
                onClick={() => setIsVideoOn(v => !v)}
                title="Video"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isVideoOn ? (
                    // Cámara encendida
                    <>
                      <rect x="3" y="7" width="13" height="10" rx="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M17 7l4 4v2l-4 4V7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </>
                  ) : (
                    // Cámara apagada
                    <>
                      <rect x="3" y="7" width="13" height="10" rx="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M17 7l4 4v2l-4 4V7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <line x1="3" y1="7" x2="20" y2="21" strokeWidth="2" strokeLinecap="round" />
                    </>
                  )}
                </svg>
              </button>
            )}
            {/* Colgar */}
            <button
              className="w-12 h-12 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-700 transition-colors"
              onClick={() => setShowCallModal(null)}
              title="Colgar"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M21 15.46A16.88 16.88 0 0012 13a16.88 16.88 0 00-9 2.46V18a2 2 0 002 2h1.54a2 2 0 001.42-.59l2.12-2.12a16.06 16.06 0 016.36 0l2.12 2.12a2 2 0 001.42.59H20a2 2 0 002-2v-2.54z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Chat; 