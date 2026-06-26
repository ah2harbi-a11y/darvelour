import { Send, Sparkles, Heart, ShoppingBag, Star, RotateCcw } from 'lucide-react';
import { Page } from '../../App';
import { useState, useRef, useEffect } from 'react';
import { allDresses, Dress } from '../../data/dresses';
import { getDressImage } from '../../data/dressImages';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import MobileHeader from './MobileHeader';
import MobileNav from './MobileNav';

interface MobileAIStylistProps {
  onNavigate: (page: Page, dressId?: number) => void;
  onGoBack: () => void;
  wishlistItems: number;
  onAddToCart: (dressId: number) => void;
  onAddToWishlist: (dressId: number) => void;
}

interface Message {
  role: 'assistant' | 'user';
  content: string;
  dresses?: Dress[];
  quickReplies?: string[];
}

const occasions = ['Wedding', 'Engagement', 'Gala', 'Eid', 'Formal Dinner', 'Cocktail'];
const budgets = ['Under SAR 3,000', 'SAR 3,000-5,000', 'SAR 5,000-7,000', 'Above SAR 7,000'];
const styles = ['Elegant & Classic', 'Modern & Bold', 'Modest & Refined', 'Glamorous'];

function getRecommendations(userMessages: string[]): Dress[] {
  const text = userMessages.join(' ').toLowerCase();
  let filtered = [...allDresses];

  if (text.includes('under') && text.includes('3,000')) {
    filtered = filtered.filter(d => d.price < 3000);
  } else if (text.includes('3,000') && text.includes('5,000')) {
    filtered = filtered.filter(d => d.price >= 3000 && d.price <= 5000);
  } else if (text.includes('5,000') && text.includes('7,000')) {
    filtered = filtered.filter(d => d.price >= 5000 && d.price <= 7000);
  } else if (text.includes('above') && text.includes('7,000')) {
    filtered = filtered.filter(d => d.price > 7000);
  }

  if (text.includes('evening') || text.includes('gala') || text.includes('formal')) {
    filtered = filtered.filter(d => d.collection === 'Evening Collection' || d.name.toLowerCase().includes('evening') || d.name.toLowerCase().includes('gown'));
  }
  if (text.includes('new') || text.includes('latest') || text.includes('modern')) {
    const newArrivals = filtered.filter(d => d.collection === 'New Arrivals');
    if (newArrivals.length > 0) filtered = newArrivals;
  }

  filtered.sort((a, b) => b.rating - a.rating);
  return filtered.slice(0, 4);
}

function generateResponse(userMsg: string, allUserMessages: string[]): Message {
  const lower = userMsg.toLowerCase();

  if (occasions.some(o => lower.includes(o.toLowerCase()))) {
    const occasion = occasions.find(o => lower.includes(o.toLowerCase()));
    return {
      role: 'assistant',
      content: `A ${occasion} — lovely! What's your budget range?`,
      quickReplies: budgets,
    };
  }

  if (lower.includes('sar') || lower.includes('under') || lower.includes('above') || lower.includes('budget')) {
    return {
      role: 'assistant',
      content: `Got it! What style do you prefer?`,
      quickReplies: styles,
    };
  }

  if (styles.some(s => lower.includes(s.split(' ')[0].toLowerCase())) || allUserMessages.length >= 3) {
    const dresses = getRecommendations(allUserMessages);
    return {
      role: 'assistant',
      content: `Here are my top picks for you:`,
      dresses,
    };
  }

  if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey')) {
    return {
      role: 'assistant',
      content: `Hello! I'd love to help you find the perfect dress. What occasion are you shopping for?`,
      quickReplies: occasions,
    };
  }

  if (lower.includes('show') || lower.includes('recommend') || lower.includes('suggest') || lower.includes('find')) {
    const dresses = getRecommendations(allUserMessages);
    return {
      role: 'assistant',
      content: `Here are some pieces I think you'll love:`,
      dresses,
    };
  }

  return {
    role: 'assistant',
    content: `Tell me about your occasion and I'll find the perfect dress!`,
    quickReplies: occasions,
  };
}

