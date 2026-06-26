import { useState } from 'react';

interface DesktopOnboardingProps {
  onComplete: () => void;
}

export default function DesktopOnboarding({ onComplete }: DesktopOnboardingProps) {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const handleComplete = () => {
    if (selectedSizes.length > 0) {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-ivory">
      {/* Progress bar */}
      <div className="border-b border-warm-grey-lighter bg-white">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="h-2 rounded-full bg-emerald luxury-transition" />
            </div>
          </div>
          <div className="mt-4 text-sm text-warm-grey font-light">Step 1 of 1</div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-5xl mb-6">📏</div>
          <h1 className="heading-serif text-4xl mb-4 font-light text-charcoal">What sizes do you typically wear?</h1>
          <p className="text-warm-grey mb-12 text-lg font-light">
            This helps us show you dresses available in your size.
          </p>

          <div className="flex gap-4 justify-center mb-12">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={`w-20 h-20 border-2 rounded-sm font-medium text-lg luxury-transition ${
                  selectedSizes.includes(size)
                    ? 'border-emerald bg-emerald text-ivory'
                    : 'border-warm-grey-lighter hover:border-emerald/40 text-charcoal bg-white'
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          <div className="bg-gold-subtle border border-gold/20 rounded-sm p-6 mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-2xl">✨</span>
              <span className="font-medium text-lg text-charcoal">AI Size Recommendation</span>
            </div>
            <p className="text-sm text-warm-grey font-light">
              You can use our AI-powered size guide for more accurate sizing recommendations based on your measurements.
            </p>
          </div>

          <button
            onClick={handleComplete}
            disabled={selectedSizes.length === 0}
            className="px-12 py-4 bg-emerald text-ivory rounded-sm hover:bg-emerald-light luxury-transition disabled:opacity-50 disabled:cursor-not-allowed tracking-wide"
          >
            Complete Setup
          </button>
        </div>
      </div>
    </div>
  );
}