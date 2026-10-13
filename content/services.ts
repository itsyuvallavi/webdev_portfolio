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
}

export const services: readonly Service[] = [
  {
    id: "enquiries",
    name: "Enquiries",
    title: "Every enquiry answered.",
    summary: "An assistant replies in seconds from your prices and diary, books the slot, and hands over to you when it is unsure.",
    featured: true,
  },
  {
    id: "bookings",
    name: "Bookings",
    title: "A full diary, fewer calls.",
    summary: "Online booking, a reminder the day before, and a cancelled slot offered to the waiting list automatically.",
    featured: true,
  },
  {
    id: "getting-paid",
    name: "Getting paid",
    title: "Invoices that chase themselves.",
    summary: "Polite reminders go out on schedule and stop the moment a client pays. You see what is owed at a glance.",
    featured: true,
  },
  {
    id: "paperwork",
    name: "Paperwork",
    title: "Photograph it. It files itself.",
    summary: "Supplier invoices and receipts are read, checked and sent to your accountant's folder, with anything unclear flagged.",
    featured: true,
  },
  {
    id: "online-shop",
    name: "Online shop",
    title: "Sell while the shop is shut.",
    summary: "A fast shop with the ways people here pay, stock that updates itself, and an order message on your phone.",
    featured: false,
  },
  {
    id: "reviews",
    name: "Reviews",
    title: "More reviews, and a reply to every one.",
    summary: "Customers are asked the day after a visit. Replies are drafted for you and sent when you approve.",
    featured: false,
  },
]

export const featuredServices = services.filter((service) => service.featured)
