import { Link } from "react-router-dom";
import SeoHead from "../../components/SeoHead";
import FAQ from "../../components/FAQ";

const s = {
  page: { maxWidth: 800, margin: "0 auto" },
  backLink: { color: "var(--text-muted)", fontSize: 13, textDecoration: "none", display: "inline-block", marginBottom: 24 },
  title: { fontFamily: "var(--font-display)", fontSize: 36, marginBottom: 8, lineHeight: 1.2 },
  meta: { color: "var(--text-muted)", fontSize: 13, marginBottom: 32 },
  h2: { fontFamily: "var(--font-display)", fontSize: 24, marginTop: 40, marginBottom: 12, color: "var(--text)" },
  h3: { fontSize: 18, fontWeight: 600, marginTop: 28, marginBottom: 8, color: "var(--text)" },
  p: { fontSize: 15, lineHeight: 1.8, color: "var(--text-secondary)", marginBottom: 16 },
  ul: { paddingLeft: 20, marginBottom: 16, fontSize: 15, lineHeight: 1.8, color: "var(--text-secondary)" },
  ol: { paddingLeft: 20, marginBottom: 16, fontSize: 15, lineHeight: 1.8, color: "var(--text-secondary)" },
  link: { color: "var(--gold)", fontWeight: 500, textDecoration: "none" },
  callout: { padding: 20, background: "var(--gold-bg)", border: "1px solid rgba(240,180,41,0.2)", borderRadius: "var(--radius-lg)", marginBottom: 24, fontSize: 14, lineHeight: 1.7, color: "var(--text-secondary)" },
  calloutTitle: { fontWeight: 600, color: "var(--gold)", marginBottom: 8 },
};

const FAQS = [
  { q: "Is an internship certificate mandatory in India?", a: "While there is no law mandating internship certificates, most universities in India require them for course completion, especially for professional degrees like B.Tech, MBA, BBA, and BCA. Many universities will not award the degree without proof of internship completion." },
  { q: "What is the difference between an internship certificate and a letter of recommendation?", a: "An internship certificate confirms that the intern completed the internship and provides basic details like duration, department, and rating. A letter of recommendation goes further — it provides a personal assessment of the intern's skills, potential, and character, and is typically addressed to future employers or academic institutions." },
  { q: "Can I get an internship certificate for a virtual internship?", a: "Yes, virtual/remote internships are equally valid and companies should issue certificates for them. The certificate should mention the nature of the internship if it was remote. Our generator works for both in-office and remote internships." },
  { q: "How do I verify an internship certificate?", a: "Employers typically verify internship certificates by contacting the issuing company's HR department. Some companies now use digital verification platforms. A certificate on company letterhead with a verifiable contact number adds credibility. DoAide Docs generates a professional format that you can print on your company letterhead." },
  { q: "What if my company refuses to issue an internship certificate?", a: "If your company refuses to issue a certificate despite completing the internship, you can: (1) send a formal written request to HR, (2) escalate to your reporting manager or department head, (3) contact the company's grievance cell, or (4) if you were referred by your college, ask the college placement cell to intervene on your behalf." },
];

