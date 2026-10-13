import type { CSSProperties, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Phone } from "./plates"
import styles from "./plates.module.css"

// Six services chosen from demand research, one mockup each. Every business,
// person and figure here is invented, and sums are computed so they agree.
// Each picture plays one short sequence while it is on screen (see the cue
// classes in the stylesheet) and shows its finished state otherwise.

const euro = (value: number) => `€${value.toLocaleString("en-GB", { minimumFractionDigits: value % 1 ? 2 : 0 })}`

/** The thing itself on a lit stage, with a headline figure and a few facts beside it. */
function Scene({ description, time, figure, facts, layout = "phone", children }: {
  description: string
  time: string
  figure: { value: string; label: string }
  facts: [string, string][]
  layout?: "phone" | "panel"
  children: ReactNode
}) {
  return (
    <div role="img" aria-label={`Illustration with sample data: ${description}`} className={styles.wrap}>
      <div aria-hidden className={styles.plate}>
        <div className={cn(styles.moment, styles.scene, layout === "panel" && styles.momentPanel)}>
          <div className={cn(styles.stage, layout === "panel" && styles.stageCenter)}>{children}</div>
          <div className={styles.margin}>
            <p className={styles.marginTime}>{time}</p>
            <div>
              <p className={styles.bigFigure}>{figure.value}</p>
              <p className={styles.bigLabel}>{figure.label}</p>
            </div>
            <div className={styles.facts}>
              {facts.map(([key, value]) => (
                <p key={key} className={styles.fact}>
                  <span className={styles.factKey}>{key}</span>
                  <span>{value}</span>
                </p>
              ))}
            </div>
            <p className={styles.sampleNote}>Sample data</p>
          </div>
          <span className={cn(styles.corner, styles.cornerNarrow)}>Sample data</span>
        </div>
      </div>
    </div>
  )
}

/** The enquiry mockup itself, without the notes: shared by its picture and the day walkthrough. */
export function EnquiryObject() {
  return (
    <>
      <Phone time="22:47">
        <p className={styles.appHead}>
          <span className={styles.appMark} />
          <span>Bairro Physio<span className={styles.appSub}>Automatic assistant</span></span>
        </p>
        <p className={cn(styles.bubble, styles.bubbleOut)}>Hi, anything Thursday after 6? First visit, lower back.</p>
        <p className={cn(styles.bubble, styles.bubbleIn)}>Thursday 18:30 or 19:15 with Sofia. First visit €45. Book one?</p>
        <p className={cn(styles.bubble, styles.bubbleOut, styles.inA)}>18:30 please</p>
        <div className={styles.swap}>
          <span className={cn(styles.typing, styles.betweenBC)}><i /><i /><i /></span>
          <p className={cn(styles.bubble, styles.bubbleIn, styles.inC)}>Booked: Thursday at 18:30.</p>
        </div>
      </Phone>
      <div className={cn(styles.float, styles.floatDiary)}>
        <p className={styles.floatTitle}><span>Diary</span><span>Thu 15 Oct</span></p>
        <p className={cn(styles.slot, styles.slotNew, styles.inC)}><span>18:30</span><span>New · first visit</span></p>
        <p className={styles.slot}><span>19:15</span><span className={styles.floatMuted}>Free</span></p>
      </div>
    </>
  )
}

/** An enquiry that arrives after closing is answered and booked, and the slot fills in the diary. */
export function EnquiryPlate() {
  return (
    <Scene
      description="a late-evening message to a clinic answered by an automatic assistant, which offers two times and books one into the diary"
      time="Tuesday · 22:47"
      figure={{ value: "22:47", label: "Asked after closing" }}
      facts={[
        ["Answered", "In seconds"],
        ["Booked", "Thursday 18:30"],
        ["If unsure", "Asks a person"],
      ]}
    >
      <EnquiryObject />
    </Scene>
  )
}

const diary = [
  { time: "09:30", who: "Marta", what: "Colour", status: "Confirmed", tone: "ok" },
  { time: "11:00", who: "João", what: "Cut", status: "Confirmed", tone: "ok" },
  { time: "12:00", who: "Inês", what: "Cut", status: "Cancelled", tone: "gone" },
  { time: "12:00", who: "Rita", what: "Cut", status: "Waiting list", tone: "new" },
  { time: "14:30", who: "Pedro", what: "Trim", status: "No reply yet", tone: "warn" },
] as const
const kept = diary.filter((slot) => slot.tone !== "gone")
const confirmed = kept.filter((slot) => slot.tone === "ok" || slot.tone === "new").length

