'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import ProfileCard from '@/components/about/ProfileCard.js';

const AVATAR_URL = '/images/profile/faletehan%20al%20farabi.jpg';

export default function AboutProfileCard() {
  const router = useRouter();
  const handleContactClick = useCallback(() => {
    router.push('/contact');
  }, [router]);

  return (
    <ProfileCard
      avatarUrl={AVATAR_URL}
      miniAvatarUrl={AVATAR_URL}
      name="Faletehan Al Farabi"
      title="Software Engineering"
      handle="faletehanalfarabi"
      status="Online"
      contactText="Contact Me"
      showUserInfo
      enableTilt
      enableMobileTilt={false}
      behindGlowEnabled
      behindGlowColor="rgba(34, 211, 238, 0.55)"
      behindGlowSize="50%"
      innerGradient="linear-gradient(145deg,#0a0a0ae6 0%,#22d3ee33 100%)"
      onContactClick={handleContactClick}
    />
  );
}
