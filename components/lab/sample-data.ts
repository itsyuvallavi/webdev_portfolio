// One made-up business and one made-up week, shared by every illustration so the
// figures agree with each other: takings sum to the weekly total, rota hours sum
// to the hours quoted, and an item flagged in one screen is flagged in the others.

export const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const
export const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const
export const takings = [1420, 1510, 1680, 1890, 2480, 3120, 2180]
export const weekTakings = takings.reduce((sum, value) => sum + value, 0)
export const covers = 1142
export const hoursBudget = 220
export const staffCost = 4430
export const staffShare = `${Math.round((staffCost / weekTakings) * 100)}%`

export type Shift = "early" | "late" | "mid" | "off"
export const shiftLabel: Record<Shift, string> = { early: "08–16", late: "16–24", mid: "10–16", off: "" }
const shiftHours: Record<Shift, number> = { early: 8, late: 8, mid: 6, off: 0 }

export const rota: { name: string; shifts: Shift[] }[] = [
  { name: "Ana", shifts: ["early", "early", "early", "early", "early", "off", "off"] },
  { name: "Tiago", shifts: ["off", "late", "late", "late", "late", "late", "off"] },
  { name: "Inês", shifts: ["mid", "off", "mid", "off", "early", "early", "early"] },
  { name: "Rui", shifts: ["late", "early", "off", "early", "late", "early", "late"] },
  { name: "Marta", shifts: ["early", "late", "late", "off", "early", "early", "early"] },
]
/** Saturday evening has one person on; the first row is free to cover it. */
export const gap = { row: 0, day: 5, shift: "late" as Shift }

export const hoursFor = (shifts: Shift[]) => shifts.reduce((sum, shift) => sum + shiftHours[shift], 0)
export const weekHours = rota.reduce((sum, person) => sum + hoursFor(person.shifts), 0)
export const coveredWeekHours = weekHours + shiftHours[gap.shift]
/** Who is off on the day of the gap and can be asked to cover it. */
export const coverName = rota[gap.row].name

/** Hours worked on each day, before the gap is covered. */
const dayHours = days.map((_, day) => rota.reduce((sum, person) => sum + shiftHours[person.shifts[day]], 0))
/** Staff cost as a whole-number percentage of each day's takings, at one hourly cost for the week. */
export const dayStaffShare = dayHours.map((hours, day) => Math.round(((hours * staffCost) / weekHours / takings[day]) * 100))

export const stock = [
  { item: "Coffee beans, 1 kg", onHand: 4, full: 12, minimum: 6 },
  { item: "Oat milk, 1 L", onHand: 18, full: 24, minimum: 8 },
  { item: "Flour T55, 25 kg", onHand: 2, full: 3, minimum: 1 },
  { item: "Olive oil, 5 L", onHand: 1, full: 4, minimum: 2 },
  { item: "Takeaway cups, sleeve", onHand: 9, full: 10, minimum: 3 },
  { item: "Eggs, tray of 30", onHand: 5, full: 8, minimum: 2 },
]
export const toReorder = stock.filter((line) => line.onHand < line.minimum)

/** What to buy to bring each low item back to full. */
export const orderLines = toReorder.map((line) => ({ item: line.item, quantity: line.full - line.onHand }))

export const shortName = (item: string) => item.split(",")[0]
export const euro = (value: number) => `€${value.toLocaleString("en-GB")}`
/** "Coffee beans and olive oil" */
export const reorderNames = toReorder
  .map((line, index) => (index === 0 ? shortName(line.item) : shortName(line.item).toLowerCase()))
  .join(" and ")
