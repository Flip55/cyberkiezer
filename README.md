# Cybersecurity Checker

Site for cybersecuritychecker.be: a cybersecurity quickscan for Flemish SMEs, overview pages of providers and a blog. Static files only, served by GitHub Pages.

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

## Lead form

The result page can show a form asking for name, email, phone and company, with a consent checkbox. It is switched off until `lead.endpoint` in `assets/quiz-config.js` holds the URL that receives the submission. Until then the button on the result page links to `cta.url`.

On submit the page sends one JSON POST with the contact fields, the score, level, priorities and every quiz answer. Fixed extra fields, such as an access key for a form service, go in `lead.extraFields`.

## Open points

- No privacy policy page yet. One is needed before the lead form is switched on.
- The contact address for providers is still `info@example.com`.
- Provider cards are based on public information and the team's own research. The companies have not confirmed the texts.
- The insurer page gives no prices, ranking or advice.
- The blog articles have not been reviewed by a specialist.
