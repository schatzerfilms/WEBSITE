# 🚀 SchatzerFilms - GitHub & Workflow Anleitung

Willkommen im Projekt! Diese Anleitung erklärt dir (und Antigravity), wie du Änderungen am Code herunterlädst, bearbeitest und wieder hochlädst.

## 1. Projekt zum ersten Mal herunterladen (Klonen)
Bevor du anfangen kannst, musst du das Projekt auf deinen PC laden.

1. Öffne **Antigravity** (oder VS Code / Cursor).
2. Öffne ein neues Terminal (`Strg` + `ö` oder `Terminal -> New Terminal`).
3. Lade das Projekt herunter:
   ```bash
   git clone https://github.com/ateismossss/schatzerfilms.git
   ```
4. Öffne den neu erstellten Ordner `schatzerfilms` in Antigravity (`File -> Open Folder`).
5. Installiere die nötigen Pakete:
   ```bash
   npm install
   ```
6. Starte den lokalen Entwicklungs-Server zum Testen:
   ```bash
   npm run dev
   ```

---

## 2. Der tägliche Workflow (Änderungen machen)

Bevor du etwas am Code änderst, **hole dir immer die neueste Version** vom Server!
So vermeidest du Konflikte, falls jemand anderes in der Zwischenzeit etwas geändert hat.

### Schritt A: Neuesten Stand herunterladen
```bash
git pull origin main
```

### Schritt B: Code bearbeiten
Jetzt kannst du den Code in Antigravity ganz normal bearbeiten und testen.

### Schritt C: Deine Änderungen speichern (Commit & Push)
Wenn du fertig bist und deine Änderungen hochladen möchtest, führe diese 3 Befehle nacheinander im Terminal aus:

1. **Alle geänderten Dateien vormerken:**
   ```bash
   git add .
   ```

2. **Die Änderungen beschreiben (Commit):**
   *Tipp: Schreib eine kurze, klare englische Nachricht, was du gemacht hast.*
   ```bash
   git commit -m "Aktualisiere die Team-Seite und ändere Text"
   ```

3. **Die Änderungen auf GitHub hochladen (Push):**
   ```bash
   git push origin main
   ```

🎉 **Fertig!** Dein Code ist jetzt online auf GitHub.

---

## 3. Was tun, wenn es einen Konflikt gibt?
Falls das Terminal beim `git push` meckert ("Updates were rejected because the remote contains work that you do not have locally"):
1. Mach zuerst einen `git pull origin main` (um die Änderungen der anderen herunterzuladen)
2. Gehe in die Dateien, die Konflikte haben, und akzeptiere die richtigen Änderungen
3. Mach danach wieder `git add .`, `git commit -m "Fix merge conflict"` und `git push origin main`.

---

## 4. Wie du direkt auf dem Server arbeitest (Antigravity Remote-SSH)
Statt Dateien lokal herunterzuladen und hochzuladen, kannst du dich mit Antigravity (VS Code) auch **direkt mit dem Server verbinden**. Das bedeutet: Du tippst Code, und er ist sofort live auf dem Server!

So geht's:
1. Klicke in Antigravity ganz unten links auf das blau/grüne Symbol `><` (Oder drücke F1 und suche nach "Remote-SSH: Connect to Host...").
2. Wähle **Connect to SSH Host...**
3. Klicke auf **Add New SSH Host...** und gib ein:
   `ssh Administrator@45.13.227.212`
   (Oder einen anderen User, je nachdem was für dich auf dem Server eingerichtet wurde).
4. Nach dem Verbinden und der Passworteingabe bist du direkt auf dem Server.
5. Klicke auf **Open Folder** und wähle den Projektordner aus (`C:\Users\Administrator\Downloads\schatzerfilms`).

Jetzt kannst du alle Dateien **live** bearbeiten. Wenn du speicherst, ändert sich die Website sofort!

**WICHTIG:** Du solltest trotzdem regelmäßig Commits auf GitHub hochladen (wie in Schritt 2 beschrieben), damit der Code als Backup auf GitHub gespeichert bleibt!
