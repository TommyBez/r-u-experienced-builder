import { ArrowLeft, MapPin, Medal, Star, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BookingCard } from '@/components/booking-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { experiences } from '@/lib/data'

export function generateStaticParams() {
  return experiences.map((experience) => ({
    id: experience.id.toString(),
  }))
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const experience = experiences.find((e) => e.id === Number.parseInt(id, 10))

  if (!experience) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background pb-20">
      {/* Header/Navigation Placeholder - In a real app this would be global */}
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
            {experience.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm md:text-base">
            <span className="flex items-center gap-1 font-medium text-foreground">
              <Star className="h-4 w-4 fill-current" /> {experience.rating}
              <span className="ml-1 underline">
                ({experience.reviewCount} recensioni)
              </span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" /> {experience.location}
            </span>
            <span>•</span>
            <Badge variant="secondary">{experience.category}</Badge>
          </div>
        </div>

        {/* Hero Image Grid */}
        <div className="relative mb-12 aspect-video overflow-hidden rounded-2xl shadow-sm md:aspect-[3/1]">
          <Image
            alt={experience.title}
            className="object-cover"
            fill
            priority
            src={experience.image}
          />
          <Button
            className="absolute right-4 bottom-4 border bg-background/90 shadow-sm backdrop-blur hover:bg-background"
            size="sm"
            variant="secondary"
          >
            Vedi tutte le foto
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-12 md:gap-24 lg:grid-cols-[2fr_1fr]">
          {/* Main Content */}
          <div className="space-y-10">
            {/* Host Section */}
            <div className="flex items-center justify-between border-b pb-8">
              <div className="space-y-1">
                <h2 className="font-semibold text-2xl">
                  Esperienza offerta da {experience.hostName}
                </h2>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span>{experience.duration}</span>
                  <span>•</span>
                  <span>Lingue: Italiano, Inglese</span>
                </div>
              </div>
              <div className="relative h-14 w-14 md:h-16 md:w-16">
                <Image
                  alt={experience.hostName}
                  className="rounded-full border border-border object-cover"
                  fill
                  src={experience.hostImage}
                />
                <div className="absolute -right-1 -bottom-1 rounded-full border bg-background p-1 shadow-sm">
                  <Medal className="h-4 w-4 text-primary" />
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-4 border-b pb-8">
              {experience.highlights.map((highlight, i) => (
                <div className="flex items-start gap-4" key={i}>
                  <div className="mt-1">
                    {i === 0 && <Star className="h-6 w-6 text-foreground" />}
                    {i === 1 && <Users className="h-6 w-6 text-foreground" />}
                    {i === 2 && <Medal className="h-6 w-6 text-foreground" />}
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{highlight}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Una caratteristica speciale di questa attività.
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="border-b pb-8">
              <h2 className="mb-4 font-semibold text-2xl">Cosa farai</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {experience.longDescription}
              </p>
            </div>

            {/* Included */}
            <div className="border-b pb-8">
              <h2 className="mb-6 font-semibold text-2xl">Cosa è incluso</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {experience.included.map((item, i) => (
                  <div className="flex items-center gap-3" key={i}>
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                      ✓
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div>
              <h2 className="mb-4 font-semibold text-2xl">Dove ti troverai</h2>
              <div className="flex h-64 w-full items-center justify-center rounded-xl border bg-secondary/30">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <MapPin /> Mappa di {experience.location}
                </span>
              </div>
            </div>
          </div>

          {/* Sidebar Booking */}
          <div className="relative">
            <BookingCard item={experience} type="experience" />
          </div>
        </div>
      </div>
    </main>
  )
}
