# Curriculum Vitae – Umberto Calò

CV online costruito con [Quartz](https://quartz.jzhao.xyz/), generatore di siti statici in stile Obsidian, pubblicato tramite Cloudflare Pages.

🔗 **Sito live:** https://umbertocalo.dpdns.org

> Versione alternativa basata su MkDocs disponibile nel repo [`pvt-curriculum-vitae`](https://github.com/umbertocalo/pvt-curriculum-vitae), release `v1.0.0`.

## Stack

- **Quartz** – generatore di siti statici da Markdown, stile Obsidian (wikilink, tag, ricerca, graph view)
- **Node.js / TypeScript**
- **Cloudflare Pages** – hosting e deploy automatico da GitHub

## Struttura del progetto

```
.
├── quartz.config.ts     # configurazione del sito (titolo, tema, colori, plugin)
├── quartz.layout.ts      # layout delle pagine
├── content/
│   └── index.md           # contenuto del CV
└── quartz/                 # core di Quartz (non modificare direttamente)
```

## Sviluppo in locale

Requisiti: Node.js >= 22, npm >= 10.9.2

```bash
# Clona il repository
git clone https://github.com/umbertocalo/quartz-curriculum-vitae.git
cd quartz-curriculum-vitae

# Installa le dipendenze
npm i

# Installa i plugin referenziati dal template scelto
npx quartz plugin install --from-config

# Avvia il server di anteprima locale con hot-reload
npx quartz build --serve
```

Il sito sarà disponibile su `http://localhost:8080`.

## Build

```bash
npx quartz build
```

I file statici verranno generati nella cartella `public/`.

## Deploy

Il deploy è automatico: ogni push sul branch `main` triggera una build su **Cloudflare Pages**.

**Configurazione build su Cloudflare Pages:**

| Impostazione | Valore |
|---|---|
| Build command | `npx quartz build` |
| Build output directory | `public` |
| Root directory | `/` |
| Variabile ambiente | `NODE_VERSION=22` |

## Modifica del contenuto

Il contenuto del CV si trova in [`content/index.md`](content/index.md), con tag inline stile Obsidian (es. `#DataCenter #CiscoUCS`) e frontmatter YAML. Aggiornalo, fai commit e push: il sito si aggiorna automaticamente.

## Licenza e utilizzo

Questo repository contiene contenuti personali (curriculum vitae). Il codice di configurazione (quartz.config.ts, ecc.) è liberamente riutilizzabile; i contenuti testuali sono © Umberto Calò.

---

📧 [umbertocalo09@gmail.com](mailto:umbertocalo09@gmail.com) · 🔗 [LinkedIn](https://www.linkedin.com/in/umbertocalo) · 💻 [GitHub](https://www.github.com/umbertocalo)