/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */ export const publicRoutes = ["/", "/auth/new-verification"] as const
/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const loginRoute = "/auth/login"
export const authRoutes = [
  loginRoute,
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
] as const
/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth"

/**
 * The default route to redirect users to after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings"
