"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PropertyInputModal } from "@/components/property-input-modal"

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)
  
  console.log("[v0] Home component rendered, modalOpen:", modalOpen)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">Property Investment Setup</h1>
        <p className="text-muted-foreground text-lg">
          Configure your property investment details with our comprehensive setup wizard
        </p>
        <Button onClick={() => {
          console.log("[v0] Button clicked, opening modal")
          setModalOpen(true)
        }} size="lg">
          Open Setup Modal
        </Button>
      </div>

      <PropertyInputModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  )
}
