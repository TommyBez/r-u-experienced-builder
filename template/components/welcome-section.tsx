export function WelcomeSection() {
  return (
    <section className="container mx-auto border-border border-b px-6 py-16 md:py-24">
      <div className="mx-auto max-w-3xl space-y-8 text-center">
        <h2 className="font-bold font-serif text-3xl text-foreground md:text-4xl">
          Benvenuti a casa
        </h2>

        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
          <p>
            Benvenute: qui trovi tutte le facilities dell'appartamento, dagli
            accessi ai dettagli pratici. Esplora le esperienze disponibili e
            prenota direttamente dalla pagina per arricchire il soggiorno.
          </p>
          <p>
            Per ogni necessità, consulta le sezioni dedicate: check-in, Wi-Fi,
            cucina, comfort e attività. Siamo qui per rendere il tuo soggiorno
            indimenticabile.
          </p>
        </div>
      </div>
    </section>
  )
}
