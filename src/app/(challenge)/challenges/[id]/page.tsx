'use client';

import { useParams, useRouter } from 'next/navigation';
import { ChallengeDetail } from '../../../../components/ChallengeDetail';
import { getChallenge } from '../../../../lib/challengeRegistry';

export default function ChallengePage() {
  const params = useParams();
  const router = useRouter();
  const challengeId = params.id as string;

  const challenge = getChallenge(challengeId);

  if (!challenge) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Challenge Not Found</h1>
          <p className="text-muted-foreground mb-8">The challenge you&apos;re looking for doesn&apos;t exist.</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Challenges
          </button>
        </div>
      </div>
    );
  }

  return <ChallengeDetail challenge={challenge} />;
}
