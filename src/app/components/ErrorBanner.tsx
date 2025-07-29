'use client'

import { ReactNode, useEffect, useState } from "react"
import { createPortal } from "react-dom";

interface ErrorBannerProps {
  children: ReactNode;
  dellay?: number;
}

export default function ErrorBanner({ children, dellay = 2000 }: ErrorBannerProps) {
  const [display, setDisplay] = useState(true)

  useEffect(() => {
    setDisplay(true);
    const timeout = setTimeout(() => setDisplay(false), dellay);
    return () => clearTimeout(timeout);
  }, [children])

  if (!display) return null

  return createPortal(
    <div className="fixed top-20 left-0 z-10000 w-[50%] bg-app_red-light h-15 rounded-r-lg text-app_yellow animate-slide-in px-3 py-2">
      Error: {children}
    </div>,
    document.body
  )
}
