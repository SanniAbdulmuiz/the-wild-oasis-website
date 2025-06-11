"use server"; //Jonas used this server component to handle form actions in the signIn and signOut button but I later did it on the client because it didn't work for me.. so it was no longer needed.
import { revalidatePath } from "next/cache";
import { auth, signIn } from "./auth";
import { supabase } from "./supabase";
export async function signInAction() {
  await signIn("google", { redirectTo: "/account" }); //Was signing In but wasn't redirecting, so I had to use a client component
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