/** The booking mockup itself, without the notes: shared by its picture and the day walkthrough. */
export function BookingObject() {
  return (
    <>
      <div className={styles.panelCard}>
        <p className={styles.panelHead}><span>Today</span><span>Thursday 15 October</span></p>
        {diary.map((slot) => {
          const row = (
            <p key={`${slot.time}${slot.who}`} className={cn(styles.row, slot.tone === "new" && styles.inD)}>
              <span className={styles.rowTime}>{slot.time}</span>
              <span className={cn(styles.rowMain, slot.tone === "gone" && cn(styles.rowGone, styles.strikeA))}>
                {slot.who} <span className={styles.rowSub}>· {slot.what}</span>
              </span>
              <span className={cn(styles.chip, (slot.tone === "ok" || slot.tone === "new") && styles.chipOk, slot.tone === "warn" && styles.chipWarn)}>
                {slot.status}
              </span>
            </p>
          )
          if (slot.tone !== "new") return row
          // The freed slot reads as open until the waiting-list reply arrives.
          return (
            <div key={`${slot.time}${slot.who}`} className={cn(styles.swap, styles.swapRow)}>
              <p className={cn(styles.row, styles.outD)}>
                <span className={styles.rowTime}>{slot.time}</span>
                <span className={cn(styles.rowMain, styles.rowSub)}>Open slot</span>
                <span className={styles.chip}>Offered</span>
              </p>
              {row}
            </div>
          )
        })}
      </div>
      <div className={cn(styles.float, styles.floatMessage, styles.inB)}>
        <p className={styles.floatTitle}><span>Message to Rita</span><span>08:12</span></p>
        <p>A 12:00 slot has opened today. Reply YES to take it.</p>
        <span className={cn(styles.reply, styles.inC)}>YES</span>
      </div>
    </>
  )
}

/** Reminders go out the day before, and a cancelled slot is offered to the waiting list. */
export function BookingPlate() {
  return (
    <Scene
      layout="panel"
      description="a salon's diary for the day in which a cancelled appointment is offered to the waiting list by message and refilled"
      time="Thursday · 08:30"
      figure={{ value: `${confirmed} of ${kept.length}`, label: "Confirmed by reply" }}
      facts={[
        ["Reminders", "Sent the day before"],
        ["Cancelled", "12:00, at 08:10"],
        ["Refilled", "From the waiting list by 08:25"],
      ]}
    >
      <BookingObject />
    </Scene>
  )
}

const invoices = [
  { client: "Atelier Norte", amount: 1250, status: "Paid", tone: "ok", owed: false, overdue: false },
  { client: "Casa Lima", amount: 980, status: "Paid", tone: "ok", owed: false, overdue: false },
  { client: "Estúdio Vale", amount: 2150, status: "12 days late", tone: "warn", owed: true, overdue: true },
  { client: "Oficina Sete", amount: 1640, status: "Due in 5 days", tone: "none", owed: true, overdue: false },
] as const
const total = (rows: readonly { amount: number }[]) => rows.reduce((sum, row) => sum + row.amount, 0)
const owed = invoices.filter((invoice) => invoice.owed)
const late = invoices.find((invoice) => invoice.overdue)!

/** The paid mockup itself, without the notes: shared by its picture and the day walkthrough. */
export function PaidObject() {
  return (
    <>
      <div className={styles.panelCard}>
        <p className={styles.panelHead}><span>Invoices</span><span>October</span></p>
        {invoices.map((invoice) => (
          <p key={invoice.client} className={cn(styles.row, styles.rowMoney)}>
            <span className={styles.rowMain}>{invoice.client}</span>
            <span className={styles.amount}>{euro(invoice.amount)}</span>
            <span className={cn(styles.chip, invoice.tone === "ok" && styles.chipOk, invoice.tone === "warn" && styles.chipWarn)}>
              {invoice.status}
            </span>
          </p>
        ))}
      </div>
      <div className={cn(styles.float, styles.floatTimeline, styles.inA)}>
        <p className={styles.floatTitle}><span>{late.client}</span><span>{euro(late.amount)}</span></p>
        <div className={styles.steps}>
          <p className={styles.step}><span>Invoice sent</span><span>16 Sep</span></p>
          <p className={styles.step}><span>Reminder</span><span>5 Oct</span></p>
          <p className={cn(styles.step, styles.stepNow, styles.inC)}><span>Reminder</span><span>Today 09:00</span></p>
        </div>
      </div>
    </>
  )
}

