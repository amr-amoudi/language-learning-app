'use client'

import { useEffect, useState } from "react";

export default function CardProgressBar({ mark }: { mark: number }) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    setWidth(mark * 5)
  }, [])

  function getProgressBarBackgroundColor(): string {
    switch (mark) {
      case 0:
        return "";
      case 5:
        return "bg-app_red-light";
      case 10:
        return "bg-yellow-300";
      case 15:
        return "bg-green-500";
      default:
        return "bg-purple-500";
    }
  }

  return (
    <div className="w-[95%] h-2.5 bg-app_orange z-20 absolute bottom-2 left-1/2 -translate-x-1/2 rounded-2xl">
      <div
        className={`transition-all duration-500 h-full rounded-2xl ${getProgressBarBackgroundColor()}`}
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
}










