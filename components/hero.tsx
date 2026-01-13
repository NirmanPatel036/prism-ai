"use client"

import Link from "next/link"
import dynamic from "next/dynamic"
import { Pill } from "./pill"
import { Button } from "./ui/button"
import { useState } from "react"

const GL = dynamic(() => import("./gl").then(mod => ({ default: mod.GL })), {
  ssr: false,
})

export function Hero() {
  const [hovering, setHovering] = useState(false)
  return (
    <div className="flex flex-col min-h-svh justify-center items-center">
      <GL hovering={hovering} />

      <div className="text-center relative z-10">
        <Pill className="mb-6">RISK MONITOR v1.0</Pill>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-sentient leading-[1.1] tracking-tight">
          Real-time Ethics & <br />
          <i className="font-light">Law</i> Compliance
        </h1>
        <p className="font-mono text-xs sm:text-sm text-foreground/60 text-balance mt-8 max-w-125 mx-auto leading-relaxed">
          The fine-tuned "second brain" for your communication. Guarding GDPR, legal risk, and social sensitivity in
          every keystroke.
        </p>

        <p className="font-mono text-[9px] text-foreground/40 mt-3">(Initial latency ~50s)</p>

        <div className="flex flex-wrap justify-center gap-4 mt-12 px-4">
          <Link href="https://huggingface.co/nirmanpatel/llama-risk-compliant" target="_blank">
            <Button
              variant="outline"
              className="text-[10px] h-8 px-5 uppercase tracking-wider bg-transparent"
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              [Hosted on Hugging Face]
            </Button>
          </Link>
          <Link href="https://github.com/NirmanPatel036/prism-ai" target="_blank">
            <Button
              className="text-[10px] h-8 px-5 uppercase tracking-wider"
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              [View on GitHub]
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
