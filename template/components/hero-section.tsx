import Image from 'next/image'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="container mx-auto px-6 py-12 md:py-24 lg:py-32">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-20">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="font-semibold text-primary text-sm uppercase tracking-widest">
              Casa Immaginaria
            </h2>
            <h1 className="font-bold font-serif text-5xl text-foreground leading-tight md:text-6xl lg:text-7xl">
              Il tuo rifugio urbano
            </h1>
            <p className="max-w-lg text-lg text-muted-foreground leading-relaxed md:text-xl">
              Tra comfort e stile, scopri un nuovo modo di vivere la città.
              Rilassati, esplora e sentiti a casa fin dal primo momento.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button className="h-12 rounded-full px-8 font-medium text-base">
              Esplora la casa
            </Button>
            <Button
              className="h-12 rounded-full px-8 font-medium text-base"
              variant="outline"
            >
              Scopri esperienze
            </Button>
          </div>
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl md:aspect-square">
          <Image
            alt="Casa Immaginaria Interior"
            className="object-cover transition-transform duration-700 hover:scale-105"
            fill
            priority
            src="/modern-italian-apartment-interior.jpg"
          />
        </div>
      </div>
    </section>
  )
}
