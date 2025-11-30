import fetch from "node-fetch";

const API_KEY = process.env.PEBBLE_API_KEY;
const SERVER_ID = process.env.PEBBLE_SERVER_ID;

const BASE_URL = `https://api.pebblehost.com/prod/server/${SERVER_ID}`;

export async function startServer() {
  const res = await fetch(`${BASE_URL}/power`, {
    method: "POST",
    headers: { "Authorization": API_KEY },
    body: JSON.stringify({ signal: "start" })
  });

  return "🟢 Server start requested!";
}

export async function stopServer() {
  const res = await fetch(`${BASE_URL}/power`, {
    method: "POST",
    headers: { "Authorization": API_KEY },
    body: JSON.stringify({ signal: "stop" })
  });

  return "🔴 Server stop requested!";
}

export async function getServerStatus() {
  const res = await fetch(`${BASE_URL}`, {
    headers: { "Authorization": API_KEY }
  });

  if (!res.ok) return "Server unreachable.";

  const data = await res.json();
  return `Status: **${data.status}**`;
}

export async function getPlayerList() {
  const res = await fetch(`${BASE_URL}`, {
    headers: { "Authorization": API_KEY }
  });

  if (!res.ok) return [];

  const data = await res.json();
  return data.players || [];
}
