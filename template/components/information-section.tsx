import {
  Droplet,
  Home,
  Lock,
  MessageCircle,
  Shield,
  Sparkles,
  Utensils,
  Volume2,
  Wifi,
  Wind,
} from 'lucide-react'

export function InformationSection() {
  const information = [
    {
      icon: Home,
      title: 'Accesso e check-in',
      description:
        "Self check-in con smart lock; codice inviato via messaggio prima dell'arrivo.",
    },
    {
      icon: Wifi,
      title: 'Wi-Fi',
      description:
        'Rete "Casaimmaginaria" — password: disponibile nella sezione "Dettagli" in pagina.',
    },
    {
      icon: Droplet,
      title: 'Boiler e acqua calda',
      description:
        'Interruttore in corridoio; attendere 15 minuti per temperatura ottimale.',
    },
    {
      icon: Lock,
      title: 'Cassaforte',
      description:
        'Digitare il codice personale e premere "#"; per aprire "✓"; reset tenendo premuto "⊕" per 3 secondi.',
    },
    {
      icon: Utensils,
      title: 'Cucina e elettrodomestici',
      description:
        'Piano a induzione; forno e microonde; manuali rapidi inclusi.',
    },
    {
      icon: Wind,
      title: 'Climatizzazione',
      description:
        "Termostato in salotto; modalità eco consigliata durante l'assenza.",
    },
    {
      icon: Sparkles,
      title: 'Pulizie e rifiuti',
      description:
        'Kit sotto il lavello; raccolta differenziata con bidoni etichettati.',
    },
    {
      icon: Volume2,
      title: 'Rumore e vicinato',
      description: 'Silenzio dalle 22:00 alle 7:00; evitare feste.',
    },
    {
      icon: Shield,
      title: 'Sicurezza',
      description: 'Estintore in ingresso; uscita di emergenza segnalata.',
    },
    {
      icon: MessageCircle,
      title: 'Supporto',
      description: 'Chat in pagina per assistenza e prenotazioni esperienze.',
    },
  ]

  return (
    <section className="container mx-auto mb-12 border-border border-t px-6 py-16 md:py-24">
      <h2 className="mb-12 font-bold font-serif text-3xl text-foreground md:text-4xl">
        Informazioni utili
      </h2>

      <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
        {information.map((info, index) => {
          const Icon = info.icon
          return (
            <div className="flex items-start gap-5" key={index}>
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-secondary/50 text-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-medium text-foreground text-lg">
                  {info.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {info.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
