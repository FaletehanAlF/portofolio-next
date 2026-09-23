import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import TechStack from "@/components/home/TechStack";
import AboutHome from "@/components/home/AboutHome.js";
import AboutSection from "@/components/about/AboutSection";
// Disembunyikan sementara — hapus komentar di bawah untuk menampilkan lagi.
// import FeaturedProjects from "@/components/home/FeaturedProjects";
// import ExperiencePreview from "@/components/home/ExperiencePreview";
import ContactCTA from "@/components/home/ContactCTA";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <TechStack />
        <AboutHome />
        <AboutSection />
        {/* Disembunyikan sementara — hapus komentar untuk menampilkan lagi.
        <FeaturedProjects />
        <ExperiencePreview />
        */}
        <ContactCTA />
      </main>

      <Footer />
    </>
  );
}