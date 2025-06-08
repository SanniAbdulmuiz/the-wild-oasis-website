"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function SignInButton() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/account";

  return (
    <button
      className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium"
      onClick={() => signIn("google", { callbackUrl })}
    >
      <img
        src="https://authjs.dev/img/providers/google.svg"
        alt="Google logo"
        height="24"
        width="24"
      />
      <span>Continue with Google</span>
    </button>
  );
}

// const { signInAction } = require("../_library/action");

// function SignInButton() {
//   return (
//     <form action={signInAction}>
//       <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium">
//         <img
//           src="https://authjs.dev/img/providers/google.svg"
//           alt="Google logo"
//           height="24"
//           width="24"
//         />
//         <span>Continue with Google</span>
//       </button>
//     </form>
//   );
// }

// export default SignInButton;
