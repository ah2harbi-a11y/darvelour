import { Send, Sparkles, Heart, ShoppingBag, Star, RotateCcw, Crown, Gem, PartyPopper } from 'lucide-react';
import { Page } from '../../App';
import { useState, useRef, useEffect } from 'react';
import { allDresses, Dress } from '../../data/dresses';
import { getDressImage } from '../../data/dressImages';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface DesktopAIStylistProps {
  onNavigate: (page: Page, id?: number) => void;
  onAddToCart: (dressId: number) => void;
  onAddToWishlist: (dressId: number) => void;
}

interface Message {
  role: 'assistant' | 'user';
  content: string;
  dresses?: Dress[];
  quickReplies?: { label: string; icon?: string }[];
}

const occasions = [
  { label: 'Wedding', icon: '💍' },
  { label: 'Engagement', icon: '💐' },
  { label: 'Gala', icon: '✨' },
  { label: 'Eid Celebration', icon: '🌙' },
  { label: 'Formal Dinner', icon: '🍽️' },
  { label: 'Cocktail Party', icon: '🥂' },
];
const budgets = [
  { label: 'Under SAR 3,000', icon: '' },
  { label: 'SAR 3,000 - 5,000', icon: '' },
  { label: 'SAR 5,000 - 7,000', icon: '' },
  { label: 'Above SAR 7,000', icon: '' },
];
const styles = [
  { label: 'Elegant & Classic', icon: '👗' },
  { label: 'Modern & Bold', icon: '🔥' },
  { label: 'Modest & Refined', icon: '🌿' },
  { label: 'Glamorous & Statement', icon: '💎' },
];

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

  if (occasions.some(o => lower.includes(o.label.toLowerCase()))) {
    const occasion = occasions.find(o => lower.includes(o.label.toLowerCase()));
    return {
      role: 'assistant',
      content: `A ${occasion?.label} — how exciting! I have some stunning pieces in mind already. To narrow it down, what's your budget range for this occasion?`,
      quickReplies: budgets,
    };
  }

  if (lower.includes('sar') || lower.includes('under') || lower.includes('above') || lower.includes('budget')) {
    return {
      role: 'assistant',
      content: `Perfect. One last thing — what style resonates with you? This helps me match dresses to your personal aesthetic.`,
      quickReplies: styles,
    };
  }

  if (styles.some(s => lower.includes(s.label.split(' ')[0].toLowerCase())) || allUserMessages.length >= 3) {
    const dresses = getRecommendations(allUserMessages);
    return {
      role: 'assistant',
      content: `I've curated these pieces specifically for you. Each one has been selected based on your occasion, budget, and style preferences. Tap any dress to see full details.`,
      dresses,
    };
  }

  if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey')) {
    return {
      role: 'assistant',
      content: `Welcome to Darvelour! I'm your personal AI stylist. I'll help you find a dress that makes you feel extraordinary. Let's start — what's the occasion?`,
      quickReplies: occasions,
    };
  }

  if (lower.includes('show') || lower.includes('recommend') || lower.includes('suggest') || lower.includes('find')) {
    const dresses = getRecommendations(allUserMessages);
    return {
      role: 'assistant',
      content: `Here are some exceptional pieces I think you'll love:`,
      dresses,
    };
  }

  return {
    role: 'assistant',
    content: `I'd love to help you find the perfect dress. What occasion are you preparing for?`,
    quickReplies: occasions,
  };
}

const trendingDresses = allDresses.filter(d => d.rating >= 4.6).slice(0, 3);

