export default function FilterSheet() {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Header - Clean, minimal */}
      <div className="px-4 py-4 border-b border-neutral-200 flex items-center justify-between">
        <button className="text-sm text-neutral-600 font-bold">Reset</button>
        <h2 className="font-bold">Filter</h2>
        <button className="text-neutral-600 text-xl">×</button>
      </div>

      {/* Scrollable filters */}
      <div className="flex-1 overflow-auto px-4 py-4 space-y-6">
        {/* PRIMARY FILTERS - Always Visible */}
        
        {/* Coverage Level - Segmented Control */}
        <div>
          <div className="text-xs font-bold text-neutral-500 mb-3">COVERAGE LEVEL</div>
          <div className="flex gap-0 border border-neutral-300 rounded-lg overflow-hidden p-1 bg-neutral-50">
            <button className="flex-1 py-2 font-bold text-sm bg-white rounded shadow-sm">
              Modest
            </button>
            <button className="flex-1 py-2 font-bold text-sm text-neutral-600">
              Open
            </button>
          </div>
        </div>

        {/* Occasion - Pill-style Multi-select */}
        <div>
          <div className="text-xs font-bold text-neutral-500 mb-3">OCCASION</div>
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 bg-neutral-800 text-white text-sm font-bold rounded-full">
              Wedding
            </button>
            <button className="px-4 py-2 border border-neutral-300 text-neutral-800 text-sm font-bold rounded-full">
              Party / Night Out
            </button>
            <button className="px-4 py-2 bg-neutral-800 text-white text-sm font-bold rounded-full">
              Formal
            </button>
            <button className="px-4 py-2 border border-neutral-300 text-neutral-800 text-sm font-bold rounded-full">
              Casual
            </button>
          </div>
        </div>

        {/* Size - Grid Selection */}
        <div>
          <div className="text-xs font-bold text-neutral-500 mb-3">SIZE</div>
          <div className="grid grid-cols-3 gap-2">
            {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <button
                key={size}
                className={`border rounded-lg py-2.5 text-sm font-bold transition-colors ${
                  size === 'M' 
                    ? 'border-neutral-800 bg-neutral-800 text-white' 
                    : 'border-neutral-300 text-neutral-800 hover:border-neutral-400'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range - Slider */}
        <div>
          <div className="text-xs font-bold text-neutral-500 mb-3">PRICE RANGE</div>
          <div className="px-2">
            <div className="flex justify-between text-xs text-neutral-600 mb-3">
              <span>SAR 200</span>
              <span>SAR 2000+</span>
            </div>
            <div className="relative h-2 bg-neutral-200 rounded-full">
              <div className="absolute left-1/4 right-1/3 h-full bg-neutral-800 rounded-full"></div>
              <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-neutral-800 rounded-full shadow"></div>
              <div className="absolute right-1/3 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-neutral-800 rounded-full shadow"></div>
            </div>
          </div>
        </div>

        {/* Delivery - Toggle */}
        <div>
          <div className="text-xs font-bold text-neutral-500 mb-3">DELIVERY</div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold">24h Express</span>
            {/* Toggle Switch */}
            <button className="w-12 h-6 bg-neutral-800 rounded-full relative flex items-center">
              <div className="absolute right-1 w-4 h-4 bg-white rounded-full shadow"></div>
            </button>
          </div>
        </div>

        {/* MORE FILTERS - Collapsed by Default */}
        <div>
          <button className="flex items-center gap-2 text-sm font-bold text-neutral-600 mb-4">
            More filters <span className="text-xs">▾</span>
          </button>
          
          {/* Collapsed content - would be hidden by default */}
          <div className="space-y-6 pl-4 border-l-2 border-neutral-100">
            {/* Color - Swatches */}
            <div>
              <div className="text-xs font-bold text-neutral-500 mb-3">COLOR</div>
              <div className="flex flex-wrap gap-2">
                {[
                  { color: '#000000', name: 'Black' },
                  { color: '#FFFFFF', name: 'White' },
                  { color: '#DC143C', name: 'Red' },
                  { color: '#0000CD', name: 'Blue' },
                  { color: '#FFD700', name: 'Gold' },
                  { color: '#808080', name: 'Gray' }
                ].map((item, i) => (
                  <button
                    key={item.name}
                    className={`w-10 h-10 rounded-full border-2 ${
                      i === 0 ? 'border-neutral-800' : 'border-neutral-300'
                    }`}
                    style={{ backgroundColor: item.color }}
                  ></button>
                ))}
              </div>
            </div>

            {/* Sleeve Length - Pills */}
            <div>
              <div className="text-xs font-bold text-neutral-500 mb-3">SLEEVE LENGTH</div>
              <div className="flex flex-wrap gap-2">
                {['Sleeveless', 'Short', 'Long', '3/4'].map((item) => (
                  <button
                    key={item}
                    className={`px-3 py-1.5 text-xs font-bold rounded-full ${
                      item === 'Long'
                        ? 'bg-neutral-800 text-white'
                        : 'border border-neutral-300 text-neutral-800'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Dress Length - Pills */}
            <div>
              <div className="text-xs font-bold text-neutral-500 mb-3">DRESS LENGTH</div>
              <div className="flex flex-wrap gap-2">
                {['Mini', 'Knee', 'Midi', 'Maxi', 'Floor'].map((item) => (
                  <button
                    key={item}
                    className={`px-3 py-1.5 text-xs font-bold rounded-full ${
                      item === 'Maxi'
                        ? 'bg-neutral-800 text-white'
                        : 'border border-neutral-300 text-neutral-800'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Boutique - Pills */}
            <div className="pb-24">
              <div className="text-xs font-bold text-neutral-500 mb-3">BOUTIQUE</div>
              <div className="flex flex-wrap gap-2">
                {['Boutique A', 'Boutique B', 'Boutique C', 'Boutique D'].map((item) => (
                  <button
                    key={item}
                    className="px-3 py-1.5 text-xs font-bold rounded-full border border-neutral-300 text-neutral-800"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="px-4 py-4 border-t border-neutral-200 bg-white space-y-3">
        <button className="w-full bg-neutral-800 text-white py-4 font-bold rounded-full">
          Show 47 Results
        </button>
        <button className="w-full text-sm text-neutral-600 font-bold">
          Save this search
        </button>
      </div>
    </div>
  );
}