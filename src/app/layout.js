import NavBar from "@/components/ui-library/NavBar";
import "./globals.css";
import ReduxProviders from "./providers/reduxProvider";
import SessionProvider from "./providers/sessionProvider";
import MaterialUIThemeProvider from "./providers/materialUIThemeProvider";
import { getServerSession } from "next-auth";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

export const metadata = {
  title: "Dragonborn Booksellers",
  description: "Dragonborn Booksellers",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body>
        <SessionProvider session={session}>
          <AppRouterCacheProvider>
            <ReduxProviders>
              <MaterialUIThemeProvider>
                <NavBar>{children}</NavBar>
              </MaterialUIThemeProvider>
            </ReduxProviders>
          </AppRouterCacheProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
