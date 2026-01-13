import { ArrowLeft, CheckCircle2, Clock, MapPin, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BookingCard } from '@/components/booking-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { services } from '@/lib/data'

export function generateStaticParams() {
  return services.map((service) => ({
    id: service.id.toString(),
  }))
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const service = services.find((s) => s.id === Number.parseInt(id))

  if (!service) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background pb-20">
      {/* Header/Navigation Placeholder */}
      <header className="sticky top-0 z-50 flex h-20 items-center border-b bg-background/80 px-6 backdrop-blur-md md:px-12">
        <Button
          asChild
          className="-ml-4 gap-2 font-semibold text-lg hover:bg-transparent"
          variant="ghost"
        >
          <Link href="/">
            <ArrowLeft className="h-5 w-5" /> Torna alla Home
          </Link>
        </Button>
      </header>

      <div className="container mx-auto max-w-7xl px-6 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="mb-4 font-bold font-serif text-3xl md:text-5xl">
            {service.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm md:text-base">
            <span className="flex items-center gap-1 font-medium text-foreground">
              <Star className="h-4 w-4 fill-current" /> {service.rating}
              <span className="ml-1 underline">
                ({service.reviewCount} recensioni)
              </span>
            </span>
            <span>•</span>
            {service.location && (
              <>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {service.location}
                </span>
                <span>•</span>
              </>
            )}
            <Badge variant="secondary">{service.category}</Badge>
          </div>
        </div>

        {/* Hero Image Grid */}
        <div className="relative mb-12 aspect-video overflow-hidden rounded-2xl shadow-sm md:aspect-[3/1]">
          <Image
            alt={service.title}
            className="object-cover"
            fill
            priority
            src={service.image}
          />
        </div>

        <div className="grid grid-cols-1 gap-12 md:gap-24 lg:grid-cols-[2fr_1fr]">
          {/* Main Content */}
          <div className="space-y-10">
            {/* Service Details Section */}
            <div className="flex items-center justify-between border-b pb-8">
              <div className="space-y-1">
                <h2 className="font-semibold text-2xl">
                  Dettagli del servizio
                </h2>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Durata: {service.duration}</span>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-4 border-b pb-8">
              {service.highlights.map((highlight, i) => (
                <div className="flex items-start gap-4" key={i}>
                  <div className="mt-1">
                    <CheckCircle2 className="h-6 w-6 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{highlight}</h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="border-b pb-8">
              <h2 className="mb-4 font-semibold text-2xl">Descrizione</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {service.longDescription}
              </p>
            </div>

            {/* Included */}
            <div className="border-b pb-8">
              <h2 className="mb-6 font-semibold text-2xl">Cosa è incluso</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {service.included.map((item, i) => (
                  <div className="flex items-center gap-3" key={i}>
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                      ✓
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Booking */}
          <div className="relative">
            <BookingCard item={service} type="service" />
          </div>
        </div>
      </div>
    </main>
  )
}
