import { ReactNode } from "react";
import "@/app/globals.css"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "vocaty",
  description: "vocabilary learning app",
};

export default function layOut({ children }: { children: ReactNode }) {
  return (
    <html>
      <body className="bg-app_blue">
        {children}
      </body>
    </html>
  )
}