export default function InternshipCertificateGuide() {
  return (
    <div style={s.page}>
      <SeoHead
        title="How to Write an Internship Certificate — Complete Guide with Format | DoAide Docs"
        description="Step-by-step guide to creating an internship certificate in India. Includes format, essential elements, sample templates, and a free generator. Perfect for HR managers and startup founders."
        slug="blog/how-to-write-internship-certificate"
        faqs={FAQS}
      />
      <Link to="/blog" style={s.backLink}>← Back to Blog</Link>

      <h1 style={s.title}>How to Write an Internship Certificate — Complete Guide with Format</h1>
      <p style={s.meta}>Updated October 2026 · 7 min read</p>

      <p style={s.p}>
        Every year, millions of students in India complete internships as part of their academic curriculum. Whether
        you are an HR manager at a large company, a startup founder, or a small business owner, knowing how to write
        a proper internship certificate is essential. This guide covers everything you need to know — from the format
        to legal considerations.
      </p>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Generate a Certificate Instantly</div>
        Use our <Link to="/internship-certificate-generator" style={s.link}>free Internship Certificate Generator</Link> to
        create a professional certificate in seconds — no login required.
      </div>

      <h2 style={s.h2}>Why Internship Certificates Matter</h2>
      <p style={s.p}>Internship certificates serve multiple important purposes:</p>
      <ul style={s.ul}>
        <li><strong>Academic requirement</strong> — Most Indian universities (UGC-affiliated) require proof of internship completion for degree conferral</li>
        <li><strong>Job applications</strong> — Hiring managers look for internship experience, especially for freshers</li>
        <li><strong>Skill validation</strong> — Certificates with project details and ratings validate the intern&apos;s practical skills</li>
        <li><strong>Professional portfolio</strong> — A well-formatted certificate adds credibility to LinkedIn profiles and portfolios</li>
        <li><strong>Higher education</strong> — Universities abroad often require proof of work experience for admissions</li>
      </ul>

      <h2 style={s.h2}>Essential Elements of an Internship Certificate</h2>
      <p style={s.p}>A complete internship certificate should include:</p>
      <ol style={s.ol}>
        <li><strong>Company details</strong> — Name, address, and logo (if printing on letterhead)</li>
        <li><strong>Certificate title</strong> — Clearly marked as &ldquo;Internship Certificate&rdquo; or &ldquo;Certificate of Internship Completion&rdquo;</li>
        <li><strong>Intern details</strong> — Full name, college/university name</li>
        <li><strong>Internship duration</strong> — Exact start and end dates</li>
        <li><strong>Department and project</strong> — The team the intern worked with and the project/domain</li>
        <li><strong>Responsibilities</strong> — A brief description of tasks and contributions</li>
        <li><strong>Performance assessment</strong> — A rating or qualitative assessment of the intern&apos;s work</li>
        <li><strong>Authorised signature</strong> — Name and designation of the issuing authority</li>
        <li><strong>Date of issue</strong> — When the certificate was issued</li>
      </ol>

      <h2 style={s.h2}>Sample Internship Certificate Format</h2>
      <div style={{ padding: "1.5rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", marginBottom: 24, fontFamily: "monospace", fontSize: 13, lineHeight: 1.8 }}>
        <p>[Company Name]</p>
        <p>[Company Address]</p>
        <p style={{ marginTop: 16, textAlign: "center", fontWeight: "bold" }}>INTERNSHIP CERTIFICATE</p>
        <p style={{ marginTop: 16 }}>Date: [Date]</p>
        <p style={{ marginTop: 16 }}>TO WHOM IT MAY CONCERN</p>
        <p style={{ marginTop: 8 }}>This is to certify that [Intern Name], a student of [College Name], has successfully completed an internship at [Company Name] in the [Department] department.</p>
        <p style={{ marginTop: 8 }}>Duration: [Start Date] to [End Date]</p>
        <p>Project: [Project/Domain]</p>
        <p>Performance: [Rating]</p>
        <p style={{ marginTop: 8 }}>[Brief performance assessment]</p>
        <p style={{ marginTop: 16 }}>_____________________</p>
        <p>Authorised Signatory</p>
      </div>

      <h2 style={s.h2}>Types of Internship Certificates</h2>
      <h3 style={s.h3}>1. Basic Completion Certificate</h3>
      <p style={s.p}>
        A simple certificate confirming the intern completed the program. Contains only name, duration, and department.
        Suitable for short-term internships (1-2 months).
      </p>

      <h3 style={s.h3}>2. Detailed Performance Certificate</h3>
      <p style={s.p}>
        Includes project details, responsibilities, skills demonstrated, and a performance rating. Preferred by
        universities and future employers. Our generator creates this type.
      </p>

      <h3 style={s.h3}>3. Stipend Certificate</h3>
      <p style={s.p}>
        Some companies issue a separate certificate mentioning the stipend paid, which can be useful for tax purposes
        or financial verification.
      </p>

      <h2 style={s.h2}>Best Practices for Issuing Internship Certificates</h2>
      <ol style={s.ol}>
        <li><strong>Issue promptly</strong> — Provide the certificate on the last day of the internship or within a week</li>
        <li><strong>Use company letterhead</strong> — Print on official letterhead for credibility</li>
        <li><strong>Be specific about dates</strong> — Use exact start and end dates, not approximate durations</li>
        <li><strong>Mention the project</strong> — Include what the intern worked on, not just the department</li>
        <li><strong>Give a fair assessment</strong> — Be honest but constructive in your performance rating</li>
        <li><strong>Include contact details</strong> — Future employers may want to verify the certificate</li>
        <li><strong>Keep a copy</strong> — Maintain a record in the intern&apos;s file for future reference</li>
      </ol>

      <h2 style={s.h2}>Common Mistakes to Avoid</h2>
      <ul style={s.ul}>
        <li>Spelling the intern&apos;s name incorrectly — always verify with their ID proof</li>
        <li>Using vague language like &ldquo;worked with us&rdquo; instead of specifying the department and role</li>
        <li>Forgetting to include the certificate date — this is essential for verification</li>
        <li>Not having an authorised signatory — certificates signed by junior staff may not be accepted</li>
        <li>Using informal language or casual formatting — maintain professional standards</li>
      </ul>

      <h2 style={s.h2}>University Requirements in India</h2>
      <p style={s.p}>
        Different universities have specific requirements for internship certificates. Here are common requirements:
      </p>
      <ul style={s.ul}>
        <li><strong>AICTE-affiliated colleges</strong> — Typically require a minimum of 4-6 weeks of internship with a certificate on company letterhead</li>
        <li><strong>UGC guidelines</strong> — Recommend internships as part of skill development; certificates should mention the duration and project</li>
        <li><strong>MBA programmes</strong> — Usually require 8-12 weeks of summer internship with a detailed project report and certificate</li>
        <li><strong>Engineering colleges</strong> — Many require internships in the 6th or 7th semester with certificates for credit transfer</li>
      </ul>

      <div style={{ marginTop: 40, padding: 20, background: "var(--surface)", borderRadius: "var(--radius-lg)" }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: "var(--gold)" }}>Related Document Generators</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {[
            { to: "/internship-certificate-generator", label: "Internship Certificate" },
            { to: "/experience-letter-generator", label: "Experience Letter" },
            { to: "/bonafide-certificate-generator", label: "Bonafide Certificate" },
            { to: "/offer-letter-generator", label: "Offer Letter" },
            { to: "/appointment-letter-generator", label: "Appointment Letter" },
          ].map((t) => (
            <Link key={t.to} to={t.to} style={{ padding: "8px 16px", background: "var(--gold-bg)", border: "1px solid rgba(240,180,41,0.2)", borderRadius: 20, fontSize: 13, color: "var(--gold)", textDecoration: "none", fontWeight: 500 }}>
              {t.label}
            </Link>
          ))}
        </div>
      </div>

      <FAQ items={FAQS} />
    </div>
  );
}
