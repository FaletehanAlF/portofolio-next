import ProfileCard from '@/components/about/ProfileCard.js';

const AVATAR_URL = '/images/profile/faletehan%20al%20farabi.jpg';

export default function AboutProfileCard() {
  return (
    <ProfileCard
      avatarUrl={AVATAR_URL}
      miniAvatarUrl={AVATAR_URL}
      name="Faletehan Al Farabi"
      title="Software Engineering"
      showUserInfo={false}
      enableTilt
      enableMobileTilt={false}
      behindGlowEnabled
      behindGlowColor="rgba(34, 211, 238, 0.55)"
      behindGlowSize="50%"
      innerGradient="linear-gradient(145deg,#0a0a0ae6 0%,#22d3ee33 100%)"
    />
  );
}