/** What is owed, what is late, and reminders that go out on schedule and stop when a client pays. */
export function PaidPlate() {
  return (
    <Scene
      layout="panel"
      description="a list of this month's invoices with one overdue, and the schedule of reminders already sent for it"
      time="Monday · 09:00"
      figure={{ value: euro(total(owed)), label: `Owed on ${owed.length} invoices` }}
      facts={[
        ["Late", `${euro(late.amount)}, reminded twice`],
        ["Reminders", "Polite, on schedule, stop when paid"],
        ["Invoices", "Still issued by your invoicing program"],
      ]}
    >
      <PaidObject />
    </Scene>
  )
}

const lines = [
  { item: "Oranges, 20 kg", net: 38.0 },
  { item: "Tomatoes, 15 kg", net: 41.25 },
  { item: "Mixed leaves, 12 boxes", net: 86.4 },
  { item: "Lemons, 10 kg", net: 22.5 },
  { item: "Herbs and delivery", net: 126.0 },
]
const net = lines.reduce((sum, line) => sum + line.net, 0)
const vat = Math.round(net * 23) / 100
const gross = net + vat

/** The paper mockup itself, without the notes: shared by its picture and the day walkthrough. */
export function PaperObject() {
  return (
    <>
      <div className={styles.paperWrap}>
        <div className={styles.paperStack}>
          <span className={styles.paperBack} />
          <div className={styles.paper}>
            <span className={styles.scanLine} />
            <p className={styles.paperHead}><span className={cn(styles.found, styles.markA)}>Frutas do Cais</span><span>Invoice</span></p>
            <p className={styles.paperMeta}>
              <span className={cn(styles.found, styles.markA)}>9 Oct 2026</span>
              <span>Due <span className={cn(styles.unclear, styles.markB)} style={{ "--mark": "#d97706" } as CSSProperties}>2? Oct</span></span>
            </p>
            {lines.map((line) => (
              <p key={line.item} className={styles.paperLine}><span>{line.item}</span><span>{line.net.toFixed(2)}</span></p>
            ))}
            <p className={styles.paperTotal}>
              <span>Net</span><span>{net.toFixed(2)}</span>
              <span>VAT 23%</span><span>{vat.toFixed(2)}</span>
              <span><strong>Total</strong></span><span className={cn(styles.found, styles.markC)}><strong>{gross.toFixed(2)}</strong></span>
            </p>
          </div>
        </div>
      </div>
      <div className={cn(styles.float, styles.floatFolder, styles.inD)}>
        <p className={styles.floatTitle}><span>Accountant&apos;s folder</span><span>Oct</span></p>
        <p><span className={styles.floatStrong}>Frutas do Cais</span> · {euro(gross)}</p>
        <p className={styles.floatMuted}>Filed with 13 others this month</p>
      </div>
    </>
  )
}

/** A photographed supplier invoice is read, checked and filed, with anything unclear flagged. */
export function PaperPlate() {
  return (
    <Scene
      layout="panel"
      description="a photographed supplier invoice being scanned, with its supplier, date and total picked out and filed, and an unreadable due date flagged for a person to check"
      time="Photographed · 10:14"
      figure={{ value: euro(gross), label: "Read from the photo" }}
      facts={[
        ["Supplier", "Frutas do Cais, 9 October"],
        ["VAT", `${euro(vat)} at 23%`],
        ["Check", "Due date unreadable"],
      ]}
    >
      <PaperObject />
    </Scene>
  )
}

function Stars({ count }: { count: number }) {
  return <span className={styles.stars}>{"★".repeat(count)}<span>{"★".repeat(5 - count)}</span></span>
}

