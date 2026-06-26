import { Camera, Upload, Sparkles, Eye, ArrowLeft } from 'lucide-react';
import { Page } from '../../App';
import { useState } from 'react';
import { allDresses } from '../../data/dresses';
import { getDressImage } from '../../data/dressImages';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import MobileHeader from './MobileHeader';
import MobileNav from './MobileNav';

interface MobileVirtualTryOnProps {
  onNavigate: (page: Page, dressId?: number) => void;
  onGoBack: () => void;
  wishlistItems: number;
}

export default function MobileVirtualTryOn({ onNavigate, onGoBack, wishlistItems }: MobileVirtualTryOnProps) {
  const [step, setStep] = useState<'intro' | 'upload' | 'select'>('intro');

  const featuredDresses = allDresses.filter(d => d.rating >= 4.5).slice(0, 6);

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      <MobileHeader
        title="Virtual Try-On"
        showBack={step !== 'intro'}
        showCart={false}
        onNavigate={onNavigate}
        onBack={() => {
          if (step === 'select') setStep('upload');
          else if (step === 'upload') setStep('intro');
          else onGoBack();
        }}
      />

      <main className="flex-1 overflow-y-auto pb-20">
        {step === 'intro' && (
          <>
            {/* Hero */}
            <div className="bg-white px-6 pt-8 pb-6 text-center border-b border-gray-200">
              <div className="inline-flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full text-[10px] text-gray-600 mb-4">
                <Sparkles className="w-3 h-3" />
                AI-Powered
              </div>
              <h1 className="text-2xl font-light text-black mb-2">See How It Looks</h1>
              <p className="text-sm text-gray-500 max-w-xs mx-auto">
                Upload your photo and virtually try on dresses before ordering
              </p>
            </div>

            {/* Steps */}
            <div className="px-4 py-6">
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h3 className="text-sm font-medium text-black mb-4">How It Works</h3>
                <div className="space-y-4">
                  {[
                    { title: 'Upload Photo', desc: 'Take or upload a full-body photo' },
                    { title: 'Choose Dress', desc: 'Select any dress from our collection' },
                    { title: 'See Result', desc: 'AI generates a realistic try-on preview' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {i + 1}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-black">{item.title}</p>
                        <p className="text-xs text-gray-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setStep('upload')}
                  className="w-full mt-5 bg-black text-white py-3.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2"
                >
                  <Camera className="w-4 h-4" />
                  Start Try-On
                </button>
              </div>
            </div>

            {/* Popular Dresses */}
            <div className="px-4 pb-6">
              <h3 className="text-sm font-medium text-black mb-3">Popular Dresses to Try</h3>
              <div className="grid grid-cols-3 gap-2">
                {featuredDresses.map((dress) => (
                  <button
                    key={dress.id}
                    onClick={() => onNavigate('dress-detail', dress.id)}
                    className="text-left"
                  >
                    <div className="aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 mb-1.5">
                      <ImageWithFallback
                        src={getDressImage(dress.id)}
                        alt={dress.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-[10px] text-gray-400 truncate">{dress.boutique}</p>
                    <p className="text-[11px] font-medium text-black truncate">{dress.name}</p>
                    <p className="text-[11px] text-black">SAR {dress.price.toLocaleString()}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="px-4 pb-6">
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-1.5 mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs font-medium text-black">Tips for Best Results</span>
                </div>
                <div className="space-y-2">
                  {['Plain background', 'Good lighting', 'Face the camera', 'Form-fitting clothes'].map((tip) => (
                    <div key={tip} className="flex items-center gap-2 text-xs text-gray-500">
                      <div className="w-1 h-1 bg-black rounded-full flex-shrink-0"></div>
                      {tip}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {step === 'upload' && (
          <div className="px-4 py-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-light text-black mb-1">Upload Your Photo</h2>
              <p className="text-sm text-gray-500">Take or upload a full-body photo</p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => setStep('select')}
                className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center gap-3 hover:border-black transition-colors"
              >
                <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                  <Camera className="w-7 h-7 text-gray-500" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-black">Take Photo</p>
                  <p className="text-[10px] text-gray-400">Use camera</p>
                </div>
              </button>
              <button
                onClick={() => setStep('select')}
                className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center gap-3 hover:border-black transition-colors"
              >
                <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                  <Upload className="w-7 h-7 text-gray-500" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-black">Upload</p>
                  <p className="text-[10px] text-gray-400">From gallery</p>
                </div>
              </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-1.5 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs font-medium text-black">Tips for Best Results</span>
              </div>
              <div className="space-y-2">
                {[
                  'Stand against a plain background',
                  'Use good, even lighting',
                  'Face the camera directly',
                  'Wear form-fitting clothing',
                ].map((tip) => (
                  <div key={tip} className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="w-1 h-1 bg-black rounded-full flex-shrink-0"></div>
                    {tip}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 'select' && (
          <div className="px-4 py-4">
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-[10px] font-medium mb-3">
                <Eye className="w-3 h-3" />
                Photo uploaded
              </div>
              <h2 className="text-lg font-light text-black mb-1">Choose a Dress</h2>
              <p className="text-xs text-gray-500">Tap any dress to see how it looks on you</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {allDresses.slice(0, 8).map((dress) => (
                <button
                  key={dress.id}
                  onClick={() => onNavigate('dress-detail', dress.id)}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden text-left"
                >
                  <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                    <ImageWithFallback
                      src={getDressImage(dress.id)}
                      alt={dress.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-full flex items-center gap-1 text-[9px] font-medium shadow-sm">
                      <Eye className="w-2.5 h-2.5" />
                      Try On
                    </div>
                  </div>
                  <div className="p-2.5">
                    <p className="text-[9px] text-gray-400">{dress.boutique}</p>
                    <p className="text-[11px] font-medium text-black truncate">{dress.name}</p>
                    <p className="text-[11px] text-black mt-0.5">SAR {dress.price.toLocaleString()}</p>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => onNavigate('search')}
              className="w-full mt-4 py-3 border border-gray-300 rounded-xl text-sm text-black font-medium"
            >
              Browse All Dresses
            </button>
          </div>
        )}
      </main>

      <MobileNav currentPage="virtual-tryon" onNavigate={onNavigate} wishlistItems={wishlistItems} />
    </div>
  );
}
