'use client';

import React, { useState, useEffect } from 'react';
import { ModeToggle } from './mode-toggle';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md shadow-lg border-b border-border/50' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Title */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-foreground">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Renderly
              </span>
            </h1>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex items-center space-x-8">
              <a 
                href="#challenges" 
                className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
              >
                Challenges
              </a>
              <a 
                href="#about" 
                className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
              >
                About
              </a>
              <a 
                href="#contact" 
                className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
              >
                Contact
              </a>
            </nav>
            <ModeToggle />
          </div>

        </div>
      </div>
    </header>
  );
}
