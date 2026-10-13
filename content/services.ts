/**
 * The services, in the order they are shown. Draft wording.
 * The picture for each one is chosen by `id` in `components/samples/service-picture.tsx`.
 */
export interface Service {
  id: "enquiries" | "bookings" | "getting-paid" | "paperwork" | "online-shop" | "reviews"
  /** Short name, used in labels and menus. */
  name: string
  title: string
  summary: string
  /** Shown on Home. All six are on the Services page. */
  featured: boolean
  /** What it does, in the order it happens. */
  does: readonly string[]
  /** What the owner supplies. */
  needs: readonly string[]
  /** The tools it connects to. */
  worksWith: string
  /** What it will not do. Stated on the page so nothing is promised by omission. */
  limit: string
}

export const services: readonly Service[] = [
  {
    id: "enquiries",
    name: "Enquiries",
    title: "Enquiries answered, day and night.",
    summary: "An automatic assistant replies in seconds from your prices and calendar, books the slot, and hands over to you when it is unsure.",
    featured: true,
    does: [
      "Answers questions about prices, opening hours and availability, at any hour.",
      "Books the slot, or takes the details for you to confirm.",
      "Sends you a short summary of each conversation.",
    ],
    needs: ["Your prices, opening hours and the questions you are asked most.", "Access to the calendar you use, if it should book for you."],
    worksWith: "Your website's chat or contact form, and email. WhatsApp is sometimes possible; I check in the first conversation. It does not answer phone calls.",
    limit: "It always says that it is automatic. It hands the conversation to you when it is unsure, or when the customer asks for a person.",
  },
  {
    id: "bookings",
    name: "Bookings",
    title: "Fewer empty slots, fewer calls.",
    summary: "Online booking, a reminder the day before, and a cancelled slot offered to the waiting list automatically.",
    featured: true,
    does: [
      "Customers book online at any hour, from your website or a link.",
      "A reminder goes out the day before, with a way to confirm, cancel or move.",
      "A cancelled slot is offered to the people on your waiting list.",
    ],
    needs: ["Your services, how long each one takes and who does it.", "The calendar you use today, if you want to keep it."],
    worksWith: "Google Calendar or the booking tool you already pay for. If that tool can already do this, I set it up properly instead of building a new one.",
    limit: "Text-message reminders are charged per message by the provider. Email reminders are not.",
  },
  {
    id: "getting-paid",
    name: "Getting paid",
    title: "Invoice reminders, sent for you.",
    summary: "Polite reminders go out on schedule and stop once your invoicing program shows the invoice as paid. You see what is owed in one list.",
    featured: true,
    does: [
      "Shows what is owed and what is late, in one list.",
      "Sends polite reminders on a schedule you choose, and stops when the invoice is paid.",
      "Tells you when a reminder has gone unanswered, so you can call.",
    ],
    needs: ["Read access to your invoicing program, or a regular export from it.", "The wording and timing you are comfortable with."],
    worksWith: "Most invoicing programs that offer an export or read access. I check yours first.",
    limit: "It never creates or changes an invoice. Your invoicing program still issues every one.",
  },
  {
    id: "paperwork",
    name: "Paperwork",
    title: "Photograph it. It is filed for you.",
    summary: "Supplier invoices and receipts are read, checked and sent to your accountant's folder, with anything unclear flagged.",
    featured: true,
    does: [
      "Reads supplier invoices and receipts from a photo or a PDF: supplier, date, amounts and VAT.",
      "Checks that the figures add up, and marks anything it could not read.",
      "Files each document in the folder you share with your accountant, with a list for the month.",
    ],
    needs: ["A few weeks of real documents to test on.", "The folder or tool your accountant wants to receive them in."],
    worksWith: "Your phone's camera or an email inbox, and a shared folder such as Google Drive or Dropbox.",
    limit: "Reading is not perfect. Anything it is unsure about is marked for you to check, and nothing is sent to the tax authority.",
  },
  {
    id: "online-shop",
    name: "Online shop",
    title: "Sell while the shop is closed.",
    summary: "A fast shop with the ways people here pay, stock that updates with each online order, and an order message on your phone.",
    featured: false,
    does: [
      "A fast shop for a small range, built to work well on a phone.",
      "Payment by card and by the methods people here use, such as MB WAY and Multibanco, through a payment provider.",
      "Stock goes down with each online sale, and each order arrives as a message.",
    ],
    needs: ["Photos, prices and stock for your products.", "An account with a payment provider, which I help you open."],
    worksWith: "A payment provider, and your invoicing program, which still issues the invoice for each sale.",
    limit: "I build the shop and hand it over. Delivery, returns and customer service stay with you.",
  },
  {
    id: "reviews",
    name: "Reviews",
    title: "Ask every customer for a review. Reply to each one.",
    summary: "Customers are asked the day after a visit. Replies are drafted for you and sent when you approve.",
    featured: false,
    does: [
      "Asks each customer for a review the day after a visit, with one link.",
      "Drafts a reply to every new review, in your voice.",
      "Tells you first when a review is low, so you can answer it yourself.",
    ],
    needs: ["Access to your Google Business Profile.", "A few replies you have written, so the drafts sound like you."],
    worksWith: "Google Business Profile, and the list of visits from your calendar or booking tool.",
    limit: "Every customer is asked, not only the happy ones. No reply is posted until you approve it.",
  },
]

export const featuredServices = services.filter((service) => service.featured)
