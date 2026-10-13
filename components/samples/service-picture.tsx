import type { ReactNode } from "react"
import type { Service } from "@/content/services"
import { BookingPlate, EnquiryPlate, PaidPlate, PaperPlate, ReviewsPlate, ShopPlate } from "./service-plates"

const pictures: Record<Service["id"], ReactNode> = {
  enquiries: <EnquiryPlate />,
  bookings: <BookingPlate />,
  "getting-paid": <PaidPlate />,
  paperwork: <PaperPlate />,
  "online-shop": <ShopPlate />,
  reviews: <ReviewsPlate />,
}

/** The code-drawn picture for a service. An illustration on sample data, not client work. */
export function ServicePicture({ id }: { id: Service["id"] }) {
  return pictures[id]
}
