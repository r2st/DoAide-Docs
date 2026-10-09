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
  { q: "Can an employer issue a warning letter without prior verbal warning?", a: "While there is no strict legal requirement for a verbal warning before a written one, best practices in Indian HR recommend following progressive discipline: verbal counselling first, followed by a written warning, and then termination as a last resort. Directly issuing a written warning without prior discussion may be challenged in labour disputes." },
  { q: "How long does a warning letter stay in an employee's record?", a: "Typically, a warning letter remains in the employee's personnel file for 6 to 12 months, depending on company policy. After this period, if no further incidents occur, many companies remove it from the active record. However, it may be retained for documentation purposes." },
  { q: "Can an employee respond to a warning letter?", a: "Yes, an employee has every right to respond in writing to a warning letter. If the employee disagrees with the contents, they can submit a written rebuttal or explanation to the HR department. This response should also be kept in the employee's file alongside the warning letter." },
  { q: "Is it mandatory to have a witness when issuing a warning letter?", a: "While not legally mandatory, having a witness (typically another HR representative or a manager) present when issuing a warning letter is highly recommended. This is especially important if the employee refuses to acknowledge receipt of the letter." },
  { q: "What happens if the employee refuses to sign the warning letter?", a: "If the employee refuses to sign, the employer should note the refusal on the letter with the date and witness signature. The letter can also be sent via registered post or email with delivery/read receipt to establish proof of delivery. The refusal to sign does not invalidate the warning." },
];

