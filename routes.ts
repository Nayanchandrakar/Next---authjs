/**
 * An array of public routes that is accessible
 * to not-authenticated users
 * @type {string[]}
 */
export const publicRoutes = ["/", "/about"];

/**
 * These Api Routes are for only authentication purpose
 * A non-authenticated user can acces it without any proble
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register"];

/**
 * This route is accessible to use api freely
 * without blocking the main authentication endpoint of auth JS
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/user";
