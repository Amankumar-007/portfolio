import { Hero } from '@/components/sections/hero';
import { ProjectsShowcase } from '@/components/sections/projects-showcase';
import { AboutPreview } from '@/components/sections/about-preview';
import { Services } from '@/components/sections/services';
import { SkillsPreview } from '@/components/sections/skills-preview';
import { Contact } from '@/components/sections/contact';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <AboutPreview />
      <ProjectsShowcase />
      <Services />
      <SkillsPreview />
      <Contact />
    </div>
  );
}