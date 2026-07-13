# resume-site

Tema Jekyll custom per CV/portfolio personale. Ispirato alla tipografia e alla
palette di [stephango.com](https://stephango.com) (Flexoki, MIT) e alla
struttura "homepage = curriculum" di [davidepucci.it/resume](https://davidepucci.it/resume/).

## Filosofia

- **Contenuti in `_data/*.yml`**, mai nell'HTML: aggiorni il CV senza toccare i template.
- **Template Liquid minimi e modulari**: ogni sezione è un include indipendente.
- **SCSS diviso per responsabilità**, sotto le 500 righe totali.
- **Una sola dipendenza JS**: il toggle dark/light (nessun framework).
- Nessuna card, nessun box: solo tipografia e whitespace.

## Setup locale

Richiede Ruby ≥ 3.1.

```bash
bundle install
bundle exec jekyll serve
# apri http://localhost:4000
```

## Aggiornare i contenuti

Tutto vive in `_data/`:

| File | Contenuto |
| --- | --- |
| `profile.yml` | nome, ruolo, bio, contatti |
| `skills.yml` | competenze raggruppate per area |
| `experience.yml` | esperienze lavorative (roles annidati per azienda) |
| `projects.yml` | progetti, uno per voce |
| `certifications.yml` | certificazioni raggruppate per vendor |
| `education.yml` | formazione |

Le `description` supportano Markdown (usa `-` per liste puntate reali).

## Personalizzare tema e colore

- Dark/light: bottone in header, oppure tasto `d` da tastiera. Persistito in `localStorage`.
- Accent color: in `_config.yml`, chiave `default_accent` → `blue | orange | green | red`.
  Per aggiungerne uno nuovo, basta un blocco in `_sass/_variables.scss`.

## Deploy

Incluso un workflow GitHub Actions (`.github/workflows/deploy.yml`) che builda
e pubblica su GitHub Pages ad ogni push su `main`. Attivalo da:
`Settings → Pages → Source: GitHub Actions`.

In alternativa, funziona anche su Netlify/Cloudflare Pages: build command `bundle exec jekyll build`,
publish directory `_site`.

## Roadmap (ordine consigliato)

1. ✅ Homepage / Resume
2. ✅ Projects
3. ✅ Certifications
4. Blog tecnico (`_posts/`, layout `post.html`)
5. Notes stile digital garden (`notes/`, eventuali backlink)
6. Search
7. Tag pages
8. Feed RSS/Atom (`jekyll-feed` già incluso nel Gemfile)
9. Sitemap (`jekyll-sitemap` già incluso)
10. SEO tag (`jekyll-seo-tag` già incluso)
11. Mermaid per diagrammi
12. PrismJS per syntax highlighting nel blog
13. KaTeX se serve notazione matematica

## Licenza contenuti terzi

La palette colore Flexoki è di Steph Ango, rilasciata con licenza MIT
(<https://github.com/kepano/flexoki>). Attribuzione mantenuta nei commenti SCSS.
