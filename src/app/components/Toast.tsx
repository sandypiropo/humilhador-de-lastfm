'use client';
import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  show: boolean;
  duration?: number;
  onClose: () => void;
}

export default function Toast({ message, show, duration = 5000, onClose }: ToastProps) {
  const [showToast, setShowToast] = useState(show);

  useEffect(() => {
    if (show) {
      setShowToast(true);
      const timer = setTimeout(() => {
        setShowToast(false);
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  return (
    showToast ? (
      <div className={`fixed ${showToast ? 'animate-fadeInUp' : 'animate-fadeOutDown'} max-w-xs sm:max-w-lg w-full
        top-6 right-6 bg-[#E6E6FA] text-black px-6 py-4 rounded-md shadow-lg`}>
        <div className="flex items-center justify-center gap-2 text-center">
          <p className="text-base sm:text-lg font-semibold text-center break-words">{message}</p>
        </div>
        <span role="img" aria-label="heart" className="text-2xl">❤️</span>
      </div>
    ) : null
  );
}
