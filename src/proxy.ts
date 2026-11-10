import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export const proxy = createMiddleware(routing);

export const config = {
    // Ignore les fichiers techniques, images et l'API
    matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
