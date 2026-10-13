import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import {
  coverName,
  coveredWeekHours,
  dayNames,
  dayStaffShare,
  days,
  euro,
  gap,
  hoursBudget,
  hoursFor,
  orderLines,
  reorderNames,
  rota,
  shiftLabel,
  staffShare,
  stock,
  takings,
  toReorder,
  weekHours,
  weekTakings,
} from "./sample-data"
import styles from "./plates.module.css"

/** Takings by day. With `animated`, bars rise one after another when `revealed` turns on. */
export function Bars({ revealed = true, animated = false }: { revealed?: boolean; animated?: boolean }) {
  const peak = Math.max(...takings)
  return (
    <div className={styles.bars}>
      {takings.map((value, index) => (
        <div key={days[index]} className={styles.barColumn}>
          <div
            className={cn(styles.barFill, animated && styles.barGrow, value === peak && styles.barPeak)}
            style={{ height: revealed ? `${(value / peak) * 100}%` : 0, transitionDelay: animated ? `${index * 80}ms` : undefined }}
          />
          <span className={styles.day}>{days[index]}</span>
        </div>
      ))}
    </div>
  )
}

/** `covered` fills the Saturday-evening gap; `cue` names that cell for the demo cursor. */
export function RotaGrid({ covered = false, cue }: { covered?: boolean; cue?: string }) {
  return (
    <>
      <div className={styles.rota}>
        <span />
        {days.map((day, index) => (
          <span key={day} className={cn(styles.day, index === gap.day && (covered ? styles.dayDone : styles.dayFlag))}>
            {day}
          </span>
        ))}
        <span />
        {rota.map((person, row) => {
          const shifts = person.shifts.map((shift, day) => (covered && row === gap.row && day === gap.day ? gap.shift : shift))
          return (
            <div key={person.name} className="contents">
              <span className={styles.name}>{person.name}</span>
              {shifts.map((shift, day) => {
                const isGap = row === gap.row && day === gap.day
                return (
                  <span
                    key={days[day]}
                    data-cue={isGap ? cue : undefined}
                    className={cn(
                      styles.shift,
                      shift === "off" ? styles.off : shift === "late" ? styles.late : styles.early,
                      isGap && covered && styles.pop,
                    )}
                  >
                    <span>{shiftLabel[shift]}</span>
                  </span>
                )
              })}
              <span className={styles.hours}>{hoursFor(shifts)}</span>
            </div>
          )
        })}
      </div>
      <div className={styles.foot}>
        <span className={cn(styles.flag, covered && styles.flagDone)}>
          <span className={styles.flagDot} />
          {covered ? "Saturday evening covered" : "Saturday evening is one short"}
        </span>
        <span>{covered ? coveredWeekHours : weekHours} of {hoursBudget} hours</span>
      </div>
    </>
  )
}

/** `ordered` turns the low items from "Reorder" to "Ordered". */
export function StockRows({ ordered = false }: { ordered?: boolean }) {
  return (
    <div className={styles.stock}>
      {stock.map((line) => {
        const low = line.onHand < line.minimum
        return (
          <div key={line.item} className="contents">
            <span className={styles.item}>{line.item}</span>
            <span className={styles.count}>{line.onHand} / {line.full}</span>
            <span className={styles.track}>
              <span className={cn(styles.fill, low && styles.fillLow)} style={{ width: `${(line.onHand / line.full) * 100}%` }} />
              <span className={styles.minimum} style={{ left: `${(line.minimum / line.full) * 100}%` }} />
            </span>
            <span className={cn(styles.status, low && (ordered ? styles.statusDone : styles.statusLow))}>
              {low ? (ordered ? "Ordered" : "Reorder") : "OK"}
            </span>
          </div>
        )
      })}
    </div>
  )
}

/** One recognisable situation: the thing itself on the left, the facts of the moment beside it. */
export function Moment({ description, time, facts, layout = "phone", children }: {
  description: string
  time: string
  facts: [string, string][]
  layout?: "phone" | "chart" | "panel"
  children: ReactNode
}) {
  return (
    <div role="img" aria-label={`Illustration with sample data: ${description}`} className={styles.wrap}>
      <div aria-hidden className={styles.plate}>
        <div className={cn(styles.moment, layout === "chart" && styles.momentChart, layout === "panel" && styles.momentPanel)}>
          {children}
          <div className={styles.margin}>
            <p className={styles.marginTime}>{time}</p>
            <div className={styles.facts}>
              {facts.map(([key, value]) => (
                <p key={key} className={styles.fact}>
                  <span className={styles.factKey}>{key}</span>
                  <span>{value}</span>
                </p>
              ))}
            </div>
          </div>
          <span className={styles.corner}>Sample data</span>
        </div>
      </div>
    </div>
  )
}

export function Phone({ time, children }: { time: string; children: ReactNode }) {
  return (
    <div className={styles.phone}>
      <div className={styles.screen}>
        <div className={styles.statusBar}>
          <span>{time}</span>
          <span className={styles.notch} />
          <span>5G</span>
        </div>
        {children}
      </div>
    </div>
  )
}

