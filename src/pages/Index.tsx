import { Sidebar } from "@/components/portfolio/Sidebar";
import { Hero } from "@/components/portfolio/Hero";
import { Experience } from "@/components/portfolio/Experience";
import { Projects } from "@/components/portfolio/Projects";
import { Contact } from "@/components/portfolio/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      <main className="lg:pl-64">
        <div className="mx-auto max-w-6xl px-5 md:px-10 lg:px-16">
          <Hero />
          <Experience />
          <Projects />
          <Contact />
        </div>
      </main>
    </div>
  );
};

export default Index;
