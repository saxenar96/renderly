'use client';

import React from 'react';
import { ChallengeCard } from './ChallengeCard';

export function ChallengesSection() {
  const handleStartChallenge = () => {
    console.log("Starting challenge...");
  };

  return (
    <section id="challenges" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Practice Challenges
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Level up your frontend skills with hands-on coding challenges 
            designed by industry experts.
          </p>
        </div>

        {/* Challenge Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
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

          <ChallengeCard
            title="Build a Modal Component"
            difficulty="Easy"
            techStack="React"
            description="Create a reusable modal component with backdrop, animations, and accessibility features."
            tags={["modals", "accessibility", "animations"]}
            onStart={handleStartChallenge}
          />

          <ChallengeCard
            title="Implement Infinite Scroll"
            difficulty="Medium"
            techStack="React"
            description="Build an infinite scroll component that efficiently loads and displays large datasets."
            tags={["performance", "scroll", "data-fetching"]}
            onStart={handleStartChallenge}
          />

          <ChallengeCard
            title="Create a Drag & Drop Interface"
            difficulty="Hard"
            techStack="TypeScript"
            description="Implement a drag and drop interface with reorderable lists and visual feedback."
            tags={["drag-drop", "interactions", "animations"]}
            onStart={handleStartChallenge}
          />
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-white border-2 border-gray-300 text-gray-700 text-lg font-semibold rounded-xl hover:border-blue-600 hover:text-blue-600 transition-all duration-200">
            View All Challenges
          </button>
        </div>
      </div>
    </section>
  );
}
