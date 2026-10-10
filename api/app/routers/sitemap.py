from fastapi import APIRouter
from fastapi.responses import Response

router = APIRouter()

DOCUMENTS = [
    {"slug": "rent-receipt-generator", "priority": "0.9", "changefreq": "monthly"},
    {"slug": "rental-agreement-generator", "priority": "0.9", "changefreq": "monthly"},
    {"slug": "salary-slip-generator", "priority": "0.9", "changefreq": "monthly"},
    {"slug": "experience-letter-generator", "priority": "0.8", "changefreq": "monthly"},
    {"slug": "relieving-letter-generator", "priority": "0.8", "changefreq": "monthly"},
    {"slug": "offer-letter-generator", "priority": "0.8", "changefreq": "monthly"},
    {"slug": "noc-letter-generator", "priority": "0.8", "changefreq": "monthly"},
    {"slug": "appointment-letter-generator", "priority": "0.8", "changefreq": "monthly"},
    {"slug": "invoice-generator", "priority": "0.9", "changefreq": "monthly"},
    {"slug": "bonafide-certificate-generator", "priority": "0.7", "changefreq": "monthly"},
    {"slug": "power-of-attorney-generator", "priority": "0.7", "changefreq": "monthly"},
    {"slug": "leave-application-generator", "priority": "0.8", "changefreq": "monthly"},
    {"slug": "resignation-letter-generator", "priority": "0.8", "changefreq": "monthly"},
    {"slug": "authorization-letter-generator", "priority": "0.7", "changefreq": "monthly"},
    {"slug": "affidavit-generator", "priority": "0.7", "changefreq": "monthly"},
    {"slug": "partnership-deed-generator", "priority": "0.7", "changefreq": "monthly"},
    {"slug": "salary-certificate-generator", "priority": "0.8", "changefreq": "monthly"},
]

BLOG_POSTS = [
    "free-legal-document-templates-india",
    "how-to-write-rent-agreement",
    "how-to-write-employee-warning-letter",
    "how-to-write-internship-certificate",
    "rent-receipt-generator-tax-savings",
    "salary-slip-format-2026",
    "experience-letter-format-guide",
]

@router.get("/sitemap.xml")
def sitemap():
    base = "https://docs.doaide.com"
    urls = [f"""  <url>
    <loc>{base}</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>"""]
    for doc in DOCUMENTS:
        urls.append(f"""  <url>
    <loc>{base}/{doc["slug"]}</loc>
    <changefreq>{doc["changefreq"]}</changefreq>
    <priority>{doc["priority"]}</priority>
  </url>""")
    urls.append(f"""  <url>
    <loc>{base}/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>""")
    for slug in BLOG_POSTS:
        urls.append(f"""  <url>
    <loc>{base}/blog/{slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>""")
    xml = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{chr(10).join(urls)}
</urlset>"""
    return Response(content=xml, media_type="application/xml")

@router.get("/robots.txt")
def robots():
    txt = """User-agent: *
Allow: /

Sitemap: https://docs.doaide.com/sitemap.xml"""
    return Response(content=txt, media_type="text/plain")
