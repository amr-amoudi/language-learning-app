'use client'

import { Dispatch, ReactNode, SetStateAction, useEffect, useState, createContext } from "react"
import { createPortal } from "react-dom"

interface PhoneModalProps {
  children?: ReactNode;
  showContentBorder?: boolean;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export interface ModalContextType {
  isOpen: boolean,
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const ModalContext = createContext<ModalContextType>({ isOpen: false, setIsOpen: () => { } })

export default function PhoneModal({ children, showContentBorder = false, isOpen, setIsOpen }: PhoneModalProps) {
  const [isVisible, setIsVisible] = useState<boolean>(isOpen);
  const [shouldRender, setShouldRender] = useState<boolean>(isOpen); // Controls mounting/unmounting for animation

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 10); // A small delay to allow `shouldRender` to take effect before the transition
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false); // Start the exit animation
      const timer = setTimeout(() => {
        setShouldRender(false); // Unmount after the exit animation completes
      }, 300); // This duration should match CSS transition-duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Effect to disable/enable scrolling
  useEffect(() => {
    if (shouldRender && isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isVisible, shouldRender]);

  if (!shouldRender) {
    return null;
  }

  return createPortal(
    <ModalContext.Provider value={{ isOpen: isOpen, setIsOpen: setIsOpen }}>
      <div
        onClick={() => setIsOpen(false)} // Set isClosed to true to trigger closing sequence
        className={`
        md:hidden
        fixed left-0 top-0 w-screen h-screen z-[999]
        bg-[rgba(50,50,50,0.6)]
        transition-opacity duration-300 ease-in-out
        ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`
          bg-app_yellow fixed z-[1000] bottom-0 w-screen h-[60%] rounded-t-2xl
          transition-transform duration-300 ease-in-out
          ${isVisible ? 'translate-y-0' : 'translate-y-full'}
        `}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-0 top-0 text-3xl px-4 cursor-pointer"
          >
            &#120;
          </button>

          <div
            className={`
            w-full h-full mt-8 overflow-y-scroll
            ${showContentBorder ? 'border-2 border-blue-600' : ''}
          `}
          >
            {children}
          </div>
        </div>
      </div>
    </ModalContext.Provider>,
    document.body
  )
}
