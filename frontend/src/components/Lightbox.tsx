"use client";

import React from 'react';

interface LightboxProps {
  isOpen: boolean;
  imageUrl: string;
  onClose: () => void;
  alt?: string;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  imageUrl,
  onClose,
  alt = 'Lightbox Image'
}) => {
  React.useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm transition-opacity duration-300 p-4 cursor-zoom-out"
      onClick={onClose}
    >
      <button
        className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors text-xl font-bold z-51"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        ✕
      </button>

      <img
        src={imageUrl}
        className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl transition-transform duration-300 transform scale-100 hover:scale-110 cursor-move"
        alt={alt}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};
