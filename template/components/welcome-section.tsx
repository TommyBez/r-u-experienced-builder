export function WelcomeSection() {
  return (
    <section className="container mx-auto px-6 py-16 md:py-24 border-b border-border">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Benvenuti a casa</h2>

        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
          <p>
            Benvenute: qui trovi tutte le facilities dell'appartamento, dagli accessi ai dettagli pratici. Esplora le
            esperienze disponibili e prenota direttamente dalla pagina per arricchire il soggiorno.
          </p>
          <p>
            Per ogni necessità, consulta le sezioni dedicate: check-in, Wi-Fi, cucina, comfort e attività. Siamo qui per
            rendere il tuo soggiorno indimenticabile.
          </p>
        </div>
      </div>
    </section>
  )
}
