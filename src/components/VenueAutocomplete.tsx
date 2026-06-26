export default function VenueAutocomplete() {
  return (
    <div className="w-full h-full bg-neutral-900 flex items-center justify-center p-6">
      {/* Autocomplete overlay */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
        {/* Input field */}
        <div className="mb-4">
          <label className="text-xs font-bold text-neutral-700 mb-2 block">VENUE / HALL NAME *</label>
          <div className="relative">
            <input
              type="text"
              value="Ritz"
              readOnly
              className="w-full border border-neutral-300 rounded-lg px-3 py-3 pr-8 text-sm"
            />
            <button className="absolute right-3 top-3 text-neutral-400 text-sm">×</button>
          </div>
        </div>

        {/* Dropdown with suggestions */}
        <div className="bg-white border border-neutral-200 rounded-lg shadow-lg max-h-80 overflow-auto">
          {/* Suggestion 1 */}
          <button className="w-full px-4 py-3 text-left hover:bg-neutral-50 border-b border-neutral-200">
            <div className="flex items-start gap-3">
              <span className="text-lg mt-0.5">🏛️</span>
              <div className="flex-1">
                <div className="font-bold text-sm text-neutral-800">Ritz Carlton</div>
                <div className="text-xs text-neutral-500">Al Olaya, Riyadh</div>
              </div>
            </div>
          </button>

          {/* Suggestion 2 */}
          <button className="w-full px-4 py-3 text-left hover:bg-neutral-50 border-b border-neutral-200">
            <div className="flex items-start gap-3">
              <span className="text-lg mt-0.5">🏛️</span>
              <div className="flex-1">
                <div className="font-bold text-sm text-neutral-800">Ritz Carlton DIFC</div>
                <div className="text-xs text-neutral-500">Al Olaya, Riyadh</div>
              </div>
            </div>
          </button>

          {/* Suggestion 3 */}
          <button className="w-full px-4 py-3 text-left hover:bg-neutral-50 border-b border-neutral-200">
            <div className="flex items-start gap-3">
              <span className="text-lg mt-0.5">🏢</span>
              <div className="flex-1">
                <div className="font-bold text-sm text-neutral-800">Ritz Mall</div>
                <div className="text-xs text-neutral-500">Al Malqa, Riyadh</div>
              </div>
            </div>
          </button>

          {/* Add new option */}
          <button className="w-full px-4 py-3 text-left hover:bg-neutral-50">
            <div className="flex items-start gap-3">
              <span className="text-lg mt-0.5 text-neutral-400">+</span>
              <div className="flex-1">
                <div className="text-sm text-neutral-600">Add "Ritz" as new venue</div>
                <div className="text-xs text-neutral-400">We'll add it to our database</div>
              </div>
            </div>
          </button>
        </div>

        <div className="text-xs text-neutral-400 mt-3 text-center">
          Style: Dropdown with shadow, scrollable
        </div>
      </div>
    </div>
  );
}