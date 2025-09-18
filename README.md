![Quarkyz 2025](https://img.shields.io/badge/Created%20by-Quarkyz%202025-blue?style=for-the-badge&logo=github)

# Bot Discord : Donneur de rôles en DM

Ce bot sert à donner ou enlever des rôles dans un serveur Discord **en message privé (DM)**.  
Il est **caché** : personne ne voit les commandes sauf toi (et les gens autorisés dans le fichier `.env`).

Langues disponibles : 🇫🇷 Français | 🇬🇧 English | 🇪🇸 Español | 🇵🇹 Português | 🇩🇪 Deutsch | 🇮🇹 Italiano | 🇷🇺 Русский | 🇯🇵 日本語 | 🇨🇳 中文 | 🇦🇪 العربية

---

# ⚙️ Installation pas à pas

## 🖥️ Sur Windows

1. **Installer Node.js**  
   - Va sur [https://nodejs.org](https://nodejs.org)  
   - Clique sur le gros bouton vert (version LTS).  
   - Installe en cliquant **Suivant** partout (laisse les options par défaut).

2. **Télécharger le projet**  
   - Clique sur le bouton vert **Code** sur GitHub → **Download ZIP**.  
   - Décompresse le ZIP dans un dossier facile (par exemple : `C:\BotDiscord`).

3. **Ouvrir l’invite de commandes**  
   - Appuie sur `Win + R`.  
   - Tape `cmd` et fais **Entrée**.  
   - Va dans ton dossier (exemple) :
     ```
     cd C:\chemin-accès-vers ton dossier
     ```
   - Ou clique droit dans le dossier -> ouvrir dans le Terminal

4. **Installer les paquets nécessaires**  
   Tape dans la fenêtre CMD : NPM Install

5. **Créer le fichier `.env`**  
- Copie le fichier `.env.example`.  
- Renomme-le en `.env`.  
- Ouvre-le avec le Bloc-Notes.  
- Mets ton **token de bot** et ton **ID utilisateur** :
  ```
  TOKEN=TON_TOKEN_ICI
  ALLOWED_USERS=TON_ID_ICI
  DEBUG=false
  ```

6. **Démarrer le bot**  
Tape dans le cmd : Node Index.js

7. ✅ Le bot est en ligne ! Tu peux maintenant lui écrire en DM.

---

## 🐧 Sur Linux

1. **Installer Node.js et Git**  
Ouvre un terminal et tape :
```
sudo apt update
sudo apt install -y nodejs npm git
```

2. **Télécharger le projet**  
Avec git :
```
git clone <url_du_repo>
cd dm-role-giver
```
(si tu as un ZIP, décompresse-le puis va dans le dossier).

3. **Installer les paquets nécessaires**  
npm install

4. **Créer le fichier `.env`**  
```
cp .env.example .env
nano .env
```
Mets ton token et ton ID :
```
TOKEN=TON_TOKEN_ICI
ALLOWED_USERS=TON_ID_ICI
DEBUG=false
```
Sauvegarde avec `CTRL+O` puis **Entrée**, puis quitte avec `CTRL+X`.

5. **Démarrer le bot**  
npm start

6. ✅ Le bot est en ligne ! Tu peux maintenant lui écrire en DM.

---

# 📜 Commandes (DM uniquement)

⚠️ **Ces commandes ne fonctionnent qu’en messages privés avec le bot.**  
⚠️ **Seuls les utilisateurs listés dans `ALLOWED_USERS` peuvent les utiliser.**

### 1. Donner ou enlever un rôle précis (toggle)

!giverole <guildId> <roleId> <userId>
- Si la personne n’a pas le rôle → le bot lui donne.  
- Si la personne a déjà le rôle → le bot lui retire.  

Exemple : !giverole 123456789012345678 987654321098765432 111111111111111111

### 2. Donner automatiquement le rôle le plus haut que le bot peut gérer
!givehigh <guildId> <userId>
- Le bot donne le rôle le plus haut qu’il peut donner (juste en dessous de son rôle le plus élevé).  
- Si la personne a déjà ce rôle → le bot le dit.  

Exemple :
!givehigh 123456789012345678 111111111111111111


---

# ⚠️ Règles importantes

- Le bot doit être **dans le serveur**.  
- Le bot doit avoir la permission **Gérer les rôles**.  
- Le rôle du bot doit être **au-dessus** du rôle que tu veux donner.  
- Garde ton **token secret** (ne le montre jamais à personne).  
- Mets seulement ton ID (et ceux de confiance) dans `ALLOWED_USERS`.  
- Les commandes sont **cachées** : si quelqu’un ne lit pas ce fichier, il ne saura pas comment les utiliser.

--------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------

# Discord Bot: Role Giver via DM

This bot allows you to give or remove roles on a Discord server **through direct messages (DM)**.  
It is **hidden**: no one sees the commands except you (and users authorized in the `.env` file).

Available languages: 🇫🇷 Français | 🇬🇧 English | 🇪🇸 Español | 🇵🇹 Português | 🇩🇪 Deutsch | 🇮🇹 Italiano | 🇷🇺 Русский | 🇯🇵 日本語 | 🇨🇳 中文 | 🇦🇪 العربية

---

# ⚙️ Step-by-Step Installation

## 🖥️ On Windows

1. **Install Node.js**  
   - Go to [https://nodejs.org](https://nodejs.org)  
   - Click the big green button (LTS version).  
   - Install by clicking **Next** everywhere (keep default options).

2. **Download the project**  
   - Click the green **Code** button on GitHub → **Download ZIP**.  
   - Extract the ZIP into an easy-to-access folder (e.g., `C:\DiscordBot`).

3. **Open Command Prompt**  
   - Press `Win + R`.  
   - Type `cmd` and press **Enter**.  
   - Navigate to your folder:
     ```
     cd C:\path-to-your-folder
     ```
   - Or right-click inside the folder → Open in Terminal

4. **Install required packages**  
npm install

markdown
Copier le code

5. **Create the `.env` file**  
- Copy the `.env.example` file.  
- Rename it to `.env`.  
- Open it with Notepad.  
- Enter your **bot token** and your **user ID**:
  ```
  TOKEN=YOUR_TOKEN_HERE
  ALLOWED_USERS=YOUR_ID_HERE
  DEBUG=false
  ```

6. **Start the bot**  
node index.js

yaml
Copier le code

7. ✅ The bot is online! You can now DM it.

---

## 🐧 On Linux

1. **Install Node.js and Git**  
Open a terminal and type:
sudo apt update
sudo apt install -y nodejs npm git

markdown
Copier le code

2. **Download the project**  
Using git:
git clone <repo_url>
cd dm-role-giver

css
Copier le code
(If you have a ZIP, extract it and navigate to the folder.)

3. **Install required packages**  
npm install

markdown
Copier le code

4. **Create the `.env` file**  
cp .env.example .env
nano .env

yaml
Copier le code
Enter your token and ID:
TOKEN=YOUR_TOKEN_HERE
ALLOWED_USERS=YOUR_ID_HERE
DEBUG=false

markdown
Copier le code
Save with `CTRL+O`, press **Enter**, then exit with `CTRL+X`.

5. **Start the bot**  
npm start

yaml
Copier le code

6. ✅ The bot is online! You can now DM it.

---

# 📜 Commands (DM only)

⚠️ **These commands only work in private messages with the bot.**  
⚠️ **Only users listed in `ALLOWED_USERS` can use them.**

### 1. Give or remove a specific role (toggle)

!giverole <guildId> <roleId> <userId>

diff
Copier le code
- If the user does not have the role → the bot gives it.  
- If the user already has the role → the bot removes it.  

Example: 
!giverole 123456789012345678 987654321098765432 111111111111111111

shell
Copier le code

### 2. Automatically give the highest role the bot can manage

!givehigh <guildId> <userId>

diff
Copier le code
- The bot gives the highest role it can manage (just below its highest role).  
- If the user already has this role → the bot notifies it.  

Example:
!givehigh 123456789012345678 111111111111111111

markdown
Copier le code

---

# ⚠️ Important Rules

- The bot must be **in the server**.  
- The bot must have the **Manage Roles** permission.  
- The bot's role must be **above** the role you want to give.  
- Keep your **token secret** (never show it to anyone).  
- Only put your ID (and trusted users) in `ALLOWED_USERS`.  
- Commands are **hidden**: if someone doesn't read this file, they won’t know how to use them.
