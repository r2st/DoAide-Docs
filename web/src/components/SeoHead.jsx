import { useEffect } from "react";

export default function SeoHead({ title, description, slug, faqs = [] }) {
  useEffect(() => {
    document.title = title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description;

    // JSON-LD
    let scriptTag = document.getElementById("json-ld-seo");
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = "json-ld-seo";
      scriptTag.type = "application/ld+json";
      document.head.appendChild(scriptTag);
    }

    const schemas = [
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": title,
        "description": description,
        "url": `https://docs.doaide.com/${slug || ""}`,
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        }
      }
    ];

    if (faqs.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a }
        }))
      });
    }

    scriptTag.textContent = JSON.stringify(schemas);

    return () => {
      if (scriptTag.parentNode) scriptTag.parentNode.removeChild(scriptTag);
    };
  }, [title, description, slug, faqs]);

  return null;
}
