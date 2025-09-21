'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChallengeHeader, ProblemDescription, CodeEditor, OutputPreview, Challenge } from './challenge';

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

  const handleRun = (code: string) => {
    try {
      // In a real app, this would execute the code
      console.log('Running code:', code);
      setOutput('Code executed successfully! (This is a placeholder output)');
      setHasRun(true);
      setError('');
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
    <div className="h-screen bg-gray-50 overflow-hidden">
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
          onReset={handleReset}
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
