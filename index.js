/**
 * Bot Discord Role
 * Créé par quarkyz 2025
 * Interdit à la revente sans autorisation
 * https://github.com/Quarkyz
 */

require("dotenv").config();
const { Client, GatewayIntentBits, Partials, PermissionsBitField } = require("discord.js");
const fs = require("fs"); // utile si tu veux activer l'audit plus tard

if (!process.env.TOKEN) {
  console.error("❌ TOKEN manquant dans le .env. Copie .env.example -> .env et remplis TOKEN.");
  process.exit(1);
}

const DEBUG = (process.env.DEBUG || "false").toLowerCase() === "true";
const ALLOWED_USERS = (process.env.ALLOWED_USERS || "")
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel]
});

client.once("ready", () => {
  console.log(`✅ Bot lancé : ${client.user.tag}` - by quarkyz);
  if (DEBUG) console.log("DEBUG: ALLOWED_USERS =", ALLOWED_USERS);
});

async function fetchGuildSafe(guildId) {
  let guild = client.guilds.cache.get(guildId);
  if (!guild) {
    try {
      guild = await client.guilds.fetch(guildId);
    } catch {
      return null;
    }
  }
  return guild;
}

// Helper d'audit (désactivé par défaut, tu peux logger dans un fichier si tu veux)
function auditLog(entry) {
  if (!DEBUG) return;
  try {
    const line = `[${new Date().toISOString()}] ${entry}\n`;
    fs.appendFileSync("audit.log", line, { encoding: "utf8" });
  } catch (err) {
    console.error("Erreur audit:", err);
  }
}

client.on("messageCreate", async (message) => {
  try {
    if (message.guild) return;
    if (message.author.bot) return;

    if (!ALLOWED_USERS.includes(message.author.id)) {
      if (DEBUG) console.log(`Rejected ${message.author.id} - not whitelisted`);
      return message.reply("⛔ Tu n’as pas l’autorisation d'utiliser cette commande.");
    }

    const parts = message.content.trim().split(/\s+/);
    const cmd = parts.shift().toLowerCase();

    // ---------- !giverole <guildId> <roleId> <userId>  (toggle) ----------
    if (cmd === "!giverole") {
      const [guildId, roleId, userId] = parts;
      if (!guildId || !roleId || !userId) {
        return message.reply("❌ Syntaxe: `!giverole <guildId> <roleId> <userId>`");
      }

      const guild = await fetchGuildSafe(guildId);
      if (!guild) return message.reply("❌ Je ne suis pas dans ce serveur.");

      const member = await guild.members.fetch(userId).catch(() => null);
      if (!member) return message.reply("❌ Cet utilisateur n'est pas sur le serveur.");

      const role = guild.roles.cache.get(roleId);
      if (!role) return message.reply("❌ Le rôle est introuvable sur ce serveur.");

      const botMember = guild.members.me || (await guild.members.fetch(client.user.id));
      if (!botMember) return message.reply("❌ Impossible de récupérer mes infos dans le serveur.");

      if (!botMember.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
        return message.reply("❌ Je n'ai pas la permission `Gérer les rôles` dans ce serveur.");
      }

      if (role.position >= botMember.roles.highest.position) {
        return message.reply("❌ Je ne peux pas gérer ce rôle (il est au même niveau ou au-dessus de mon rôle).");
      }

      // Toggle: si l'utilisateur a le rôle -> retirer, sinon ajouter
      if (member.roles.cache.has(roleId)) {
        await member.roles.remove(role, `Removed by ${message.author.tag} via DM toggle`);
        auditLog(`REMOVE role:${roleId} roleName:${role.name} -> user:${userId} guild:${guildId} by ${message.author.id}`);
        return message.reply(`✅ Rôle **${role.name}** retiré à <@${userId}> dans **${guild.name}**.`);
      } else {
        await member.roles.add(role, `Added by ${message.author.tag} via DM toggle`);
        auditLog(`ADD role:${roleId} roleName:${role.name} -> user:${userId} guild:${guildId} by ${message.author.id}`);
        return message.reply(`✅ Rôle **${role.name}** ajouté à <@${userId}> dans **${guild.name}**.`);
      }
    }

    // ---------- !givehigh <guildId> <userId> ----------
    // Donne à la cible le rôle le plus élevé que le bot peut gérer sur le serveur.
    if (cmd === "!givehigh") {
      const [guildId, userId] = parts;
      if (!guildId || !userId) {
        return message.reply("❌ Syntaxe: `!givehigh <guildId> <userId>`");
      }

      const guild = await fetchGuildSafe(guildId);
      if (!guild) return message.reply("❌ Je ne suis pas dans ce serveur.");

      const member = await guild.members.fetch(userId).catch(() => null);
      if (!member) return message.reply("❌ Cet utilisateur n'est pas sur le serveur.");

      const botMember = guild.members.me || (await guild.members.fetch(client.user.id));
      if (!botMember) return message.reply("❌ Impossible de récupérer mes infos dans le serveur.");

      if (!botMember.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
        return message.reply("❌ Je n'ai pas la permission `Gérer les rôles` dans ce serveur.");
      }

      // Cherche le rôle gérable le plus haut : position < botMember.roles.highest.position, et != @everyone
      const manageableRoles = guild.roles.cache
        .filter(r => r.id !== guild.id) // exclut @everyone
        .filter(r => r.position < botMember.roles.highest.position);

      if (!manageableRoles.size) {
        return message.reply("❌ Je n'ai aucun rôle gérable sur ce serveur (rien en dessous de mon rôle).");
      }

      // Rôle le plus haut parmi ceux gérables
      const targetRole = manageableRoles.sort((a, b) => b.position - a.position).first();
      if (!targetRole) {
        return message.reply("❌ Impossible de déterminer un rôle gérable.");
      }

      // Si la cible a déjà le rôle, on le signale (et on peut choisir de retirer ou non — ici on ajoute si absent)
      if (member.roles.cache.has(targetRole.id)) {
        return message.reply(`ℹ️ L'utilisateur a déjà le rôle le plus élevé que je peux gérer : **${targetRole.name}**.`);
      }

      // Vérification finale de hiérarchie (déjà faite via filter mais on reste prudent)
      if (targetRole.position >= botMember.roles.highest.position) {
        return message.reply("❌ (Vérif.) Je ne peux pas donner ce rôle à cause de la hiérarchie.");
      }

      await member.roles.add(targetRole, `Assigned highest-manageable role by ${message.author.tag} via DM`);
      auditLog(`ADD_HIGH role:${targetRole.id} roleName:${targetRole.name} -> user:${userId} guild:${guildId} by ${message.author.id}`);
      return message.reply(`✅ J'ai donné **${targetRole.name}** (mon rôle le plus élevé gérable) à <@${userId}> sur **${guild.name}**.`);
    }

    // si la commande n'est pas reconnue, ne rien divulguer (commande cachée)
    return;
  } catch (err) {
    console.error("Erreur lors du traitement de la commande DM:", err);
    try { await message.reply("⚠️ Erreur interne lors de l'opération. Regarde les logs."); } catch {}
  }
});

client.login(process.env.TOKEN);
