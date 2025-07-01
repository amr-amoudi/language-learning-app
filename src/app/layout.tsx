import { ReactNode } from "react";
import '@/app/globals.css'

interface props {
  children: ReactNode
}

export default function Layout({ children }: props) {
  return (
    <html>
      <body className="bg-[#0B0C10]">
        {children}
      </body>
    </html>
  )
}
