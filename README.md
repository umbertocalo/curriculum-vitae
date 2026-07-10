# Curriculum Vitae – Umberto Calò

CV online costruito con [MkDocs](https://www.mkdocs.org/) e tema [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/), pubblicato tramite Cloudflare Pages.

🔗 **Sito live:** https://umbertocalo.dpdns.org

## Stack

- **MkDocs** – generatore di siti statici da Markdown
- **Material for MkDocs** – tema
- **Cloudflare Pages** – hosting e deploy automatico da GitHub

## Struttura del progetto

```bash
.
├── mkdocs.yml          # configurazione del sito e del tema
├── requirements.txt    # dipendenze Python
└── docs/
    └── index.md         # contenuto del CV
```

## Sviluppo in locale

Requisiti: Python 3.9+

```bash
# Clona il repository
git clone https://github.com/umbertocalo/pvt-curriculum-vitae.git
cd pvt-curriculum-vitae

# Crea un ambiente virtuale (opzionale ma consigliato)
python -m venv venv
source venv/bin/activate      # su Windows: venv\Scripts\activate

# Installa le dipendenze
pip install -r requirements.txt

# Avvia il server di anteprima locale
mkdocs serve
```

Il sito sarà disponibile su `http://127.0.0.1:8000` con hot-reload ad ogni modifica.

## Build

```bash
mkdocs build
```

I file statici verranno generati nella cartella `site/`.

## Deploy

Il deploy è automatico: ogni push sul branch `main` triggera una build su **Cloudflare Pages**.

**Configurazione build su Cloudflare Pages:**

| Impostazione | Valore |
|---|---|
| Build command | `pip install -r requirements.txt && mkdocs build` |
| Build output directory | `site` |
| Root directory | `/` |

## Modifica del contenuto

Il contenuto del CV si trova in [`docs/index.md`](docs/index.md). Aggiornalo, fai commit e push: il sito si aggiorna automaticamente.

## Licenza e utilizzo

Questo repository contiene contenuti personali (curriculum vitae). Il codice di configurazione (mkdocs.yml, ecc.) è liberamente riutilizzabile; i contenuti testuali sono © Umberto Calò.

---

📧 [umbertocalo09@gmail.com](mailto:umbertocalo09@gmail.com) · 🔗 [LinkedIn](https://www.linkedin.com/in/umbertocalo) · 💻 [GitHub](https://www.github.com/umbertocalo)
