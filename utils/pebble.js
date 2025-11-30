import fetch from "node-fetch";

const API_KEY = process.env.PEBBLE_API_KEY;
const SERVER_ID = process.env.PEBBLE_SERVER_ID;

const base = "https://api.pebblehost.com/v2/client/servers";

async function call(endpoint, method = "GET") {
  return fetch(`${base}/${SERVER_ID}${endpoint}`, {
    method,
    headers: {
      "Authorization": API_KEY,
      "Content-Type": "application/json"
    }
  }).then(res => res.json());
}

export function startServer() {
  return call("/power", "POST", JSON.stringify({ signal: "start" }));
}

export function stopServer() {
  return call("/power", "POST", JSON.stringify({ signal: "stop" }));
}

export function getStatus() {
  return call("");
}

export function listOnlinePlayers() {
  return call("/players");
}
