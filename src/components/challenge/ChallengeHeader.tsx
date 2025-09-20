'use client';

import React from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

export interface Challenge {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  techStack: string;
  description: string;
  tags: string[];
  isNew?: boolean;
  requirements: string[];
  starterCode: string;
}

interface ChallengeHeaderProps {
  challenge: Challenge;
  onBack?: () => void;
  onHints?: () => void;
  onSolution?: () => void;
}

const difficultyColors = {
  Easy: 'success',
  Medium: 'warning', 
  Hard: 'destructive'
} as const;

const techStackColors = {
  React: 'info',
  Vue: 'success',
  Angular: 'destructive',
  TypeScript: 'info',
  JavaScript: 'warning'
} as const;

export function ChallengeHeader({ 
  challenge, 
  onBack, 
  onHints, 
  onSolution 
}: ChallengeHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">{challenge.title}</h1>
            <div className="flex gap-2 mt-1">
              <Badge 
                variant={difficultyColors[challenge.difficulty] as "success" | "warning" | "destructive"}
                className="text-xs"
              >
                {challenge.difficulty}
              </Badge>
              <Badge 
                variant={(techStackColors[challenge.techStack as keyof typeof techStackColors] as "info" | "success" | "destructive" | "warning") || 'secondary'}
                className="text-xs"
              >
                {challenge.techStack}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="px-4 py-2" onClick={onHints}>
            Hints
          </Button>
          <Button variant="outline" className="px-4 py-2" onClick={onSolution}>
            Solution
          </Button>
        </div>
      </div>
    </div>
  );
}
