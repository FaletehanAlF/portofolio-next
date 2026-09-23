import CursorGrid from '@/components/ui/CursorGrid.js';

// Lapisan background bersama — dipakai Hero (homepage) dan header halaman
// About agar tampilannya konsisten. Satu sumber props = tidak bisa drift.
export const GRID_BACKGROUND_PROPS = {
  cellSize: 48,
  color: '#22d3ee',
  radius: 160,
  falloff: 'smooth',
  holdTime: 350,
  fadeDuration: 900,
  lineWidth: 1,
  maxOpacity: 0.7,
  fillOpacity: 0.06,
  gridOpacity: 0.08,
  cellRadius: 6,
  clickPulse: true,
  pulseSpeed: 650,
};

export default function GridBackground() {
  return (
    <>
      <div className="pointer-events-auto absolute inset-0">
        <CursorGrid {...GRID_BACKGROUND_PROPS} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/0 via-[#0a0a0a]/0 to-[#0a0a0a]" />
    </>
  );
}
