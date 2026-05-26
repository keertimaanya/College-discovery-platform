import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SavedProvider } from "@/context/SavedContext";
import { CompareProvider } from "@/context/CompareContext";
import { NavigationProgressBar } from "@/components/layout/NavigationProgressBar";

export const metadata: Metadata = {
  title: "College Discovery Platform",
  description: "Find and compare the best colleges for your future.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col min-h-screen bg-gray-50 text-gray-900 antialiased font-sans">
        <SavedProvider>
          <CompareProvider>
            {/* Top thin loading progress bar */}
            <NavigationProgressBar />
            
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </CompareProvider>
        </SavedProvider>
      </body>
    </html>
  );
}
