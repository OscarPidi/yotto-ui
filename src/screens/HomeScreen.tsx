import * as React from 'react'
import { MenuItem } from '@/components/MenuItem'
import { NavigationMenu } from '@/components/NavigationMenu'
import { IconBoat, IconCalendar, IconPerson, IconUser, IconYotto } from '@/icons'
import { cn } from '@/lib/utils'
import heroPhoto from './assets/home-hero.png'
import benettiWhite from './assets/brand-benetti-white.svg'
import logoDarkOnLight from './assets/logo-dark-on-light.png'
import { sampleBoats, type Boat } from './boats'

/** Featured carousel: the Figma hero boat, then the first two list boats. */
const featuredBoats = (boats: Boat[]) => [
  { id: 'class44', name: 'Class 44M', brand: 'Benetti', brandLogo: benettiWhite, photo: heroPhoto, length: '42.5 M / 139’ 5’’', guests: '10 Person, 5 Cabins' },
  ...boats.slice(0, 2),
]

/**
 * Home — featured boat carousel, "All Boats" list and the bottom app bar.
 * Figma: Yotto-Designs › "Home Screen" (89:1017).
 */
export interface HomeScreenProps {
  boats?: Boat[]
  onViewAll?: () => void
  onSelectBoat?: (boat: Boat) => void
  className?: string
}

function Spec({ icon, label, value, className }: { icon: React.ReactNode; label: string; value: string; className?: string }) {
  return (
    <div className={cn('flex items-start gap-1.5 text-body-sm [&_svg]:size-4 [&_svg]:shrink-0', className)}>
      {icon}
      <dl className="whitespace-nowrap">
        <dt className="font-semibold">{label}</dt>
        <dd>{value}</dd>
      </dl>
    </div>
  )
}

/** Boat list card. Figma: "Boat General Card" — planned as a library component (BoatCard). */
function BoatCard({ boat, onSelect }: { boat: Boat; onSelect?: (boat: Boat) => void }) {
  return (
    <article className="relative overflow-hidden rounded-md bg-card text-card-foreground shadow-glow">
      <div className="flex gap-3">
        <img src={boat.photo} alt="" className="w-25 shrink-0 object-cover" />
        <div className="flex min-w-0 flex-1 flex-col gap-2 py-3 pr-3">
          <div className="flex items-center justify-between gap-2">
            <h3 className="truncate text-h5">
              {/* Whole card is clickable via this link's stretched hit area. */}
              <button
                type="button"
                onClick={() => onSelect?.(boat)}
                className="text-left outline-none after:absolute after:inset-0 after:rounded-md focus-visible:after:ring-[3px] focus-visible:after:ring-ring/50"
              >
                {boat.name}
              </button>
            </h3>
            <img src={boat.brandLogo} alt={boat.brand} className="w-11 shrink-0 dark:invert" />
          </div>
          <div className="flex gap-3">
            <Spec icon={<IconBoat />} label="Length Overall" value={boat.length} className="border-r border-border pr-2.5" />
            <Spec icon={<IconPerson />} label="Owner & Guests" value={boat.guests} />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2.5 border-t border-border p-3">
        <p className="flex-1 text-body-sm">{boat.description}</p>
        <p className="text-h5 text-primary">{boat.price}</p>
      </div>
    </article>
  )
}

export function HomeScreen({ boats = sampleBoats, onViewAll, onSelectBoat, className }: HomeScreenProps) {
  const [slide, setSlide] = React.useState(0)
  const featured = featuredBoats(boats)
  const hero = featured[slide % featured.length]

  return (
    <div className={cn('relative flex min-h-full flex-col bg-background', className)}>
      {/* Featured boat (carousel) */}
      <section aria-roledescription="carousel" aria-label="Featured boats" className="relative isolate">
        <div className="relative flex h-132.5 flex-col overflow-hidden px-2.5 pb-15 text-scrim-foreground">
          <img src={hero.photo} alt="" className="absolute inset-0 -z-10 size-full object-cover" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-b from-transparent from-55% to-scrim to-80%" />

          {/* Top bar with logo (Figma: Top Navigation, type Logo) */}
          <header className="flex h-11 items-center justify-center pt-2">
            <div className="h-6 w-20.5 overflow-hidden">
              <img src={logoDarkOnLight} alt="Yotto" className="-mx-3.5 -mt-2.75 w-27.5 max-w-none" />
            </div>
          </header>

          <div className="mt-auto flex flex-col gap-2 p-3">
            <div className="flex items-center justify-between">
              <h2 className="text-h4">{hero.name}</h2>
              {/* brightness-0 invert: every brand mark shows white on the photo */}
              <img src={hero.brandLogo} alt={hero.brand} className="h-5 w-auto brightness-0 invert" />
            </div>
            <div className="flex gap-3">
              <Spec icon={<IconBoat />} label="Length Overall" value={hero.length} className="border-r border-scrim-foreground pr-3" />
              <Spec icon={<IconPerson />} label="Owner & Guests" value={hero.guests} />
            </div>
          </div>
        </div>

        {/* Curved edge + carousel dots */}
        <div className="absolute -inset-x-7 top-120.75 flex h-17 justify-center rounded-[50%] bg-background pt-4">
          <div className="flex gap-2.5">
            {featured.map((b, i) => (
              <button
                key={b.id}
                type="button"
                aria-label={`Show ${b.name}`}
                aria-current={i === slide || undefined}
                onClick={() => setSlide(i)}
                className="size-2 rounded-full bg-border outline-none aria-current:bg-magenta focus-visible:ring-[3px] focus-visible:ring-ring/50"
              />
            ))}
          </div>
        </div>
      </section>

      {/* All boats */}
      <section aria-labelledby="all-boats" className="relative flex flex-col gap-3 px-4 pt-7 pb-6">
        <div className="flex items-center justify-between">
          <h2 id="all-boats" className="text-h5 text-foreground">
            All Boats
          </h2>
          <button type="button" onClick={onViewAll} className="text-body-lg font-semibold text-primary outline-none focus-visible:underline">
            View All
          </button>
        </div>
        {boats.map((b) => (
          <BoatCard key={b.id} boat={b} onSelect={onSelectBoat} />
        ))}
      </section>

      <NavigationMenu aria-label="Main" className="sticky bottom-0 mt-auto px-3">
        <MenuItem selected icon={<IconYotto />}>Home</MenuItem>
        <MenuItem icon={<IconBoat />}>My Boats</MenuItem>
        <MenuItem icon={<IconCalendar />}>Schedules</MenuItem>
        <MenuItem icon={<IconUser />}>Profile</MenuItem>
      </NavigationMenu>
    </div>
  )
}
