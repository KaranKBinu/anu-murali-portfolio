'use client';

import dynamic from 'next/dynamic';
import { Navbar } from '@/components/layout';
import {
  HeroSection,
  AboutSection,
  EducationSection,
  SkillsSection,
  ProjectsSection,
  ContactSection,
} from '@/components/sections';

// Dynamically import Three.js background to avoid SSR issues
const ThreeBackground = dynamic(
  () => import('@/components/three').then((mod) => mod.ThreeBackground),
  {
    ssr: false,
    loading: () => null,
  }
);

export default function Home() {
  return (
    <>
      {/* Three.js animated background */}
      <ThreeBackground />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </>
  );
}

