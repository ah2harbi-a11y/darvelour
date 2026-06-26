export default function AIStylistChat() {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Header */}
      <div className="px-4 py-4 border-b border-neutral-200 flex items-center justify-between">
        <button className="w-8 h-8 border border-neutral-800 rounded-full flex items-center justify-center">←</button>
        <div className="font-bold">AI STYLIST</div>
        <button className="w-8 h-8 border border-neutral-800 rounded-full flex items-center justify-center text-sm">+</button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-auto px-4 py-4 space-y-4">
        {/* AI Message 1 */}
        <div className="flex items-start gap-2">
          <div className="w-8 h-8 border border-neutral-800 rounded-full flex items-center justify-center flex-shrink-0 bg-neutral-50">
            <span className="text-xs">✨</span>
          </div>
          <div className="flex-1">
            <div className="bg-neutral-100 rounded-2xl rounded-tl-sm px-4 py-3 inline-block max-w-[85%]">
              <p className="text-xs leading-relaxed">
                Hi Layla! I'm your personal stylist. What occasion are you shopping for?
              </p>
            </div>
          </div>
        </div>

        {/* Quick Reply Chips */}
        <div className="flex flex-wrap gap-2 pl-10">
          <button className="px-4 py-2 border border-neutral-300 rounded-full text-xs">Wedding</button>
          <button className="px-4 py-2 border border-neutral-300 rounded-full text-xs">Business Event</button>
          <button className="px-4 py-2 border border-neutral-300 rounded-full text-xs">Evening Out</button>
          <button className="px-4 py-2 border border-neutral-300 rounded-full text-xs">Casual</button>
        </div>

        {/* User Message */}
        <div className="flex items-start gap-2 justify-end">
          <div className="flex-1 flex justify-end">
            <div className="bg-neutral-800 text-white rounded-2xl rounded-tr-sm px-4 py-3 inline-block max-w-[85%]">
              <p className="text-xs leading-relaxed">
                I need a dress for a wedding next week
              </p>
            </div>
          </div>
        </div>

        {/* AI Message 2 */}
        <div className="flex items-start gap-2">
          <div className="w-8 h-8 border border-neutral-800 rounded-full flex items-center justify-center flex-shrink-0 bg-neutral-50">
            <span className="text-xs">✨</span>
          </div>
          <div className="flex-1">
            <div className="bg-neutral-100 rounded-2xl rounded-tl-sm px-4 py-3 inline-block max-w-[85%] mb-2">
              <p className="text-xs leading-relaxed">
                Beautiful! Let me find some options.
              </p>
            </div>
            <div className="bg-neutral-100 rounded-2xl rounded-tl-sm px-4 py-3 inline-block max-w-[85%]">
              <p className="text-xs leading-relaxed mb-2">
                A few questions to help me:
              </p>
            </div>
          </div>
        </div>

        {/* AI Message with Style Options */}
        <div className="flex items-start gap-2">
          <div className="w-8 h-8 flex-shrink-0"></div>
          <div className="flex-1">
            <div className="bg-neutral-100 rounded-2xl rounded-tl-sm px-4 py-3">
              <p className="text-xs font-bold mb-3">What's your style preference?</p>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 border-2 border-neutral-800 bg-white rounded-full text-xs font-bold">
                  Classic & Elegant
                </button>
                <button className="w-full px-4 py-2 border border-neutral-300 bg-white rounded-full text-xs">
                  Modern & Bold
                </button>
                <button className="w-full px-4 py-2 border border-neutral-300 bg-white rounded-full text-xs">
                  Romantic & Soft
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* AI Message with Product Recommendations */}
        <div className="flex items-start gap-2">
          <div className="w-8 h-8 border border-neutral-800 rounded-full flex items-center justify-center flex-shrink-0 bg-neutral-50">
            <span className="text-xs">✨</span>
          </div>
          <div className="flex-1">
            <div className="bg-neutral-100 rounded-2xl rounded-tl-sm px-4 py-3">
              <p className="text-xs leading-relaxed mb-3">
                Here are my top picks for you:
              </p>
              
              {/* Horizontal Product Scroll */}
              <div className="flex gap-3 overflow-x-auto -mx-2 px-2 pb-2">
                {[1, 2, 3].map((item, idx) => (
                  <div key={idx} className="flex-shrink-0 w-32 border border-neutral-200 rounded-lg overflow-hidden shadow-sm">
                    <div className="aspect-[3/4] bg-neutral-100 flex items-center justify-center">
                      <span className="text-[10px] text-neutral-400">IMG</span>
                    </div>
                    <div className="text-[10px] font-bold mb-1 leading-tight">Evening Dress Name</div>
                    <div className="text-[10px] text-neutral-600 mb-1">SAR {(2500 + idx * 350).toLocaleString()}</div>
                    <div className="flex items-center gap-1 mb-2">
                      <span className="text-[9px] text-green-600 font-bold">94% Match</span>
                      <span className="text-[9px]">✨</span>
                    </div>
                    <button className="w-full py-1.5 bg-neutral-800 text-white text-[10px] font-bold rounded">
                      Try On
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* AI Follow-up */}
        <div className="flex items-start gap-2">
          <div className="w-8 h-8 border border-neutral-800 rounded-full flex items-center justify-center flex-shrink-0 bg-neutral-50">
            <span className="text-xs">✨</span>
          </div>
          <div className="flex-1">
            <div className="bg-neutral-100 rounded-2xl rounded-tl-sm px-4 py-3 inline-block max-w-[85%]">
              <p className="text-xs leading-relaxed">
                Would you like to virtually try any of these?
              </p>
            </div>
          </div>
        </div>

        <div className="pb-24"></div>
      </div>

      {/* Suggestion Chips Above Input */}
      <div className="px-4 pb-2 flex gap-2 overflow-x-auto">
        <button className="px-3 py-1.5 bg-neutral-100 rounded-full text-xs whitespace-nowrap flex-shrink-0">
          Show me more options
        </button>
        <button className="px-3 py-1.5 bg-neutral-100 rounded-full text-xs whitespace-nowrap flex-shrink-0">
          Different colors
        </button>
        <button className="px-3 py-1.5 bg-neutral-100 rounded-full text-xs whitespace-nowrap flex-shrink-0">
          Higher budget
        </button>
        <button className="px-3 py-1.5 bg-neutral-100 rounded-full text-xs whitespace-nowrap flex-shrink-0">
          Try this on
        </button>
      </div>

      {/* Input Area */}
      <div className="border-t border-neutral-200 bg-white px-4 py-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask me anything..."
            className="flex-1 px-4 py-3 border border-neutral-300 rounded-full text-xs focus:outline-none focus:border-neutral-800"
          />
          <button className="w-10 h-10 border border-neutral-800 rounded-full flex items-center justify-center">
            <span className="text-sm">🎤</span>
          </button>
          <button className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center text-white">
            <span className="text-sm">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}