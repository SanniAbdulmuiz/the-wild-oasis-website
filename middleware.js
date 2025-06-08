// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      return !!token; // if token exists, user is authenticated
    },
  },
  pages: {
    signIn: "/login", // Optional: custom sign-in redirect
  },
});

export const config = {
  matcher: ["/account"], // protect this route
};

// import { auth } from "@/app/_library/auth";
// export const middleware = auth;

// export const config = {
//   matcher: ["/account"],
// };

// import { NextResponse } from "next/server";

// export function middleware(request) {
//   console.log(request);

//   return NextResponse.redirect(new URL("/about", request.url))
// }

// export const config = {
//     matcher: ["/account", "/cabins"],//Anytime we click on account or cabins page, it redirects us to the about page
// }
