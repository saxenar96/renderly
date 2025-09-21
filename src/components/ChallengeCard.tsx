'use client';

import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { cn } from '../lib/utils';

export interface ChallengeCardProps {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  techStack: string;
  description: string;
  tags: string[];
  isNew?: boolean;
  onStart?: (id: string) => void;
  className?: string;
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

export function ChallengeCard({
  id,
  title,
  difficulty,
  techStack,
  description,
  tags,
  isNew = false,
  onStart,
  className
}: ChallengeCardProps) {
  return (
    <Card className={cn("w-full max-w-md hover:shadow-lg transition-shadow bg-card", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl font-bold text-card-foreground pr-2">
            {title}
          </CardTitle>
          {isNew && (
            <div className="flex items-center gap-1 text-orange-600 dark:text-orange-400 text-sm font-medium">
              <span className="text-lg">!</span>
              <span>New</span>
            </div>
          )}
        </div>
        
        <div className="flex gap-2 mt-2">
          <Badge 
            variant={difficultyColors[difficulty] as "success" | "warning" | "destructive"}
            className="text-xs font-medium"
          >
            {difficulty}
          </Badge>
          <Badge 
            variant={(techStackColors[techStack as keyof typeof techStackColors] as "info" | "success" | "destructive" | "warning") || 'secondary'}
            className="text-xs font-medium"
          >
            {techStack}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </CardContent>

      <CardFooter className="flex items-center justify-between pt-4">
        <div className="flex flex-wrap gap-1">
          {tags.map((tag, index) => (
            <Badge 
              key={index}
              variant="outline"
              className="text-xs text-muted-foreground bg-muted border-border"
            >
              {tag}
            </Badge>
          ))}
        </div>
        
        <Button 
          onClick={() => onStart?.(id)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
        >
          Start
        </Button>
      </CardFooter>
    </Card>
  );
}