export default function EmployeeWarningLetterGuide() {
  return (
    <div style={s.page}>
      <SeoHead
        title="How to Write an Employee Warning Letter — Complete Guide with Format | DoAide Docs"
        description="Step-by-step guide to writing an employee warning letter in India. Includes format, templates, legal considerations, and a free generator. Covers misconduct, poor performance, and attendance issues."
        slug="blog/how-to-write-employee-warning-letter"
        faqs={FAQS}
      />
      <Link to="/blog" style={s.backLink}>← Back to Blog</Link>

      <h1 style={s.title}>How to Write an Employee Warning Letter — Complete Guide with Format</h1>
      <p style={s.meta}>Updated October 2026 · 8 min read</p>

      <p style={s.p}>
        An employee warning letter is one of the most important documents in the HR toolkit. Whether you are
        dealing with poor performance, repeated absenteeism, misconduct, or policy violations, a well-written
        warning letter protects both the employer and the employee by creating a clear record of the issue and
        expected corrective action.
      </p>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Generate a Warning Letter Instantly</div>
        Use our <Link to="/employee-warning-letter-generator" style={s.link}>free Employee Warning Letter Generator</Link> to
        create a professional warning letter in seconds — no login required.
      </div>

      <h2 style={s.h2}>When to Issue a Warning Letter</h2>
      <p style={s.p}>
        A warning letter should be issued when informal conversations and verbal warnings have not resolved the issue.
        Common situations include:
      </p>
      <ul style={s.ul}>
        <li><strong>Poor performance</strong> — Consistently failing to meet targets, quality standards, or KPIs despite feedback</li>
        <li><strong>Attendance issues</strong> — Repeated unauthorised absences, habitual late coming, or pattern of absenteeism</li>
        <li><strong>Misconduct</strong> — Insubordination, harassment, inappropriate behaviour, or workplace disruptions</li>
        <li><strong>Policy violations</strong> — Breaching company policies such as data security, dress code, or safety protocols</li>
      </ul>

      <h2 style={s.h2}>The Progressive Discipline Approach</h2>
      <p style={s.p}>
        Indian labour law and HR best practices recommend a progressive approach to employee discipline. This protects
        the company legally and gives the employee a fair chance to improve:
      </p>
      <ol style={s.ol}>
        <li><strong>Verbal counselling</strong> — An informal discussion about the issue, documented with a brief note to file</li>
        <li><strong>First written warning</strong> — A formal letter outlining the issue, expected improvement, and timeline</li>
        <li><strong>Second written warning</strong> — A stronger letter if the first warning did not result in improvement</li>
        <li><strong>Final warning</strong> — A last chance letter clearly stating that termination will follow if there is no change</li>
        <li><strong>Termination</strong> — If all previous steps have failed, following proper notice period and settlement</li>
      </ol>

      <h2 style={s.h2}>Essential Elements of a Warning Letter</h2>
      <p style={s.p}>Every warning letter must include these elements to be effective and legally sound:</p>
      <ol style={s.ol}>
        <li><strong>Company details</strong> — Company name, address, and letterhead</li>
        <li><strong>Employee details</strong> — Full name, designation, department, and employee ID</li>
        <li><strong>Date and reference number</strong> — For tracking and record-keeping</li>
        <li><strong>Subject line</strong> — Clearly stating this is a warning letter and the warning level</li>
        <li><strong>Description of the issue</strong> — Specific details of the incident, including dates and evidence</li>
        <li><strong>Policy reference</strong> — Which company policy or expectation was violated</li>
        <li><strong>Expected corrective action</strong> — What the employee must do to improve</li>
        <li><strong>Timeline for improvement</strong> — A specific deadline by which improvement must be shown</li>
        <li><strong>Consequences</strong> — What will happen if the issue is not corrected</li>
        <li><strong>Acknowledgement section</strong> — Space for the employee to sign and date</li>
      </ol>

      <h2 style={s.h2}>Sample Warning Letter Format</h2>
      <p style={s.p}>Here is a general format for a first warning letter:</p>
      <div style={{ padding: "1.5rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", marginBottom: 24, fontFamily: "monospace", fontSize: 13, lineHeight: 1.8 }}>
        <p>[Company Name]</p>
        <p>[Company Address]</p>
        <p style={{ marginTop: 16 }}>Date: [Date]</p>
        <p style={{ marginTop: 16 }}>To: [Employee Name]</p>
        <p>Designation: [Designation]</p>
        <p>Department: [Department]</p>
        <p>Employee ID: [ID]</p>
        <p style={{ marginTop: 16 }}>Subject: First Warning — [Issue Type]</p>
        <p style={{ marginTop: 16 }}>Dear [Name],</p>
        <p style={{ marginTop: 8 }}>This letter serves as a formal first warning regarding [describe issue].</p>
        <p style={{ marginTop: 8 }}>[Detailed description of the incident]</p>
        <p style={{ marginTop: 8 }}>Expected corrective action: [What employee must do]</p>
        <p style={{ marginTop: 8 }}>You are expected to show improvement by [deadline].</p>
        <p style={{ marginTop: 16 }}>_____________________ &nbsp;&nbsp;&nbsp; _____________________</p>
        <p>Authorised Signatory &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Employee Acknowledgement</p>
      </div>

      <h2 style={s.h2}>Legal Considerations in India</h2>
      <ul style={s.ul}>
        <li>Under the <strong>Industrial Disputes Act, 1947</strong>, employers must follow principles of natural justice before terminating employees. Warning letters establish a paper trail.</li>
        <li>The <strong>Standing Orders</strong> applicable to your establishment may prescribe specific procedures for disciplinary action.</li>
        <li>Always give the employee an opportunity to be heard — a <strong>show cause notice</strong> before or alongside a warning letter is recommended for serious issues.</li>
        <li>Maintain <strong>confidentiality</strong> — the warning letter should only be shared with the employee and relevant HR/management personnel.</li>
        <li>Keep records for at least <strong>3 years</strong> after the employee leaves, as they may be needed in case of disputes.</li>
      </ul>

      <h2 style={s.h2}>Tips for Writing Effective Warning Letters</h2>
      <ol style={s.ol}>
        <li><strong>Be specific</strong> — Avoid vague language. Include dates, incidents, and measurable facts.</li>
        <li><strong>Stay professional</strong> — Use neutral, objective language. Avoid emotional or accusatory tone.</li>
        <li><strong>Focus on behaviour, not personality</strong> — Address what the employee did, not who they are.</li>
        <li><strong>Document everything</strong> — Keep copies of all communications, previous verbal warnings, and evidence.</li>
        <li><strong>Offer support</strong> — Where appropriate, offer resources such as training, mentoring, or EAP services.</li>
        <li><strong>Set a clear review date</strong> — Schedule a follow-up meeting to assess improvement.</li>
      </ol>

      <div style={{ marginTop: 40, padding: 20, background: "var(--surface)", borderRadius: "var(--radius-lg)" }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: "var(--gold)" }}>Related HR Document Generators</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {[
            { to: "/employee-warning-letter-generator", label: "Warning Letter" },
            { to: "/appointment-letter-generator", label: "Appointment Letter" },
            { to: "/experience-letter-generator", label: "Experience Letter" },
            { to: "/relieving-letter-generator", label: "Relieving Letter" },
            { to: "/resignation-letter-generator", label: "Resignation Letter" },
            { to: "/offer-letter-generator", label: "Offer Letter" },
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
