import React from 'react';
import { useNavigate } from 'react-router-dom';

type HeaderProps = {
  onStartTrial?: () => void;
};

export default function Header({ onStartTrial }: HeaderProps) {
  const navigate = useNavigate();

  const handleStartTrial = () => {
    if (onStartTrial) {
      onStartTrial();
    } else {
      navigate('/');
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <a href="/" className="flex items-center">
              <img src="https://www.dollarpe.com/_next/static/media/dollarpe-logo.7cecdabd.svg" alt="DollarPe Payroll" className="w-[90%]" />
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="/contact" className="text-gray-600 hover:text-emerald-600 transition-colors">Contact</a>
            <a href="/terms" className="text-gray-600 hover:text-emerald-600 transition-colors">Terms</a>
            <a href="/about" className="text-gray-600 hover:text-emerald-600 transition-colors">About us</a>
            <a href="/privacy" className="text-gray-600 hover:text-emerald-600 transition-colors">Privacy Policy</a>
            <button
              onClick={handleStartTrial}
              className="bg-[#24cb71] text-white px-6 py-2 rounded-lg hover:bg-[#24cb71] transition-all shadow-sm hover:shadow-md"
            >
              Start Free Trial
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}