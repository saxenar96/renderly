'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChallengeHeader, ProblemDescription, CodeEditor, OutputPreview, Challenge } from './challenge';
import { executeCodeSafe } from '../lib/codeExecutor';

interface ChallengeDetailProps {
  challenge: Challenge;
}

export function ChallengeDetail({ challenge }: ChallengeDetailProps) {
  const router = useRouter();
  const [output, setOutput] = useState<string>('');
  const [hasRun, setHasRun] = useState(false);
  const [error, setError] = useState<string>('');

  const handleBack = () => {
    router.push('/');
  };

  const handleHints = () => {
    console.log('Show hints for challenge:', challenge.id);
  };

  const handleSolution = () => {
    console.log('Show solution for challenge:', challenge.id);
  };

  const handleRun = (code: string, language: string) => {
    try {
      console.log('Running code:', code, 'Language:', language);
      
      // Execute the code using our safe executor
      const result = executeCodeSafe(code, language as 'javascript' | 'typescript');
      
      if (result.success) {
        setOutput(result.output);
        setError('');
      } else {
        setError(result.error || 'Execution failed');
        setOutput(result.output);
      }
      
      setHasRun(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setHasRun(true);
    }
  };

  const handleReset = () => {
    setOutput('');
    setHasRun(false);
    setError('');
  };

  return (
    <div className="h-screen bg-background overflow-hidden">
      <ChallengeHeader 
        challenge={challenge}
        onBack={handleBack}
        onHints={handleHints}
        onSolution={handleSolution}
      />

      <div className="flex h-[calc(100vh-5rem)]">
        <ProblemDescription challenge={challenge} />
        <CodeEditor 
          challenge={challenge}
          onRun={handleRun}
        />
        <OutputPreview 
          output={output}
          hasRun={hasRun}
          error={error}
        />
      </div>
    </div>
  );
}
