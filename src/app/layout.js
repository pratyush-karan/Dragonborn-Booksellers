import NavBar from "@/components/NavBar";
import "./globals.css";
import Providers from "./providers";
import SessionProvider from "./sessionProvider";
import { getServerSession } from "next-auth";

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
          <Providers>
            <NavBar>{children}</NavBar>
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
