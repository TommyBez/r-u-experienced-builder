import { ArrowRight, MapPin } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export function RecommendationsSection() {
  const recommendations = [
    {
      name: 'Trattoria del Vicolo',
      category: 'Cucina Tradizionale',
      description:
        'Pasta fresca fatta a mano e vino della casa in un ambiente rustico e accogliente.',
      price: '€€',
    },
    {
      name: 'Bottega Urbana',
      category: 'Aperitivo & Cocktail',
      description:
        'Tapas contemporanee e cocktail curati. Ideale per un aperitivo lungo al tramonto.',
      price: '€€€',
    },
    {
      name: 'Caffè Aurora',
      category: 'Colazione',
      description:
        'Specialty coffee e brioche artigianali. Perfetto per iniziare la giornata con dolcezza.',
      price: '€',
    },
  ]

  return (
    <section className="container mx-auto px-6 py-16 md:py-24">
      <div className="mb-12 flex items-center justify-between">
        <h2 className="font-bold font-serif text-3xl text-foreground md:text-4xl">
          I nostri consigliati
        </h2>
        <Button
          className="hidden text-muted-foreground hover:text-primary md:flex"
          variant="ghost"
        >
          Vedi tutti <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {recommendations.map((rec, index) => (
          <Card
            className="group flex h-full flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            key={index}
          >
            <CardContent className="flex h-full flex-col pt-6">
              <div className="mb-4 flex items-start justify-between">
                <Badge className="rounded-full" variant="secondary">
                  {rec.category}
                </Badge>
                <span className="font-medium text-muted-foreground text-sm">
                  {rec.price}
                </span>
              </div>

              <h3 className="mb-3 font-semibold font-serif text-xl transition-colors group-hover:text-primary">
                {rec.name}
              </h3>

              <p className="mb-6 flex-grow text-muted-foreground leading-relaxed">
                {rec.description}
              </p>

              <div className="mt-auto flex items-center border-border border-t pt-4 font-medium text-foreground text-sm transition-colors group-hover:text-primary">
                <MapPin className="mr-2 h-4 w-4" />
                Apri mappa
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
