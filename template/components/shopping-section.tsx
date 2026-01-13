import Link from "next/link"
import { Plus, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ShoppingItem {
  id: number
  title: string
  description: string
  // Optional image prop if available
  image?: string
}

interface ShoppingSectionProps {
  title: string
  items: ShoppingItem[]
  basePath?: string
}

export function ShoppingSection({ title, items, basePath = "/experiences" }: ShoppingSectionProps) {
  return (
    <section className="container mx-auto px-6 py-16 md:py-24 border-t border-border">
      <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-12">
        {title}
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {items.map((item) => (
          <Link 
            href={`${basePath}/${item.id}`} 
            key={item.id}
            className="group cursor-pointer block"
          >
            <div className="relative aspect-[4/3] bg-secondary rounded-xl overflow-hidden mb-4">
              {/* Placeholder image/pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary to-muted group-hover:scale-105 transition-transform duration-500" />
              
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20">
                <ShoppingBag className="w-12 h-12 opacity-50" />
              </div>

              <Button 
                size="icon"
                className="absolute bottom-4 right-4 w-10 h-10 rounded-full shadow-md opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 bg-background text-foreground hover:bg-primary hover:text-primary-foreground"
              >
                <Plus className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                {item.description}
              </p>
              <div className="pt-2 font-medium text-foreground">
                Prenota ora <span className="text-muted-foreground font-normal ml-1">• Dettagli</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
