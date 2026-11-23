"""Shared page shell for the generated pages (provider pages and blog).

index.html is written by hand and repeats the same header and footer markup.
"""
import html

BRAND = "Cybersecurity Checker"

NAV = [
    ("it", "it-dienstverleners.html", "IT-dienstverleners"),
    ("ins", "cyberverzekeraars.html", "Cyberverzekeraars"),
    ("blog", "blog/index.html", "Blog"),
    ("steun", "index.html#steun", "VLAIO-steun"),
]


def head(title: str, description: str, prefix: str, active: str, note: str) -> str:
    current = ' aria-current="page"'
    links = "".join(
        f'<a href="{prefix}{href}"{current if key == active else ""}>{label}</a>'
        for key, href, label in NAV
    )
    return f"""<!DOCTYPE html>
<html lang="nl-BE">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{html.escape(title)}</title>
<meta name="description" content="{html.escape(description)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700&family=Public+Sans:wght@400;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{prefix}assets/site.css">
</head>
<body>
<div class="demo-note">{html.escape(note)}</div>
<div class="wrap">
<header class="top">
  <a class="brand" href="{prefix}index.html"><span></span>{BRAND}</a>
  <nav class="main" aria-label="Hoofdmenu">{links}<a class="btn primary" href="{prefix}index.html#quiz">Start de gratis check</a></nav>
</header>
<main>
"""


def foot(prefix: str) -> str:
    return f"""</main>
<footer class="site">
  <nav aria-label="Voettekst">
    <a href="{prefix}index.html#quiz">Start de check</a>
    <a href="{prefix}it-dienstverleners.html">IT-dienstverleners</a>
    <a href="{prefix}cyberverzekeraars.html">Cyberverzekeraars</a>
    <a href="{prefix}blog/index.html">Blog</a>
    <a href="{prefix}index.html#aanbieders">Voor aanbieders</a>
  </nav>
  <p>{BRAND} is een demo. De inhoud geeft algemene informatie en vervangt geen audit of advies op maat.</p>
</footer>
</div>
</body>
</html>
"""
