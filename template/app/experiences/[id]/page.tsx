import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { experiences } from "@/lib/data"
import { BookingCard } from "@/components/booking-card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Star, Medal, ArrowLeft } from "lucide-react"

export function generateStaticParams() {
  return experiences.map((experience) => ({
    id: experience.id.toString(),
  }))
}

export default async function ExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const experience = experiences.find((e) => e.id === parseInt(id))

  if (!experience) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background pb-20">
      {/* Header/Navigation Placeholder - In a real app this would be global */}
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
          <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4">{experience.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-muted-foreground">
             <span className="flex items-center gap-1 font-medium text-foreground">
                <Star className="w-4 h-4 fill-current" /> {experience.rating}
                <span className="underline ml-1">({experience.reviewCount} recensioni)</span>
             </span>
             <span>•</span>
             <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" /> {experience.location}
             </span>
             <span>•</span>
             <Badge variant="secondary">{experience.category}</Badge>
          </div>
        </div>

        {/* Hero Image Grid */}
        <div className="relative aspect-video md:aspect-[3/1] rounded-2xl overflow-hidden mb-12 shadow-sm">
           <Image 
             src={experience.image} 
             alt={experience.title}
             fill
             className="object-cover"
             priority
           />
           <Button 
             variant="secondary" 
             size="sm" 
             className="absolute bottom-4 right-4 bg-background/90 backdrop-blur shadow-sm border hover:bg-background"
           >
              Vedi tutte le foto
           </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 md:gap-24">
          {/* Main Content */}
          <div className="space-y-10">
            {/* Host Section */}
            <div className="flex justify-between items-center pb-8 border-b">
                <div className="space-y-1">
                   <h2 className="text-2xl font-semibold">Esperienza offerta da {experience.hostName}</h2>
                   <div className="flex items-center gap-2 text-muted-foreground">
                      <span>{experience.duration}</span>
                      <span>•</span>
                      <span>Lingue: Italiano, Inglese</span>
                   </div>
                </div>
                <div className="relative w-14 h-14 md:w-16 md:h-16">
                    <Image 
                      src={experience.hostImage} 
                      alt={experience.hostName}
                      fill
                      className="object-cover rounded-full border border-border"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-1 border shadow-sm">
                       <Medal className="w-4 h-4 text-primary" />
                    </div>
                </div>
            </div>

            {/* Highlights */}
            <div className="pb-8 border-b space-y-4">
               {experience.highlights.map((highlight, i) => (
                 <div key={i} className="flex gap-4 items-start">
                    <div className="mt-1">
                        {i === 0 && <Star className="w-6 h-6 text-foreground" />}
                        {i === 1 && <Users className="w-6 h-6 text-foreground" />}
                        {i === 2 && <Medal className="w-6 h-6 text-foreground" />}
                    </div>
                    <div>
                       <h3 className="font-medium text-lg">{highlight}</h3>
                       <p className="text-muted-foreground text-sm leading-relaxed">Una caratteristica speciale di questa attività.</p>
                    </div>
                 </div>
               ))}
            </div>

            {/* Description */}
            <div className="pb-8 border-b">
               <h2 className="text-2xl font-semibold mb-4">Cosa farai</h2>
               <p className="text-lg leading-relaxed text-muted-foreground">
                 {experience.longDescription}
               </p>
            </div>

            {/* Included */}
             <div className="pb-8 border-b">
               <h2 className="text-2xl font-semibold mb-6">Cosa è incluso</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {experience.included.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                       <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground">✓</div>
                       <span>{item}</span>
                    </div>
                  ))}
               </div>
            </div>

            {/* Map Placeholder */}
             <div>
               <h2 className="text-2xl font-semibold mb-4">Dove ti troverai</h2>
               <div className="bg-secondary/30 h-64 w-full rounded-xl flex items-center justify-center border">
                  <span className="text-muted-foreground flex items-center gap-2">
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
