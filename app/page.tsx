import { BuilderForm } from '@/components/builder/builder-form'
import { Header } from '@/components/header'

export default function Page() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <BuilderForm />
      </main>
    </div>
  )
}
