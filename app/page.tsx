"use client"

import { useEffect } from "react"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { TrainingCharts } from "@/components/training-charts"
import { Methodology, BentoFeatures } from "@/components/sections"
import { TechStack, CodePreview } from "@/components/tech-and-snippet"
import { ClientOnly } from "@/components/ClientOnly"
import { Leva } from "leva"
import { Github, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="bg-background text-foreground min-h-screen selection:bg-primary selection:text-black">
      <Leva hidden />
      <Header />
      <Hero />
      <div className="relative z-10 bg-background">
        <TechStack />
        <section id="benchmarks" className="py-24 border-b border-border/10">
          <div className="container mb-12 text-center">
            <h2 className="text-3xl font-sentient mb-4">Training Benchmarks</h2>
            <p className="font-mono text-sm text-foreground/50">Llama-3-8B Fine-tuning on 1,000+ Dilemmas</p>
          </div>
          <ClientOnly>
            <TrainingCharts />
          </ClientOnly>
        </section>
        <Methodology />
        <CodePreview />
        <BentoFeatures />

        <footer className="py-12 border-t border-border/10 bg-background/50 backdrop-blur-sm">
          <div className="container flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2 justify-center md:justify-start">
                <span className="font-sentient text-base tracking-tighter">PrismAI</span>
              </Link>
              <p className="font-mono text-[10px] text-foreground/40 max-w-xs leading-relaxed">
                Precision monitoring for enterprise ethics and legal compliance. Risk Monitor v1.0
              </p>
              <Link
                href="/privacy-policy"
                className="font-mono text-[9px] text-foreground/40 hover:text-foreground/60 transition-colors"
              >
                Privacy Policy
              </Link>
            </div>

            <div className="flex flex-col items-center md:items-end gap-6">
              <div className="flex justify-center items-center gap-6">
                <a
                  href="https://x.com/nirman_patel_09?s=21"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/40 hover:text-foreground/80 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/NirmanPatel036"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/40 hover:text-foreground/80 transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com/in/nirmanpatel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/40 hover:text-foreground/80 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
              <p className="font-mono text-[9px] text-foreground/20 uppercase tracking-widest">
                © 2026 Nirman Patel. Mahindra University.
              </p>
            </div>
          </div>
        </footer>
      </div>
      <Leva hidden />
    </main>
  )
}
