'use client';
import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  show: boolean;
  duration?: number; 
  onClose: () => void;
}

export default function Toast({ message, show, duration = 5000, onClose }: ToastProps) {

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-[#E6E6FA] text-black px-6 py-4 rounded-md shadow-lg animate-fadeInUp max-w-xs sm:max-w-lg w-full">
      <div className="flex items-center justify-center gap-2 text-center">
        <p className="text-base sm:text-lg font-semibold text-center break-words">{message}</p>
      </div>
      <span role="img" aria-label="heart" className="text-2xl">❤️</span>
    </div>
  );
}
