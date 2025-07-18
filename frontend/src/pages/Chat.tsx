import React, { useState } from 'react';

const exampleChats = [
  { id: 1, name: 'Equipo Alpha', avatar: 'https://randomuser.me/api/portraits/men/45.jpg', lastMessage: '¡Hola equipo!', unread: 2, online: true },
  { id: 2, name: 'Soporte', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', lastMessage: '¿En qué puedo ayudarte?', unread: 0, online: false },
  { id: 3, name: 'Global', avatar: 'https://cdn-icons-png.flaticon.com/512/1946/1946436.png', lastMessage: 'Bienvenidos al chat global.', unread: 5, online: true },
  { id: 4, name: 'CTF Team', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', lastMessage: '¡Vamos por el primer lugar!', unread: 0, online: false },
  { id: 5, name: 'Ana Torres', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', lastMessage: '¿Tienes dudas?', unread: 1, online: true },
];

const allMessages = {
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
};

const Chat: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<number>(1);
  const messages = allMessages[selectedChat] || [];
  const chat = exampleChats.find(c => c.id === selectedChat);
  const isTyping = selectedChat === 1 && true; // Simulación: alguien está escribiendo en Equipo Alpha

  return (
    <div className="flex h-full min-h-[500px]">
      {/* Lista de chats */}
      <aside className="w-72 bg-white border-r p-4">
        <h2 className="text-lg font-bold mb-4">Chats</h2>
        <ul className="space-y-2">
          {exampleChats.map(chat => (
            <li
              key={chat.id}
              className={`flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-blue-50 ${selectedChat === chat.id ? 'bg-blue-100' : ''}`}
              onClick={() => setSelectedChat(chat.id)}
            >
              <div className="flex items-center gap-2">
                <img src={chat.avatar} alt={chat.name} className="w-8 h-8 rounded-full" />
                <span className="font-medium">{chat.name}</span>
                {chat.online && <span className="ml-1 w-2 h-2 rounded-full bg-green-500 inline-block" title="En línea"></span>}
              </div>
              {chat.unread > 0 && (
                <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5">{chat.unread}</span>
              )}
            </li>
          ))}
        </ul>
      </aside>
      {/* Mensajes del chat seleccionado */}
      <main className="flex-1 flex flex-col p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          {chat && <img src={chat.avatar} alt={chat.name} className="w-8 h-8 rounded-full" />}
          {chat?.name}
          {chat?.online && <span className="ml-2 w-2 h-2 rounded-full bg-green-500 inline-block" title="En línea"></span>}
        </h3>
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map(msg => (
            <div key={msg.id} className="flex items-center gap-3">
              <img src={msg.avatar} alt={msg.sender} className="w-7 h-7 rounded-full" />
              <div>
                <span className="text-sm font-bold text-blue-700">{msg.sender}</span>
                <span className="block text-gray-800">{msg.content}</span>
                <span className="text-xs text-gray-400">{msg.time}</span>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              Alguien está escribiendo...
            </div>
          )}
        </div>
        <form className="flex gap-2">
          <input type="text" className="flex-1 border rounded-lg px-3 py-2" placeholder="Escribe un mensaje..." disabled />
          <button type="button" className="bg-blue-600 text-white px-4 py-2 rounded-lg" disabled>Enviar</button>
        </form>
      </main>
    </div>
  );
};

export default Chat; 