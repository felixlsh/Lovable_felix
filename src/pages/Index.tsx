import { TopNav } from "@/components/portfolio/TopNav";
import { Hero } from "@/components/portfolio/Hero";
import { StackMarquee } from "@/components/portfolio/StackMarquee";
import { Metrics } from "@/components/portfolio/Metrics";
import { ElectionProject } from "@/components/portfolio/ElectionProject";
import { RokProject } from "@/components/portfolio/RokProject";
import { Automation } from "@/components/portfolio/Automation";
import { Experience } from "@/components/portfolio/Experience";
import { Projects } from "@/components/portfolio/Projects";
import { Contact } from "@/components/portfolio/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopNav />
      <main>
        <div className="mx-auto max-w-6xl px-5 md:px-8 lg:px-10">
          <Hero />
        </div>
        <StackMarquee />
        <div className="mx-auto max-w-6xl px-5 md:px-8 lg:px-10">
          <Metrics />
          <ElectionProject />
          <RokProject />
          <Automation />
          <Experience />
          <Projects />
          <Contact />
        </div>
      </main>
    </div>
  );
};

export default Index;
