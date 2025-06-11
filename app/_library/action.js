"use server"; //Jonas used this server component to handle form actions in the signIn and signOut button but I later did it on the client.. so it was no longer needed.
import { signIn } from "./auth";
export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}
