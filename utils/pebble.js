import fetch from "node-fetch";

const API_KEY = process.env.PEBBLE_API_KEY;
const SERVER_ID = process.env.PEBBLE_SERVER_ID;

// Pebble API base (client API)
const BASE = `https://api.pebblehost.com/v2/client/servers/${SERVER_ID}`;

export async function startServer() {
  return await fetch(`${BASE}/power`, {
    method: "POST",
    headers: {
      Authorization: API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ signal: "start" })
  }).then(r => r.json());
}

export async function stopServer() {
  return await fetch(`${BASE}/power`, {
    method: "POST",
    headers: {
      Authorization: API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ signal: "stop" })
  }).then(r => r.json());
}

export async function getStatus() {
  return await fetch(`${BASE}`, {
    headers: {
      Authorization: API_KEY
    }
  }).then(r => r.json());
}

export async function listOnlinePlayers() {
  return await fetch(`${BASE}/players`, {
    headers: {
      Authorization: API_KEY
    }
  }).then(r => r.json());
}
