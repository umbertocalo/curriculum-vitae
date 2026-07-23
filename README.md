# 📄 CV / Personal Portfolio

A **minimalist and responsive** website to manage and showcase my CV in an elegant way. A personal project created with the goal of making it easier to manage and update my Curriculum Vitae.

**Live at**: [umbical.dpdns.org](https://umbical.dpdns.org)

## 🎨 Inspiration and Credits

- **Structural Idea**: inspired by [davidepucci.it](https://davidepucci.it/resume/) ([@streambinder](https://github.com/streambinder)) — homepage = curriculum
- **Design and Color Palette**: based on [stephango.com](https://stephango.com) ([@kepano](https://github.com/kepano)) and the **Flexoki** palette (MIT License)
- **Development**: built with the help of **Claude AI** for the web design aspects, given my limited background in this area

## 🏗️ Repository Structure

### Tech Stack

- **Framework**: [Jekyll](https://jekyllrb.com/) 4.3+ (static site generator with Ruby)
- **Language**: SCSS for styles
- **Hosting**: [Cloudflare Pages](https://pages.cloudflare.com/) (free)
- **PDF Generation**: Node.js (Puppeteer) to generate CV as PDF
- **Domain**: [DigitalPlatDev/FreeDomain](https://github.com/DigitalPlatDev/FreeDomain) (free .dpdns.org domain)

### File Structure

```
.
├── _config.yml              # Jekyll configuration (title, URL, theme)
├── _data/                   # Content in YAML format (separated from logic)
│   ├── profile.yml          # Personal info (name, role, bio, contacts)
│   ├── skills.yml           # Skills grouped by area
│   ├── experience.yml       # Work experience
│   ├── projects.yml         # Personal/professional projects
│   ├── certifications.yml   # Certifications
│   └── education.yml        # Education and training
├── _layouts/                # HTML templates (page layouts)
├── _sass/                   # Modular SCSS styles
│   ├── _variables.scss      # Color variables and accents
│   ├── _typography.scss     # Typography styles
│   └── ...other files
├── _includes/               # Reusable Liquid components
├── assets/                  # Compiled CSS, images, PDF
├── scripts/                 # Node.js scripts (PDF generation)
├── .github/workflows/       # GitHub Actions automation
├── Gemfile                  # Ruby dependencies
├── package.json             # Node.js dependencies
└── index.md                 # Main homepage
```

### Design Philosophy

- ✅ **Content separated from logic**: all CV content lives in `_data/*.yml`, updatable without touching HTML
- ✅ **Minimal Liquid templates**: each section is an independent, modular `include`
- ✅ **Organized SCSS**: styles divided by responsibility, under 500 lines total
- ✅ **Minimal JavaScript**: only dark/light toggle with localStorage
- ✅ **No heavy frameworks**: no Bootstrap, Tailwind, or bloated dependencies
- ✅ **Design-first**: typography and whitespace at the center

## ⚡ Local Setup

### Requirements
- Ruby ≥ 3.1
- Node.js ≥ 16 (only if using PDF generation)

### Installation

```bash
# Clone the repo
git clone https://github.com/umbertocalo/pvt-curriculum-vitae.git
cd pvt-curriculum-vitae

# Install Ruby dependencies
bundle install

# Start the local server
bundle exec jekyll serve

# Open http://localhost:4000
```

## 📝 Updating Content

All content lives in `_data/`:

| File | Content |
|------|---------|
| `profile.yml` | Name, role, bio, social links and contacts |
| `skills.yml` | Skills grouped by category |
| `experience.yml` | Work experience (with nested roles per company) |
| `projects.yml` | Projects, one per entry |
| `certifications.yml` | Certifications grouped by vendor |
| `education.yml` | Education and degrees |

**Note**: `description` fields support **Markdown** (use `-` for bullet points).

### Example: Update your profile

Edit `_data/profile.yml`:

```yaml
name: "Umberto Calò"
role: "Full Stack Developer"
bio: |
  Passionate about web design, Python and open source.
  I love learning new technologies...

contact:
  email: "hello@umbertocalo.com"
  github: "https://github.com/umbertocalo"
  linkedin: "https://linkedin.com/in/umbertocalo"
```

## 🎨 Customize Theme and Color

### Dark/Light Toggle
- Use the **button in the header**
- Or press the **`d`** key on your keyboard
- Your preference is saved in `localStorage`

### Change the accent color
Edit `_config.yml`:

```yaml
default_accent: "blue"  # blue | orange | green | red
```

**To add a new color**, add a block in `_sass/_variables.scss`.

## 🚀 Deploy

The site is built and deployed to **Cloudflare Pages** with:

```bash
jekyll build && npm run generate:pdf
```

This command:
1. Builds the static Jekyll site
2. Generates the PDF version of the CV using Puppeteer
3. Outputs everything to `_site/` for Cloudflare Pages to serve

## 📄 Generate PDF

I use Puppeteer to convert the site to PDF:

```bash
npm install
npm run generate:pdf
```

Generates `assets/cv.pdf` from the `/cv/` page.

## 📜 License and Attribution

- **Flexoki color palette**: © [Steph Ango](https://github.com/kepano/flexoki) — MIT License
- **Structure and philosophy**: inspired by [Davide Pucci](https://davidepucci.it)
- **Free domain**: [DigitalPlatDev/FreeDomain](https://github.com/DigitalPlatDev/FreeDomain)
- **Content**: © 2026 Umberto Calò

---

**Made with ❤️ and the help of Claude AI**
