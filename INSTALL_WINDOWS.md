# Grafana OSS - Windows Installation Guide

## Prerequisites

Install the following tools before building Grafana:

| Tool | Version | Download |
|------|---------|----------|
| **Go** | 1.25.5+ | https://go.dev/dl/ |
| **Node.js** | 22.x LTS | https://nodejs.org/ |
| **Yarn** | 4.x | `npm install -g yarn` |
| **MinGW-w64** (GCC 64-bit) | 15.x | https://winlibs.com/ |

### MinGW-w64 Installation

1. Download from [WinLibs](https://winlibs.com/) - choose **Win64 / UCRT / without LLVM**
2. Extract to `C:\mingw64`
3. Add `C:\mingw64\bin` to your system PATH
4. Verify: `gcc --version` should show `x86_64-w64-mingw32`

---

## Installation Steps

### 1. Clone the Repository

```powershell
git clone https://github.com/grafana/grafana.git grafana_oss
cd grafana_oss
```

### 2. Install Frontend Dependencies

```powershell
yarn install
```

> **Note:** If you encounter temp file errors, try:
> ```powershell
> $env:TEMP="C:\Temp"; $env:TMP="C:\Temp"; yarn install
> ```

### 3. Build the Backend

```powershell
go run build.go build
```

This creates:
- `bin\windows-amd64\grafana.exe`
- `bin\windows-amd64\grafana-server.exe`
- `bin\windows-amd64\grafana-cli.exe`

### 4. Build the Frontend

```powershell
npx webpack --config scripts/webpack/webpack.prod.js
```

---

## Running Grafana

### Start the Server

```powershell
.\bin\windows-amd64\grafana.exe server
```

### Access Grafana

Open your browser: **http://localhost:3000**

Default credentials:
- **Username:** `admin`
- **Password:** `admin`

---

## Development Mode

For frontend development with hot reload:

**Terminal 1 - Backend:**
```powershell
.\bin\windows-amd64\grafana.exe server
```

**Terminal 2 - Frontend Dev Server:**
```powershell
yarn start
```

---

## Troubleshooting

### "gcc not found" or "64-bit mode not compiled in"
- Install MinGW-w64 (64-bit version) from https://winlibs.com/
- Ensure `C:\mingw64\bin` is in your PATH
- Restart your terminal

### "make is not recognized"
- Run Go commands directly instead of make:
  - `go run build.go build` (instead of `make build`)
  - `go run build.go setup` (instead of `make deps-go`)

### Blank page at localhost:3000
- Build the frontend: `npx webpack --config scripts/webpack/webpack.prod.js`
- Restart the Grafana server

### Yarn install fails with file errors
- Use a non-OneDrive temp directory:
  ```powershell
  $env:TEMP="C:\Temp"; $env:TMP="C:\Temp"; yarn install
  ```
