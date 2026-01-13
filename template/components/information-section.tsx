import { Home, Wifi, Droplet, Utensils, Wind, Sparkles, Volume2, Shield, MessageCircle, Lock } from "lucide-react"

export function InformationSection() {
  const information = [
    {
      icon: Home,
      title: "Accesso e check-in",
      description: "Self check-in con smart lock; codice inviato via messaggio prima dell'arrivo.",
    },
    {
      icon: Wifi,
      title: "Wi-Fi",
      description: 'Rete "Casaimmaginaria" — password: disponibile nella sezione "Dettagli" in pagina.',
    },
    {
      icon: Droplet,
      title: "Boiler e acqua calda",
      description: "Interruttore in corridoio; attendere 15 minuti per temperatura ottimale.",
    },
    {
      icon: Lock,
      title: "Cassaforte",
      description:
        'Digitare il codice personale e premere "#"; per aprire "✓"; reset tenendo premuto "⊕" per 3 secondi.',
    },
    {
      icon: Utensils,
      title: "Cucina e elettrodomestici",
      description: "Piano a induzione; forno e microonde; manuali rapidi inclusi.",
    },
    {
      icon: Wind,
      title: "Climatizzazione",
      description: "Termostato in salotto; modalità eco consigliata durante l'assenza.",
    },
    {
      icon: Sparkles,
      title: "Pulizie e rifiuti",
      description: "Kit sotto il lavello; raccolta differenziata con bidoni etichettati.",
    },
    {
      icon: Volume2,
      title: "Rumore e vicinato",
      description: "Silenzio dalle 22:00 alle 7:00; evitare feste.",
    },
    {
      icon: Shield,
      title: "Sicurezza",
      description: "Estintore in ingresso; uscita di emergenza segnalata.",
    },
    {
      icon: MessageCircle,
      title: "Supporto",
      description: "Chat in pagina per assistenza e prenotazioni esperienze.",
    },
  ]

  return (
    <section className="container mx-auto px-6 py-16 md:py-24 border-t border-border mb-12">
      <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-12">
        Informazioni utili
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        {information.map((info, index) => {
          const Icon = info.icon
          return (
            <div key={index} className="flex gap-5 items-start">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-secondary/50 text-foreground">
                <Icon className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-medium text-lg text-foreground">
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
