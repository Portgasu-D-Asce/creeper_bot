import fetch from "node-fetch";

const API_KEY = process.env.PEBBLE_API_KEY;
const SERVER_ID = process.env.PEBBLE_SERVER_ID;

const BASE = `https://api.pebblehost.com/v2/client/servers/${SERVER_ID}`;

export async function startServer() {
  await fetch(`${BASE}/power`, {
    method: "POST",
    headers: {
      "Authorization": API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ signal: "start" })
  });

  return "🟢 Server start requested!";
}

export async function stopServer() {
  await fetch(`${BASE}/power`, {
    method: "POST",
    headers: {
      "Authorization": API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ signal: "stop" })
  });

  return "🔴 Server stop requested!";
}

export async function getStatus() {
  const res = await fetch(`${BASE}`, {
    headers: { "Authorization": API_KEY }
  });

  if (!res.ok) return "❌ Error fetching status.";

  const json = await res.json();
  return `Server Status: **${json.status}**`;
}

export async function listPlayers() {
  const res = await fetch(`${BASE}`, {
    headers: { "Authorization": API_KEY }
  });

  const json = await res.json();
  return json.players || [];
}
