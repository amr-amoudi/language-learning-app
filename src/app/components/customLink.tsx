"use client"


import Link from 'next/link'
import { AnchorHTMLAttributes, ReactNode } from 'react'
import { useLocalStorage } from '../lib/useLocalStorage';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
  className?: string;
}

export default function CustomLink({ href, className, children, ...rest }: Props) {
  const [wantedText, _] = useLocalStorage('lang', '');
  const fallbackText = children
  return <Link className={className} href={href} {...rest}>{
    wantedText ? wantedText : fallbackText
  }</Link>
}
