import { Shield, Brain, Zap, Globe, Scale, Users } from "lucide-react"

export function Methodology() {
  const phases = [
    {
      title: "Synthetic Data Generation",
      description: "Creating golden datasets of 1,000+ legal and ethical dilemmas to stress-test model boundaries.",
      icon: <Globe className="w-5 h-5 text-primary" />,
    },
    {
      title: "Fine-Tuning",
      description: "Optimization of Llama-3-8B using Unsloth & QLoRA for 70% memory reduction and 2x inference speed.",
      icon: <Brain className="w-5 h-5 text-primary" />,
    },
    {
      title: "Real-Time Guardrails",
      description: "Direct Chrome Extension integration for live DOM monitoring and proactive correction.",
      icon: <Shield className="w-5 h-5 text-primary" />,
    },
  ]

  return (
    <section id="methodology" className="py-24 container">
      <h2 className="text-3xl font-sentient mb-12 text-center">Our Methodology</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {phases.map((phase, i) => (
          <div key={i} className="p-8 rounded-2xl bg-border/10 border border-border/20 backdrop-blur-md">
            <div className="mb-4">{phase.icon}</div>
            <h3 className="text-xl font-sentient mb-3">{phase.title}</h3>
            <p className="text-foreground/60 font-mono text-sm leading-relaxed">{phase.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function BentoFeatures() {
  return (
    <section id="features" className="py-24 container">
      <h2 className="text-3xl font-sentient mb-12 text-center">Enterprise Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px]">
        <FeatureCard
          className="md:col-span-2"
          title="Real-time GDPR Leak Detection"
          description="Spotting Personally Identifiable Information (PII) before it leaves the browser. Automatic redaction of addresses, SSNs, and private credentials."
          icon={<Shield className="w-6 h-6" />}
        />
        <FeatureCard
          title="Unconscious Bias Audit"
          description="Flagging gender and racial bias in HR and corporate communication."
          icon={<Users className="w-6 h-6" />}
        />
        <FeatureCard
          title="Legal Guardrails"
          description="Preventing violations of 'Opt-out' and international privacy laws."
          icon={<Scale className="w-6 h-6" />}
        />
        <FeatureCard
          className="md:col-span-2"
          title="ZeroGPU Scalability"
          description="Powered by Hugging Face's dynamic inference engine for seamless enterprise-wide deployment without dedicated hardware."
          icon={<Zap className="w-6 h-6" />}
        />
      </div>
    </section>
  )
}

function FeatureCard({ title, description, icon, className = "" }: any) {
  return (
    <div
      className={`p-8 rounded-3xl bg-border/5 border border-border/10 flex flex-col justify-end group hover:bg-border/10 transition-all duration-300 ${className}`}
    >
      <div className="mb-auto text-primary">{icon}</div>
      <h3 className="text-lg font-sentient mb-2">{title}</h3>
      <p className="text-sm text-foreground/60 font-mono line-clamp-3">{description}</p>
    </div>
  )
}
