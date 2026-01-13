import { Plus, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

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

export function ShoppingSection({
  title,
  items,
  basePath = '/experiences',
}: ShoppingSectionProps) {
  return (
    <section className="container mx-auto border-border border-t px-6 py-16 md:py-24">
      <h2 className="mb-12 font-bold font-serif text-3xl text-foreground md:text-4xl">
        {title}
      </h2>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        {items.map((item) => (
          <Link
            className="group block cursor-pointer"
            href={`${basePath}/${item.id}`}
            key={item.id}
          >
            <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-xl bg-secondary">
              {/* Placeholder image/pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary to-muted transition-transform duration-500 group-hover:scale-105" />

              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20">
                <ShoppingBag className="h-12 w-12 opacity-50" />
              </div>

              <Button
                className="absolute right-4 bottom-4 h-10 w-10 translate-y-2 rounded-full bg-background text-foreground opacity-0 shadow-md transition-all duration-300 hover:bg-primary hover:text-primary-foreground group-hover:translate-y-0 group-hover:opacity-100"
                size="icon"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-foreground text-lg transition-colors group-hover:text-primary">
                {item.title}
              </h3>
              <p className="line-clamp-2 text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>
              <div className="pt-2 font-medium text-foreground">
                Prenota ora{' '}
                <span className="ml-1 font-normal text-muted-foreground">
                  • Dettagli
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
