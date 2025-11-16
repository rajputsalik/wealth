// import arcjet, { createMiddleware, detectBot, shield } from "@arcjet/next";
// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// const isProtectedRoute = createRouteMatcher([
//   "/dashboard(.*)",
//   "/account(.*)",
//   "/transaction(.*)",
// ]);

// // Create Arcjet middleware
// const aj = arcjet({
//   key: process.env.ARCJET_KEY,
//   // characteristics: ["userId"], // Track based on Clerk userId
//   rules: [
//     // Shield protection for content and security
//     shield({
//       mode: "LIVE",
//     }),
//     detectBot({
//       mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
//       allow: [
//         "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
//         "GO_HTTP", // For Inngest
//         // See the full list at https://arcjet.com/bot-list
//       ],
//     }),
//   ],
// });

// // Create base Clerk middleware
// const clerk = clerkMiddleware(async (auth, req) => {
//   const { userId } = await auth();

//   if (!userId && isProtectedRoute(req)) {
//     const { redirectToSignIn } = await auth();
//     return redirectToSignIn();
//   }

//   return NextResponse.next();
// });

// // Chain middlewares - ArcJet runs first, then Clerk
// export default createMiddleware(aj, clerk);

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     // Always run for API routes
//     "/(api|trpc)(.*)",
//   ],
// };








// this is the new middleware.js after recent edits and simplification and to deploy successfully

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import arcjet, { detectBot, shield } from "@arcjet/next"; // <-- Removed 'createMiddleware'
import { NextResponse } from "next/server";

// Initialize Arcjet client
const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    // Shield protection for content and security
    shield({
      mode: "LIVE",
    }),
    // Bot detection
    detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
        "GO_HTTP", // For Inngest
      ],
    }),
  ],
});

// Define protected routes for Clerk
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/account(.*)",
  "/transaction(.*)",
]);

// This is the single, composed middleware export
export default clerkMiddleware(async (auth, req) => {
  // Get the authenticated userId from Clerk
  const { userId } = auth();

  // 1. Run Arcjet protection first.
  // We pass the userId to Arcjet (if it exists) for better tracking.
  try {
    const decision = await aj.protect(req, {
      userId: userId ?? undefined, // Pass userId to Arcjet
    });

    if (decision.isDenied()) {
      // If Arcjet blocks the request, return its response (e.g., 403 Forbidden)
      return decision.respond();
    }
  } catch (e) {
    console.error("Arcjet error:", e);
    // If Arcjet fails, we'll log it but not block the request
  }

  // 2. If Arcjet passes, run Clerk's authentication logic.
  if (!userId && isProtectedRoute(req)) {
    // If the user is not authenticated and is trying to access a protected route,
    // redirect them to the sign-in page.
    return auth().redirectToSignIn();
  }

  // 3. If all checks pass, allow the request to continue.
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
