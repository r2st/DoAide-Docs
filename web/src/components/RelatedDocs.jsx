import { Link } from "react-router-dom";

const ALL_DOCS = [
  { slug: "rent-receipt-generator", name: "Rent Receipt Generator" },
  { slug: "rental-agreement-generator", name: "Rental Agreement Generator" },
  { slug: "salary-slip-generator", name: "Salary Slip Generator" },
  { slug: "experience-letter-generator", name: "Experience Letter Generator" },
  { slug: "relieving-letter-generator", name: "Relieving Letter Generator" },
  { slug: "offer-letter-generator", name: "Offer Letter Generator" },
  { slug: "noc-letter-generator", name: "NOC Letter Generator" },
  { slug: "appointment-letter-generator", name: "Appointment Letter Generator" },
  { slug: "invoice-generator", name: "Invoice Generator" },
  { slug: "bonafide-certificate-generator", name: "Bonafide Certificate Generator" },
  { slug: "power-of-attorney-generator", name: "Power of Attorney Generator" },
  { slug: "leave-application-generator", name: "Leave Application Generator" },
  { slug: "resignation-letter-generator", name: "Resignation Letter Generator" },
  { slug: "authorization-letter-generator", name: "Authorization Letter Generator" },
  { slug: "salary-certificate-generator", name: "Salary Certificate Generator" },
  { slug: "affidavit-generator", name: "Affidavit Generator" },
  { slug: "partnership-deed-generator", name: "Partnership Deed Generator" },
];

export default function RelatedDocs({ currentSlug }) {
  const related = ALL_DOCS.filter((d) => d.slug !== currentSlug).slice(0, 6);
  return (
    <div className="related-section">
      <h3>Try Our Other Free Generators</h3>
      <div className="related-grid">
        {related.map((d) => (
          <Link key={d.slug} to={`/${d.slug}`} className="related-link">
            {d.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
