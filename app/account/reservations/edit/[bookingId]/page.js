import { getBooking } from "@/app/_library/data-service";
import { updateReservation } from "@/app/_library/action";
import SubmitButton from "@/app/_components/SubmitButton";

export const metadata = {
  title: "Edit reservation",
};

export default async function Page({ params }) {
  const reservationId = Number(params.bookingId);
  const booking = await getBooking(reservationId);
  const maxCapacity = booking.cabins.maxCapacity;

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>

      <form
        action={updateReservation}
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      >
        <input type="hidden" name="bookingId" value={reservationId} />

        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            required
            defaultValue={booking.numGuests}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          >
            <option value="">Select number of guests...</option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option key={x} value={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            defaultValue={booking.observations || ""}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <SubmitButton pendingLabel="Updating...">
            Update reservation
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}

// export default function Page() {
//   // CHANGE
//   const reservationId = 23;
//   const maxCapacity = 23;

//   return (
//     <div>
//       <h2 className="font-semibold text-2xl text-accent-400 mb-7">
//         Edit Reservation #{reservationId}
//       </h2>

//       <form className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col">
//         <div className="space-y-2">
//           <label htmlFor="numGuests">How many guests?</label>
//           <select
//             name="numGuests"
//             id="numGuests"
//             className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
//             required
//           >
//             <option value="" key="">
//               Select number of guests...
//             </option>
//             {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
//               <option value={x} key={x}>
//                 {x} {x === 1 ? "guest" : "guests"}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="space-y-2">
//           <label htmlFor="observations">
//             Anything we should know about your stay?
//           </label>
//           <textarea
//             name="observations"
//             className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
//           />
//         </div>

//         <div className="flex justify-end items-center gap-6">
//           <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
//             Update reservation
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
