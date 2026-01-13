import Image from "next/image"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="container mx-auto px-6 py-12 md:py-24 lg:py-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-sm font-semibold tracking-widest text-primary uppercase">
              Casa Immaginaria
            </h2>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-foreground">
              Il tuo rifugio urbano
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
              Tra comfort e stile, scopri un nuovo modo di vivere la città. Rilassati, esplora e sentiti a casa fin dal primo momento.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="rounded-full px-8 h-12 text-base font-medium">
              Esplora la casa
            </Button>
            <Button variant="outline" className="rounded-full px-8 h-12 text-base font-medium">
              Scopri esperienze
            </Button>
          </div>
        </div>

        <div className="relative aspect-[4/3] md:aspect-square w-full overflow-hidden rounded-2xl shadow-2xl">
          <Image
            src="/modern-italian-apartment-interior.jpg"
            alt="Casa Immaginaria Interior"
            fill
            className="object-cover hover:scale-105 transition-transform duration-700"
            priority
          />
        </div>
      </div>
    </section>
  )
}
