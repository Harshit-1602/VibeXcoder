'use client';

import {
  HeroSection,
  StatsSection,
  PhilosophySection,
  ChefSection,
  GallerySection,
  IngredientsSection,
  MenuSection,
  WineSection,
  EventsSection,
  GiftSection,
  TestimonialsSection,
  FloorPlanSection,
  ReservationSection,
  FooterSection,
} from './sections';

export function UIOverlay() {
  return (
    <div className="w-full">
      <HeroSection />
      <StatsSection />
      <PhilosophySection />
      <ChefSection />
      <GallerySection />
      <IngredientsSection />
      <MenuSection />
      <WineSection />
      <EventsSection />
      <GiftSection />
      <TestimonialsSection />
      <FloorPlanSection />
      <ReservationSection />
      <FooterSection />
    </div>
  );
}
