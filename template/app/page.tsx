import { HeroSection } from "@/components/hero-section"
import { WelcomeSection } from "@/components/welcome-section"
import { RecommendationsSection } from "@/components/recommendations-section"
import { ShoppingSection } from "@/components/shopping-section"
import { InformationSection } from "@/components/information-section"
import { experiences, services } from "@/lib/data"

export default function Page() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <WelcomeSection />
      <RecommendationsSection />

      <ShoppingSection
        title="Esperienze da comprare"
        items={experiences.map(e => ({
          id: e.id,
          title: e.title,
          description: e.description,
          image: e.image
        }))}
        basePath="/experiences"
      />

      <ShoppingSection
        title="Servizi da comprare"
        items={services.map(s => ({
          id: s.id,
          title: s.title,
          description: s.description,
          image: s.image
        }))}
        basePath="/services" 
      />

      <InformationSection />
    </main>
  )
}
