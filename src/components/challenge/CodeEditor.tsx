'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '../ui/button';
import { MonacoEditor } from './MonacoEditor';

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

  const handleRun = useCallback(() => {
    onRun?.(code);
  }, [onRun, code]);

  const handleReset = () => {
    setCode(challenge.starterCode);
    onReset?.();
  };

  const handleCodeChange = (value: string | undefined) => {
    setCode(value || '');
  };

  // Listen for Ctrl/Cmd + Enter to run code
  useEffect(() => {
    const handleRunCode = () => {
      handleRun();
    };

    window.addEventListener('runCode', handleRunCode);
    return () => {
      window.removeEventListener('runCode', handleRunCode);
    };
  }, [handleRun]);

  return (
    <div className="w-1/3 border-r border-border bg-card">
      <div className="h-full flex flex-col">
        <div className="border-b border-border px-6 py-4">
          <h2 className="text-lg font-semibold text-card-foreground">Code Editor</h2>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-sm text-muted-foreground">TypeScript</span>
            <span className="text-sm text-muted-foreground">Cmd/Ctrl + Enter to run</span>
          </div>
        </div>
        
        <div className="flex-1 p-6">
          <div className="border border-border rounded-lg h-full overflow-hidden">
            <MonacoEditor
              value={code}
              onChange={handleCodeChange}
              language="typescript"
              height="100%"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
