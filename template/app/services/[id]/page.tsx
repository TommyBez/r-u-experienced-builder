import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { services } from "@/lib/data"
import { BookingCard } from "@/components/booking-card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Star, Medal, ArrowLeft, CheckCircle2, Clock } from "lucide-react"

export function generateStaticParams() {
  return services.map((service) => ({
    id: service.id.toString(),
  }))
}

export default async function ServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const service = services.find((s) => s.id === parseInt(id))

  if (!service) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background pb-20">
      {/* Header/Navigation Placeholder */}
      <header className="border-b h-20 flex items-center px-6 md:px-12 sticky top-0 bg-background/80 backdrop-blur-md z-50">
        <Button variant="ghost" asChild className="-ml-4 gap-2 text-lg font-semibold hover:bg-transparent">
          <Link href="/">
            <ArrowLeft className="w-5 h-5" /> Torna alla Home
          </Link>
        </Button>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4">{service.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-muted-foreground">
             <span className="flex items-center gap-1 font-medium text-foreground">
                <Star className="w-4 h-4 fill-current" /> {service.rating}
                <span className="underline ml-1">({service.reviewCount} recensioni)</span>
             </span>
             <span>•</span>
             {service.location && (
               <>
                 <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {service.location}
                 </span>
                 <span>•</span>
               </>
             )}
             <Badge variant="secondary">{service.category}</Badge>
          </div>
        </div>

        {/* Hero Image Grid */}
        <div className="relative aspect-video md:aspect-[3/1] rounded-2xl overflow-hidden mb-12 shadow-sm">
           <Image 
             src={service.image} 
             alt={service.title}
             fill
             className="object-cover"
             priority
           />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 md:gap-24">
          {/* Main Content */}
          <div className="space-y-10">
            {/* Service Details Section */}
            <div className="flex justify-between items-center pb-8 border-b">
                <div className="space-y-1">
                   <h2 className="text-2xl font-semibold">Dettagli del servizio</h2>
                   <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>Durata: {service.duration}</span>
                   </div>
                </div>
            </div>

            {/* Highlights */}
            <div className="pb-8 border-b space-y-4">
               {service.highlights.map((highlight, i) => (
                 <div key={i} className="flex gap-4 items-start">
                    <div className="mt-1">
                        <CheckCircle2 className="w-6 h-6 text-foreground" />
                    </div>
                    <div>
                       <h3 className="font-medium text-lg">{highlight}</h3>
                    </div>
                 </div>
               ))}
            </div>

            {/* Description */}
            <div className="pb-8 border-b">
               <h2 className="text-2xl font-semibold mb-4">Descrizione</h2>
               <p className="text-lg leading-relaxed text-muted-foreground">
                 {service.longDescription}
               </p>
            </div>

            {/* Included */}
             <div className="pb-8 border-b">
               <h2 className="text-2xl font-semibold mb-6">Cosa è incluso</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.included.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                       <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground">✓</div>
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
