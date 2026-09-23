import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GridBackground from "@/components/ui/GridBackground.js";
import TechStack from "@/components/home/TechStack";
import AboutMe from "@/components/home/AboutMe";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main>
        {/* Header dengan background yang sama persis seperti hero homepage */}
        <section className="relative isolate overflow-hidden bg-[#0a0a0a]">
          <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
            <GridBackground />
          </div>

          <div className="mx-auto max-w-[1120px] px-6 pb-12 pt-14 sm:px-8 sm:pb-16 sm:pt-20">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">
              About
            </p>
            <h1 className="mt-4 max-w-[640px] text-[clamp(1.9rem,4vw+1rem,2.75rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-white">
              The story behind the work.
            </h1>
            <p className="mt-5 max-w-[560px] text-[14px] leading-6 text-zinc-400 sm:text-[14.5px] sm:leading-7">
              Background, focus, and the way I approach building websites and digital experiences.
            </p>
          </div>
        </section>

        {/* Logo loop */}
        <TechStack />

        {/* Konten about di bawah logo loop */}
        <AboutMe />
      </main>

      <Footer />
    </>
  );
}
