import React, { useEffect, useRef, useState } from 'react';
import socketService from '../services/socket';
// Importar emoji-picker-react
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

interface TeamMember {
  username: string;
  role: string;
  _id: string;
  avatar?: string;
  achievements?: string[];
}

interface TeamChatProps {
  teamName: string;
  username: string;
  members: TeamMember[];
}

interface ChatMessage {
  user: string;
  text: string;
  timestamp: number;
  avatar?: string;
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

function isSameDay(ts1: number, ts2: number) {
  const d1 = new Date(ts1);
  const d2 = new Date(ts2);
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
}

const STORAGE_KEY_PREFIX = 'team_chat_';

const TeamChat: React.FC<TeamChatProps> = ({ teamName, username, members }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + teamName);
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const userAvatar = members.find(m => m.username === username)?.avatar;

  useEffect(() => {
    if (!teamName) return;
    socketService.joinRoom(`team_${teamName}`);
    const handleMessage = (msg: ChatMessage) => {
      setMessages((prev) => {
        const updated = [...prev, msg];
        localStorage.setItem(STORAGE_KEY_PREFIX + teamName, JSON.stringify(updated));
        return updated;
      });
    };
    if (socketService.socketInstance) {
      socketService.socketInstance.on('team_message', handleMessage);
    }
    return () => {
      socketService.leaveRoom(`team_${teamName}`);
      if (socketService.socketInstance) {
        socketService.socketInstance.off('team_message', handleMessage);
      }
    };
  }, [teamName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (input.trim() && teamName) {
      const msg: ChatMessage = {
        user: username,
        text: input,
        timestamp: Date.now(),
        avatar: userAvatar,
      };
      socketService.socketInstance?.emit('team_message', {
        room: `team_${teamName}`,
        ...msg,
      });
      setMessages((prev) => {
        const updated = [...prev, msg];
        localStorage.setItem(STORAGE_KEY_PREFIX + teamName, JSON.stringify(updated));
        return updated;
      });
      setInput('');
    }
  };

  if (!teamName) return null;

  // Agrupar mensajes por día
  const grouped: { date: string; msgs: ChatMessage[] }[] = [];
  messages.forEach((msg, i) => {
    const dateStr = new Date(msg.timestamp).toLocaleDateString();
    if (i === 0 || !isSameDay(msg.timestamp, messages[i - 1].timestamp)) {
      grouped.push({ date: dateStr, msgs: [msg] });
    } else {
      grouped[grouped.length - 1].msgs.push(msg);
    }
  });

  return (
    <div className="bg-[#181a20] border-2 border-cyan-400 rounded-2xl shadow-2xl flex flex-col h-96 w-full max-w-lg mx-auto relative gamer-chat font-mono">
      {/* Cabecera gamer */}
      <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-cyan-900 via-indigo-900 to-purple-900 rounded-t-2xl shadow text-cyan-200 sticky top-0 z-10 border-b-2 border-cyan-400">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-700 flex items-center justify-center font-bold text-lg shadow-inner border-2 border-cyan-300 animate-glow">
          {getInitials(teamName)}
        </div>
        <div className="flex-1">
          <div className="font-bold text-base tracking-widest text-cyan-100 drop-shadow">{teamName}</div>
          <div className="text-xs text-cyan-400">Chat de equipo</div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {grouped.map((group, gidx) => (
          <React.Fragment key={gidx}>
            {/* Fecha separadora */}
            <div className="flex justify-center my-2">
              <span className="bg-cyan-900/80 text-cyan-200 text-xs px-3 py-1 rounded-full shadow animate-fade-in border border-cyan-400">{group.date}</span>
            </div>
            {group.msgs.map((msg, idx) => (
              <div key={idx} className={`flex items-end gap-2 ${msg.user === username ? 'justify-end' : 'justify-start'} animate-pop-in`} style={{ animationDelay: `${idx * 40}ms` }}>
                {/* Avatar o inicial */}
                {msg.user !== username && (
                  msg.avatar ? (
                    <img src={msg.avatar} alt={msg.user} className="w-8 h-8 rounded-full border-2 border-cyan-400 shadow animate-glow object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-700 to-purple-700 flex items-center justify-center text-white font-bold text-sm shadow border-2 border-cyan-400 animate-glow">
                      {getInitials(msg.user)}
                    </div>
                  )
                )}
                <div className={`rounded-2xl px-4 py-2 max-w-xs break-words shadow text-sm flex flex-col relative border-2 gamer-bubble ${msg.user === username ? 'bg-cyan-800/80 text-cyan-100 border-cyan-400 self-end' : 'bg-purple-900/80 text-purple-100 border-purple-400 self-start'}`}
                  style={{ borderBottomRightRadius: msg.user === username ? '0.5rem' : '1.5rem', borderBottomLeftRadius: msg.user === username ? '1.5rem' : '0.5rem' }}>
                  <span className="font-semibold text-xs mb-1 text-cyan-300 drop-shadow">{msg.user}</span>
                  <span>{msg.text}</span>
                  <span className="text-[10px] text-cyan-400 text-right mt-1 flex items-center gap-1">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    {msg.user === username && (
                      <svg className="w-4 h-4 inline ml-1 text-cyan-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    )}
                  </span>
                </div>
                {/* Avatar propio a la derecha */}
                {msg.user === username && (
                  msg.avatar ? (
                    <img src={msg.avatar} alt={msg.user} className="w-8 h-8 rounded-full border-2 border-cyan-400 shadow animate-glow object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-700 flex items-center justify-center text-white font-bold text-sm shadow border-2 border-cyan-400 animate-glow">
                      {getInitials(msg.user)}
                    </div>
                  )
                )}
              </div>
            ))}
          </React.Fragment>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {/* Input y emoji picker */}
      <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-r from-cyan-900 via-indigo-900 to-purple-900 border-t-2 border-cyan-400 flex gap-2 items-center rounded-b-2xl">
        <button
          onClick={() => setShowEmoji((prev) => !prev)}
          className="px-2 py-2 bg-cyan-700 hover:bg-cyan-800 text-white rounded-full font-bold shadow border-2 border-cyan-400 transition-all duration-200"
          title="Emojis"
        >
          <span role="img" aria-label="emoji">😃</span>
        </button>
        {showEmoji && (
          <div className="absolute bottom-16 left-4 z-50">
            <EmojiPicker onEmojiClick={(emojiData: EmojiClickData) => {
              setInput(input + emojiData.emoji);
              setShowEmoji(false);
            }} theme={"dark" as any} />
          </div>
        )}
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') sendMessage(); }}
          className="flex-1 px-4 py-2 rounded-full border border-cyan-400 bg-[#23272f] text-cyan-100 focus:outline-none focus:border-cyan-300 shadow gamer-input"
          placeholder="Escribe un mensaje o agrega un emoji..."
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-full font-bold shadow border-2 border-cyan-400 transition-all duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </button>
      </div>
      <style>{`
        .gamer-chat::-webkit-scrollbar { width: 6px; background: #181a20; }
        .gamer-chat::-webkit-scrollbar-thumb { background: #00fff7; border-radius: 3px; }
        @keyframes pop-in { 0% { transform: scale(0.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        .animate-pop-in { animation: pop-in 0.3s cubic-bezier(.4,2,.6,1); }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.7s ease; }
        .animate-glow { box-shadow: 0 0 8px #00fff7, 0 0 16px #00fff7; }
        .gamer-bubble { box-shadow: 0 0 8px #00fff733, 0 0 16px #7f00ff33; }
        .gamer-input { font-family: 'Fira Mono', 'Consolas', 'monospace'; }
      `}</style>
    </div>
  );
};

export default TeamChat; 