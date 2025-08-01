'use client'

import { useState, useEffect, ReactElement } from "react"
import ErrorBanner from "../components/ErrorBanner"


export default function useDisplayError(messages: string[], timeDellay: number): [ReactElement[], (messages: string[]) => void] {
  const [displayErrors, setDisplayErrors] = useState<{ display: boolean, messages: string[] }>({ display: false, messages: messages })

  function pushMessages(messages: string[]) {
    setDisplayErrors({ display: true, messages: messages })
  }

  useEffect(() => {
    if (displayErrors.display && displayErrors.messages) {
      const timeOut = setTimeout(() => {
        setDisplayErrors({ display: false, messages: [] })
      }, timeDellay + 300)

      return () => clearTimeout(timeOut)
    }
  }, [displayErrors])


  const element = displayErrors.messages.map((message: string, index: number) => {
    if (message && displayErrors.display) {
      const spaceBetweenErrors = index === 0 ? 20 : index * 80 + 20;
      return <ErrorBanner spacing={spaceBetweenErrors} dellay={timeDellay} rerunder={displayErrors.display}>{message}</ErrorBanner>
    } else {
      return <></>
    }
  })


  return [element, pushMessages]
}

