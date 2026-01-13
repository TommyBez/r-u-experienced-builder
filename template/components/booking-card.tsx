"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Experience, Service } from "@/lib/data"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface BookingCardProps {
  item: Experience | Service
  type?: "experience" | "service"
}

export function BookingCard({ item, type = "experience" }: BookingCardProps) {
  const [guests, setGuests] = useState(1)
  const [date, setDate] = useState<Date>()

  const total = item.price * guests
  const serviceFee = Math.round(total * 0.1) // 10% fee
  const finalTotal = total + serviceFee
  
  const maxGuests = 'maxGuests' in item ? item.maxGuests ?? 10 : 10
  const label = type === "service" && item.category === "Cibo" ? "Quantità" : "Ospiti"
  const unitLabel = type === "service" && item.category === "Cibo" ? "box" : (guests > 1 ? "ospiti" : "ospite")

  return (
    <Card className="sticky top-24 border rounded-xl shadow-xl bg-card overflow-hidden">
      <CardHeader className="flex flex-row justify-between items-baseline pb-6">
        <div>
          <span className="text-2xl font-bold">€{item.price}</span>
          <span className="text-muted-foreground font-light"> / {type === "service" && item.category === "Cibo" ? "persona" : "persona"}</span>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <span className="font-semibold">★ {item.rating}</span>
          <span className="text-muted-foreground underline">({item.reviewCount})</span>
        </div>
      </CardHeader>

      <CardContent>
        <div className="border rounded-lg mb-4">
          <div className="grid grid-cols-2 border-b">
            <div className="p-3 border-r">
              <label className="text-[10px] font-bold uppercase tracking-wider block mb-1">Data</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"ghost"}
                    className={cn(
                      "w-full justify-start text-left font-normal p-0 h-auto hover:bg-transparent",
                      !date && "text-muted-foreground"
                    )}
                  >
                    {date ? format(date, "dd/MM/yyyy") : <span>Seleziona data</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="p-3">
               <label className="text-[10px] font-bold uppercase tracking-wider block mb-1">Orario</label>
               <Select defaultValue="10:00">
                <SelectTrigger className="w-full h-auto p-0 border-0 shadow-none focus:ring-0 text-sm">
                  <SelectValue placeholder="Orario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10:00">10:00</SelectItem>
                  <SelectItem value="15:00">15:00</SelectItem>
                  <SelectItem value="18:00">18:00</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="p-3">
            <label className="text-[10px] font-bold uppercase tracking-wider block mb-1">{label}</label>
            <div className="flex items-center justify-between">
              <span className="text-sm">{guests} {unitLabel}</span>
              <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    size="icon"
                    className="w-6 h-6 rounded-full p-0"
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    disabled={guests <= 1}
                  >
                    -
                  </Button>
                  <Button 
                    variant="outline"
                    size="icon"
                    className="w-6 h-6 rounded-full p-0"
                    onClick={() => setGuests(Math.min(maxGuests, guests + 1))}
                    disabled={guests >= maxGuests}
                  >
                    +
                  </Button>
              </div>
            </div>
          </div>
        </div>

        <Button className="w-full h-12 text-lg bg-primary hover:bg-primary/90 mb-4" onClick={() => alert("Prenotazione confermata!")}>
          Prenota
        </Button>

        <div className="text-center text-xs text-muted-foreground mb-6">
          Non ti verrà addebitato nulla per ora
        </div>

        <div className="space-y-4 text-sm">
          <div className="flex justify-between">
            <span className="underline">€{item.price} x {guests} {unitLabel}</span>
            <span>€{total}</span>
          </div>
          <div className="flex justify-between">
            <span className="underline">Costi di servizio</span>
            <span>€{serviceFee}</span>
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between font-bold text-base">
            <span>Totale</span>
            <span>€{finalTotal}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
