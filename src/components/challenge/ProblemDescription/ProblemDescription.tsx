'use client';

import React, { useState } from 'react';
import { cn } from '../../../lib/utils';
import { DescriptionTab } from './DescriptionTab';
import { ExamplesTab } from './ExamplesTab';
import { HintsTab } from './HintsTab';
import { Challenge } from '../../../types/challenge';

interface ProblemDescriptionProps {
  challenge: Challenge;
}

export function ProblemDescription({ challenge }: ProblemDescriptionProps) {
  const [activeTab, setActiveTab] = useState<'description' | 'examples' | 'hints'>('description');

  return (
    <div className="w-1/3 border-r border-border bg-card">
      <div className="h-full flex flex-col">
        {/* Problem Description Header */}
        <div className="border-b border-border px-6 py-4">
          <h2 className="text-lg font-semibold text-card-foreground">Problem Description</h2>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex">
            {[
              { id: 'description', label: 'Description' },
              { id: 'examples', label: 'Examples' },
              { id: 'hints', label: 'Hints' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'description' | 'examples' | 'hints')}
                className={cn(
                  "flex-1 py-3 px-4 text-sm font-medium transition-colors",
                  activeTab === tab.id
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'description' && <DescriptionTab challenge={challenge} />}
          {activeTab === 'examples' && <ExamplesTab />}
          {activeTab === 'hints' && <HintsTab />}
        </div>
      </div>
    </div>
  );
}
