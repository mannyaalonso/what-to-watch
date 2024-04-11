// Importing necessary modules and styles
import type { Metadata } from "next" // Importing the Metadata type from Next.js
import { Inter } from "next/font/google" // Importing the Inter font from Google Fonts
import "./globals.css" // Importing global CSS styles

// Initializing the Inter font with Latin subset
const inter = Inter({ subsets: ["latin"] })

// Metadata for the application
export const metadata: Metadata = {
  title: "What to Watch", // Title of the application
  description: "Movie recommendations by AI", // Description of the application
}

// Root layout component for the application
export default function RootLayout({
  children, // Children components to be rendered within the layout
}: Readonly<{
  children: React.ReactNode // Type definition for children prop
}>) {
  return (
    <html lang="en">
      {/* HTML document with lang attribute set to English */}
      <body className={inter.className}>{children}</body>
      {/* Applying Inter font class to the body and rendering children */}
    </html>
  )
}
