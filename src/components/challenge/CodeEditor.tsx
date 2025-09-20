'use client';

import React, { useState } from 'react';
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

interface CodeEditorProps {
  challenge: Challenge;
  onRun?: (code: string) => void;
  onReset?: () => void;
}

export function CodeEditor({ challenge, onRun, onReset }: CodeEditorProps) {
  const [code, setCode] = useState(challenge.starterCode);

  const handleRun = () => {
    onRun?.(code);
  };

  const handleReset = () => {
    setCode(challenge.starterCode);
    onReset?.();
  };

  return (
    <div className="w-1/3 border-r border-gray-200 bg-white">
      <div className="h-full flex flex-col">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Code Editor</h2>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-sm text-gray-500">TypeScript</span>
            <span className="text-sm text-gray-500">Cmd/Ctrl + Enter to run</span>
          </div>
        </div>
        
        <div className="flex-1 p-6">
          <div className="bg-gray-900 rounded-lg h-full">
            <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 rounded-t-lg">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-300 text-sm ml-4">button.tsx</span>
              </div>
            </div>
            <div className="p-4 h-[calc(100%-3rem)] overflow-hidden">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full bg-transparent text-gray-100 text-sm leading-relaxed resize-none outline-none font-mono overflow-y-auto"
                placeholder="Enter your code here..."
                spellCheck={false}
              />
            </div>
          </div>
          
          <div className="flex gap-3 mt-4">
            <Button variant="outline" className="flex-1" onClick={handleReset}>
              Reset
            </Button>
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={handleRun}>
              Run
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
