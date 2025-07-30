import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import DeleteReservation from "./DeleteReservation";
import Image from "next/image";
import Link from "next/link";

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

export default function ReservationCard({ booking, onDelete }) {
  const {
    id,
    guestId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    status,
    created_at,
    cabins: { name, image },
  } = booking;

  return (
    <div className="flex flex-col sm:flex-row border border-primary-800">
      {/* Image */}
      <div className="relative h-48 sm:h-auto sm:w-32">
        <Image
          src={image}
          alt={`Cabin ${name}`}
          fill
          className="object-cover sm:border-r border-primary-800"
        />
      </div>

      {/* Info Section */}
      <div className="flex-grow px-4 py-4 flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h3 className="text-xl font-semibold">
            {numNights} nights in Cabin {name}
          </h3>
          <span
            className={`h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm ${
              isPast(new Date(startDate))
                ? "bg-yellow-800 text-yellow-200"
                : "bg-green-800 text-green-200"
            }`}
          >
            {isPast(new Date(startDate)) ? "past" : "upcoming"}
          </span>
        </div>

        <p className="text-lg text-primary-300">
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>

        <div className="flex flex-col sm:flex-row sm:gap-5 mt-auto sm:items-baseline gap-1">
          <p className="text-xl font-semibold text-accent-400">${totalPrice}</p>
          <p className="hidden sm:block text-primary-300">&bull;</p>
          <p className="text-lg text-primary-300">
            {numGuests} guest{numGuests > 1 && "s"}
          </p>
          <p className="sm:ml-auto text-sm text-primary-400">
            Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
          </p>
        </div>
      </div>

      {/* Edit/Delete Buttons */}
      {!isPast(startDate) && (
        <div className="flex flex-row sm:flex-col border-t sm:border-t-0 sm:border-l border-primary-800">
          <Link
            href={`/account/reservations/edit/${id}`}
            className="group flex items-center justify-center gap-2 uppercase text-xs font-bold text-primary-300 border-r sm:border-b sm:border-r-0 border-primary-800 px-3 py-4 hover:bg-accent-600 transition-colors hover:text-primary-900 w-full"
          >
            <PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
            <span className="mt-1">Edit</span>
          </Link>

          <DeleteReservation bookingId={id} onDelete={onDelete} />
        </div>
      )}
    </div>
  );
}
