import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

type HeaderProps = {
  onStartTrial?: () => void;
};

export default function Header({ onStartTrial }: HeaderProps) {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

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
          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center">
            <button
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="p-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer menu */}
      {mobileOpen ? (
        <div className="md:hidden">
          <div
            className="fixed inset-0 bg-black/30 z-50"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed top-16 right-0 w-full h-[calc(100vh-4rem)] bg-white border-l border-gray-200 z-50 shadow-lg">
            <div className="p-4 flex justify-between items-center border-b border-gray-200">
              <span className="font-semibold text-gray-900">Menu</span>
              <button
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <a href="/contact" className="block text-gray-700 hover:text-emerald-600">Contact</a>
              <a href="/terms" className="block text-gray-700 hover:text-emerald-600">Terms</a>
              <a href="/about" className="block text-gray-700 hover:text-emerald-600">About us</a>
              <a href="/privacy" className="block text-gray-700 hover:text-emerald-600">Privacy Policy</a>
              <button
                onClick={() => { handleStartTrial(); setMobileOpen(false); }}
                className="w-full bg-[#24cb71] text-white px-4 py-2 rounded-lg hover:bg-[#24cb71] transition-colors"
              >
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
}