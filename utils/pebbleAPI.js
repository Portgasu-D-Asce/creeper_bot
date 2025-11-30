import fetch from "node-fetch";

const API_KEY = process.env.PEBBLE_API_KEY;
const SERVER_ID = process.env.PEBBLE_SERVER_ID;

export async function startServer() {
  const res = await fetch(`https://panel.pebblehost.com/api/client/servers/${SERVER_ID}/power`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ signal: "start" })
  });

  return res.ok;
}

export async function stopServer() {
  const res = await fetch(`https://panel.pebblehost.com/api/client/servers/${SERVER_ID}/power`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ signal: "stop" })
  });

  return res.ok;
}

export async function getStatus() {
  const res = await fetch(`https://panel.pebblehost.com/api/client/servers/${SERVER_ID}/resources`, {
    headers: {
      "Authorization": `Bearer ${API_KEY}`
    }
  });

  if (!res.ok) return null;
  const json = await res.json();
  return json.attributes?.resources?.state;
}

export async function listPlayers() {
  const res = await fetch(`https://panel.pebblehost.com/api/client/servers/${SERVER_ID}/players`, {
    headers: {
      "Authorization": `Bearer ${API_KEY}`
    }
  });

  if (!res.ok) return [];
  const json = await res.json();
  return json.data.map(p => p.attributes.name);
}
