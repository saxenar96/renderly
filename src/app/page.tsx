'use client';

import { ChallengeCard } from "../components/ChallengeCard";

export default function Home() {
  const handleStartChallenge = () => {
    console.log("Starting challenge...");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frontend Interview Challenges
          </h1>
          <p className="text-xl text-gray-600">
            Practice with real-world frontend challenges to ace your interviews
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          <ChallengeCard
            title="Create a Reusable Button Component"
            difficulty="Easy"
            techStack="React"
            description="Create a reusable Button component that accepts different variants, sizes, and states."
            tags={["components", "typescript", "props"]}
            isNew={true}
            onStart={handleStartChallenge}
          />
          
          <ChallengeCard
            title="Build a Todo List App"
            difficulty="Medium"
            techStack="React"
            description="Implement a complete todo list with add, edit, delete, and filter functionality using React hooks."
            tags={["hooks", "state", "forms", "localStorage"]}
            onStart={handleStartChallenge}
          />
          
          <ChallengeCard
            title="Create a Data Table with Sorting"
            difficulty="Hard"
            techStack="TypeScript"
            description="Build a responsive data table component with sorting, filtering, and pagination capabilities."
            tags={["tables", "pagination", "sorting", "performance"]}
            onStart={handleStartChallenge}
          />
        </div>
      </div>
    </div>
  );
}
