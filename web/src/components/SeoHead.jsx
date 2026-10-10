import { useEffect } from "react";

function setMeta(attr, key, content) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
  return el;
}

export default function SeoHead({ title, description, slug, faqs = [], blog = null }) {
  useEffect(() => {
    document.title = title;

    const pageUrl = `https://docs.doaide.com/${slug || ""}`;
    const created = [];

    setMeta("name", "description", description);
    created.push(setMeta("property", "og:title", title));
    created.push(setMeta("property", "og:description", description));
    created.push(setMeta("property", "og:url", pageUrl));

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = pageUrl;

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
        "url": pageUrl,
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        }
      }
    ];

    if (blog) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": blog.headline || title,
        "description": description,
        "url": pageUrl,
        "datePublished": blog.datePublished,
        "dateModified": blog.dateModified || blog.datePublished,
        "author": { "@type": "Organization", "name": "DoAide Docs", "url": "https://docs.doaide.com" },
        "publisher": { "@type": "Organization", "name": "DoAide Docs", "url": "https://docs.doaide.com" },
        "mainEntityOfPage": { "@type": "WebPage", "@id": pageUrl },
        ...(blog.wordCount ? { "wordCount": blog.wordCount } : {}),
      });
    }

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
      created.forEach(el => { if (el.parentNode) el.parentNode.removeChild(el); });
    };
  }, [title, description, slug, faqs]);

  return null;
}
