"use client";
import { TrashIcon } from "@heroicons/react/24/solid";
import { deleteReservation } from "../_library/action";
import { useTransition } from "react";
import SpinnerMini from "./SpinnerMini";

export default function DeleteReservation({ bookingId }) {
  const [isPending, startTransition] = useTransition(); //We're using this instead of the "usertatus" because we directly called a server action "deleteReservation" from a button not a form

  function handleDelete() {
    if (confirm("Are you sure you want to delete this reservation"))
      startTransition(() => deleteReservation(bookingId));
  }
  return (
    <button
      onClick={handleDelete}
      className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
    >
      {!isPending ? (
        <>
          {" "}
          <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
          <span className="mt-1">Delete</span>{" "}
        </>
      ) : (
        <span className="mx-auto">
          {" "}
          <SpinnerMini />
        </span>
      )}
    </button>
  );
}