// Share of the 212 reviews at each star rating, five stars first. Averages to 4.7.
const distribution = [80, 14, 3, 2, 1]

/** The reviews mockup itself, without the notes: shared by its picture and the day walkthrough. */
export function ReviewsObject() {
  return (
    <>
      <div className={styles.panelCard}>
        <div className={styles.ratingHead}>
          <div>
            <p className={styles.ratingValue}>4.7</p>
            <p><Stars count={5} /></p>
          </div>
          <div className={styles.distribution}>
            {distribution.map((share, index) => (
              <p key={index}><span>{5 - index}</span><i style={{ width: `${share}%` }} /></p>
            ))}
          </div>
        </div>
        <div className={styles.review}>
          <p className={styles.reviewHead}><span><Stars count={5} /> Joana</span><span>2 days ago</span></p>
          <p>Booked online in a minute and the reminder was handy. Lovely result.</p>
          <p className={styles.floatMuted}>Reply drafted for you</p>
          <p className={cn(styles.draft, styles.inB)}>
            <span>Thank you, Joana. Glad booking was easy. See you next time.</span>
            <span className={cn(styles.chip, styles.chipOk)}>Approve</span>
          </p>
        </div>
      </div>
      <div className={cn(styles.float, styles.floatFlag, styles.inD)}>
        <p className={styles.floatTitle}><span>Needs you</span><span>Today</span></p>
        <p><Stars count={2} /> <span className={styles.floatStrong}>Rui</span></p>
        <p>Waited 25 minutes past my appointment.</p>
      </div>
    </>
  )
}

/** Customers are asked for a review; replies are drafted and wait for the owner's approval. */
export function ReviewsPlate() {
  return (
    <Scene
      layout="panel"
      description="a business's rating with a new five-star review and a reply drafted for approval, and a two-star review flagged to the owner"
      time="Friday · 17:10"
      figure={{ value: "14", label: "New reviews this month" }}
      facts={[
        ["Asked", "By message, the day after a visit"],
        ["Replies", "Drafted, sent when you approve"],
        ["Low scores", "Flagged to you first"],
      ]}
    >
      <ReviewsObject />
    </Scene>
  )
}

const mug = { name: "Stoneware mug", price: 18, quantity: 2, stock: 12 }

/** The shop mockup itself, without the notes: shared by its picture and the day walkthrough. */
export function ShopObject() {
  return (
    <>
      <Phone time="15:20">
        <p className={styles.appHead}><span className={styles.appMark} />Largo Store</p>
        <div className={styles.product}><span className={styles.mug} /></div>
        <div className={styles.thumbs}><i /><i /><i /></div>
        <p className={styles.productTitle}>
          <span>{mug.name} <span className={styles.stockNote}>· {mug.stock} left</span></span>
          <span>{euro(mug.price)}</span>
        </p>
        <p className={styles.option}><span>Quantity</span><span>{mug.quantity}</span></p>
        <p className={styles.option}><span>Collect</span><span>Today from 16:00</span></p>
        <p className={styles.pay}>Pay {euro(mug.price * mug.quantity)} with MB WAY</p>
      </Phone>
      <div className={cn(styles.float, styles.floatOrder, styles.inB)}>
        <p className={styles.floatTitle}><span>New order</span><span>15:21</span></p>
        <p><span className={styles.floatStrong}>{mug.quantity} × {mug.name}</span></p>
        <p className={styles.floatMuted}>{euro(mug.price * mug.quantity)} · paid by MB WAY</p>
        <span className={cn(styles.reply, styles.inC)}>Collect 16:00</span>
      </div>
    </>
  )
}

/** A small shop that takes an order and payment on a phone, and tells the owner straight away. */
export function ShopPlate() {
  return (
    <Scene
      description="a phone showing a shop's product page with a mug, a pickup time and a pay button, and the order notice the owner receives"
      time="Saturday · 15:20"
      figure={{ value: euro(mug.price * mug.quantity), label: "Paid before they arrive" }}
      facts={[
        ["Pay with", "MB WAY or card"],
        ["Stock", `${mug.stock} to ${mug.stock - mug.quantity}, by itself`],
        ["You hear", "By message"],
      ]}
    >
      <ShopObject />
    </Scene>
  )
}
