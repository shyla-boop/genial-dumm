import "./globals.css";
import type { Metadata } from "next";
import { Nav } from "@/components/nav";

export const metadata: Metadata = {
  title: "genial dumm",
  description: "Die verrücktesten Challenges warten auf dich!",
  manifest: "/manifest.webmanifest",
  themeColor: "#2C0A65",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <div className="min-h-screen flex flex-col">
          <main className="flex-1 flex justify-center">
            <div className="w-full max-w-md px-5 pt-10 pb-28 safe-area">
              {children}
            </div>
          </main>
          <Nav />
        </div>
      </body>
    </html>
  );
}
