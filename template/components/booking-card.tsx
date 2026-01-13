'use client'

import { format } from 'date-fns'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import type { Experience, Service } from '@/lib/data'
import { cn } from '@/lib/utils'

interface BookingCardProps {
  item: Experience | Service
  type?: 'experience' | 'service'
}

export function BookingCard({ item, type = 'experience' }: BookingCardProps) {
  const [guests, setGuests] = useState(1)
  const [date, setDate] = useState<Date>()

  const total = item.price * guests
  const serviceFee = Math.round(total * 0.1) // 10% fee
  const finalTotal = total + serviceFee

  const maxGuests = 'maxGuests' in item ? (item.maxGuests ?? 10) : 10
  const label =
    type === 'service' && item.category === 'Cibo' ? 'Quantità' : 'Ospiti'
  const unitLabel =
    type === 'service' && item.category === 'Cibo'
      ? 'box'
      : guests > 1
        ? 'ospiti'
        : 'ospite'

  return (
    <Card className="sticky top-24 overflow-hidden rounded-xl border bg-card shadow-xl">
      <CardHeader className="flex flex-row items-baseline justify-between pb-6">
        <div>
          <span className="font-bold text-2xl">€{item.price}</span>
          <span className="font-light text-muted-foreground">
            {' '}
            /{' '}
            {type === 'service' && item.category === 'Cibo'
              ? 'persona'
              : 'persona'}
          </span>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <span className="font-semibold">★ {item.rating}</span>
          <span className="text-muted-foreground underline">
            ({item.reviewCount})
          </span>
        </div>
      </CardHeader>

      <CardContent>
        <div className="mb-4 rounded-lg border">
          <div className="grid grid-cols-2 border-b">
            <div className="border-r p-3">
              <label className="mb-1 block font-bold text-[10px] uppercase tracking-wider">
                Data
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className={cn(
                      'h-auto w-full justify-start p-0 text-left font-normal hover:bg-transparent',
                      !date && 'text-muted-foreground',
                    )}
                    variant={'ghost'}
                  >
                    {date ? (
                      format(date, 'dd/MM/yyyy')
                    ) : (
                      <span>Seleziona data</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto p-0">
                  <Calendar
                    initialFocus
                    mode="single"
                    onSelect={setDate}
                    selected={date}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="p-3">
              <label className="mb-1 block font-bold text-[10px] uppercase tracking-wider">
                Orario
              </label>
              <Select defaultValue="10:00">
                <SelectTrigger className="h-auto w-full border-0 p-0 text-sm shadow-none focus:ring-0">
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
            <label className="mb-1 block font-bold text-[10px] uppercase tracking-wider">
              {label}
            </label>
            <div className="flex items-center justify-between">
              <span className="text-sm">
                {guests} {unitLabel}
              </span>
              <div className="flex gap-2">
                <Button
                  className="h-6 w-6 rounded-full p-0"
                  disabled={guests <= 1}
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  size="icon"
                  variant="outline"
                >
                  -
                </Button>
                <Button
                  className="h-6 w-6 rounded-full p-0"
                  disabled={guests >= maxGuests}
                  onClick={() => setGuests(Math.min(maxGuests, guests + 1))}
                  size="icon"
                  variant="outline"
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Button
          className="mb-4 h-12 w-full bg-primary text-lg hover:bg-primary/90"
          onClick={() => alert('Prenotazione confermata!')}
        >
          Prenota
        </Button>

        <div className="mb-6 text-center text-muted-foreground text-xs">
          Non ti verrà addebitato nulla per ora
        </div>

        <div className="space-y-4 text-sm">
          <div className="flex justify-between">
            <span className="underline">
              €{item.price} x {guests} {unitLabel}
            </span>
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
