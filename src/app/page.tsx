import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { ChallengesSection } from "../components/ChallengesSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ChallengesSection />
    </div>
  );
}
