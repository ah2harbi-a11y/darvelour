export default function OTPVerification() {
  return (
    <div className="w-full h-full bg-neutral-200 flex flex-col items-center justify-center p-4 relative">
      {/* Modal Card */}
      <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-xl">
        {/* Back button */}
        <button className="w-10 h-10 flex items-center justify-center text-neutral-700 mb-6">
          ←
        </button>

        {/* Title */}
        <h1 className="text-2xl font-bold text-neutral-900 mb-4">
          Enter verification code
        </h1>

        {/* Subtitle */}
        <div className="mb-8">
          <p className="text-sm text-neutral-600">
            We sent a 4-digit code to
          </p>
          <p className="text-sm font-bold text-neutral-900">
            +966 5X XXX XXXX
          </p>
        </div>

        {/* OTP Input boxes - Empty state */}
        <div className="flex gap-3 justify-center mb-8">
          <div className="w-16 h-16 border-2 border-neutral-300 rounded-2xl"></div>
          <div className="w-16 h-16 border-2 border-neutral-300 rounded-2xl"></div>
          <div className="w-16 h-16 border-2 border-neutral-300 rounded-2xl"></div>
          <div className="w-16 h-16 border-2 border-neutral-300 rounded-2xl"></div>
        </div>

        {/* Resend section */}
        <div className="text-center mb-8">
          <p className="text-sm text-neutral-600 mb-2">
            Didn't receive the code?
          </p>
          <button className="text-sm font-bold text-neutral-400 underline mb-1">
            Resend Code
          </button>
          <p className="text-xs text-neutral-400">
            Resend available in 0:37
          </p>
        </div>

        {/* Verify Button - Disabled state */}
        <button className="w-full bg-neutral-300 text-white py-4 rounded-full font-bold text-sm mb-4">
          Verify & Continue
        </button>

        {/* Help text */}
        <p className="text-center text-sm text-neutral-600">
          Having trouble? <span className="font-bold text-neutral-900 underline">Contact Support</span>
        </p>
      </div>

      {/* Bottom label */}
      <p className="text-center text-sm font-bold text-neutral-900 mt-6">
        OTP Verification
      </p>
    </div>
  );
}