import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import TechStack from "@/components/home/TechStack";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import ExperiencePreview from "@/components/home/ExperiencePreview";
import ContactCTA from "@/components/home/ContactCTA";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <TechStack />
        <FeaturedProjects />
        <ExperiencePreview />
        <ContactCTA />
      </main>

      <Footer />
    </>
  );
}