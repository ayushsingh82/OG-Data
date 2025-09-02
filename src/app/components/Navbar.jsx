'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🤖</span>
              </div>
              <span className="text-white font-bold text-xl">OG-Data</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="/dashboard" className="text-white hover:text-blue-400 transition-colors duration-200">
                Dashboard 
              </Link>
              <Link href="/marketplace" className="text-white hover:text-blue-400 transition-colors duration-200">
                AI Agents 
              </Link>
              <Link href="/list-agent" className="text-white hover:text-blue-400 transition-colors duration-200">
                List Agent
              </Link>
             
            </div>
          </div>

          {/* Wallet Connect Button */}
          <div className="hidden md:block">
            <ConnectButton />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-blue-400 focus:outline-none focus:text-blue-400"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/95 border-t border-gray-800">
              <Link 
                href="/dashboard" 
                className="text-white hover:text-blue-400 block px-3 py-2 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                href="/marketplace" 
                className="text-white hover:text-blue-400 block px-3 py-2 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                AI Agents
              </Link>
              <Link 
                href="/list-agent" 
                className="text-white hover:text-blue-400 block px-3 py-2 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                List Agent
              </Link>
              <div className="pt-4">
                <ConnectButton />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;