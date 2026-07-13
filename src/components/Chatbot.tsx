import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

const botResponses: Record<string, string> = {
  hello: "Hey there. I'm Hadi's portfolio assistant. Ask me about his skills, projects, education, or certifications.",
  hi: "Hello! Welcome to Hadi's portfolio. What would you like to know about him?",
  hey: "Hey! I can tell you about Hadi's skills, projects, education, or certifications. What interests you?",
  name: "His full name is Hadi Abdulla. He goes by 'Matrified' on GitHub.",
  education: "Hadi is currently pursuing a BSc in Computer Science (Hons) with Software Engineering at MMU Cyberjaya, Malaysia, with a 3.80 CGPA.",
  university: "Hadi studies at Multimedia University (MMU) in Cyberjaya, Malaysia.",
  mmu: "MMU Cyberjaya is where Hadi is pursuing his Computer Science degree.",
  cgpa: "Hadi holds a 3.80 CGPA in his BSc Computer Science (Hons) program.",
  skills: "Hadi's core languages are Python, Java, C++, and TypeScript. On the frameworks side he's worked with React, Next.js, Flask, and FastAPI, plus PostgreSQL, Redis, and Docker. Check the Skills section for the full breakdown.",
  python: "Python is one of Hadi's strongest languages. He used it to build both Voidfall's engine and RouteWise's optimization backend.",
  java: "Hadi is proficient in Java, used for object-oriented programming coursework and projects.",
  'c++': "C++ is in Hadi's toolkit, useful for systems programming.",
  projects: "Hadi has three main projects: Voidfall, a natural-language RPG engine with a deterministic Python core; RouteWise, a multi-stop route optimizer using Google OR-Tools and OSRM; and PrepAI, an AI-driven mock interview platform. Check the Projects section for details.",
  voidfall: "Voidfall is a natural-language RPG engine. A deterministic Python engine holds sole authority over game state, and an LLM is only used to narrate outcomes, so it can never invent items or break world rules.",
  routewise: "RouteWise is a full-stack route optimizer for the Klang Valley, built with Flask, Google OR-Tools, and OSRM. It solves the real vehicle routing problem using actual road data.",
  prepai: "PrepAI is an AI-driven mock interview platform built with Next.js and the Gemini API. It generates technical interview questions tailored to topic and difficulty.",
  github: "You can find Hadi on GitHub at github.com/Matrified.",
  certifications: "Hadi has completed software engineering job simulations with HPE, JPMorgan Chase & Co., and Walmart via Forage, plus Google AI Essentials and GitHub Foundations. See the Certifications section.",
  certificate: "Check the Certifications section for Hadi's job simulations and course completions.",
  internship: "Hadi is looking for a software engineering internship for his upcoming internship semester.",
  hire: "Hadi is actively looking for internship opportunities. Reach out through the Contact section.",
  contact: "You can reach Hadi through the Contact section below, or find him on GitHub at github.com/Matrified.",
  thanks: "You're welcome. Feel free to ask more questions or explore the portfolio.",
  thank: "You're welcome. Explore the portfolio for more about Hadi.",
  bye: "Goodbye. Thanks for visiting Hadi's portfolio.",
  website: "This portfolio was built with React, TypeScript, Tailwind CSS, and Framer Motion.",
  portfolio: "You're looking at it. This portfolio showcases Hadi's skills, projects, and journey.",
};

const quickQuestions = [
  "Who is Hadi?",
  "What are his skills?",
  "Tell me about his projects",
  "What certifications does he have?",
  "Is he available for internships?",
];

function getBotResponse(input: string): string {
  const lower = input.toLowerCase().trim();

  for (const [key, response] of Object.entries(botResponses)) {
    if (lower.includes(key)) {
      return response;
    }
  }

  if (lower.match(/^(sup|yo|wassup|what'?s up)/)) {
    return "Hey! Welcome to Hadi's portfolio. What would you like to know?";
  }

  if (lower.includes('help') || lower.includes('what can')) {
    return "I can tell you about Hadi's:\n- Education\n- Technical skills\n- Projects\n- Certifications\n- Internship availability\n\nJust ask away.";
  }

  if (lower.includes('who')) {
    return "Hadi Abdulla is a Computer Science student at MMU Cyberjaya, Malaysia, specializing in Software Engineering. He builds full-stack projects and is looking for a software engineering internship.";
  }

  if (lower.includes('where')) {
    return "Hadi is based in Cyberjaya, Malaysia, studying at MMU.";
  }

  return "I'm not sure about that one. Try asking about Hadi's skills, projects, education, or certifications. Or type 'help' to see what I can answer.";
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: "Hey! I'm Hadi's portfolio assistant. Ask me anything about Hadi — his skills, projects, education, or certifications.",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMsg: Message = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      const botMsg: Message = {
        id: Date.now() + 1,
        text: getBotResponse(messageText),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  return (
    <>
      {/* Chat button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: 'spring' }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all ${
          isOpen
            ? 'bg-red-500 hover:bg-red-600 rotate-0'
            : 'bg-matrix hover:bg-matrix-dim animate-pulse-glow'
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-dark-bg" />
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[70vh] bg-dark-card border border-dark-border rounded-2xl shadow-2xl shadow-black/50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-dark-surface border-b border-dark-border flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-matrix/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-matrix" />
              </div>
              <div>
                <div className="font-display font-semibold text-white text-sm">Hadi's Bot</div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-matrix animate-pulse" />
                  <span className="text-xs text-gray-500">Online</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-7 h-7 rounded-full bg-matrix/10 flex items-center justify-center shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-matrix" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm whitespace-pre-line leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-matrix text-dark-bg rounded-br-md'
                        : 'bg-dark-surface text-gray-300 border border-dark-border rounded-bl-md'
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.sender === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-cyber-cyan/10 flex items-center justify-center shrink-0 mt-1">
                      <User className="w-4 h-4 text-cyber-cyan" />
                    </div>
                  )}
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick questions */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2">
                <div className="flex flex-wrap gap-1.5">
                  {quickQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="px-3 py-1.5 rounded-full bg-dark-surface border border-dark-border text-xs text-gray-400 hover:text-matrix hover:border-matrix/30 transition-all"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-3 bg-dark-surface border-t border-dark-border">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask about Hadi..."
                  className="flex-1 bg-dark-card border border-dark-border rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-matrix/50 transition-colors"
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim()}
                  className="w-10 h-10 rounded-xl bg-matrix disabled:bg-gray-700 flex items-center justify-center hover:bg-matrix-dim transition-colors disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4 text-dark-bg" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
