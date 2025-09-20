'use client';

import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { ChallengesSection } from "../components/ChallengesSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <ChallengesSection />
    </div>
  );
}
