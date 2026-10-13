import type { Metadata } from "next"
import { BookingPlate, EnquiryPlate, PaidPlate, PaperPlate, ReviewsPlate, ShopPlate } from "@/components/samples/service-plates"

export const metadata: Metadata = {
  title: "Picture reference",
  robots: { index: false, follow: false },
}

const plates = [
  ["enquiry", <EnquiryPlate key="enquiry" />],
  ["booking", <BookingPlate key="booking" />],
  ["paid", <PaidPlate key="paid" />],
  ["paper", <PaperPlate key="paper" />],
  ["reviews", <ReviewsPlate key="reviews" />],
  ["shop", <ShopPlate key="shop" />],
] as const

// Every picture in its finished state, in the two frame shapes the site uses.
// A fixed reference to photograph before and after the pictures' files are moved or pruned.
export default function PlateReference() {
  return (
    <main className="mx-auto max-w-[1100px] space-y-10 bg-[#0d0e10] px-6 py-28">
      {plates.map(([name, plate]) => (
        <section key={name} className="flex flex-wrap items-start gap-8">
          <div data-ref={`${name}-wide`} className="relative aspect-[16/10] w-[592px] overflow-clip rounded-lg bg-[#0b0c0e]">
            <div className="absolute inset-x-0 -bottom-8 -top-8">{plate}</div>
          </div>
          <div data-ref={`${name}-narrow`} className="relative aspect-[4/5] w-[358px] overflow-clip rounded-lg bg-[#0b0c0e]">
            <div className="absolute inset-x-0 -bottom-8 -top-8">{plate}</div>
          </div>
        </section>
      ))}
    </main>
  )
}