/** Monday, before opening: last week arrives as one notification that nobody had to write. */
export function MondayPlate() {
  return (
    <Moment
      description="a phone lock screen on Monday morning with one notification summarising last week and flagging two things for this week"
      time="Monday · 08:00"
      facts={[
        ["Built", "07:55, by itself"],
        ["From", "Till export, rota, stock count"],
        ["Typed by", "Nobody"],
      ]}
    >
      <Phone time="08:00">
        <p className={styles.clock}>08:00</p>
        <p className={styles.date}>Monday 12 October</p>
        <div className={styles.notification}>
          <p className={styles.notificationHead}><span className={styles.appMark} /><span>Weekly summary</span><span>now</span></p>
          <p className={styles.notificationTitle}>Last week is in</p>
          <p className={styles.notificationBody}>
            {euro(weekTakings)} taken, up 6%. Staff cost {staffShare} of takings.
          </p>
          <p className={styles.notificationBody}>
            This week: {dayNames[gap.day]} evening is one person short. {reorderNames} are low.
          </p>
        </div>
        <div className={cn(styles.notification, styles.notificationQuiet)}>
          <p className={styles.notificationHead}><span className={styles.appMark} /><span>Stock</span><span>07:41</span></p>
          <p className={styles.notificationTitle}>Order for Tuesday is ready to send</p>
        </div>
      </Phone>
    </Moment>
  )
}

/** A short shift is noticed when the rota is made, and the person who is off is asked. */
export function CoverPlate() {
  const day = dayNames[gap.day]
  const shift = shiftLabel[gap.shift]
  return (
    <Moment
      description={`a phone conversation in which a short ${day} evening shift is flagged and ${coverName} agrees to cover it`}
      time="Monday · 09:20"
      facts={[
        ["Gap", `${day} evening, one short`],
        ["Off that day", coverName],
        ["Asked with", "One message"],
        ["Rota", "Updated for everyone"],
      ]}
    >
      <Phone time="09:20">
        <p className={styles.appHead}><span className={styles.appMark} />Rota</p>
        <div className={styles.alert}>
          <p className={styles.alertTitle}>{day} {shift} has one person</p>
          <p>You usually need two. {coverName} is off that day.</p>
          <span className={styles.pill}>Ask {coverName}</span>
        </div>
        <p className={cn(styles.bubble, styles.bubbleOut)}>{coverName}, can you cover {day} {shift}?</p>
        <p className={cn(styles.bubble, styles.bubbleIn)}><span className={styles.sender}>{coverName}</span>Yes, I can do that.</p>
        <p className={styles.resolved}><span>✓</span>Covered. Everyone has the new rota.</p>
      </Phone>
    </Moment>
  )
}

/** The count is done on a phone, and what is below its minimum becomes the order. */
export function CountPlate() {
  const shown = stock.filter((line) => line.onHand < line.minimum || line.item.startsWith("Oat"))
  return (
    <Moment
      description="a phone stock count with two items below their minimum and an order written from them"
      time="Monday · 07:40"
      facts={[
        ["Counted", `${stock.length} items`],
        ["Below minimum", String(toReorder.length)],
        ["Order", "Written for you"],
        ["Delivery", "Tuesday"],
      ]}
    >
      <Phone time="07:40">
        <p className={styles.appHead}><span className={styles.appMark} />Stock count</p>
        {shown.map((line) => {
          const low = line.onHand < line.minimum
          return (
            <div key={line.item} className={styles.countRow}>
              <p className={styles.countName}>
                {line.item}
                <span className={cn(styles.countTag, low && styles.countTagLow)}>
                  {low ? `Below minimum of ${line.minimum}` : `Minimum ${line.minimum}`}
                </span>
              </p>
              <p className={styles.stepper}>
                <span className={styles.stepButton}>−</span>
                <span className={cn(styles.stepValue, low && styles.stepValueLow)}>{line.onHand}</span>
                <span className={styles.stepButton}>+</span>
              </p>
            </div>
          )
        })}
        <div className={styles.order}>
          <p className={styles.orderTitle}>Order for Tuesday</p>
          {orderLines.map((line) => <p key={line.item}>{line.quantity} × {line.item}</p>)}
          <span className={styles.pill}>Send to supplier</span>
        </div>
      </Phone>
    </Moment>
  )
}

/** Staff cost against takings, day by day: the quiet days cost the most to run. */
export function DaysPlate() {
  const highest = Math.max(...dayStaffShare)
  const lowest = Math.min(...dayStaffShare)
  const named = (share: number) => dayNames.filter((_, day) => dayStaffShare[day] === share).join(" and ")
  return (
    <Moment
      layout="chart"
      description={`staff cost as a share of takings for each day of the week, highest on ${named(highest)} and lowest on ${named(lowest)}`}
      time="Staff cost by day"
      facts={[
        ["Highest", `${named(highest)}, ${highest}%`],
        ["Lowest", `${named(lowest)}, ${lowest}%`],
        ["Last week", staffShare],
        ["This week", `${dayNames[gap.day]} evening is one short`],
      ]}
    >
      <div className={styles.shareChart}>
        <span className={styles.chartLabel}>Staff cost as a share of takings</span>
        <div className={styles.average} style={{ bottom: `calc(1.6em + (100% - 3.6em) * ${Number.parseInt(staffShare) / highest})` }}>
          <span>Week {staffShare}</span>
        </div>
        {dayStaffShare.map((share, day) => (
          <div key={days[day]} className={cn(styles.shareColumn, share === highest && styles.shareHigh, share === lowest && styles.shareLow)}>
            <div className={styles.shareTrack}>
              <div className="flex w-full flex-col items-center gap-[0.45em]" style={{ height: `${(share / highest) * 100}%` }}>
                <span className={styles.shareValue}>{share}%</span>
                <div className={cn(styles.shareBar, "flex-1")} />
              </div>
            </div>
            <span className={styles.day}>{days[day]}</span>
          </div>
        ))}
      </div>
    </Moment>
  )
}
