def test_documents_endpoint(client):
    r = client.get("/api/documents")
    assert r.status_code == 200
    data = r.json()
    docs = data["documents"]
    assert len(docs) == 14


def test_documents_have_required_fields(client):
    r = client.get("/api/documents")
    for doc in r.json()["documents"]:
        assert "slug" in doc
        assert "name" in doc
        assert "category" in doc
        assert "keywords" in doc
        assert doc["slug"].endswith("-generator")


def test_documents_categories(client):
    r = client.get("/api/documents")
    cats = set(d["category"] for d in r.json()["documents"])
    assert cats == {"HR", "Rental", "Business", "Legal"}


def test_documents_slugs_match_sitemap(client):
    seo_r = client.get("/api/documents")
    sitemap_r = client.get("/sitemap.xml")
    seo_slugs = {d["slug"] for d in seo_r.json()["documents"]}
    for slug in seo_slugs:
        assert slug in sitemap_r.text
