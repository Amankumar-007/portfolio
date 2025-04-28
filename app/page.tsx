import { Hero } from '@/components/sections/hero';
import { ProjectsShowcase } from '@/components/sections/projects-showcase';
import { AboutPreview } from '@/components/sections/about-preview';
import { Services } from '@/components/sections/services';
import { BlogPreview } from '@/components/sections/blog-preview';
import { Contact } from '@/components/sections/contact';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <AboutPreview />
      <ProjectsShowcase />
      <Services />
      <BlogPreview />
      <Contact />
    </div>
  );
}