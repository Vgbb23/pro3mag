import TopBanner from "@/components/TopBanner";
import HeroSection from "@/components/HeroSection";
import ProblemsSection from "@/components/ProblemsSection";
import BenefitsSection from "@/components/BenefitsSection";
import TripleActionSection from "@/components/TripleActionSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import UrgencyBanner from "@/components/UrgencyBanner";
import GuaranteesSection from "@/components/GuaranteesSection";
import FAQSection from "@/components/FAQSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";
import StickyFooterCTA from "@/components/StickyFooterCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-28">
      <TopBanner />
      <HeroSection />
      <ProblemsSection />
      <BenefitsSection />
      <TripleActionSection />
      <PricingSection />
      <TestimonialsSection />
      <UrgencyBanner />
      <GuaranteesSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
      <StickyFooterCTA />
    </div>
  );
};

export default Index;