export default function MobileAIStylist({ onNavigate, onGoBack, wishlistItems, onAddToCart, onAddToWishlist }: MobileAIStylistProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm your AI stylist. What occasion are you dressing for?",
      quickReplies: occasions,
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (text?: string) => {
    const msg = text || message.trim();
    if (!msg) return;

    const userMessage: Message = { role: 'user', content: msg };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setMessage('');
    setIsTyping(true);

    const allUserMessages = updatedMessages.filter(m => m.role === 'user').map(m => m.content);

    setTimeout(() => {
      const response = generateResponse(msg, allUserMessages);
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 600 + Math.random() * 500);
  };

  const handleReset = () => {
    setMessages([
      {
        role: 'assistant',
        content: "Fresh start! What occasion are you shopping for?",
        quickReplies: occasions,
      },
    ]);
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      <MobileHeader
        title=""
        showBack={true}
        showCart={false}
        onNavigate={onNavigate}
        onBack={onGoBack}
      />

      {/* Custom Header */}
      <div className="px-4 py-3 bg-white border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-black rounded-full flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-black">AI Stylist</p>
            <p className="text-[10px] text-green-600 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block"></span>
              Online
            </p>
          </div>
        </div>
        <button
          onClick={handleReset}
          className="p-2 text-gray-400 hover:text-black"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto px-4 py-4 pb-36 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx}>
            <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%]`}>
                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                      <Sparkles className="w-2.5 h-2.5 text-white" />
                    </div>
                    <span className="text-[10px] text-gray-400">AI Stylist</span>
                  </div>
                )}
                <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-black text-white rounded-br-sm'
                    : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                }`}>
                  {msg.content}
                </div>

                {/* Dress Cards */}
                {msg.dresses && msg.dresses.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {msg.dresses.map((dress) => (
                      <div
                        key={dress.id}
                        className="bg-white border border-gray-200 rounded-xl overflow-hidden"
                        onClick={() => onNavigate('dress-detail', dress.id)}
                      >
                        <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                          <ImageWithFallback
                            src={getDressImage(dress.id)}
                            alt={dress.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-1.5 left-1.5 flex items-center gap-0.5 bg-white/90 backdrop-blur px-1.5 py-0.5 rounded-full">
                            <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                            <span className="text-[9px] font-medium">{dress.rating}</span>
                          </div>
                        </div>
                        <div className="p-2">
                          <p className="text-[9px] text-gray-400">{dress.boutique}</p>
                          <p className="text-[11px] font-medium text-black truncate">{dress.name}</p>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-[11px] font-medium">SAR {dress.price.toLocaleString()}</p>
                            <div className="flex gap-1">
                              <button
                                className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center"
                                onClick={(e) => { e.stopPropagation(); onAddToWishlist(dress.id); }}
                              >
                                <Heart className="w-3 h-3 text-gray-500" />
                              </button>
                              <button
                                className="w-6 h-6 bg-black rounded-full flex items-center justify-center"
                                onClick={(e) => { e.stopPropagation(); onAddToCart(dress.id); }}
                              >
                                <ShoppingBag className="w-3 h-3 text-white" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Quick Replies */}
                {msg.quickReplies && idx === messages.length - 1 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {msg.quickReplies.map((reply) => (
                      <button
                        key={reply}
                        onClick={() => handleSend(reply)}
                        className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-[11px] text-gray-700 hover:bg-black hover:text-white hover:border-black transition-colors"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                <Sparkles className="w-2.5 h-2.5 text-white" />
              </div>
              <div className="bg-gray-100 px-3.5 py-2.5 rounded-2xl rounded-bl-sm">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </main>

      {/* Input */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about occasion, style, budget..."
            className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
            disabled={isTyping}
          />
          <button
            onClick={() => handleSend()}
            disabled={isTyping || !message.trim()}
            className="w-10 h-10 bg-black rounded-full flex items-center justify-center flex-shrink-0 disabled:opacity-30"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      <MobileNav currentPage="search" onNavigate={onNavigate} wishlistItems={wishlistItems} />
    </div>
  );
}
