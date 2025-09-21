'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ChallengeHeader, ProblemDescription, SandpackEditor, Challenge } from './challenge';

interface ChallengeDetailProps {
  challenge: Challenge;
}

export function ChallengeDetail({ challenge }: ChallengeDetailProps) {
  const router = useRouter();

  const handleBack = () => {
    router.push('/');
  };

  const handleHints = () => {
    console.log('Show hints for challenge:', challenge.id);
  };

  const handleSolution = () => {
    console.log('Show solution for challenge:', challenge.id);
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
        <SandpackEditor challenge={challenge} />
      </div>
    </div>
  );
}
