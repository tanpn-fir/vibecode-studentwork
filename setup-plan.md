# DEV ENVIRONMENT SETUP PLAN — for the AI to read & execute

> Give this file to the AI: "Read setup-plan.md and follow it, tick done when finished."
> 👤 = steps that REQUIRE you (the user) to act — the AI will pause and guide you.

## How to work (read first)
- The user is a beginner who knows almost nothing about the terminal.
- Before each step: explain it in 1–2 short, simple sentences (in Vietnamese), then RUN the command yourself in the terminal.
- Check before installing: if a tool already exists, tick it and skip the install.
- Ask for permission when admin/sudo rights are needed. On error: read it, try another way, then report to the user.
- After installing a tool, RESTART the terminal (or reload PATH) so the command is recognized.
- After finishing an item, change "[ ]" → "[x]" in this file. Work SEQUENTIALLY, do not skip steps.
- 👤 = steps that REQUIRE the user to act (type a password, authorize in the browser, give name/email). When you reach one, STOP, tell them exactly what to do, and wait for them before continuing.

## 0. Detect the system
- [ ] macOS: run `uname -m` to detect the chip (arm64 = Apple Silicon, x86_64 = Intel).
- [ ] Windows: open PowerShell; confirm you are in PowerShell (not CMD).

## 1. Package manager & command line tools
### macOS
- [ ] Install Xcode Command Line Tools (if missing): `xcode-select --install`.
- [ ] 👤 Install Homebrew (if `brew --version` says it's missing) — the installer will ask for the Mac login password; the user types it:
      `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
- [ ] Load Homebrew into PATH (Apple Silicon): `eval "$(/opt/homebrew/bin/brew shellenv)"` and add it to ~/.zprofile.
### Windows
- [ ] Check winget: `winget --version`. If missing, install "App Installer" from the Microsoft Store.
- [ ] (For native modules / node-gyp) install Visual Studio Build Tools:
      `winget install --id Microsoft.VisualStudio.2022.BuildTools -e` (workload "Desktop development with C++").

## 2. Git
- [ ] Install Git — mac: `brew install git` · win: `winget install --id Git.Git -e`.
- [ ] Verify: `git --version`.
- [ ] 👤 Configure identity — ASK the user for their Name + Email, then run:
      `git config --global user.name "<Name>"`
      `git config --global user.email "<email>"`
- [ ] Set defaults: `git config --global init.defaultBranch main` and `git config --global pull.rebase false`.

## 3. GitHub CLI — sign in to GitHub on this machine
- [ ] Install gh — mac: `brew install gh` · win: `winget install --id GitHub.cli -e`.
- [ ] 👤 Sign in: `gh auth login` (choose GitHub.com → HTTPS → authenticate via browser). The USER must finish signing in to GitHub and authorize in the browser — pause and guide them.
- [ ] Let git use gh for auth: `gh auth setup-git`. Verify: `gh auth status`.

## 4. Node.js + npm (via nvm for easy version switching)
### macOS / Linux
- [ ] Install nvm: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash` then reopen the terminal.
- [ ] Install Node LTS: `nvm install --lts` then `nvm use --lts` and `nvm alias default lts/*`.
### Windows
- [ ] Install Node LTS: `winget install --id OpenJS.NodeJS.LTS -e` (or nvm-windows if you need version switching).
- [ ] Verify: `node -v` (>= 18), `npm -v`, and `npx -v`.

## 5. Python 3 + pip
- [ ] Install Python — mac: `brew install python` · win: `winget install --id Python.Python.3.12 -e`.
- [ ] Verify: `python3 --version` (on Windows it may be `python --version`).
- [ ] Upgrade pip: `python3 -m pip install --upgrade pip`.

## 6. Helper tools
- [ ] (macOS, optional) Watchman for fast file watching: `brew install watchman`.
- [ ] Ensure `curl` and `unzip` exist (most machines have them; if not, install via brew/winget).

## 7. Final check & report
- [ ] Run and print: `git --version`, `gh --version`, `node -v`, `npm -v`, `python3 --version`.
- [ ] Print a summary table: Tool | Version | OK?.
- [ ] For any failed item: write down the error + the fix you tried.

## 8. Get the exercise code & run it (FINAL GOAL)
> If you are ALREADY inside the cloned repo, skip clone and just run it.
- [ ] Clone the exercise repo: `git clone https://github.com/tanpn-fir/vibecode-studentwork.git`
- [ ] Enter the folder: `cd vibecode-studentwork`
- [ ] Install dependencies (if any): `npm install`
- [ ] Run it: `npm run dev`, then open the localhost address it prints (e.g. http://localhost:5173).
- [ ] Open the browser and confirm the landing page shows up with the "Lộ trình bài tập" panel.

> ✅ SUCCESS = the exercise landing page RUNS on localhost.
> At that point every "[ ]" must be "[x]". Report: "Cloned and ran the landing page — ready for the exercises."
