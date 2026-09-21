import ShapeGrid from '@/components/ui/ShapeGrid.js';
import LanyardWrapper from '@/components/home/LanyardWrapper.js';
import SpecularButton from '@/components/ui/SpecularButton.js';
import SplitText from '@/components/ui/SplitText.js';

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0a0a0a]">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="pointer-events-auto absolute inset-0">
          <ShapeGrid
            speed={0.5}
            squareSize={48}
            direction="diagonal"
            borderColor="rgba(255, 255, 255, 0.07)"
            hoverFillColor="rgba(255, 255, 255, 0.12)"
            shape="square"
            hoverTrailAmount={5}
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/0 via-[#0a0a0a]/0 to-[#0a0a0a]" />
      </div>

      <div className="mx-auto mt-4 max-w-[1120px] px-6 pb-14 pt-0 sm:px-8 sm:pb-16 sm:pt-1 lg:pb-20 lg:pt-2">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-6">
          <div className="relative z-10 max-w-[640px]">
            <SplitText
              tag="p"
              text="Software Engineering Student"
              className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500"
              delay={30}
              duration={0.6}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 20 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="left"
            />

            <SplitText
              tag="h1"
              text="Faletehan Al Farabi"
              className="mt-5 max-w-full text-[clamp(1.7rem,4vw+1rem,2.65rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-white"
              delay={35}
              duration={0.9}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 50 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="left"
            />

            <SplitText
              tag="p"
              text="Full-Stack Web Developer"
              className="mt-3 text-[15px] font-normal leading-6 tracking-[-0.01em] text-zinc-400 sm:text-[16px]"
              delay={45}
              duration={0.8}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 24 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="left"
            />

            <SplitText
              tag="p"
              text="Saya membangun website dan digital experiences dengan fokus pada clean interface, usability, dan solusi yang relevan."
              className="mt-5 max-w-[560px] text-[14px] leading-6 text-zinc-400 sm:text-[14.5px] sm:leading-7"
              delay={20}
              duration={0.7}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 24 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="left"
            />

            <div className="mt-8 flex flex-wrap gap-3">
              <SpecularButton
                href="/projects"
                size="sm"
                radius={18}
                tint="#ffffff"
                tintOpacity={0.1}
                blur={8}
                textColor="#ffffff"
                lineColor="#ffffff"
                baseColor="#737373"
                intensity={1.2}
                shineSize={10}
                shineFade={40}
                thickness={1}
                speed={0.35}
                followMouse
                proximity={250}
                autoAnimate={false}
                className="text-[13px] font-medium tracking-[-0.01em]"
                ariaLabel="View Projects"
              >
                View Projects
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M3 8h10M8.5 4.5 12 8l-3.5 3.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </SpecularButton>
              <SpecularButton
                href="/cv-faletehan-al-farabi.pdf"
                download="CV-Faletehan-Al-Farabi.pdf"
                size="sm"
                radius={18}
                tint="#ffffff"
                tintOpacity={0.02}
                blur={6}
                textColor="#f5f5f5"
                lineColor="#ffffff"
                baseColor="#525252"
                intensity={1}
                shineSize={10}
                shineFade={40}
                thickness={1}
                speed={0.35}
                followMouse
                proximity={250}
                autoAnimate={false}
                className="text-[13px] font-medium tracking-[-0.01em]"
                ariaLabel="Download CV"
              >
                Download CV
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M8 2.5V10m0 0L5.5 7.5M8 10l2.5-2.5M3 12.5V13a1.5 1.5 0 0 0 1.5 1.5h7A1.5 1.5 0 0 0 13 13v-.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </SpecularButton>
            </div>
          </div>

          <div className="relative z-0 mx-auto w-full max-w-[420px] sm:max-w-[480px] lg:max-w-none">
            <LanyardWrapper
              position={[0, 0, 20]}
              gravity={[0, -40, 0]}
              className="h-[320px] w-full sm:h-[380px] lg:h-[520px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
