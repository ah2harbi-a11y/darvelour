import { useState } from 'react';
import { Camera, Upload, Sparkles, Eye, ArrowLeft } from 'lucide-react';
import { Page } from '../../App';
import { allDresses } from '../../data/dresses';
import { getDressImage } from '../../data/dressImages';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface DesktopVirtualTryOnProps {
  onNavigate: (page: Page, id?: number) => void;
}

export default function DesktopVirtualTryOn({ onNavigate }: DesktopVirtualTryOnProps) {
  const [step, setStep] = useState<'intro' | 'upload' | 'select'>('intro');
  const [uploaded, setUploaded] = useState(false);

  const featuredDresses = allDresses.filter(d => d.rating >= 4.5).slice(0, 6);

  if (step === 'intro') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-[1200px] mx-auto px-8 py-20">
            <div className="grid grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-xs mb-6 text-gray-600">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI-Powered Feature</span>
                </div>
                <h1 className="text-5xl font-light text-black mb-6 leading-tight">Virtual Try-On</h1>
                <p className="text-lg text-gray-500 mb-10 leading-relaxed">
                  See how dresses look on you before ordering. Our AI technology creates a realistic preview in seconds.
                </p>

                <div className="space-y-4 mb-10">
                  {[
                    'Upload your photo or use camera',
                    'Choose any dress from our collection',
                    'AI instantly shows you wearing the dress',
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</div>
                      <span className="text-gray-700">{text}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setStep('upload')}
                  className="px-8 py-4 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors flex items-center gap-2 text-sm font-medium"
                >
                  <Camera className="w-5 h-5" />
                  Start Try-On
                </button>
              </div>

              {/* Preview Grid */}
              <div className="grid grid-cols-2 gap-4">
                {featuredDresses.slice(0, 4).map((dress) => (
                  <div key={dress.id} className="aspect-[3/4] rounded-xl overflow-hidden bg-gray-100">
                    <ImageWithFallback
                      src={getDressImage(dress.id)}
                      alt={dress.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Popular Dresses to Try */}
        <div className="max-w-[1200px] mx-auto px-8 py-16">
          <h2 className="text-2xl font-light text-black mb-2">Popular Dresses to Try On</h2>
          <p className="text-sm text-gray-500 mb-8">See how these top-rated pieces would look on you</p>
          <div className="grid grid-cols-6 gap-4">
            {featuredDresses.map((dress) => (
              <div
                key={dress.id}
                className="cursor-pointer group"
                onClick={() => onNavigate('dress-detail', dress.id)}
              >
                <div className="aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 mb-2">
                  <ImageWithFallback
                    src={getDressImage(dress.id)}
                    alt={dress.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="text-xs text-gray-500">{dress.boutique}</p>
                <p className="text-sm font-medium text-black truncate">{dress.name}</p>
                <p className="text-sm text-black">SAR {dress.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (step === 'upload') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-[800px] mx-auto px-8 py-16">
          <button
            onClick={() => setStep('intro')}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="text-center mb-12">
            <h1 className="text-3xl font-light text-black mb-3">Upload Your Photo</h1>
            <p className="text-gray-500">Take a full-body photo or upload one from your device</p>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-10">
            <button
              onClick={() => { setUploaded(true); setStep('select'); }}
              className="bg-white border border-gray-200 rounded-xl p-10 flex flex-col items-center gap-4 hover:border-black hover:shadow-md transition-all group"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-black transition-colors">
                <Camera className="w-8 h-8 text-gray-400 group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="font-medium text-black mb-1">Take Photo</p>
                <p className="text-sm text-gray-400">Use your camera</p>
              </div>
            </button>

            <button
              onClick={() => { setUploaded(true); setStep('select'); }}
              className="bg-white border border-gray-200 rounded-xl p-10 flex flex-col items-center gap-4 hover:border-black hover:shadow-md transition-all group"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-black transition-colors">
                <Upload className="w-8 h-8 text-gray-400 group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="font-medium text-black mb-1">Upload Photo</p>
                <p className="text-sm text-gray-400">From your device</p>
              </div>
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-black">Tips for Best Results</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                'Stand against a plain background',
                'Use good, even lighting',
                'Face the camera directly',
                'Wear form-fitting clothing',
              ].map((tip) => (
                <div key={tip} className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-1.5 h-1.5 bg-black rounded-full flex-shrink-0"></div>
                  {tip}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Select dress step
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-8 py-12">
        <button
          onClick={() => setStep('upload')}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Change Photo
        </button>

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-xs font-medium mb-4">
            <Eye className="w-3.5 h-3.5" />
            Photo uploaded successfully
          </div>
          <h1 className="text-3xl font-light text-black mb-3">Choose a Dress to Try On</h1>
          <p className="text-gray-500">Select any dress below to see how it looks on you</p>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {allDresses.slice(0, 12).map((dress) => (
            <div
              key={dress.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden cursor-pointer group hover:shadow-lg transition-shadow"
              onClick={() => onNavigate('dress-detail', dress.id)}
            >
              <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                <ImageWithFallback
                  src={getDressImage(dress.id)}
                  alt={dress.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 shadow-lg">
                    <Eye className="w-4 h-4" />
                    Try On
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-400 mb-0.5">{dress.boutique}</p>
                <p className="text-sm font-medium text-black truncate">{dress.name}</p>
                <p className="text-sm text-black mt-1">SAR {dress.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => onNavigate('search')}
            className="px-8 py-3 border border-gray-300 text-black rounded-xl hover:bg-black hover:text-white transition-colors text-sm"
          >
            Browse All Dresses
          </button>
        </div>
      </div>
    </div>
  );
}
