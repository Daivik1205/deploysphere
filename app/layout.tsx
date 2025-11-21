import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "DeploySphere",
  description: "Build. Deploy. Scale. — DeploySphere",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Ensure mobile devices render properly */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Google Fonts: Space Grotesk for headings, Inter for body */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Space+Grotesk:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased text-white">
        {children}
      </body>
    </html>
  );
}
