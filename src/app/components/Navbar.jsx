'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const menuItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      color: 'blue'
    },
    {
      name: 'Services',
      submenu: [
        { name: 'Storage & Inference', href: '/storage', color: 'cyan' },
        { name: 'Fine-Tuning', href: '/storage?tab=finetuning', color: 'purple' },
        { name: 'Contract Testing', href: '/contract-testing', color: 'green' },
        { name: 'Platform Features', href: '/platform', color: 'purple' }
      ],
      color: 'purple'
    },
    {
      name: 'Marketplace',
      submenu: [
        { name: 'AI Agents', href: '/marketplace', color: 'blue' },
        { name: 'List Agent', href: '/list-agent', color: 'blue' }
      ],
      color: 'blue'
    },
    {
      name: 'Docs',
      href: '/docs',
      color: 'yellow'
    }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Logo */}
          <div className="flex-shrink-0 -ml-2">
            <Link href="/" className="flex items-center space-x-1.5">
              <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🤖</span>
              </div>
              <span className="text-white font-bold text-sm">OG-Data</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block" ref={dropdownRef}>
            <div className="ml-6 flex items-center space-x-4">
              {menuItems.map((item) => (
                <div key={item.name} className="relative">
                  {item.submenu ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className={`text-xs text-gray-300 transition-colors duration-200 flex items-center space-x-1 px-2 py-1 ${
                          item.color === 'blue' ? 'hover:text-blue-400' :
                          item.color === 'purple' ? 'hover:text-purple-400' :
                          item.color === 'yellow' ? 'hover:text-yellow-400' :
                          'hover:text-gray-400'
                        }`}
                      >
                        <span>{item.name}</span>
                        <svg 
                          className={`w-3 h-3 transition-transform duration-200 ${openDropdown === item.name ? 'rotate-180' : ''}`}
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {openDropdown === item.name && (
                        <div className="absolute top-full left-0 mt-1 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-xl py-1">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className={`block px-3 py-1.5 text-xs text-gray-300 hover:bg-gray-800 transition-colors duration-200 ${
                                subItem.color === 'blue' ? 'hover:text-blue-400' :
                                subItem.color === 'cyan' ? 'hover:text-cyan-400' :
                                subItem.color === 'purple' ? 'hover:text-purple-400' :
                                subItem.color === 'green' ? 'hover:text-green-400' :
                                'hover:text-gray-400'
                              }`}
                              onClick={() => setOpenDropdown(null)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href || '#'}
                      className={`text-xs text-gray-300 transition-colors duration-200 px-2 py-1 ${
                        item.color === 'blue' ? 'hover:text-blue-400' :
                        item.color === 'purple' ? 'hover:text-purple-400' :
                        item.color === 'yellow' ? 'hover:text-yellow-400' :
                        'hover:text-gray-400'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Wallet Connect Button */}
          <div className="hidden md:block mr-2">
            <ConnectButton />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-blue-400 focus:outline-none focus:text-blue-400"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              {menuItems.map((item) => (
                <div key={item.name}>
                  {item.submenu ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className="w-full text-left text-xs text-gray-300 hover:text-purple-400 block px-3 py-2 transition-colors duration-200 flex items-center justify-between"
                      >
                        <span>{item.name}</span>
                        <svg 
                          className={`w-4 h-4 transition-transform duration-200 ${openDropdown === item.name ? 'rotate-180' : ''}`}
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {openDropdown === item.name && (
                        <div className="pl-4 space-y-1">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className={`text-xs text-gray-400 block px-3 py-1.5 transition-colors duration-200 ${
                                subItem.color === 'blue' ? 'hover:text-blue-400' :
                                subItem.color === 'cyan' ? 'hover:text-cyan-400' :
                                subItem.color === 'purple' ? 'hover:text-purple-400' :
                                subItem.color === 'green' ? 'hover:text-green-400' :
                                'hover:text-gray-400'
                              }`}
                              onClick={() => {
                                setIsMenuOpen(false);
                                setOpenDropdown(null);
                              }}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href || '#'}
                      className={`text-xs text-gray-300 block px-3 py-2 transition-colors duration-200 ${
                        item.color === 'blue' ? 'hover:text-blue-400' :
                        item.color === 'purple' ? 'hover:text-purple-400' :
                        item.color === 'yellow' ? 'hover:text-yellow-400' :
                        'hover:text-gray-400'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
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