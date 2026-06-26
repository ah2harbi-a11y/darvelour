export default function SignupLoginScreen() {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Header - simple back arrow */}
      <div className="p-4">
        <div className="w-8 h-8 border-2 border-neutral-800 flex items-center justify-center">←</div>
      </div>

      {/* Form content - centered vertically */}
      <div className="flex-1 flex flex-col justify-center px-6 pb-12">
        {/* Title & Context */}
        <div className="mb-8">
          <h1 className="font-bold mb-2">Enter your phone number</h1>
          <p className="text-sm text-neutral-600">We'll send you a verification code</p>
        </div>

        {/* Phone input - clean, wide, minimal */}
        <div className="mb-6">
          <div className="flex border-2 border-neutral-800 rounded-lg overflow-hidden focus-within:border-neutral-900">
            <div className="px-4 py-4 border-r-2 border-neutral-800 font-bold text-sm bg-neutral-50">
              +966
            </div>
            <input
              type="tel"
              placeholder="5X XXX XXXX"
              className="flex-1 px-4 py-4 text-sm outline-none"
            />
          </div>
        </div>

        {/* Primary CTA - strong emphasis */}
        <button className="w-full bg-neutral-800 text-white py-4 px-6 font-bold rounded-full mb-3">
          Send Code
        </button>

        {/* Legal copy - no checkbox */}
        <div className="text-xs text-neutral-500 text-center mb-8">
          By continuing, you agree to our <span className="underline">Terms</span> & <span className="underline">Privacy Policy</span>
        </div>

        {/* Separator */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 border-t border-neutral-300"></div>
          <div className="text-xs text-neutral-400">OR</div>
          <div className="flex-1 border-t border-neutral-300"></div>
        </div>

        {/* Social login - secondary emphasis */}
        <div className="space-y-3 mb-8">
          <button className="w-full border border-neutral-400 text-neutral-700 py-3 px-6 rounded-full text-sm font-medium">
            Continue with Google
          </button>
          <button className="w-full border border-neutral-400 text-neutral-700 py-3 px-6 rounded-full text-sm font-medium">
            Continue with Apple
          </button>
        </div>

        {/* Guest mode - clearly secondary */}
        <div className="text-center">
          <button className="text-sm underline text-neutral-600">Continue as Guest</button>
        </div>
      </div>
    </div>
  );
}