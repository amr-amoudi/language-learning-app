'use client'

import { ReactNode, useEffect, useState } from "react"
import { createPortal } from "react-dom";

interface ErrorBannerProps {
  children: ReactNode;
  dellay?: number;
  rerunder?: boolean;
  spacing?: number
}

export default function ErrorBanner({ children, dellay = 2000, rerunder, spacing }: ErrorBannerProps) {
  const [display, setDisplay] = useState(true)

  useEffect(() => {
    setDisplay(true);
    const timeout = setTimeout(() => setDisplay(false), dellay);
    return () => clearTimeout(timeout);
  }, [dellay, rerunder])

  const topStyle = spacing !== undefined ? { top: `${spacing}px` } : { top: '20px' };

  return createPortal(
    <div
      className={`fixed left-0 z-10000 w-[50%] bg-app_red-light h-15 rounded-r-lg text-app_yellow px-3 py-2 animate-slide-in ${!display ? '-translate-x-full' : ''} transition-all`}
      style={topStyle}
    >
      Error: {children}
    </div>,
    document.body
  )
}
