import * as React from 'react'
import { Button } from '@/components/Button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs'
import {
  IconArrowLeft,
  IconBoat,
  IconCalendar,
  IconEngine,
  IconFavFill,
  IconFavLine,
  IconLocation,
  IconPerson,
} from '@/icons'
import { cn } from '@/lib/utils'
import type { Boat, BoatSpec } from './boats'

/**
 * Boat detail — photo header, the four key facts, the "General Information" tabs
 * (Figma: Yotto-Designs › Tabs Content 117:790) and a sticky "Schedule a visit" bar.
 * Composed from library components; no dedicated Figma screen exists yet.
 */
export interface BoatDetailScreenProps {
  boat: Boat
  onBack?: () => void
  onScheduleVisit?: (boat: Boat) => void
  /** Saved-to-favourites state. Uncontrolled when omitted. */
  favourite?: boolean
  onFavouriteChange?: (favourite: boolean) => void
  className?: string
}

/** Round frosted button over the photo (back, favourite). */
const photoButton =
  'inline-flex size-10 items-center justify-center rounded-full bg-glass text-foreground shadow-float backdrop-blur-sm outline-none ' +
  'transition-transform active:scale-95 focus-visible:ring-[3px] focus-visible:ring-ring/50 [&_svg]:size-5'

function KeyFact({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 rounded-md bg-card p-3 text-card-foreground shadow-glow">
      <span className="inline-flex size-8 items-center justify-center rounded-full bg-accent text-accent-foreground [&_svg]:size-4.5">
        {icon}
      </span>
      <dt className="text-body-md text-muted-foreground">{label}</dt>
      <dd className="text-body-xl font-semibold">{value}</dd>
    </div>
  )
}

/** One spec card per tab. Figma: "Boat General Card" inside Tabs Content. */
function SpecCard({ specs }: { specs: BoatSpec[] }) {
  return (
    <dl className="flex flex-col gap-6 rounded-md bg-card p-3 text-card-foreground shadow-glow">
      {specs.map((s) => (
        <div key={s.label} className="flex flex-col gap-2">
          <dt className="text-body-lg text-muted-foreground">{s.label}</dt>
          <dd className="text-body-xl font-semibold">{s.value}</dd>
        </div>
      ))}
    </dl>
  )
}

export function BoatDetailScreen({
  boat,
  onBack,
  onScheduleVisit,
  favourite,
  onFavouriteChange,
  className,
}: BoatDetailScreenProps) {
  const [localFav, setLocalFav] = React.useState(false)
  const isFav = favourite ?? localFav
  const toggleFav = () => {
    setLocalFav(!isFav)
    onFavouriteChange?.(!isFav)
  }

  return (
    <div className={cn('flex min-h-full flex-col bg-background', className)}>
      {/* Photo header */}
      <div className="relative isolate h-80 shrink-0 overflow-hidden text-scrim-foreground">
        <img src={boat.photo} alt="" className="absolute inset-0 -z-10 size-full object-cover" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-b from-transparent from-40% to-scrim" />

        <div className="flex items-center justify-between px-4 pt-4">
          <button type="button" className={photoButton} onClick={onBack} aria-label="Back">
            <IconArrowLeft />
          </button>
          <button
            type="button"
            className={cn(photoButton, isFav && 'text-primary')}
            onClick={toggleFav}
            aria-label="Save to favourites"
            aria-pressed={isFav}
          >
            {isFav ? <IconFavFill /> : <IconFavLine />}
          </button>
        </div>

        <div className="absolute inset-x-4 bottom-8 flex items-end justify-between gap-3">
          <h1 className="text-h3">{boat.name}</h1>
          <img src={boat.brandLogo} alt={boat.brand} className="mb-1 h-5 w-auto brightness-0 invert" />
        </div>
      </div>

      {/* Content sheet overlaps the photo slightly */}
      <div className="relative -mt-4 flex flex-1 flex-col gap-8 rounded-t-lg bg-background px-4 pt-6 pb-8">
        <section aria-labelledby="key-facts">
          <h2 id="key-facts" className="sr-only">
            Key facts
          </h2>
          <dl className="grid grid-cols-2 gap-3">
            <KeyFact icon={<IconBoat />} label="Length Overall" value={boat.length} />
            <KeyFact icon={<IconPerson />} label="Owner & Guests" value={boat.guests} />
            <KeyFact icon={<IconEngine />} label="Engine Type" value={boat.engineType} />
            <KeyFact
              icon={<IconLocation />}
              label="GPS Radar"
              value={
                <span className="inline-flex items-center gap-1.5">
                  <span aria-hidden className={cn('size-2 rounded-full', boat.gpsRadar ? 'bg-success' : 'bg-destructive')} />
                  {boat.gpsRadar ? 'Yes' : 'No'}
                </span>
              }
            />
          </dl>
        </section>

        {/* Figma: Tabs Content (117:790) */}
        <section aria-labelledby="general-info" className="flex flex-col gap-3">
          <h2 id="general-info" className="text-h5 text-foreground">
            General Information
          </h2>
          <p className="text-body-sm text-foreground">{boat.description}</p>
          <Tabs defaultValue="layout" className="gap-3">
            <TabsList aria-label="Boat specifications">
              <TabsTrigger value="layout">Layout</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="anatomy">Anatomy</TabsTrigger>
            </TabsList>
            <TabsContent value="layout" className="animate-step-in-forward motion-reduce:animate-none">
              <SpecCard specs={boat.layout} />
            </TabsContent>
            <TabsContent value="performance" className="animate-step-in-forward motion-reduce:animate-none">
              <SpecCard specs={boat.performance} />
            </TabsContent>
            <TabsContent value="anatomy" className="animate-step-in-forward motion-reduce:animate-none">
              <SpecCard specs={boat.anatomy} />
            </TabsContent>
          </Tabs>
        </section>
      </div>

      {/* Sticky main action */}
      <div className="sticky bottom-0 z-10 flex items-center gap-4 bg-card px-5 py-3 shadow-float">
        <div className="flex flex-col">
          <span className="text-body-md text-muted-foreground">Price</span>
          <span className="text-h5 text-primary">{boat.price}</span>
        </div>
        <Button className="flex-1" leftIcon={<IconCalendar />} onClick={() => onScheduleVisit?.(boat)}>
          Schedule a visit
        </Button>
      </div>
    </div>
  )
}
