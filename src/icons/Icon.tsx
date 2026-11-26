import * as React from 'react'
import { cn } from '@/lib/utils'
import { iconData, type IconName } from './icon-data'

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'name'> {
  /** Which Yotto icon to draw. */
  name: IconName
  /** Width and height in px. Default 24. Inside Button and other components, size is set for you. */
  size?: number | string
  /**
   * Accessible name. Leave empty for decorative icons next to text (they are hidden
   * from screen readers). Set it for icon-only buttons, e.g. `label="Search"`.
   */
  label?: string
}

/**
 * Yotto icon. Colour comes from the surrounding text colour (`currentColor`),
 * so use text classes to colour it: `<Icon name="Boat" className="text-primary" />`.
 */
export function Icon({ name, size = 24, label, className, ...props }: IconProps) {
  const shape = iconData[name]
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={shape.viewBox}
      width={size}
      height={size}
      fill="currentColor"
      data-slot="icon"
      data-icon={name}
      className={cn('shrink-0', className)}
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true, focusable: false })}
      {...props}
    >
      {shape.paths.map((d) => (
        <path key={d.slice(0, 24)} d={d} />
      ))}
    </svg>
  )
}

/** Props for the named icon components (`IconBoat`, …). */
export type IconComponentProps = Omit<IconProps, "name">

export function IconArrowRight(props: IconComponentProps) {
  return <Icon name="ArrowRight" {...props} />
}
export function IconArrowLeft(props: IconComponentProps) {
  return <Icon name="ArrowLeft" {...props} />
}
export function IconArrowDown(props: IconComponentProps) {
  return <Icon name="ArrowDown" {...props} />
}
export function IconArrowUp(props: IconComponentProps) {
  return <Icon name="ArrowUp" {...props} />
}
export function IconChevronUp(props: IconComponentProps) {
  return <Icon name="ChevronUp" {...props} />
}
export function IconChevronRight(props: IconComponentProps) {
  return <Icon name="ChevronRight" {...props} />
}
export function IconChevronDown(props: IconComponentProps) {
  return <Icon name="ChevronDown" {...props} />
}
export function IconChevronLeft(props: IconComponentProps) {
  return <Icon name="ChevronLeft" {...props} />
}
export function IconPassword(props: IconComponentProps) {
  return <Icon name="Password" {...props} />
}
export function IconCalendar(props: IconComponentProps) {
  return <Icon name="Calendar" {...props} />
}
export function IconLocation(props: IconComponentProps) {
  return <Icon name="Location" {...props} />
}
export function IconFavLine(props: IconComponentProps) {
  return <Icon name="FavLine" {...props} />
}
export function IconFavFill(props: IconComponentProps) {
  return <Icon name="FavFill" {...props} />
}
export function IconCheck(props: IconComponentProps) {
  return <Icon name="Check" {...props} />
}
export function IconCancel(props: IconComponentProps) {
  return <Icon name="Cancel" {...props} />
}
export function IconEye(props: IconComponentProps) {
  return <Icon name="Eye" {...props} />
}
export function IconBoat(props: IconComponentProps) {
  return <Icon name="Boat" {...props} />
}
export function IconPerson(props: IconComponentProps) {
  return <Icon name="Person" {...props} />
}
export function IconStar(props: IconComponentProps) {
  return <Icon name="Star" {...props} />
}
export function IconYotto(props: IconComponentProps) {
  return <Icon name="Yotto" {...props} />
}
export function IconInfo(props: IconComponentProps) {
  return <Icon name="Info" {...props} />
}
export function IconEngine(props: IconComponentProps) {
  return <Icon name="Engine" {...props} />
}
export function IconUser(props: IconComponentProps) {
  return <Icon name="User" {...props} />
}
export function IconDotMenu(props: IconComponentProps) {
  return <Icon name="DotMenu" {...props} />
}
export function IconAdd(props: IconComponentProps) {
  return <Icon name="Add" {...props} />
}
export function IconRemove(props: IconComponentProps) {
  return <Icon name="Remove" {...props} />
}
export function IconLogout(props: IconComponentProps) {
  return <Icon name="Logout" {...props} />
}
export function IconDocument(props: IconComponentProps) {
  return <Icon name="Document" {...props} />
}
export function IconNotification(props: IconComponentProps) {
  return <Icon name="Notification" {...props} />
}
export function IconSearch(props: IconComponentProps) {
  return <Icon name="Search" {...props} />
}
export function IconEdit(props: IconComponentProps) {
  return <Icon name="Edit" {...props} />
}
