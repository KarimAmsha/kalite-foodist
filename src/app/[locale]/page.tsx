import { setRequestLocale } from 'next-intl/server';
import { HeroSection } from '@/components/sections/HeroSection';
import { BrandsStrip } from '@/components/sections/BrandsStrip';
import { EventInfoSection } from '@/components/sections/EventInfoSection';
import { WhyVisitSection } from '@/components/sections/WhyVisitSection';
import { ProductFamiliesSection } from '@/components/sections/ProductFamiliesSection';
import { CatalogueSection } from '@/components/sections/CatalogueSection';
import { TeamSection } from '@/components/sections/TeamSection';
import { LeadFormSection } from '@/components/sections/LeadFormSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { FAQSection } from '@/components/sections/FAQSection';

export default function HomePage({ params }: { params: { locale: string } }) {
  // Enable static rendering for this locale.
  setRequestLocale(params.locale);

  return (
    <>
      <HeroSection />
      <BrandsStrip />
      <EventInfoSection />
      <WhyVisitSection />
      <ProductFamiliesSection />
      <CatalogueSection />
      <TeamSection />
      <LeadFormSection />
      <ContactSection />
      <FAQSection />
    </>
  );
}