export default function DesktopAIStylist({ onNavigate, onAddToCart, onAddToWishlist }: DesktopAIStylistProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Welcome to your personal styling session. I'll help you discover the perfect dress for your next occasion. What event are you preparing for?",
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
    }, 800 + Math.random() * 600);
  };

  const handleReset = () => {
    setMessages([
      {
        role: 'assistant',
        content: "Let's start fresh! What occasion are you shopping for?",
        quickReplies: occasions,
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-[#fafaf9]">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-medium text-black">AI Personal Stylist</h1>
              <p className="text-sm text-gray-400">Powered by Darvelour's fashion intelligence</p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 hover:text-black border border-gray-200 rounded-xl hover:border-gray-400 transition-all hover:shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            New Session
          </button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 py-6">
        <div className="flex gap-6" style={{ height: 'calc(100vh - 180px)' }}>

          {/* Chat Panel */}
          <div className="flex-[3] min-w-0 bg-white border border-gray-200 rounded-2xl flex flex-col overflow-hidden shadow-sm">
            {/* Chat Header */}
            <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-black">Darvelour Stylist</h2>
                <p className="text-[11px] text-green-600">Active now</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 bg-gradient-to-b from-gray-50/50 to-white">
              {messages.map((msg, idx) => (
                <div key={idx}>
                  <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`${msg.role === 'user' ? 'max-w-md' : 'max-w-xl'}`}>
                      {msg.role === 'assistant' && (
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-7 h-7 bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg flex items-center justify-center">
                            <Sparkles className="w-3.5 h-3.5 text-white" />
                          </div>
                          <span className="text-[11px] text-gray-400 font-medium">AI Stylist</span>
                        </div>
                      )}
                      <div className={`px-5 py-3.5 text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-black text-white rounded-2xl rounded-br-lg shadow-md'
                          : 'bg-white text-gray-700 rounded-2xl rounded-tl-lg border border-gray-200 shadow-sm'
                      }`}>
                        {msg.content}
                      </div>

                      {/* Dress Recommendations */}
                      {msg.dresses && msg.dresses.length > 0 && (
                        <div className="grid grid-cols-2 gap-3 mt-4">
                          {msg.dresses.map((dress) => (
                            <div
                              key={dress.id}
                              className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all cursor-pointer group hover:border-gray-300"
                              onClick={() => onNavigate('dress-detail', dress.id)}
                            >
                              <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                                <ImageWithFallback
                                  src={getDressImage(dress.id)}
                                  alt={dress.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0">
                                  <button
                                    className="w-8 h-8 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-black hover:text-white transition-colors"
                                    onClick={(e) => { e.stopPropagation(); onAddToWishlist(dress.id); }}
                                  >
                                    <Heart className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    className="w-8 h-8 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-black hover:text-white transition-colors"
                                    onClick={(e) => { e.stopPropagation(); onAddToCart(dress.id); }}
                                  >
                                    <ShoppingBag className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                                <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm">
                                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                  <span className="text-[10px] font-semibold">{dress.rating}</span>
                                </div>
                                {dress.express && (
                                  <div className="absolute top-2.5 left-2.5 bg-black text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                                    EXPRESS
                                  </div>
                                )}
                              </div>
                              <div className="p-3.5">
                                <p className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">{dress.boutique}</p>
                                <p className="text-sm font-medium text-black truncate mt-0.5">{dress.name}</p>
                                <p className="text-sm font-semibold text-black mt-1.5">SAR {dress.price.toLocaleString()}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Quick Replies */}
                      {msg.quickReplies && idx === messages.length - 1 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {msg.quickReplies.map((reply) => (
                            <button
                              key={reply.label}
                              onClick={() => handleSend(reply.label)}
                              className="px-4 py-2 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700 hover:bg-black hover:text-white hover:border-black transition-all shadow-sm hover:shadow-md flex items-center gap-1.5 whitespace-nowrap"
                            >
                              {reply.icon && <span>{reply.icon}</span>}
                              {reply.label}
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
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="bg-white px-5 py-3.5 rounded-2xl rounded-tl-lg border border-gray-200 shadow-sm">
                      <div className="flex gap-1.5">
                        <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="px-6 py-4 border-t border-gray-100 bg-white">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Tell me about your occasion, budget, or style..."
                  className="flex-1 px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-300 transition-all"
                  disabled={isTyping}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={isTyping || !message.trim()}
                  className="w-12 h-12 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-20 flex items-center justify-center shadow-md hover:shadow-lg"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="flex-[2] min-w-0 flex flex-col gap-5 overflow-y-auto">
            {/* Trending Now — with dress images */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="px-6 pt-5 pb-3">
                <h3 className="text-sm font-semibold text-black flex items-center gap-2">
                  <Gem className="w-4 h-4 text-gray-400" />
                  Trending This Week
                </h3>
              </div>
              <div className="px-4 pb-4">
                {trendingDresses.map((dress, i) => (
                  <button
                    key={dress.id}
                    onClick={() => onNavigate('dress-detail', dress.id)}
                    className={`w-full flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-gray-50 transition-colors text-left ${i < trendingDresses.length - 1 ? '' : ''}`}
                  >
                    <div className="w-16 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                      <ImageWithFallback
                        src={getDressImage(dress.id)}
                        alt={dress.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">{dress.boutique}</p>
                      <p className="text-sm font-medium text-black truncate mt-0.5">{dress.name}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <p className="text-sm font-semibold text-black">SAR {dress.price.toLocaleString()}</p>
                        <div className="flex items-center gap-0.5 bg-yellow-50 px-1.5 py-0.5 rounded-full">
                          <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                          <span className="text-[10px] font-semibold text-yellow-700">{dress.rating}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* How It Works */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-black mb-5 flex items-center gap-2">
                <PartyPopper className="w-4 h-4 text-gray-400" />
                How It Works
              </h3>
              <div className="space-y-5">
                {[
                  { step: '1', title: 'Share your occasion', desc: 'Wedding, gala, Eid, or any special event', color: 'from-gray-900 to-gray-700' },
                  { step: '2', title: 'Set your preferences', desc: 'Budget range and personal style aesthetic', color: 'from-gray-800 to-gray-600' },
                  { step: '3', title: 'Get curated picks', desc: 'Handpicked dresses matched to your needs', color: 'from-gray-700 to-gray-500' },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 items-start">
                    <div className={`w-9 h-9 bg-gradient-to-br ${item.color} text-white rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 shadow-md`}>
                      {item.step}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-black">{item.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Prompts */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-black mb-4 flex items-center gap-2">
                <Send className="w-4 h-4 text-gray-400" />
                Try Asking
              </h3>
              <div className="space-y-2">
                {[
                  { text: 'Find me a dress for a wedding under SAR 5,000', emoji: '💍' },
                  { text: 'I need an elegant gown for a gala event', emoji: '✨' },
                  { text: 'Show me modern dresses for Eid', emoji: '🌙' },
                  { text: 'Recommend something for a formal dinner', emoji: '🍽️' },
                ].map((prompt) => (
                  <button
                    key={prompt.text}
                    onClick={() => handleSend(prompt.text)}
                    className="w-full text-left px-4 py-3 text-xs text-gray-600 bg-gray-50 rounded-xl hover:bg-gray-900 hover:text-white transition-all group flex items-center gap-2.5"
                  >
                    <span className="text-sm group-hover:scale-110 transition-transform">{prompt.emoji}</span>
                    <span className="leading-relaxed">"{prompt.text}"</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Exclusivity CTA */}
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white rounded-2xl p-6 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
              <div className="relative">
                <Crown className="w-6 h-6 mb-3 text-yellow-400" />
                <p className="text-base font-semibold mb-1">Exclusivity Service</p>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">
                  Guarantee no one else wears your dress at the same event. Available on all {allDresses.length}+ pieces.
                </p>
                <button
                  onClick={() => onNavigate('exclusivity')}
                  className="px-5 py-2.5 bg-white text-black rounded-xl text-xs font-semibold hover:bg-gray-100 transition-colors shadow-md"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
