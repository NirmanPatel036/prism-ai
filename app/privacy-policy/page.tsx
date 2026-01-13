import type { Metadata } from "next"
import { Github, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy - PrismAI",
  description: "Privacy policy for PrismAI Risk Monitor",
}

export default function PrivacyPolicy() {
  return (
    <main className="bg-background text-foreground min-h-screen pt-24">
      <article className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-sentient mb-2">Privacy Policy</h1>
        <p className="font-mono text-xs text-foreground/50 mb-8">
          <i>Last Updated: January 13, 2026</i>
        </p>

        <p className="mb-6">
          This Privacy Policy describes how Prism-AI collects, uses, and handles your information when you use our
          Chrome extension and associated services.
        </p>

        <section className="mb-12">
          <h2 className="text-xl font-sentient mb-4">1. Information We Collect</h2>
          <p className="mb-4">
            In order to provide GDPR and ethical compliance auditing, we collect and process the following categories of
            data:
          </p>
          <ul className="list-square pl-5 space-y-2 mb-6">
            <li>
              Website Content: When you initiate a compliance check, our extension reads the text content of the active
              browser tab.
            </li>
            <li>
              Personally Identifiable Information: This includes names, email addresses, and identification numbers
              contained within the text you analyze.
            </li>
            <li>
              Financial Information: This includes credit card numbers and bank details identified during the redaction
              process.
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-sentient mb-4">2. How We Use Information</h2>
          <p className="mb-4">We use the collected information solely for the following purposes:</p>
          <ul className="list-square pl-5 space-y-2 mb-6">
            <li>To identify and redact sensitive personal information from your text.</li>
            <li>To analyze content for ethical risks and GDPR compliance.</li>
            <li>To provide real-time advice on data privacy and security.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-sentient mb-4">3. Data Transmission and Security</h2>
          <p className="mb-4">We prioritize the security of your data through the following measures:</p>
          <ul className="list-square pl-5 space-y-2 mb-6">
            <li>
              Encryption: All data is encrypted during transmission between your browser and our inference engine using
              TLS 1.3.
            </li>
            <li>
              No Retention: We do not store or log the text content you analyze. Data is processed in volatile memory
              and is cleared immediately after the analysis is complete.
            </li>
            <li>
              Infrastructure: We utilize secure, isolated serverless environments to ensure your data is never
              accessible to other users or unauthorized parties.
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-sentient mb-4">4. Disclosure of Information</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal information to outside parties. Data is only
            shared with our technical infrastructure providers (such as Modal or Vercel) for the sole purpose of
            executing the analysis you request.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-sentient mb-4">5. Your Rights and Choices</h2>
          <p>
            You have the right to access the data we process on your behalf. Because we do not store your data after a
            session ends, your rights are primarily exercised by controlling the extension's access to your browser. You
            can disable the extension or revoke site permissions at any time through the Chrome extension settings.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-sentient mb-4">6. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be reflected by the Last Updated date
            at the top of this page. We encourage you to review this policy periodically.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-sentient mb-4">7. Contact Information</h2>
          <p>
            If you have questions or concerns regarding this Privacy Policy, please contact us at nirman0511@gmail.com.
          </p>
        </section>

        <p className="my-12 italic text-foreground/70">
          This policy outlines our commitment to your privacy under the General Data Protection Regulation (GDPR), the
          California Online Privacy Protection Act (CalOPPA), and the Children's Online Privacy Protection Act (COPPA).
        </p>

        <section className="mb-12">
          <h2 className="text-xl font-sentient mb-4">GDPR Disclosure (European Union)</h2>
          <p className="mb-4">
            Under the GDPR, we act as the Data Controller for the information processed by Prism-AI. Our legal basis for
            processing your data is your explicit consent, which you provide by invoking the extension to perform an
            audit.
          </p>
          <p className="mb-4">Your GDPR Rights include:</p>
          <ul className="list-square pl-5 space-y-2 mb-6">
            <li>The right to be informed of data collection practices.</li>
            <li>The right of access to any personal data handled during a session.</li>
            <li>The right to rectification, erasure, and restriction of processing.</li>
            <li>The right to object to data processing activities.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-sentient mb-4">CalOPPA Disclosure (California, USA)</h2>
          <p className="mb-4">
            CalOPPA requires us to disclose exactly what personally identifiable information (PII) we collect. We
            collect names, physical addresses, email addresses, and financial account numbers for the sole purpose of
            redaction.
          </p>
          <ul className="list-square pl-5 space-y-2 mb-6">
            <li>
              Review Process: Users may review or request changes to their data by contacting us via the email below.
            </li>
            <li>
              Do Not Track (DNT) Signals: Our extension does not currently respond to or track "Do Not Track" browser
              signals, as all processing is ephemeral and session-based.
            </li>
            <li>
              Policy Changes: We will notify users of significant changes to this policy by updating the "Effective
              Date" at the top of this page.
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-sentient mb-4">COPPA Compliance (Children Under 13)</h2>
          <p className="mb-4">
            Prism-AI is a general audience compliance tool and is not directed at children under the age of 13.
          </p>
          <ul className="list-square pl-5 space-y-2 mb-6">
            <li>
              No Knowledgeable Collection: We do not knowingly collect, maintain, or use personal information from
              children under 13.
            </li>
            <li>
              Parental Rights: If you are a parent or guardian and discover that your child under 13 has provided
              personal information to us, please contact us immediately to have that information deleted.
            </li>
            <li>
              Safety First: We encourage parents and guardians to take an active role in their children's online
              activities and interests.
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-sentient mb-4">Data Security</h2>
          <p>
            We implement strict security measures, including TLS 1.3 encryption for all data in transit between your
            browser and our serverless inference engine. No data is permanently stored on our servers.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-xl font-sentient mb-4">Contact Information</h2>
          <p>
            If you have questions regarding this policy, please contact our Data Protection Officer at:
            nirman0511@gmail.com.
          </p>
        </section>
      </article>

      <footer className="py-12 border-t border-border/10 bg-background/50 backdrop-blur-sm">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 justify-center md:justify-start">
              <span className="font-sentient text-base tracking-tighter">PrismAI</span>
            </Link>
            <p className="font-mono text-[10px] text-foreground/40 max-w-xs leading-relaxed">
              Precision monitoring for enterprise ethics and legal compliance. Risk Monitor v1.0
            </p>
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
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/40 hover:text-foreground/80 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
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
    </main>
  )
}
