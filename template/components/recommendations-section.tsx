import { MapPin, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function RecommendationsSection() {
  const recommendations = [
    {
      name: "Trattoria del Vicolo",
      category: "Cucina Tradizionale",
      description: "Pasta fresca fatta a mano e vino della casa in un ambiente rustico e accogliente.",
      price: "€€",
    },
    {
      name: "Bottega Urbana",
      category: "Aperitivo & Cocktail",
      description: "Tapas contemporanee e cocktail curati. Ideale per un aperitivo lungo al tramonto.",
      price: "€€€",
    },
    {
      name: "Caffè Aurora",
      category: "Colazione",
      description: "Specialty coffee e brioche artigianali. Perfetto per iniziare la giornata con dolcezza.",
      price: "€",
    },
  ]

  return (
    <section className="container mx-auto px-6 py-16 md:py-24">
      <div className="flex items-center justify-between mb-12">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
          I nostri consigliati
        </h2>
        <Button variant="ghost" className="hidden md:flex text-muted-foreground hover:text-primary">
          Vedi tutti <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {recommendations.map((rec, index) => (
          <Card 
            key={index} 
            className="group flex flex-col h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <CardContent className="flex flex-col h-full pt-6">
              <div className="flex justify-between items-start mb-4">
                <Badge variant="secondary" className="rounded-full">
                  {rec.category}
                </Badge>
                <span className="text-sm text-muted-foreground font-medium">{rec.price}</span>
              </div>
              
              <h3 className="font-serif text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                {rec.name}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
                {rec.description}
              </p>
              
              <div className="pt-4 mt-auto border-t border-border flex items-center text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                <MapPin className="w-4 h-4 mr-2" />
                Apri mappa
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
