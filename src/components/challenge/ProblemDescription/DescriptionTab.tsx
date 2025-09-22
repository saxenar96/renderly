'use client';

import React from 'react';
import { Badge } from '../../ui/badge';
import { Challenge } from '../../../types/challenge';

interface DescriptionTabProps {
  challenge: Challenge;
}

export function DescriptionTab({ challenge }: DescriptionTabProps) {
  return (
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
  );
}
