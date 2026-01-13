import { HeroSection } from '@/components/hero-section'
import { InformationSection } from '@/components/information-section'
import { RecommendationsSection } from '@/components/recommendations-section'
import { ShoppingSection } from '@/components/shopping-section'
import { WelcomeSection } from '@/components/welcome-section'
import { experiences, services } from '@/lib/data'

export default function Page() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <WelcomeSection />
      <RecommendationsSection />

      <ShoppingSection
        basePath="/experiences"
        items={experiences.map((e) => ({
          id: e.id,
          title: e.title,
          description: e.description,
          image: e.image,
        }))}
        title="Esperienze da comprare"
      />

      <ShoppingSection
        basePath="/services"
        items={services.map((s) => ({
          id: s.id,
          title: s.title,
          description: s.description,
          image: s.image,
        }))}
        title="Servizi da comprare"
      />

      <InformationSection />
    </main>
  )
}
