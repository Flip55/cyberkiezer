"""Shared page shell for every page: header, navigation and footer.

All pages are generated, so a change here reaches the whole site:
  python3 tools/build_home.py && python3 tools/build_pages.py && python3 tools/build_blog.py
"""
import html

BRAND = "cybersecuritychecker.be"
VERSION = "9"  # raise when assets change, so browsers fetch the new files

NAV = [
    ("it", "it-dienstverleners.html", "IT-dienstverleners"),
    ("ins", "cyberverzekeraars.html", "Cyberverzekeraars"),
    ("blog", "blog/index.html", "Blog"),
    ("steun", "index.html#steun", "VLAIO-steun"),
]

SHIELD = ('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">'
          '<path stroke-linecap="round" stroke-linejoin="round" d="M12 3l7 4v5c0 5-3.5 8.5-7 9.5-3.5-1-7-4.5-7-9.5V7l7-4z"/>'
          '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4"/></svg>')

WORDMARK = 'cybersecuritychecker<b>.be</b>'


def head(title: str, description: str, prefix: str, active: str, wide: bool = False) -> str:
    current = ' aria-current="page"'
    links = "".join(
        f'<a href="{prefix}{href}"{current if key == active else ""}>{label}</a>'
        for key, href, label in NAV
    )
    opener = "" if wide else '<div class="container page">\n'
    return f"""<!DOCTYPE html>
<html lang="nl-BE">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{html.escape(title)}</title>
<meta name="description" content="{html.escape(description)}">
<link rel="preload" href="{prefix}assets/fonts/Inter-Regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="{prefix}assets/site.css?v={VERSION}">
</head>
<body>
<header class="top">
  <div class="container top-in">
    <a class="brand" href="{prefix}index.html">
      <span class="brand-icon">{SHIELD}</span>
      <span class="brand-text"><span class="brand-name">{WORDMARK}</span><span class="brand-tag">Onafhankelijke check voor Belgische kmo's</span></span>
    </a>
    <nav class="main" aria-label="Hoofdmenu">{links}</nav>
    <a class="btn primary small" href="{prefix}index.html#quiz">Start de check</a>
  </div>
</header>
<main>
{opener}"""


def foot(prefix: str, wide: bool = False) -> str:
    closer = "" if wide else "</div>\n"
    return f"""{closer}</main>
<footer class="site">
  <div class="container">
    <div class="foot-top">
      <div>
        <p class="foot-brand">{WORDMARK}</p>
        <p>Onafhankelijke cybersecurity-check voor Belgische kmo's, met matching naar specialisten. Niet verbonden aan het Centrum voor Cybersecurity België (CCB).</p>
      </div>
      <nav aria-label="Voettekst">
        <a href="{prefix}index.html#quiz">Start de check</a>
        <a href="{prefix}it-dienstverleners.html">IT-dienstverleners</a>
        <a href="{prefix}cyberverzekeraars.html">Cyberverzekeraars</a>
        <a href="{prefix}blog/index.html">Blog</a>
        <a href="{prefix}index.html#aanbieders">Voor aanbieders</a>
      </nav>
    </div>
    <div class="foot-bottom">
      <p>Indicatieve zelfevaluatie. Geen NIS2-certificering, geen audit en geen juridisch advies.</p>
      <p>&copy; 2026 cybersecuritychecker.be</p>
    </div>
  </div>
</footer>
</body>
</html>
"""
