# 🌐 Portfolio Website

> A modern, interactive portfolio built with **React**, **TypeScript**, **Vite**, and **Three.js** — containerised with **Docker** and served via **Nginx**.

---

## ✨ Tech Stack

| Category | Technology |
|---|---|
| UI Framework | React 19 + TypeScript |
| Build Tool | Vite 8 |
| 3D / Animation | Three.js · @react-three/fiber · @react-three/drei · GSAP |
| Styling | Vanilla CSS |
| Containerisation | Docker (multi-stage build) |
| Web Server | Nginx (Alpine) |

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js ≥ 18
- npm

### Install & Run

```bash
# 1. Clone the repo
git clone https://github.com/rakhi120805/Portfolio-wesite.git
cd Portfolio-wesite

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

The app will be available at **http://localhost:5173**

### Other Scripts

| Command | Description |
|---|---|
| `npm run build` | Production build (TypeScript check + Vite bundle) |
| `npm run preview` | Locally preview the production build |
| `npm run lint` | Run ESLint |

---

## 🐳 Docker Deployment

The project ships with a **multi-stage Dockerfile** that produces a lean production image (~93 MB):

```
Stage 1 — node:20-alpine   →  npm ci + npm run build
Stage 2 — nginx:stable-alpine  →  serves /dist on port 80
```

### Build & Run

```bash
# Build the image
docker build -t portfolio-website .

# Run the container (maps container port 80 → host port 5173)
docker run -p 5173:80 portfolio-website
```

Open **http://localhost:5173** in your browser.

---

## 📸 Docker Build & Run — Screenshots

### 1. Docker Build (16/16 layers — FINISHED)

<img width="773" height="788" alt="Screenshot 2026-04-26 222303" src="https://github.com/user-attachments/assets/1d7a7f9c-09b2-4123-9ea1-b12148220c61" />


### 2. Nginx Server Startup

![Nginx starting inside the container with worker processes spawned](docs/docker-build-2.png)

### 3. `docker ps` — Container Running

![docker ps output confirming container is up and port 5173:80 is mapped](docs/docker-ps.png)

### 4. Docker Desktop — Containers View

![Docker Desktop showing portfolio-website container running (confident_roentgen)](docs/docker-desktop-containers.png)

### 5. Docker Desktop — Image Layers (93.51 MB)

![Docker Desktop image inspection showing 25 layers and 93.51 MB final image size](docs/docker-desktop-image.png)

---

## 📁 Project Structure

```
portfolio3/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   ├── assets/          # Images, fonts, etc.
│   └── main.tsx         # App entry point
├── Dockerfile           # Multi-stage Docker build
├── nginx.conf           # SPA-friendly Nginx config
├── .dockerignore        # Excludes node_modules / dist from build context
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 📦 Docker Image Details

| Property | Value |
|---|---|
| Base (build) | `node:20-alpine` |
| Base (serve) | `nginx:stable-alpine` |
| Final image size | **~93.51 MB** |
| Exposed port | `80` |
| Nginx version | 1.30.0 |

---

## 🛠️ Nginx Configuration

The bundled `nginx.conf` provides:
- ✅ **SPA fallback** — all routes redirect to `index.html` (React Router compatible)
- ✅ **Gzip compression** for JS / CSS / SVG / fonts
- ✅ **1-year cache headers** for hashed static assets

---

## 📝 License

MIT © Rakhi
