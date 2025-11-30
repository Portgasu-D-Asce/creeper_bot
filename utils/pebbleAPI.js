const fetch = require('node-fetch');

const API = process.env.PEBBLE_API_KEY;
const SRV = process.env.PEBBLE_SERVER_ID;
const BASE = `https://panel.pebblehost.com/api/client/servers/${SRV}`;

async function pebbleStartServer() {
  const res = await fetch(`${BASE}/power`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ signal: 'start' }),
  });

  if (res.ok) return { success: true };
  return { success: false, message: await res.text() };
}

async function pebbleStopServer() {
  const res = await fetch(`${BASE}/power`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ signal: 'stop' }),
  });

  if (res.ok) return { success: true };
  return { success: false, message: await res.text() };
}

async function pebbleServerStatus() {
  const res = await fetch(`${BASE}`, {
    headers: { Authorization: `Bearer ${API}` }
  });

  const data = await res.json();

  return {
    status: data?.attributes?.current_state || 'unknown',
    playersOnline: data?.attributes?.players || 0,
  };
}

async function pebbleListPlayers() {
  const res = await fetch(`${BASE}`, {
    headers: { Authorization: `Bearer ${API}` }
  });

  const data = await res.json();
  return data?.attributes?.player_list || [];
}

module.exports = {
  pebbleStartServer,
  pebbleStopServer,
  pebbleServerStatus,
  pebbleListPlayers
};
