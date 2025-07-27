import React, { useState } from 'react';

const mockTeam = {
  name: 'Equipo Alpha',
  avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=equipo',
  users: [
    { id: 1, name: 'Ana', avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=ana' },
    { id: 2, name: 'Luis', avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=luis' },
    { id: 3, name: 'Marta', avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=marta' },
  ],
};

type MessageType = { from: string; text: string; time: string };
const mockMessages: Record<number, MessageType[]> = {
  1: [
    { from: 'Usuario1', text: '¡Hola equipo!', time: '10:00' },
    { from: 'Yo', text: '¡Hola!', time: '10:01' },
  ],
  2: [
    { from: 'Usuario2', text: '¿Listos para el reto?', time: '10:02' },
  ],
  3: [
    { from: 'Usuario3', text: 'Vamos con todo', time: '10:03' },
  ],
};

const mockGroupMessagesInit = [
  { from: 'Ana', text: '¡Bienvenidos al chat de equipo!', time: '09:59' },
  { from: 'Luis', text: '¡Vamos con todo!', time: '10:00' },
  { from: 'Yo', text: '¡Listos!', time: '10:01' },
];

const mockGlobalMessagesInit = [
  { from: 'Admin', text: '¡Bienvenidos al chat global!', time: '09:55' },
  { from: 'Otro', text: '¡Hola a todos!', time: '09:56' },
];

const mensajes = [
  { title: 'HOLA', content: '¡Bienvenido a la plataforma! Aquí recibirás tus notificaciones importantes.' },
  { title: 'Recordatorio', content: 'No olvides revisar los nuevos retos de la semana.' },
  { title: 'Actualización', content: 'Se han mejorado las funciones de la tienda. ¡Explora las novedades!' },
];

// Emojis disponibles
const emojis = [
  '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇',
  '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚',
  '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩',
  '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣',
  '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬',
  '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗',
  '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😯', '😦', '😧',
  '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢',
  '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '💪', '👈', '👉',
  '👆', '🖕', '👇', '☝️', '👋', '🤚', '🖐️', '✋', '🖖', '👌',
  '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆',
  '🖕', '👇', '☝️', '👍', '👎', '👊', '✊', '🤛', '🤜', '👏',
  '🙌', '👐', '🤲', '🤝', '🙏', '✍️', '💪', '🦾', '🦿', '🦵',
  '🦶', '👂', '🦻', '👃', '🧠', '🫀', '🫁', '🦷', '🦴', '👀',
  '👁️', '👅', '👄', '💋', '🩸', '❤️', '🧡', '💛', '💚', '💙',
  '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗',
  '💖', '💘', '💝', '💟', '🎵', '🎶', '💯', '💢', '💥', '💫',
  '💦', '💨', '🕳️', '💬', '🗨️', '🗯️', '💭', '💤', '🔥', '⚡',
  '💥', '💢', '💫', '💦', '💨', '🕳️', '💬', '🗨️', '🗯️', '💭',
  '💤', '🔥', '⚡', '💥', '💢', '💫', '💦', '💨', '🕳️', '💬'
];

// Mensajes predeterminados
const mensajesPredeterminados = [
  '¡Hola! 👋',
  '¿Cómo estás? 😊',
  '¡Perfecto! 👍',
  '¡Excelente trabajo! 🎉',
  '¡Vamos con todo! 💪',
  '¡Buena idea! 💡',
  '¡Gracias! 🙏',
  '¡Nos vemos! 👋',
  '¡Éxito en el reto! 🚀',
  '¡Suerte! 🍀',
  '¡Increíble! 🤩',
  '¡Wow! 😮',
  '¡Genial! 😎',
  '¡Felicidades! 🎊',
  '¡Bien hecho! 👏',
  '¡Lo siento! 😔',
  '¡No te preocupes! 😌',
  '¡Todo bien! 😊',
  '¡Claro que sí! ✅',
  '¡Por supuesto! 👍'
];

interface ChatModalProps {
  open: boolean;
  onClose: () => void;
  position?: 'left' | 'center';
}

const ChatModal: React.FC<ChatModalProps> = ({ open, onClose, position = 'center' }) => {
  const [tab, setTab] = useState<'global' | 'equipo' | 'usuario'>('global');
  const [selectedUser, setSelectedUser] = useState<number>(mockTeam.users[0].id);
  const [input, setInput] = useState('');
  const [groupInput, setGroupInput] = useState('');
  const [groupMessages, setGroupMessages] = useState(mockGroupMessagesInit);
  const [globalInput, setGlobalInput] = useState('');
  const [globalMessages, setGlobalMessages] = useState(mockGlobalMessagesInit);
  const [showMsgModal, setShowMsgModal] = useState(false);
  const [selectedMsg, setSelectedMsg] = useState(0);
  const [showEmojis, setShowEmojis] = useState(false);
  const [showQuickMessages, setShowQuickMessages] = useState(false);

  // Función para agregar emoji al input
  const addEmoji = (emoji: string) => {
    if (tab === 'global') {
      setGlobalInput(prev => prev + emoji);
    } else if (tab === 'equipo') {
      setGroupInput(prev => prev + emoji);
    } else {
      setInput(prev => prev + emoji);
    }
    setShowEmojis(false);
  };

  // Función para agregar mensaje predeterminado
  const addQuickMessage = (message: string) => {
    if (tab === 'global') {
      setGlobalInput(message);
    } else if (tab === 'equipo') {
      setGroupInput(message);
    } else {
      setInput(message);
    }
    setShowQuickMessages(false);
  };

  // Función para enviar mensaje
  const sendMessage = (text: string) => {
    const newMessage = {
      from: 'Yo',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    if (tab === 'global') {
      setGlobalMessages([...globalMessages, newMessage]);
      setGlobalInput('');
    } else if (tab === 'equipo') {
      setGroupMessages([...groupMessages, newMessage]);
      setGroupInput('');
    } else {
      mockMessages[selectedUser] = [...(mockMessages[selectedUser] || []), newMessage];
      setInput('');
    }
  };

  // Función para manejar envío con Enter
  const handleKeyDown = (e: React.KeyboardEvent, currentInput: string) => {
    if (e.key === 'Enter' && currentInput.trim()) {
      sendMessage(currentInput);
    }
  };

  if (!open) return null;

  return (
    <div
      className={
        position === 'left'
          ? 'fixed left-0 top-24 z-50 w-[480px] h-[calc(100vh-96px)] bg-white shadow-2xl flex flex-col animate-fade-in border border-gray-300 rounded-none rounded-r-2xl'
          : 'fixed top-[50px] left-0 z-50 w-4/5 h-[calc(100vh-200px)] bg-white rounded-r-2xl shadow-2xl flex flex-col animate-fade-in border border-gray-300'
      }
    >
      {/* Encabezado */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-tr-2xl">
        <span className="font-bold text-xl flex items-center gap-2">💬 Chat</span>
        <button onClick={onClose} className="text-gray-500 hover:text-red-600 text-2xl font-bold">×</button>
      </div>
      {/* Tabs */}
      <div className="flex flex-row gap-2 px-6 py-2 border-b border-gray-100 bg-white">
        <button
          className={`px-4 py-2 rounded-t-lg font-bold ${tab === 'global' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700'}`}
          onClick={() => setTab('global')}
        >
          GLOBAL
        </button>
        <button
          className={`px-4 py-2 rounded-t-lg font-bold ${tab === 'equipo' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700'}`}
          onClick={() => setTab('equipo')}
        >
          EQUIPO
        </button>
        <button
          className={`px-4 py-2 rounded-t-lg font-bold ${tab === 'usuario' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700'}`}
          onClick={() => setTab('usuario')}
        >
          USUARIO
        </button>
      </div>
      {/* Contenido */}
      <div className="flex-1 flex flex-row overflow-hidden">
        {/* Panel izquierdo */}
        <div className="w-1/3 bg-gray-50 border-r border-gray-200 flex flex-col items-center justify-start p-4">
          {tab === 'equipo' ? (
            <div className="flex flex-col items-center gap-2 w-full">
              <img src={mockTeam.avatar} alt="avatar" className="w-16 h-16 rounded-full border-2 border-black mb-2" />
              <span className="font-bold text-lg text-gray-800 text-center">{mockTeam.name}</span>
            </div>
          ) : tab === 'usuario' ? (
            <div className="flex flex-col gap-2 w-full">
              {mockTeam.users.map(u => (
                <button
                  key={u.id}
                  className={`flex items-center gap-2 px-2 py-2 rounded-lg w-full text-left transition ${selectedUser === u.id ? 'bg-black text-white' : 'hover:bg-gray-200'}`}
                  onClick={() => setSelectedUser(u.id)}
                >
                  <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full border border-black" />
                  <span className="font-semibold text-gray-800">{u.name}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 font-semibold text-lg w-full">Chat global (visual)</div>
          )}
        </div>
                 {/* Panel derecho: chat */}
         <div className="flex-1 flex flex-col justify-between p-2 bg-white min-h-0">
                                           {tab === 'global' ? (
              <div className="flex flex-col h-full min-h-0">
                <div className="flex-1 overflow-y-auto mb-2 flex flex-col gap-2 min-h-0">
                {globalMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.from === 'Yo' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`px-3 py-2 rounded-lg max-w-xs ${msg.from === 'Yo' ? 'bg-black text-white' : 'bg-gray-200 text-gray-800'}`}>
                      <span className="block text-xs font-semibold mb-1">{msg.from}</span>
                      <span>{msg.text}</span>
                      <span className="block text-[10px] text-gray-500 mt-1 text-right">{msg.time}</span>
                    </div>
                  </div>
                                 ))}
               </div>
               <div className="flex items-center gap-2 mt-auto relative flex-shrink-0">
                 <input
                   className="flex-1 px-4 py-2 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-black"
                   placeholder="Escribe mensaje"
                   value={globalInput}
                   onChange={e => setGlobalInput(e.target.value)}
                   onKeyDown={e => handleKeyDown(e, globalInput)}
                 />
                <button
                  className="px-3 py-2 rounded-lg bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 transition"
                  onClick={() => setShowEmojis(!showEmojis)}
                >
                  😀
                </button>
                <button
                  className="px-3 py-2 rounded-lg bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 transition"
                  onClick={() => setShowQuickMessages(!showQuickMessages)}
                >
                  💬
                </button>
                <button
                  className="px-6 py-2 rounded-lg bg-black text-white font-bold hover:bg-gray-800 transition"
                  onClick={() => sendMessage(globalInput)}
                  disabled={!globalInput.trim()}
                >
                  Enviar
                </button>
              </div>
            </div>
                                           ) : tab === 'equipo' ? (
              <div className="flex flex-col h-full min-h-0">
                <div className="flex-1 overflow-y-auto mb-2 flex flex-col gap-2 min-h-0">
                {groupMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.from === 'Yo' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`px-3 py-2 rounded-lg max-w-xs ${msg.from === 'Yo' ? 'bg-black text-white' : 'bg-gray-200 text-gray-800'}`}>
                      <span className="block text-xs font-semibold mb-1">{msg.from}</span>
                      <span>{msg.text}</span>
                      <span className="block text-[10px] text-gray-500 mt-1 text-right">{msg.time}</span>
                    </div>
                  </div>
                                 ))}
               </div>
               <div className="flex items-center gap-2 mt-auto relative flex-shrink-0">
                 <input
                   className="flex-1 px-4 py-2 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-black"
                   placeholder="Escribe mensaje"
                   value={groupInput}
                   onChange={e => setGroupInput(e.target.value)}
                   onKeyDown={e => handleKeyDown(e, groupInput)}
                 />
                <button
                  className="px-3 py-2 rounded-lg bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 transition"
                  onClick={() => setShowEmojis(!showEmojis)}
                >
                  😀
                </button>
                <button
                  className="px-3 py-2 rounded-lg bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 transition"
                  onClick={() => setShowQuickMessages(!showQuickMessages)}
                >
                  💬
                </button>
                <button
                  className="px-6 py-2 rounded-lg bg-black text-white font-bold hover:bg-gray-800 transition"
                  onClick={() => sendMessage(groupInput)}
                  disabled={!groupInput.trim()}
                >
                  Enviar
                </button>
              </div>
            </div>
                                           ) : (
              <div className="flex flex-col h-full min-h-0">
                <div className="flex-1 overflow-y-auto mb-2 flex flex-col gap-2 min-h-0">
                {(mockMessages[selectedUser] || []).map((msg: MessageType, idx: number) => (
                  <div key={idx} className={`flex ${msg.from === 'Yo' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`px-3 py-2 rounded-lg max-w-xs ${msg.from === 'Yo' ? 'bg-black text-white' : 'bg-gray-200 text-gray-800'}`}>
                      <span className="block text-xs font-semibold mb-1">{msg.from}</span>
                      <span>{msg.text}</span>
                      <span className="block text-[10px] text-gray-500 mt-1 text-right">{msg.time}</span>
                    </div>
                  </div>
                                 ))}
               </div>
               <div className="flex items-center gap-2 mt-auto relative flex-shrink-0">
                 <input
                   className="flex-1 px-4 py-2 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-black"
                   placeholder="Escribe mensaje"
                   value={input}
                   onChange={e => setInput(e.target.value)}
                   onKeyDown={e => handleKeyDown(e, input)}
                 />
                <button
                  className="px-3 py-2 rounded-lg bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 transition"
                  onClick={() => setShowEmojis(!showEmojis)}
                >
                  😀
                </button>
                <button
                  className="px-3 py-2 rounded-lg bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 transition"
                  onClick={() => setShowQuickMessages(!showQuickMessages)}
                >
                  💬
                </button>
                <button
                  className="px-6 py-2 rounded-lg bg-black text-white font-bold hover:bg-gray-800 transition"
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim()}
                >
                  Enviar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Emojis */}
      {showEmojis && (
        <div className="absolute bottom-24 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 w-80 h-64 overflow-y-auto z-10">
          <div className="grid grid-cols-8 gap-2">
            {emojis.map((emoji, index) => (
              <button
                key={index}
                className="w-8 h-8 text-lg hover:bg-gray-100 rounded flex items-center justify-center"
                onClick={() => addEmoji(emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Modal de Mensajes Rápidos */}
      {showQuickMessages && (
        <div className="absolute bottom-24 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 w-80 h-64 overflow-y-auto z-10">
          <h3 className="font-bold text-lg mb-3 text-gray-800">Mensajes Rápidos</h3>
          <div className="flex flex-col gap-2">
            {mensajesPredeterminados.map((message, index) => (
              <button
                key={index}
                className="text-left p-2 hover:bg-gray-100 rounded text-sm"
                onClick={() => addQuickMessage(message)}
              >
                {message}
              </button>
            ))}
          </div>
        </div>
      )}

      {showMsgModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-carbon-light rounded-xl shadow-2xl flex w-[500px] h-[300px] border-2 border-black animate-fade-in">
            {/* Sección izquierda: lista de títulos */}
            <div className="w-[120px] h-full border-r border-carbon-gray flex flex-col overflow-y-auto">
              {mensajes.map((msg, idx) => (
                <button
                  key={msg.title}
                  className={`w-full px-2 py-2 text-left font-gamer-body text-sm border-b border-carbon-gray hover:bg-black hover:text-white transition-colors ${selectedMsg === idx ? 'bg-black text-white' : 'bg-transparent text-carbon-dark'}`}
                  onClick={() => setSelectedMsg(idx)}
                >
                  {msg.title}
                </button>
              ))}
            </div>
            {/* Sección derecha: contenido del mensaje */}
            <div className="flex-1 h-full p-4 flex flex-col justify-between">
              <div className="font-gamer-body text-carbon-dark text-base mb-2">
                {mensajes[selectedMsg].content}
              </div>
              <button className="self-end mt-auto px-3 py-1 rounded bg-black text-white font-bold hover:bg-gray-800 transition-colors" onClick={() => setShowMsgModal(false)}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatModal; 