import { setRequestLocale } from 'next-intl/server';
import { HeroSection } from '@/components/sections/HeroSection';
import { BrandsStrip } from '@/components/sections/BrandsStrip';
import { WhyVisitSection } from '@/components/sections/WhyVisitSection';
import { ProductFamiliesSection } from '@/components/sections/ProductFamiliesSection';
import { EventInfoSection } from '@/components/sections/EventInfoSection';
import { CtaBand } from '@/components/sections/CtaBand';

export default function HomePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);

  return (
    <>
      <HeroSection />
      <BrandsStrip />
      <WhyVisitSection />
      <ProductFamiliesSection />
      <EventInfoSection />
      <CtaBand />
    </>
  );
}
