"use client";

import React, { useState, useRef, useEffect } from 'react';
import { projectsData } from '@/app/catalog/data';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SYSTEM_PROMPT = `You are AlMajid Estate's AI assistant. Help customers with construction costs (smeta), project details, materials, and technical information. Use the available project data to answer questions accurately. Be concise and helpful in Azerbaijani language primarily.`;

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Salam! Mən AlMajid Estate AI köməkçisiyəm. Layihə haqqında sualınız varsa soruşa bilərsiz.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getProjectInfo = (query: string) => {
    const lowerQuery = query.toLowerCase();
    const project = projectsData.find(p => 
      String(p.id).includes(lowerQuery) || 
      (typeof p.name === 'string' ? p.name.toLowerCase().includes(lowerQuery) : Object.values(p.name).some(n => n.toLowerCase().includes(lowerQuery)))
    );
    if (project) {
      const projectName = typeof project.name === 'string' ? project.name : (project.name.AZ || project.name.EN || '');
      const projectDesc = typeof project.description === 'string' ? project.description : (project.description.AZ || project.description.EN || '');
      return `${projectName} layihəsi: ${project.areaSqm} m², ${project.floors} mərtəbə, ${project.bedrooms} yataq otağı. ${projectDesc}`;
    }
    return null;
  };

  const getSmetaInfo = (query: string) => {
    const match = query.match(/(\d+)\s*m²/);
    if (match) {
      const area = parseInt(match[1]);
      const baseCost = area * 850; // USD per m² estimate
      return `${area} m² layihə üçün ənənəvi smeta: $${baseCost.toLocaleString()} USD (${(baseCost * 1.7).toLocaleString()} ₼). Standart paket: ×1.25, Premium paket: ×1.40`;
    }
    return null;
  };

  const generateResponse = async (userMessage: string) => {
    setIsTyping(true);
    
    let response = '';
    const projectInfo = getProjectInfo(userMessage);
    const smetaInfo = getSmetaInfo(userMessage);
    
    if (projectInfo) {
      response = projectInfo;
    } else if (smetaInfo) {
      response = smetaInfo;
    } else if (userMessage.toLowerCase().includes('giriş') || userMessage.toLowerCase().includes('salam')) {
      response = 'AlMajid Estate peşəkar memarlıq və tikinti xidmətləri göstərir. Lüks villa, ailə evləri və kommersiya layihələri üçün smeta və deserklər mövcuddur.';
    } else if (userMessage.toLowerCase().includes('paket') || userMessage.toLowerCase().includes('qiymət')) {
      response = 'Paketlər: Ekonom (×1.15), Standart (×1.25), Premium (×1.40). Hər paket üçün eyni əsas smeta hesablanır və əmsal tətbiq olunur.';
    } else {
      response = 'Bağışlayın, sualınızı anladımam. Digər bir sual verin və ya layihə siyahısına baxın.';
    }
    
    // Simulate streaming
    const words = response.split(' ');
    let streamed = '';
    for (let i = 0; i < words.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 50));
      streamed += (i === 0 ? '' : ' ') + words[i];
      setMessages(prev => [...prev.slice(0, -1), { role: 'assistant', content: streamed }]);
    }
    
    setIsTyping(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
    
    generateResponse(userMessage);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-amber-500 hover:bg-amber-600 text-black p-4 rounded-full shadow-lg transition-all duration-300"
        aria-label="Chat with AI Assistant"
      >
        💬
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 h-96 bg-[#1C232B] border border-slate-800 rounded-2xl shadow-2xl flex flex-col">
      <div className="flex justify-between items-center p-4 border-b border-slate-800">
        <h3 className="font-semibold text-white">AI Köməkçi</h3>
        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">✕</button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => (
          <div key={idx} className={`text-sm ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded-lg max-w-[80%] ${
              msg.role === 'user' ? 'bg-amber-500/20 text-white ml-auto' : 'bg-slate-900/50 text-gray-300'
            }`}>
              {msg.content}{msg.role === 'assistant' && msg.content === '' && isTyping ? '...' : ''}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-3 border-t border-slate-800">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Sualınızı yazın..."
          className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500"
          disabled={isTyping}
        />
      </form>
    </div>
  );
}