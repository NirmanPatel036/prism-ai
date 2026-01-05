"use client"

import Link from "next/link"
import { MobileMenu } from "./mobile-menu"

export const Header = () => {
  return (
    <div className="absolute top-0 left-0 right-0 z-50 pt-6 md:pt-10">
      <header className="flex items-center justify-between container">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-sentient text-lg tracking-tighter">PrismAI</span>
        </Link>
        <nav className="flex max-lg:hidden absolute left-1/2 -translate-x-1/2 items-center justify-center gap-x-8">
          {["Methodology", "Features", "Benchmarks"].map((item) => (
            <button
              className="uppercase inline-block font-mono text-[11px] text-foreground/60 hover:text-foreground/100 duration-150 transition-colors ease-out"
              key={item}
              onClick={() => {
                const section = document.getElementById(item.toLowerCase())
                section?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              {item}
            </button>
          ))}
          {/* Add scroll-to-footer functionality for Contact */}
          <button
            className="uppercase inline-block font-mono text-[11px] text-foreground/60 hover:text-foreground/100 duration-150 transition-colors ease-out"
            onClick={() => {
              const footer = document.querySelector("footer")
              footer?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            Contact
          </button>
        </nav>
        <Link
          className="uppercase max-lg:hidden transition-colors ease-out duration-150 font-mono text-[11px] text-primary hover:text-primary/80"
          href="/#sign-in"
        >
          Launch Monitor
        </Link>
        <MobileMenu />
      </header>
    </div>
  )
}
