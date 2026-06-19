import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { MessageSquare, Send, X, Bot, User, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { createChat } from '../lib/gemini';
import { ChatMessage, cn } from '../lib/utils';
import Markdown from 'react-markdown';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId] = useState(() => Math.random().toString(36).substring(7));
  const [chat, setChat] = useState<any>(null);

  useEffect(() => {
    if (!isOpen) return;

    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      setError("Chat is not configured yet.");
      return;
    }

    if (!chat) {
       setChat(createChat());
    }
  }, [isOpen, chat]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || loading || !chat) return;

    const userMsg = message.trim();
    setMessage('');
    setLoading(true);
    setError(null);
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: userMsg,
      timestamp: Date.now(),
      sessionId,
    };
    setMessages((current) => [...current, userMessage]);

    try {
      await addDoc(collection(db, 'chats'), {
        role: 'user',
        content: userMsg,
        timestamp: serverTimestamp(),
        sessionId
      });

      const response = await chat.sendMessage({ message: userMsg });
      const aiContent = response.text || "I'm sorry, I couldn't process that.";
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: aiContent,
        timestamp: Date.now(),
        sessionId,
      };
      setMessages((current) => [...current, assistantMessage]);

      await addDoc(collection(db, 'chats'), {
        role: 'assistant',
        content: aiContent,
        timestamp: serverTimestamp(),
        sessionId
      });
    } catch (error) {
      setError("Message could not be sent. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="glass-card mb-4 w-[350px] sm:w-[400px] h-[500px] flex flex-col overflow-hidden border-gold/20"
          >
            {/* Header */}
            <div className="bg-anubis-cyan p-4 flex justify-between items-center text-anubis-dark font-display font-black uppercase tracking-[0.2em] shadow-lg shadow-anubis-cyan/20">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                <span>Navigator</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth bg-anubis-dark/95">
              {messages.length === 0 && !loading && (
                <div className="text-center text-slate-500 mt-10 space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest">W.M. Support Protocol [ONLINE]</p>
                  <p className="text-[9px] italic opacity-60">Ready for data transmission</p>
                </div>
              )}
              {error && (
                <div className="border border-red-500/30 bg-red-500/10 p-3 text-center text-[10px] font-bold uppercase tracking-widest text-red-100">
                  {error}
                </div>
              )}
              {messages.map((msg, i) => (
                <div
                  key={msg.id || i}
                  className={cn(
                    "flex gap-2 max-w-[85%]",
                    msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 flex items-center justify-center shrink-0 shadow-sm transition-transform hover:scale-110",
                    msg.role === 'user' ? "bg-anubis-gold text-anubis-dark" : "bg-anubis-teal text-anubis-cyan"
                  )}>
                    {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className={cn(
                    "p-3 text-[11px] leading-relaxed tracking-wider",
                    msg.role === 'user' 
                      ? "bg-anubis-gold/10 text-white border-r-2 border-anubis-gold" 
                      : "bg-anubis-teal/30 text-slate-300 border-l-2 border-anubis-cyan"
                  )}>
                    <Markdown>{msg.content}</Markdown>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-2 animate-pulse">
                  <div className="w-8 h-8 bg-white/5 shrink-0 flex items-center justify-center">
                    <Loader2 className="w-4 h-4 animate-spin text-anubis-cyan" />
                  </div>
                  <div className="bg-white/5 p-3 h-10 w-24"></div>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 border-t border-white/10 flex gap-2 bg-anubis-dark">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="INPUT DATA..."
                className="flex-1 bg-white/5 border border-white/10 px-4 py-2 text-[10px] font-mono focus:outline-none focus:border-anubis-cyan/50 text-white placeholder:text-slate-600"
              />
              <button
                type="submit"
                disabled={!message.trim() || loading}
                className="bg-anubis-cyan text-anubis-dark p-2 disabled:opacity-50 hover:bg-anubis-gold transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1, rotate: -5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-anubis-cyan shadow-anubis-cyan/30 shadow-2xl text-anubis-dark px-8 py-3 flex items-center gap-4 font-black text-[10px] uppercase tracking-[0.3em]"
        style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }}
      >
        <div className="w-2 h-2 bg-anubis-cyan rounded-full animate-pulse shadow-[0_0_8px_rgba(0,242,254,0.6)]"></div>
        Live Terminal
      </motion.button>
    </div>
  );
}
