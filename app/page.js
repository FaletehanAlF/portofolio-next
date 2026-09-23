import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import TechStack from "@/components/home/TechStack";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="flex-1">
        <Hero />
        <TechStack />
      </main>

      <Footer />
    </>
  );
}