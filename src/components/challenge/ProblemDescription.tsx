'use client';

import React, { useState } from 'react';
import { Badge } from '../ui/badge';
import { cn } from '../../lib/utils';

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
                onClick={() => setActiveTab(tab.id as any)}
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
          {activeTab === 'description' && (
            <div className="space-y-6">
              <div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {challenge.description}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-card-foreground mb-3">Requirements:</h3>
                <ul className="space-y-2">
                  {challenge.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-muted-foreground mt-1">•</span>
                      <span className="text-muted-foreground">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-card-foreground mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {challenge.tags.map((tag, index) => (
                    <Badge 
                      key={index}
                      variant="outline"
                      className="text-xs text-muted-foreground bg-muted border-border"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'examples' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-card-foreground">Examples</h3>
              <div className="bg-muted rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-2">Example usage:</p>
                <pre className="text-sm text-foreground bg-background p-3 rounded border border-border">
{`<Button variant="primary" size="md">
  Click me
</Button>

<Button variant="outline" size="sm" disabled>
  Disabled
</Button>`}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'hints' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-card-foreground">Hints</h3>
              <div className="space-y-3">
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    💡 Start by defining the TypeScript interface for your props
                  </p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    💡 Use CSS classes or styled-components for different variants
                  </p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    💡 Consider using a className prop for additional styling flexibility
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
