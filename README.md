# Cybersecurity Checker

Demo site for cybersecuritychecker.be: a cybersecurity quickscan for Flemish SMEs, overview pages of providers and a blog. Static files only, served by GitHub Pages.

## Structure

| Path | What it is |
|---|---|
| `index.html` | Homepage with the quickscan. Written by hand. |
| `assets/quiz-config.js` | All quiz texts, questions, options, weights, levels and the CTA link. Edit this to change the quiz. |
| `assets/quiz.js` | Quiz logic: screens, scoring, result page, progress saved in `localStorage`. |
| `assets/site.css` | Styles for every page. |
| `it-dienstverleners.html`, `cyberverzekeraars.html` | Provider overview pages. Generated. |
| `blog/` | Blog overview and articles. Generated. |
| `tools/build_pages.py` | Provider data and generator for the two overview pages. |
| `tools/build_blog.py` | Article texts and generator for the blog. |
| `tools/layout.py` | Shared header, navigation and footer for generated pages. |

## Changing content

- Quiz: edit `assets/quiz-config.js`. No build step.
- Providers: edit the lists at the top of `tools/build_pages.py`, then run `python3 tools/build_pages.py`.
- Blog: append to `ARTICLES` in `tools/build_blog.py`, then run `python3 tools/build_blog.py`.
- Navigation: change `NAV` in `tools/layout.py`, rerun both scripts, and update the same links in `index.html`.

## What this demo does not do

- No form, no database, no login. Quiz answers stay in the visitor's browser.
- The provider cards are based on public information and the team's own research. The companies listed are not partners and have not confirmed the texts.
- The insurer page gives no prices, ranking or advice.
- The blog articles are test content and have not been reviewed by a specialist.
