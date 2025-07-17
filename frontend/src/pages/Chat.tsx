import React from 'react';

const exampleChats = [
  { id: 1, name: 'Equipo Alpha', lastMessage: '¡Hola equipo!', unread: 2 },
  { id: 2, name: 'Soporte', lastMessage: '¿En qué puedo ayudarte?', unread: 0 },
  { id: 3, name: 'Global', lastMessage: 'Bienvenidos al chat global.', unread: 5 },
];

const exampleMessages = [
  { id: 1, sender: 'Tú', content: '¡Hola equipo!', time: '10:00' },
  { id: 2, sender: 'Ana', content: '¡Hola! ¿Listos para el reto?', time: '10:01' },
  { id: 3, sender: 'Carlos', content: 'Sí, vamos a ganar.', time: '10:02' },
];

const Chat: React.FC = () => {
  return (
    <div className="flex h-full">
        {/* Lista de chats */}
      <aside className="w-64 bg-white border-r p-4">
        <h2 className="text-lg font-bold mb-4">Chats</h2>
        <ul className="space-y-2">
          {exampleChats.map(chat => (
            <li key={chat.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-blue-50 cursor-pointer">
              <span className="font-medium">{chat.name}</span>
              {chat.unread > 0 && (
                <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5">{chat.unread}</span>
              )}
            </li>
          ))}
        </ul>
      </aside>
      {/* Mensajes del chat seleccionado */}
      <main className="flex-1 flex flex-col p-6">
        <h3 className="text-xl font-semibold mb-4">Equipo Alpha</h3>
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {exampleMessages.map(msg => (
            <div key={msg.id} className="flex flex-col">
              <span className="text-sm font-bold text-blue-700">{msg.sender}</span>
              <span className="text-gray-800">{msg.content}</span>
              <span className="text-xs text-gray-400">{msg.time}</span>
                  </div>
                ))}
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