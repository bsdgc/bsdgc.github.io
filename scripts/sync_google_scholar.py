#!/usr/bin/env python3
"""Sync Google Scholar publications into publications-data.js.

This script is intended for build-time or scheduled use on a static site.
It does not run in the browser.
"""

from __future__ import annotations

import argparse
import html
import json
import re
import time
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Iterable


SCHOLAR_BASE_URL = "https://scholar.google.com"
DEFAULT_USER_ID = "LvwsvigAAAAJ"
USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/123.0.0.0 Safari/537.36"
)


def strip_tags(value: str) -> str:
    text = re.sub(r"<[^>]+>", "", value)
    return " ".join(html.unescape(text).split())


def scholar_request(url: str) -> str:
    request = urllib.request.Request(
        url,
        headers={
            "User-Agent": USER_AGENT,
            "Accept-Language": "en-US,en;q=0.9",
        },
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        return response.read().decode("utf-8", errors="replace")


def parse_publication_rows(page_html: str) -> list[dict]:
    rows = re.findall(r'<tr class="gsc_a_tr".*?</tr>', page_html, flags=re.S)
    publications = []

    for row in rows:
        title_match = re.search(
            r'<a class="gsc_a_at" href="([^"]+)".*?>(.*?)</a>',
            row,
            flags=re.S,
        )
        gray_fields = re.findall(r'<div class="gs_gray">(.*?)</div>', row, flags=re.S)
        year_match = re.search(r'<span class="gsc_a_h gsc_a_hc gs_ibl">(.*?)</span>', row, flags=re.S)
        if not year_match:
            year_match = re.search(r'<span class="gsc_a_yi">(.*?)</span>', row, flags=re.S)
        if not year_match:
            year_match = re.search(r'<td class="gsc_a_y".*?>(.*?)</td>', row, flags=re.S)

        if not title_match:
            continue

        title = strip_tags(title_match.group(2))
        relative_url = html.unescape(title_match.group(1))
        authors = strip_tags(gray_fields[0]) if len(gray_fields) > 0 else ""
        venue_line = strip_tags(gray_fields[1]) if len(gray_fields) > 1 else ""
        year_text = strip_tags(year_match.group(1)) if year_match else ""
        year_match_digits = re.search(r"\b(19|20)\d{2}\b", year_text)
        year = int(year_match_digits.group(0)) if year_match_digits else None

        journal, citation = split_venue_line(venue_line, year)
        publications.append(
            {
                "year": year or 0,
                "title": title,
                "authors": authors or "Authors unavailable",
                "journal": journal,
                "citation": citation,
                "sourceUrl": urllib.parse.urljoin(SCHOLAR_BASE_URL, relative_url),
                "links": [
                    {
                        "label": "Scholar",
                        "url": urllib.parse.urljoin(SCHOLAR_BASE_URL, relative_url),
                    }
                ],
            }
        )

    return publications


def split_venue_line(venue_line: str, year: int | None) -> tuple[str, str]:
    if not venue_line:
        return ("Google Scholar", str(year) if year else "")

    parts = [part.strip() for part in venue_line.split(",") if part.strip()]
    if not parts:
        return ("Google Scholar", str(year) if year else "")

    if len(parts) == 1:
        journal = parts[0]
        citation = str(year) if year and str(year) not in journal else ""
        return (journal, citation)

    journal = parts[0]
    citation = ", ".join(parts[1:])

    if year and str(year) not in citation:
        citation = f"{citation}, {year}" if citation else str(year)

    return (journal, citation)


def fetch_all_publications(user_id: str, language: str, page_size: int, pause_seconds: float) -> list[dict]:
    publications: list[dict] = []
    start = 0

    while True:
        query = urllib.parse.urlencode(
            {
                "user": user_id,
                "hl": language,
                "cstart": start,
                "pagesize": page_size,
            }
        )
        url = f"{SCHOLAR_BASE_URL}/citations?{query}"
        page_html = scholar_request(url)
        rows = parse_publication_rows(page_html)

        if not rows:
            break

        publications.extend(rows)
        if len(rows) < page_size:
            break

        start += len(rows)
        time.sleep(pause_seconds)

    return dedupe_publications(publications)


def dedupe_publications(publications: Iterable[dict]) -> list[dict]:
    seen = set()
    deduped = []

    for item in sorted(publications, key=lambda pub: (-int(pub.get("year", 0)), pub.get("title", "").lower())):
        key = (item.get("title", "").lower(), item.get("year", 0))
        if key in seen:
            continue
        seen.add(key)
        deduped.append(item)

    return deduped


def write_output(publications: list[dict], output_path: Path) -> None:
    payload = json.dumps(publications, ensure_ascii=False, indent=2)
    output = (
        "// Auto-generated by scripts/sync_google_scholar.py\n"
        "// Source: Google Scholar profile sync. Manual edits will be overwritten.\n"
        f"window.publicationsData = {payload};\n"
    )
    output_path.write_text(output, encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser(description="Sync Google Scholar publications to publications-data.js")
    parser.add_argument("--user-id", default=DEFAULT_USER_ID, help="Google Scholar user id")
    parser.add_argument("--lang", default="en", help="Scholar interface language")
    parser.add_argument("--page-size", type=int, default=100, help="Rows to request per page")
    parser.add_argument("--pause-seconds", type=float, default=1.0, help="Delay between paginated requests")
    parser.add_argument(
        "--output",
        default=str(Path(__file__).resolve().parents[1] / "publications-data.js"),
        help="Output path for publications-data.js",
    )
    args = parser.parse_args()

    publications = fetch_all_publications(
        user_id=args.user_id,
        language=args.lang,
        page_size=args.page_size,
        pause_seconds=args.pause_seconds,
    )

    if not publications:
        raise SystemExit("No publications found. Scholar may have blocked the request or the profile id may be incorrect.")

    write_output(publications, Path(args.output))
    print(f"Wrote {len(publications)} publications to {args.output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
