import React, { useState } from 'react';

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
  const messages = allMessages[selectedChat] || [];
  const chat = exampleChats.find(c => c.id === selectedChat);
  const isTyping = selectedChat === 1 && true; // Simulación: alguien está escribiendo en Equipo Alpha

  const filteredChats = exampleChats.filter(chat => {
    const matchesSearch = chat.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || 
                         (activeFilter === 'unread' && chat.unread > 0) ||
                         (activeFilter === 'favorites' && chat.pinned) ||
                         (activeFilter === 'groups' && chat.name.includes('Team'));
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex h-full min-h-[500px] bg-gray-50">
      {/* Lista de chats */}
      <aside className="w-80 bg-white border-r flex flex-col">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Chat</h2>
            <div className="flex gap-2">
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
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
        <div className="p-4 border-b flex items-center justify-between">
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
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
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
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <input
              type="text"
              placeholder="Type a message"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled
            />
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat; 