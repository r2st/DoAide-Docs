import json
from unittest.mock import patch


def test_submit_feedback_creates_entry(client, tmp_path):
    fake_file = tmp_path / "feedback.json"
    with patch.object(
        __import__("app.routers.feedback", fromlist=["FEEDBACK_FILE"]),
        "FEEDBACK_FILE",
        fake_file,
    ):
        from app.routers import feedback

        original = feedback.FEEDBACK_FILE
        feedback.FEEDBACK_FILE = fake_file
        try:
            r = client.post("/api/feedback", json={"message": "Great tool!", "page": "/"})
            assert r.status_code == 201
            assert r.json()["status"] == "ok"
            entries = json.loads(fake_file.read_text())
            assert len(entries) == 1
            assert entries[0]["message"] == "Great tool!"
            assert entries[0]["page"] == "/"
            assert "timestamp" in entries[0]
        finally:
            feedback.FEEDBACK_FILE = original


def test_submit_feedback_appends(client, tmp_path):
    fake_file = tmp_path / "feedback.json"
    fake_file.write_text(json.dumps([{"message": "first", "page": "/", "timestamp": "t"}]))
    from app.routers import feedback

    original = feedback.FEEDBACK_FILE
    feedback.FEEDBACK_FILE = fake_file
    try:
        r = client.post("/api/feedback", json={"message": "second", "page": "/about"})
        assert r.status_code == 201
        entries = json.loads(fake_file.read_text())
        assert len(entries) == 2
        assert entries[1]["message"] == "second"
    finally:
        feedback.FEEDBACK_FILE = original


def test_submit_feedback_rejects_empty(client):
    r = client.post("/api/feedback", json={"message": "", "page": "/"})
    assert r.status_code == 422


def test_submit_feedback_rejects_missing_message(client):
    r = client.post("/api/feedback", json={"page": "/"})
    assert r.status_code == 422
