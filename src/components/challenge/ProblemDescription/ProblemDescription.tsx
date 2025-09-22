'use client';

import React from 'react';
import { DescriptionTab } from './DescriptionTab';
import { ExamplesTab } from './ExamplesTab';
import { HintsTab } from './HintsTab';
import { Challenge } from '../../../types/challenge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';

interface ProblemDescriptionProps {
  challenge: Challenge;
}

export function ProblemDescription({ challenge }: ProblemDescriptionProps) {
  return (
    <div className="w-1/3 border-r border-border bg-card">
      <div className="h-full flex flex-col">
        {/* Problem Description Text */}
        <div className="px-6 py-4">
          <h2 className="text-2xl font-semibold text-card-foreground">Problem Description</h2>
        </div>
        
        {/* ShadCN Tabs */}
        <Tabs defaultValue="description" className="h-full flex flex-col">
          <div className="px-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
              <TabsTrigger value="hints">Hints</TabsTrigger>
            </TabsList>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto">
            <TabsContent value="description" className="p-6">
              <DescriptionTab challenge={challenge} />
            </TabsContent>
            <TabsContent value="examples" className="p-6">
              <ExamplesTab />
            </TabsContent>
            <TabsContent value="hints" className="p-6">
              <HintsTab />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
