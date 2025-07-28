import { auth } from "../_library/auth";
import Nav from "./Nav";

export default async function Navigation() {
  const session = await auth();

  return <Nav session={session} />;
}
