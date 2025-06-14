"use server"; //Jonas used this server component to handle form actions in the signIn and signOut button but I later did it on the client because it didn't work for me.. so it was no longer needed.
import { revalidatePath } from "next/cache";
import { auth, signIn } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function createReservation(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) throw new Error("Booking could not be created");

  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
}

export async function updateReservation(formData) {
  const bookingId = Number(formData.get("bookingId")); // 🔥 Fix: convert to number

  //Authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  //Authorization
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingsIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking, FUCK YOU.🙂");

  //Building update data
  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };

  //Mutations
  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId);

  //Error handling
  if (error) throw new Error("Booking could not be updated");

  //Redirection and revalidation
  revalidatePath("/account/reservations");
  //revalidatePath(`/account/reservations/edit/${bookingId}`); Not needed.
  redirect("/account/reservations");
}

export async function deleteReservation(bookingId) {
  //FOR TESTING
  //await new Promise((res) => setTimeout(res, 2000));
  //throw new Error();

  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((bookings) => bookingId);

  if (!guestBookingIds.includes(bookingId))
    throw new Error(
      "You are not allowed to delete these bookings, fuck you.🙂"
    );

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");
  revalidatePath("/account/reservations");
}

export async function updateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationality, countryFlag, nationalID };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" }); //Was signing In but wasn't redirecting, so I had to use a client component
}
