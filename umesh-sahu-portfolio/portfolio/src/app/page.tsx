import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { WhatIBring } from "@/components/WhatIBring";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { CaseStudiesIndex } from "@/components/CaseStudiesIndex";
import { HowISolve } from "@/components/HowISolve";
import { GitHubSection } from "@/components/GitHubSection";
import { Learning } from "@/components/Learning";
import { Certifications } from "@/components/Certifications";
import { Contact } from "@/components/Contact";
import { FinalCTA } from "@/components/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <WhatIBring />
      <Experience />
      <Skills />
      <Projects />
      <CaseStudiesIndex />
      <HowISolve />
      <GitHubSection />
      <Learning />
      <Certifications />
      <Contact />
      <FinalCTA />
    </>
  );
}
