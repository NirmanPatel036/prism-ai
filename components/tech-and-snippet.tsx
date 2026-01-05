export function TechStack() {
  const technologies = [
    { name: "Llama-3" },
    { name: "Unsloth" },
    { name: "FastAPI" },
    { name: "Hugging Face" },
    { name: "Chrome API" },
    { name: "React" },
  ]

  return (
    <div className="py-12 border-y border-border/20">
      <p className="text-center font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-8">
        Powered By Industry Standards
      </p>
      <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
        {technologies.map(({ name }) => (
          <div key={name} className="flex items-center gap-2">
            <span className="font-sentient text-lg md:text-xl">{name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function CodePreview() {
  return (
    <div className="max-w-3xl mx-auto my-24 p-1 rounded-3xl bg-linear-to-b from-primary/20 to-transparent">
      <div className="bg-[#0a0a0a] rounded-[calc(1.5rem-1px)] p-8 border border-white/5">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-3 h-3 rounded-full bg-red-500/20" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
          <div className="w-3 h-3 rounded-full bg-green-500/20" />
          <span className="ml-4 font-mono text-xs text-foreground/40">prism_compliance_monitor.py</span>
        </div>
        <div className="space-y-6 font-mono text-sm leading-relaxed">
          <div className="flex gap-4">
            <span className="text-red-400 shrink-0">INPUT:</span>
            <span className="text-foreground/60">"Please send the details to 123 Maple St, NY."</span>
          </div>
          <div className="h-px bg-white/5" />
          <div className="flex gap-4">
            <span className="text-primary shrink-0">OUTPUT:</span>
            <div>
              <span className="text-primary/80">
                "Potential PII detected. Recommendation: Redact specific address."
              </span>
              <p className="mt-2 text-foreground/80">"Please send the details to [REDACTED ADDRESS]."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
